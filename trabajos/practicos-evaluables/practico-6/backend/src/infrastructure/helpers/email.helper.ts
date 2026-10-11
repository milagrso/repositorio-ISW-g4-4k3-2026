export interface EmailInscriptionConfirmationData {
    to: string;
    activityName: string;
    timeSlot: string;
    quantity: number;
    qrCode: string;
    participants: Array<{
        nombre: string;
        dni: number;
        edad?: number;
        talleCalzado?: number | null;
    }>;
}

export class EmailHelper {
    public async sendInscriptionConfirmation(data: EmailInscriptionConfirmationData): Promise<boolean> {
        // Implementation for sending email (e.g. nodemailer or mail service)
        return true;
    }
}
