import { CodeBlock, MapEditor } from 'mithril-materialized';
import m from 'mithril';

export const MapEditorPage = () => {
  const state = {
    properties: {
      stringArray: ['a', 'b', 'c'],
      numberArray: [1, 2, 3],
      aNumber: 42,
      aString: 'Hello world',
      truthy: true,
      falsy: false,
    },
  };

  return {
    view: () =>
      m('.col.s12.m8.xl7', [
        m('h2.header', 'Key-value pairs editor'),
        m('p', [
          'As materializecss.com did not offer a useful editor for a map of key-value pairs, ',
          'I\'ve created one myself. It allows you to edit (or just view, when it is disabled), ',
          'booleans, numbers, strings and arrays of numbers and strings.',
        ]),

        m('h3.header', 'MapEditor'),
        m(
          '.row',
          m(MapEditor, {
            label: 'Properties',
            isMandatory: true,
            properties: state.properties,
            labelKey: 'Unique key', // Override the default label for keys i.e. 'key'
            labelValue: 'My value', // Overrule the default label for values i.e. 'key'
            disable: false, // If true, the map cannot be edited
            disallowArrays: false, // If true, do not convert [1, 2, 3] to a number[]
            keyValueConverter: undefined, // Allows you to overrule the view of each key-value pair
            iconName: 'dns',
            truthy: ['true', 'yes', 'ja', 'oui', 'si', 'da'],
            falsy: ['false', 'no', 'nee', 'nein', 'non', 'nu', 'njet'],
          })
        ),
        m(CodeBlock, {
          code: `          m(MapEditor, {
            label: 'Properties',
            isMandatory: true,
            properties: state.properties,
            labelKey: 'Unique key', // Override the default label for keys i.e. 'key'
            labelValue: 'My value', // Overrule the default label for values i.e. 'key'
            disable: false, // If true, the map cannot be edited
            disallowArrays: false, // If true, do not convert [1, 2, 3] to a number[]
            keyValueConverter: undefined, // Allows you to overrule the view of each key-value pair
            iconName: 'dns',
            truthy: ['true', 'yes', 'ja', 'oui', 'si', 'da'], // Any truthy value generates a boolean
            falsy: ['false', 'no', 'nee', 'nein', 'non', 'nu', 'njet'],
          })`,
        }),

        m(CodeBlock, {
          language: 'CSS',
          code: `          /* Additional styles for the map-editor */
          /* When using an icon prefix, the collection needs to move to the left */
          .map-editor .input-field .prefix ~.collection {
            margin-left: 3rem;
            width: 92%;
            width: calc(100% - 3rem);
          }
          /* For truthy values, the checkbox is not visible when the item is selected, so make it white */
          .map-editor .active .checkbox-in-collection label > input[type=checkbox]:checked + span:before {
            top: -4px;
            left: -3px;
            width: 12px;
            height: 22px;
            border-top: 2px solid transparent;
            border-left: 2px solid transparent;
            border-right: 2px solid white; /* You need to change the colour here */
            border-bottom: 2px solid white; /* And here */
            -webkit-transform: rotate(40deg);
            -moz-transform: rotate(40deg);
            -ms-transform: rotate(40deg);
            -o-transform: rotate(40deg);
            transform: rotate(40deg);
            -webkit-backface-visibility: hidden;
            -webkit-transform-origin: 100% 100%;
            -moz-transform-origin: 100% 100%;
            -ms-transform-origin: 100% 100%;
            -o-transform-origin: 100% 100%;
            transform-origin: 100% 100%;
          }`,
        })
      ]),
  };
};
