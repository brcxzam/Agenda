import { Day } from '../../database/model';

export default {
    days: async ({ id }) => {
        const days = await Day.findByPk(id);
        return days;
    },
    uDays: async ({ id, data }) => {
        await Day.update(data,{
            where: {
                id
            }
        });
        return 'Done';
    },
}