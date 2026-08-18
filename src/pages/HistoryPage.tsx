import React, { useState } from 'react';
import { MOCK_HISTORY_ITEMS } from '../mock/scanData';
import { ScanResult, RiskLevel } from '../types/scan';
import { RiskBadge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Search, Filter, Download, Trash2, ExternalLink, Calendar, Shield } from 'lucide-react';

interface HistoryPageProps {
  onInspect: (indicator: string) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onInspect }) => {
  const [search, setSearch] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('ALL');
  const [selectedResult, setSelectedResult] = useState<ScanResult | null>(null);

  const filteredItems = MOCK_HISTORY_ITEMS.filter((item) => {
    const matchesSearch = item.indicator.toLowerCase().includes(search.toLowerCase()) ||
                          item.verdictLabel.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterRisk === 'ALL' || item.riskLevel === filterRisk;
    return matchesSearch && matchesFilter;
  });

  const exportCSV = () => {
    const headers = "ID,Indicator,RiskLevel,RiskScore,Verdict,Timestamp\n";
    const rows = filteredItems.map(i => `${i.id},"${i.indicator}",${i.riskLevel},${i.riskScore},"${i.verdictLabel}",${i.scanTimestamp}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `phishguard_scan_history_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl glass-card border border-slate-800">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search scan ledger history..."
            className="w-full bg-slate-900 text-xs font-mono text-slate-100 placeholder-slate-500 pl-9 pr-3 py-2 rounded-lg border border-slate-700/80 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          {['ALL', 'MALICIOUS', 'SUSPICIOUS', 'SAFE'].map((risk) => (
            <button
              key={risk}
              onClick={() => setFilterRisk(risk)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-colors whitespace-nowrap ${
                filterRisk === risk
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {risk}
            </button>
          ))}

          <Button size="sm" variant="outline" leftIcon={<Download className="w-3.5 h-3.5" />} onClick={exportCSV}>
            Export CSV
          </Button>
        </div>
      </div>

      {/* History Table Card */}
      <Card className="glass-card border border-slate-800 rounded-2xl overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 font-mono uppercase border-b border-slate-800">
              <tr>
                <th className="px-6 py-3">Indicator Target</th>
                <th className="px-6 py-3">Risk Verdict</th>
                <th className="px-6 py-3">Risk Score</th>
                <th className="px-6 py-3">ML Prob</th>
                <th className="px-6 py-3">VT Detections</th>
                <th className="px-6 py-3">Scan Time</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-200 truncate max-w-xs">{item.indicator}</td>
                  <td className="px-6 py-4">
                    <RiskBadge riskLevel={item.riskLevel} size="sm" />
                  </td>
                  <td className="px-6 py-4 font-bold font-mono">
                    <span className={item.riskScore > 50 ? 'text-rose-400' : 'text-emerald-400'}>
                      {item.riskScore} / 100
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{(item.mlPhishingProbability * 100).toFixed(1)}%</td>
                  <td className="px-6 py-4 text-slate-400">{item.virusTotal.maliciousCount}/{item.virusTotal.totalEngines}</td>
                  <td className="px-6 py-4 text-slate-500">{new Date(item.scanTimestamp).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedResult(item)}
                    >
                      Quick View
                    </Button>
                    <Button
                      size="sm"
                      variant="glow"
                      onClick={() => onInspect(item.indicator)}
                    >
                      Full Scan
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick View Modal */}
      {selectedResult && (
        <Modal
          isOpen={!!selectedResult}
          onClose={() => setSelectedResult(null)}
          title={`Scan Quick View — ${selectedResult.verdictLabel}`}
          maxWidth="xl"
        >
          <div className="space-y-4 font-mono text-xs">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-200 break-all font-semibold">
              {selectedResult.indicator}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 block mb-1">Risk Score</span>
                <span className="text-xl font-bold text-rose-400">{selectedResult.riskScore} / 100</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 block mb-1">Risk Verdict</span>
                <RiskBadge riskLevel={selectedResult.riskLevel} />
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 font-sans text-xs">
              <span className="font-mono text-blue-400 font-bold block mb-1">RAG AI Summary:</span>
              {selectedResult.aiExplanation.summary}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" onClick={() => setSelectedResult(null)}>
                Close
              </Button>
              <Button variant="glow" onClick={() => { setSelectedResult(null); onInspect(selectedResult.indicator); }}>
                Open Full Analysis
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
