/**
 * Create a unique ID
 * @see https://stackoverflow.com/a/2117523/319711
 *
 * @returns id followed by 8 hexadecimal characters.
 */
export const uniqueId = () => {
    // tslint:disable-next-line:no-bitwise
    return 'idxxxxxxxx'.replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16));
};
export const compose = (...functions) => (data) => functions.reduceRight((value, func) => func(value), data);
export const map = (f) => (x) => Array.prototype.map.call(x, f);
export const join = (seperator) => (list) => Array.prototype.join.call(list, seperator);
/**
 * Convert camel case to snake case.
 *
 * @param {string} cc: Camel case string
 */
export const camelToSnake = (cc) => cc.replace(/([A-Z])/g, $1 => '-' + $1.toLowerCase());
const encodeAttribute = (x = '') => x.toString().replace(/"/g, '&quot;');
/** Convert an object to a string of HTML attributes */
export const toAttributeString = (x) => x
    ? compose(join(''), map((attribute) => `[${camelToSnake(attribute)}="${encodeAttribute(x[attribute])}"]`), Object.keys)(x)
    : '';
/** Options that we want to convert to attributes  */
const inputAttributes = [
    'min',
    'max',
    'minLength',
    'maxLength',
    'rows',
    'cols',
    'placeholder',
    'autocomplete',
    'pattern',
    'readOnly',
];
const isInputAttribute = (key) => inputAttributes.indexOf(key) >= 0;
const isDefinedAttribute = (opt) => (key) => typeof opt[key] !== 'undefined';
const toProps = (o) => {
    const isAttributeDefined = isDefinedAttribute(o);
    return Object.keys(o)
        .filter(isInputAttribute)
        .filter(isAttributeDefined)
        .reduce((p, c) => {
        const value = o[c];
        p.push(`[${c.toLowerCase()}=${value}]`);
        return p;
    }, [])
        .join('');
};
/** Add a character counter when there is an input restriction. */
const charCounter = (o) => (o.maxLength ? `[data-length=${o.maxLength}]` : '');
/** Add the disabled attribute when required */
export const disable = ({ disabled }) => (disabled ? '[disabled]' : '');
/** Add the required and aria-required attribute when required */
export const req = ({ required, isMandatory }) => required || isMandatory ? '[required][aria-required=true]' : '';
/** Add the autofocus attribute when required */
const focus = ({ autofocus }) => (typeof autofocus === 'boolean' && autofocus) || (autofocus && autofocus()) ? '[autofocus]' : '';
/** Convert input options to a set of input attributes */
export const toAttrs = (o) => toProps(o) + charCounter(o) + disable(o) + req(o) + focus(o);
/** Check if a string or number is numeric. @see https://stackoverflow.com/a/9716488/319711 */
export const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);
export const pipe = (...fncs) => (x) => fncs.reduce((y, f) => f(y), x);
/**
 * Pad left, default width 2 with a '0'
 *
 * @see http://stackoverflow.com/a/10073788/319711
 * @param {(string | number)} n
 * @param {number} [width=2]
 * @param {string} [z='0']
 * @returns
 */
export const padLeft = (n, width = 2, z = '0') => {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};
//# sourceMappingURL=utils.js.map