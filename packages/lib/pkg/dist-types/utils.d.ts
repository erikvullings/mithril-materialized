import { IInputOptions } from './input-options';
/**
 * Create a unique ID
 * @see https://stackoverflow.com/a/2117523/319711
 *
 * @returns id followed by 8 hexadecimal characters.
 */
export declare const uniqueId: () => string;
export declare const compose: <F extends (d: any) => any, T>(...functions: F[]) => (data: T) => T;
export declare const map: <T>(f: (...args: any[]) => any) => (x: T[]) => {}[];
export declare const join: <T>(seperator: string) => (list: T[]) => string;
/**
 * Convert camel case to snake case.
 *
 * @param {string} cc: Camel case string
 */
export declare const camelToSnake: (cc: string) => string;
/** Convert an object to a string of HTML attributes */
export declare const toAttributeString: <T extends {
    [key: string]: any;
}>(x?: T | undefined) => "" | T;
/** Add the disabled attribute when required */
export declare const disable: ({ disabled }: {
    disabled?: boolean | undefined;
}) => "" | "[disabled]";
/** Add the required and aria-required attribute when required */
export declare const req: ({ required, isMandatory }: {
    required?: boolean | undefined;
    isMandatory?: boolean | undefined;
}) => "" | "[required][aria-required=true]";
/** Convert input options to a set of input attributes */
export declare const toAttrs: <T>(o: IInputOptions<T>) => string;
/** Check if a string or number is numeric. @see https://stackoverflow.com/a/9716488/319711 */
export declare const isNumeric: (n: string | number) => boolean;
export declare const pipe: (...fncs: ((x: any) => any)[]) => <T>(x: T) => T;
/**
 * Pad left, default width 2 with a '0'
 *
 * @see http://stackoverflow.com/a/10073788/319711
 * @param {(string | number)} n
 * @param {number} [width=2]
 * @param {string} [z='0']
 * @returns
 */
export declare const padLeft: (n: string | number, width?: number, z?: string) => string;
