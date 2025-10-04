const express = require("express");
const cors = require("cors");
const { generateCSV } = require("./generate");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const { interests = [], deckSize = 750, level = "A2" } = req.body || {};
    const csv = await generateCSV({ interests, deckSize, level });
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="spanish_deck.csv"`);
    res.status(200).send(csv);
  } catch (e) {
    res.status(500).json({ error: e?.message || "Failed to generate deck" });
  }
});

app.get("/health", (_, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API on :${PORT}`));
