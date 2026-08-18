import React from 'react';
import { RiskLevel } from '../../types/scan';
import { ShieldCheck, AlertTriangle, ShieldAlert, HelpCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  variant?: 'safe' | 'suspicious' | 'malicious' | 'neutral' | 'outline' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  icon?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  children,
  icon = true,
  className,
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full border transition-colors';

  const variants = {
    safe: 'bg-risk-safe-light text-emerald-400 border-risk-safe-border shadow-sm shadow-emerald-500/10',
    suspicious: 'bg-risk-suspicious-light text-amber-400 border-risk-suspicious-border shadow-sm shadow-amber-500/10',
    malicious: 'bg-risk-malicious-light text-rose-400 border-risk-malicious-border shadow-sm shadow-rose-500/10',
    neutral: 'bg-risk-neutral-light text-slate-300 border-risk-neutral-border',
    info: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    outline: 'bg-transparent text-slate-300 border-slate-700',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-4 py-1.5 gap-2 font-bold tracking-wide',
  };

  const renderIcon = () => {
    if (!icon) return null;
    switch (variant) {
      case 'safe':
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      case 'suspicious':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      case 'malicious':
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
      default:
        return <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />;
    }
  };

  return (
    <span className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}>
      {renderIcon()}
      <span>{children}</span>
    </span>
  );
};

export const RiskBadge: React.FC<{ riskLevel: RiskLevel; className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  riskLevel,
  className,
  size = 'md',
}) => {
  const getVariant = () => {
    switch (riskLevel) {
      case 'SAFE':
        return 'safe';
      case 'SUSPICIOUS':
        return 'suspicious';
      case 'MALICIOUS':
        return 'malicious';
      default:
        return 'neutral';
    }
  };

  const getLabel = () => {
    switch (riskLevel) {
      case 'SAFE':
        return 'VERIFIED SAFE';
      case 'SUSPICIOUS':
        return 'SUSPICIOUS';
      case 'MALICIOUS':
        return 'HIGH-RISK MALICIOUS';
      default:
        return 'UNKNOWN RISK';
    }
  };

  return (
    <Badge variant={getVariant()} size={size} className={className}>
      {getLabel()}
    </Badge>
  );
};
