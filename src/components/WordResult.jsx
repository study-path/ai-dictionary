import { useState } from 'react';
import PronunciationButton from './PronunciationButton';
import DefinitionSection from './DefinitionSection';
import ExamplesSection from './ExamplesSection';
import PexelsSection from './PexelsSection';

const TABS = ['Definition', 'Examples', 'Images'];

export default function WordResult({ data }) {
  const [activeTab, setActiveTab] = useState('Definition');
  const { word, phonetic, audioUrl, definitions, synonyms } = data;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      {/* Word header */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white capitalize">{word}</h1>
        {phonetic && (
          <span className="text-lg text-slate-400 dark:text-slate-500 font-mono">{phonetic}</span>
        )}
        <PronunciationButton audioUrl={audioUrl} />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === tab
                ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
        {activeTab === 'Definition' && <DefinitionSection definitions={definitions} />}
        {activeTab === 'Examples' && <ExamplesSection definitions={definitions} synonyms={synonyms} word={word} />}
        {activeTab === 'Images' && <PexelsSection word={word} />}
      </div>
    </div>
  );
}
