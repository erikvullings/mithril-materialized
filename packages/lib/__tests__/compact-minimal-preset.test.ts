import fs from 'node:fs';
import path from 'node:path';

const packageRoot = path.resolve(__dirname, '..');
const packageJson = JSON.parse(
  fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8')
);
const presetPath = path.join(
  packageRoot,
  'src/presets/compact-minimal.scss'
);

describe('compact minimal preset contract', () => {
  it('exports a standalone generated stylesheet', () => {
    expect(packageJson.exports['./presets/compact-minimal.css']).toBe(
      './dist/presets/compact-minimal.css'
    );
    expect(packageJson.scripts['build:css-presets']).toContain(
      'src/presets/compact-minimal.scss'
    );
  });

  it('is opt-in and defines shared semantic density tokens', () => {
    const source = fs.readFileSync(presetPath, 'utf8');

    expect(source).toContain('[data-mm-preset="compact-minimal"]');
    expect(source).not.toMatch(/^\s*:root/m);
    expect(source).toContain('@media (pointer: coarse)');
    [
      '--mm-density-unit',
      '--mm-control-height',
      '--mm-row-height',
      '--mm-menu-item-height',
      '--mm-navigation-item-height',
      '--mm-control-padding-inline',
      '--mm-control-font-size',
      '--mm-heading-1-font-size',
      '--mm-heading-6-font-size',
      '--mm-surface-radius',
      '--mm-surface-shadow',
      '--mm-focus-ring-width',
    ].forEach((token) => expect(source).toContain(token));
  });

  it('compacts typography without shifting plain text inputs', () => {
    const source = fs.readFileSync(presetPath, 'utf8');

    expect(source).toMatch(/h1\s*\{[^}]*font-size:\s*var\(--mm-heading-1-font-size\)/s);
    expect(source).toMatch(/h6\s*\{[^}]*font-size:\s*var\(--mm-heading-6-font-size\)/s);
    expect(source).toMatch(/textarea\.materialize-textarea\s*\{[^}]*padding-inline:\s*0/s);
    expect(source).toMatch(/\.input-field \.prefix\s*\{[^}]*align-items:\s*center/s);
    expect(source).toContain('.input-field .prefix ~ .select-wrapper');
    expect(source).toMatch(/\.input-field > label\s*\{[^}]*inset-inline-start:\s*0/s);
    expect(source).toContain('.input-field:dir(rtl) .prefix');
  });

  it('covers the required desktop component surfaces within the preset scope', () => {
    const source = fs.readFileSync(presetPath, 'utf8');

    [
      '.btn',
      '.input-field',
      '.number-input-control',
      '.chips-container',
      '.select-wrapper',
      '.dropdown-content',
      '.mm-menu',
      '.sidenav-link',
      '.mm-modal-surface',
      '.mm-command-palette',
      '.datatable',
      '.mm-virtual-list-item',
      '.mm-snackbar',
      '.mm-avatar',
      '.mm-skeleton',
      '.mm-empty-state',
    ].forEach((selector) => expect(source).toContain(selector));
  });

  it('preserves compact control shapes and dense selection geometry', () => {
    const source = fs.readFileSync(presetPath, 'utf8');

    expect(source).toContain('border-radius: 50%');
    expect(source).toContain('flex-direction: column');
    expect(source).toContain('.search-select-option-label');
    expect(source).toContain('.datepicker-modal');
    expect(source).toContain('.timepicker-modal');
    expect(source).toContain('.select-wrapper:focus-visible');
  });

  it('normalizes dense icon controls, fields, choices, and picker internals', () => {
    const source = fs.readFileSync(presetPath, 'utf8');

    expect(source).toMatch(/\.btn-floating i\s*\{[^}]*margin:\s*0/s);
    expect(source).toContain('.toggle-group .toggle-button > svg');
    expect(source).toContain('--mm-confirm-button-size');
    expect(source).toMatch(/textarea\.materialize-textarea\s*\{[^}]*padding-block-start:/s);
    expect(source).toMatch(/\.datepicker-controls[\s\S]*?\.dropdown-item\s*\{/);
    expect(source).toContain('.timepicker-analog-display');
    expect(source).toContain('.likert-scale__label::before');
    expect(source).toContain('.dropdown-content .mm-layout-item-icon');
  });
});
