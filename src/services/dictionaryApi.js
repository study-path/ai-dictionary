export async function fetchWord(word) {
  const res = await fetch(`/api/dictionary?word=${encodeURIComponent(word.trim())}`);
  if (res.status === 404) throw new Error('Word not found');
  if (!res.ok) throw new Error('Dictionary API error');
  return res.json();
}

export function extractData(entries) {
  const entry = entries[0];
  const phonetics = entry.phonetics ?? [];

  const audioUrl =
    phonetics.find((p) => p.audio && p.audio.includes('-us'))?.audio ||
    phonetics.find((p) => p.audio)?.audio ||
    null;

  const phonetic =
    entry.phonetic ||
    phonetics.find((p) => p.text)?.text ||
    '';

  const definitions = entry.meanings.flatMap((m) =>
    m.definitions.map((d) => ({
      partOfSpeech: m.partOfSpeech,
      definition: d.definition,
      example: d.example ?? null,
    }))
  );

  const synonyms = [
    ...new Set(entry.meanings.flatMap((m) => m.synonyms ?? [])),
  ].slice(0, 8);

  return { word: entry.word, phonetic, audioUrl, definitions, synonyms };
}
