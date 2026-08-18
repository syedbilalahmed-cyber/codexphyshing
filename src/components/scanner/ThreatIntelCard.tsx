import React from 'react';
import { VirusTotalData } from '../../types/scan';
import { Database, ShieldAlert, ShieldCheck, ExternalLink, Calendar, Tag } from 'lucide-react';
import { Card } from '../ui/Card';

interface ThreatIntelCardProps {
  virusTotal: VirusTotalData;
}

export const ThreatIntelCard: React.FC<ThreatIntelCardProps> = ({ virusTotal }) => {
  return (
    <div className="space-y-6">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Detections Counter */}
        <Card className="p-4 bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 font-mono">Detections / Total</span>
            <Database className="w-4 h-4 text-cyber-glow" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-extrabold font-mono ${
              virusTotal.maliciousCount > 0 ? 'text-rose-400' : 'text-emerald-400'
            }`}>
              {virusTotal.maliciousCount}
            </span>
            <span className="text-sm font-mono text-slate-500">/ {virusTotal.totalEngines} Engines</span>
          </div>
        </Card>

        {/* Reputation Score */}
        <Card className="p-4 bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 font-mono">VT Reputation Index</span>
            <Tag className="w-4 h-4 text-indigo-400" />
          </div>
          <span className={`text-2xl font-extrabold font-mono ${
            virusTotal.reputation < 0 ? 'text-rose-400' : 'text-emerald-400'
          }`}>
            {virusTotal.reputation}
          </span>
        </Card>

        {/* Analysis Timestamp */}
        <Card className="p-4 bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 font-mono">Last Analysis</span>
            <Calendar className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-sm font-bold font-mono text-slate-200">
            {new Date(virusTotal.analysisDate).toLocaleDateString()}
          </span>
        </Card>
      </div>

      {/* Threat Categories */}
      <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-2">
        <h4 className="text-xs font-bold text-slate-400 font-mono uppercase">Threat Categories & Tags</h4>
        <div className="flex flex-wrap gap-2">
          {virusTotal.categories.map((cat, idx) => (
            <span
              key={idx}
              className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-700/80"
            >
              #{cat}
            </span>
          ))}
        </div>
      </div>

      {/* Vendor Votes Table */}
      <div className="glass-card border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <h4 className="text-sm font-bold text-slate-100 font-mono uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-400" />
            <span>VirusTotal v3 Vendor Engine Breakdown</span>
          </h4>
          <a
            href={virusTotal.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 hover:underline font-mono"
          >
            <span>View Raw VT Report</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 font-mono uppercase border-b border-slate-800">
              <tr>
                <th className="px-6 py-3">Security Vendor</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Analysis Result</th>
                <th className="px-6 py-3">Last Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {virusTotal.vendorVotes.map((vote, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-6 py-3.5 font-bold text-slate-200">{vote.vendor}</td>
                  <td className="px-6 py-3.5 text-slate-400">{vote.category}</td>
                  <td className="px-6 py-3.5">
                    {vote.result === 'malicious' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                        <ShieldAlert className="w-3 h-3" /> MALICIOUS
                      </span>
                    ) : vote.result === 'suspicious' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                        SUSPICIOUS
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <ShieldCheck className="w-3 h-3" /> HARMLESS
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3.5 text-slate-500">{vote.updateDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
