import m, { FactoryComponent } from 'mithril';

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

/**
 * Create a GUID
 * @see https://stackoverflow.com/a/2117523/319711
 *
 * @returns RFC4122 version 4 compliant GUID
 */
export const uuid4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // tslint:disable-next-line:no-bitwise
    const r = (Math.random() * 16) | 0;
    // tslint:disable-next-line:no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/** Check if a string or number is numeric. @see https://stackoverflow.com/a/9716488/319711 */
export const isNumeric = (n: string | number) => !isNaN(parseFloat(n as string)) && isFinite(n as number);

/**
 * Pad left, default width 2 with a '0'
 *
 * @see http://stackoverflow.com/a/10073788/319711
 * @param {(string | number)} n
 * @param {number} [width=2]
 * @param {string} [z='0']
 * @returns
 */
export const padLeft = (n: string | number, width: number = 2, z: string = '0') => String(n).padStart(width, z);

export const Caret: FactoryComponent = () => {
  return {
    view: () => {
      return m(
        'svg',
        { class: 'caret', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
        [m('path', { d: 'M7 10l5 5 5-5z' }), m('path', { d: 'M0 0h24v24H0z', fill: 'none' })]
      );
    },
  };
};

// Keep only essential dropdown positioning styles
export const getDropdownStyles = (inputRef?: HTMLElement | null, overlap = false) => {
  if (!inputRef) {
    return {
      display: 'block',
      opacity: 1,
      position: 'absolute',
      top: overlap ? 0 : '100%',
      left: '0',
      zIndex: 1000,
      width: '100%',
    };
  }

  const rect = inputRef.getBoundingClientRect();
  return {
    display: 'block',
    opacity: 1,
    position: 'absolute',
    top: overlap ? 0 : '100%',
    left: '0',
    zIndex: 1000,
    width: `${rect.width}px`,
  };
};
