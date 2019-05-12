import { Academic_data, Percentage } from '../../database/model';

function validatePercentages({ percentages }) {
    var percent = 0;
    percentages.forEach(data => {
        if (data.percent == 0) {
            throw new Error("invalid percentages");
        }
        percent += data.percent;
    });
    if (percent != 100) {
        throw new Error("invalid percentages");
    }
}

export default {
    cAcademicData: async ({ data }) => {
        validatePercentages(data);
        const { user, percentages } = data;
        const academicData = await Academic_data.create(data);
        academicData.percentages = [];
        for await (let data of percentages) {
            data.academic = user;
            const percentage = await Percentage.create(data);
            academicData.percentages.push(percentage);
        }
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
        const { percentages } = data;
        if (percentages) {
            validatePercentages(data);
        }
        await Academic_data.update(data, {
            where: {
                user: id
            }
        });
        if (percentages) {
            for await (let data of percentages) {
                data.academic = id;
                await Percentage.update(data, {
                    where: {
                        id: data.id,
                        academic: id
                    }
                });
            }
        }
        return 'done';
    },
    percentage: async ({ partial, academic }) => {
        const percentages = await Percentage.findOne({
            where: {
                partial,
                academic
            }
        });
        return percentages;
    }
}