export class TimeSlotEntity {
    private constructor(
        public id: string | number,
        public activityId: string | number,
        public startTime: string,
        public endTime: string,
        public maxCapacity: number,
        public occupiedSlots: number = 0,
        public fecha?: string
    ) {}

    getAvailableSlots(): number {
        return this.maxCapacity - this.occupiedSlots;
    }

    hasAvailableSlots(qty: number): boolean {
        return this.getAvailableSlots() >= qty;
    }

    reserve(qty: number): void {
        this.occupiedSlots += qty;
    }

    static fromObject(object: { [key: string]: any }): TimeSlotEntity {
        const { _id, id, activityId, startTime, endTime, maxCapacity, occupiedSlots = 0, fecha } = object;

        return new TimeSlotEntity(
            _id || id,
            activityId,
            startTime,
            endTime,
            maxCapacity,
            occupiedSlots,
            fecha
        );
    }
}
