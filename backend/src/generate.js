const { toCSV } = require("./csv");
const { mergeDeck } = require("./ranker");
const { buildExample } = require("./templater");
const core = require("../data/core_frequency.json");
const templates = require("../data/templates.json");
const fitness = require("../data/interests/fitness.json");
const guitar = require("../data/interests/guitar.json");
const business = require("../data/interests/business.json");
const travel = require("../data/interests/travel.json");
const programming = require("../data/interests/programming.json");
const food = require("../data/interests/food.json");

const bank = { fitness, guitar, business, travel, programming, food };

async function generateCSV(opts) {
  const { interests = [], deckSize = 750, level = "A2" } = opts;
  const interestLists = interests.flatMap(i => bank[i] || []);
  const merged = mergeDeck({ 
    core, 
    interest: interestLists, 
    deckSize, 
    interestMix: 0.35, 
    level 
  });

  const rows = merged.map((w) => {
    const example = buildExample({ 
      word: w.lemma, 
      pos: w.pos, 
      tags: w.tags, 
      templates 
    });
    return {
      Front: w.lemma,
      Back: w.gloss,
      POS: w.pos,
      Example: example,
      Tags: ["core", ...(w.tags || [])].join(" ")
    };
  });

  return toCSV(rows, ["Front", "Back", "POS", "Example", "Tags"]);
}

module.exports = { generateCSV };
