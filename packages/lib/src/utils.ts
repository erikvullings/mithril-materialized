import { IInputOptions } from './input-options';

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

/** Options that we want to convert to attributes  */
const inputAttributes = ['min', 'max', 'minLength', 'maxLength', 'rows', 'cols', 'placeholder'];

const isInputAttribute = (key: string) => inputAttributes.indexOf(key) >= 0;

const isDefinedAttribute = <T>(opt: IInputOptions<T>) => (key: string) => typeof (opt as any)[key] !== 'undefined';

const toProps = <T>(o: IInputOptions<T>) => {
  const isAttributeDefined = isDefinedAttribute(o);
  return Object.keys(o)
    .filter(isInputAttribute)
    .filter(isAttributeDefined)
    .reduce(
      (p, c) => {
        const value = (o as any)[c];
        p.push(`[${c.toLowerCase()}=${value}]`);
        return p;
      },
      [] as string[]
    )
    .join('');
};

/** Add a character counter when there is an input restriction. */
const charCounter = <T>(o: IInputOptions<T>) => (o.maxLength ? `[data-length=${o.maxLength}]` : '');

/** Add the disabled attribute when required */
export const disable = ({ disabled }: { disabled?: boolean }) => (disabled ? '[disabled]' : '');

/** Add the required and aria-required attribute when required */
export const req = ({ required, isMandatory }: { required?: boolean; isMandatory?: boolean }) =>
  required || isMandatory ? '[required][aria-required=true]' : '';

/** Add the autofocus attribute when required */
const focus = ({ autofocus }: { autofocus?: (() => boolean) | boolean }) =>
  (typeof autofocus === 'boolean' && autofocus) || (autofocus && autofocus()) ? '[autofocus]' : '';

/** Convert input options to a set of input attributes */
export const toAttrs = <T>(o: IInputOptions<T>) => toProps(o) + charCounter(o) + disable(o) + req(o) + focus(o);

export const pipe = (...fncs: Array<(x: any) => any>) => <T>(x: T) => fncs.reduce((y, f) => f(y), x);
