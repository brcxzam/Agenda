"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireWildcard(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _api = _interopRequireDefault(require("./routes/api.routes"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const app = (0, _express.default)(); //Settings

app.set('port', process.env.PORT || 3001); //Middlewares

app.use((0, _cors.default)());
app.use((0, _morgan.default)('dev'));
app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: false
})); //Routes

app.use('/api', _api.default);
app.get('/', function (req, res) {
  res.sendFile(_path.default.join(__dirname, '..', 'build', 'index.html'));
}); //Static files

app.use(_express.default.static('public'));
app.use(_express.default.static(_path.default.join(__dirname, '..', 'build')));
var _default = app;
exports.default = _default;