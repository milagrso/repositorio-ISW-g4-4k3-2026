import { ClothEntity } from './cloth.entity';

export class ActivityEntity {
    private constructor(
        public id: string | number,
        public name: string,
        public enabled: boolean = true,
        public cloth: ClothEntity | null = null
    ) {}

    isAvailable(): boolean {
        return this.enabled;
    }

    requiresCloth(): boolean {
        return this.cloth !== null;
    }

    validateCloth(size: number): boolean {
        if (!this.cloth) return true;
        return this.cloth.isValidSize(size);
    }

    static fromObject(object: { [key: string]: any }): ActivityEntity {
        const { _id, id, name, enabled = true, cloth = null } = object;

        const clothEntity = cloth
            ? (cloth instanceof ClothEntity ? cloth : ClothEntity.fromObject(cloth))
            : null;

        return new ActivityEntity(
            _id || id,
            name,
            enabled,
            clothEntity
        );
    }
}
