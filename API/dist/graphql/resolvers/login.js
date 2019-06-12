"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _model = require("../../database/model");

var _jwt = _interopRequireDefault(require("../jwt/jwt.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  login: async ({
    data
  }) => {
    const {
      email,
      password
    } = data;
    const user = await _model.User.findOne({
      where: {
        email
      }
    });

    if (user) {
      const res = await _bcrypt.default.compare(password, user.password);

      if (res) {
        const token = _jsonwebtoken.default.sign({
          user: user.id
        }, _jwt.default.secret);

        return token;
      }
    }

    return 'false';
  }
};
exports.default = _default;