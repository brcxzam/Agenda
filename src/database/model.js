const {
    Model,
    STRING,
    INTEGER,
    FLOAT,
    DOUBLE,
    DECIMAL,
    DATE
} = require("sequelize");
const sequelize = require("./connection");

class User extends Model { }
User.init(
    {
        firstName: {
            type: STRING,
            allowNull: false
        },
        lastName: {
            type: STRING
        }
    },
    {
        sequelize
    }
);

module.exports = { User };
