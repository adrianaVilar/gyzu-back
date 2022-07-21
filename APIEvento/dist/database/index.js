"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Event = require('../models/Event'); var _Event2 = _interopRequireDefault(_Event);
var _Image = require('../models/Image'); var _Image2 = _interopRequireDefault(_Image);

const models = [_User2.default, _Event2.default, _Image2.default];

const connection = new (0, _sequelize2.default)(_database2.default);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models)
);
