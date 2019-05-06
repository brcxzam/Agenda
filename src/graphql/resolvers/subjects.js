import { Subject } from '../../database/model';

export default {
    cSubjects: async ({ data }) => {
        const subject = await Subject.create(Subject);
        return subject;
    },
    subjects: async ({ id }) => {
        const subject = await Subject.findAll({
            where: {
                user: id
            }
        });
        return subject;
    },
    uSubjects: async ({ id, data }) => {
        await Subject.update(data, {
            where: {
                id
            }
        });
        return 'Done';
    },
    dSubjects: async ({ id }) => {
        await Subject.destroy({
            where: {
                id
            }
        });
        return 'Done';
    }
}