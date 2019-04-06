const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:@localhost:3306/develop');

sequelize.authenticate()
    .then(() => {
        console.log("Database is connected! :)");
    })
    .catch(err => {
        console.error(err);
    });

module.exports = sequelize;
