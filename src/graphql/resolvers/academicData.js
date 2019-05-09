import { Academic_data, Percentage } from '../../database/model';

function validatePercentages({percentages}) {
    var percent = 0;
    percentages.forEach(data => {
        percent += data.percent;
    });
    if (percent != 100) {
        throw new Error("invalid percentages");
    }
}

export default {
    cAcademicData: async ({ data }) => {
        validatePercentages(data);
        const { user } = data;
        const academicData = await Academic_data.create(data);
        data.percentages.forEach(async data => {
            data.academic = user;
            await Percentage.create(data);
        });
        return academicData;
    },
    academicData: async ({ id }) => {
        const academicData = await Academic_data.findByPk(id);
        const percentages = await Percentage.findAll({
            where: {
                academic: id
            }
        });
        academicData.percentages = percentages;
        return academicData;
    },
    uAcademicData: async ({ id, data }) => {
        validatePercentages(data);
        const { user } = data;
        await Academic_data.update(data, {
            where: {
                user: id
            }
        });
        data.percentages.forEach(async data => {
            data.academic = user;
            await Percentage.update(data, {
                where: {
                    id: data.id
                }
            });
        });
        return 'done';
    }
}