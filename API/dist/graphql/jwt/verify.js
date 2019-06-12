"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = verify;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _jwt = _interopRequireDefault(require("./jwt.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function verify(req) {
  let token = req.headers['authorization'];

  if (!token) {
    throw new Error('signature required');
  }

  token = token.replace('Bearer ', '');

  try {
    const decoded = _jsonwebtoken.default.verify(token, _jwt.default.secret);

    return decoded.user;
  } catch (err) {
    throw new Error('invalid signature');
  }
}