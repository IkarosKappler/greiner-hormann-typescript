/**
 * TypeScript port by Ikaros Kappler.
 *
 * Original file https://github.com/w8r/GreinerHormann/blob/master/src/clip.leaflet.js
 *
 * @date 2020-11-30
 */
import { L_IPolygon, IArrayVertex } from './interfaces';
/**
 * @api
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonA
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonB
 * @return {Array.<Array.<Number>>|Array.<Array.<Object>|Null}
 */
export declare const union: (polygonA: L_IPolygon, polygonB: L_IPolygon) => Array<Array<IArrayVertex>> | Array<IArrayVertex> | undefined;
/**
 * @api
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonA
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonB
 * @return {Array.<Array.<Number>>|Array.<Array.<Object>>|Null}
 */
export declare const intersection: (polygonA: L_IPolygon, polygonB: L_IPolygon) => Array<Array<IArrayVertex>> | Array<IArrayVertex> | undefined;
/**
 * @api
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonA
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonB
 * @return {Array.<Array.<Number>>|Array.<Array.<Object>>|Null}
 */
export declare const diff: (polygonA: L_IPolygon, polygonB: L_IPolygon) => Array<Array<IArrayVertex>> | Array<IArrayVertex> | undefined;
export declare const clip: (polygonA: L_IPolygon, polygonB: L_IPolygon, sourceForwards: boolean, clipForwards: boolean) => IArrayVertex[] | IArrayVertex[][];
