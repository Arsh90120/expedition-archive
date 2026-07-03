'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

type Photo = { id: string; url: string; caption: string; slug: string; created_at: string };

export default function EvidenceGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [secret, setSecret] = useState('');
  const [caption, setCaption] = useState('');
  const [slug, setSlug] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotos() {
    setLoading(true);
    const { data } = await supabase
      .from('expedition_photos')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setPhotos(data);
    setLoading(false);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');

    const form = new FormData();
    form.append('file', file);
    form.append('slug', slug || 'untagged');
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
    // reset file input
    e.target.value = '';
  }

  const slugs = ['ALL', ...Array.from(new Set(photos.map(p => p.slug)))];
  const filtered = filter === 'ALL' ? photos : photos.filter(p => p.slug === filter);

  return (
    <div>
      {/* Upload Panel Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3 flex-wrap">
          {slugs.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`font-mono text-xs px-3 py-1 border transition-colors ${
                filter === s
                  ? 'border-mono text-mono'
                  : 'border-border text-gray-500 hover:text-mono hover:border-mono'
              }`}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowPanel(!showPanel)}
          className="font-mono text-xs text-gray-600 hover:text-mono transition-colors border border-border px-3 py-1 ml-4"
        >
          {showPanel ? '— CLOSE' : '+ UPLOAD'}
        </button>
      </div>

      {/* Upload Panel */}
      {showPanel && (
        <div className="bg-surface border border-border p-5 mb-8 font-mono text-sm space-y-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">ACCESS KEY</label>
            <input
              type="password"
              value={secret}
              onChange={e => setSecret(e.target.value)}
              className="w-full bg-black border border-border px-3 py-2 text-mono text-sm outline-none focus:border-mono"
              placeholder="••••••••"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">MISSION TAG</label>
              <input
                type="text"
                value={slug}
                onChange={e => setSlug(e.target.value)}
                className="w-full bg-black border border-border px-3 py-2 text-mono text-sm outline-none focus:border-mono"
                placeholder="white-mountain-ascent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">CAPTION</label>
              <input
                type="text"
                value={caption}
                onChange={e => setCaption(e.target.value)}
                className="w-full bg-black border border-border px-3 py-2 text-mono text-sm outline-none focus:border-mono"
                placeholder="Summit approach, 0600hrs"
              />
            </div>
          </div>
          <label className="block cursor-pointer">
            <div className={`border border-dashed px-4 py-4 text-center transition-colors ${
              !secret
                ? 'border-border text-gray-700 cursor-not-allowed'
                : 'border-border text-gray-500 hover:text-mono hover:border-mono cursor-pointer'
            }`}>
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
          {error && <p className="text-red-500 text-xs">{error}</p>}
          {!secret && <p className="text-gray-700 text-xs">Enter access key to enable upload.</p>}
        </div>
      )}

      {/* Gallery Grid */}
      {loading ? (
        <p className="font-mono text-xs text-gray-600">LOADING ARCHIVE...</p>
      ) : filtered.length === 0 ? (
        <p className="font-mono text-xs text-gray-600">NO PHOTOGRAPHS ON FILE.</p>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
          {filtered.map(photo => (
            <div key={photo.id} className="border border-border mb-4 break-inside-avoid">
              <img
                src={photo.url}
                alt={photo.caption || 'Field photograph'}
                className="w-full object-cover"
                loading="lazy"
              />
              <div className="px-3 py-2 flex items-center justify-between">
                {photo.caption && (
                  <span className="font-mono text-xs text-gray-500">{photo.caption}</span>
                )}
                <span className="font-mono text-xs text-gray-700 ml-auto">{photo.slug.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
