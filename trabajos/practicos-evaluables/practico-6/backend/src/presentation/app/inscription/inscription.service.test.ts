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
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Juan' })],
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
                cantidad: 3,
                participantes: [
                    createParticipantRawFixture({ nombre: 'Juan' }),
                    createParticipantRawFixture({ nombre: 'María' }),
                    createParticipantRawFixture({ nombre: 'Pedro' }),
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
                cantidad: 3,
                participantes: [
                    createParticipantRawFixture({ nombre: 'Juan' }),
                    createParticipantRawFixture({ nombre: 'María' }),
                    createParticipantRawFixture({ nombre: 'Pedro' }),
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
                cantidad: 3,
                participantes: [
                    createParticipantRawFixture({ nombre: 'Juan' }),
                    createParticipantRawFixture({ nombre: 'María' }),
                    createParticipantRawFixture({ nombre: 'Pedro' }),
                ],
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            await expect(resultPromise).rejects.toThrow(new ServiceError(Errors.QUANTITY_EXCEEDS_AVAILABLE_SLOTS));
        });
    });


    describe('test_talle_requerido_ingresado_permite_inscripcion', () => {
        it('debe permitir la inscripción en actividad que exige calzado si se ingresa talle válido', async () => {
            // Arrange
            const cloth = createClothFixture({ requerido: true, minSize: 19, maxSize: 48 });
            const activity = createActivityFixture({ id: 3, name: 'Palestra', cloth });
            const slot = createTimeSlotFixture({ id: 15, startTime: '15:00', maxCapacity: 10, occupiedSlots: 5 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Palestra',
                horario: '15:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Felipe', talleCalzado: 40 })],
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toBe('Inscripción para Palestra realizada con éxito (1 cupo reservado)');
        });
    });

    describe('test_talle_requerido_no_ingresado_rechaza_inscripcion', () => {
        it('debe rechazar la inscripción en actividad que exige calzado si falta el talle', async () => {
            // Arrange
            const cloth = createClothFixture({ requerido: true });
            const activity = createActivityFixture({ id: 3, name: 'Palestra', cloth });
            const slot = createTimeSlotFixture({ id: 15, startTime: '15:00', maxCapacity: 10, occupiedSlots: 5 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Palestra',
                horario: '15:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Felipe', talleCalzado: null })],
            }));

            // Act
            const resultPromise = service.register(dto);

            // Assert
            await expect(resultPromise).rejects.toThrow(new ServiceError(Errors.SHOE_SIZE_REQUIRED));
        });
    });

    describe('test_talle_no_requerido_no_ingresado_permite_inscripcion', () => {
        it('debe permitir la inscripción en actividad sin requisito de calzado sin enviar talle', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa', cloth: null });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 5 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '10:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Felipe', talleCalzado: null })],
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toBe('Inscripción para Tirolesa realizada con éxito (1 cupo reservado)');
        });
    });

    describe('test_talle_no_requerido_ingresado_permite_inscripcion', () => {
        it('debe permitir la inscripción en actividad sin requisito de calzado aunque se envíe talle', async () => {
            // Arrange
            const activity = createActivityFixture({ id: 1, name: 'Tirolesa', cloth: null });
            const slot = createTimeSlotFixture({ id: 10, startTime: '10:00', maxCapacity: 10, occupiedSlots: 5 });
            activityRepositoryMock.findByName.mockResolvedValue(activity);
            activityRepositoryMock.findTimeSlot.mockResolvedValue(slot);

            const dto = new RegisterInscriptionDto(createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '10:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ nombre: 'Felipe', talleCalzado: 40 })],
            }));

            // Act
            const result = await service.register(dto);

            // Assert
            expect(result.status).toBe('EXITOSA');
            expect(result.message).toBe('Inscripción para Tirolesa realizada con éxito (1 cupo reservado)');
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
            expect(inscriptionRepositoryMock.reserveSlots).toHaveBeenCalledWith('slot-10', 2);
            expect(inscriptionRepositoryMock.reserveSlots).not.toHaveBeenCalledWith('slot-11', expect.anything());
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
});
