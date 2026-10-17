import { InscriptionService } from './inscription.service';
import { ParkRepository } from 'src/domain/repositories/park.repository';
import { ActivityRepository } from 'src/domain/repositories/activity.repository';
import { InscriptionRepository } from 'src/domain/repositories/inscription.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { EmailHelper } from 'src/infrastructure/helpers/email.helper';
import { QrHelper } from 'src/infrastructure/helpers/qr.helper';
import { ServiceError } from 'src/domain/messages/service.error';
import { Errors } from 'src/domain/messages/error-type.constants';
import { RegisterInscriptionDto } from 'src/presentation/dto/inscription/register-inscription.dto';
import { EmailStatus } from 'src/presentation/dto/inscription/register-inscription.res';
import {
    createActivityFixture,
    createTimeSlotFixture,
    createClothFixture,
    createParticipantRawFixture,
    createRegisterInscriptionRawFixture,
    createInscriptionFixture,
    createUserFixture,
} from 'test/fixtures';

describe('Pruebas unitarias para el InscriptionService', () => {
    let service: InscriptionService;
    let parkRepositoryMock: jest.Mocked<ParkRepository>;
    let activityRepositoryMock: jest.Mocked<ActivityRepository>;
    let inscriptionRepositoryMock: jest.Mocked<InscriptionRepository>;
    let userRepositoryMock: jest.Mocked<UserRepository>;
    let emailHelperMock: jest.Mocked<EmailHelper>;
    let qrHelperMock: jest.Mocked<QrHelper>;

    beforeEach(() => {
        parkRepositoryMock = {
            isOpenAt: jest.fn().mockResolvedValue(true),
        } as unknown as jest.Mocked<ParkRepository>;

        activityRepositoryMock = {
            findByName: jest.fn(),
            findTimeSlot: jest.fn(),
        } as unknown as jest.Mocked<ActivityRepository>;

        inscriptionRepositoryMock = {
            reserveSlots: jest.fn().mockResolvedValue(true),
            save: jest.fn().mockImplementation((insc) => Promise.resolve(createInscriptionFixture(insc))),
        } as unknown as jest.Mocked<InscriptionRepository>;

        userRepositoryMock = {
            findById: jest.fn().mockResolvedValue(createUserFixture({ id: 1, email: 'felipe@ejemplo.com' })),
        } as unknown as jest.Mocked<UserRepository>;

        emailHelperMock = {
            sendInscriptionConfirmation: jest.fn().mockResolvedValue(true),
        } as unknown as jest.Mocked<EmailHelper>;

        qrHelperMock = {
            generate: jest.fn().mockResolvedValue('qr-data-string'),
        } as unknown as jest.Mocked<QrHelper>;

        service = new InscriptionService(
            parkRepositoryMock,
            activityRepositoryMock,
            inscriptionRepositoryMock,
            userRepositoryMock,
            emailHelperMock,
            qrHelperMock,
        );
    });


    describe('test_tirolesa_con_cupo_permite_inscripcion', () => {
        it('debe permitir la inscripción en Tirolesa cuando hay cupos y horario disponible', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 5 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '10:00',
                cantidad: 2,
                participantes: [
                    createParticipantRawFixture({ nombre: 'Juan', dni: 30784219, edad: 42 }),
                    createParticipantRawFixture({ nombre: 'María', dni: 44123456, edad: 23 }),
                ],
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toBe('Inscripción para Tirolesa realizada con éxito (2 cupos reservados)');
            expect(inscriptionRepositoryMock.reserveSlots).toHaveBeenCalledWith(slot.id, 2);
        });
    });

    describe('test_tirolesa_sin_cupo_rechaza_inscripcion', () => {
        it('debe rechazar la inscripción en Tirolesa cuando no hay cupos libres', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa' });
            const slot = createTimeSlotFixture({ id: 11, startTime: '11:00', maxCapacity: 10, occupiedSlots: 10 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '11:00',
                cantidad: 1,
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            await expect(resultPromise).rejects.toThrow(new ServiceError(Errors.NO_AVAILABLE_SLOTS));
        });
    });

    describe('test_tirolesa_fuera_horario_rechaza_inscripcion', () => {
        it('debe rechazar la inscripción en Tirolesa cuando el horario no está disponible', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa' });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(null);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '20:00',
                cantidad: 2,
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            await expect(resultPromise).rejects.toThrow(new ServiceError(Errors.TIME_SLOT_NOT_AVAILABLE));
        });
    });

    describe('test_safari_con_cupo_permite_inscripcion', () => {
        it('debe permitir la inscripción en Safari cuando hay cupos y horario disponible', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 2, name: 'Safari' });
            const slot = createTimeSlotFixture({ id: 14, startTime: '14:00', maxCapacity: 20, occupiedSlots: 12 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Safari',
                horario: '14:00',
                cantidad: 4,
                participantes: [
                    createParticipantRawFixture({ nombre: 'P1', dni: 30111111, edad: 30 }),
                    createParticipantRawFixture({ nombre: 'P2', dni: 30222222, edad: 31 }),
                    createParticipantRawFixture({ nombre: 'P3', dni: 30333333, edad: 32 }),
                    createParticipantRawFixture({ nombre: 'P4', dni: 30444444, edad: 33 }),
                ],
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toBe('Inscripción para Safari realizada con éxito (4 cupos reservados)');
        });
    });

    describe('test_safari_sin_cupo_rechaza_inscripcion', () => {
        it('debe rechazar la inscripción en Safari cuando no hay cupos libres', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 2, name: 'Safari' });
            const slot = createTimeSlotFixture({ id: 16, startTime: '16:00', maxCapacity: 15, occupiedSlots: 15 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Safari',
                horario: '16:00',
                cantidad: 2,
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            await expect(resultPromise).rejects.toThrow(new ServiceError(Errors.NO_AVAILABLE_SLOTS));
        });
    });

    describe('test_safari_fuera_horario_rechaza_inscripcion', () => {
        it('debe rechazar la inscripción en Safari cuando el turno está fuera de horario', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 2, name: 'Safari' });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(null);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Safari',
                horario: '19:00',
                cantidad: 1,
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            await expect(resultPromise).rejects.toThrow(new ServiceError(Errors.TIME_SLOT_NOT_AVAILABLE));
        });
    });

    describe('test_palestra_con_cupo_permite_inscripcion', () => {
        it('debe permitir la inscripción en Palestra con talle válido y cupos libres', async () => {
            // Arrange
            const cloth = createClothFixture({ requerido: true, minSize: 19, maxSize: 48 });
            const activity = createActivityFixture({ id: 3, name: 'Palestra', cloth });
            const slot = createTimeSlotFixture({ id: 15, startTime: '15:00', maxCapacity: 10, occupiedSlots: 4 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Palestra',
                horario: '15:00',
                cantidad: 2,
                participantes: [
                    createParticipantRawFixture({ nombre: 'Felipe', dni: 30784219, edad: 42, talleCalzado: 40 }),
                    createParticipantRawFixture({ nombre: 'Lucas', dni: 35123456, edad: 25, talleCalzado: 42 }),
                ],
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toBe('Inscripción para Palestra realizada con éxito (2 cupos reservados)');
        });
    });

    describe('test_palestra_sin_cupo_rechaza_inscripcion', () => {
        it('debe rechazar la inscripción en Palestra cuando no hay cupos libres', async () => {
            // Arrange
            const cloth = createClothFixture({ requerido: true });
            const activity = createActivityFixture({ id: 3, name: 'Palestra', cloth });
            const slot = createTimeSlotFixture({ id: 17, startTime: '17:00', maxCapacity: 8, occupiedSlots: 8 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Palestra',
                horario: '17:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ talleCalzado: 40 })],
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            await expect(resultPromise).rejects.toThrow(new ServiceError(Errors.NO_AVAILABLE_SLOTS));
        });
    });

    describe('test_palestra_fuera_horario_rechaza_inscripcion', () => {
        it('debe rechazar la inscripción en Palestra fuera del horario habilitado', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 3, name: 'Palestra' });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(null);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Palestra',
                horario: '21:00',
                cantidad: 2,
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            await expect(resultPromise).rejects.toThrow(new ServiceError(Errors.TIME_SLOT_NOT_AVAILABLE));
        });
    });

    describe('test_jardineria_con_cupo_permite_inscripcion', () => {
        it('debe permitir la inscripción en Jardinería cuando hay cupos y horario disponible', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 4, name: 'Jardineria' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 6 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Jardineria',
                horario: '10:00',
                cantidad: 2,
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toBe('Inscripción para Jardineria realizada con éxito (2 cupos reservados)');
        });
    });

    describe('test_jardineria_sin_cupo_rechaza_inscripcion', () => {
        it('debe rechazar la inscripción en Jardinería cuando el turno no tiene cupos', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 4, name: 'Jardineria' });
            const slot = createTimeSlotFixture({ id: 11, startTime: '11:00', maxCapacity: 6, occupiedSlots: 6 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Jardineria',
                horario: '11:00',
                cantidad: 1,
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            await expect(resultPromise).rejects.toThrow(new ServiceError(Errors.NO_AVAILABLE_SLOTS));
        });
    });

    describe('test_jardineria_fuera_horario_rechaza_inscripcion', () => {
        it('debe rechazar la inscripción en Jardinería fuera del horario habilitado', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 4, name: 'Jardineria' });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(null);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Jardineria',
                horario: '20:00',
                cantidad: 2,
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            await expect(resultPromise).rejects.toThrow(new ServiceError(Errors.TIME_SLOT_NOT_AVAILABLE));
        });
    });


    describe('test_una_persona_con_cupo_permite_inscripcion', () => {
        it('debe permitir la inscripción de 1 persona cuando hay cupos disponibles', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 5 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '10:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Felipe', dni: 30784219, edad: 42, talleVestimenta: 'XL' })],
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toBe('Inscripción para Tirolesa realizada con éxito (1 cupo reservado)');
        });
    });

    describe('test_varias_personas_con_cupos_permite_inscripcion', () => {
        it('debe permitir la inscripción de varias personas cuando hay suficientes cupos', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 5 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '10:00',
                cantidad: 3,
                participantes: [
                    createParticipantRawFixture({ nombre: 'Juan', dni: 30784219, edad: 42, talleVestimenta: 'XL' }),
                    createParticipantRawFixture({ nombre: 'María', dni: 44123456, edad: 23, talleVestimenta: 'M' }),
                    createParticipantRawFixture({ nombre: 'Pedro', dni: 40123456, edad: 27, talleVestimenta: 'L' }),
                ],
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toBe('Inscripción para Tirolesa realizada con éxito (3 cupos reservados)');
        });
    });

    describe('test_cantidad_igual_a_cupo_permite_inscripcion', () => {
        it('debe permitir la inscripción cuando la cantidad coincide exactamente con los cupos libres', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 7 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '10:00',
                cantidad: 3,
                participantes: [
                    createParticipantRawFixture({ nombre: 'Juan', dni: 30784219, edad: 42, talleVestimenta: 'XL' }),
                    createParticipantRawFixture({ nombre: 'María', dni: 44123456, edad: 23, talleVestimenta: 'M' }),
                    createParticipantRawFixture({ nombre: 'Pedro', dni: 40123456, edad: 27, talleVestimenta: 'L' }),
                ],
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toBe('Inscripción para Tirolesa realizada con éxito (3 cupos reservados)');
        });
    });

    describe('test_cantidad_supera_cupo_rechaza_inscripcion', () => {
        it('debe rechazar la inscripción cuando la cantidad solicitada supera los cupos disponibles', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 8 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '10:00',
                cantidad: 3,
                participantes: [
                    createParticipantRawFixture({ nombre: 'Juan', dni: 30784219, edad: 42, talleVestimenta: 'XL' }),
                    createParticipantRawFixture({ nombre: 'María', dni: 44123456, edad: 23, talleVestimenta: 'M' }),
                    createParticipantRawFixture({ nombre: 'Pedro', dni: 40123456, edad: 27, talleVestimenta: 'L' }),
                ],
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            await expect(resultPromise).rejects.toThrow(new ServiceError(Errors.QUANTITY_EXCEEDS_AVAILABLE_SLOTS));
        });
    });

    describe('test_talle_tirolesa_requerido_ingresado_permite_inscripcion', () => {
        it('debe permitir la inscripción en Tirolesa cuando se ingresa talle de vestimenta requerido', async () => {
            // Arrange
            const cloth = createClothFixture({ requerido: true });
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa', cloth });
            const slot = createTimeSlotFixture({ id: 15, startTime: '15:00', maxCapacity: 10, occupiedSlots: 5 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '15:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Felipe', dni: 30784219, edad: 42, talleVestimenta: 'XL' })],
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toBe('Inscripción para Tirolesa realizada con éxito (1 cupo reservado)');
        });
    });

    describe('test_talle_palestra_requerido_ingresado_permite_inscripcion', () => {
        it('debe permitir la inscripción en Palestra cuando se ingresa talle de vestimenta requerido', async () => {
            // Arrange
            const cloth = createClothFixture({ requerido: true });
            const activity = createActivityFixture({ id: 3, name: 'Palestra', cloth, minAge: 12 });
            const slot = createTimeSlotFixture({ id: 15, startTime: '15:00', maxCapacity: 12, occupiedSlots: 5 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Palestra',
                horario: '15:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Felipe', dni: 30784219, edad: 42, talleVestimenta: 'XXL' })],
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toBe('Inscripción para Palestra realizada con éxito (1 cupo reservado)');
        });
    });

    describe('test_talle_requerido_no_ingresado_rechaza_inscripcion', () => {
        it('debe rechazar la inscripción en actividad que exige vestimenta si falta el talle', async () => {
            // Arrange
            const cloth = createClothFixture({ requerido: true });
            const activity = createActivityFixture({ id: 3, name: 'Palestra', cloth, minAge: 12 });
            const slot = createTimeSlotFixture({ id: 15, startTime: '15:00', maxCapacity: 12, occupiedSlots: 5 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Palestra',
                horario: '15:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Felipe', dni: 30784219, edad: 42, talleVestimenta: null })],
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            const expectedError = Errors.CLOTH_SIZE_REQUIRED?.message ?? 'Debe ingresar el talle de vestimenta para completar la inscripción en esta actividad';
            await expect(resultPromise).rejects.toThrow(new ServiceError(expectedError));
        });
    });

    describe('test_talle_no_requerido_no_ingresado_permite_inscripcion', () => {
        it('debe permitir la inscripción en actividad sin requisito de vestimenta sin enviar talle', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 2, name: 'Safari', cloth: null });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 8, occupiedSlots: 3 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Safari',
                horario: '10:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Felipe', dni: 30784219, edad: 42, talleVestimenta: null })],
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toBe('Inscripción para Safari realizada con éxito (1 cupo reservado)');
        });
    });

    describe('test_talle_no_requerido_ingresado_permite_inscripcion', () => {
        it('debe permitir la inscripción en actividad sin requisito de vestimenta aunque se envíe talle opcional', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 2, name: 'Safari', cloth: null });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 8, occupiedSlots: 3 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Safari',
                horario: '10:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Felipe', dni: 30784219, edad: 42, talleVestimenta: 'XXL' })],
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toBe('Inscripción para Safari realizada con éxito (1 cupo reservado)');
        });
    });


    describe('test_inscripcion_exitosa_envia_correo_confirmacion', () => {
        it('debe disparar el envío del correo de confirmación al registrarse exitosamente', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 5 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '10:00',
                cantidad: 1,
                emailContacto: 'usuario@ejemplo.com',
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(emailHelperMock.sendInscriptionConfirmation).toHaveBeenCalledTimes(1);
        });
    });

    describe('test_inscripcion_rechazada_no_envia_correo', () => {
        it('no debe enviar correo cuando la inscripción es rechazada por falta de cupos', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 10 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                cantidad: 1,
                emailContacto: 'usuario@ejemplo.com',
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            await expect(resultPromise).rejects.toThrow(ServiceError);
            expect(emailHelperMock.sendInscriptionConfirmation).not.toHaveBeenCalled();
        });
    });

    describe('test_fallo_envio_correo_detecta_error', () => {
        it('debe detectar el fallo en el servicio de correo manteniendo la inscripción registrada', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 5 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);
            emailHelperMock.sendInscriptionConfirmation.mockRejectedValue(new Error('SMTP timeout'));

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                cantidad: 1,
                emailContacto: 'usuario@ejemplo.com',
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('REGISTRADA');
            expect(result.emailStatus).toBe(EmailStatus.FAILED);
            expect(inscriptionRepositoryMock.save).toHaveBeenCalled();
        });
    });

    describe('test_correo_confirmacion_contiene_datos_completos_inscripcion', () => {
        it('debe enviar el correo de confirmación con los datos completos de la reserva y participantes', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 5 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);
            qrHelperMock.generate.mockResolvedValue('qr-token-123');

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '10:00',
                cantidad: 2,
                emailContacto: 'felipe@ejemplo.com',
                participantes: [
                    createParticipantRawFixture({ nombre: 'Juan', dni: 30784219, edad: 42 }),
                    createParticipantRawFixture({ nombre: 'María', dni: 44123456, edad: 23 }),
                ],
            }));

            // Act
            await service.register(dto);

            // Assert
            expect(emailHelperMock.sendInscriptionConfirmation).toHaveBeenCalledWith(
                expect.objectContaining({
                    to: 'felipe@ejemplo.com',
                    activityName: 'Tirolesa',
                    timeSlot: '10:00',
                    quantity: 2,
                    qrCode: 'qr-token-123',
                    participants: expect.arrayContaining([
                        expect.objectContaining({ nombre: 'Juan', dni: 30784219 }),
                        expect.objectContaining({ nombre: 'María', dni: 44123456 }),
                    ]),
                })
            );
        });
    });


    describe('test_inscripcion_exitosa_disminuye_cupos_disponibles', () => {
        it('debe reservar y descontar los cupos correspondientes en el repositorio', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 5 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                cantidad: 2,
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(inscriptionRepositoryMock.reserveSlots).toHaveBeenCalledWith(slot.id, 2);
        });
    });

    describe('test_inscripcion_rechazada_no_disminuye_cupos_disponibles', () => {
        it('no debe descontar cupos en el repositorio si la inscripción es rechazada por falta de disponibilidad', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 8 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                cantidad: 3,
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            await expect(resultPromise).rejects.toThrow(ServiceError);
            expect(inscriptionRepositoryMock.reserveSlots).not.toHaveBeenCalled();
        });
    });

    describe('test_parque_cerrado_rechaza_inscripcion', () => {
        it('debe rechazar la inscripción si el parque se encuentra cerrado en el horario seleccionado', async () => {
            // Arrange
            parkRepositoryMock.isOpenAt.mockResolvedValue(false);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                horario: '10:00',
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            await expect(resultPromise).rejects.toThrow(new ServiceError(Errors.PARK_CLOSED));
        });
    });

    describe('test_actividad_no_disponible_rechaza_inscripcion', () => {
        it('debe rechazar la inscripción si la actividad se encuentra temporalmente deshabilitada', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 3, name: 'Palestra', enabled: false });
            activityRepositoryMock.findByName.mockResolvedValue(activity);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Palestra',
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            await expect(resultPromise).rejects.toThrow(new ServiceError(Errors.ACTIVITY_NOT_AVAILABLE));
        });
    });

    describe('test_cupos_en_otro_horario_rechaza_inscripcion', () => {
        it('debe rechazar si el turno seleccionado no tiene cupo, sin tomar cupos de otro turno', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa' });
            const slot10 = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 10 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockImplementation((actId, time) => {
                if (time === '10:00') return Promise.resolve(slot10);
                return Promise.resolve(null);
            });

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '10:00',
                cantidad: 1,
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            await expect(resultPromise).rejects.toThrow(new ServiceError(Errors.NO_AVAILABLE_SLOTS));
            expect(inscriptionRepositoryMock.reserveSlots).not.toHaveBeenCalled();
        });
    });

    describe('test_inscripcion_en_un_horario_no_modifica_cupos_de_otro', () => {
        it('debe asegurar que la reserva en un turno afecte únicamente al turno seleccionado', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa' });
            const slot10 = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 5 });
            const slot11 = createTimeSlotFixture({ id: 11, startTime: '11:00', maxCapacity: 10, occupiedSlots: 2 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockImplementation((actId, time) => {
                if (time === '10:00') return Promise.resolve(slot10);
                if (time === '11:00') return Promise.resolve(slot11);
                return Promise.resolve(null);
            });

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '10:00',
                cantidad: 2,
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(inscriptionRepositoryMock.reserveSlots).toHaveBeenCalledWith(slot10.id, 2);
            expect(inscriptionRepositoryMock.reserveSlots).not.toHaveBeenCalledWith(slot11.id, expect.anything());
        });
    });

    describe('test_cupos_agotados_antes_confirmacion_rechaza_inscripcion', () => {
        it('debe rechazar la inscripción si los cupos se agotan concurrentemente antes de confirmar', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 9 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);
            inscriptionRepositoryMock.reserveSlots.mockResolvedValue(false);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '10:00',
                cantidad: 1,
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            await expect(resultPromise).rejects.toThrow(new ServiceError(Errors.NO_AVAILABLE_SLOTS));
        });
    });

    // ----------------------------------------------------
    // Límites de edad por actividad
    // ----------------------------------------------------
    describe('test_edad_menor_al_minimo_ingresada_tirolesa_no_permite_inscripcion', () => {
        it('debe rechazar la inscripción en Tirolesa si la edad es menor a 8 años', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa', minAge: 8 });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 5 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '10:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Felipe', dni: 70784219, edad: 7, talleVestimenta: 'S' })],
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            const expectedError = Errors.PARTICIPANT_AGE_BELOW_MINIMUM?.message ?? 'La edad ingresada es menor a la edad mínima establecido para esta actividad';
            await expect(resultPromise).rejects.toThrow(new ServiceError(expectedError));
        });
    });

    describe('test_edad_ingresada_cumple_el_minimo_tirolesa_permite_inscripcion', () => {
        it('debe permitir la inscripción en Tirolesa si la edad es igual a 8 años', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa', minAge: 8 });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 5 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '10:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Pedro', dni: 64784219, edad: 8, talleVestimenta: 'S' })],
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toBe('Inscripción para Tirolesa realizada con éxito (1 cupo reservado)');
        });
    });

    describe('test_edad_ingresada_supera_el_minimo_tirolesa_permite_inscripcion', () => {
        it('debe permitir la inscripción en Tirolesa si la edad supera el mínimo de 8 años', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa', minAge: 8 });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 5 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '10:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Pedro', dni: 64784219, edad: 9, talleVestimenta: 'S' })],
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toBe('Inscripción para Tirolesa realizada con éxito (1 cupo reservado)');
        });
    });

    describe('test_edad_menor_al_minimo_ingresada_palestra_no_permite_inscripcion', () => {
        it('debe rechazar la inscripción en Palestra si la edad es menor a 12 años', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 3, name: 'Palestra', minAge: 12 });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 12, occupiedSlots: 5 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Palestra',
                horario: '10:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Joaquín', dni: 53784219, edad: 11, talleVestimenta: 'S' })],
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            const expectedError = Errors.PARTICIPANT_AGE_BELOW_MINIMUM?.message ?? 'La edad ingresada es menor al límite mínimo establecido para esta actividad';
            await expect(resultPromise).rejects.toThrow(new ServiceError(expectedError));
        });
    });

    describe('test_edad_ingresada_cumple_el_minimo_palestra_permite_inscripcion', () => {
        it('debe permitir la inscripción en Palestra si la edad es igual a 12 años', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 3, name: 'Palestra', minAge: 12 });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 12, occupiedSlots: 5 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Palestra',
                horario: '10:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Joaquín', dni: 57784219, edad: 12, talleVestimenta: 'S' })],
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toBe('Inscripción para Palestra realizada con éxito (1 cupo reservado)');
        });
    });

    describe('test_edad_ingresada_supera_el_minimo_palestra_permite_inscripcion', () => {
        it('debe permitir la inscripción en Palestra si la edad supera los 12 años', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 3, name: 'Palestra', minAge: 12 });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 12, occupiedSlots: 5 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Palestra',
                horario: '10:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Joaquín', dni: 57784219, edad: 13, talleVestimenta: 'S' })],
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toBe('Inscripción para Palestra realizada con éxito (1 cupo reservado)');
        });
    });

    // ----------------------------------------------------
    // Capacidad máxima por actividad
    // ----------------------------------------------------
    describe('test_safari_cantidad_supera_cupo_maximo_actividad_rechaza_inscripcion', () => {
        it('debe rechazar si la cantidad de personas supera la capacidad máxima total de Safari (8)', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 2, name: 'Safari', maxCapacityActivity: 8 });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 8, occupiedSlots: 0 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Safari',
                horario: '10:00',
                cantidad: 9,
                participantes: Array.from({ length: 9 }, (_, i) =>
                    createParticipantRawFixture({ nombre: `P${i}`, dni: 30000000 + i, edad: 30 })
                ),
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            const expectedError = Errors.ACTIVITY_MAX_CAPACITY_EXCEEDED?.message ?? 'La cantidad de inscriptos supera la capacidad máxima permitida para esta actividad (máximo 8)';
            await expect(resultPromise).rejects.toThrow(new ServiceError(expectedError));
        });
    });

    describe('test_tirolesa_cantidad_supera_cupo_maximo_actividad_rechaza_inscripcion', () => {
        it('debe rechazar si la cantidad de personas supera la capacidad máxima total de Tirolesa (10)', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa', maxCapacityActivity: 10 });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 0 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '10:00',
                cantidad: 11,
                participantes: Array.from({ length: 11 }, (_, i) =>
                    createParticipantRawFixture({ nombre: `P${i}`, dni: 30000000 + i, edad: 30, talleVestimenta: 'M' })
                ),
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            const expectedError = Errors.ACTIVITY_MAX_CAPACITY_EXCEEDED?.message ?? 'La cantidad de inscriptos supera la capacidad máxima permitida para esta actividad (máximo 10)';
            await expect(resultPromise).rejects.toThrow(new ServiceError(expectedError));
        });
    });

    describe('test_palestra_cantidad_supera_cupo_maximo_actividad_rechaza_inscripcion', () => {
        it('debe rechazar si la cantidad de personas supera la capacidad máxima total de Palestra (12)', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 3, name: 'Palestra', maxCapacityActivity: 12 });
            const slot = createTimeSlotFixture({ id: 15, startTime: '15:00', maxCapacity: 12, occupiedSlots: 0 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Palestra',
                horario: '15:00',
                cantidad: 13,
                participantes: Array.from({ length: 13 }, (_, i) =>
                    createParticipantRawFixture({ nombre: `P${i}`, dni: 30000000 + i, edad: 20, talleVestimenta: 'M' })
                ),
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            const expectedError = Errors.ACTIVITY_MAX_CAPACITY_EXCEEDED?.message ?? 'La cantidad de inscriptos supera la capacidad máxima permitida para esta actividad (máximo 12)';
            await expect(resultPromise).rejects.toThrow(new ServiceError(expectedError));
        });
    });

    describe('test_jardineria_cantidad_supera_cupo_maximo_actividad_rechaza_inscripcion', () => {
        it('debe rechazar si la cantidad de personas supera la capacidad máxima total de Jardinería (12)', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 4, name: 'Jardineria', maxCapacityActivity: 12 });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 12, occupiedSlots: 0 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Jardineria',
                horario: '10:00',
                cantidad: 13,
                participantes: Array.from({ length: 13 }, (_, i) =>
                    createParticipantRawFixture({ nombre: `P${i}`, dni: 30000000 + i, edad: 30 })
                ),
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            const expectedError = Errors.ACTIVITY_MAX_CAPACITY_EXCEEDED?.message ?? 'La cantidad de inscriptos supera la capacidad máxima permitida para esta actividad (máximo 12)';
            await expect(resultPromise).rejects.toThrow(new ServiceError(expectedError));
        });
    });

    // ----------------------------------------------------
    // Ventanas temporales de reserva
    // ----------------------------------------------------
    describe('test_inscripcion_exactamente_24_horas_anticipacion_permite_inscripcion', () => {
        afterEach(() => {
            jest.useRealTimers();
        });

        it('debe permitir la inscripción cuando se realiza exactamente 24 horas antes del turno', async () => {
            // Arrange
            jest.useFakeTimers();
            jest.setSystemTime(new Date('2026-10-15T10:00:00.000Z'));

            const activity = createActivityFixture({ id: 2, name: 'Safari' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 8, occupiedSlots: 3 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Safari',
                horario: '10:00',
                fecha: '2026-10-16',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Felipe', dni: 30784219, edad: 42 })],
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toContain('Inscripción para Safari realizada con éxito');
        });
    });

    describe('test_inscripcion_mas_24_horas_anticipacion_rechaza_inscripcion', () => {
        afterEach(() => {
            jest.useRealTimers();
        });

        it('debe rechazar la inscripción con más de 24 horas de anticipación', async () => {
            // Arrange
            jest.useFakeTimers();
            jest.setSystemTime(new Date('2026-10-15T09:59:00.000Z'));

            const activity = createActivityFixture({ id: 2, name: 'Safari' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 8, occupiedSlots: 3 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Safari',
                horario: '10:00',
                fecha: '2026-10-16',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Felipe', dni: 30784219, edad: 42 })],
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            const expectedError = Errors.BOOKING_TOO_EARLY?.message ?? 'Solo se permiten inscripciones dentro de las 24 horas previas al inicio del turno';
            await expect(resultPromise).rejects.toThrow(new ServiceError(expectedError));
        });
    });

    describe('test_inscripcion_exactamente_15_minutos_antes_permite_inscripcion', () => {
        afterEach(() => {
            jest.useRealTimers();
        });

        it('debe permitir la inscripción cuando se realiza exactamente 15 minutos antes del turno', async () => {
            // Arrange
            jest.useFakeTimers();
            jest.setSystemTime(new Date('2026-10-16T09:45:00.000Z'));

            const activity = createActivityFixture({ id: 2, name: 'Safari' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 8, occupiedSlots: 3 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Safari',
                horario: '10:00',
                fecha: '2026-10-16',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Felipe', dni: 30784219, edad: 42 })],
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toContain('Inscripción para Safari realizada con éxito');
        });
    });

    describe('test_inscripcion_menos_15_minutos_antes_rechaza_inscripcion', () => {
        afterEach(() => {
            jest.useRealTimers();
        });

        it('debe rechazar la inscripción con menos de 15 minutos de anticipación al turno', async () => {
            // Arrange
            jest.useFakeTimers();
            jest.setSystemTime(new Date('2026-10-16T09:46:00.000Z'));

            const activity = createActivityFixture({ id: 2, name: 'Safari' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 8, occupiedSlots: 3 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Safari',
                horario: '10:00',
                fecha: '2026-10-16',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Felipe', dni: 30784219, edad: 42 })],
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            const expectedError = Errors.BOOKING_TOO_LATE?.message ?? 'Las inscripciones cierran 15 minutos antes del inicio del turno';
            await expect(resultPromise).rejects.toThrow(new ServiceError(expectedError));
        });
    });

    describe('test_horario_limite_superior_18hs_rechaza_inscripcion', () => {
        it('debe rechazar la inscripción si el turno solicitado es a las 18:00hs (fuera de turnos disponibles)', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa' });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(null);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '18:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Felipe', dni: 30784219, edad: 42, talleVestimenta: 'XL' })],
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            await expect(resultPromise).rejects.toThrow(new ServiceError(Errors.TIME_SLOT_NOT_AVAILABLE));
        });
    });

    // ----------------------------------------------------
    // Concurrencia y solapamiento de turnos por participante
    // ----------------------------------------------------
    describe('test_actividades_diferentes_mismo_horario_rechaza_inscripcion', () => {
        it('debe rechazar la inscripción si el participante ya tiene otra actividad reservada en ese horario', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 2, name: 'Safari' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 8, occupiedSlots: 3 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            (inscriptionRepositoryMock as any).hasActiveInscriptionForParticipant?.mockResolvedValue(true);
            (inscriptionRepositoryMock as any).findActiveByParticipantDniAndSchedule?.mockResolvedValue(
                createInscriptionFixture({ activityId: 1, horario: '10:00' })
            );

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Safari',
                horario: '10:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Felipe', dni: 30784219, edad: 42 })],
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            const expectedError = Errors.PARTICIPANT_SCHEDULE_OVERLAP?.message ?? 'El participante ya tiene una inscripción en otra actividad durante el horario seleccionado';
            await expect(resultPromise).rejects.toThrow(new ServiceError(expectedError));
        });
    });

    describe('test_grupo_con_participante_horario_ocupado_rechaza_inscripcion', () => {
        it('debe rechazar la inscripción grupal si al menos un participante ya tiene una actividad reservada en ese horario', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 2, name: 'Safari' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 8, occupiedSlots: 3 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            (inscriptionRepositoryMock as any).hasActiveInscriptionForParticipant?.mockImplementation(async (dni: number) => dni === 30784219);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Safari',
                horario: '10:00',
                cantidad: 2,
                participantes: [
                    createParticipantRawFixture({ nombre: 'Felipe', dni: 30784219, edad: 42 }),
                    createParticipantRawFixture({ nombre: 'María', dni: 44123456, edad: 23 }),
                ],
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            const expectedError = Errors.GROUP_PARTICIPANT_SCHEDULE_OVERLAP?.message ?? 'Uno o mas participantes ya tienen una inscripción en otra actividad durante el horario seleccionado';
            await expect(resultPromise).rejects.toThrow(new ServiceError(expectedError));
        });
    });

    // ----------------------------------------------------
    // Coordinación de turnos por fecha y calendario del parque
    // ----------------------------------------------------
    describe('test_inscripcion_en_una_fecha_no_modifica_cupos_de_otra_fecha', () => {
        it('debe asegurar que la reserva en una fecha no afecte los cupos disponibles de otra fecha', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 2, name: 'Safari' });
            const slotFecha1 = createTimeSlotFixture({ id: 101, startTime: '10:00', maxCapacity: 8, occupiedSlots: 0, fecha: '2026-10-16' });
            const slotFecha2 = createTimeSlotFixture({ id: 102, startTime: '10:00', maxCapacity: 8, occupiedSlots: 0, fecha: '2026-10-17' });

            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockImplementation(async (actId: any, horario: any, fecha?: any) => {
                if (fecha === '2026-10-17') return slotFecha2;
                return slotFecha1;
            });

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Safari',
                fecha: '2026-10-16',
                horario: '10:00',
                cantidad: 2,
                participantes: [
                    createParticipantRawFixture({ nombre: 'Juan', dni: 30111111, edad: 30 }),
                    createParticipantRawFixture({ nombre: 'María', dni: 30222222, edad: 31 }),
                ],
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toBe('Inscripción para Safari realizada con éxito (2 cupos reservados)');
            expect(activityRepositoryMock.findTimeSlot).toHaveBeenCalledWith(activity.id, '10:00', '2026-10-16');
            expect(slotFecha2.getAvailableSlots()).toBe(8);
        });
    });

    describe('test_parque_cerrado_dia_lunes_rechaza_inscripcion', () => {
        it('debe rechazar la inscripción si la fecha seleccionada corresponde a un día lunes (parque cerrado)', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 2, name: 'Safari' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 8, occupiedSlots: 3 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Safari',
                fecha: '2026-10-19',
                horario: '10:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Felipe', dni: 30784219, edad: 42 })],
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            const expectedError = Errors.PARK_CLOSED_ON_DATE?.message ?? 'El parque está cerrado en la fecha seleccionada';
            await expect(resultPromise).rejects.toThrow(new ServiceError(expectedError));
        });
    });

    describe('test_parque_cerrado_feriado_navidad_rechaza_inscripcion', () => {
        it('debe rechazar la inscripción si la fecha seleccionada es el feriado de Navidad (25/12)', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 2, name: 'Safari' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 8, occupiedSlots: 3 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Safari',
                fecha: '2026-12-25',
                horario: '10:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Felipe', dni: 30784219, edad: 42 })],
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            const expectedError = Errors.PARK_CLOSED_ON_DATE?.message ?? 'El parque está cerrado en la fecha seleccionada';
            await expect(resultPromise).rejects.toThrow(new ServiceError(expectedError));
        });
    });

    describe('test_parque_cerrado_feriado_ano_nuevo_rechaza_inscripcion', () => {
        it('debe rechazar la inscripción si la fecha seleccionada es el feriado de Año Nuevo (01/01)', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 2, name: 'Safari' });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 8, occupiedSlots: 3 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Safari',
                fecha: '2027-01-01',
                horario: '10:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Felipe', dni: 30784219, edad: 42 })],
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            const expectedError = Errors.PARK_CLOSED_ON_DATE?.message ?? 'El parque está cerrado en la fecha seleccionada';
            await expect(resultPromise).rejects.toThrow(new ServiceError(expectedError));
        });
    });

    describe('test_inscripcion_exitosa_retorna_datos_completos', () => {
        it('debe retornar los datos completos de la reserva para el frontend en una inscripción exitosa', async () => {
            // Arrange
            const activity = createActivityFixture({
                id: 1,
                name: 'Tirolesa',
            });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 5 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                fecha: '2026-10-17',
                horario: '10:00',
                cantidad: 2,
                emailContacto: 'ana@ejemplo.com',
                participantes: [
                    createParticipantRawFixture({ nombre: 'Ana Pérez', dni: 30111222, edad: 34, talleVestimenta: 'M' }),
                    createParticipantRawFixture({ nombre: 'Leo Pérez', dni: 50111222, edad: 10, talleVestimenta: 'S' }),
                ],
            }));

            // Act
            const result: any = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toBe('Inscripción para Tirolesa realizada con éxito (2 cupos reservados)');
            expect(result.emailStatus).toBe(EmailStatus.SENT);
            expect(result.numeroInscripcion).toBeDefined();
            expect(typeof result.numeroInscripcion).toBe('string');
            expect(result.actividad).toBe('Tirolesa');
            expect(result.fecha).toBe('2026-10-17');
            expect(result.horario).toBe('10:00');
            expect(result.participantes).toBeDefined();
            expect(result.participantes).toHaveLength(2);
            expect(result.participantes[0].qr).toBeDefined();
            expect(result.participantes[1].qr).toBeDefined();
        });
    });
});

