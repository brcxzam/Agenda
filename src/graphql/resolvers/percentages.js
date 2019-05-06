import { Percentage } from '../../database/model';

export default {
    percentages: async ({ id }) => {
        const percentages = await Percentage.findAll({
            where: {
                academic: id
            }
        });
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