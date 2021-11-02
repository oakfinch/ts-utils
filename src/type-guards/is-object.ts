import type { AnyObject } from '@oakfinch/ts-extra';
import { hasProperty } from './has-property';

/** object type guard */
export const isObject = <T extends AnyObject, U>(obj: T | U): obj is T =>
  typeof obj === 'object' &&
  obj !== null &&
  hasProperty(obj, 'constructor') &&
  (obj as T).constructor === Object;

export default isObject;
