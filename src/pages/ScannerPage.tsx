import React, { useState, useEffect } from 'react';
import { ScanResult, ScanProgressState, IndicatorType } from '../types/scan';
import { MockScanService } from '../services/mockScanService';
import { URLScannerInput } from '../components/scanner/URLScannerInput';
import { ScanProgress } from '../components/scanner/ScanProgress';
import { RiskScoreGauge } from '../components/scanner/RiskScoreGauge';
import { DetectionSignals } from '../components/scanner/DetectionSignals';
import { ThreatIntelCard } from '../components/scanner/ThreatIntelCard';
import { AISecurityExplanation } from '../components/scanner/AISecurityExplanation';
import { Tabs } from '../components/ui/Tabs';
import { Button } from '../components/ui/Button';
import { MOCK_MALICIOUS_URL_RESULT } from '../mock/scanData';
import { Shield, RefreshCw, Copy, Check, Share2, Download } from 'lucide-react';

interface ScannerPageProps {
  initialUrl?: string;
  onNavigateToAssistant?: (prompt: string) => void;
}

export const ScannerPage: React.FC<ScannerPageProps> = ({
  initialUrl,
  onNavigateToAssistant,
}) => {
  const [indicator, setIndicator] = useState(initialUrl || '');
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [progressState, setProgressState] = useState<ScanProgressState>({
    stage: 'idle',
    progressPercent: 0,
    message: '',
  });
  const [activeTab, setActiveTab] = useState<string>('signals');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialUrl && !scanResult) {
      handleExecuteScan(initialUrl, 'URL');
    }
  }, [initialUrl]);

  const handleExecuteScan = async (target: string, type: IndicatorType = 'URL') => {
    setIndicator(target);
    setIsScanning(true);
    setScanResult(null);

    try {
      const result = await MockScanService.scanIndicator(target, (pState) => {
        setProgressState(pState);
      });
      setScanResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleCopy = () => {
    if (!scanResult) return;
    navigator.clipboard.writeText(scanResult.indicator);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'signals', label: 'Detection Signals', count: scanResult?.signals.length || 0 },
    { id: 'virustotal', label: 'VirusTotal Threat Intel', count: scanResult?.virusTotal.maliciousCount },
    { id: 'ai-explanation', label: 'RAG AI Security Analysis' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Scanner Input Widget */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyber-glow" />
            <span>PhishGuard Security Scanner</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">Supports URLs, Domains, IPs & Hashes</span>
        </div>
        <URLScannerInput
          initialValue={indicator}
          isLoading={isScanning}
          onScan={(val, type) => handleExecuteScan(val, type)}
        />
      </div>

      {/* Progress View during Scanning */}
      {isScanning && (
        <ScanProgress progressState={progressState} indicator={indicator} />
      )}

      {/* Complete Result View */}
      {!isScanning && scanResult && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Target Header Bar */}
          <div className="p-4 rounded-xl glass-card border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {scanResult.indicatorType}
              </span>
              <span className="text-sm font-mono text-slate-200 font-semibold truncate max-w-md sm:max-w-xl">
                {scanResult.indicator}
              </span>
              <button
                onClick={handleCopy}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                title="Copy Target Indicator"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                onClick={() => handleExecuteScan(scanResult.indicator, scanResult.indicatorType)}
              >
                Rescan
              </Button>
              <Button
                size="sm"
                variant="secondary"
                leftIcon={<Download className="w-3.5 h-3.5" />}
                onClick={() => alert("Report downloaded successfully!")}
              >
                Export PDF
              </Button>
            </div>
          </div>

          {/* Risk Score Radial Gauge & Summary */}
          <RiskScoreGauge
            score={scanResult.riskScore}
            riskLevel={scanResult.riskLevel}
            verdictLabel={scanResult.verdictLabel}
            mlProbability={scanResult.mlPhishingProbability}
            mlModelName={scanResult.mlModelName}
          />

          {/* Tab Navigation */}
          <Tabs tabs={tabs} activeTab={activeTab} onChange={(id) => setActiveTab(id)} />

          {/* Tab Content Views */}
          {activeTab === 'signals' && <DetectionSignals signals={scanResult.signals} />}
          {activeTab === 'virustotal' && <ThreatIntelCard virusTotal={scanResult.virusTotal} />}
          {activeTab === 'ai-explanation' && (
            <AISecurityExplanation
              explanation={scanResult.aiExplanation}
              onAskFollowUp={onNavigateToAssistant}
            />
          )}
        </div>
      )}

      {/* Initial Empty State before scanning */}
      {!isScanning && !scanResult && (
        <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
          <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-pulse" />
          <h3 className="text-lg font-bold text-slate-100 mb-1">Ready for Security Analysis</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
            Enter a target URL or indicator above to run URLBERT feature extraction, VirusTotal v3 checks, and RAG AI analysis.
          </p>
          <Button
            variant="glow"
            onClick={() => handleExecuteScan(MOCK_MALICIOUS_URL_RESULT.indicator, 'URL')}
          >
            Run Demo Scan (PayPal Phishing Target)
          </Button>
        </div>
      )}
    </div>
  );
};
