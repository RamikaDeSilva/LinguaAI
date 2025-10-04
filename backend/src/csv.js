function toCSV(rows, headers) {
  const esc = (s) => `"${(s ?? "").replace(/"/g, '""')}"`;
  const head = headers.map(esc).join(",");
  const body = rows.map(r => headers.map(h => esc(String(r[h] ?? ""))).join(",")).join("\n");
  return head + "\n" + body + "\n";
}

module.exports = { toCSV };
