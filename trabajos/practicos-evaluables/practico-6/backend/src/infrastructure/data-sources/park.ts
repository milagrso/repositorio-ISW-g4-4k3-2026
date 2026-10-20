import { ParkModel } from '../postgresql/models/park.model';
import { ActivityModel } from '../postgresql/models/activity.model';
import { ParkDataSource, ParkEntity } from '../../domain';

export class PostgresParkDataSource implements ParkDataSource {

    constructor() {}

    public async findAll(): Promise<ParkEntity[]> {
        const parks = await ParkModel.findAll({
            include: [{ model: ActivityModel, as: 'activities' }],
        });
        return parks.map((p) => ParkEntity.fromObject(p.toJSON ? p.toJSON() : p.dataValues));
    }

    public async findById(id: string | number): Promise<ParkEntity | null> {
        const num = Number(id);
        if (!Number.isInteger(num) || num <= 0) return null;
        const park = await ParkModel.findByPk(num, {
            include: [{ model: ActivityModel, as: 'activities' }],
        });
        if (!park) return null;
        return ParkEntity.fromObject(park.toJSON ? park.toJSON() : park.dataValues);
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
