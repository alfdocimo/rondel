/*!
 * 
 *   @alfdocimo/rondel v1.0.5
 *   https://github.com/alfdocimo/rondel
 * 
 *   Copyright (c) Alfredo Narvaez Docimo (https://github.com/alfdocimo)
 * 
 *   This source code is licensed under the MIT license found in the
 *   LICENSE file in the root directory of this source tree.
 * 
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Rondel=t():e.Rondel=t()}(window,function(){return function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=3)}([function(e,t){function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(t){return"function"==typeof Symbol&&"symbol"===o(Symbol.iterator)?e.exports=n=function(e){return o(e)}:e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":o(e)},n(t)}e.exports=n},function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t){e.exports=function(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}},function(e,t,o){"use strict";o.r(t);var n=o(0),r=o.n(n),u=o(1),i=o.n(u),f=o(2),c=o.n(f);t.default=function e(){i()(this,e),c()(this,"createProtected",function(e){var t=e.obj,o=e.modifiers;if("object"!==r()(t)||"object"!==r()(o))return console.error("Please make sure to provide a valid object to the function"),null;var n=o.exposeDefault,u=void 0===n?"unset property":n,i=o.setNotAllowed;return new Proxy(t,{set:function(e,t,o){if(i)throw new Error("Not allowed to set this property!");if("age"===t){if(!Number.isInteger(o))throw new TypeError("The age is not an integer");if(o>200)throw new RangeError("The age seems invalid")}return e[t]=o,!0},get:function(e,t){return t in e?e[t]:u}})}),console.log("Library constructor loaded")}}])});