"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _model = require("./../../database/model");

var _verify = _interopRequireDefault(require("../jwt/verify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  uScore: async ({
    id,
    data
  }, {
    request
  }) => {
    (0, _verify.default)(request);
    await _model.Score.update(data, {
      where: {
        subject: id
      }
    });
    return 'done';
  },
  scores: async (_, {
    request
  }) => {
    const user = (0, _verify.default)(request);
    const subjects = await _model.Subject.findAll({
      where: {
        user
      }
    });
    let conn = 0;
    let scores = [];

    for await (let subject of subjects) {
      const score = await _model.Score.findByPk(subject.id);
      scores[conn++] = score;
    }

    return scores;
  }
};
exports.default = _default;