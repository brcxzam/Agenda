"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTypeDatetime = _interopRequireDefault(require("graphql-type-datetime"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _model = require("../../database/model");

var _verify = _interopRequireDefault(require("../jwt/verify"));

var _connection = _interopRequireDefault(require("./../../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Op = _sequelize.default.Op;
var _default = {
  DateTime: _graphqlTypeDatetime.default,
  cEvent: async ({
    data
  }, {
    request
  }) => {
    const user = (0, _verify.default)(request);
    data.user = user;
    const event = await _model.Event.create(data);
    return event;
  },
  events: async (_, {
    request
  }) => {
    const user = (0, _verify.default)(request);
    await _connection.default.query('DELETE FROM events WHERE date < CURRENT_TIMESTAMP()');
    const events = await _model.Event.findAll({
      where: {
        user
      },
      order: [['date', 'ASC']]
    });
    let cont = 0;

    for await (let data of events) {
      const subject = await _model.Subject.findByPk(data.subject);

      if (subject) {
        events[cont].subject = subject;
      }

      cont++;
    }

    return events;
  },
  event: async ({
    id
  }, {
    request
  }) => {
    (0, _verify.default)(request);
    const event = await _model.Event.findByPk(id);
    const subject = await _model.Subject.findByPk(event.subject);
    event.subject = subject;
    return event;
  },
  uEvent: async ({
    id,
    data
  }, {
    request
  }) => {
    (0, _verify.default)(request);
    await _model.Event.update(data, {
      where: {
        id
      }
    });
    return 'done';
  },
  dEvent: async ({
    id
  }, {
    request
  }) => {
    (0, _verify.default)(request);
    await _model.Event.destroy({
      where: {
        id
      }
    });
    return 'done';
  }
};
exports.default = _default;