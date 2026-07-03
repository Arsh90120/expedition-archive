import { getAllExpeditions, getExpeditionBySlug } from '@/lib/expeditions';
import NavBar from '@/components/NavBar';
import PhotoGallery from '@/components/PhotoGallery';
import Link from 'next/link';

export async function generateStaticParams() {
  const expeditions = getAllExpeditions();
  return expeditions.map(e => ({ slug: e.slug }));
}

export default async function ExpeditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { meta, content } = getExpeditionBySlug(slug);

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <NavBar />
      <div className="mt-16">
        <Link href="/expeditions" className="font-mono text-xs text-gray-500 hover:text-mono transition-colors">← BACK TO MISSION FILES</Link>
      </div>

      {/* Dossier Header */}
      <div className="border border-border bg-surface p-6 mt-6 mb-8">
        <div className="flex items-start justify-between mb-4">
          <span className="font-mono text-xs text-gray-500">FILE NO. {meta.file_no}</span>
          <span className={`stamp stamp-${meta.status.toLowerCase()}`}>{meta.status}</span>
        </div>
        <h1 className="font-grotesk text-3xl font-bold text-textMain mb-6">{meta.title}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {([
            ['LOCATION', meta.location],
            ['DATE OPENED', meta.date],
            ['STATUS', meta.status],
            ['CLEARANCE', `LEVEL ${meta.clearance}`],
            ['DURATION', meta.duration],
          ] as [string, string][]).map(([label, value]) => (
            <div key={label}>
              <div className="font-mono text-xs text-gray-600 mb-1">{label}</div>
              <div className="font-mono text-sm text-mono">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="whitespace-pre-wrap font-mono text-sm text-gray-300 leading-relaxed">
        {content}
      </div>

      {/* Photo Gallery */}
      <PhotoGallery slug={slug} />
    </main>
  );
}
