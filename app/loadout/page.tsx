import NavBar from '@/components/NavBar';

const gear = {
  S: [
    { item: 'Osprey Atmos 65 AG', notes: 'Never leave home without it. Anti-gravity suspension is real.' },
    { item: 'Merino Wool Base Layer', notes: 'Regulates temp, doesn\'t stink. Essential.' },
    { item: 'Black Diamond Spot Headlamp', notes: 'Pre-dawn starts. No compromise.' },
  ],
  A: [
    { item: 'Salomon X Ultra 4 GTX', notes: 'Ankle support. Waterproof. Solid.' },
    { item: 'Jetboil Flash', notes: 'Fast boil. Good for trial cooking at elevation.' },
  ],
  B: [
    { item: 'Trekking Poles', notes: 'Underrated until your knees disagree.' },
  ],
  C: [
    { item: 'Cotton Socks (early days)', notes: 'Never again. Blisters within 2 miles.' },
  ],
};

export default function LoadoutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <NavBar />
      <div className="mt-16 mb-10">
        <p className="font-mono text-mono text-xs tracking-widest mb-3">// EQUIPMENT MANIFEST</p>
        <h1 className="font-grotesk text-4xl font-bold">LOADOUT</h1>
        <p className="font-mono text-sm text-gray-500 mt-2">Field-tested gear. Ranked by necessity.</p>
      </div>

      {(Object.entries(gear) as [string, { item: string; notes: string }[]][]).map(([tier, items]) => (
        <div key={tier} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xl font-bold text-mono">{tier} TIER</span>
            <div className="flex-1 border-t border-border" />
          </div>
          <div className="space-y-3">
            {items.map(({ item, notes }) => (
              <div key={item} className="border border-border bg-surface p-4">
                <div className="font-grotesk font-bold text-textMain">{item}</div>
                <div className="font-mono text-xs text-gray-500 mt-1">{notes}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
