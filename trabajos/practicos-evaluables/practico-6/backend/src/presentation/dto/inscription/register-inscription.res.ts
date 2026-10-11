export enum EmailStatus {
    SENT = 'SENT',
    FAILED = 'FAILED',
}

export interface RegisterInscriptionResponse {
    status: string;
    message?: string;
    emailStatus?: EmailStatus;
    inscriptionId?: string | number;
}
