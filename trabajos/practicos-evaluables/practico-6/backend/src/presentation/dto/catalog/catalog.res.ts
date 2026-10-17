import { ApiSchema, ApiProperty } from '../../swagger/swagger.decorators';

@ApiSchema({
    name: 'ActivityResponse',
    description: 'Información y configuración de una actividad del parque',
})
export class ActivityResponse {
    @ApiProperty({ type: 'integer', example: 1, description: 'ID de la actividad' })
    id!: number;

    @ApiProperty({ type: 'string', example: 'Tirolesa', description: 'Nombre de la actividad' })
    nombre!: string;

    @ApiProperty({ type: 'boolean', example: true, description: 'Indica si la actividad está habilitada' })
    habilitada!: boolean;

    @ApiProperty({ type: 'boolean', example: true, description: 'Indica si requiere talle de vestimenta/calzado' })
    requiereTalle!: boolean;

    @ApiProperty({ type: 'integer', example: 8, description: 'Edad mínima requerida' })
    edadMinima!: number;

    @ApiProperty({ type: 'integer', example: 10, description: 'Capacidad máxima de personas en la actividad' })
    cupoMaximo!: number;

    @ApiProperty({ type: 'string', example: 'Declaro que puedo realizar la actividad de Tirolesa...', description: 'Texto de términos y condiciones de la actividad' })
    terminos!: string;
}

@ApiSchema({
    name: 'TimeSlotAvailabilityResponse',
    description: 'Disponibilidad calculada de un turno para una fecha específica',
})
export class TimeSlotAvailabilityResponse {
    @ApiProperty({ type: 'integer', example: 10, description: 'ID del turno' })
    id!: number;

    @ApiProperty({ type: 'string', example: '10:00', description: 'Hora de inicio del turno' })
    hora!: string;

    @ApiProperty({ type: 'integer', example: 10, description: 'Cupo máximo total del turno' })
    cupoMaximo!: number;

    @ApiProperty({ type: 'integer', example: 8, description: 'Cupos disponibles restantes' })
    cuposDisponibles!: number;

    @ApiProperty({ type: 'boolean', example: true, description: 'Indica si el turno es reservable en la fecha indicada' })
    reservable!: boolean;

    @ApiProperty({ type: 'string', example: 'Sin cupos', description: 'Motivo en caso de no ser reservable', required: false })
    motivo?: string;
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
