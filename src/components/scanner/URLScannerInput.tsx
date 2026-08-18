import React, { useState } from 'react';
import { Search, ShieldAlert, ArrowRight, Clipboard, X, Check, Globe, Server, Hash, FileCode } from 'lucide-react';
import { IndicatorType } from '../../types/scan';
import { Button } from '../ui/Button';

interface URLScannerInputProps {
  onScan: (indicator: string, type: IndicatorType) => void;
  isLoading?: boolean;
  initialValue?: string;
  className?: string;
}

export const URLScannerInput: React.FC<URLScannerInputProps> = ({
  onScan,
  isLoading = false,
  initialValue = '',
  className = '',
}) => {
  const [input, setInput] = useState(initialValue);
  const [selectedType, setSelectedType] = useState<IndicatorType>('URL');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onScan(input.trim(), selectedType);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInput(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const sampleTargets = [
    { label: 'PayPal Phishing Link', url: 'http://paypaI-security-verify-login.account-update.xyz/auth/login.php', type: 'URL' as IndicatorType },
    { label: 'Crypto Drainer Scam', url: 'http://free-crypto-airdrop.top/claim-tokens', type: 'URL' as IndicatorType },
    { label: 'Official GitHub Safe', url: 'https://github.com/security/advisories', type: 'URL' as IndicatorType },
  ];

  const types = [
    { id: 'URL', label: 'URL', icon: Globe },
    { id: 'DOMAIN', label: 'Domain', icon: Server },
    { id: 'IP', label: 'IP Address', icon: Globe },
    { id: 'HASH', label: 'File Hash', icon: Hash },
    { id: 'FILE', label: 'File Upload', icon: FileCode },
  ];

  return (
    <div className={`w-full ${className}`}>
      {/* Indicator Type Tabs */}
      <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar pb-1">
        {types.map((t) => {
          const Icon = t.icon;
          const isSelected = selectedType === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedType(t.id as IndicatorType)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                isSelected
                  ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40 shadow-sm shadow-blue-500/20'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Input Bar Form */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex items-center glass-card border border-slate-700/80 group-hover:border-blue-500/50 rounded-2xl p-2 transition-all duration-300 shadow-2xl group-focus-within:border-blue-500 group-focus-within:ring-2 group-focus-within:ring-blue-500/30">
          <div className="pl-3 pr-2 text-slate-400">
            <Search className="w-5 h-5 group-focus-within:text-cyber-glow transition-colors" />
          </div>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Enter target ${selectedType.toLowerCase()} (e.g. https://example.com/login)...`}
            className="w-full bg-transparent text-sm sm:text-base font-mono text-slate-100 placeholder-slate-500 focus:outline-none px-2 py-2.5"
            disabled={isLoading}
          />

          <div className="flex items-center gap-2 pr-1">
            {input ? (
              <button
                type="button"
                onClick={() => setInput('')}
                className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePaste}
                className="hidden sm:flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors"
                title="Paste from clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Clipboard className="w-3.5 h-3.5" />}
                <span>{copied ? 'Pasted!' : 'Paste'}</span>
              </button>
            )}

            <Button
              type="submit"
              variant="glow"
              size="md"
              isLoading={isLoading}
              disabled={!input.trim()}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              <span className="font-bold">Analyze Target</span>
            </Button>
          </div>
        </div>
      </form>

      {/* Quick Test Samples */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-medium">Quick Test Targets:</span>
        {sampleTargets.map((sample, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setInput(sample.url);
              setSelectedType(sample.type);
            }}
            className="px-2.5 py-1 rounded-md bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-all font-mono text-[11px]"
          >
            {sample.label}
          </button>
        ))}
      </div>
    </div>
  );
};
