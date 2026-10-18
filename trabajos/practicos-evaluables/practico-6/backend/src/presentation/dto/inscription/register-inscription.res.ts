import { ApiSchema, ApiProperty } from '../../swagger/swagger.decorators';

export enum EmailStatus {
    SENT = 'SENT',
    FAILED = 'FAILED',
}

@ApiSchema({
    name: 'ParticipantResponse',
    description: 'Respuesta con los datos del participante y QR generado',
})
export class ParticipantResponse {
    @ApiProperty({
        type: 'string',
        example: 'Felipe Agüero',
        description: 'Nombre y apellido del participante',
    })
    nombre!: string;

    @ApiProperty({
        type: 'integer',
        example: 30784219,
        description: 'DNI del participante',
    })
    dni!: number;

    @ApiProperty({
        type: 'integer',
        example: 42,
        description: 'Edad en años cumplidos',
    })
    edad!: number;

    @ApiProperty({
        type: 'string',
        example: 'XL',
        description: 'Talle de vestimenta seleccionado',
        required: false,
    })
    talleVestimenta?: string | null;

    @ApiProperty({
        type: 'integer',
        example: 40,
        description: 'Talle de calzado (opcional)',
        required: false,
    })
    talleCalzado?: number | null;

    @ApiProperty({
        type: 'string',
        example: 'data:image/png;base64,...',
        description: 'Código QR individual en formato data-url',
        required: false,
    })
    qr?: string;
}

@ApiSchema({
    name: 'RegisterInscriptionResponse',
    description: 'Respuesta exitosa de registro de inscripción',
})
export class RegisterInscriptionResponse {
    @ApiProperty({
        type: 'string',
        example: 'EXITOSA',
        description: 'Estado de la inscripción',
    })
    status!: string;

    @ApiProperty({
        type: 'string',
        example: 'Inscripción para Tirolesa realizada con éxito (2 cupos reservados)',
        required: false,
    })
    message?: string;

    @ApiProperty({
        type: 'string',
        enum: ['SENT', 'FAILED'],
        example: 'SENT',
        description: 'Estado de envío del correo electrónico con las entradas',
        required: false,
    })
    emailStatus?: EmailStatus;

    @ApiProperty({
        type: 'string',
        example: 'EHP-1729188000000-4821',
        description: 'Código único alfanumérico de inscripción',
        required: false,
    })
    numeroInscripcion?: string;

    @ApiProperty({
        type: 'string',
        example: 'Tirolesa',
        description: 'Nombre de la actividad reservada',
        required: false,
    })
    actividad?: string;

    @ApiProperty({
        type: 'string',
        example: '2026-10-17',
        description: 'Fecha de la actividad',
        required: false,
    })
    fecha?: string;

    @ApiProperty({
        type: 'string',
        example: '10:00',
        description: 'Horario del turno',
        required: false,
    })
    horario?: string;

    @ApiProperty({
        type: 'array',
        items: ParticipantResponse,
        description: 'Listado de participantes con sus códigos QR asociados',
        required: false,
    })
    participantes?: ParticipantResponse[];
}

@ApiSchema({
    name: 'ErrorResponse',
    description: 'Estructura estándar de mensaje de error',
})
export class ErrorResponse {
    @ApiProperty({
        type: 'string',
        example: 'Solo se permiten inscripciones dentro de las 24 horas previas al inicio del turno',
        description: 'Descripción del error de validación o regla de negocio',
    })
    error!: string;
}
