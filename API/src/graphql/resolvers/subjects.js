import { Score, Subject } from '../../database/model'
import verify from '../jwt/verify'

export default {
	cSubject: async ({ data }, { request }) => {
		const user = verify(request)
		data.user = user
		const subject = await Subject.create(data)
		const { final_score } = await Score.create({ subject: subject.id })
		subject.final_score = final_score
		return subject
	},
	subjects: async (_, { request }) => {
		const user = verify(request)
		const subjects = await Subject.findAll({
			where: {
				user,
			},
		})
		let index = 0
		for await (let subject of subjects) {
			const { final_score } = await Score.findByPk(subject.id)
			subjects[index++].final_score = final_score
		}
		return subjects
	},
	subject: async ({ id }, { request }) => {
		verify(request)
		const subject = await Subject.findByPk(id)
		const { final_score } = await Score.findByPk(subject.id)
		subject.final_score = final_score
		return subject
	},
	uSubject: async ({ id, data }, { request }) => {
		verify(request)
		await Subject.update(data, {
			where: {
				id,
			},
		})
		return 'done'
	},
	dSubject: async ({ id }, { request }) => {
		verify(request)
		await Subject.destroy({
			where: {
				id,
			},
		})
		return 'done'
	},
}
