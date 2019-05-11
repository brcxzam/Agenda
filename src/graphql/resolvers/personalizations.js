import { Personalization } from '../../database/model';

export default {
    cPersonalization: async ({ data }) => {
        const personalization = await Personalization.create(data);
        return personalization;
    },
    personalization: async ({ id }) => {
        const personalization = await Personalization.findByPk(id);
        return personalization;
    },
    uPersonalization: async ({ id, data }) => {
        await Personalization.update(data, {
            where: {
                id
            }
        });
        return 'done';
    }
}