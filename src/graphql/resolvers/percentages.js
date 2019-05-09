import { Percentage } from '../../database/model';

export default {
    percentages: async ({ id }) => {
        const percentages = await Percentage.findAll({
            where: {
                academic: id
            }
        });
        return percentages;
    }
}