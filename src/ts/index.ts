/**
 * TypeScript port by Ikaros Kappler.
 *
 * Original file https://github.com/w8r/GreinerHormann/blob/master/src/clip.leaflet.js
 *
 * @date 2020-11-30
 */

import booleanOperator from './clip';
import { IVertex } from './interfaces';

/**
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonA
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonB
 * @return {Array.<Array.<Number>>|Array.<Array.<Object>|Null}
 */
export const union = (polygonA:Array<IVertex>, polygonB:Array<IVertex>) : Array<Array<IVertex>> => {
  return booleanOperator(polygonA, polygonB, false, false);
}

/**
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonA
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonB
 * @return {Array.<Array.<Number>>|Array.<Array.<Object>>|Null}
 */
export const intersection = (polygonA, polygonB) : Array<Array<IVertex>> => {
  return booleanOperator(polygonA, polygonB, true, true);
}

/**
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonA
 * @param  {Array.<Array.<Number>|Array.<Object>} polygonB
 * @return {Array.<Array.<Number>>|Array.<Array.<Object>>|Null}
 */
export const diff = (polygonA, polygonB) : Array<Array<IVertex>> => {
  return booleanOperator(polygonA, polygonB, false, true);
}

export const clip = booleanOperator;

