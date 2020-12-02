"use strict";
/**
 * TypeScript port by Ikaros Kappler.
 *
 * Original file https://github.com/w8r/GreinerHormann/blob/master/src/clip.leaflet.js
 *
 * @date 2020-11-30
 */
Object.defineProperty(exports, "__esModule", { value: true });
var polygon_1 = require("./polygon");
/**
 * Clip driver
 * @param  {L.Polygon} polygonA
 * @param  {L.Polygon} polygonB
 * @param  {Boolean} sourceForwards
 * @param  {Boolean} clipForwards
 * @return {Array.<L.LatLng>|null}
 */
exports.default = (function (polygonA, polygonB, sourceForwards, clipForwards) {
    var sourceArr = [];
    var clipArr = [];
    var latlngs = polygonA._latlngs[0];
    for (var i = 0, len = latlngs.length; i < len; i++) {
        sourceArr.push([latlngs[i]['lng'], latlngs[i]['lat']]);
    }
    latlngs = polygonB._latlngs[0];
    for (var i = 0, len = latlngs.length; i < len; i++) {
        clipArr.push([latlngs[i]['lng'], latlngs[i]['lat']]);
    }
    var source = new polygon_1.default(sourceArr);
    var clip = new polygon_1.default(clipArr);
    var resultClip = source.clip(clip, sourceForwards, clipForwards);
    var resultLatLng = [];
    if (resultClip && resultClip.length > 0) {
        for (var i = 0, len = resultClip.length; i < len; i++) {
            // We rely here that, if Array Vertices were put in, the clipping algorithm
            // really returns Array Vertices (not Object Vertices).
            resultLatLng[i] = toLatLngs(resultClip[i]);
        }
        if (resultLatLng) {
            if (resultLatLng.length === 1)
                return resultLatLng[0];
            else
                return resultLatLng;
        }
        else
            return null;
    }
    else
        return null;
});
var toLatLngs = function (poly) {
    var result = poly;
    if (poly) {
        if (result[0][0] === result[result.length - 1][0] &&
            result[0][1] === result[result.length - 1][1]) {
            result = result.slice(0, result.length - 1);
        }
        for (var i = 0, len = result.length; i < len; i++) {
            result[i] = [result[i][1], result[i][0]];
        }
        return result;
    }
    else {
        return null;
    }
};
//# sourceMappingURL=clip.leaflet.js.map