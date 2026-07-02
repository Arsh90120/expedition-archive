import { ExpeditionMeta } from '@/lib/expeditions';

export default function MissionFile({ meta, content }: { meta: ExpeditionMeta; content: React.ReactNode }) {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      {/* Dossier Header */}
      <div className="border border-border bg-surface p-6 mb-8">
        <div className="flex items-start justify-between mb-6">
          <span className="font-mono text-xs text-gray-500">FILE NO. {meta.file_no}</span>
          <span className={`stamp stamp-${meta.status.toLowerCase()}`}>{meta.status}</span>
        </div>
        <h1 className="font-grotesk text-3xl font-bold text-textMain mb-6">{meta.title}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <MetaField label="SUBJECT" value={meta.title} />
          <MetaField label="LOCATION" value={meta.location} />
          <MetaField label="DATE OPENED" value={meta.date} />
          <MetaField label="STATUS" value={meta.status} />
          <MetaField label="CLEARANCE" value={`LEVEL ${meta.clearance}`} />
          <MetaField label="DURATION" value={meta.duration} />
        </div>
      </div>

      {/* Content */}
      <div className="prose-expedition">
        {content}
      </div>
    </article>
  );
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-xs text-gray-600 mb-1">{label}</div>
      <div className="font-mono text-sm text-mono">{value}</div>
    </div>
  );
}
