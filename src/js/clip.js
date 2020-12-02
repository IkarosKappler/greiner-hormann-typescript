"use strict";
/**
 * TypeScript port by Ikaros Kappler.
 *
 * Original file https://github.com/w8r/GreinerHormann/blob/master/src/clip.js
 *
 * @date 2020-11-30
 */
Object.defineProperty(exports, "__esModule", { value: true });
var polygon_1 = require("./polygon");
/**
 * Clip driver. Not that the type `Array<Array<number>>` in this case matches `IArrayVertex`.
 * @param  {Array.<Array.<Number>>} polygonA
 * @param  {Array.<Array.<Number>>} polygonB
 * @param  {Boolean}                sourceForwards
 * @param  {Boolean}                clipForwards
 * @return {Array.<Array.<Number>>}
 */
exports.default = (function (polygonA, polygonB, eA, eB) {
    var source = new polygon_1.default(polygonA);
    var clip = new polygon_1.default(polygonB);
    // We rely that, when Array Vertices are put in, then Array Vertices come out (not Object Vertices)
    return source.clip(clip, eA, eB);
});
//# sourceMappingURL=clip.js.map