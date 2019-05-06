import { Event } from '../../database/model';

export default {
    cEvent: async ({ data }) => {
        const event = await Event.create(data);
        return event;
    },
    events: async ({ id }) => {
        const events = await Event.findAll({
            where: {
                user: id
            }
        });
        return events;
    },
    uEvent: async ({ id, data}) => {
        await Event.update (data, {
            where: {
                id
            }
        });
        return 'Done';
    },
    dEvent: async ({ id }) => {
        await Event.destroy({
            where:{
                id
            }
        });
        return 'Done';
    }
}