"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _model = require("../../database/model");

var _jwt = _interopRequireDefault(require("../jwt/jwt.config"));

var _verify = _interopRequireDefault(require("../jwt/verify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saltRounds = 10;

async function encrypt(password) {
  if (password.length < 8 || password.length > 60) {
    throw new Error('invalid password size');
  }

  const salt = await _bcrypt.default.genSalt(saltRounds);
  const hash = await _bcrypt.default.hash(password, salt);
  return hash;
}

var _default = {
  cUser: async ({
    data
  }) => {
    const {
      password
    } = data;
    data.password = await encrypt(password);
    const user = await _model.User.create(data);

    const token = _jsonwebtoken.default.sign({
      user: user.id
    }, _jwt.default.secret);

    return token;
  },
  user: async (_, {
    request
  }) => {
    const id = (0, _verify.default)(request);
    const user = await _model.User.findByPk(id);
    return user;
  },
  uUser: async ({
    data
  }, {
    request
  }) => {
    const id = (0, _verify.default)(request);
    const {
      password
    } = data;

    if (password) {
      data.password = await encrypt(password);
    }

    await _model.User.update(data, {
      where: {
        id
      }
    });
    return 'done';
  },
  dUser: async (_, {
    request
  }) => {
    const id = (0, _verify.default)(request);
    await _model.User.destroy({
      where: {
        id
      }
    });
    return 'done';
  }
};
exports.default = _default;