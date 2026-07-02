import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface LabMeta {
  slug: string;
  trial_no: string;
  subject: string;
  version: string;
  date: string;
  viability: number;
  status: 'APPROVED FOR RESUPPLY' | 'DISCONTINUED' | 'ONGOING';
  mission_ref?: string;
  notes: string;
}

const contentDir = path.join(process.cwd(), 'content/lab');

export function getAllLabs(): LabMeta[] {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  return files
    .map(file => {
      const raw = fs.readFileSync(path.join(contentDir, file), 'utf8');
      const { data } = matter(raw);
      return { slug: file.replace(/\.mdx?$/, ''), ...data } as LabMeta;
    })
    .sort((a, b) => (a.trial_no > b.trial_no ? -1 : 1));
}

export function getLabBySlug(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  const fallback = path.join(contentDir, `${slug}.md`);
  const fullPath = fs.existsSync(filePath) ? filePath : fallback;
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);
  return { meta: { slug, ...data } as LabMeta, content };
}
