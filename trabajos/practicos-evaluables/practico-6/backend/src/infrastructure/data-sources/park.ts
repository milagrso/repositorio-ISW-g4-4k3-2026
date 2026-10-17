import { ParkModel } from '../postgresql/models/park.model';
import { ParkDataSource, ParkEntity } from '../../domain';

export class PostgresParkDataSource implements ParkDataSource {

    constructor() {
        ParkModel.sync({ alter: true });
    }

    public async findAll(): Promise<ParkEntity[]> {
        const parks = await ParkModel.findAll();
        return parks.map((p) => ParkEntity.fromObject(p.dataValues));
    }

    public async findById(id: string | number): Promise<ParkEntity | null> {
        const num = Number(id);
        if (!Number.isInteger(num) || num <= 0) return null;
        const park = await ParkModel.findByPk(num);
        if (!park) return null;
        return ParkEntity.fromObject(park.dataValues);
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
