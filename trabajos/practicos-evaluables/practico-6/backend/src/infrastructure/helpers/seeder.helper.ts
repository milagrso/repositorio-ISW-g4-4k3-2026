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

            for (const actData of activities) {
                const activity = await ActivityModel.create(actData);
                const activityId = activity.dataValues.id;
                const maxCapacity = actData.maxCapacityActivity;

                // 3. Seed TimeSlots (09:00 to 17:00 hourly - 9 slots per activity)
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

                for (const h of hours) {
                    await TimeSlotModel.create({
                        activityId,
                        startTime: h.start,
                        endTime: h.end,
                        maxCapacity,
                        occupiedSlots: 0,
                    });
                }
            }
            console.log('[SeederHelper] Activities and TimeSlots seeded successfully');

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
