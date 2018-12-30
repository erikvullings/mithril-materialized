/**
 * Create a unique ID
 * @see https://stackoverflow.com/a/2117523/319711
 *
 * @returns RFC4122 version 4 compliant GUID
 */
export const uniqueId = () => {
  // tslint:disable-next-line:no-bitwise
  return 'idxxxxxxxx'.replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16));
};

export const compose = <F extends (d: any) => any, T>(...functions: F[]) => (data: T) =>
  functions.reduceRight((value, func) => func(value), data);

export const map = <T>(f: (...args: any[]) => any) => (x: T[]) => Array.prototype.map.call(x, f);

export const join = <T>(seperator: string) => (list: T[]): string => Array.prototype.join.call(list, seperator);

/**
 * Convert camel case to snake case.
 *
 * @param {string} cc: Camel case string
 */
export const camelToSnake = (cc: string) => cc.replace(/([A-Z])/g, $1 => '-' + $1.toLowerCase());

const encodeAttribute = (x = '') => x.toString().replace(/"/g, '&quot;');

/** Convert an object to a string of HTML attributes */
export const toAttributeString = <T extends { [key: string]: any }>(x?: T) =>
  x
    ? compose<((list: T[]) => string) | ((list: T[]) => Array<{}>), T>(
        join(''),
        map((attribute: string) => `[${camelToSnake(attribute)}="${encodeAttribute(x[attribute])}"]`),
        Object.keys
      )(x)
    : '';

/**
 * Convert a list of class names to mithril syntax, e.g. .class1.class2.class3
 * @param contentClass
 */
export const toDottedClassList = (contentClass = 'col.s12') =>
  contentClass ? '.' + contentClass.replace(' ', '.') : '';

export const pipe = (...fncs: Array<(x: any) => any>) => <T>(x: T) => fncs.reduce((y, f) => f(y), x);
