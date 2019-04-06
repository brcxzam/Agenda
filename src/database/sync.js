const {User } = require('./model');

User.sync({
    force: true
})
.then(() => {
    return User.create({
        firstName: 'Nayeli',
        lastName: 'Dinamita'
    });
});
