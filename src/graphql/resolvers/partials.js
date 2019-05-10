import { Partial, Percentage } from '../../database/model';

async function validatePercent(percent, obtained) {
    const percentage = await Percentage.findByPk(percent);
    if (percentage.percent < obtained || obtained < 0) {
        throw new Error("percentage obtained invalid");
    }
}

export default {
    cPartial: async ({ data }) => {
        const { percent, obtained } = data;
        await validatePercent(percent, obtained);
        const partial = await Partial.create(data);
        return partial;
    },
    partials: async ({ id }) => {
        const partials = await Partial.findAll({
            where: {
                subject: id
            }
        });
        return partials;
    },
    uPartial: async ({ id, data }) => {
        const { percent, obtained } = data;
        await validatePercent(percent, obtained);
        await Partial.update(data, {
            where: {
                id
            }
        })
    }
}