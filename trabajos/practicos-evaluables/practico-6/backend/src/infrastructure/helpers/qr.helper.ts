import QRCode from 'qrcode';

export interface QrDataPayload {
    actividad?: string;
    horario?: string;
    cantidad?: number;
    participantes?: Array<{
        nombre: string;
        dni: number;
        edad?: number;
        talleCalzado?: number | null;
    }>;
    [key: string]: any;
}

export class QrHelper {
    public formatPayload(data: any): string {
        if (typeof data === 'string') {
            return data;
        }

        if (data && typeof data === 'object') {
            const horario = data.horario ?? '';
            const rawParticipantes = Array.isArray(data.participantes)
                ? data.participantes
                : (data.participante ? [data.participante] : []);

            const firstDni = rawParticipantes[0]?.dni ?? '0';
            const reserva = `EHP-ACT-${horario}-${firstDni}`;

            const formatted = {
                reserva,
                actividad: data.actividad,
                horario: data.horario,
                cantidad: data.cantidad ?? rawParticipantes.length,
                participantes: rawParticipantes.map((p: any) => ({
                    nombre: p.nombre,
                    dni: p.dni,
                })),
            };

            return JSON.stringify(formatted);
        }

        return JSON.stringify(data);
    }

    public async generate(data: any): Promise<string> {
        const payloadString = this.formatPayload(data);
        return QRCode.toDataURL(payloadString, {
            errorCorrectionLevel: 'M',
            margin: 2,
        });
    }

    public async generateBuffer(data: any): Promise<Buffer> {
        const payloadString = this.formatPayload(data);
        return QRCode.toBuffer(payloadString, {
            errorCorrectionLevel: 'M',
            margin: 2,
        });
    }
}
