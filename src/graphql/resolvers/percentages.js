import { Percentage } from '../../database/model';

export default {
    percentages: async ({ id }) => {
        const percentages = await Percentage.findByPk(id);
        return percentages;
    },
    uPercentages: async ({ id, data }) => {
        await Percentage.update(data,{
            where: {
                id
            }
        });
        return 'Done';
    },
}