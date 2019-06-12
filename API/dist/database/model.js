"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "sequelize", {
  enumerable: true,
  get: function () {
    return _connection.default;
  }
});
exports.Event = exports.Score = exports.Subject = exports.User = void 0;

var _sequelize = require("sequelize");

var _connection = _interopRequireDefault(require("./connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class User extends _sequelize.Model {}

exports.User = User;
User.init({
  firstName: {
    type: _sequelize.STRING,
    allowNull: false,
    validate: {
      is: ['^[a-zñáéíóúü ]+$', 'i'],
      notEmpty: true
    }
  },
  lastName: {
    type: _sequelize.STRING,
    validate: {
      is: ['^[a-zñáéíóúü ]+$', 'i'],
      notEmpty: true
    }
  },
  email: {
    type: _sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: _sequelize.STRING,
    allowNull: false
  },
  profile_image: {
    type: _sequelize.STRING,
    defaultValue: 'default.png',
    validate: {
      is: ['^[^/+:+*+"+<+>+|]+$']
    }
  }
}, {
  indexes: [{
    unique: true,
    fields: ['email']
  }],
  modelName: 'User',
  sequelize: _connection.default
});

class Subject extends _sequelize.Model {}

exports.Subject = Subject;
Subject.init({
  name: {
    type: _sequelize.STRING,
    allowNull: false,
    validate: {
      is: ['^[^/+:+*+"+<+>+|]+$']
    }
  },
  user: {
    type: _sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  modelName: 'Subject',
  timestamps: false,
  sequelize: _connection.default
});

class Score extends _sequelize.Model {}

exports.Score = Score;
Score.init({
  subject: {
    type: _sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: Subject,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  advance1: {
    type: _sequelize.DOUBLE,
    defaultValue: 0
  },
  advance2: {
    type: _sequelize.DOUBLE,
    defaultValue: 0
  },
  advance3: {
    type: _sequelize.DOUBLE,
    defaultValue: 0
  },
  advance4: {
    type: _sequelize.DOUBLE,
    defaultValue: 0
  },
  final_score: {
    type: _sequelize.DOUBLE,
    defaultValue: 0
  }
}, {
  modelName: 'Score',
  timestamps: false,
  sequelize: _connection.default
});

class Event extends _sequelize.Model {}

exports.Event = Event;
Event.init({
  title: {
    type: _sequelize.STRING,
    allowNull: false,
    validate: {
      is: ['^[^/+:+*+"+<+>+|]+$']
    }
  },
  date: {
    type: _sequelize.DATE,
    allowNull: false
  },
  school: {
    type: _sequelize.BOOLEAN,
    defaultValue: false
  },
  user: {
    type: _sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  subject: {
    type: _sequelize.INTEGER,
    references: {
      model: Subject,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  modelName: 'Event',
  timestamps: false,
  sequelize: _connection.default
});