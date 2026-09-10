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
      '--mm-surface-radius',
      '--mm-surface-shadow',
      '--mm-focus-ring-width',
    ].forEach((token) => expect(source).toContain(token));
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
});
