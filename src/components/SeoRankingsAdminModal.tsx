import React, { useState, useEffect } from 'react';
import {
  X,
  TrendingUp,
  MapPin,
  Search,
  Plus,
  Filter,
  Download,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Calendar,
  Layers,
} from 'lucide-react';
import { RankingTrackRecord } from '../types';
import {
  TRACKED_LOCATIONS,
  TRACKED_KEYWORDS,
  INITIAL_RANKING_DATA,
} from '../data/seoRankingData';

interface SeoRankingsAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SeoRankingsAdminModal: React.FC<SeoRankingsAdminModalProps> = ({
  isOpen,
  onClose,
}) => {
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

  if (!isOpen) return null;

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
      notes: newNotes || 'Routine check',
      actionsTaken: newActionsTaken || 'Updated meta and local citations',
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0D6E6E] text-white flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#08383B] font-['Outfit']">
                Mangalore Local SEO Ranking Tracker
              </h2>
              <p className="text-xs text-slate-500">
                Tracking 22 Localities & 21 High-Intent Keywords for Google Maps & Organic SERP
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#E6F7F6] border border-[#2DD4BF]/30">
              <div className="text-[11px] font-bold text-[#0D6E6E] uppercase tracking-wider">
                Google Maps #1 Positions
              </div>
              <div className="text-3xl font-black text-[#08383B] mt-1 font-['Outfit']">
                {mapsNumber1Count}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Derebail, Surathkal, Mobile</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Top 3 Map Pack Placements
              </div>
              <div className="text-3xl font-black text-[#08383B] mt-1 font-['Outfit']">
                {top3Count}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Out of {records.length} tracked records</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Tracked Localities
              </div>
              <div className="text-3xl font-black text-[#08383B] mt-1 font-['Outfit']">
                {TRACKED_LOCATIONS.length}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Mangalore Municipal Zones</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Keywords Tracked
              </div>
              <div className="text-3xl font-black text-[#08383B] mt-1 font-['Outfit']">
                {TRACKED_KEYWORDS.length}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">High commercial intent</div>
            </div>
          </div>

          {/* Action Row & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter:</span>
              </div>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700"
              >
                <option value="all">All Localities ({TRACKED_LOCATIONS.length})</option>
                {TRACKED_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>

              <select
                value={filterKeyword}
                onChange={(e) => setFilterKeyword(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700"
              >
                <option value="all">All Keywords ({TRACKED_KEYWORDS.length})</option>
                {TRACKED_KEYWORDS.map((kw) => (
                  <option key={kw} value={kw}>
                    {kw}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 rounded-xl bg-[#0D6E6E] hover:bg-[#08383B] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddForm ? 'Cancel Form' : 'Log New Monthly Ranking'}</span>
            </button>
          </div>

          {/* New Record Form */}
          {showAddForm && (
            <form
              onSubmit={handleAddRecord}
              className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-200"
            >
              <h3 className="text-sm font-bold text-[#08383B]">Log Rank Check Record</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Target Locality</label>
                  <select
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    {TRACKED_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Target Keyword</label>
                  <select
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    {TRACKED_KEYWORDS.map((kw) => (
                      <option key={kw} value={kw}>
                        {kw}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Google Maps Pos (1-20)</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={newMapsPos}
                    onChange={(e) => setNewMapsPos(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Google SERP Pos (1-50)</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={newSearchPos}
                    onChange={(e) => setNewSearchPos(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Competitor #1</label>
                  <input
                    type="text"
                    value={newCompetitor1}
                    onChange={(e) => setNewCompetitor1(e.target.value)}
                    placeholder="e.g. Pet Point Kuntikana"
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Competitor #2</label>
                  <input
                    type="text"
                    value={newCompetitor2}
                    onChange={(e) => setNewCompetitor2(e.target.value)}
                    placeholder="e.g. Mangalore Paws Bejai"
                    className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-slate-600 font-bold mb-1">Observation Notes</label>
                <input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Reviews increased to 4.9 stars; Google Maps ranking climbed to #1"
                  className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#0D6E6E] text-white font-bold text-xs cursor-pointer hover:bg-[#08383B] transition-colors"
              >
                Save Ranking Entry
              </button>
            </form>
          )}

          {/* Table */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Locality</th>
                  <th className="p-3.5">Target Keyword</th>
                  <th className="p-3.5 text-center">Google Maps</th>
                  <th className="p-3.5 text-center">Google SERP</th>
                  <th className="p-3.5">Top Competitors</th>
                  <th className="p-3.5">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                      {rec.dateChecked}
                    </td>
                    <td className="p-3.5 font-bold text-[#08383B]">{rec.location}</td>
                    <td className="p-3.5 font-mono text-[11px] text-[#0D6E6E]">{rec.keyword}</td>
                    <td className="p-3.5 text-center">
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
                    <td className="p-3.5 text-center">
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
                    <td className="p-3.5 text-slate-500 text-[11px]">
                      {[rec.competitor1, rec.competitor2].filter((c) => c && c !== 'None').join(', ') ||
                        'None'}
                    </td>
                    <td className="p-3.5 text-slate-600 text-[11px] max-w-xs truncate">{rec.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-right shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-all cursor-pointer"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
