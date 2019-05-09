import { Notification } from '../../database/model';

export default {
    notifications: async ({ id }) => {
        const notifications = await Notification.findByPk(id);
        return notifications;
    },
    uNotifications: async ({ id, data }) => {
        await Notification.update(data, {
            where: {
                user: id
            }
        });
        return 'done';
    }
}