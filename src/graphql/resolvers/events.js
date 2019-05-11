import { Event, Personalization, Subject } from '../../database/model';

export default {
    cEvent: async ({ data }) => {
        const { setPersonalization } = data;
        const personalization = await Personalization.create(setPersonalization);
        data.personalization = personalization.id;
        const event = await Event.create(data);
        event.personalization = personalization;
        return event;
    },
    events: async ({ id }) => {
        const events = await Event.findAll({
            where: {
                user: id
            }
        });
        let cont = 0;
        for await (let data of events) {
            const subject = await Subject.findByPk(data.subject);
            const personalization = await Personalization.findByPk(data.personalization);
            events[cont++].subject = subject;
            events[cont++].personalization = personalization;
        }
        return events;
    },
    uEvent: async ({ id, data }) => {
        await Event.update(data, {
            where: {
                id
            }
        });
        await Personalization.update(data.setPersonalization, {
            where: {
                id: data.setPersonalization.id
            }
        });
        return 'done';
    },
    dEvent: async ({ id }) => {
        await Event.destroy({
            where: {
                id
            }
        });
        return 'done';
    }
}