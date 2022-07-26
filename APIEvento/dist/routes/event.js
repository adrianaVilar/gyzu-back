"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _EventController = require('../controllers/EventController'); var _EventController2 = _interopRequireDefault(_EventController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.post("/", _loginRequired2.default, _EventController2.default.store);
router.put("/:id", _loginRequired2.default, _EventController2.default.update);
router.get("/", _EventController2.default.index); // Mostrar
router.get("/:id", _EventController2.default.show); // Mostrar por ID
router.delete("/:id", _loginRequired2.default, _EventController2.default.delete);

exports. default = router;
