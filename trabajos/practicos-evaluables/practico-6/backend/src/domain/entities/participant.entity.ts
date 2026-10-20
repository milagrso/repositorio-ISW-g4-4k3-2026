import { ClothEntity } from './cloth.entity';

export class ParticipantEntity {
    constructor(
        public nombre: string,
        public dni: number,
        public edad: number,
        public talleCalzado: number | null = null,
        public talleVestimenta: string | null = null
    ) {}

    meetsMinAge(minAge: number): boolean {
        return this.edad >= minAge;
    }

    hasValidClothSize(cloth: ClothEntity | any): boolean {
        if (!cloth) return true;
        const tipo = ((cloth.tipo || cloth.detail || '') as string).toUpperCase();
        if (tipo === 'CALZADO') {
            if (this.talleCalzado === null || this.talleCalzado === undefined) return false;
            return typeof cloth.isValidSize === 'function' ? cloth.isValidSize(this.talleCalzado) : true;
        }
        if (tipo === 'VESTIMENTA') {
            if (!this.talleVestimenta) return false;
            return typeof cloth.isValidSize === 'function' ? cloth.isValidSize(this.talleVestimenta) : true;
        }
        if (this.talleVestimenta) {
            return typeof cloth.isValidSize === 'function' ? cloth.isValidSize(this.talleVestimenta) : true;
        }
        if (this.talleCalzado !== null && this.talleCalzado !== undefined) {
            return typeof cloth.isValidSize === 'function' ? cloth.isValidSize(this.talleCalzado) : true;
        }
        return false;
    }

    static fromObject(object: { [key: string]: any }): ParticipantEntity {
        if (object instanceof ParticipantEntity) {
            return object;
        }
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
