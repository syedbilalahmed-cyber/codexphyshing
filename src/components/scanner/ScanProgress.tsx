import React from 'react';
import { ScanProgressState } from '../../types/scan';
import { Shield, CheckCircle2, Loader2, Sparkles, Database, Cpu, Search } from 'lucide-react';
import { Card } from '../ui/Card';

interface ScanProgressProps {
  progressState: ScanProgressState;
  indicator: string;
}

export const ScanProgress: React.FC<ScanProgressProps> = ({ progressState, indicator }) => {
  const stages = [
    { id: 'analyzing_structure', label: '1. Lexical & Structure Analysis', icon: Search },
    { id: 'extracting_features', label: '2. Domain WHOIS & SSL Extraction', icon: Cpu },
    { id: 'checking_virustotal', label: '3. VirusTotal v3 Intelligence Query', icon: Database },
    { id: 'evaluating_ml_fusion', label: '4. ML Transformer Risk Fusion', icon: Shield },
    { id: 'generating_rag_explanation', label: '5. RAG AI Security Synthesis', icon: Sparkles },
  ];

  const getStageIndex = (stageId: string) => {
    switch (progressState.stage) {
      case 'analyzing_structure':
        return 0;
      case 'extracting_features':
        return 1;
      case 'checking_virustotal':
        return 2;
      case 'evaluating_ml_fusion':
        return 3;
      case 'generating_rag_explanation':
        return 4;
      case 'completed':
        return 5;
      default:
        return 0;
    }
  };

  const currentIndex = getStageIndex(progressState.stage);

  return (
    <Card variant="cyber" className="w-full max-w-3xl mx-auto p-8 my-8 text-center">
      {/* Radar Scanning Visual */}
      <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-blue-500/30 animate-ping" />
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/50 animate-radar-spin" />
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-cyan-500/30 border border-blue-400/40 flex items-center justify-center shadow-cyber-glow">
          <Shield className="w-10 h-10 text-cyber-glow animate-pulse" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-100 mb-1">Scanning Security Indicator</h3>
      <p className="text-xs font-mono text-blue-400 max-w-md mx-auto truncate mb-6">{indicator}</p>

      {/* Main Progress Bar */}
      <div className="w-full bg-slate-900 rounded-full h-3 mb-6 overflow-hidden border border-slate-800 p-0.5">
        <div
          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-300 shadow-cyber-glow"
          style={{ width: `${progressState.progressPercent}%` }}
        />
      </div>

      {/* Progress Message */}
      <p className="text-sm font-medium text-slate-300 flex items-center justify-center gap-2 mb-8">
        <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
        <span>{progressState.message}</span>
      </p>

      {/* Stage Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-left">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          return (
            <div
              key={stage.id}
              className={`p-3 rounded-xl border text-xs transition-all ${
                isDone
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : isCurrent
                  ? 'bg-blue-500/15 border-blue-500/50 text-white shadow-cyber-glow'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Icon className="w-4 h-4" />
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-700" />
                )}
              </div>
              <p className="font-semibold text-[11px] leading-tight">{stage.label}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
