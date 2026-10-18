export class ClothEntity {
    private constructor(
        public tipo: string,
        public tallesValidos?: string[]
    ) {}

    isValidSize(size: any): boolean {
        if (typeof size === 'string') {
            const valid = this.tallesValidos || ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
            return valid.includes(size.toUpperCase());
        }
        if (typeof size === 'number') {
            return Number.isInteger(size) && size >= 19 && size <= 48;
        }
        return false;
    }

    static fromObject(object: { [key: string]: any }): ClothEntity {
        const { tipo, tallesValidos } = object;

        return new ClothEntity(
            tipo,
            tallesValidos
        );
    }
}
