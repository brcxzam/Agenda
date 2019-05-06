import { Schedule } from '../../database/model';
//CRU
export default {
    cSchedule: async ({data}) => {
        const schedule = await Schedule.create(data);
        return schedule;
    },
    schedules: async ({id}) => {
        const Schedules = await Schedule.findAll({
            where: {
                subject: id
            }
        });
        return Schedules;
    },
    uSchedule: async ({id, data}) => {
        await Schedule.update(data,{
            where:{
                id
            }
        })
    }
}