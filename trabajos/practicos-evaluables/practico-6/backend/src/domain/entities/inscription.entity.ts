import { ParticipantEntity } from './participant.entity';

export class InscriptionEntity {
    private constructor(
        public id: string | number,
        public activityId: string | number,
        public timeSlotId: string | number,
        public quantity: number,
        public participants: ParticipantEntity[],
        public contactEmail: string,
        public qrCode: string,
        public termsAccepted: boolean,
        public status: string = 'REGISTERED',
        public createdAt: Date = new Date(),
        public fecha?: string,
        public numeroInscripcion?: string
    ) {}

    static fromObject(object: { [key: string]: any }): InscriptionEntity {
        const {
            _id,
            id,
            activityId,
            timeSlotId,
            quantity,
            participants = [],
            contactEmail,
            qrCode,
            termsAccepted,
            status = 'REGISTERED',
            createdAt = new Date(),
            fecha,
            numeroInscripcion,
        } = object;

        const participantEntities = participants.map((p: any) =>
            p instanceof ParticipantEntity ? p : ParticipantEntity.fromObject(p)
        );

        return new InscriptionEntity(
            _id || id,
            activityId,
            timeSlotId,
            quantity,
            participantEntities,
            contactEmail,
            qrCode,
            termsAccepted,
            status,
            createdAt instanceof Date ? createdAt : new Date(createdAt),
            fecha,
            numeroInscripcion
        );
    }
}
