const { User } = require('../database/model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var root = {
    createUser: async ({ data }) => {
        const { password } = data;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        data.password = hash;
        const user = await User.create(data);
        return user;
    },
    users: async () => {
        const users = await User.findAll();
        return users;
    },
    user: async ({ id }) => {
        const user = await User.findAll({
            where: {
                id
            }
        });
        return user;
    },
    updateUser: async ({ id, data }) => {
        const { password } = data;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        data.password = hash;
        await User.update(data, {
            where: {
                id
            }
        });
        return "Done";
    },
    deleteUser: async ({ id }) => {
        const user = await User.destroy({
            where: {
                id
            }
        });
        return "Done";
    }
};

module.exports = root;
