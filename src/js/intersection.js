"use strict";
/**
 * TypeScript port by Ikaros Kappler.
 *
 * Original file https://github.com/w8r/GreinerHormann/blob/master/src/intersection.js
 *
 * @date 2020-11-30
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines an edge intersection.
 */
var Intersection = /** @class */ (function () {
    /**
     * @constructor
     * @param {Vertex} s1 - Source edge vertex 1.
     * @param {Vertex} s2 - Source edge vertex 2.
     * @param {Vertex} c1 - Clip edge vertex 1.
     * @param {Vertex} c2 - Clip edge vertex 2.
     */
    function Intersection(s1, s2, c1, c2) {
        this.x = 0.0;
        this.y = 0.0;
        this.toSource = 0.0;
        this.toClip = 0.0;
        var d = (c2.y - c1.y) * (s2.x - s1.x) - (c2.x - c1.x) * (s2.y - s1.y);
        if (d === 0)
            return;
        this.toSource = ((c2.x - c1.x) * (s1.y - c1.y) - (c2.y - c1.y) * (s1.x - c1.x)) / d;
        this.toClip = ((s2.x - s1.x) * (s1.y - c1.y) - (s2.y - s1.y) * (s1.x - c1.x)) / d;
        if (this.valid()) {
            this.x = s1.x + this.toSource * (s2.x - s1.x);
            this.y = s1.y + this.toSource * (s2.y - s1.y);
        }
    }
    /**
     * @return {Boolean}
     */
    Intersection.prototype.valid = function () {
        return (0 < this.toSource && this.toSource < 1) && (0 < this.toClip && this.toClip < 1);
    };
    return Intersection;
}());
exports.default = Intersection;
//# sourceMappingURL=intersection.js.map