export default async function handler(req, res) {
  const { word } = req.query;
  if (!word) return res.status(400).json({ error: 'Missing word' });

  const upstream = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.trim())}`
  );

  const body = await upstream.json();
  res.status(upstream.status).json(body);
}
