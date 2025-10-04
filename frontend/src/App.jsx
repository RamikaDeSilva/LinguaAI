import { useState } from "react";
import { generateCSV } from "./api";

const INTERESTS = ["fitness", "guitar", "business", "travel", "programming", "food"];

export default function App() {
  const [sel, setSel] = useState([]);
  const [size, setSize] = useState(750);
  const [level, setLevel] = useState("A2");
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const toggle = (k) => setSel(p => p.includes(k) ? p.filter(x => x !== k) : [...p, k]);

  const parseCSV = (csvText) => {
    const lines = csvText.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    const rows = lines.slice(1, 21).map(line => { // First 20 rows
      const values = line.split(',').map(v => v.replace(/"/g, '').trim());
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      return row;
    });
    return rows;
  };

  const getDomainFromTags = (tags) => {
    const domainTags = ['fitness', 'guitar', 'business', 'travel', 'programming', 'food'];
    const found = domainTags.find(tag => tags && tags.toLowerCase().includes(tag));
    return found ? found.charAt(0).toUpperCase() + found.slice(1) : 'Core';
  };

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
      
      // Parse CSV for preview
      const text = await blob.text();
      const parsedData = parseCSV(text);
      setPreviewData(parsedData);
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

          {previewData && (
            <div className="mt-8 bg-gray-900 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Preview (first 20 cards)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 font-medium">Spanish</th>
                      <th className="text-left py-3 px-4 font-medium">English</th>
                      <th className="text-left py-3 px-4 font-medium">POS</th>
                      <th className="text-left py-3 px-4 font-medium">Domain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, index) => (
                      <tr key={index} className="border-b border-gray-800 hover:bg-gray-800">
                        <td className="py-3 px-4 font-medium">{row.Front}</td>
                        <td className="py-3 px-4">{row.Back}</td>
                        <td className="py-3 px-4">
                          <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">
                            {row.POS}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="bg-gray-600 text-gray-200 px-2 py-1 rounded-full text-xs">
                            {getDomainFromTags(row.Tags)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
