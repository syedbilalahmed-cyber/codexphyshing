import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'hover' | 'bordered' | 'cyber';
  glow?: 'none' | 'blue' | 'safe' | 'danger' | 'warning';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  glow = 'none',
  className,
  ...props
}) => {
  const baseStyles = 'rounded-xl p-5 relative overflow-hidden transition-all duration-300';
  
  const variants = {
    default: 'glass-card',
    hover: 'glass-card glass-card-hover cursor-pointer',
    bordered: 'bg-surface border border-surface-border',
    cyber: 'glass-card border border-cyber-blue/30 shadow-cyber-glow',
  };

  const glowStyles = {
    none: '',
    blue: 'border-cyber-blue/40 shadow-cyber-glow',
    safe: 'border-emerald-500/40 shadow-safe-glow',
    danger: 'border-rose-500/40 shadow-danger-glow',
    warning: 'border-amber-500/40 shadow-warning-glow',
  };

  return (
    <div
      className={twMerge(clsx(baseStyles, variants[variant], glowStyles[glow], className))}
      {...props}
    >
      {children}
    </div>
  );
};
