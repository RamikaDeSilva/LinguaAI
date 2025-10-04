import { useState } from "react";
import { generateCSV } from "./api";

const INTERESTS = ["fitness", "guitar", "business", "travel", "programming", "food"];

export default function App() {
  const [sel, setSel] = useState([]);
  const [size, setSize] = useState(750);
  const [level, setLevel] = useState("A2");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const toggle = (k) => setSel(p => p.includes(k) ? p.filter(x => x !== k) : [...p, k]);

  const onGen = async () => {
    setLoading(true);
    try {
      const blob = await generateCSV({ interests: sel, deckSize: size, level });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; 
      a.download = "spanish_deck.csv"; 
      a.click();
      URL.revokeObjectURL(url);
      
      // Show preview of first few rows
      const text = await blob.text();
      const lines = text.split('\n').slice(0, 6); // First 6 lines (header + 5 rows)
      setPreview(lines.join('\n'));
    } catch (error) {
      alert('Error generating deck: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Interest-Tuned Spanish Anki Deck</h1>
          <p className="text-gray-600 mb-8">Pick your interests and generate a personalized 750-card CSV for Anki.</p>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Select Your Interests</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {INTERESTS.map(k => (
                <label key={k} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={sel.includes(k)} 
                    onChange={() => toggle(k)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="capitalize font-medium">{k}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-6 items-center mb-8">
            <div className="flex items-center gap-2">
              <label className="font-medium">Deck size:</label>
              <input 
                type="number" 
                min={100} 
                max={2000} 
                step={50} 
                value={size} 
                onChange={e => setSize(parseInt(e.target.value || "750"))} 
                className="border border-gray-300 rounded px-3 py-2 w-24"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="font-medium">Level:</label>
              <select 
                value={level} 
                onChange={e => setLevel(e.target.value)} 
                className="border border-gray-300 rounded px-3 py-2"
              >
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
              </select>
            </div>
          </div>

          <button 
            onClick={onGen} 
            disabled={loading} 
            className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Generating..." : "Generate CSV"}
          </button>

          {preview && (
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold mb-2">Preview (first 5 rows):</h3>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">{preview}</pre>
            </div>
          )}

          <div className="mt-8 text-sm text-gray-600">
            <h3 className="font-semibold mb-2">How it works:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Select your interests to get personalized vocabulary</li>
              <li>Core frequency words are mixed with interest-specific terms</li>
              <li>Example sentences are tailored to your selected domains</li>
              <li>Download a CSV file ready to import into Anki</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
