function buildExample({ word, pos, tags, templates }) {
  const domain = (tags || []).find(t => ["fitness", "guitar", "business", "travel", "programming", "food"].includes(t));
  const bank = (domain && templates[domain]?.[pos]) || templates.generic?.[pos] || templates.generic?.any || [];
  const t = bank[Math.floor(Math.random() * bank.length)] || "{WORD}.";
  return t.replaceAll("{WORD}", word);
}

module.exports = { buildExample };
