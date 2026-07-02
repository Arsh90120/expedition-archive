import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { getAllExpeditions } from '@/lib/expeditions';

export default function ExpeditionsPage() {
  const expeditions = getAllExpeditions();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <NavBar />
      <div className="mt-16 mb-10">
        <p className="font-mono text-mono text-xs tracking-widest mb-3">// MISSION FILES</p>
        <h1 className="font-grotesk text-4xl font-bold">EXPEDITIONS</h1>
        <p className="font-mono text-sm text-gray-500 mt-2">{expeditions.length} files on record.</p>
      </div>

      <div className="space-y-4">
        {expeditions.length === 0 && (
          <p className="font-mono text-sm text-gray-600">No mission files found. Add .mdx files to content/expeditions/</p>
        )}
        {expeditions.map(exp => (
          <Link key={exp.slug} href={`/expeditions/${exp.slug}`}>
            <div className="border border-border bg-surface p-5 hover:border-mono transition-colors cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <span className="font-mono text-xs text-gray-500">FILE NO. {exp.file_no}</span>
                <span className={`stamp stamp-${exp.status.toLowerCase().replace(/ /g, '-')}`}>{exp.status}</span>
              </div>
              <h2 className="font-grotesk text-xl font-bold text-textMain group-hover:text-mono transition-colors mb-2">
                {exp.status === 'CLASSIFIED' ? (
                  <span className="redacted">{exp.title}</span>
                ) : exp.title}
              </h2>
              <div className="font-mono text-xs text-gray-500 flex gap-6">
                <span>{exp.location}</span>
                <span>{exp.date}</span>
                <span>LEVEL {exp.clearance}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
