/**
 * TypeScript port by Ikaros Kappler.
 *
 * Original file https://github.com/w8r/GreinerHormann/blob/master/src/clip.leaflet.js
 *
 * @date 2020-11-30
 */

import Polygon from './polygon';
import { IVertex, IArrayVertex, L_ILatLng, L_IPolygon } from "./interfaces";


/**
 * Clip driver
 * @param  {L.Polygon} polygonA
 * @param  {L.Polygon} polygonB
 * @param  {Boolean} sourceForwards
 * @param  {Boolean} clipForwards
 * @return {Array.<L.LatLng>|null}
 */
export default (polygonA:L_IPolygon, polygonB:L_IPolygon, sourceForwards:boolean, clipForwards:boolean) : Array<Array<IArrayVertex>>|Array<IArrayVertex>|undefined => {
    const sourceArr : Array<IArrayVertex> = [];
    const clipArr : Array<IArrayVertex> = [];

    let latlngs : L_ILatLng = polygonA._latlngs[0];
    for (let i = 0, len = latlngs.length; i < len; i++) {
	sourceArr.push([latlngs[i]['lng'], latlngs[i]['lat']] as IArrayVertex);
    }
    latlngs = polygonB._latlngs[0];
    for (let i = 0, len = latlngs.length; i < len; i++) {
	clipArr.push([latlngs[i]['lng'], latlngs[i]['lat']] as IArrayVertex);
    }

    const source : Polygon = new Polygon(sourceArr);
    const clip : Polygon = new Polygon(clipArr);

    const resultClip : Array<Array<IVertex>> = source.clip(clip, sourceForwards, clipForwards);
    const resultLatLng : Array<Array<IArrayVertex>> = [];
    if (resultClip && resultClip.length > 0) {
	for (let i = 0, len = resultClip.length; i < len; i++) {
	    // We rely here that, if Array Vertices were put in, the clipping algorithm
	    // really returns Array Vertices (not Object Vertices).
	    resultLatLng[i] = toLatLngs((resultClip[i] as unknown) as Array<IArrayVertex>);
	}

	if (resultLatLng) {
	    if (resultLatLng.length === 1) return (resultLatLng[0] as Array<IArrayVertex>);
	    else                           return resultLatLng;
	} else return null;
    } else return null;
}


const toLatLngs = (poly:Array<IArrayVertex>) : Array<IArrayVertex> => {
    let result : Array<IArrayVertex> = poly;

    if (poly) {
	if (result[0][0] === result[result.length - 1][0] &&
            result[0][1] === result[result.length - 1][1]) {
	    result = result.slice(0, result.length - 1);
	}

	for (let i = 0, len = result.length; i < len; i++) {
	    result[i] = [result[i][1], result[i][0]];
	}
	return result;
    } else {
	return null;
    }
}
