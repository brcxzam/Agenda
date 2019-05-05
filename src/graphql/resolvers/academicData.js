import { Academic_data } from '../../database/model';

export default {
    cAcademicData: async ({ data }) => {
        const academicData = await Academic_data.create(data);
        return academicData;
    },
    academicData: async ({ id }) => {
        const academicData = await Academic_data.findByPk(id);
        return academicData;
    },
    uAcademicData: async ({ id, data }) => {
        await Academic_data.update(data, {
            where: {
                id
            }
        });
        return 'Done';
    }
}