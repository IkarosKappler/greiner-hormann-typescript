/**
 * TypeScript port by Ikaros Kappler.
 *
 * Original file https://github.com/w8r/GreinerHormann/blob/master/src/polygon.js
 *
 * @date 2020-11-30
 */
import { IVertex } from './interfaces';
import Vertex from './vertex';
/**
 * Polygon representation
 */
export default class Polygon {
    /**
     * @type {Vertex}
     */
    first: Vertex;
    /**
     * @type {Number}
     */
    vertices: number;
    /**
     * @type {Vertex}
     */
    _lastUnprocessed: Vertex | undefined;
    /**
     * Whether to handle input and output as [x,y] or {x:x,y:y}
     * @type {Boolean}
     */
    _arrayVertices: boolean;
    /**
     * @type {Vertex}
     * @private
     */
    private _firstIntersect;
    /**
     * Construct a new polygon.
     *
     * @constructor
     * @param {Array.<Array.<Number>>} p
     * @param {Boolean=}               arrayVertices
     */
    constructor(p: Array<IVertex>, arrayVertices?: boolean);
    /**
     * Add a vertex object to the polygon
     * (vertex is added at the 'end' of the list')
     *
     * @param vertex
     */
    addVertex(vertex: Vertex): void;
    /**
     * Inserts a vertex inbetween start and end
     *
     * @param {Vertex} vertex
     * @param {Vertex} start
     * @param {Vertex} end
     */
    insertVertex(vertex: Vertex, start: Vertex, end: Vertex): void;
    /**
     * Get next non-intersection point
     * @param  {Vertex} v
     * @return {Vertex}
     */
    private getNext;
    /**
     * Unvisited intersection
     * @return {Vertex}
     */
    private getFirstIntersect;
    /**
     * Does the polygon have unvisited vertices
     * @return {Boolean} [description]
     */
    private hasUnprocessed;
    /**
     * The output depends on what you put in, arrays or objects
     * @return {Array.<Array<Number>|Array.<Object>}
     */
    private getPoints;
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
    clip(clip: any, sourceForwards: any, clipForwards: any): Array<Array<IVertex>>;
}
