export async function generateCSV(payload) {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to generate deck: ${error}`);
  }
  return await res.blob();
}
