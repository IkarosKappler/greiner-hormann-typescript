"use strict";
/**
 * TypeScript port by Ikaros Kappler.
 *
 * Original file https://github.com/w8r/GreinerHormann/blob/master/src/clip.leaflet.js
 *
 * @date 2020-11-30
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.clip = exports.diff = exports.intersection = exports.union = void 0;
var clip_1 = require("./clip");
/**
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonA
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonB
 * @return {Array.<Array.<Number>>|Array.<Array.<Object>|Null}
 */
var union = function (polygonA, polygonB) {
    return clip_1.default(polygonA, polygonB, false, false);
};
exports.union = union;
/**
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonA
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonB
 * @return {Array.<Array.<Number>>|Array.<Array.<Object>>|Null}
 */
var intersection = function (polygonA, polygonB) {
    return clip_1.default(polygonA, polygonB, true, true);
};
exports.intersection = intersection;
/**
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonA
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonB
 * @return {Array.<Array.<Number>>|Array.<Array.<Object>>|Null}
 */
var diff = function (polygonA, polygonB) {
    return clip_1.default(polygonA, polygonB, false, true);
};
exports.diff = diff;
exports.clip = clip_1.default;
//# sourceMappingURL=index.js.map