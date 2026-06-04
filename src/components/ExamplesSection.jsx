const TEMPLATES = {
  noun: [
    (w) => `She had never seen such a remarkable ${w} in her life.`,
    (w) => `The ${w} caught everyone's attention the moment it appeared.`,
    (w) => `He spent years studying the ${w} before he truly understood it.`,
  ],
  verb: [
    (w) => `Every morning, she would ${w} before starting her day.`,
    (w) => `They learned how to ${w} properly after months of practice.`,
    (w) => `It surprised everyone to see him ${w} so effortlessly.`,
  ],
  adjective: [
    (w) =>
      `The scenery was absolutely ${w}, unlike anything we had seen before.`,
    (w) => `She gave the most ${w} performance of the evening.`,
    (w) => `Everything about that moment felt deeply ${w}.`,
  ],
  adverb: [
    (w) => `He spoke ${w}, making sure everyone understood.`,
    (w) => `She moved ${w} through the crowded room.`,
    (w) => `The team worked ${w} to finish before the deadline.`,
  ],
  default: [
    (w) => `The concept of ${w} is fascinating to explore.`,
    (w) => `Understanding ${w} opened up a whole new perspective.`,
    (w) => `People often overlook how important ${w} really is.`,
  ],
};

function generateExamples(word, definitions) {
  // Pick the most common part of speech
  const pos = definitions[0]?.partOfSpeech ?? "default";
  const templates = TEMPLATES[pos] ?? TEMPLATES.default;
  return templates.map((fn) => ({
    sentence: fn(word),
    partOfSpeech: pos,
    generated: true,
  }));
}

export default function ExamplesSection({ definitions, synonyms, word }) {
  const apiExamples = definitions.filter((d) => d.example);
  const examples =
    apiExamples.length > 0
      ? apiExamples.map((d) => ({
          sentence: d.example,
          partOfSpeech: d.partOfSpeech,
          generated: false,
        }))
      : generateExamples(word, definitions);

  return (
    <div className="space-y-6">
      <div>
        {examples[0]?.generated && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 text-center">
            No dictionary examples found — showing generated sentences
          </p>
        )}
        <ul className="space-y-3">
          {examples.map((e, i) => (
            <li
              key={i}
              className="flex gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40"
            >
              <span className="text-emerald-400 mt-0.5 shrink-0">❝</span>
              <div>
                <p className="italic text-slate-700 dark:text-slate-200">
                  {e.sentence}
                </p>
                <span className="mt-1 inline-block px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300">
                  {e.partOfSpeech}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {synonyms?.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
            Synonyms
          </h3>
          <div className="flex flex-wrap gap-2">
            {synonyms.map((s) => (
              <span
                key={s}
                className="px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm hover:border-emerald-400 dark:hover:border-emerald-500 transition cursor-default"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
