import NavBar from '@/components/NavBar';

const notes = [
  {
    date: '2026.06.14',
    entry: 'First real ascent above treeline. Wind hit different at 4,000ft — not the romantic kind. The kind that makes you question the gear list.',
  },
  {
    date: '2026.05.28',
    entry: 'Ramen trial #4 ended in a biohazard situation. Spice tolerance: not where I thought it was. Rating: 3/10, would not serve to anyone.',
  },
];

export default function FieldNotesPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <NavBar />
      <div className="mt-16 mb-10">
        <p className="font-mono text-mono text-xs tracking-widest mb-3">// PERSONAL LOG</p>
        <h1 className="font-grotesk text-4xl font-bold">FIELD NOTES</h1>
        <p className="font-mono text-sm text-gray-500 mt-2">Unstructured. Unedited. Real.</p>
      </div>

      <div className="space-y-10">
        {notes.map((note, i) => (
          <div key={i}>
            <div className="font-mono text-xs text-gray-600 mb-3">{note.date}</div>
            <p className="font-sans text-textMain leading-relaxed text-base">{note.entry}</p>
            <hr className="divider mt-8" />
          </div>
        ))}
      </div>
    </main>
  );
}
