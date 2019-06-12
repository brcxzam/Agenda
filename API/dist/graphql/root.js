"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = _interopRequireDefault(require("./resolvers/events"));

var _login = _interopRequireDefault(require("./resolvers/login"));

var _subjects = _interopRequireDefault(require("./resolvers/subjects"));

var _users = _interopRequireDefault(require("./resolvers/users"));

var _scores = _interopRequireDefault(require("./resolvers/scores"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const root = Object.assign(_login.default, _users.default, _subjects.default, _events.default, _scores.default);
var _default = root;
exports.default = _default;