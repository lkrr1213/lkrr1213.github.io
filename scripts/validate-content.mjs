import { readFile, readdir } from 'node:fs/promises';
import { basename, join } from 'node:path';

const collections = ['projects', 'posts'];
const errors = [];

function field(frontmatter, name) {
  const match = frontmatter.match(new RegExp(`^${name}:\\s*(.+?)\\s*$`, 'm'));
  return match?.[1]?.replace(/^['"]|['"]$/g, '') ?? '';
}

for (const collection of collections) {
  const folder = join('src', 'content', collection);
  const files = (await readdir(folder, { recursive: true })).filter((name) => name.endsWith('.md')).sort();
  const seen = new Map();
  const pairs = new Map();
  for (const file of files) {
    const source = await readFile(join(folder, file), 'utf8');
    const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
    if (!frontmatter) { errors.push(`${collection}/${file}: missing YAML frontmatter`); continue; }
    const slug = field(frontmatter, 'slug');
    const lang = field(frontmatter, 'lang');
    const draft = field(frontmatter, 'draft');
    const key = `${lang}/${slug}`;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) errors.push(`${collection}/${file}: invalid slug`);
    if (!['zh', 'en'].includes(lang)) errors.push(`${collection}/${file}: invalid lang`);
    if (!['true', 'false'].includes(draft)) errors.push(`${collection}/${file}: draft must be true or false`);
    if (basename(file) !== `${slug}.${lang}.md`) errors.push(`${collection}/${file}: filename must match ${slug}.${lang}.md`);
    if (seen.has(key)) errors.push(`${collection}: duplicate lang + slug "${key}" in ${seen.get(key)} and ${file}`);
    seen.set(key, file);
    const pair = pairs.get(slug) ?? {};
    pair[lang] = { file, draft, order: field(frontmatter, 'order'), featured: field(frontmatter, 'featured') };
    pairs.set(slug, pair);
    if (collection === 'posts') {
      const date = field(frontmatter, 'publishedAt');
      const parsed = new Date(`${date}T00:00:00Z`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== date) errors.push(`${collection}/${file}: invalid publishedAt date`);
    }
  }
  if (collection === 'projects') {
    for (const [slug, pair] of pairs) {
      if (pair.zh && pair.en && (pair.zh.order !== pair.en.order || pair.zh.featured !== pair.en.featured)) errors.push(`${collection}/${slug}: order and featured must match in both languages`);
    }
  }
}

if (errors.length) {
  console.error(`Content validation failed:\n${errors.map((error) => `- ${error}`).join('\n')}`);
  process.exit(1);
}
console.log('Content validation passed.');
