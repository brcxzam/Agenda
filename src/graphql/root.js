const { User, Setting, Day, Notification } = require('../database/model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var root = {
    createUser: async ({ data }) => {
        const { password } = data;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        data.password = hash;
        const user = await User.create(data);
        const {id} = user;
        const days = await Day.create();
        const notification = await Notification.create();
        await Setting.create({user : id, days : days.id, notification : notification.id});
        return user;
    },
    user: async ({ id }) => {
        const user = await User.findAll({
            where: {
                id
            }
        });
        return user;
    },
    users: async () => {
        const user = await User.findAll();
        return user;
    },
    updateUser: async ({ id, data }) => {
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
        return "Done";
    },
    deleteUser: async ({ id }) => {
        await User.destroy({
            where: {
                id
            }
        });
        return "Done";
    }
};

module.exports = root;
