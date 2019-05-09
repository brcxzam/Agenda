import bcrypt from 'bcrypt';
import { Day, Notification, User } from '../../database/model';
const saltRounds = 10;

async function encrypt(password) {
    if (password.length < 8 || password.length > 60) {
        throw new Error("invalid password size");
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export default {
    cUser: async ({ data }) => {
        const { password } = data;
        data.password = await encrypt(password);
        const user = await User.create(data);
        const { id } = user;
        await Notification.create({ user: id });
        await Day.create({ user: id });
        return user;
    },
    user: async ({ id }) => {
        const user = await User.findByPk(id);
        return user;
    },
    uUser: async ({ id, data }) => {
        const { password } = data;
        if (password) {
            data.password = await encrypt(password);
        }
        await User.update(data, {
            where: {
                id
            }
        });
        return 'done';
    },
    dUser: async ({ id }) => {
        await User.destroy({
            where: {
                id
            }
        });
        return 'done';
    }
}