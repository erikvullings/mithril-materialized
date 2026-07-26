import m from 'mithril';
import { NumberInput } from '../src/input';
import { InputAttrs } from '../src/input-options';

const attrs = {
  min: 1,
  hideSpinners: true,
  name: 'age',
  'aria-describedby': 'age-help',
  'data-testid': 'age-input',
} satisfies InputAttrs<number>;

m(NumberInput, attrs);

// @ts-expect-error min must be a number
const invalidMin = { min: 'x' } satisfies InputAttrs<number>;

// @ts-expect-error unknown component attributes must be rejected
const unknownAttribute = { hideInputs: true } satisfies InputAttrs<number>;

void invalidMin;
void unknownAttribute;
