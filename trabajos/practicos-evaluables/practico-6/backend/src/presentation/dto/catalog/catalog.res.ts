import { ApiSchema, ApiProperty } from '../../swagger/swagger.decorators';

@ApiSchema({
    name: 'ActivityResponse',
    description: 'Información y configuración de una actividad del parque',
})
export class ActivityResponse {
    @ApiProperty({ type: 'integer', example: 1, description: 'ID de la actividad' })
    id!: number;

    @ApiProperty({ type: 'string', example: 'Tirolesa', description: 'Nombre de la actividad' })
    name!: string;

    @ApiProperty({ type: 'boolean', example: true, description: 'Indica si la actividad está habilitada' })
    enabled!: boolean;

    @ApiProperty({ type: 'object', description: 'Requerimiento de vestimenta/calzado y talles válidos', required: false })
    cloth?: Record<string, any> | null;

    @ApiProperty({ type: 'integer', example: 8, description: 'Edad mínima requerida', required: false })
    minAge?: number;

    @ApiProperty({ type: 'integer', example: 10, description: 'Capacidad máxima de personas en la actividad', required: false })
    maxCapacityActivity?: number;

    @ApiProperty({ type: 'string', example: 'Declaro que puedo realizar la actividad de Tirolesa...', description: 'Texto de términos y condiciones de la actividad', required: false })
    termsAndConditions?: string;
}

@ApiSchema({
    name: 'TimeSlotResponse',
    description: 'Definición de turno de actividad',
})
export class TimeSlotResponse {
    @ApiProperty({ type: 'integer', example: 1, description: 'ID del turno' })
    id!: number;

    @ApiProperty({ type: 'integer', example: 1, description: 'ID de la actividad asociada' })
    activityId!: number;

    @ApiProperty({ type: 'string', example: '2026-10-18', description: 'Fecha del turno (YYYY-MM-DD)' })
    fecha!: string;

    @ApiProperty({ type: 'string', example: '09:00', description: 'Hora de inicio (HH:MM)' })
    startTime!: string;

    @ApiProperty({ type: 'string', example: '10:00', description: 'Hora de finalización (HH:MM)' })
    endTime!: string;

    @ApiProperty({ type: 'integer', example: 10, description: 'Capacidad máxima del turno' })
    maxCapacity!: number;

    @ApiProperty({ type: 'integer', example: 0, description: 'Cantidad de cupos actualmente ocupados' })
    occupiedSlots!: number;
}

@ApiSchema({
    name: 'ParkResponse',
    description: 'Información general del parque',
})
export class ParkResponse {
    @ApiProperty({ type: 'integer', example: 1, description: 'ID del parque' })
    id!: number;

    @ApiProperty({ type: 'string', example: 'EcoHarmony Park', description: 'Nombre oficial del parque' })
    name!: string;

    @ApiProperty({ type: 'string', example: 'OPEN', description: 'Estado operativo del parque' })
    status!: string;

    @ApiProperty({ type: 'string', example: '08:30', description: 'Horario de apertura' })
    openTime!: string;

    @ApiProperty({ type: 'string', example: '19:00', description: 'Horario de cierre' })
    closeTime!: string;
}

@ApiSchema({
    name: 'UserResponse',
    description: 'Datos del usuario activo en la sesión',
})
export class UserResponse {
    @ApiProperty({ type: 'integer', example: 1, description: 'ID del usuario' })
    id!: number;

    @ApiProperty({ type: 'string', example: 'Felipe', description: 'Nombre del usuario' })
    nombre!: string;

    @ApiProperty({ type: 'string', example: 'felipe@ejemplo.com', description: 'Correo electrónico del usuario' })
    email!: string;
}

@ApiSchema({
    name: 'ServerTimeResponse',
    description: 'Hora actual del servidor sincronizada en huso horario de Argentina (-03:00)',
})
export class ServerTimeResponse {
    @ApiProperty({ type: 'string', example: '2026-10-17T15:30:00-03:00', description: 'Fecha y hora actual ISO en huso -03:00' })
    now!: string;
}
