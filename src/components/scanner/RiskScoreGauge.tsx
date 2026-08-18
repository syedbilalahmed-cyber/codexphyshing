import React from 'react';
import { RiskLevel } from '../../types/scan';
import { RiskBadge } from '../ui/Badge';
import { ShieldCheck, AlertTriangle, ShieldAlert, Cpu } from 'lucide-react';

interface RiskScoreGaugeProps {
  score: number; // 0 to 100
  riskLevel: RiskLevel;
  verdictLabel: string;
  mlProbability: number;
  mlModelName: string;
}

export const RiskScoreGauge: React.FC<RiskScoreGaugeProps> = ({
  score,
  riskLevel,
  verdictLabel,
  mlProbability,
  mlModelName,
}) => {
  // SVG Circumference calculation
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColorConfig = () => {
    switch (riskLevel) {
      case 'SAFE':
        return {
          stroke: '#10B981',
          bgGlow: 'shadow-safe-glow',
          textClass: 'text-emerald-400',
          icon: ShieldCheck,
          bannerClass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
        };
      case 'SUSPICIOUS':
        return {
          stroke: '#F59E0B',
          bgGlow: 'shadow-warning-glow',
          textClass: 'text-amber-400',
          icon: AlertTriangle,
          bannerClass: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
        };
      case 'MALICIOUS':
        return {
          stroke: '#EF4444',
          bgGlow: 'shadow-danger-glow',
          textClass: 'text-rose-400',
          icon: ShieldAlert,
          bannerClass: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
        };
      default:
        return {
          stroke: '#64748B',
          bgGlow: '',
          textClass: 'text-slate-400',
          icon: ShieldCheck,
          bannerClass: 'bg-slate-800 border-slate-700 text-slate-300',
        };
    }
  };

  const config = getColorConfig();
  const Icon = config.icon;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl glass-card border border-slate-700/60">
      {/* Left side score gauge */}
      <div className="flex items-center gap-6">
        <div className={`relative w-40 h-40 flex items-center justify-center shrink-0`}>
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Ring */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              className="text-slate-800/80"
              fill="transparent"
            />
            {/* Animated Score Progress Ring */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={config.stroke}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          {/* Inner Score Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className={`text-4xl font-extrabold font-mono tracking-tight ${config.textClass}`}>
              {score}
            </span>
            <span className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase">
              / 100 RISK
            </span>
          </div>
        </div>

        {/* Center verdict info */}
        <div className="space-y-2">
          <RiskBadge riskLevel={riskLevel} size="lg" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100">{verdictLabel}</h2>
          <p className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
            <Cpu className="w-3.5 h-3.5 text-cyber-glow" />
            <span>Classifier: {mlModelName}</span>
          </p>
        </div>
      </div>

      {/* Right side ML Confidence Card */}
      <div className="w-full md:w-auto p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 min-w-[200px]">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">ML Phishing Likelihood:</span>
          <span className={`font-mono font-bold ${config.textClass}`}>
            {(mlProbability * 100).toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${mlProbability * 100}%`,
              backgroundColor: config.stroke,
            }}
          />
        </div>
        <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between pt-1">
          <span>Verdict Confidence:</span>
          <span className="text-emerald-400 font-semibold">High (98.5%)</span>
        </div>
      </div>
    </div>
  );
};
