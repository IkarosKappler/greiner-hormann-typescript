"use strict";
/**
 * TypeScript port by Ikaros Kappler.
 *
 * Original file https://github.com/w8r/GreinerHormann/blob/master/src/vertex.js
 *
 * @date 2020-11-30
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Vertex representation.
 */
var Vertex = /** @class */ (function () {
    /**
     * Construct a new vertex.
     *
     * @constructor
     * @param {Number|Array.<Number>} x
     * @param {Number=}               y
     */
    function Vertex(x, y) {
        var numX;
        var numY;
        if (arguments.length === 1) {
            // Coords
            if (Array.isArray(x)) {
                this.y = x[1];
                this.x = x[0];
            }
            else if (typeof x !== "number" && typeof x.x === "number" && typeof x.y === "number") {
                this.y = x.y;
                this.x = x.x;
            }
            else {
                // Not a valid case: only one numeric parameter. Throw exception?
            }
        }
        else if (typeof x === "number" && typeof y === "number") {
            this.x = x;
            this.y = y;
        }
        else {
            throw "Illegal vertex constrctor call: (" + typeof x + ", " + typeof y + ").";
        }
        this.next = null;
        this.prev = null;
        this._corresponding = null;
        this._distance = 0.0;
        this._isEntry = true;
        this._isIntersection = false;
        this._visited = false;
    }
    ; // END constructor
    /**
     * Creates intersection vertex
     * @param  {Number} x
     * @param  {Number} y
     * @param  {Number} distance
     * @return {Vertex}
     */
    Vertex.createIntersection = function (x, y, distance) {
        var vertex = new Vertex(x, y);
        vertex._distance = distance;
        vertex._isIntersection = true;
        vertex._isEntry = false;
        return vertex;
    };
    ;
    /**
     * Mark as visited
     */
    Vertex.prototype.visit = function () {
        this._visited = true;
        if (this._corresponding !== null && !this._corresponding._visited) {
            this._corresponding.visit();
        }
    };
    ;
    /**
     * Convenience
     * @param  {Vertex}  v
     * @return {Boolean}
     */
    Vertex.prototype.equals = function (v) {
        return this.x === v.x && this.y === v.y;
    };
    ;
    /**
     * Check if vertex is inside a polygon by odd-even rule:
     * If the number of intersections of a ray out of the point and polygon
     * segments is odd - the point is inside.
     * @param {Polygon} poly
     * @return {Boolean}
     */
    Vertex.prototype.isInside = function (poly) {
        var oddNodes = false;
        var b;
        var vertex = poly.first;
        var next = vertex.next;
        var x = this.x;
        var y = this.y;
        do {
            if ((vertex.y < y && next.y >= y ||
                next.y < y && vertex.y >= y) &&
                (vertex.x <= x || next.x <= x)) {
                // Hint: XOR does not really exist on boolean.
                b = (vertex.x + (y - vertex.y) /
                    (next.y - vertex.y) * (next.x - vertex.x) < x);
                oddNodes = (!oddNodes && b) || (oddNodes && !b);
            }
            vertex = vertex.next;
            next = vertex.next || poly.first;
        } while (!vertex.equals(poly.first));
        return oddNodes;
    };
    ;
    return Vertex;
}()); // END class
exports.default = Vertex;
//# sourceMappingURL=vertex.js.map