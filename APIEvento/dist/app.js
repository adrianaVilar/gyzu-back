"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _path = require('path');

_dotenv2.default.config();

require('./database');

var _express = require('express'); var _express2 = _interopRequireDefault(_express);

var _user = require('./routes/user'); var _user2 = _interopRequireDefault(_user);
var _token = require('./routes/token'); var _token2 = _interopRequireDefault(_token);
var _event = require('./routes/event'); var _event2 = _interopRequireDefault(_event);
var _image = require('./routes/image'); var _image2 = _interopRequireDefault(_image);

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
    this.app.use(
      "/images/",
      _express2.default.static(_path.resolve.call(void 0, __dirname, "..", "uploads", "images"))
    );
  }

  routes() {
    this.app.use("/users/", _user2.default);
    this.app.use("/tokens/", _token2.default);
    this.app.use("/events/", _event2.default);
    this.app.use("/images/", _image2.default);
  }
}
exports. default = new App().app;
