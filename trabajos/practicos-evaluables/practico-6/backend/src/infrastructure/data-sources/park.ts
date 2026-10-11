import { ParkModel } from '../postgresql/models/park.model';
import { ParkDataSource } from '../../domain';

export class PostgresParkDataSource implements ParkDataSource {

    constructor() {
        ParkModel.sync();
    }

    public async isOpenAt(time: string): Promise<boolean> {
        try {
            const park = await ParkModel.findOne();

            if (!park) {
                return true;
            }

            const { status, openTime, closeTime } = park.dataValues;

            if (status !== 'OPEN') {
                return false;
            }

            if (openTime && closeTime) {
                return time >= openTime && time <= closeTime;
            }

            return true;
        } catch (error) {
            throw error;
        }
    }
}
