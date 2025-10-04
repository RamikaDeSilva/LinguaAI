function mergeDeck(opts) {
  const { core, interest, deckSize, interestMix } = opts;
  const coreFiltered = core.filter(w => !opts.level || !w.level || w.level <= opts.level);
  const interestSet = dedupe(interest);
  const targetInterest = Math.round(deckSize * interestMix);
  const targetCore = deckSize - targetInterest;

  const corePick = takeUnique(coreFiltered, targetCore);
  const interestPick = takeUnique(interestSet.map(w => ({...w, tags:[...(w.tags||[]), "interest"]})), targetInterest);

  // simple interleave: 2 core, 1 interest
  const out = [];
  const c = corePick[Symbol.iterator]();
  const i = interestPick[Symbol.iterator]();
  while (out.length < deckSize && (true)) {
    pushN(out, c, 2);
    pushN(out, i, 1);
    if (out.length >= deckSize) break;
    if (peekDone(c) && peekDone(i)) break;
  }
  return dedupe(out).slice(0, deckSize);
}

function takeUnique(arr, n) {
  const seen = new Set();
  const out = [];
  for (const x of arr) if (!seen.has(x.lemma) && out.length < n) { 
    seen.add(x.lemma); 
    out.push(x); 
  }
  return out;
}

function dedupe(arr) {
  const seen = new Set();
  return arr.filter(x => !seen.has(x.lemma) && (seen.add(x.lemma), true));
}

function pushN(out, it, n) {
  for (let k = 0; k < n; k++) { 
    const {value, done} = it.next(); 
    if (!done && value) out.push(value); 
  }
}

function peekDone(it) { 
  const p = it.next(); 
  if (!p.done) { 
    (it).return?.(); 
  } 
  return p.done; 
}

module.exports = { mergeDeck };
