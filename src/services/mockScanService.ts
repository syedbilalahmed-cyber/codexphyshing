import { ScanResult, ScanProgressState } from '../types/scan';
import { MOCK_MALICIOUS_URL_RESULT, MOCK_SUSPICIOUS_URL_RESULT, MOCK_SAFE_URL_RESULT } from '../mock/scanData';

export class MockScanService {
  /**
   * Simulates an interactive 5-stage scan with realistic progress callbacks
   */
  static async scanIndicator(
    indicator: string,
    onProgress: (state: ScanProgressState) => void
  ): Promise<ScanResult> {
    const cleanInput = indicator.trim().toLowerCase();

    // Stage 1: Lexical Analysis
    onProgress({
      stage: 'analyzing_structure',
      progressPercent: 15,
      message: 'Normalizing target indicator & parsing lexical patterns...',
    });
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Stage 2: Feature Extraction
    onProgress({
      stage: 'extracting_features',
      progressPercent: 35,
      message: 'Extracting domain WHOIS, SSL certificates, & structural heuristics...',
    });
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Stage 3: VirusTotal Intelligence
    onProgress({
      stage: 'checking_virustotal',
      progressPercent: 60,
      message: 'Querying VirusTotal v3 API & global threat intelligence feeds...',
    });
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Stage 4: ML & Risk Fusion
    onProgress({
      stage: 'evaluating_ml_fusion',
      progressPercent: 82,
      message: 'Evaluating PhishGuard-URLBERT ML probability & risk fusion engine...',
    });
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Stage 5: RAG Grounding
    onProgress({
      stage: 'generating_rag_explanation',
      progressPercent: 96,
      message: 'Synthesizing grounded AI security explanation & recommendations...',
    });
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Completed
    onProgress({
      stage: 'completed',
      progressPercent: 100,
      message: 'Analysis complete.',
    });

    // Select result based on input keyword matching
    let baseResult: ScanResult;
    if (cleanInput.includes('paypa') || cleanInput.includes('malicious') || cleanInput.includes('phish') || cleanInput.includes('login.php')) {
      baseResult = MOCK_MALICIOUS_URL_RESULT;
    } else if (cleanInput.includes('crypto') || cleanInput.includes('suspicious') || cleanInput.includes('airdrop') || cleanInput.includes('.top')) {
      baseResult = MOCK_SUSPICIOUS_URL_RESULT;
    } else {
      baseResult = MOCK_SAFE_URL_RESULT;
    }

    // Return result with updated input and current timestamp
    return {
      ...baseResult,
      id: `scan-${Date.now()}`,
      indicator: indicator.trim(),
      scanTimestamp: new Date().toISOString(),
    };
  }
}
