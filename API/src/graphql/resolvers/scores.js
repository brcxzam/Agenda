import { Score, Subject } from './../../database/model'
import verify from '../jwt/verify'

export default {
	uScore: async ({ id, data }, { request }) => {
		verify(request)
		await Score.update(data, {
			where: {
				subject: id,
			},
		})
		return 'done'
	},
	scores: async (_, { request }) => {
		const user = verify(request)
		const subjects = await Subject.findAll({
			where: {
				user,
			},
		})
		let conn = 0
		let scores = []
		for await (let subject of subjects) {
			const score = await Score.findByPk(subject.id)
			scores[conn++] = score
		}
		return scores
	},
	scoresSubject: async ({ id }, { request }) => {
		verify(request)
		const score = await Score.findByPk(id)
		return score
	},
}
