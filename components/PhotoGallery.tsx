'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

type Photo = { id: string; url: string; caption: string };

export default function PhotoGallery({ slug }: { slug: string }) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [secret, setSecret] = useState('');
  const [caption, setCaption] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPhotos();
  }, [slug]);

  async function fetchPhotos() {
    const { data } = await supabase
      .from('expedition_photos')
      .select('*')
      .eq('slug', slug)
      .order('created_at', { ascending: true });
    if (data) setPhotos(data);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');

    const form = new FormData();
    form.append('file', file);
    form.append('slug', slug);
    form.append('caption', caption);

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'x-upload-secret': secret },
      body: form,
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Upload failed');
    } else {
      await fetchPhotos();
      setCaption('');
    }
    setUploading(false);
  }

  return (
    <div className="mt-12 border-t border-border pt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-mono text-xs text-gray-500 tracking-widest">FIELD PHOTOGRAPHS</h2>
        <button
          onClick={() => setShowPanel(!showPanel)}
          className="font-mono text-xs text-gray-600 hover:text-mono transition-colors border border-border px-3 py-1"
        >
          {showPanel ? '— CLOSE' : '+ UPLOAD'}
        </button>
      </div>

      {showPanel && (
        <div className="bg-surface border border-border p-4 mb-6 font-mono text-sm">
          <div className="mb-3">
            <label className="block text-xs text-gray-500 mb-1">ACCESS KEY</label>
            <input
              type="password"
              value={secret}
              onChange={e => setSecret(e.target.value)}
              className="w-full bg-black border border-border px-3 py-2 text-mono text-sm outline-none focus:border-mono"
              placeholder="••••••••"
            />
          </div>
          <div className="mb-3">
            <label className="block text-xs text-gray-500 mb-1">CAPTION (OPTIONAL)</label>
            <input
              type="text"
              value={caption}
              onChange={e => setCaption(e.target.value)}
              className="w-full bg-black border border-border px-3 py-2 text-mono text-sm outline-none focus:border-mono"
              placeholder="Summit approach, 0600hrs"
            />
          </div>
          <label className="block cursor-pointer">
            <div className="border border-dashed border-border px-4 py-3 text-center text-gray-500 hover:text-mono hover:border-mono transition-colors">
              {uploading ? 'UPLOADING...' : 'SELECT PHOTOGRAPH'}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading || !secret}
            />
          </label>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          {!secret && <p className="text-gray-600 text-xs mt-2">Enter access key to enable upload.</p>}
        </div>
      )}

      {photos.length === 0 ? (
        <p className="font-mono text-xs text-gray-600">NO PHOTOGRAPHS ON FILE.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {photos.map(photo => (
            <div key={photo.id} className="border border-border">
              <img
                src={photo.url}
                alt={photo.caption || 'Field photograph'}
                className="w-full object-cover"
                loading="lazy"
              />
              {photo.caption && (
                <div className="px-3 py-2 font-mono text-xs text-gray-500">{photo.caption}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
