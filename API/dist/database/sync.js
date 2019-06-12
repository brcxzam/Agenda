"use strict";

var _model = require("./model");

_model.sequelize.sync({
  force: true
});