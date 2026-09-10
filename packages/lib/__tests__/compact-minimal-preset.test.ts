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
      '--mm-field-prefix-width',
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
      '.collection-header',
      '.collapsible-header',
      '.breadcrumb',
      '.sidenav-link',
      '.mm-modal-surface',
      '.mm-command-palette',
      '.datatable',
      '.sort-indicators',
      '.toast',
      '.tabs',
      '.pagination',
      '.material-tooltip',
      '.timeline',
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
    expect(source).toMatch(/\.collection \.collection-item\.avatar,[^{]*\{[^}]*padding-inline-start:/s);
    expect(source).toMatch(/\.collapsible-header\s*\{[^}]*min-height:\s*var\(--mm-navigation-item-height\)/s);
    expect(source).toMatch(/\.breadcrumb\s*\{[^}]*min-height:\s*0/s);
    expect(source).toMatch(/\.breadcrumb\s*\{[^}]*height:\s*auto/s);
    expect(source).toMatch(
      /\.breadcrumb i\.breadcrumb-icon\.material-icons\s*\{[^}]*font-size:\s*1rem/s
    );
    expect(source).toMatch(/\.tabs,[^{]*\{[^}]*height:\s*var\(--mm-control-height\)/s);
    expect(source).toMatch(/\.timeline\s*\{[^}]*padding:\s*var\(--mm-space-1\)/s);
    expect(source).toMatch(/\.chips\.chips-container\s*\{[^}]*padding-block:\s*5px 2px/s);
    expect(source).toMatch(
      /\.search-select-option-label\s*\{[^}]*gap:\s*var\(--mm-space-1\)/s
    );
    expect(source).toMatch(
      /\.search-select-option-label\s*\{[^}]*padding-inline:\s*var\(--mm-space-2\)/s
    );
    expect(source).toMatch(
      /\.search-select-option-label input\[type="checkbox"\]\s*\{[^}]*flex:\s*0 0 14px[^}]*margin:\s*0/s
    );
    expect(source).toMatch(/\.search-select-option-label input\[type="checkbox"\] \+ span\s*\{[^}]*padding-left:\s*0/s);
    expect(source).toMatch(
      /\.likert-scale__anchor,[^{]*\{[^}]*font-size:\s*var\(--mm-control-font-size\)/s
    );
    expect(source).toMatch(/\.timepicker-plate\s*\{[^}]*inset-inline-start:\s*50%/s);
    expect(source).toMatch(/--mm-modal-content-padding-top-with-close:\s*var\(--mm-space-2\)/);
    expect(source).toMatch(/\.mm-dialog-primary-action[^}]*\{[^}]*color:\s*var\(--mm-button-text/s);
    expect(source).toMatch(/\.mm-fieldset__legend\s*\{[^}]*padding-inline:\s*0/s);
    expect(source).toMatch(/\.sort-indicators\s*\{[^}]*gap:\s*1px/s);
    expect(source).toMatch(/\.sort-indicators \.sort-icon\s*\{[^}]*font-size:\s*10px/s);
  });
});
