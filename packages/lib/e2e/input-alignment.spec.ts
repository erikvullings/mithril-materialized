import { expect, test, type Page } from '@playwright/test';
import path from 'node:path';

declare global {
  interface Window {
    m: typeof import('mithril');
    'mithril-materialized': typeof import('../dist');
  }
}

const dist = path.resolve(__dirname, '../dist');

async function mountFields(page: Page, icons: boolean, populated: boolean) {
  await page.evaluate(({ icons, populated }) => {
    const m = window.m;
    const { TextInput, Select, NumberInput, EmailInput, PasswordInput, UrlInput, TextArea, RangeInput, FileInput } =
      window['mithril-materialized'];
    let query = populated ? 'Microscope' : '';
    let category = populated ? 'microscopy' : '';
    m.mount(document.getElementById('app')!, {
      view: () => [
        m('.alignment-example', [
          m(TextInput, {
            id: 'alignment-search', className: '', label: 'Search facilities',
            iconName: icons ? 'search' : undefined, canClear: true,
            value: query, oninput: (value: string) => { query = value; },
          }),
          m(Select<string>, {
            id: 'alignment-category', className: '', label: 'Category',
            iconName: icons ? 'search' : undefined,
            checkedId: category, options: [
              { id: '', label: 'All' }, { id: 'microscopy', label: 'Microscopy' },
            ],
            onchange: (ids: string[]) => { category = ids[0] ?? ''; },
          }),
        ]),
        m('.alignment-example.variants', [
          m(NumberInput, { id: 'alignment-number', className: '', label: 'Number', defaultValue: 1 }),
          m(EmailInput, { id: 'alignment-email', className: '', label: 'Email' }),
          m(PasswordInput, { id: 'alignment-password', className: '', label: 'Password' }),
          m(UrlInput, { id: 'alignment-url', className: '', label: 'URL' }),
          ...['search', 'tel', 'date', 'time', 'datetime', 'datetime-local'].map(type =>
            m('.input-field', m('input', { type }))
          ),
        ]),
        m('.select-wrapper', m('input.select-dropdown', { id: 'alignment-legacy', type: 'text', readonly: true })),
        m(Select<string>, {
          id: 'alignment-outlined', className: '', label: 'Outlined', appearance: 'outlined',
          options: [{ id: 'one', label: 'One' }],
        }),
        m(TextArea, { id: 'unchanged-textarea', className: '', label: 'Notes' }),
        m(RangeInput, { id: 'unchanged-range', className: '', label: 'Range' }),
        m(FileInput, { className: '' }),
      ],
    });
    m.redraw.sync();
  }, { icons, populated });
}

async function expectAligned(page: Page, expectedHeight: number) {
  const geometry = await page.evaluate(() => {
    const input = document.getElementById('alignment-search')!.getBoundingClientRect();
    const select = document.getElementById('alignment-category')!.getBoundingClientRect();
    const controls = Array.from(document.querySelectorAll<HTMLElement>('.alignment-example input, .alignment-example button.select-dropdown'));
    return {
      topDifference: Math.abs(input.top - select.top),
      bottomDifference: Math.abs(input.bottom - select.bottom),
      heightDifference: Math.abs(input.height - select.height),
      heights: [...controls, document.getElementById('alignment-legacy')!].map(el => el.getBoundingClientRect().height),
      overflow: controls.map(el => {
        const field = el.closest('.input-field')!.getBoundingClientRect();
        const rect = el.getBoundingClientRect();
        return Math.max(field.left - rect.left, rect.right - field.right);
      }),
      pageOverflow: document.documentElement.scrollWidth - window.innerWidth,
    };
  });
  expect(geometry.topDifference).toBeLessThan(0.1);
  expect(geometry.bottomDifference).toBeLessThan(0.1);
  expect(geometry.heightDifference).toBeLessThan(0.1);
  for (const height of geometry.heights) expect(Math.abs(height - expectedHeight)).toBeLessThan(0.1);
  for (const overflow of geometry.overflow) expect(overflow).toBeLessThan(0.1);
  expect(geometry.pageOverflow).toBeLessThanOrEqual(0);
}

for (const css of ['index.css', 'index.min.css']) {
  for (const rootSize of [14, 16]) {
    for (const theme of ['light', 'dark']) {
      for (const compact of [false, true]) {
        test(`${css}, ${rootSize}px, ${theme}, ${compact ? 'compact' : 'standard'}`, async ({ page }) => {
          await page.setContent('<!doctype html><html><head></head><body><main id="app"></main></body></html>');
          await page.addStyleTag({ path: path.join(dist, css) });
          await page.addStyleTag({ path: path.join(dist, 'presets/compact-minimal.css') });
          await page.addStyleTag({ content: `
            html { font-size: ${rootSize}px; }
            body { padding: 32px 8px; }
            .alignment-example { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 32px; }
            .alignment-example > .input-field { flex: 1; min-width: 0; margin: 0; }
            .variants { flex-wrap: wrap; }
            .variants > .input-field { flex-basis: 40%; }
          ` });
          await page.evaluate(({ theme, compact }) => {
            document.documentElement.dataset.theme = theme;
            if (compact) document.documentElement.dataset.mmPreset = 'compact-minimal';
          }, { theme, compact });
          await page.addScriptTag({ path: require.resolve('mithril/mithril.js') });
          await page.addScriptTag({ path: path.join(dist, 'index.umd.js') });
          const coarse = await page.evaluate(() => matchMedia('(pointer: coarse)').matches);
          const expectedHeight = compact ? (coarse ? 40 : 32) : rootSize * 3 + 1;

          for (const width of [375, 1024]) {
            await page.setViewportSize({ width, height: 900 });
            for (const icons of [false, true]) {
              for (const populated of [false, true]) {
                await mountFields(page, icons, populated);
                await expectAligned(page, expectedHeight);
                const input = page.locator('#alignment-search');
                const select = page.locator('#alignment-category');
                const label = page.locator('label[for="alignment-search"]');
                const selectLabel = page.locator('label[for="alignment-category"]');
                const selectBorder = await select.evaluate(el => getComputedStyle(el).borderBottomColor);
                await expect(page.locator('.input-clear-btn')).toHaveCount(populated ? 1 : 0);
                await expect(selectLabel).toHaveCSS('top', '-26px');
                if (populated) await expect(label).toHaveClass(/active/);
                await input.focus();
                await expect(label).toHaveClass(/active/);
                await expect(label).toHaveCSS('transform', compact
                  ? 'matrix(0.78, 0, 0, 0.78, 0, -10)'
                  : 'matrix(0.8, 0, 0, 0.8, 0, -14)');
                await expect(input).toHaveCSS('border-bottom-width', '1px');
                await expect.poll(() => input.evaluate(el => getComputedStyle(el).boxShadow)).not.toBe('none');
                await expectAligned(page, expectedHeight);
                await select.focus();
                await expect(select).toHaveCSS('border-bottom-width', '1px');
                await expect.poll(() => select.evaluate(el => getComputedStyle(el).borderBottomColor)).not.toBe(selectBorder);
                if (!populated) await expect(label).not.toHaveClass(/active/);
                await expect(selectLabel).toHaveCSS('top', '-26px');
                await expectAligned(page, expectedHeight);
                await select.press('ArrowDown');
                await expect(select).toHaveAttribute('aria-expanded', 'true');
                await select.press('Escape');
                await expect(select).toHaveAttribute('aria-expanded', 'false');
                await select.press('ArrowDown');
                await expect(select).toHaveAttribute('aria-expanded', 'true');
                await select.press('ArrowDown');
                await expect(page.locator('#alignment-category-dropdown li.focused')).toHaveText('Microscopy');
                await select.press('Enter');
                await expect(select).toHaveText('Microscopy');
                await expect(select).toHaveAttribute('aria-expanded', 'false');
                await expectAligned(page, expectedHeight);
                await select.press('Tab');
                await expect(select).not.toBeFocused();
                await input.fill('Clear me');
                await page.locator('.input-clear-btn').click();
                await expect(input).toHaveValue('');
                await expectAligned(page, expectedHeight);
              }
            }
          }
          await expect(page.locator('#alignment-outlined')).toHaveCSS('height', `${rootSize * 3}px`);
          const textarea = page.locator('#unchanged-textarea');
          await expect(textarea).toHaveCSS('box-sizing', compact ? 'border-box' : 'content-box');
          await expect(textarea).toHaveCSS('padding-top', compact ? '7px' : '10px');
          const initialHeight = await textarea.evaluate(el => el.getBoundingClientRect().height);
          await textarea.fill('First line\nSecond line\nThird line\nFourth line\nFifth line');
          await expect.poll(() => textarea.evaluate(el => el.getBoundingClientRect().height)).toBeGreaterThan(initialHeight);
          await expect(page.locator('#unchanged-range')).toHaveCSS('box-sizing', 'border-box');
          await expect(page.locator('input[type="file"]')).toHaveCSS('opacity', '0');
          await expect(page.locator('input.file-path')).toHaveCSS('box-sizing', compact ? 'border-box' : 'content-box');
        });
      }
    }
  }
}
