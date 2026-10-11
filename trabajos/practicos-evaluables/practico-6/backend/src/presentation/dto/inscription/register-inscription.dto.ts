import { Errors } from '../../../domain/messages/error-type.constants';

export interface ParticipantDto {
    nombre: string;
    dni: number;
    edad: number;
    talleCalzado?: number | null;
}

export class RegisterInscriptionDto {
    public actividad: string;
    public horario: string;
    public cantidad: number;
    public userId?: number | string;
    public aceptaTerminos: boolean;
    public emailContacto: string;
    public participantes: ParticipantDto[];

    constructor(data: Record<string, any>) {
        this.actividad = data.actividad;
        this.horario = data.horario;
        this.cantidad = data.cantidad;
        this.userId = data.userId;
        this.aceptaTerminos = data.aceptaTerminos;
        this.emailContacto = data.emailContacto;
        this.participantes = data.participantes || [];
    }

    static create(raw: Record<string, any>): [string?, RegisterInscriptionDto?] {
        const {
            actividad,
            horario,
            cantidad,
            aceptaTerminos,
            participantes = [],
        } = raw;

        // 1. Actividad y Horario
        if (!actividad) {
            return [Errors.ACTIVITY_REQUIRED.message, undefined];
        }
        if (!horario) {
            return [Errors.TIME_SLOT_REQUIRED.message, undefined];
        }

        // 2. Cantidad de personas
        if (cantidad === null || cantidad === undefined) {
            return [Errors.INSCRIPTION_QUANTITY_REQUIRED.message, undefined];
        }
        if (typeof cantidad !== 'number' || isNaN(cantidad)) {
            return [Errors.INSCRIPTION_QUANTITY_REQUIRED.message, undefined];
        }
        if (!Number.isInteger(cantidad)) {
            return [Errors.INSCRIPTION_QUANTITY_DECIMAL.message, undefined];
        }
        if (cantidad === 0) {
            return [Errors.INSCRIPTION_QUANTITY_ZERO.message, undefined];
        }
        if (cantidad < 0) {
            return [Errors.INSCRIPTION_QUANTITY_NEGATIVE.message, undefined];
        }

        if (Array.isArray(participantes) && cantidad !== participantes.length) {
            return [Errors.PARTICIPANTS_COUNT_MISMATCH.message, undefined];
        }

        // 3. Validación de grupo incompleto
        if (Array.isArray(participantes) && participantes.length > 1) {
            const hasIncompleteParticipant = participantes.some(
                (p) =>
                    p.nombre === null ||
                    p.nombre === undefined ||
                    p.dni === null ||
                    p.dni === undefined ||
                    p.edad === null ||
                    p.edad === undefined
            );
            if (hasIncompleteParticipant) {
                return [Errors.PARTICIPANT_INCOMPLETE_DATA.message, undefined];
            }
        }

        // 4. Validación detallada de cada participante
        if (Array.isArray(participantes)) {
            for (const p of participantes) {
                // Nombre
                if (p.nombre === null || p.nombre === undefined) {
                    return [Errors.PARTICIPANT_NAME_REQUIRED.message, undefined];
                }
                if (typeof p.nombre === 'string' && p.nombre.trim() === '') {
                    return [Errors.PARTICIPANT_NAME_ONLY_SPACES.message, undefined];
                }
                if (typeof p.nombre === 'string' && /\d/.test(p.nombre)) {
                    return [Errors.PARTICIPANT_NAME_WITH_NUMBERS.message, undefined];
                }
                if (typeof p.nombre === 'string' && /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(p.nombre)) {
                    return [Errors.PARTICIPANT_NAME_SPECIAL_CHARS.message, undefined];
                }

                // DNI
                if (p.dni === null || p.dni === undefined) {
                    return [Errors.PARTICIPANT_DNI_REQUIRED.message, undefined];
                }
                if (typeof p.dni === 'string' && p.dni.trim() === '') {
                    return [Errors.PARTICIPANT_DNI_ONLY_SPACES.message, undefined];
                }
                if (typeof p.dni === 'string' && p.dni.includes(' ')) {
                    return [Errors.PARTICIPANT_DNI_WITH_SPACES.message, undefined];
                }
                if (typeof p.dni === 'string' && /[a-zA-Z]/.test(p.dni)) {
                    return [Errors.PARTICIPANT_DNI_LETTERS.message, undefined];
                }
                if (typeof p.dni === 'number' && !Number.isInteger(p.dni)) {
                    return [Errors.PARTICIPANT_DNI_DECIMAL.message, undefined];
                }
                const dniStr = String(p.dni).trim();
                if (dniStr.length < 7) {
                    return [Errors.PARTICIPANT_DNI_MIN_DIGITS.message, undefined];
                }
                if (dniStr.length > 8) {
                    return [Errors.PARTICIPANT_DNI_MAX_DIGITS.message, undefined];
                }

                // Edad
                if (p.edad === null || p.edad === undefined) {
                    return [Errors.PARTICIPANT_AGE_REQUIRED.message, undefined];
                }
                if (typeof p.edad === 'string' && p.edad.trim() === '') {
                    return [Errors.PARTICIPANT_AGE_ONLY_SPACES.message, undefined];
                }
                if (typeof p.edad === 'string' && isNaN(Number(p.edad))) {
                    return [Errors.PARTICIPANT_AGE_NOT_A_NUMBER.message, undefined];
                }
                if (typeof p.edad === 'number' && !Number.isInteger(p.edad)) {
                    return [Errors.PARTICIPANT_AGE_DECIMAL.message, undefined];
                }
                if (typeof p.edad === 'number' && p.edad === 0) {
                    return [Errors.PARTICIPANT_AGE_ZERO.message, undefined];
                }
                if (typeof p.edad === 'number' && p.edad < 0) {
                    return [Errors.PARTICIPANT_AGE_NEGATIVE.message, undefined];
                }

                // Talle Calzado
                if (p.talleCalzado !== null && p.talleCalzado !== undefined) {
                    if (typeof p.talleCalzado === 'string' && p.talleCalzado.trim() === '') {
                        return [Errors.SHOE_SIZE_ONLY_SPACES.message, undefined];
                    }
                    if (typeof p.talleCalzado === 'string' && isNaN(Number(p.talleCalzado))) {
                        return [Errors.SHOE_SIZE_NOT_A_NUMBER.message, undefined];
                    }
                    if (typeof p.talleCalzado === 'number' && p.talleCalzado < 0) {
                        return [Errors.SHOE_SIZE_NEGATIVE.message, undefined];
                    }
                    if (typeof p.talleCalzado === 'number' && !Number.isInteger(p.talleCalzado)) {
                        return [Errors.SHOE_SIZE_DECIMAL.message, undefined];
                    }
                    const talleNum = Number(p.talleCalzado);
                    if (talleNum < 19 || talleNum > 48) {
                        return [Errors.SHOE_SIZE_OUT_OF_RANGE.message, undefined];
                    }
                }
            }
        }

        // 5. Términos y Condiciones
        if (!aceptaTerminos) {
            return [Errors.TERMS_NOT_ACCEPTED.message, undefined];
        }

        return [undefined, new RegisterInscriptionDto(raw)];
    }
}
