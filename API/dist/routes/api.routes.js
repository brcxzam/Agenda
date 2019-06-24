"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

var _fs = require("fs");

var _multer = _interopRequireDefault(require("multer"));

var _path = require("path");

var _v = _interopRequireDefault(require("uuid/v4"));

var _jwt = _interopRequireDefault(require("../graphql/jwt/jwt.config"));

var _root = _interopRequireDefault(require("../graphql/root"));

var _schema = _interopRequireDefault(require("../graphql/schema"));

var _model = require("./../database/model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const jwt = require('express-jwt');

const router = (0, _express.Router)();

const storage = _multer.default.diskStorage({
  destination: (0, _path.join)(__dirname, '..', '..', 'public', 'profile_images'),
  filename: (req, file, cb, filename) => {
    cb(null, (0, _v.default)() + (0, _path.extname)(file.originalname));
  }
});

function deleteImg({
  deleteImage
}) {
  (0, _fs.unlink)('public/profile_images/' + deleteImage, function (err) {
    if (err) console.log(err);
  });
}

router.post('/', (0, _expressGraphql.default)((request, response, graphQLParams) => ({
  schema: _schema.default,
  rootValue: _root.default,
  context: {
    request: request
  }
})));
router.post('/upload', jwt({
  secret: _jwt.default.secret
}), (0, _multer.default)({
  storage
}).single('profile_image'), async ({
  user,
  file
}, res) => {
  const id = user.user;
  const {
    profile_image
  } = await _model.User.findByPk(id);

  if (profile_image != 'default.png') {
    deleteImg({
      deleteImage: profile_image
    });
  }

  await _model.User.update({
    profile_image: file.filename
  }, {
    where: {
      id
    }
  });
  res.json({
    profile_image: file.filename
  });
});
router.post('/upload/delete', jwt({
  secret: _jwt.default.secret
}), async ({
  user
}, res) => {
  const id = user.user;
  const {
    profile_image
  } = await _model.User.findByPk(id);

  if (profile_image != 'default.png') {
    deleteImg({
      deleteImage: profile_image
    });
  }

  await _model.User.update({
    profile_image: 'default.png'
  }, {
    where: {
      id
    }
  });
  res.json({
    message: 'default.png'
  });
});
var _default = router;
exports.default = _default;