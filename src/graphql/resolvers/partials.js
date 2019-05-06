import { Partial } from '../../database/model';
//CRU
export default {
    cPartial: async ({data}) => {
        const partial = await Partial.create(data);
        return partial;
    },
    partials: async ({id}) => {
        const partials = await Partial.findAll({
            where: {
                subject: id
            }
        });
        return partials;
    },
    uPartial: async ({id, data}) => {
        await Partial.update(data,{
            where:{
                id
            }
        })
    }
}