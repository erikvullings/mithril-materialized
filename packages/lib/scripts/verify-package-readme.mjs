import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');

if (/^#{1,6}.*\bv?\d+\.\d+(?:\.\d+)?\s*-\s*latest release\b/im.test(readme)) {
  throw new Error('README.md must not identify a version as the latest release; link to CHANGELOG.md instead.');
}

const npmCache = await mkdtemp(join(tmpdir(), 'mithril-materialized-npm-cache-'));
const result = spawnSync('npm', ['pack', '--dry-run', '--json'], {
  encoding: 'utf8',
  env: { ...process.env, npm_config_cache: npmCache },
  stdio: ['ignore', 'pipe', 'inherit'],
});
await rm(npmCache, { force: true, recursive: true });

if (result.status !== 0) process.exit(result.status ?? 1);

const [{ files }] = JSON.parse(result.stdout);
if (!files.some(({ path }) => path.toLowerCase() === 'readme.md')) {
  throw new Error('README.md is missing from the npm package.');
}
