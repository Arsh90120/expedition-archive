import Link from 'next/link';
import AnimatedCounter from '@/components/AnimatedCounter';
import NavBar from '@/components/NavBar';
import { getAllExpeditions } from '@/lib/expeditions';
import { getAllLabs } from '@/lib/labs';

export default function HomePage() {
  const expeditions = getAllExpeditions();
  const labs = getAllLabs();

  const activeExpedition = expeditions.find(e => e.status === 'ACTIVE') || expeditions[0];

  const daysInField = expeditions
    .filter(e => e.status === 'ARCHIVED')
    .reduce((acc, e) => acc + (e.duration_days || 1), 0);

  const missionsClosed = expeditions.filter(e => e.status === 'ARCHIVED').length;
  const trialsRun = labs.length;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <NavBar />

      {/* Header */}
      <div className="mt-16 mb-12">
        <p className="font-mono text-mono text-xs tracking-widest mb-3">// EXPEDITION ARCHIVE — FIELD DOCUMENTATION SYSTEM</p>
        <h1 className="font-grotesk text-5xl font-bold tracking-tight text-textMain leading-none">EXPEDITION<br />ARCHIVE</h1>
        <p className="font-mono text-sm text-gray-500 mt-4 tracking-wide">Ongoing field documentation. Unclassified.</p>
      </div>

      <hr className="divider" />

      {/* Operations Board */}
      <section className="mb-12">
        <p className="font-mono text-mono text-xs tracking-widest mb-6">// OPERATIONS BOARD</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBlock label="ACTIVE FILES" value={expeditions.filter(e => e.status === 'ACTIVE').length} />
          <StatBlock label="MISSIONS CLOSED" value={missionsClosed} />
          <StatBlock label="TRIALS RUN" value={trialsRun} />
          <StatBlock label="DAYS IN FIELD" value={daysInField} />
        </div>
        <div className="mt-4 font-mono text-xs text-gray-600">
          LAST TRANSMISSION — {expeditions[0]?.date || 'N/A'}
        </div>
      </section>

      <hr className="divider" />

      {/* Current Mission */}
      {activeExpedition && (
        <section className="mb-12">
          <p className="font-mono text-mono text-xs tracking-widest mb-4">// CURRENT MISSION</p>
          <Link href={`/expeditions/${activeExpedition.slug}`}>
            <div className="border border-border bg-surface p-6 hover:border-mono transition-colors cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <span className="font-mono text-xs text-gray-500">FILE NO. {activeExpedition.file_no}</span>
                <span className={`stamp stamp-${activeExpedition.status.toLowerCase()}`}>{activeExpedition.status}</span>
              </div>
              <h2 className="font-grotesk text-2xl font-bold text-textMain mb-2 group-hover:text-mono transition-colors">
                {activeExpedition.title}
              </h2>
              <div className="font-mono text-xs text-gray-500 space-y-1">
                <div>LOCATION — {activeExpedition.location}</div>
                <div>DATE — {activeExpedition.date}</div>
                <div>CLEARANCE — LEVEL {activeExpedition.clearance}</div>
              </div>
            </div>
          </Link>
        </section>
      )}

      <hr className="divider" />

      {/* Nav Grid */}
      <section>
        <p className="font-mono text-mono text-xs tracking-widest mb-6">// ARCHIVE SECTIONS</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SectionCard
            href="/expeditions"
            label="MISSION FILES"
            sub="Field expeditions & hike logs"
            count={expeditions.length}
          />
          <SectionCard
            href="/lab"
            label="FIELD RATIONS LAB"
            sub="Cooking trials & experiments"
            count={labs.length}
          />
          <SectionCard
            href="/gallery"
            label="PHOTO EVIDENCE"
            sub="Surveillance archive, tagged by mission"
            count={null}
          />
          <SectionCard
            href="/field-notes"
            label="FIELD NOTES"
            sub="Personal log. Unstructured."
            count={null}
          />
        </div>
      </section>
    </main>
  );
}

function StatBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-border bg-surface p-4">
      <AnimatedCounter value={value} />
      <div className="font-mono text-xs text-gray-500 mt-1 tracking-wider">{label}</div>
    </div>
  );
}

function SectionCard({ href, label, sub, count }: { href: string; label: string; sub: string; count: number | null }) {
  return (
    <Link href={href}>
      <div className="border border-border bg-surface p-5 hover:border-mono transition-colors cursor-pointer group h-full">
        <div className="flex items-start justify-between">
          <h3 className="font-grotesk font-bold text-textMain group-hover:text-mono transition-colors">{label}</h3>
          {count !== null && (
            <span className="font-mono text-xs text-gray-600">{String(count).padStart(3, '0')}</span>
          )}
        </div>
        <p className="font-mono text-xs text-gray-500 mt-2">{sub}</p>
      </div>
    </Link>
  );
}
