import { Errors } from '../../../domain/messages/error-type.constants';
import { ApiSchema, ApiProperty } from '../../swagger/swagger.decorators';

@ApiSchema({
    name: 'ParticipantDto',
    description: 'Datos del participante en la inscripción',
})
export class ParticipantDto {
    @ApiProperty({
        type: 'string',
        example: 'Felipe Agüero',
        description: 'Nombre y apellido del participante (permite diéresis)',
        required: true,
    })
    nombre!: string;

    @ApiProperty({
        type: 'integer',
        example: 30784219,
        description: 'DNI argentino de 7 u 8 dígitos',
        required: true,
    })
    dni!: number;

    @ApiProperty({
        type: 'integer',
        example: 42,
        description: 'Edad en años cumplidos',
        required: true,
    })
    edad!: number;

    @ApiProperty({
        type: 'integer',
        example: 40,
        description: 'Talle de calzado (opcional)',
        required: false,
    })
    talleCalzado?: number | null;

    @ApiProperty({
        type: 'string',
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        example: 'XL',
        description: 'Talle de vestimenta obligatorio para Tirolesa y Palestra',
        required: false,
    })
    talleVestimenta?: string | null;
}

@ApiSchema({
    name: 'RegisterInscriptionDto',
    description: 'Datos requeridos para registrar una inscripción',
})
export class RegisterInscriptionDto {
    @ApiProperty({
        type: 'string',
        example: 'Tirolesa',
        description: 'Nombre de la actividad seleccionada',
        required: true,
    })
    public actividad: string;

    @ApiProperty({
        type: 'string',
        example: '10:00',
        description: 'Horario del turno en formato HH:MM (09:00 a 17:00)',
        required: true,
    })
    public horario: string;

    @ApiProperty({
        type: 'string',
        format: 'date',
        example: '2026-10-17',
        description: 'Fecha de la actividad en formato YYYY-MM-DD',
        required: true,
    })
    public fecha: string;

    @ApiProperty({
        type: 'integer',
        example: 2,
        description: 'Cantidad de personas a inscribir',
        required: true,
    })
    public cantidad: number;

    @ApiProperty({
        type: 'boolean',
        example: true,
        description: 'Aceptación expresa de términos y condiciones',
        required: true,
    })
    public aceptaTerminos: boolean;

    @ApiProperty({
        type: 'string',
        format: 'email',
        example: 'felipe@ejemplo.com',
        description: 'Correo electrónico donde se enviarán las entradas y QR',
        required: true,
    })
    public emailContacto: string;

    @ApiProperty({
        type: 'array',
        items: ParticipantDto,
        description: 'Lista de participantes con sus datos personales',
        required: true,
    })
    public participantes: ParticipantDto[];

    constructor(data: Record<string, any>) {
        this.actividad = data.actividad;
        this.horario = data.horario;
        this.fecha = data.fecha;
        this.cantidad = data.cantidad;
        this.aceptaTerminos = data.aceptaTerminos;
        this.emailContacto = data.emailContacto;
        this.participantes = data.participantes || [];
    }

    static create(raw: Record<string, any>): [string?, RegisterInscriptionDto?] {
        const {
            actividad,
            horario,
            fecha,
            cantidad,
            aceptaTerminos,
            emailContacto,
            participantes = [],
        } = raw;

        // 1. Actividad y Horario
        if (!actividad) {
            return [Errors.ACTIVITY_REQUIRED.message, undefined];
        }
        if (!horario) {
            return [Errors.TIME_SLOT_REQUIRED.message, undefined];
        }

        // 2. Fecha del turno
        if (!fecha || (typeof fecha === 'string' && fecha.trim() === '')) {
            return [Errors.INSCRIPTION_DATE_REQUIRED.message, undefined];
        }
        if (typeof fecha !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(fecha.trim())) {
            return [Errors.INSCRIPTION_DATE_FORMAT_INVALID.message, undefined];
        }

        // 3. Email de contacto
        if (!emailContacto || (typeof emailContacto === 'string' && emailContacto.trim() === '')) {
            return [Errors.CONTACT_EMAIL_REQUIRED.message, undefined];
        }
        if (typeof emailContacto !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailContacto.trim())) {
            return [Errors.CONTACT_EMAIL_INVALID.message, undefined];
        }

        // 4. Cantidad de personas
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

        // 5. Validación de grupo incompleto
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

        // 6. Validación detallada de cada participante
        const validClothSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
        const outOfRangeClothSizes = ['XXS', 'XXXS', '2XS', '3XS', 'XXXL', 'XXXXL', '3XL', '4XL', '5XL'];

        if (Array.isArray(participantes)) {
            for (const p of participantes) {
                // Nombre (permite diéresis ü y Ü)
                if (p.nombre === null || p.nombre === undefined) {
                    return [Errors.PARTICIPANT_NAME_REQUIRED.message, undefined];
                }
                if (typeof p.nombre === 'string' && p.nombre.trim() === '') {
                    return [Errors.PARTICIPANT_NAME_ONLY_SPACES.message, undefined];
                }
                if (typeof p.nombre === 'string' && /\d/.test(p.nombre)) {
                    return [Errors.PARTICIPANT_NAME_WITH_NUMBERS.message, undefined];
                }
                if (typeof p.nombre === 'string' && /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/.test(p.nombre)) {
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

                // Talle Calzado (opcional para compatibilidad)
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

                // Talle Vestimenta
                if (p.talleVestimenta !== null && p.talleVestimenta !== undefined) {
                    if (typeof p.talleVestimenta !== 'string' || /\d/.test(p.talleVestimenta)) {
                        return [Errors.CLOTH_SIZE_FORMAT_INVALID.message, undefined];
                    }
                    const trimmedVestimenta = p.talleVestimenta.trim();
                    if (trimmedVestimenta === '') {
                        return [Errors.CLOTH_SIZE_ONLY_SPACES.message, undefined];
                    }
                    const upper = trimmedVestimenta.toUpperCase();
                    if (outOfRangeClothSizes.includes(upper)) {
                        return [Errors.CLOTH_SIZE_OUT_OF_RANGE.message, undefined];
                    }
                    if (!validClothSizes.includes(upper)) {
                        return [Errors.CLOTH_SIZE_INVALID_VALUE.message, undefined];
                    }
                }
            }
        }

        // 7. Términos y Condiciones
        if (!aceptaTerminos) {
            return [Errors.TERMS_NOT_ACCEPTED.message, undefined];
        }

        return [undefined, new RegisterInscriptionDto(raw)];
    }
}
