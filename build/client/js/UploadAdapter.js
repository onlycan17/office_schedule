"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var UploadAdapter = exports["default"] = /*#__PURE__*/function () {
  function UploadAdapter(loader) {
    _classCallCheck(this, UploadAdapter);
    this.loader = loader;
  }
  return _createClass(UploadAdapter, [{
    key: "upload",
    value: function upload() {
      var _this = this;
      return this.loader.file.then(function (file) {
        return new Promise(function (resolve, reject) {
          _this._initRequest();
          _this._initListeners(resolve, reject, file);
          _this._sendRequest(file);
        });
      });
    }
  }, {
    key: "_initRequest",
    value: function _initRequest() {
      var xhr = this.xhr = new XMLHttpRequest();
      xhr.open('POST', '/fileUploadMeal', true);
      xhr.responseType = 'json';
    }
  }, {
    key: "_initListeners",
    value: function _initListeners(resolve, reject, file) {
      var xhr = this.xhr;
      var loader = this.loader;
      var genericErrorText = '파일을 업로드 할 수 없습니다.';
      xhr.addEventListener('error', function () {
        reject(genericErrorText);
      });
      xhr.addEventListener('abort', function () {
        return reject();
      });
      xhr.addEventListener('load', function () {
        var response = xhr.response;
        if (!response || response.error) {
          return reject(response && response.error ? response.error.message : genericErrorText);
        }
        resolve({
          "default": response.url //업로드된 파일 주소
        });
      });
    }
  }, {
    key: "_sendRequest",
    value: function _sendRequest(file) {
      var data = new FormData();
      data.append('upload', file);
      this.xhr.send(data);
    }
  }]);
}();