/**
 * TypeScript port by Ikaros Kappler.
 *
 * Original file https://github.com/w8r/GreinerHormann/blob/master/src/clip.js
 *
 * @date 2020-11-30
 */

import Polygon from './polygon';
import { IVertex } from './interfaces';

/**
 * Clip driver. Not that the type `Array<Array<number>>` in this case matches `IArrayVertex`.
 * @param  {Array.<Array.<Number>>} polygonA
 * @param  {Array.<Array.<Number>>} polygonB
 * @param  {Boolean}                sourceForwards
 * @param  {Boolean}                clipForwards
 * @return {Array.<Array.<Number>>}
 */
export default (polygonA:Array<IVertex>, polygonB:Array<IVertex>, eA:boolean, eB:boolean) : Array<Array<IVertex>> => {
    const source : Polygon = new Polygon(polygonA);
    const clip : Polygon = new Polygon(polygonB);
    // We rely that, when Array Vertices are put in, then Array Vertices come out (not Object Vertices)
    return (source.clip(clip, eA, eB) as unknown) as Array<Array<IVertex>>;
}
