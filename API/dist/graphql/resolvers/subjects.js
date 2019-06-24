"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _model = require("../../database/model");

var _verify = _interopRequireDefault(require("../jwt/verify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  cSubject: async ({
    data
  }, {
    request
  }) => {
    const user = (0, _verify.default)(request);
    data.user = user;
    const subject = await _model.Subject.create(data);
    const {
      final_score
    } = await _model.Score.create({
      subject: subject.id
    });
    subject.final_score = final_score;
    return subject;
  },
  subjects: async (_, {
    request
  }) => {
    const user = (0, _verify.default)(request);
    const subjects = await _model.Subject.findAll({
      where: {
        user
      }
    });
    let index = 0;

    for await (let subject of subjects) {
      const {
        final_score
      } = await _model.Score.findByPk(subject.id);
      subjects[index++].final_score = final_score;
    }

    return subjects;
  },
  subject: async ({
    id
  }, {
    request
  }) => {
    (0, _verify.default)(request);
    const subject = await _model.Subject.findByPk(id);
    const {
      final_score
    } = await _model.Score.findByPk(subject.id);
    subject.final_score = final_score;
    return subject;
  },
  uSubject: async ({
    id,
    data
  }, {
    request
  }) => {
    (0, _verify.default)(request);
    await _model.Subject.update(data, {
      where: {
        id
      }
    });
    return 'done';
  },
  dSubject: async ({
    id
  }, {
    request
  }) => {
    (0, _verify.default)(request);
    await _model.Subject.destroy({
      where: {
        id
      }
    });
    return 'done';
  }
};
exports.default = _default;