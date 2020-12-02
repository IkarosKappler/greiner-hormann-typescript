/**
 * TypeScript port by Ikaros Kappler.
 *
 * Original file https://github.com/w8r/GreinerHormann/blob/master/src/intersection.js
 *
 * @date 2020-11-30
 */
import Vertex from "./vertex";
/**
 * Defines an edge intersection.
 */
export default class Intersection {
    /**
     * @type {Number}
     */
    x: number;
    /**
     * @type {Number}
     */
    y: number;
    /**
     * @type {Number}
     */
    toSource: number;
    /**
     * @type {Number}
     */
    toClip: number;
    /**
     * @constructor
     * @param {Vertex} s1 - Source edge vertex 1.
     * @param {Vertex} s2 - Source edge vertex 2.
     * @param {Vertex} c1 - Clip edge vertex 1.
     * @param {Vertex} c2 - Clip edge vertex 2.
     */
    constructor(s1: Vertex, s2: Vertex, c1: Vertex, c2: Vertex);
    /**
     * @return {Boolean}
     */
    valid(): boolean;
}
