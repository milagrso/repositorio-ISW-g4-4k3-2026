export class ParticipantEntity {
    private constructor(
        public nombre: string,
        public dni: number,
        public edad: number,
        public talleCalzado: number | null = null,
        public talleVestimenta: string | null = null
    ) {}

    static fromObject(object: { [key: string]: any }): ParticipantEntity {
        const { nombre, dni, edad, talleCalzado = null, talleVestimenta = null } = object;

        return new ParticipantEntity(
            nombre,
            dni,
            edad,
            talleCalzado,
            talleVestimenta
        );
    }
}
