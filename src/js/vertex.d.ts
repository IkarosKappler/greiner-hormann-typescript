/**
 * TypeScript port by Ikaros Kappler.
 *
 * Original file https://github.com/w8r/GreinerHormann/blob/master/src/vertex.js
 *
 * @date 2020-11-30
 */
import { IArrayVertex, IObjVertex } from "./interfaces";
import Polygon from "./polygon";
/**
 * Vertex representation.
 */
export default class Vertex {
    /**
     * X coordinate
     * @type {Number}
     */
    x: number;
    /**
     * Previous vertex
     * @type {Vertex}
     */
    y: number;
    /**
     * Next node
     * @type {Vertex}
     */
    next: Vertex | undefined;
    /**
     * Previous vertex
     * @type {Vertex}
     */
    prev: Vertex | undefined;
    /**
     * Corresponding intersection in other polygon
     */
    _corresponding: any | undefined;
    /**
     * Distance from previous
     */
    _distance: number;
    /**
     * Entry/exit point in another polygon
     * @type {Boolean}
     */
    _isEntry: boolean;
    /**
     * Intersection vertex flag
     * @type {Boolean}
     */
    _isIntersection: boolean;
    /**
     * Loop check
     * @type {Boolean}
     */
    _visited: boolean;
    /**
     * Construct a new vertex.
     *
     * @constructor
     * @param {Number|Array.<Number>} x
     * @param {Number=}               y
     */
    constructor(x: number | IObjVertex | IArrayVertex, y?: number);
    /**
     * Creates intersection vertex
     * @param  {Number} x
     * @param  {Number} y
     * @param  {Number} distance
     * @return {Vertex}
     */
    static createIntersection(x: number, y: number, distance: number): Vertex;
    /**
     * Mark as visited
     */
    visit(): void;
    /**
     * Convenience
     * @param  {Vertex}  v
     * @return {Boolean}
     */
    equals(v: Vertex): boolean;
    /**
     * Check if vertex is inside a polygon by odd-even rule:
     * If the number of intersections of a ray out of the point and polygon
     * segments is odd - the point is inside.
     * @param {Polygon} poly
     * @return {Boolean}
     */
    isInside(poly: Polygon): boolean;
}
