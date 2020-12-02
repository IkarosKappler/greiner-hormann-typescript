"use strict";
/**
 * TypeScript port by Ikaros Kappler.
 *
 * Original file https://github.com/w8r/GreinerHormann/blob/master/src/polygon.js
 *
 * @date 2020-11-30
 */
Object.defineProperty(exports, "__esModule", { value: true });
var vertex_1 = require("./vertex");
var intersection_1 = require("./intersection");
/**
 * Polygon representation
 */
var Polygon = /** @class */ (function () {
    /**
     * Construct a new polygon.
     *
     * @constructor
     * @param {Array.<Array.<Number>>} p
     * @param {Boolean=}               arrayVertices
     */
    function Polygon(p, arrayVertices) {
        this.first = null;
        this.vertices = 0;
        this._lastUnprocessed = null;
        this._arrayVertices = (typeof arrayVertices === "undefined") ?
            Array.isArray(p[0]) :
            arrayVertices;
        for (var i = 0, len = p.length; i < len; i++) {
            this.addVertex(new vertex_1.default(p[i]));
        }
    }
    ; // END constrcutor
    /**
     * Add a vertex object to the polygon
     * (vertex is added at the 'end' of the list')
     *
     * @param vertex
     */
    Polygon.prototype.addVertex = function (vertex) {
        if (this.first === null) {
            this.first = vertex;
            this.first.next = vertex;
            this.first.prev = vertex;
        }
        else {
            var next = this.first;
            var prev = next.prev;
            next.prev = vertex;
            vertex.next = next;
            vertex.prev = prev;
            prev.next = vertex;
        }
        this.vertices++;
    };
    /**
     * Inserts a vertex inbetween start and end
     *
     * @param {Vertex} vertex
     * @param {Vertex} start
     * @param {Vertex} end
     */
    Polygon.prototype.insertVertex = function (vertex, start, end) {
        var prev, curr = start;
        while (!curr.equals(end) && curr._distance < vertex._distance) {
            curr = curr.next;
        }
        vertex.next = curr;
        prev = curr.prev;
        vertex.prev = prev;
        prev.next = vertex;
        curr.prev = vertex;
        this.vertices++;
    };
    /**
     * Get next non-intersection point
     * @param  {Vertex} v
     * @return {Vertex}
     */
    Polygon.prototype.getNext = function (v) {
        var c = v;
        while (c._isIntersection)
            c = c.next;
        return c;
    };
    /**
     * Unvisited intersection
     * @return {Vertex}
     */
    Polygon.prototype.getFirstIntersect = function () {
        var v = this._firstIntersect || this.first;
        do {
            if (v._isIntersection && !v._visited)
                break;
            v = v.next;
        } while (!v.equals(this.first));
        this._firstIntersect = v;
        return v;
    };
    /**
     * Does the polygon have unvisited vertices
     * @return {Boolean} [description]
     */
    Polygon.prototype.hasUnprocessed = function () {
        var v = this._lastUnprocessed || this.first;
        do {
            if (v._isIntersection && !v._visited) {
                this._lastUnprocessed = v;
                return true;
            }
            v = v.next;
        } while (!v.equals(this.first));
        this._lastUnprocessed = null;
        return false;
    };
    /**
     * The output depends on what you put in, arrays or objects
     * @return {Array.<Array<Number>|Array.<Object>}
     */
    // TODO: what type?
    Polygon.prototype.getPoints = function () {
        var points = [];
        var v = this.first;
        if (this._arrayVertices) {
            do {
                points.push([v.x, v.y]);
                v = v.next;
            } while (v !== this.first);
        }
        else {
            do {
                points.push({
                    x: v.x,
                    y: v.y
                });
                v = v.next;
            } while (v !== this.first);
        }
        return points;
    };
    /**
     * Clip polygon against another one.
     * Result depends on algorithm direction:
     *
     * Intersection: forwards forwards
     * Union:        backwars backwards
     * Diff:         backwards forwards
     *
     * @param {Polygon} clip
     * @param {Boolean} sourceForwards
     * @param {Boolean} clipForwards
     */
    Polygon.prototype.clip = function (clip, sourceForwards, clipForwards) {
        var sourceVertex = this.first;
        var clipVertex = clip.first;
        var sourceInClip;
        var clipInSource;
        var isUnion = !sourceForwards && !clipForwards;
        var isIntersection = sourceForwards && clipForwards;
        var isDiff = !isUnion && !isIntersection;
        // calculate and mark intersections
        do {
            if (!sourceVertex._isIntersection) {
                do {
                    if (!clipVertex._isIntersection) {
                        var i = new intersection_1.default(sourceVertex, this.getNext(sourceVertex.next), clipVertex, clip.getNext(clipVertex.next));
                        if (i.valid()) {
                            var sourceIntersection = vertex_1.default.createIntersection(i.x, i.y, i.toSource);
                            var clipIntersection = vertex_1.default.createIntersection(i.x, i.y, i.toClip);
                            sourceIntersection._corresponding = clipIntersection;
                            clipIntersection._corresponding = sourceIntersection;
                            this.insertVertex(sourceIntersection, sourceVertex, this.getNext(sourceVertex.next));
                            clip.insertVertex(clipIntersection, clipVertex, clip.getNext(clipVertex.next));
                        }
                    }
                    clipVertex = clipVertex.next;
                } while (!clipVertex.equals(clip.first));
            }
            sourceVertex = sourceVertex.next;
        } while (!sourceVertex.equals(this.first));
        // phase two - identify entry/exit points
        sourceVertex = this.first;
        clipVertex = clip.first;
        sourceInClip = sourceVertex.isInside(clip);
        clipInSource = clipVertex.isInside(this);
        // Hint: XOR does not really exists on boolean values and is not type safe in TypeScript
        sourceForwards = (sourceForwards && !sourceInClip) || (!sourceForwards && sourceInClip);
        clipForwards = (clipForwards && !clipInSource) || (!clipForwards && clipInSource);
        do {
            if (sourceVertex._isIntersection) {
                sourceVertex._isEntry = sourceForwards;
                sourceForwards = !sourceForwards;
            }
            sourceVertex = sourceVertex.next;
        } while (!sourceVertex.equals(this.first));
        do {
            if (clipVertex._isIntersection) {
                clipVertex._isEntry = clipForwards;
                clipForwards = !clipForwards;
            }
            clipVertex = clipVertex.next;
        } while (!clipVertex.equals(clip.first));
        // phase three - construct a list of clipped polygons
        var list = [];
        while (this.hasUnprocessed()) {
            var current = this.getFirstIntersect();
            // keep format
            var clipped = new Polygon([], this._arrayVertices);
            clipped.addVertex(new vertex_1.default(current.x, current.y));
            do {
                current.visit();
                if (current._isEntry) {
                    do {
                        current = current.next;
                        clipped.addVertex(new vertex_1.default(current.x, current.y));
                    } while (!current._isIntersection);
                }
                else {
                    do {
                        current = current.prev;
                        clipped.addVertex(new vertex_1.default(current.x, current.y));
                    } while (!current._isIntersection);
                }
                current = current._corresponding;
            } while (!current._visited);
            list.push(clipped.getPoints());
        }
        if (list.length === 0) {
            if (isUnion) {
                if (sourceInClip)
                    list.push(clip.getPoints());
                else if (clipInSource)
                    list.push(this.getPoints());
                else
                    list.push(this.getPoints(), clip.getPoints());
            }
            else if (isIntersection) { // intersection
                if (sourceInClip)
                    list.push(this.getPoints());
                else if (clipInSource)
                    list.push(clip.getPoints());
            }
            else { // diff
                if (sourceInClip)
                    list.push(clip.getPoints(), this.getPoints());
                else if (clipInSource)
                    list.push(this.getPoints(), clip.getPoints());
                else
                    list.push(this.getPoints());
            }
            if (list.length === 0)
                list = null;
        }
        return list;
    };
    return Polygon;
}());
exports.default = Polygon;
//# sourceMappingURL=polygon.js.map