export const createParticipantRawFixture = (overrides: Record<string, any> = {}) => ({
    nombre: 'Felipe',
    dni: 30784219,
    edad: 42,
    talleCalzado: null,
    ...overrides,
});

export const createRegisterInscriptionRawFixture = (overrides: Record<string, any> = {}) => ({
    actividad: 'Tirolesa',
    horario: '10:00hs',
    cantidad: 1,
    aceptaTerminos: true,
    emailContacto: 'felipe@ejemplo.com',
    participantes: [createParticipantRawFixture()],
    ...overrides,
});

export const createClothFixture = (overrides: Record<string, any> = {}) => ({
    tipo: 'CALZADO',
    requerido: true,
    talleMinimo: 19,
    talleMaximo: 48,
    isValidSize: (size: number) => typeof size === 'number' && Number.isInteger(size) && size >= 19 && size <= 48,
    ...overrides,
});

export const createTimeSlotFixture = (overrides: Record<string, any> = {}) => {
    const maxCapacity = overrides.maxCapacity ?? 10;
    const occupiedSlots = overrides.occupiedSlots ?? 5;
    return {
        id: overrides.id ?? 'slot-123',
        activityId: overrides.activityId ?? 'act-tirolesa',
        startTime: overrides.startTime ?? '10:00hs',
        endTime: overrides.endTime ?? '11:00hs',
        maxCapacity,
        occupiedSlots,
        getAvailableSlots: () => maxCapacity - occupiedSlots,
        hasAvailableSlots: (qty: number) => (maxCapacity - occupiedSlots) >= qty,
        reserve: jest.fn(),
        ...overrides,
    };
};

export const createActivityFixture = (overrides: Record<string, any> = {}) => {
    const cloth = overrides.cloth !== undefined ? overrides.cloth : null;
    return {
        id: overrides.id ?? 'act-tirolesa',
        name: overrides.name ?? 'Tirolesa',
        enabled: overrides.enabled !== undefined ? overrides.enabled : true,
        cloth,
        isAvailable: () => overrides.enabled !== undefined ? overrides.enabled : true,
        requiresCloth: () => !!cloth && (cloth.requerido ?? true),
        validateCloth: (size: number) => !cloth || (cloth.isValidSize ? cloth.isValidSize(size) : true),
        ...overrides,
    };
};

export const createParkFixture = (overrides: Record<string, any> = {}) => ({
    status: overrides.status ?? 'OPEN',
    isOpen: () => (overrides.status ?? 'OPEN') === 'OPEN',
    ...overrides,
});

export const createInscriptionFixture = (overrides: Record<string, any> = {}) => ({
    id: overrides.id ?? 'insc-123',
    activityId: overrides.activityId ?? 'act-tirolesa',
    timeSlotId: overrides.timeSlotId ?? 'slot-123',
    quantity: overrides.quantity ?? 1,
    participants: overrides.participants ?? [createParticipantRawFixture()],
    contactEmail: overrides.contactEmail ?? 'felipe@ejemplo.com',
    qrCode: overrides.qrCode ?? 'qr-code-data',
    termsAccepted: overrides.termsAccepted ?? true,
    status: overrides.status ?? 'REGISTERED',
    createdAt: overrides.createdAt ?? new Date('2026-10-10T10:00:00Z'),
    ...overrides,
});
