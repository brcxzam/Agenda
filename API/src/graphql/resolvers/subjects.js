import { Subject, Schedule, Partial, Academic_data } from '../../database/model'
import verify from '../jwt/verify'

export default {
	cSubject: async ({ data }, { request }) => {
		const user = verify(request)
		data.user = user
		const subject = await Subject.create(data)
		// const { schedules } = data;
		// subject.schedules = [];
		// for await (let data of schedules) {
		// 	data.subject = subject.id;
		// 	const schedule = await Schedule.create(data);
		// 	subject.schedules.push(schedule);
		// }
		return subject
	},
	subjects: async (_, { request }) => {
		const id = verify(request)
		const subjects = await Subject.findAll({
			where: {
				user: id,
			},
		})
		let cont = 0
		const { maximum } = await Academic_data.findByPk(id)
		for await (let subject of subjects) {
			const partials = await Partial.findAll({
				where: {
					subject: subject.id,
				},
			})
			let scoret = 0
			for await (let score of partials) {
				scoret += score.obtained
			}
			subjects[cont++].score = `${scoret}/${maximum}`
		}
		return subjects
	},
	subject: async ({ id }, { request }) => {
		verify(request)
		const subject = await Subject.findByPk(id)
		// const schedules = await Schedule.findAll({
		// 	where: {
		// 		subject: subject.id,
		// 	},
		// })
		// subject.schedules = schedules
		return subject
	},
	uSubject: async ({ id, data }, { request }) => {
		verify(request)
		// const { schedules } = data
		// const getSchedules = await Schedule.findAll({
		// 	where: {
		// 		subject: id,
		// 	},
		// })
		// if (schedules) {
		// 	for await (let data of schedules) {
		// 		let exist = false
		// 		for (let schls of getSchedules) {
		// 			if (data.id == schls.id) {
		// 				exist = true
		// 			}
		// 		}
		// 		if (!exist) {
		// 			throw new Error('non-existent schedule')
		// 		}
		// 		await Schedule.update(data, {
		// 			where: {
		// 				id: data.id,
		// 				subject: id,
		// 			},
		// 		})
		// 	}
		// }
		await Subject.update(data, {
			where: {
				id,
			},
		})
		return 'Done'
	},
	dSubject: async ({ id }, { request }) => {
		verify(request)
		await Subject.destroy({
			where: {
				id,
			},
		})
		return 'Done'
	},
}
