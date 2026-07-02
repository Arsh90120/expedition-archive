import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="font-mono text-xs text-mono tracking-widest hover:text-textMain transition-colors">
          EXPEDITION ARCHIVE
        </Link>
        <div className="flex gap-6">
          {[
            { href: '/expeditions', label: 'MISSIONS' },
            { href: '/lab', label: 'LAB' },
            { href: '/gallery', label: 'EVIDENCE' },
            { href: '/field-notes', label: 'FIELD NOTES' },
            { href: '/loadout', label: 'LOADOUT' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-mono text-xs text-gray-500 hover:text-textMain transition-colors tracking-wider"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
