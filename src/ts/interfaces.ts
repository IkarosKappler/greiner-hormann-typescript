/**
 * @author Ikaros Kappler
 * @date   2020-11-30
 */

/**
 * One of two types for vertex representation: 
 * an object with x and y component.
 */
export type IObjVertex = {
    x : number;
    y : number
};

/**
 * One of two types for vertex representation: 
 * a two-element array for x (first) and y (second) component.
 */
export type IArrayVertex = [number,number];

/**
 * Vertices can be one of each: object or array representation.
 */
export type IVertex = IArrayVertex | IObjVertex;

/**
 * Minimal L.LatLng from Leaflet, as used here
 * Compare https://github.com/Leaflet/Leaflet/blob/master/src/geo/LatLng.js
 */
export type L_ILatLng = Array<{
    lat: number;
    lang: number;
}>;

/**
 * Minimal L.Polygon from Leaflet, as used here
 * Compare https://github.com/Leaflet/Leaflet/blob/master/src/layer/vector/Polygon.js
 */
export interface L_IPolygon {
    _latlngs : Array<L_ILatLng>;
};
