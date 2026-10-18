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
    qrCode: string;
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

    public buildHtmlTemplate(
        data: EmailInscriptionConfirmationData,
        options?: { embedCid?: boolean }
    ): string {
        const embedCid = options?.embedCid ?? true;
        const qrSrc = embedCid ? 'cid:qrcode-ticket' : (data.qrCode || 'cid:qrcode-ticket');

        const participantsSummary = (data.participants || [])
            .map((p) => {
                const edad = p.edad !== undefined && p.edad !== null ? `${p.edad} años` : '-';
                const talle = p.talleVestimenta ?? p.talleCalzado ?? '-';
                return `• ${p.nombre} — DNI: ${p.dni} — Edad: ${edad} — Talle: ${talle}`;
            })
            .join('\n');

        const params = [
            data.numeroInscripcion ? `N° ${data.numeroInscripcion}` : 'Reserva Confirmada',
            data.activityName,
            data.fecha ?? '-',
            data.timeSlot,
            String(data.quantity),
            qrSrc,
            participantsSummary,
        ];

        const templatePath = this.getTemplatePath();
        let html = fs.readFileSync(templatePath, 'utf-8');

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
        const attachments: Array<{ filename: string; content: Buffer; cid?: string }> = [];

        if (data.qrCode) {
            let qrBuffer: Buffer;
            if (data.qrCode.startsWith('data:image/')) {
                const base64Data = data.qrCode.replace(/^data:image\/\w+;base64,/, '');
                qrBuffer = Buffer.from(base64Data, 'base64');
            } else {
                try {
                    qrBuffer = await QRCode.toBuffer(data.qrCode, {
                        errorCorrectionLevel: 'M',
                        margin: 2,
                    });
                } catch {
                    qrBuffer = Buffer.from(data.qrCode);
                }
            }

            attachments.push({
                filename: 'ticket-qr.png',
                content: qrBuffer,
                cid: 'qrcode-ticket',
            });
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
