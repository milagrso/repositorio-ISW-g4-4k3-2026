import fs from 'fs';
import path from 'path';
import { createTransport, Transporter } from 'nodemailer';
import QRCode from 'qrcode';
import { env } from '../../config';
import { ServiceError } from '../../domain/messages/service.error';
import { Errors } from '../../domain/messages/error-type.constants';

export interface EmailInscriptionConfirmationData {
    to: string;
    activityName: string;
    timeSlot: string;
    quantity: number;
    qrCodes: string[];
    fecha?: string;
    numeroInscripcion?: string;
    participants: Array<{
        nombre: string;
        dni: number;
        edad?: number;
        talleCalzado?: number | null;
        talleVestimenta?: string | null;
    }>;
}

export class EmailHelper {
    private transporter: Transporter | null = null;

    constructor(customTransporter?: Transporter) {
        if (customTransporter) {
            this.transporter = customTransporter;
        } else if (env.MAIL_USER && env.MAIL_PASS) {
            this.transporter = createTransport({
                host: env.MAIL_HOST,
                port: env.MAIL_PORT,
                secure: env.MAIL_PORT === 465,
                auth: {
                    user: env.MAIL_USER,
                    pass: env.MAIL_PASS,
                },
            });
        }
    }

    public getTransporter(): Transporter | null {
        return this.transporter;
    }

    private getTemplatePath(): string {
        const templatePath = path.resolve(__dirname, '../templates/inscription-confirmation.template.html');
        if (!fs.existsSync(templatePath)) {
            throw new ServiceError(Errors.EMAIL_TEMPLATE_NOT_FOUND);
        }
        return templatePath;
    }

    private async getQrBuffer(qr: string): Promise<Buffer> {
        if (!qr) {
            return Buffer.from('');
        }
        if (qr.startsWith('data:image/')) {
            const base64Data = qr.replace(/^data:image\/\w+;base64,/, '');
            return Buffer.from(base64Data, 'base64');
        }
        try {
            return await QRCode.toBuffer(qr, {
                errorCorrectionLevel: 'M',
                margin: 2,
            });
        } catch {
            return Buffer.from(qr);
        }
    }

    public buildHtmlTemplate(
        data: EmailInscriptionConfirmationData,
        options?: { embedCid?: boolean }
    ): string {
        const embedCid = options?.embedCid ?? true;
        const qrList = data.qrCodes || [];

        const participantsSummary = (data.participants || [])
            .map((p) => {
                const edad = p.edad !== undefined && p.edad !== null ? `${p.edad} años` : '-';
                const talle = p.talleVestimenta ?? p.talleCalzado ?? '-';
                return `• ${p.nombre} — DNI: ${p.dni} — Edad: ${edad} — Talle: ${talle}`;
            })
            .join('\n');

        let qrContentHtml: string;
        if (qrList.length > 1) {
            const cards = qrList.map((qr, index) => {
                const cid = `qrcode-ticket-${index + 1}`;
                const src = embedCid ? `cid:${cid}` : (qr || `cid:${cid}`);
                const participant = data.participants?.[index];
                const label = participant?.nombre
                    ? `${participant.nombre} (DNI: ${participant.dni})`
                    : `Visitante ${index + 1}`;
                return `
                    <div style="display: inline-block; margin: 10px; text-align: center; vertical-align: top;">
                        <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: #386641;">${label}</p>
                        <img src="${src}" alt="Código QR ${label}" width="160" height="160" style="display: block; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 4px; max-width: 100%; height: auto;" />
                    </div>`;
            }).join('');

            qrContentHtml = `<div style="text-align: center;">${cards}</div>`;
        } else {
            const singleQr = qrList[0];
            const qrSrc = embedCid ? 'cid:qrcode-ticket' : (singleQr || 'cid:qrcode-ticket');
            qrContentHtml = `<img src="${qrSrc}" alt="Código QR de la reserva" width="180" height="180" style="display: block; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 4px; max-width: 100%; height: auto;" />`;
        }

        const params = [
            data.numeroInscripcion ? `N° ${data.numeroInscripcion}` : 'Reserva Confirmada',
            data.activityName,
            data.fecha ?? '-',
            data.timeSlot,
            String(data.quantity),
            qrContentHtml,
            participantsSummary,
        ];

        const templatePath = this.getTemplatePath();
        let html = fs.readFileSync(templatePath, 'utf-8');

        // Handle legacy template containing <img src="$6" ... /> defensively
        html = html.replace(/<img[^>]*src="\$6"[^>]*\/>/g, '$6');

        params.forEach((value, index) => {
            html = html.replace(`$${index + 1}`, value);
        });

        return html;
    }

    public async sendInscriptionConfirmation(data: EmailInscriptionConfirmationData): Promise<boolean> {
        if (!this.transporter) {
            return true;
        }

        const html = this.buildHtmlTemplate(data, { embedCid: true });
        const qrList = data.qrCodes || [];
        const attachments: Array<{ filename: string; content: Buffer; cid?: string }> = [];

        if (qrList.length === 1) {
            const qrBuffer = await this.getQrBuffer(qrList[0]);
            attachments.push({
                filename: 'ticket-qr.png',
                content: qrBuffer,
                cid: 'qrcode-ticket',
            });
        } else if (qrList.length > 1) {
            for (let i = 0; i < qrList.length; i++) {
                const qrItem = qrList[i];
                const qrBuffer = await this.getQrBuffer(qrItem);
                const participant = data.participants?.[i];
                const fileSuffix = participant?.dni ? `-${participant.dni}` : `-${i + 1}`;
                attachments.push({
                    filename: `ticket-qr${fileSuffix}.png`,
                    content: qrBuffer,
                    cid: `qrcode-ticket-${i + 1}`,
                });
            }
        }

        await this.transporter.sendMail({
            from: env.MAIL_FROM,
            to: data.to,
            subject: `Confirmación de Inscripción - ${data.activityName} | EcoHarmony Park`,
            html,
            attachments,
        });

        return true;
    }
}
