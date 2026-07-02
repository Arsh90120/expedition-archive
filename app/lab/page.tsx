import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { getAllLabs } from '@/lib/labs';

export default function LabPage() {
  const labs = getAllLabs();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <NavBar />
      <div className="mt-16 mb-10">
        <p className="font-mono text-mono text-xs tracking-widest mb-3">// FIELD RATIONS LAB</p>
        <h1 className="font-grotesk text-4xl font-bold">TRIAL LOGS</h1>
        <p className="font-mono text-sm text-gray-500 mt-2">{labs.length} experiments on record.</p>
      </div>

      <div className="space-y-4">
        {labs.length === 0 && (
          <p className="font-mono text-sm text-gray-600">No lab files found. Add .mdx files to content/lab/</p>
        )}
        {labs.map(lab => (
          <Link key={lab.slug} href={`/lab/${lab.slug}`}>
            <div className="border border-border bg-surface p-5 hover:border-mono transition-colors cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <span className="font-mono text-xs text-gray-500">TRIAL LOG {lab.trial_no} — {lab.version}</span>
                <span className={`stamp ${
                  lab.status === 'APPROVED FOR RESUPPLY' ? 'stamp-active' :
                  lab.status === 'DISCONTINUED' ? 'stamp-aborted' : 'stamp-classified'
                }`}>{lab.status}</span>
              </div>
              <h2 className="font-grotesk text-xl font-bold text-textMain group-hover:text-mono transition-colors mb-2">
                {lab.subject}
              </h2>
              <div className="font-mono text-xs text-gray-500 flex gap-6">
                <span>VIABILITY — {lab.viability}/10</span>
                <span>{lab.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
