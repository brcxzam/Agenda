const {User} = require('../database/model');
var root = { 
    users: async () => {
        const users = await User.findAll();      
        return users;
    },
    user: async ({id}) => {
        const user = await User.findAll({
            where: {
                id
            }
        });
        return user;
    },
    createUser: async ({data}) => {
        const user = await User.create(data);
        return user;
    },
    updateUser: async ({id, data}) => {
        const user = await User.update(data,{
            where: {
                id
            }
        });
        return "Done";
    },
    deleteUser: async ({id}) => {
        const user = await User.destroy({
            where: {
                id
            }
        });
        return "Done";
    }
};

module.exports = root;
