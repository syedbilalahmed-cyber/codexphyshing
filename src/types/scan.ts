export type RiskLevel = 'SAFE' | 'SUSPICIOUS' | 'MALICIOUS' | 'UNKNOWN';
export type IndicatorType = 'URL' | 'DOMAIN' | 'IP' | 'HASH' | 'FILE';

export interface DetectionSignal {
  id: string;
  category: 'Lexical' | 'Domain Reputation' | 'Brand Impersonation' | 'SSL & Security' | 'Behavioral';
  title: string;
  description: string;
  status: 'safe' | 'suspicious' | 'malicious' | 'neutral';
  impactScore: number; // 0 to 100 contribution to risk
  technicalDetails?: string;
}

export interface VirusTotalVendorVote {
  vendor: string;
  category: string;
  result: 'malicious' | 'suspicious' | 'harmless' | 'undetected';
  updateDate: string;
}

export interface VirusTotalData {
  reputation: number;
  maliciousCount: number;
  suspiciousCount: number;
  harmlessCount: number;
  undetectedCount: number;
  totalEngines: number;
  analysisDate: string;
  categories: string[];
  vendorVotes: VirusTotalVendorVote[];
  permalink: string;
}

export interface AISecurityExplanation {
  summary: string;
  whyItMatters: string[];
  recommendedActions: string[];
  technicalReasoning: string;
  confidenceScore: number; // e.g. 98.5%
  ragCitations: { title: string; source: string; snippet: string }[];
}

export interface ScanResult {
  id: string;
  indicator: string;
  indicatorType: IndicatorType;
  scanTimestamp: string;
  riskLevel: RiskLevel;
  riskScore: number; // 0 to 100
  verdictLabel: string;
  mlPhishingProbability: number; // 0.0 to 1.0
  mlModelName: string;
  domainAgeDays?: number;
  registrar?: string;
  ipAddress?: string;
  country?: string;
  sslValid?: boolean;
  sslIssuer?: string;
  signals: DetectionSignal[];
  virusTotal: VirusTotalData;
  aiExplanation: AISecurityExplanation;
}

export type ScanStage = 
  | 'idle'
  | 'analyzing_structure'
  | 'extracting_features'
  | 'checking_virustotal'
  | 'evaluating_ml_fusion'
  | 'generating_rag_explanation'
  | 'completed'
  | 'error';

export interface ScanProgressState {
  stage: ScanStage;
  progressPercent: number;
  message: string;
}
