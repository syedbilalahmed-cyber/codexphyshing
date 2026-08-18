import React, { useState } from 'react';
import { AISecurityExplanation as IAISecurityExplanation } from '../../types/scan';
import { Sparkles, CheckCircle, AlertOctagon, BookOpen, ChevronRight, ShieldCheck } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface AISecurityExplanationProps {
  explanation: IAISecurityExplanation;
  onAskFollowUp?: (prompt: string) => void;
}

export const AISecurityExplanation: React.FC<AISecurityExplanationProps> = ({
  explanation,
  onAskFollowUp,
}) => {
  const [showTechnical, setShowTechnical] = useState(false);

  return (
    <div className="space-y-6">
      {/* AI Header Banner */}
      <Card variant="cyber" className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 text-white shadow-cyber-glow">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span>RAG Security Analysis & Grounded AI Insights</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                  {explanation.confidenceScore}% Confidence
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">Grounded on verified OWASP & MITRE ATT&CK knowledge base</p>
            </div>
          </div>
        </div>

        {/* Executive Summary Box */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-slate-200 leading-relaxed font-sans mb-6">
          {explanation.summary}
        </div>

        {/* Why This Matters Section */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
            <AlertOctagon className="w-4 h-4" />
            <span>Why This Threat Matters</span>
          </h4>
          <ul className="space-y-2">
            {explanation.whyItMatters.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Actions */}
        <div className="space-y-3 mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <h4 className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Recommended Security Action Plan</span>
          </h4>
          <ul className="space-y-2">
            {explanation.recommendedActions.map((action, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-emerald-200 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technical Reasoning Toggle */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => setShowTechnical(!showTechnical)}
            className="text-xs font-mono text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
          >
            <span>{showTechnical ? 'Hide Technical Fusion Logic' : 'View Technical Fusion Logic'}</span>
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showTechnical ? 'rotate-90' : ''}`} />
          </button>

          {onAskFollowUp && (
            <Button
              size="sm"
              variant="outline"
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-cyber-glow" />}
              onClick={() => onAskFollowUp("Explain this risk score in detail")}
            >
              Ask AI Assistant
            </Button>
          )}
        </div>

        {showTechnical && (
          <div className="mt-4 p-3 rounded-lg bg-slate-950 text-xs font-mono text-slate-300 border border-slate-800">
            {explanation.technicalReasoning}
          </div>
        )}
      </Card>

      {/* RAG Knowledge Citations */}
      {explanation.ragCitations.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Retrieved Security Citations ({explanation.ragCitations.length})</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {explanation.ragCitations.map((cit, idx) => (
              <Card key={idx} className="p-4 bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 font-mono">{cit.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {cit.source}
                  </span>
                </div>
                <p className="text-xs text-slate-400 italic font-mono leading-relaxed">"{cit.snippet}"</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
