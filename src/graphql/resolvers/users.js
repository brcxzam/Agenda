import bcrypt from 'bcrypt';
import { Day, Notification, Setting, User } from '../../database/model';
const saltRounds = 10;

export default {
    cUser: async ({ data }) => {
        const { password } = data;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        data.password = hash;
        const user = await User.create(data);
        const days = await Day.create();
        const notification = await Notification.create();
        await Setting.create({ user: user.id, days: days.id, notification: notification.id });
        return user;
    },
    user: async ({ id }) => {
        const user = await User.findByPk(id);
        return user;
    },
    uUser: async ({ id, data }) => {
        const { password } = data;
        if (password) {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(password, salt);
            data.password = hash;
        }
        await User.update(data, {
            where: {
                id
            }
        });
        return 'Done';
    },
    dUser: async ({ id }) => {
        await User.destroy({
            where: {
                id
            }
        });
        return 'Done';
    }
}