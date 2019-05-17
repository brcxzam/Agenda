import { Notification } from '../../database/model';
import verify from '../jwt/verify';

export default {
	notifications: async (_, { request }) => {
		const id = verify(request);
		const notifications = await Notification.findByPk(id);
		return notifications;
	},
	uNotifications: async ({ data }, { request }) => {
		const id = verify(request);
		await Notification.update(data, {
			where: {
				user: id
			}
		});
		return 'done';
	}
}