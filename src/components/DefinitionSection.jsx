const PART_COLORS = {
  noun: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  verb: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  adjective: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  adverb: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  default: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
};

function badge(pos) {
  return PART_COLORS[pos] ?? PART_COLORS.default;
}

export default function DefinitionSection({ definitions }) {
  const grouped = definitions.reduce((acc, d) => {
    (acc[d.partOfSpeech] ??= []).push(d);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([pos, defs]) => (
        <div key={pos}>
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-3 ${badge(pos)}`}>
            {pos}
          </span>
          <ol className="space-y-3">
            {defs.map((d, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <p className="text-slate-800 dark:text-slate-100">{d.definition}</p>
                  {d.example && (
                    <p className="mt-1 text-sm italic text-slate-500 dark:text-slate-400">"{d.example}"</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
