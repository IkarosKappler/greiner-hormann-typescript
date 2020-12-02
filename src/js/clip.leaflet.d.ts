/**
 * TypeScript port by Ikaros Kappler.
 *
 * Original file https://github.com/w8r/GreinerHormann/blob/master/src/clip.leaflet.js
 *
 * @date 2020-11-30
 */
import { IArrayVertex, L_IPolygon } from "./interfaces";
declare const _default: (polygonA: L_IPolygon, polygonB: L_IPolygon, sourceForwards: boolean, clipForwards: boolean) => Array<Array<IArrayVertex>> | Array<IArrayVertex> | undefined;
/**
 * Clip driver
 * @param  {L.Polygon} polygonA
 * @param  {L.Polygon} polygonB
 * @param  {Boolean} sourceForwards
 * @param  {Boolean} clipForwards
 * @return {Array.<L.LatLng>|null}
 */
export default _default;
