export class ClothEntity {
    private constructor(
        public tipo: string,
        public talleMinimo: number | string,
        public talleMaximo: number | string,
        public tallesValidos?: string[]
    ) {}

    isValidSize(size: any): boolean {
        if (typeof size === 'string') {
            const valid = this.tallesValidos || ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
            return valid.includes(size.toUpperCase());
        }
        if (typeof size === 'number') {
            const min = typeof this.talleMinimo === 'number' ? this.talleMinimo : 19;
            const max = typeof this.talleMaximo === 'number' ? this.talleMaximo : 48;
            return Number.isInteger(size) && size >= min && size <= max;
        }
        return false;
    }

    static fromObject(object: { [key: string]: any }): ClothEntity {
        const { tipo, talleMinimo, talleMaximo, tallesValidos } = object;

        return new ClothEntity(
            tipo,
            talleMinimo,
            talleMaximo,
            tallesValidos
        );
    }
}
