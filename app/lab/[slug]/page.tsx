import { getAllLabs, getLabBySlug } from '@/lib/labs';
import NavBar from '@/components/NavBar';
import Link from 'next/link';

export async function generateStaticParams() {
  const labs = getAllLabs();
  return labs.map(l => ({ slug: l.slug }));
}

export default function LabEntryPage({ params }: { params: { slug: string } }) {
  const { meta, content } = getLabBySlug(params.slug);

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <NavBar />
      <div className="mt-16">
        <Link href="/lab" className="font-mono text-xs text-gray-500 hover:text-mono transition-colors">← BACK TO TRIAL LOGS</Link>
      </div>

      <div className="border border-border bg-surface p-6 mt-6 mb-8">
        <div className="flex items-start justify-between mb-4">
          <span className="font-mono text-xs text-gray-500">TRIAL LOG {meta.trial_no} — {meta.version}</span>
          <span className={`stamp ${
            meta.status === 'APPROVED FOR RESUPPLY' ? 'stamp-active' :
            meta.status === 'DISCONTINUED' ? 'stamp-aborted' : 'stamp-classified'
          }`}>{meta.status}</span>
        </div>
        <h1 className="font-grotesk text-3xl font-bold text-textMain mb-6">{meta.subject}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            ['DATE', meta.date],
            ['VIABILITY SCORE', `${meta.viability} / 10`],
            ['STATUS', meta.status],
            ...(meta.mission_ref ? [['MISSION REF', meta.mission_ref]] : []),
          ].map(([label, value]) => (
            <div key={label}>
              <div className="font-mono text-xs text-gray-600 mb-1">{label}</div>
              <div className="font-mono text-sm text-mono">{value}</div>
            </div>
          ))}
        </div>
        {meta.notes && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="font-mono text-xs text-gray-600 mb-1">FIELD NOTES</div>
            <div className="font-mono text-sm text-gray-400">{meta.notes}</div>
          </div>
        )}
      </div>

      <div className="whitespace-pre-wrap font-mono text-sm text-gray-300">{content}</div>
    </main>
  );
}
