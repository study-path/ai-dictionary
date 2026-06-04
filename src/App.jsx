import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WordResult from './components/WordResult';
import { fetchWord, extractData } from './services/dictionaryApi';

const SUGGESTIONS = ['ephemeral', 'serendipity', 'eloquent', 'resilience', 'ambiguous'];

function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm hover:shadow-md transition-all hover:scale-110 active:scale-95"
    >
      {dark ? (
        /* Sun */
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        /* Moon */
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

export default function App() {
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  async function handleSearch(word) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const entries = await fetchWord(word);
      const data = extractData(entries);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <ThemeToggle dark={dark} onToggle={() => setDark((d) => !d)} />

      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-4">
            <span>✦</span> AI-Powered Dictionary
          </div>
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
            Understand any word,<br />
            <span className="text-emerald-600 dark:text-emerald-400">deeply.</span>
          </h1>
        </div>

        {/* Search */}
        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Suggestions */}
        {!result && !loading && !error && (
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <span className="text-sm text-slate-400">Try:</span>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSearch(s)}
                className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-8 p-5 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-center">
            <p className="font-semibold">Word not found</p>
            <p className="text-sm mt-1 text-red-500 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Results */}
        {result && <WordResult data={result} />}
      </div>
    </div>
  );
}
