export class ClothEntity {
    private constructor(
        public tipo: string,
        public talleMinimo: number,
        public talleMaximo: number
    ) {}

    isValidSize(size: number): boolean {
        return (
            typeof size === 'number' &&
            Number.isInteger(size) &&
            size >= this.talleMinimo &&
            size <= this.talleMaximo
        );
    }

    static fromObject(object: { [key: string]: any }): ClothEntity {
        const { tipo, talleMinimo, talleMaximo } = object;

        return new ClothEntity(
            tipo,
            talleMinimo,
            talleMaximo
        );
    }
}
