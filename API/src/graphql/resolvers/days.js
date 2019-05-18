import { Day } from '../../database/model';
import verify from '../jwt/verify';

export default {
	days: async (_, { request }) => {
		const id = verify(request);
		const days = await Day.findByPk(id);
		return days;
	},
	uDays: async ({ data }, { request }) => {
		const id = verify(request);
		await Day.update(data, {
			where: {
				user: id
			}
		});
		return 'done';
	},
}