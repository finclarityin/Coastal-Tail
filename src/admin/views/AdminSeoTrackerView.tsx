import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  MapPin,
  Search,
  Plus,
  Filter,
  Download,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  ExternalLink,
} from 'lucide-react';
import { RankingTrackRecord } from '../../types';
import {
  TRACKED_LOCATIONS,
  TRACKED_KEYWORDS,
  INITIAL_RANKING_DATA,
} from '../../data/seoRankingData';

export const AdminSeoTrackerView: React.FC = () => {
  const STORAGE_KEY = 'coastal_tails_seo_rankings_v1';

  const [records, setRecords] = useState<RankingTrackRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_RANKING_DATA;
    } catch {
      return INITIAL_RANKING_DATA;
    }
  });

  const [filterLocation, setFilterLocation] = useState<string>('all');
  const [filterKeyword, setFilterKeyword] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Form state
  const [newLocation, setNewLocation] = useState(TRACKED_LOCATIONS[0]);
  const [newKeyword, setNewKeyword] = useState(TRACKED_KEYWORDS[0]);
  const [newMapsPos, setNewMapsPos] = useState<number>(1);
  const [newSearchPos, setNewSearchPos] = useState<number>(1);
  const [newCompetitor1, setNewCompetitor1] = useState('');
  const [newCompetitor2, setNewCompetitor2] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newActionsTaken, setNewActionsTaken] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.error('Failed to save ranking records', e);
    }
  }, [records]);

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const monthStr = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    const newRecord: RankingTrackRecord = {
      id: `rank-${Date.now()}`,
      location: newLocation,
      keyword: newKeyword,
      dateChecked: today,
      googleMapsPosition: Number(newMapsPos),
      googleSearchPosition: Number(newSearchPos),
      competitor1: newCompetitor1 || 'None',
      competitor2: newCompetitor2 || 'None',
      notes: newNotes || 'Routine verification',
      actionsTaken: newActionsTaken || 'Updated location landing page & local schema',
      month: monthStr,
    };

    setRecords((prev) => [newRecord, ...prev]);
    setShowAddForm(false);
    setNewNotes('');
    setNewActionsTaken('');
  };

  const filteredRecords = records.filter((rec) => {
    const matchesLoc = filterLocation === 'all' || rec.location === filterLocation;
    const matchesKw = filterKeyword === 'all' || rec.keyword === filterKeyword;
    return matchesLoc && matchesKw;
  });

  const top3Count = records.filter((r) => r.googleMapsPosition <= 3).length;
  const mapsNumber1Count = records.filter((r) => r.googleMapsPosition === 1).length;

  const exportCSV = () => {
    const headers = [
      'Date',
      'Location',
      'Keyword',
      'Google Maps Pos',
      'Google SERP Pos',
      'Competitor 1',
      'Competitor 2',
      'Notes',
      'Actions Taken',
    ];
    const rows = records.map((r) => [
      r.dateChecked,
      `"${r.location}"`,
      `"${r.keyword}"`,
      r.googleMapsPosition,
      r.googleSearchPosition,
      `"${r.competitor1 || ''}"`,
      `"${r.competitor2 || ''}"`,
      `"${r.notes || ''}"`,
      `"${r.actionsTaken || ''}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Mangalore_SEO_Rankings_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F7F6] text-[#0D6E6E] text-xs font-bold uppercase tracking-wider mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>LOCAL SEARCH ENGINE OPTIMIZATION</span>
          </div>
          <h1 className="text-2xl font-black text-[#08383B] font-['Outfit']">
            Mangalore Local SEO & Rank Tracking
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tracking rankings across 22 Mangalore localities & 21 high-commercial intent search queries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV Report</span>
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2.5 rounded-xl bg-[#0D6E6E] hover:bg-[#08383B] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddForm ? 'Cancel' : 'Log New Rank Check'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-[#0D6E6E] uppercase tracking-wider">
            Google Maps #1 Placements
          </div>
          <div className="text-3xl font-black text-[#08383B] font-['Outfit'] mt-1">
            {mapsNumber1Count}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Derebail, Surathkal & Mobile van</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Top 3 Map Pack Placements
          </div>
          <div className="text-3xl font-black text-[#08383B] font-['Outfit'] mt-1">
            {top3Count}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">High local customer conversion</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Monitored Localities
          </div>
          <div className="text-3xl font-black text-[#08383B] font-['Outfit'] mt-1">
            {TRACKED_LOCATIONS.length}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Full Mangaluru coverage</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Tracked Keywords
          </div>
          <div className="text-3xl font-black text-[#08383B] font-['Outfit'] mt-1">
            {TRACKED_KEYWORDS.length}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Targeted commercial search terms</div>
        </div>
      </div>

      {/* Add New Record Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddRecord}
          className="p-6 rounded-3xl bg-white border border-[#2DD4BF]/40 shadow-md space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#08383B]">Log New Monthly Rank Entry</h3>
            <span className="text-xs text-slate-400">Date: {new Date().toLocaleDateString()}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Target Locality</label>
              <select
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
              >
                {TRACKED_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Target Search Keyword</label>
              <select
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
              >
                {TRACKED_KEYWORDS.map((kw) => (
                  <option key={kw} value={kw}>
                    {kw}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Google Maps Pos (1-20)</label>
              <input
                type="number"
                min="1"
                max="50"
                value={newMapsPos}
                onChange={(e) => setNewMapsPos(Number(e.target.value))}
                className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Google SERP Pos (1-50)</label>
              <input
                type="number"
                min="1"
                max="50"
                value={newSearchPos}
                onChange={(e) => setNewSearchPos(Number(e.target.value))}
                className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Competitor #1 in Results</label>
              <input
                type="text"
                value={newCompetitor1}
                onChange={(e) => setNewCompetitor1(e.target.value)}
                placeholder="e.g. Pet Point Kuntikana"
                className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Competitor #2 in Results</label>
              <input
                type="text"
                value={newCompetitor2}
                onChange={(e) => setNewCompetitor2(e.target.value)}
                placeholder="e.g. Mangalore Paws Bejai"
                className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50"
              />
            </div>
          </div>

          <div className="text-xs space-y-1">
            <label className="block text-slate-700 font-bold">Notes & Actions Taken</label>
            <input
              type="text"
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              placeholder="e.g. Added 5 new customer reviews; Google Maps ranking climbed from #3 to #1"
              className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#0D6E6E] hover:bg-[#08383B] text-white font-bold text-xs cursor-pointer shadow-xs transition-colors"
          >
            Save Record to Local Database
          </button>
        </form>
      )}

      {/* Filter Row */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-slate-500">Filter Records:</span>
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="p-1.5 rounded-lg border border-slate-200 bg-slate-50"
          >
            <option value="all">All Localities</option>
            {TRACKED_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <select
            value={filterKeyword}
            onChange={(e) => setFilterKeyword(e.target.value)}
            className="p-1.5 rounded-lg border border-slate-200 bg-slate-50"
          >
            <option value="all">All Keywords</option>
            {TRACKED_KEYWORDS.map((kw) => (
              <option key={kw} value={kw}>
                {kw}
              </option>
            ))}
          </select>
        </div>

        <span className="text-slate-400">
          Showing {filteredRecords.length} of {records.length} records
        </span>
      </div>

      {/* Table */}
      <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Locality</th>
              <th className="p-4">Keyword</th>
              <th className="p-4 text-center">Google Maps</th>
              <th className="p-4 text-center">Google SERP</th>
              <th className="p-4">Competitors</th>
              <th className="p-4">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {filteredRecords.map((rec) => (
              <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="p-4 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                  {rec.dateChecked}
                </td>
                <td className="p-4 font-bold text-[#08383B]">{rec.location}</td>
                <td className="p-4 font-mono text-[11px] text-[#0D6E6E]">{rec.keyword}</td>
                <td className="p-4 text-center">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                      rec.googleMapsPosition === 1
                        ? 'bg-emerald-100 text-emerald-800'
                        : rec.googleMapsPosition <= 3
                        ? 'bg-teal-50 text-[#0D6E6E]'
                        : 'bg-amber-50 text-amber-800'
                    }`}
                  >
                    #{rec.googleMapsPosition}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                      rec.googleSearchPosition === 1
                        ? 'bg-emerald-100 text-emerald-800'
                        : rec.googleSearchPosition <= 3
                        ? 'bg-blue-50 text-blue-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    #{rec.googleSearchPosition}
                  </span>
                </td>
                <td className="p-4 text-slate-500 text-[11px]">
                  {[rec.competitor1, rec.competitor2].filter((c) => c && c !== 'None').join(', ') ||
                    'None'}
                </td>
                <td className="p-4 text-slate-600 text-[11px] max-w-xs">{rec.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
