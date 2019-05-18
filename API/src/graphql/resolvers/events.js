import { Event, Personalization, Subject } from '../../database/model';
import verify from '../jwt/verify';

export default {
	cEvent: async ({ data }, { request }) => {
		const user = verify(request);
		const { setPersonalization, subject } = data;
		let personalization;
		if (setPersonalization) {
			personalization = await Personalization.create(setPersonalization);
			data.personalization = personalization.id;
		}
		data.user = user;
		const event = await Event.create(data);
		if (personalization) {
			event.personalization = personalization;
		}
		if (subject) {
			const rSubject = await Subject.findByPk(subject);
			event.subject = rSubject;
		}
		return event;
	},
	events: async (_, { request }) => {
		const id = verify(request);
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
	event: async ({ id }, { request }) => {
		verify(request);
		const event = await Event.findByPk(id);
		const subject = await Subject.findByPk(event.subject);
		const personalization = await Personalization.findByPk(event.personalization);
		event.subject = subject;
		event.personalization = personalization;
		return event;
	},
	uEvent: async ({ id, data }, { request }) => {
		verify(request);
		await Event.update(data, {
			where: {
				id
			}
		});
		if (data.setPersonalization) {
			await Personalization.update(data.setPersonalization, {
				where: {
					id: data.setPersonalization.id
				}
			});
		}
		return 'done';
	},
	dEvent: async ({ id }, { request }) => {
		verify(request);
		await Event.destroy({
			where: {
				id
			}
		});
		return 'done';
	}
}