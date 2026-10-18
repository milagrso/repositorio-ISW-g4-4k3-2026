export interface AppError {
    statusCode: number;
    message: string;
}

export const Errors: Record<string, AppError> = {
    // Activity and TimeSlot
    ACTIVITY_REQUIRED: {
        statusCode: 400,
        message: 'Debe seleccionar una actividad',
    },
    TIME_SLOT_REQUIRED: {
        statusCode: 400,
        message: 'Debe seleccionar un horario',
    },
    TIME_SLOT_NOT_AVAILABLE: {
        statusCode: 400,
        message: 'El horario seleccionado no está disponible',
    },
    NO_AVAILABLE_SLOTS: {
        statusCode: 400,
        message: 'No hay cupos disponibles para el horario seleccionado',
    },
    QUANTITY_EXCEEDS_AVAILABLE_SLOTS: {
        statusCode: 400,
        message: 'La cantidad solicitada supera los cupos disponibles',
    },
    PARK_CLOSED: {
        statusCode: 400,
        message: 'El parque se encuentra cerrado en el horario seleccionado',
    },
    ACTIVITY_NOT_AVAILABLE: {
        statusCode: 400,
        message: 'La actividad no se encuentra disponible',
    },

    // Inscription quantity
    INSCRIPTION_QUANTITY_REQUIRED: {
        statusCode: 400,
        message: 'Debe ingresar la cantidad de personas',
    },
    INSCRIPTION_QUANTITY_ZERO: {
        statusCode: 400,
        message: 'La cantidad de personas debe ser mayor a cero',
    },
    INSCRIPTION_QUANTITY_NEGATIVE: {
        statusCode: 400,
        message: 'La cantidad de personas no puede ser negativa',
    },
    INSCRIPTION_QUANTITY_DECIMAL: {
        statusCode: 400,
        message: 'La cantidad de personas debe ser un número entero',
    },
    PARTICIPANTS_COUNT_MISMATCH: {
        statusCode: 400,
        message: 'La cantidad de participantes no coincide con los datos ingresados',
    },

    // Participant Name
    PARTICIPANT_NAME_REQUIRED: {
        statusCode: 400,
        message: 'El nombre del participante es obligatorio',
    },
    PARTICIPANT_NAME_WITH_NUMBERS: {
        statusCode: 400,
        message: 'El nombre del participante no puede contener números',
    },
    PARTICIPANT_NAME_SPECIAL_CHARS: {
        statusCode: 400,
        message: 'El nombre del participante no puede contener caracteres especiales',
    },
    PARTICIPANT_NAME_ONLY_SPACES: {
        statusCode: 400,
        message: 'El nombre del participante no puede estar compuesto únicamente por espacios',
    },

    // Participant DNI
    PARTICIPANT_DNI_REQUIRED: {
        statusCode: 400,
        message: 'El DNI del participante es obligatorio',
    },
    PARTICIPANT_DNI_DECIMAL: {
        statusCode: 400,
        message: 'El DNI del participante no puede contener decimales',
    },
    PARTICIPANT_DNI_LETTERS: {
        statusCode: 400,
        message: 'El DNI del participante no puede contener letras',
    },
    PARTICIPANT_DNI_WITH_SPACES: {
        statusCode: 400,
        message: 'El DNI del participante no puede contener espacios',
    },
    PARTICIPANT_DNI_ONLY_SPACES: {
        statusCode: 400,
        message: 'El DNI del participante no puede estar compuesto únicamente por espacios',
    },
    PARTICIPANT_DNI_MIN_DIGITS: {
        statusCode: 400,
        message: 'El DNI debe tener al menos 7 dígitos',
    },
    PARTICIPANT_DNI_MAX_DIGITS: {
        statusCode: 400,
        message: 'El DNI no puede tener más de 8 dígitos',
    },

    // Participant Age
    PARTICIPANT_AGE_REQUIRED: {
        statusCode: 400,
        message: 'La edad del participante es obligatoria',
    },
    PARTICIPANT_AGE_NOT_A_NUMBER: {
        statusCode: 400,
        message: 'La edad debe ser un número',
    },
    PARTICIPANT_AGE_DECIMAL: {
        statusCode: 400,
        message: 'La edad debe ser un número entero',
    },
    PARTICIPANT_AGE_NEGATIVE: {
        statusCode: 400,
        message: 'La edad no puede ser negativa',
    },
    PARTICIPANT_AGE_ZERO: {
        statusCode: 400,
        message: 'La edad debe ser mayor a cero',
    },
    PARTICIPANT_AGE_ONLY_SPACES: {
        statusCode: 400,
        message: 'La edad no puede contener únicamente espacios',
    },

    // Shoe / Cloth Size
    SHOE_SIZE_REQUIRED: {
        statusCode: 400,
        message: 'El talle de calzado es obligatorio para esta actividad',
    },
    SHOE_SIZE_OUT_OF_RANGE: {
        statusCode: 400,
        message: 'El talle de calzado debe estar entre 19 y 48',
    },
    SHOE_SIZE_NOT_A_NUMBER: {
        statusCode: 400,
        message: 'El talle de calzado debe ser un número',
    },
    SHOE_SIZE_NEGATIVE: {
        statusCode: 400,
        message: 'El talle de calzado no puede ser negativo',
    },
    SHOE_SIZE_ONLY_SPACES: {
        statusCode: 400,
        message: 'El talle de calzado no puede contener únicamente espacios',
    },
    SHOE_SIZE_DECIMAL: {
        statusCode: 400,
        message: 'El talle de calzado debe ser un número entero',
    },

    // Integrity and Terms
    PARTICIPANT_INCOMPLETE_DATA: {
        statusCode: 400,
        message: 'Todos los participantes deben tener sus datos obligatorios completos',
    },
    TERMS_NOT_ACCEPTED: {
        statusCode: 400,
        message: 'Debe aceptar los términos y condiciones',
    },

    // Cloth Size (Vestimenta)
    CLOTH_SIZE_REQUIRED: {
        statusCode: 400,
        message: 'Debe ingresar el talle de vestimenta para completar la inscripción en esta actividad',
    },
    CLOTH_SIZE_OUT_OF_RANGE: {
        statusCode: 400,
        message: 'El talle de vestimenta disponible es de XS a XXL',
    },
    CLOTH_SIZE_FORMAT_INVALID: {
        statusCode: 400,
        message: 'El talle de vestimenta debe ser en formato: XS, S, M, L, XL, XXL',
    },
    CLOTH_SIZE_ONLY_SPACES: {
        statusCode: 400,
        message: 'El talle de vestimenta no puede contener únicamente espacios en blanco',
    },
    CLOTH_SIZE_INVALID_VALUE: {
        statusCode: 400,
        message: 'El talle de vestimenta debe ser un valor con formato XS a XXL',
    },

    // Inscription Date & Contact Email
    INSCRIPTION_DATE_REQUIRED: {
        statusCode: 400,
        message: 'Debe ingresar la fecha del turno',
    },
    INSCRIPTION_DATE_FORMAT_INVALID: {
        statusCode: 400,
        message: 'El formato de fecha debe ser YYYY-MM-DD',
    },
    CONTACT_EMAIL_REQUIRED: {
        statusCode: 400,
        message: 'El correo electrónico de contacto es obligatorio',
    },
    CONTACT_EMAIL_INVALID: {
        statusCode: 400,
        message: 'El correo electrónico ingresado no tiene un formato válido',
    },

    // Minimum Age & Maximum Capacity
    PARTICIPANT_AGE_BELOW_MINIMUM: {
        statusCode: 400,
        message: 'La edad ingresada es menor a la edad mínima establecida para esta actividad',
    },
    ACTIVITY_MAX_CAPACITY_EXCEEDED: ((max?: number) => ({
        statusCode: 400,
        message: `La cantidad de inscriptos supera la capacidad máxima permitida para esta actividad (máximo ${max})`,
    })) as any,

    // Booking Windows & Schedule Overlaps
    BOOKING_TOO_EARLY: {
        statusCode: 400,
        message: 'Solo se permiten inscripciones dentro de las 24 horas previas al inicio del turno',
    },
    BOOKING_TOO_LATE: {
        statusCode: 400,
        message: 'Las inscripciones cierran 15 minutos antes del inicio del turno',
    },
    PARTICIPANT_SCHEDULE_OVERLAP: {
        statusCode: 400,
        message: 'El participante ya tiene una inscripción en otra actividad durante el horario seleccionado',
    },
    GROUP_PARTICIPANT_SCHEDULE_OVERLAP: {
        statusCode: 400,
        message: 'Uno o mas participantes ya tienen una inscripción en otra actividad durante el horario seleccionado',
    },
    PARK_CLOSED_ON_DATE: {
        statusCode: 400,
        message: 'El parque está cerrado en la fecha seleccionada',
    },

    // Not Found & Catalog Entities
    ACTIVITY_NOT_FOUND: {
        statusCode: 404,
        message: 'Actividad no encontrada',
    },
    TIME_SLOT_NOT_FOUND: {
        statusCode: 404,
        message: 'Turno no encontrado',
    },
    PARK_NOT_FOUND: {
        statusCode: 404,
        message: 'Parque no encontrado',
    },
    INSCRIPTION_NOT_FOUND: {
        statusCode: 404,
        message: 'Inscripción no encontrada',
    },
    USER_NOT_FOUND: {
        statusCode: 404,
        message: 'Usuario de sesión no encontrado',
    },
    EMAIL_TEMPLATE_NOT_FOUND: {
        statusCode: 500,
        message: 'No se encontró la plantilla de correo electrónico',
    },
};
