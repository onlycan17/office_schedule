"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _apiUserController = require("../api/restController/apiUserController");
var _middleware = require("../middleware");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var apiRouter = _express["default"].Router();
apiRouter.route("/test").all(_middleware.publicOnlyMiddleware).get();
apiRouter.post("/postLogin", _apiUserController.apiPostLogin);
var _default = exports["default"] = apiRouter;