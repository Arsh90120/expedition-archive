import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ExpeditionMeta {
  slug: string;
  file_no: string;
  title: string;
  location: string;
  date: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'ABORTED' | 'CLASSIFIED';
  clearance: number;
  duration: string;
  duration_days: number;
  summary: string;
}

const contentDir = path.join(process.cwd(), 'content/expeditions');

export function getAllExpeditions(): ExpeditionMeta[] {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  return files
    .map(file => {
      const raw = fs.readFileSync(path.join(contentDir, file), 'utf8');
      const { data } = matter(raw);
      return { slug: file.replace(/\.mdx?$/, ''), ...data } as ExpeditionMeta;
    })
    .sort((a, b) => (a.file_no > b.file_no ? -1 : 1));
}

export function getExpeditionBySlug(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  const fallback = path.join(contentDir, `${slug}.md`);
  const fullPath = fs.existsSync(filePath) ? filePath : fallback;
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);
  return { meta: { slug, ...data } as ExpeditionMeta, content };
}
