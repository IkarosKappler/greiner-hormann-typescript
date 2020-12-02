/**
 * TypeScript port by Ikaros Kappler.
 *
 * Original file https://github.com/w8r/GreinerHormann/blob/master/src/polygon.js
 *
 * @date 2020-11-30
 */

import { IVertex, IArrayVertex, IObjVertex } from './interfaces';
import Vertex from './vertex';
import Intersection from './intersection';


 /**
  * Polygon representation
  */
export default class Polygon {

    /**
     * @type {Vertex}
     */
    public first : Vertex;

    /**
     * @type {Number}
     */
    public vertices : number;

    /**
     * @type {Vertex}
     */
    public _lastUnprocessed : Vertex | undefined;

    /**
     * Whether to handle input and output as [x,y] or {x:x,y:y}
     * @type {Boolean}
     */
    public _arrayVertices : boolean;

    /**
     * @type {Vertex}
     * @private 
     */
    private _firstIntersect : Vertex | undefined;

    /**
     * Construct a new polygon.
     *
     * @constructor
     * @param {Array.<Array.<Number>>} p
     * @param {Boolean=}               arrayVertices
     */
    constructor (p:Array<IVertex>, arrayVertices?:boolean) {
	this.first = null;
	this.vertices = 0;
	this._lastUnprocessed = null;
	this._arrayVertices = (typeof arrayVertices === "undefined") ?
            Array.isArray(p[0]) :
            arrayVertices;
	
	for (let i = 0, len = p.length; i < len; i++) {
	    this.addVertex(new Vertex(p[i]));
	}
    }; // END constrcutor


    /**
     * Add a vertex object to the polygon
     * (vertex is added at the 'end' of the list')
     *
     * @param vertex
     */
    addVertex ( vertex : Vertex ) : void {
	if (this.first === null) {
	    this.first      = vertex;
	    this.first.next = vertex;
	    this.first.prev = vertex;
	} else {
	    const next : Vertex = this.first;
	    const prev : Vertex | undefined = next.prev;

	    next.prev   = vertex;
	    vertex.next = next;
	    vertex.prev = prev;
	    prev.next   = vertex;
	}
	this.vertices++;
    }


    /**
     * Inserts a vertex inbetween start and end
     *
     * @param {Vertex} vertex
     * @param {Vertex} start
     * @param {Vertex} end
     */
    insertVertex (vertex : Vertex, start : Vertex, end : Vertex ) : void {
	let prev : Vertex, curr : Vertex = start;

	while (!curr.equals(end) && curr._distance < vertex._distance) {
	    curr = curr.next;
	}

	vertex.next = curr;
	prev        = curr.prev;

	vertex.prev = prev;
	prev.next   = vertex;
	curr.prev   = vertex;

	this.vertices++;
    }

    /**
     * Get next non-intersection point
     * @param  {Vertex} v
     * @return {Vertex}
     */
    private getNext (v : Vertex ) : Vertex {
	let c : Vertex = v;
	while (c._isIntersection) c = c.next;
	return c;
    }


    /**
     * Unvisited intersection
     * @return {Vertex}
     */
    private getFirstIntersect () : Vertex {
	let v : Vertex = this._firstIntersect || this.first;

	do {
	    if (v._isIntersection && !v._visited) break;
	    v = v.next;
	} while (!v.equals(this.first));

	this._firstIntersect = v;
	return v;
    }


    /**
     * Does the polygon have unvisited vertices
     * @return {Boolean} [description]
     */
    private hasUnprocessed () : boolean {
	let v : Vertex = this._lastUnprocessed || this.first;
	do {
	    if (v._isIntersection && !v._visited) {
		this._lastUnprocessed = v;
		return true;
	    }
	    v = v.next;
	} while (!v.equals(this.first));

	this._lastUnprocessed = null;
	return false;
    }


    /**
     * The output depends on what you put in, arrays or objects
     * @return {Array.<Array<Number>|Array.<Object>}
     */
    // TODO: what type?
    private getPoints () : Array<IVertex> {
	const points : Array<IVertex> = [];
	let v : Vertex = this.first;

	if (this._arrayVertices) {
	    do {
		points.push([v.x, v.y] as IArrayVertex);
		v = v.next;
	    } while (v !== this.first);
	} else {
	    do {
		points.push({
		    x: v.x,
		    y: v.y
		} as IObjVertex);
		v = v.next;
	    } while (v !== this.first);
	}

	return points;
    }

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
    clip (clip, sourceForwards, clipForwards) : Array<Array<IVertex>> {
	let sourceVertex : Vertex = this.first;
	let clipVertex : Vertex = clip.first;
	let sourceInClip : boolean;
	let clipInSource : boolean;

	const isUnion : boolean        = !sourceForwards && !clipForwards;
	const isIntersection : boolean = sourceForwards && clipForwards;
	const isDiff : boolean         = !isUnion && !isIntersection;

	// calculate and mark intersections
	do {
	    if (!sourceVertex._isIntersection) {
		do {
		    if (!clipVertex._isIntersection) {
			const i : Intersection = new Intersection(
			    sourceVertex,
			    this.getNext(sourceVertex.next),
			    clipVertex, clip.getNext(clipVertex.next)
			);

			if (i.valid()) {
			    const sourceIntersection : Vertex = Vertex.createIntersection(i.x, i.y, i.toSource);
			    const clipIntersection : Vertex   = Vertex.createIntersection(i.x, i.y, i.toClip);

			    sourceIntersection._corresponding = clipIntersection;
			    clipIntersection._corresponding   = sourceIntersection;

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
	clipVertex   = clip.first;

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
	let list : Array<Array<IVertex>> = [];

	while (this.hasUnprocessed()) {
	    let current : Vertex = this.getFirstIntersect();
	    // keep format
	    const clipped : Polygon = new Polygon([], this._arrayVertices);

	    clipped.addVertex(new Vertex(current.x, current.y));
	    do {
		current.visit();
		if (current._isEntry) {
		    do {
			current = current.next;
			clipped.addVertex(new Vertex(current.x, current.y));
		    } while (!current._isIntersection);

		} else {
		    do {
			current = current.prev;
			clipped.addVertex(new Vertex(current.x, current.y));
		    } while (!current._isIntersection);
		}
		current = current._corresponding;
	    } while (!current._visited);

	    list.push(clipped.getPoints());
	}

	if (list.length === 0) {
	    if (isUnion) {
		if (sourceInClip)      list.push(clip.getPoints());
		else if (clipInSource) list.push(this.getPoints());
		else                   list.push(this.getPoints(), clip.getPoints());
	    } else if (isIntersection) { // intersection
		if (sourceInClip)      list.push(this.getPoints());
		else if (clipInSource) list.push(clip.getPoints());
	    } else { // diff
		if (sourceInClip)      list.push(clip.getPoints(), this.getPoints());
		else if (clipInSource) list.push(this.getPoints(), clip.getPoints());
		else                   list.push(this.getPoints());
	    }
	    if (list.length === 0) list = null;
	}

	return list;
    }
}
