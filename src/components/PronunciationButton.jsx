import { useState } from 'react';

export default function PronunciationButton({ audioUrl }) {
  const [playing, setPlaying] = useState(false);

  async function play() {
    if (!audioUrl || playing) return;
    const audio = new Audio(audioUrl);
    audio.onended = () => setPlaying(false);
    audio.onerror = () => setPlaying(false);
    try {
      setPlaying(true);
      await audio.play();
    } catch {
      setPlaying(false);
    }
  }

  if (!audioUrl) return null;

  return (
    <button
      onClick={play}
      disabled={playing}
      title="Play pronunciation"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800/60 transition-all text-sm font-medium disabled:opacity-60"
    >
      {playing ? (
        <>
          <svg className="h-4 w-4 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          </svg>
          Playing…
        </>
      ) : (
        <>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
          Listen
        </>
      )}
    </button>
  );
}
