import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Database, Search, ShieldAlert, Globe, Server, Cpu, ExternalLink } from 'lucide-react';
import { MOCK_MALICIOUS_URL_RESULT } from '../mock/scanData';

export const ThreatIntelPage: React.FC = () => {
  const [indicatorInput, setIndicatorInput] = useState('');

  const globalFeeds = [
    { title: 'PayPal Brand Impersonation Campaign', count: '4,120 URLs', date: 'Active Today', risk: 'HIGH' },
    { title: 'Web3 Wallet Drainer dApps (.top TLD)', count: '1,890 Domains', date: 'Active Today', risk: 'HIGH' },
    { title: 'Microsoft 365 OAuth Credential Harvesters', count: '3,450 URLs', date: 'Active Yesterday', risk: 'CRITICAL' },
    { title: 'Bank of America Smishing Lookalikes', count: '920 IPs', date: 'Active 2 days ago', risk: 'MEDIUM' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <Card variant="cyber" className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-cyber-glow">
            <Database className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">VirusTotal v3 & Global Threat Intelligence Hub</h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Query reputation indexes, domain WHOIS records, file hashes, and active global phishing campaigns.
            </p>
          </div>
        </div>
      </Card>

      {/* Query Bar */}
      <Card className="p-4 glass-card border border-slate-800">
        <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={indicatorInput}
              onChange={(e) => setIndicatorInput(e.target.value)}
              placeholder="Search VirusTotal v3 database by URL, Domain, IP address, or SHA-256 Hash..."
              className="w-full bg-slate-950 text-xs sm:text-sm font-mono text-slate-100 placeholder-slate-500 pl-10 pr-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>
          <Button variant="glow" onClick={() => setIndicatorInput(MOCK_MALICIOUS_URL_RESULT.indicator)}>
            Query Intel
          </Button>
        </form>
      </Card>

      {/* Threat Feeds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 glass-card border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-100 font-mono uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Active Phishing Campaign Intelligence</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 font-bold">
              Live Feed
            </span>
          </div>

          <div className="space-y-3">
            {globalFeeds.map((feed, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{feed.title}</h4>
                  <span className="text-[11px] font-mono text-slate-400">{feed.count} • {feed.date}</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {feed.risk}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Engine Status Card */}
        <Card className="p-6 glass-card border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-100 font-mono uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>VirusTotal API Engine Health</span>
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">Operational</span>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
              <span className="text-slate-400">REST API Version</span>
              <span className="text-slate-200 font-bold">v3.0 (Official REST)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Total Security Vendors</span>
              <span className="text-emerald-400 font-bold">72 Active Partner Engines</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Rate Limits & Quotas</span>
              <span className="text-blue-400 font-bold">Server-side Protected Key</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
              <span className="text-slate-400">Supported Target Types</span>
              <span className="text-slate-200 font-bold">URL, Domain, IP, File Hash</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
