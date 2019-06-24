"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sequelize = new _sequelize.default('mysql://root:@localhost:3306/agenda', {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false,
  dialectOptions: {
    dateStrings: false,
    typeCast: true
  },
  timezone: '-05:00'
});

async function connection() {
  try {
    await sequelize.authenticate();
    console.log('DataBase is Connected');
  } catch (error) {
    console.error(error);
  }
}

connection();
var _default = sequelize;
exports.default = _default;