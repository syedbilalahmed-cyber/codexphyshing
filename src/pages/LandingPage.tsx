import React from 'react';
import { ShieldAlert, Cpu, Database, Sparkles, CheckCircle2, ArrowRight, Lock, Zap, FileText } from 'lucide-react';
import { URLScannerInput } from '../components/scanner/URLScannerInput';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface LandingPageProps {
  onScan: (indicator: string) => void;
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onScan, onNavigate }) => {
  const stats = [
    { label: 'Threat Accuracy Rate', value: '99.4%', sub: 'Time-Aware Evaluation' },
    { label: 'VirusTotal Engines', value: '72+', sub: 'Integrated v3 REST API' },
    { label: 'Scanned Indicators', value: '1.4M+', sub: 'URLs, Domains & Files' },
    { label: 'RAG Knowledge Base', value: '50K+', sub: 'MITRE & OWASP Citations' },
  ];

  const features = [
    {
      icon: Cpu,
      title: 'URLBERT & Transformer Classifier',
      description: 'Specialized pretrained URL encoder evaluating lexical structures, homograph attacks, and canonical feature representations.',
    },
    {
      icon: Database,
      title: 'VirusTotal API v3 Threat Intel',
      description: 'Real-time multi-vendor intelligence integration providing global domain reputation, vendor votes, and category tags.',
    },
    {
      icon: Sparkles,
      title: 'RAG Security AI Assistant',
      description: 'Grounded security explanations connecting detection signals with MITRE ATT&CK techniques and actionable recommendations.',
    },
    {
      icon: ShieldAlert,
      title: 'Multi-Signal Risk Fusion Engine',
      description: 'Combines ML probabilities, reputation metrics, and structural heuristics into a transparent, calibrated 0-100 risk score.',
    },
  ];

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-blue-500/30 text-xs font-mono text-blue-400 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-cyber-glow animate-pulse" />
          <span>Next-Generation Phishing & Threat Intelligence Platform</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-tight">
          Detect Phishing Threats <br />
          <span className="cyber-gradient-text">Before They Become a Problem.</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Analyze suspicious URLs, domains, IPs, and file hashes using fine-tuned URL Transformers, 
          VirusTotal v3 intelligence, and grounded RAG AI explanations.
        </p>

        {/* Interactive Focal Scanner Component */}
        <div className="pt-4 max-w-3xl mx-auto">
          <URLScannerInput onScan={(url) => onScan(url)} />
        </div>
      </section>

      {/* Live Threat Ticker Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <Card key={idx} className="p-5 text-center bg-slate-900/60 border border-slate-800">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono cyber-gradient-text block mb-1">
              {s.value}
            </span>
            <span className="text-xs font-bold text-slate-200 block">{s.label}</span>
            <span className="text-[11px] font-mono text-slate-500 block mt-0.5">{s.sub}</span>
          </Card>
        ))}
      </section>

      {/* Platform Features Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Enterprise Cybersecurity Engine</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Built to provide transparent evidence, grounded AI, and accurate threat identification.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <Card key={idx} variant="hover" className="p-6 space-y-3 border border-slate-800">
                <div className="p-3 w-fit rounded-xl bg-blue-600/20 text-cyber-glow border border-blue-500/30">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">{f.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{f.description}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Interactive Detection Flow Diagram */}
      <section className="p-8 rounded-2xl glass-card border border-slate-800 space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="text-xl font-bold text-slate-100">PhishGuard Risk Fusion Architecture</h3>
          <p className="text-xs text-slate-400 mt-1">How inputs move from normalization to multi-signal risk scoring.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-blue-400 font-bold block">1. Input Target</span>
            <span className="text-slate-400 text-[11px]">URL / Domain / IP</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-indigo-400 font-bold block">2. VirusTotal v3</span>
            <span className="text-slate-400 text-[11px]">72 Vendor Votes</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-cyan-400 font-bold block">3. URLBERT ML</span>
            <span className="text-slate-400 text-[11px]">Transformer Score</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-purple-400 font-bold block">4. Risk Fusion</span>
            <span className="text-slate-400 text-[11px]">0-100 Calibrated Score</span>
          </div>
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-1">
            <span className="font-bold block">5. RAG AI Plan</span>
            <span className="text-[11px]">Grounded Action</span>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="text-center p-8 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900 border border-blue-500/30 space-y-4">
        <h3 className="text-2xl font-bold text-slate-100">Ready to Analyze Suspicious Security Indicators?</h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">Launch the live URL scanner to inspect threats with real-time VirusTotal & AI feedback.</p>
        <div className="flex justify-center gap-4">
          <Button variant="glow" size="lg" onClick={() => onNavigate('scanner')} rightIcon={<ArrowRight className="w-4 h-4" />}>
            Open URL Scanner
          </Button>
          <Button variant="outline" size="lg" onClick={() => onNavigate('assistant')}>
            Ask AI Assistant
          </Button>
        </div>
      </section>
    </div>
  );
};
