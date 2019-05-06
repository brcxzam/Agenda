import { Personalization } from '../../database/model';
//CRU
export default {
    cPersonalization: async ({data}) => {
        const personalization = await Personalization.create(data);
        return personalization;
    },
    personalizations: async ({id}) => {
        const personalizations = await Personalization.findAll({
            where: {
                id
            }
        });
        return personalizations;
    },
    uPersonalization: async ({id, data}) => {
        await Personalization.update(data,{
            where:{
                id
            }
        })
    }
}