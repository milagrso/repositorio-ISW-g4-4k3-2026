export const createParticipantRawFixture = (overrides: Record<string, any> = {}) => ({
    nombre: 'Felipe',
    dni: 30784219,
    edad: 42,
    talleVestimenta: null,
    talleCalzado: null,
    ...overrides,
});

export const createRegisterInscriptionRawFixture = (overrides: Record<string, any> = {}) => ({
    actividad: 'Safari',
    horario: '10:00',
    fecha: '2026-10-16',
    cantidad: 1,
    userId: 1,
    aceptaTerminos: true,
    emailContacto: 'felipe@ejemplo.com',
    participantes: [createParticipantRawFixture()],
    ...overrides,
});

export const createClothFixture = (overrides: Record<string, any> = {}) => ({
    tipo: 'VESTIMENTA',
    talleMinimo: 'XS',
    talleMaximo: 'XXL',
    tallesValidos: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    isValidSize: (size: any) => {
        if (typeof size === 'string') return ['XS', 'S', 'M', 'L', 'XL', 'XXL'].includes(size);
        if (typeof size === 'number') return Number.isInteger(size) && size >= 19 && size <= 48;
        return false;
    },
    ...overrides,
});

export const createTimeSlotFixture = (overrides: Record<string, any> = {}) => {
    const maxCapacity = overrides.maxCapacity ?? 10;
    const occupiedSlots = overrides.occupiedSlots ?? 5;
    return {
        id: overrides.id ?? 1,
        activityId: overrides.activityId ?? 1,
        startTime: overrides.startTime ?? '10:00',
        endTime: overrides.endTime ?? '11:00',
        maxCapacity,
        occupiedSlots,
        getAvailableSlots: () => maxCapacity - occupiedSlots,
        hasAvailableSlots: (qty: number) => (maxCapacity - occupiedSlots) >= qty,
        reserve: jest.fn(),
        ...overrides,
    };
};

export const createActivityFixture = (overrides: Record<string, any> = {}) => {
    const name = overrides.name ?? 'Tirolesa';
    const cloth = overrides.cloth !== undefined ? overrides.cloth : null;
    const minAge = overrides.minAge !== undefined
        ? overrides.minAge
        : (name === 'Tirolesa' ? 8 : (name === 'Palestra' ? 12 : undefined));
    const maxCapacityActivity = overrides.maxCapacityActivity !== undefined
        ? overrides.maxCapacityActivity
        : (name === 'Safari' ? 8 : (name === 'Tirolesa' ? 10 : (name === 'Palestra' ? 12 : (name === 'Jardineria' ? 12 : undefined))));

    return {
        id: overrides.id ?? 1,
        name,
        enabled: overrides.enabled !== undefined ? overrides.enabled : true,
        cloth,
        minAge,
        maxCapacityActivity,
        isAvailable: () => overrides.enabled !== undefined ? overrides.enabled : true,
        requiresCloth: () => cloth !== null,
        validateCloth: (size: any) => !cloth || (cloth.isValidSize ? cloth.isValidSize(size) : true),
        ...overrides,
    };
};

export const createParkFixture = (overrides: Record<string, any> = {}) => ({
    status: overrides.status ?? 'OPEN',
    isOpen: () => (overrides.status ?? 'OPEN') === 'OPEN',
    ...overrides,
});

export const createInscriptionFixture = (overrides: Record<string, any> = {}) => ({
    id: overrides.id ?? 1,
    activityId: overrides.activityId ?? 1,
    timeSlotId: overrides.timeSlotId ?? 1,
    fecha: overrides.fecha ?? '2026-10-16',
    quantity: overrides.quantity ?? 1,
    participants: overrides.participants ?? [createParticipantRawFixture()],
    contactEmail: overrides.contactEmail ?? 'felipe@ejemplo.com',
    qrCode: overrides.qrCode ?? 'qr-code-data',
    termsAccepted: overrides.termsAccepted ?? true,
    status: overrides.status ?? 'REGISTERED',
    createdAt: overrides.createdAt ?? new Date('2026-10-10T10:00:00Z'),
    ...overrides,
});

export const createUserFixture = (overrides: Record<string, any> = {}) => ({
    id: overrides.id ?? 1,
    nombre: overrides.nombre ?? "Felipe",
    email: overrides.email ?? "felipe@ejemplo.com",
    ...overrides,
});
