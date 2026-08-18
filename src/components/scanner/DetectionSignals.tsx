import React, { useState } from 'react';
import { DetectionSignal } from '../../types/scan';
import { ShieldAlert, AlertTriangle, ShieldCheck, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../ui/Card';

interface DetectionSignalsProps {
  signals: DetectionSignal[];
}

export const DetectionSignals: React.FC<DetectionSignalsProps> = ({ signals }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getStatusConfig = (status: DetectionSignal['status']) => {
    switch (status) {
      case 'malicious':
        return {
          icon: ShieldAlert,
          bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
          badgeText: 'HIGH RISK',
        };
      case 'suspicious':
        return {
          icon: AlertTriangle,
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          badgeText: 'SUSPICIOUS',
        };
      case 'safe':
        return {
          icon: ShieldCheck,
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          badgeText: 'CLEAN',
        };
      default:
        return {
          icon: Info,
          bg: 'bg-slate-800 border-slate-700 text-slate-400',
          badgeText: 'INFO',
        };
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
          Security Signals & Heuristic Indicators ({signals.length})
        </h3>
        <span className="text-xs text-slate-400">Click signal for technical vector analysis</span>
      </div>

      {signals.map((sig) => {
        const config = getStatusConfig(sig.status);
        const Icon = config.icon;
        const isExpanded = expandedId === sig.id;

        return (
          <Card
            key={sig.id}
            variant="hover"
            className="p-4 transition-all border border-slate-800 hover:border-slate-700"
            onClick={() => toggleExpand(sig.id)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl border shrink-0 ${config.bg}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-700">
                      {sig.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100">{sig.title}</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{sig.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {sig.impactScore > 0 && (
                  <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded-md border border-rose-500/20">
                    +{sig.impactScore} Risk
                  </span>
                )}
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </div>

            {/* Expandable Technical Details */}
            {isExpanded && sig.technicalDetails && (
              <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs font-mono text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <span className="text-blue-400 font-bold block mb-1">Technical Vector Evidence:</span>
                <code>{sig.technicalDetails}</code>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};
