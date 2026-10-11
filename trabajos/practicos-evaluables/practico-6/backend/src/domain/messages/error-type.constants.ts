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
};
