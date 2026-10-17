export class ParkEntity {
    private constructor(
        public id: string | number,
        public name: string = 'EcoHarmony Park',
        public status: string = 'OPEN',
        public openTime: string = '08:30',
        public closeTime: string = '19:00'
    ) {}

    isOpen(): boolean {
        return this.status === 'OPEN';
    }

    static fromObject(object: { [key: string]: any }): ParkEntity {
        const { _id, id, name = 'EcoHarmony Park', status = 'OPEN', openTime = '08:30', closeTime = '19:00' } = object;
        return new ParkEntity(_id || id, name, status, openTime, closeTime);
    }
}
