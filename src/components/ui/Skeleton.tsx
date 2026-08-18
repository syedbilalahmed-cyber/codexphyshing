import React from 'react';
import { clsx } from 'clsx';

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-lg bg-slate-800/80 border border-slate-700/30',
        className
      )}
    />
  );
};
