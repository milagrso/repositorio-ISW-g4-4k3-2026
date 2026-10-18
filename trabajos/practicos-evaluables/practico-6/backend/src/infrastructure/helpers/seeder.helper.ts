import { ActivityModel } from '../postgresql/models/activity.model';
import { ParkModel } from '../postgresql/models/park.model';
import { TimeSlotModel } from '../postgresql/models/time-slot.model';
import { UserModel } from '../postgresql/models/user.model';
import { InscriptionModel } from '../postgresql/models/inscription.model';
import { env } from '../../config';

export class SeederHelper {
    public static async seed(): Promise<void> {
        try {
            await InscriptionModel.sync({ force: true });
            await TimeSlotModel.sync({ force: true });
            await ActivityModel.sync({ force: true });
            await ParkModel.sync({ force: true });
            await UserModel.sync({ force: true });

            // 1. Seed Park
            await ParkModel.create({
                name: 'EcoHarmony Park',
                status: 'OPEN',
                openTime: '08:30',
                closeTime: '19:00',
            });
            console.log('[SeederHelper] Park seeded: EcoHarmony Park (08:30 - 19:00)');

            // 2. Seed Activities
            const activities = [
                {
                    name: 'Safari',
                    enabled: true,
                    cloth: null,
                    minAge: 0,
                    maxCapacityActivity: 8,
                    termsAndConditions: 'Declaro conocer y aceptar las normas de seguridad del Safari en EcoHarmony Park. Me comprometo a respetar la distancia con los animales y permanecer dentro del vehículo durante todo el recorrido.',
                },
                {
                    name: 'Palestra',
                    enabled: true,
                    cloth: {
                        tipo: 'VESTIMENTA',
                        talleMinimo: 'XS',
                        talleMaximo: 'XXL',
                        tallesValidos: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                    },
                    minAge: 12,
                    maxCapacityActivity: 12,
                    termsAndConditions: 'Declaro que no poseo afecciones cardíacas, vértigo severo ni lesiones musculoesqueléticas que impidan la práctica de escalada en Palestra. Acepto el uso obligatorio de arnés y vestimenta adecuada provista por el parque.',
                },
                {
                    name: 'Jardinería',
                    enabled: true,
                    cloth: null,
                    minAge: 0,
                    maxCapacityActivity: 12,
                    termsAndConditions: 'Acepto las normas de cuidado de plantas y manipulación segura de herramientas de jardinería en EcoHarmony Park. Me comprometo a seguir las indicaciones de los instructores.',
                },
                {
                    name: 'Tirolesa',
                    enabled: true,
                    cloth: {
                        tipo: 'VESTIMENTA',
                        talleMinimo: 'XS',
                        talleMaximo: 'XXL',
                        tallesValidos: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                    },
                    minAge: 8,
                    maxCapacityActivity: 10,
                    termsAndConditions: 'Declaro que puedo realizar la actividad de Tirolesa, que no poseo afecciones cardíacas ni vértigo severo, y acepto utilizar el equipo de seguridad obligatorio (arnés, casco y vestimenta adecuada) durante toda la actividad.',
                },
            ];

            const hours = [
                { start: '09:00', end: '10:00' },
                { start: '10:00', end: '11:00' },
                { start: '11:00', end: '12:00' },
                { start: '12:00', end: '13:00' },
                { start: '13:00', end: '14:00' },
                { start: '14:00', end: '15:00' },
                { start: '15:00', end: '16:00' },
                { start: '16:00', end: '17:00' },
                { start: '17:00', end: '18:00' },
            ];

            // Generar fechas desde hoy hasta el 31 de diciembre del año actual
            const now = new Date();
            const currentYear = now.getFullYear();
            const startDate = new Date(Date.UTC(currentYear, now.getMonth(), now.getDate(), 12, 0, 0));
            const endDate = new Date(Date.UTC(currentYear, 11, 31, 12, 0, 0));

            const openDates: string[] = [];
            for (let d = new Date(startDate); d <= endDate; d.setUTCDate(d.getUTCDate() + 1)) {
                const dayOfWeek = d.getUTCDay(); // 1 = Lunes
                const month = d.getUTCMonth() + 1;
                const day = d.getUTCDate();
                if (dayOfWeek === 1 || (month === 12 && day === 25)) {
                    continue;
                }
                const yyyy = d.getUTCFullYear();
                const mm = String(month).padStart(2, '0');
                const dd = String(day).padStart(2, '0');
                openDates.push(`${yyyy}-${mm}-${dd}`);
            }

            // Distribución natural y determinista de cupos ocupados:
            // - algunos turnos agotados (sin cupos: occupied === maxCapacity)
            // - varios turnos con pocos cupos libres (1, 2 o 3 lugares disponibles)
            // - algunos con ocupación media y unos pocos libres
            const getNaturalOccupiedSlots = (maxCapacity: number, actIdx: number, dateIdx: number, hourIdx: number): number => {
                const seed = (actIdx * 7 + dateIdx * 13 + hourIdx * 5) % 10;
                switch (seed) {
                    case 0:
                    case 1:
                        return maxCapacity; // Sin cupos (0 disponibles)
                    case 2:
                    case 3:
                        return Math.max(0, maxCapacity - 1); // Solo 1 cupo disponible
                    case 4:
                    case 5:
                        return Math.max(0, maxCapacity - 2); // Solo 2 cupos disponibles
                    case 6:
                    case 7:
                        return Math.max(0, maxCapacity - 3); // 3 cupos disponibles
                    case 8:
                        return Math.floor(maxCapacity / 2); // Mitad de cupos disponibles
                    default:
                        return 0; // Turno con cupo completo disponible
                }
            };

            const timeSlotsToInsert: Array<Record<string, any>> = [];

            for (let actIdx = 0; actIdx < activities.length; actIdx++) {
                const actData = activities[actIdx];
                const activity = await ActivityModel.create(actData);
                const activityId = activity.dataValues.id;
                const maxCapacity = actData.maxCapacityActivity;

                for (let dateIdx = 0; dateIdx < openDates.length; dateIdx++) {
                    const fecha = openDates[dateIdx];
                    for (let hourIdx = 0; hourIdx < hours.length; hourIdx++) {
                        const h = hours[hourIdx];
                        const occupiedSlots = getNaturalOccupiedSlots(maxCapacity, actIdx, dateIdx, hourIdx);
                        timeSlotsToInsert.push({
                            activityId,
                            startTime: h.start,
                            endTime: h.end,
                            maxCapacity,
                            occupiedSlots,
                            fecha,
                        });
                    }
                }
            }

            await TimeSlotModel.bulkCreate(timeSlotsToInsert);
            console.log(`[SeederHelper] Seeded ${activities.length} activities and ${timeSlotsToInsert.length} TimeSlots until ${currentYear}-12-31`);

            // 4. Seed User
            const email = env.SESSION_USER_EMAIL || env.SEED_USER_EMAIL;
            await UserModel.create({
                nombre: 'Visitante EcoHarmony',
                email,
            });
            console.log(`[SeederHelper] Session user seeded with email: ${email}`);
        } catch (error) {
            console.error('[SeederHelper] Error during database seeding:', error);
        }
    }
}
