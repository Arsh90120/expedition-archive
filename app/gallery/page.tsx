import NavBar from '@/components/NavBar';

export default function GalleryPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <NavBar />
      <div className="mt-16 mb-10">
        <p className="font-mono text-mono text-xs tracking-widest mb-3">// PHOTO EVIDENCE</p>
        <h1 className="font-grotesk text-4xl font-bold">SURVEILLANCE</h1>
        <p className="font-mono text-sm text-gray-500 mt-2">Visual archive. Tagged by mission ID.</p>
      </div>
      <div className="font-mono text-sm text-gray-600">
        <p>// Add photos here. Tag each with a MISSION-ID or LAB-ID for cross-reference.</p>
        <p className="mt-2">// Recommend: Cloudinary or a /public/photos/ folder structure.</p>
      </div>
    </main>
  );
}
