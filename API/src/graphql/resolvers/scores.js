import { Score } from './../../database/model'
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
}
