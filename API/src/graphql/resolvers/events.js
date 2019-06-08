import { Event, Personalization, Subject } from '../../database/model'
import verify from '../jwt/verify'
import GraphQLDateTime from 'graphql-type-datetime'

export default {
	DateTime: GraphQLDateTime,
	cEvent: async ({ data }, { request }) => {
		const user = verify(request)
		data.user = user
		const event = await Event.create(data)
		return event
	},
	events: async (_, { request }) => {
		const user = verify(request)
		const events = await Event.findAll({
			where: {
				user,
			},
		})
		let cont = 0
		for await (let data of events) {
			const subject = await Subject.findByPk(data.subject)
			if (subject) {
				events[cont++].subject = subject
			}
		}
		return events
	},
	event: async ({ id }, { request }) => {
		verify(request)
		const event = await Event.findByPk(id)
		const subject = await Subject.findByPk(event.subject)
		event.subject = subject
		return event
	},
	uEvent: async ({ id, data }, { request }) => {
		verify(request)
		await Event.update(data, {
			where: {
				id,
			},
		})
		return 'done'
	},
	dEvent: async ({ id }, { request }) => {
		verify(request)
		await Event.destroy({
			where: {
				id,
			},
		})
		return 'done'
	},
}
