/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/UploadAdapter.js":
/*!****************************************!*\
  !*** ./src/client/js/UploadAdapter.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UploadAdapter)\n/* harmony export */ });\nclass UploadAdapter {\n  constructor(loader) {\n    this.loader = loader;\n  }\n  upload() {\n    return this.loader.file.then(file => new Promise((resolve, reject) => {\n      this._initRequest();\n      this._initListeners(resolve, reject, file);\n      this._sendRequest(file);\n    }));\n  }\n  _initRequest() {\n    const xhr = this.xhr = new XMLHttpRequest();\n    xhr.open('POST', '/fileUploadMeal', true);\n    xhr.responseType = 'json';\n  }\n  _initListeners(resolve, reject, file) {\n    const xhr = this.xhr;\n    const loader = this.loader;\n    const genericErrorText = '파일을 업로드 할 수 없습니다.';\n    xhr.addEventListener('error', () => {\n      reject(genericErrorText);\n    });\n    xhr.addEventListener('abort', () => reject());\n    xhr.addEventListener('load', () => {\n      const response = xhr.response;\n      if (!response || response.error) {\n        return reject(response && response.error ? response.error.message : genericErrorText);\n      }\n      resolve({\n        default: response.url //업로드된 파일 주소\n      });\n    });\n  }\n  _sendRequest(file) {\n    const data = new FormData();\n    data.append('upload', file);\n    this.xhr.send(data);\n  }\n}\n\n//# sourceURL=webpack://masterpiece_site/./src/client/js/UploadAdapter.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/UploadAdapter.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;