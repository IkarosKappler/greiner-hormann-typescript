/**
 * TypeScript port by Ikaros Kappler.
 *
 * Original file https://github.com/w8r/GreinerHormann/blob/master/src/clip.js
 *
 * @date 2020-11-30
 */
import { IVertex } from './interfaces';
declare const _default: (polygonA: Array<IVertex>, polygonB: Array<IVertex>, eA: boolean, eB: boolean) => Array<Array<IVertex>>;
/**
 * Clip driver. Not that the type `Array<Array<number>>` in this case matches `IArrayVertex`.
 * @param  {Array.<Array.<Number>>} polygonA
 * @param  {Array.<Array.<Number>>} polygonB
 * @param  {Boolean}                sourceForwards
 * @param  {Boolean}                clipForwards
 * @return {Array.<Array.<Number>>}
 */
export default _default;
