import { RegisterInscriptionDto } from './register-inscription.dto';
import { Errors } from 'src/domain/messages/error-type.constants';
import {
    createRegisterInscriptionRawFixture,
    createParticipantRawFixture,
} from 'test/fixtures';

describe('RegisterInscriptionDto - Validation & Creation', () => {

    describe('test_tirolesa_sin_horario_seleccionado_rechaza_inscripcion', () => {
        it('debe rechazar si no se selecciona horario para Tirolesa', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: null,
                cantidad: 1,
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.TIME_SLOT_REQUIRED.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_safari_sin_horario_seleccionado_rechaza_inscripcion', () => {
        it('debe rechazar si no se selecciona horario para Safari', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                actividad: 'Safari',
                horario: null,
                cantidad: 3,
                participantes: [
                    createParticipantRawFixture({ nombre: 'Ana', dni: 35123456, edad: 30 }),
                    createParticipantRawFixture({ nombre: 'Luis', dni: 36123456, edad: 28 }),
                    createParticipantRawFixture({ nombre: 'Carla', dni: 37123456, edad: 25 }),
                ],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.TIME_SLOT_REQUIRED.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_palestra_sin_horario_seleccionado_rechaza_inscripcion', () => {
        it('debe rechazar si no se selecciona horario para Palestra', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                actividad: 'Palestra',
                horario: null,
                cantidad: 1,
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.TIME_SLOT_REQUIRED.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_jardineria_sin_horario_seleccionado_rechaza_inscripcion', () => {
        it('debe rechazar si no se selecciona horario para Jardinería', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                actividad: 'Jardineria',
                horario: null,
                cantidad: 1,
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.TIME_SLOT_REQUIRED.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_actividad_no_seleccionada_rechaza_inscripcion', () => {
        it('debe rechazar si no se selecciona ninguna actividad', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                actividad: null,
                horario: '10:00',
                cantidad: 1,
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.ACTIVITY_REQUIRED.message);
            expect(dto).toBeUndefined();
        });
    });


    describe('test_cero_personas_rechaza_inscripcion', () => {
        it('debe rechazar si la cantidad de personas ingresada es cero', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                cantidad: 0,
                participantes: [],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.INSCRIPTION_QUANTITY_ZERO.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_cantidad_negativa_rechaza_inscripcion', () => {
        it('debe rechazar si la cantidad de inscriptos es negativa', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                cantidad: -2,
                participantes: [],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.INSCRIPTION_QUANTITY_NEGATIVE.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_cantidad_no_ingresada_rechaza_inscripcion', () => {
        it('debe rechazar si no se ingresa la cantidad de inscriptos', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                cantidad: null,
                participantes: [],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.INSCRIPTION_QUANTITY_REQUIRED.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_cantidad_mayor_a_datos_participantes_rechaza_inscripcion', () => {
        it('debe rechazar si la cantidad declarada es mayor que la lista de participantes', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                cantidad: 3,
                participantes: [
                    createParticipantRawFixture({ nombre: 'Juan', dni: 30784219, edad: 42 }),
                    createParticipantRawFixture({ nombre: 'María', dni: 44123456, edad: 23 }),
                ],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.PARTICIPANTS_COUNT_MISMATCH.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_cantidad_menor_a_datos_participantes_rechaza_inscripcion', () => {
        it('debe rechazar si la cantidad declarada es menor que la lista de participantes', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                cantidad: 2,
                participantes: [
                    createParticipantRawFixture({ nombre: 'Juan', dni: 30784219, edad: 42 }),
                    createParticipantRawFixture({ nombre: 'María', dni: 44123456, edad: 23 }),
                    createParticipantRawFixture({ nombre: 'Pedro', dni: 40123456, edad: 27 }),
                ],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.PARTICIPANTS_COUNT_MISMATCH.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_cantidad_decimal_rechaza_inscripcion', () => {
        it('debe rechazar si la cantidad de inscriptos es un número decimal', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                cantidad: 2.5,
                participantes: [],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.INSCRIPTION_QUANTITY_DECIMAL.message);
            expect(dto).toBeUndefined();
        });
    });



    describe('test_nombre_ingresado_permite_inscripcion', () => {
        it('debe permitir la inscripción con nombre de participante ingresado correctamente', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ nombre: 'Felipe' })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBeUndefined();
            expect(dto).toBeInstanceOf(RegisterInscriptionDto);
            expect(dto!.participantes[0].nombre).toBe('Felipe');
        });
    });

    describe('test_nombre_no_ingresado_rechaza_inscripcion', () => {
        it('debe rechazar si no se ingresa el nombre del participante', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ nombre: null })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.PARTICIPANT_NAME_REQUIRED.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_nombre_con_numeros_rechaza_inscripcion', () => {
        it('debe rechazar si el nombre del participante contiene números', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ nombre: 'Felipe2' })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.PARTICIPANT_NAME_WITH_NUMBERS.message);
            expect(dto).toBeUndefined();
        });
    });


    describe('test_nombre_con_caracteres_especiales_rechaza_inscripcion', () => {
        it('debe rechazar si el nombre contiene caracteres especiales no permitidos', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ nombre: 'Felipe@' })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.PARTICIPANT_NAME_SPECIAL_CHARS.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_nombre_solo_espacios_rechaza_inscripcion', () => {
        it('debe rechazar si el nombre del participante contiene únicamente espacios', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ nombre: '   ' })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.PARTICIPANT_NAME_ONLY_SPACES.message);
            expect(dto).toBeUndefined();
        });
    });


    describe('test_dni_ingresado_permite_inscripcion', () => {
        it('debe permitir la inscripción con DNI válido ingresado', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ dni: 30784219 })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBeUndefined();
            expect(dto).toBeInstanceOf(RegisterInscriptionDto);
            expect(dto!.participantes[0].dni).toBe(30784219);
        });
    });

    describe('test_dni_no_ingresado_rechaza_inscripcion', () => {
        it('debe rechazar si no se ingresa el DNI del participante', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ dni: null })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.PARTICIPANT_DNI_REQUIRED.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_dni_numero_entero_positivo_permite_inscripcion', () => {
        it('debe permitir la inscripción cuando el DNI es un número entero positivo', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ dni: 30784219 })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBeUndefined();
            expect(dto).toBeInstanceOf(RegisterInscriptionDto);
            expect(dto!.participantes[0].dni).toBe(30784219);
        });
    });

    describe('test_dni_numero_decimal_rechaza_inscripcion', () => {
        it('debe rechazar si el DNI contiene decimales', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ dni: 30784219.5 })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.PARTICIPANT_DNI_DECIMAL.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_dni_letras_rechaza_inscripcion', () => {
        it('debe rechazar si el DNI contiene letras', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ dni: '3078421A' })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.PARTICIPANT_DNI_LETTERS.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_dni_con_espacios_rechaza_inscripcion', () => {
        it('debe rechazar si el DNI contiene espacios en blanco', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ dni: '30 784 219' })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.PARTICIPANT_DNI_WITH_SPACES.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_dni_solo_espacios_rechaza_inscripcion', () => {
        it('debe rechazar si el DNI contiene únicamente espacios en blanco', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ dni: '        ' })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.PARTICIPANT_DNI_ONLY_SPACES.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_dni_7_digitos_permite_inscripcion', () => {
        it('debe permitir la inscripción con un DNI válido de 7 dígitos', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ dni: 8765432 })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBeUndefined();
            expect(dto).toBeInstanceOf(RegisterInscriptionDto);
            expect(dto!.participantes[0].dni).toBe(8765432);
        });
    });

    describe('test_dni_8_digitos_permite_inscripcion', () => {
        it('debe permitir la inscripción con un DNI válido de 8 dígitos', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ dni: 30784219 })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBeUndefined();
            expect(dto).toBeInstanceOf(RegisterInscriptionDto);
            expect(dto!.participantes[0].dni).toBe(30784219);
        });
    });

    describe('test_dni_mas_8_digitos_rechaza_inscripcion', () => {
        it('debe rechazar si el DNI tiene más de 8 dígitos', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ dni: 123456789 })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.PARTICIPANT_DNI_MAX_DIGITS.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_dni_menos_7_digitos_rechaza_inscripcion', () => {
        it('debe rechazar si el DNI tiene menos de 7 dígitos', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ dni: 123456 })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.PARTICIPANT_DNI_MIN_DIGITS.message);
            expect(dto).toBeUndefined();
        });
    });


    describe('test_edad_ingresada_permite_inscripcion', () => {
        it('debe permitir la inscripción cuando se ingresa una edad válida', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ edad: 42 })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBeUndefined();
            expect(dto).toBeInstanceOf(RegisterInscriptionDto);
            expect(dto!.participantes[0].edad).toBe(42);
        });
    });

    describe('test_edad_no_ingresada_rechaza_inscripcion', () => {
        it('debe rechazar si no se ingresa la edad del participante', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ edad: null })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.PARTICIPANT_AGE_REQUIRED.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_edad_entera_positiva_permite_inscripcion', () => {
        it('debe permitir la inscripción con edad entera positiva', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ edad: 42 })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBeUndefined();
            expect(dto).toBeInstanceOf(RegisterInscriptionDto);
            expect(dto!.participantes[0].edad).toBe(42);
        });
    });

    describe('test_edad_con_letras_rechaza_inscripcion', () => {
        it('debe rechazar si la edad contiene letras o texto', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ edad: 'cuarenta' })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.PARTICIPANT_AGE_NOT_A_NUMBER.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_edad_decimal_rechaza_inscripcion', () => {
        it('debe rechazar si la edad contiene números decimales', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ edad: 42.5 })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.PARTICIPANT_AGE_DECIMAL.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_edad_negativa_rechaza_inscripcion', () => {
        it('debe rechazar si la edad tiene un valor negativo', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ edad: -5 })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.PARTICIPANT_AGE_NEGATIVE.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_edad_solo_espacios_rechaza_inscripcion', () => {
        it('debe rechazar si la edad contiene únicamente espacios en blanco', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ edad: '   ' })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.PARTICIPANT_AGE_ONLY_SPACES.message);
            expect(dto).toBeUndefined();
        });
    });


    describe('test_talle_vestimenta_tirolesa_valido_permite_inscripcion', () => {
        it('debe permitir la inscripción con un talle de vestimenta habilitado para Tirolesa', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '15:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ talleVestimenta: 'XL' })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBeUndefined();
            expect(dto).toBeInstanceOf(RegisterInscriptionDto);
            expect((dto!.participantes[0] as any).talleVestimenta).toBe('XL');
        });
    });

    describe('test_talle_vestimenta_tirolesa_menor_al_minimo_rechaza_inscripcion', () => {
        it('debe rechazar si el talle de vestimenta es menor a XS para Tirolesa', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '15:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ talleVestimenta: 'XXS' })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            const expectedError = Errors.CLOTH_SIZE_OUT_OF_RANGE?.message ?? 'El talle de vestimenta disponible es XS, S, M, L, XL, XXL';
            expect(error).toBe(expectedError);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_talle_vestimenta_tirolesa_mayor_al_maximo_rechaza_inscripcion', () => {
        it('debe rechazar si el talle de vestimenta es mayor a XXL para Tirolesa', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '15:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ talleVestimenta: 'XXXL' })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            const expectedError = Errors.CLOTH_SIZE_OUT_OF_RANGE?.message ?? 'El talle de vestimenta disponible es de XS a XXL';
            expect(error).toBe(expectedError);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_talle_vestimenta_tirolesa_con_numeros_rechaza_inscripcion', () => {
        it('debe rechazar si el talle de vestimenta contiene números para Tirolesa', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '15:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ talleVestimenta: 50 })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            const expectedError = Errors.CLOTH_SIZE_FORMAT_INVALID?.message ?? 'El talle de vestimenta debe ser en formato: XS, S, M, L, XL, XXL';
            expect(error).toBe(expectedError);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_talle_vestimenta_Tirolesa_solo_espacios_rechaza_inscripcion', () => {
        it('debe rechazar si el talle de vestimenta contiene solo espacios para Tirolesa', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '15:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ talleVestimenta: '   ' })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            const expectedError = Errors.CLOTH_SIZE_ONLY_SPACES?.message ?? 'El talle de vestimenta no puede contener únicamente espacios en blanco';
            expect(error).toBe(expectedError);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_talle_con_letras_tirolesa_rechaza_inscripcion', () => {
        it('debe rechazar si el talle de vestimenta contiene texto inválido para Tirolesa', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '15:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ talleVestimenta: 'equisele' })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            const expectedError = Errors.CLOTH_SIZE_INVALID_VALUE?.message ?? 'El talle de vestimenta debe ser un valor con formato XS a XXL';
            expect(error).toBe(expectedError);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_talle_vestimenta_palestra_valido_permite_inscripcion', () => {
        it('debe permitir la inscripción con un talle de vestimenta habilitado para Palestra', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                actividad: 'Palestra',
                horario: '15:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ talleVestimenta: 'XL' })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBeUndefined();
            expect(dto).toBeInstanceOf(RegisterInscriptionDto);
            expect((dto!.participantes[0] as any).talleVestimenta).toBe('XL');
        });
    });

    describe('test_talle_vestimenta_palestra_menor_al_minimo_rechaza_inscripcion', () => {
        it('debe rechazar si el talle de vestimenta es menor a XS para Palestra', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                actividad: 'Palestra',
                horario: '15:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ talleVestimenta: 'XXS' })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            const expectedError = Errors.CLOTH_SIZE_OUT_OF_RANGE?.message ?? 'El talle de vestimenta disponible es XS, S, M, L, XL, XXL';
            expect(error).toBe(expectedError);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_talle_vestimenta_palestra_mayor_al_maximo_rechaza_inscripcion', () => {
        it('debe rechazar si el talle de vestimenta es mayor a XXL para Palestra', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                actividad: 'Palestra',
                horario: '15:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ talleVestimenta: 'XXXL' })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            const expectedError = Errors.CLOTH_SIZE_OUT_OF_RANGE?.message ?? 'El talle de vestimenta disponible es de XS a XXL';
            expect(error).toBe(expectedError);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_talle_vestimenta_palestra_con_numeros_rechaza_inscripcion', () => {
        it('debe rechazar si el talle de vestimenta contiene números para Palestra', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                actividad: 'Palestra',
                horario: '15:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ talleVestimenta: 50 })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            const expectedError = Errors.CLOTH_SIZE_FORMAT_INVALID?.message ?? 'El talle de vestimenta debe ser en formato: XS, S, M, L, XL, XXL';
            expect(error).toBe(expectedError);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_talle_vestimenta_Palestra_solo_espacios_rechaza_inscripcion', () => {
        it('debe rechazar si el talle de vestimenta contiene solo espacios para Palestra', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                actividad: 'Palestra',
                horario: '15:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ talleVestimenta: '   ' })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            const expectedError = Errors.CLOTH_SIZE_ONLY_SPACES?.message ?? 'El talle de vestimenta no puede contener únicamente espacios en blanco';
            expect(error).toBe(expectedError);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_talle_con_letras_palestra_rechaza_inscripcion', () => {
        it('debe rechazar si el talle de vestimenta contiene texto inválido para Palestra', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                actividad: 'Palestra',
                horario: '15:00',
                cantidad: 1,
                participantes: [createParticipantRawFixture({ talleVestimenta: 'equisele' })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            const expectedError = Errors.CLOTH_SIZE_INVALID_VALUE?.message ?? 'El talle de vestimenta debe ser un valor con formato XS a XXL';
            expect(error).toBe(expectedError);
            expect(dto).toBeUndefined();
        });
    });


    describe('test_todos_participantes_con_datos_completos_permite_inscripcion', () => {
        it('debe permitir la inscripción de un grupo con todos los datos completos y válidos', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '10:00',
                cantidad: 3,
                participantes: [
                    createParticipantRawFixture({ nombre: 'Felipe', dni: 30784219, edad: 42, talleVestimenta: 'XL' }),
                    createParticipantRawFixture({ nombre: 'Mariana', dni: 32456789, edad: 38, talleVestimenta: 'M' }),
                    createParticipantRawFixture({ nombre: 'Joaquín', dni: 45123987, edad: 21, talleVestimenta: 'S' }),
                ],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBeUndefined();
            expect(dto).toBeInstanceOf(RegisterInscriptionDto);
            expect(dto!.participantes).toHaveLength(3);
        });
    });

    describe('test_un_participante_con_datos_incompletos_rechaza_inscripcion', () => {
        it('debe rechazar si un participante del grupo tiene datos obligatorios incompletos', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '10:00',
                cantidad: 3,
                participantes: [
                    createParticipantRawFixture({ nombre: 'Felipe', dni: 30784219, edad: 42 }),
                    createParticipantRawFixture({ nombre: 'Mariana', dni: null, edad: 38 }),
                    createParticipantRawFixture({ nombre: 'Joaquín', dni: 45123987, edad: 21 }),
                ],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.PARTICIPANT_INCOMPLETE_DATA.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_varios_participantes_con_datos_incompletos_rechaza_inscripcion', () => {
        it('debe rechazar si múltiples participantes del grupo tienen datos incompletos', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                actividad: 'Tirolesa',
                horario: '10:00',
                cantidad: 3,
                participantes: [
                    createParticipantRawFixture({ nombre: 'Felipe', dni: 30784219, edad: 42 }),
                    createParticipantRawFixture({ nombre: null, dni: 32456789, edad: 38 }),
                    createParticipantRawFixture({ nombre: 'Joaquín', dni: 45123987, edad: null }),
                ],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.PARTICIPANT_INCOMPLETE_DATA.message);
            expect(dto).toBeUndefined();
        });
    });


    describe('test_terminos_condiciones_aceptados_permite_inscripcion', () => {
        it('debe permitir la inscripción cuando los términos y condiciones están aceptados', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                aceptaTerminos: true,
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBeUndefined();
            expect(dto).toBeInstanceOf(RegisterInscriptionDto);
            expect(dto!.aceptaTerminos).toBe(true);
        });
    });

    describe('test_terminos_condiciones_vacio_rechaza_inscripcion', () => {
        it('debe rechazar la inscripción si no se aceptan los términos y condiciones', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                aceptaTerminos: false,
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.TERMS_NOT_ACCEPTED.message);
            expect(dto).toBeUndefined();
        });
    });


    describe('test_inscripcion_con_datos_incompletos_no_envia_correo', () => {
        it('debe rechazar a nivel DTO por DNI faltante impidiendo el envío de correo', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [createParticipantRawFixture({ dni: null })],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBe(Errors.PARTICIPANT_DNI_REQUIRED.message);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_fecha_no_ingresada_rechaza_inscripcion', () => {
        it('debe rechazar si no se ingresa la fecha del turno', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                fecha: null,
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            const expectedError = Errors.INSCRIPTION_DATE_REQUIRED?.message ?? 'Debe ingresar la fecha del turno';
            expect(error).toBe(expectedError);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_fecha_formato_invalido_rechaza_inscripcion', () => {
        it('debe rechazar si el formato de la fecha no es YYYY-MM-DD', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                fecha: '16/10/2026',
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            const expectedError = Errors.INSCRIPTION_DATE_FORMAT_INVALID?.message ?? 'El formato de fecha debe ser YYYY-MM-DD';
            expect(error).toBe(expectedError);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_email_contacto_no_ingresado_rechaza_inscripcion', () => {
        it('debe rechazar si no se ingresa el correo electrónico de contacto', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                emailContacto: null,
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            const expectedError = Errors.CONTACT_EMAIL_REQUIRED?.message ?? 'El correo electrónico de contacto es obligatorio';
            expect(error).toBe(expectedError);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_email_contacto_formato_invalido_rechaza_inscripcion', () => {
        it('debe rechazar si el formato del correo electrónico de contacto no es válido', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                emailContacto: 'felipe-sin-arroba',
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            const expectedError = Errors.CONTACT_EMAIL_INVALID?.message ?? 'El correo electrónico ingresado no tiene un formato válido';
            expect(error).toBe(expectedError);
            expect(dto).toBeUndefined();
        });
    });

    describe('test_nombre_con_dieresis_permite_inscripcion', () => {
        it('debe permitir la inscripción cuando el nombre contiene diéresis', () => {
            // Arrange
            const raw = createRegisterInscriptionRawFixture({
                participantes: [
                    createParticipantRawFixture({
                        nombre: 'Martín Agüero',
                        dni: 30784219,
                        edad: 42,
                    }),
                ],
            });

            // Act
            const [error, dto] = RegisterInscriptionDto.create(raw);

            // Assert
            expect(error).toBeUndefined();
            expect(dto).toBeDefined();
        });
    });
});
