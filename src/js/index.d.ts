/**
 * TypeScript port by Ikaros Kappler.
 *
 * Original file https://github.com/w8r/GreinerHormann/blob/master/src/clip.leaflet.js
 *
 * @date 2020-11-30
 */
import { IVertex } from './interfaces';
/**
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonA
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonB
 * @return {Array.<Array.<Number>>|Array.<Array.<Object>|Null}
 */
export declare const union: (polygonA: Array<IVertex>, polygonB: Array<IVertex>) => Array<Array<IVertex>>;
/**
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonA
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonB
 * @return {Array.<Array.<Number>>|Array.<Array.<Object>>|Null}
 */
export declare const intersection: (polygonA: any, polygonB: any) => Array<Array<IVertex>>;
/**
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonA
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonB
 * @return {Array.<Array.<Number>>|Array.<Array.<Object>>|Null}
 */
export declare const diff: (polygonA: any, polygonB: any) => Array<Array<IVertex>>;
export declare const clip: (polygonA: IVertex[], polygonB: IVertex[], eA: boolean, eB: boolean) => IVertex[][];
