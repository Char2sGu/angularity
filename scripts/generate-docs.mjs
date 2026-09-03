// Generates ng-doc site pages from package READMEs.
//
// The package `README.md` is the single source of truth for consumer docs. This
// script projects each README into `docs/src/content/packages/<pkg>/index.md`,
// which ng-doc renders.
//
// Transform applied to a README:
//   - the leading H1 is dropped (ng-doc supplies the page title)
//   - everything before `## API` is emitted verbatim (intro, install, usage)
//   - inside `## API`, each `### \`@angularity/<subpath>\`` heading sets the
//     entry point; a bare `- \`symbol\`` bullet gets its JSDoc description
//     injected via ng-doc's `{{ JSDoc.description(...) }}`; a bullet that
//     already carries inline text is emitted verbatim.

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = join(root, 'docs/src/content/packages');

// A stable relative path — this string is committed into generated files, so it
// must not vary by machine or checkout location.
const BANNER =
  '<!-- Generated from the package README by scripts/generate-docs.mjs. Do not edit. -->';

// An API entry-point heading: a backticked H3 naming the import specifier —
// scoped (`@angularity/core`, `@angularity/core/http`) or unscoped
// (`ngx-view-transition`).
const HEADING = /^###\s+`([^`]+)`\s*$/;
const BARE_BULLET = /^(\s*)-\s+`([^`]+)`\s*$/;

function sourceOf(spec) {
  // Map an import specifier to its entry-point barrel:
  //   `@angularity/core`      -> packages/core/src/index.ts
  //   `@angularity/core/http` -> packages/core/http/src/index.ts
  //   `ngx-view-transition`   -> packages/ngx-view-transition/src/index.ts
  const path = spec.replace(/^@angularity\//, '');
  return `packages/${path}/src/index.ts`;
}

function generate(readme) {
  const lines = readme.replace(/\r\n/g, '\n').split('\n');

  // Drop a leading H1 (and one trailing blank line) — ng-doc owns the title.
  let start = 0;
  while (start < lines.length && lines[start].trim() === '') start++;
  if (lines[start]?.startsWith('# ')) {
    start++;
    if (lines[start]?.trim() === '') start++;
  }

  const out = [BANNER, ''];
  let entrySource = null;
  let inApi = false;

  for (let i = start; i < lines.length; i++) {
    const line = lines[i];

    if (/^##\s+API\s*$/.test(line)) {
      inApi = true;
      continue; // the `## API` wrapper heading is not rendered on the site
    }

    if (!inApi) {
      out.push(line);
      continue;
    }

    const heading = line.match(HEADING);
    if (heading) {
      entrySource = sourceOf(heading[1]);
      out.push(line);
      continue;
    }

    const bare = entrySource && line.match(BARE_BULLET);
    if (bare) {
      const [, indent, symbol] = bare;
      out.push(line);
      out.push(
        `${indent}  {{ JSDoc.description("${entrySource}#${symbol}") }}`,
      );
      continue;
    }

    out.push(line);
  }

  return (
    out
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trimEnd() + '\n'
  );
}

let count = 0;
for (const name of readdirSync(contentDir)) {
  const pageConfig = join(contentDir, name, 'ng-doc.page.ts');
  if (!existsSync(pageConfig)) continue; // not a package page (e.g. category files)

  const readmePath = join(root, 'packages', name, 'README.md');
  if (!existsSync(readmePath)) {
    console.warn(`skip ${name}: no packages/${name}/README.md`);
    continue;
  }

  const output = generate(readFileSync(readmePath, 'utf8'));
  writeFileSync(join(contentDir, name, 'index.md'), output);
  console.log(`generated docs/src/content/packages/${name}/index.md`);
  count++;
}

console.log(`\n${count} page(s) generated.`);
