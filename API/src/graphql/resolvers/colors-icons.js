import { Icon, Color } from '../../database/model';
import verify from '../jwt/verify';

export default {
	colors: async (_, { request }) => {
		verify(request)
		const colors = await Color.findAll();
		return colors;
	},
	icons: async (_, { request }) => {
		verify(request);
		const icons = await Icon.findAll();
		return icons;
	}
}