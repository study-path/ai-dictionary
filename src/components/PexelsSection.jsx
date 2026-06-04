import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export default function PexelsSection({ word }) {
  const [photos, setPhotos] = useState([]);
  const [loaded, setLoaded] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | done | error | no-key

  useEffect(() => {
    if (!word) return;
    if (!API_KEY) { setStatus('no-key'); return; }

    setStatus('loading');
    setPhotos([]);
    setLoaded({});

    fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(word)}&per_page=4&orientation=square`, {
      headers: { Authorization: API_KEY },
    })
      .then((r) => {
        if (!r.ok) throw new Error(`Pexels API error ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setPhotos(data.photos ?? []);
        setStatus('done');
      })
      .catch(() => setStatus('error'));
  }, [word]);

  if (status === 'no-key') {
    return (
      <div className="text-center py-12 text-slate-400 space-y-2">
        <p className="font-medium text-slate-500 dark:text-slate-400">Pexels API key not set</p>
        <p className="text-sm">
          Create a free key at{' '}
          <a href="https://www.pexels.com/api/" target="_blank" rel="noreferrer" className="text-violet-500 hover:underline">
            pexels.com/api
          </a>
          , then add it to <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs">.env</code>:
        </p>
        <pre className="inline-block text-left text-xs bg-slate-100 dark:bg-slate-800 rounded-lg px-4 py-2 text-slate-600 dark:text-slate-300">
          VITE_PEXELS_API_KEY=your_key_here
        </pre>
        <p className="text-xs text-slate-400">Restart the dev server after saving.</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="text-center py-12 text-red-400">
        Failed to load photos from Pexels. Check your API key.
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl bg-slate-100 dark:bg-slate-800 aspect-square flex items-center justify-center">
            <svg className="animate-spin h-8 w-8 text-slate-300 dark:text-slate-600" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        ))}
      </div>
    );
  }

  if (status === 'done' && photos.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        No Pexels photos found for <span className="italic">"{word}"</span>.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 aspect-square"
          >
            {!loaded[i] && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="animate-spin h-8 w-8 text-slate-300 dark:text-slate-600" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              </div>
            )}
            <img
              src={photo.src.large}
              alt={photo.alt || word}
              onLoad={() => setLoaded((p) => ({ ...p, [i]: true }))}
              className={`w-full h-full object-cover transition-opacity duration-500 ${loaded[i] ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
