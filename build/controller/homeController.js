"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.home = void 0;

var home = function home(req, res) {
  console.log(req.session.loggedIn);
  console.log(res.locals.loggedIn);
  return res.render("home", {
    pageTitle: "Home"
  });
};

exports.home = home;