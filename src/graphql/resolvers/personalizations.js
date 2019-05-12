import { Personalization } from '../../database/model';
import verify from '../jwt/verify';

export default {
	cPersonalization: async ({ data }, { request }) => {
		verify(request);
		const personalization = await Personalization.create(data);
		return personalization;
	},
	personalization: async ({ id }, { request }) => {
		verify(request);
		const personalization = await Personalization.findByPk(id);
		return personalization;
	},
	uPersonalization: async ({ id, data }, { request }) => {
		verify(request);
		await Personalization.update(data, {
			where: {
				id
			}
		});
		return 'done';
	}
}