import nodemailer, { createTransport, Transporter } from 'nodemailer';
import QRCode from 'qrcode';
import { env } from '../../config';

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

    public buildHtmlTemplate(
        data: EmailInscriptionConfirmationData,
        options?: { embedCid?: boolean }
    ): string {
        const embedCid = options?.embedCid ?? true;
        const qrSrc = embedCid ? 'cid:qrcode-ticket' : (data.qrCode || 'cid:qrcode-ticket');

        const participantsRows = (data.participants || [])
            .map(
                (p) => `
                <tr style="border-bottom: 1px solid #EEEEEE;">
                    <td style="padding: 10px;">${p.nombre}</td>
                    <td style="padding: 10px;">${p.dni}</td>
                    <td style="padding: 10px;">${p.edad !== undefined && p.edad !== null ? p.edad : '-'}</td>
                    <td style="padding: 10px;">${p.talleVestimenta ? p.talleVestimenta : (p.talleCalzado !== undefined && p.talleCalzado !== null ? p.talleCalzado : '-')}</td>
                </tr>`
            )
            .join('');

        return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Inscripción - EcoHarmony Park</title>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333333;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f6f8; padding: 20px 0;">
        <tr>
            <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e0e0e0;">
                    <!-- HEADER (#386641) -->
                    <tr>
                        <td style="background-color: #386641; padding: 30px 20px; text-align: center; color: #ffffff;">
                            <h1 style="margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 1px;">EcoHarmony Park</h1>
                            <p style="margin: 8px 0 0 0; font-size: 15px; color: #f2e8cf;">Confirmación de Reserva de Actividad</p>
                            ${data.numeroInscripcion ? `<div style="margin-top: 10px; display: inline-block; background-color: #6a994e; color: #ffffff; padding: 4px 12px; border-radius: 12px; font-size: 13px; font-weight: 700;">N° ${data.numeroInscripcion}</div>` : ''}
                        </td>
                    </tr>

                    <!-- CONTENT -->
                    <tr>
                        <td style="padding: 30px 25px;">
                            <p style="font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">
                                ¡Hola! Tu inscripción para la actividad en <strong>EcoHarmony Park</strong> se ha registrado con éxito. A continuación encontrarás el detalle de tu reserva:
                            </p>

                            <!-- RESERVATION DETAILS CARD (#f2e8cf with #6a994e border) -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f2e8cf; border-radius: 6px; padding: 15px; margin-bottom: 25px; border-left: 4px solid #386641;">
                                <tr>
                                    <td style="padding: 6px 0; font-size: 14px;"><strong>Actividad:</strong> ${data.activityName}</td>
                                </tr>
                                ${data.fecha ? `<tr><td style="padding: 6px 0; font-size: 14px;"><strong>Fecha del turno:</strong> ${data.fecha}</td></tr>` : ''}
                                <tr>
                                    <td style="padding: 6px 0; font-size: 14px;"><strong>Horario / Turno:</strong> ${data.timeSlot}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 6px 0; font-size: 14px;"><strong>Cantidad de cupos:</strong> ${data.quantity}</td>
                                </tr>
                            </table>

                            <!-- QR CODE SECTION -->
                            <div style="text-align: center; padding: 20px; background-color: #FAFAFA; border: 1px dashed #6a994e; border-radius: 8px; margin-bottom: 25px;">
                                <h3 style="margin: 0 0 10px 0; color: #386641; font-size: 18px;">Tu Código QR de Acceso</h3>
                                <p style="font-size: 13px; color: #666666; margin: 0 0 15px 0;">Presenta este código al ingresar a la actividad.</p>
                                <img src="${qrSrc}" alt="Código QR de la reserva" width="180" height="180" style="display: block; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 4px; max-width: 100%; height: auto;" />
                            </div>

                            <!-- PARTICIPANTS SECTION -->
                            <h3 style="color: #386641; font-size: 18px; margin: 0 0 12px 0; border-bottom: 2px solid #a7c957; padding-bottom: 6px;">Participantes Registrados</h3>
                            <table border="0" cellpadding="8" cellspacing="0" width="100%" style="border-collapse: collapse; font-size: 13px; margin-bottom: 25px;">
                                <thead>
                                    <tr style="background-color: #a7c957; color: #386641; text-align: left;">
                                        <th style="padding: 10px; border-bottom: 1px solid #6a994e;">Nombre</th>
                                        <th style="padding: 10px; border-bottom: 1px solid #6a994e;">DNI</th>
                                        <th style="padding: 10px; border-bottom: 1px solid #6a994e;">Edad</th>
                                        <th style="padding: 10px; border-bottom: 1px solid #6a994e;">Talle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${participantsRows}
                                </tbody>
                            </table>

                            <!-- TERMS AND CONDITIONS -->
                            <div style="background-color: #f2e8cf; border-radius: 6px; padding: 12px 15px; margin-bottom: 20px; border-left: 3px solid #6a994e;">
                                <p style="margin: 0; font-size: 13px; color: #386641; line-height: 1.4;">
                                    ✓ <strong>Términos y Condiciones:</strong> Has aceptado los términos y condiciones de seguridad y uso del parque para esta actividad.
                                </p>
                            </div>

                            <p style="font-size: 13px; color: #bc4749; line-height: 1.4; margin: 0;">
                                Recuerda llegar con al menos 15 minutos de anticipación al horario asignado. Para cualquier consulta o modificación, comunícate con la administración del parque.
                            </p>
                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <tr>
                        <td style="background-color: #F5F5F5; padding: 20px; text-align: center; border-top: 1px solid #EEEEEE; font-size: 12px; color: #9E9E9E;">
                            <p style="margin: 0 0 5px 0;">EcoHarmony Park &bull; Viví la naturaleza de forma sustentable</p>
                            <p style="margin: 0;">Este es un mensaje automático, por favor no responda a este correo.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
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
