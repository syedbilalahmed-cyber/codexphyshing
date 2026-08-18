import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { ScannerPage } from './pages/ScannerPage';
import { DashboardPage } from './pages/DashboardPage';
import { HistoryPage } from './pages/HistoryPage';
import { ThreatIntelPage } from './pages/ThreatIntelPage';
import { AssistantChat } from './components/assistant/AssistantChat';
import { Card } from './components/ui/Card';

export const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [initialScanUrl, setInitialScanUrl] = useState<string>('');
  const [assistantPrompt, setAssistantPrompt] = useState<string>('');

  const getActivePage = (pathname: string): string => {
    switch (pathname) {
      case '/':
      case '/landing':
        return 'landing';
      case '/scanner':
        return 'scanner';
      case '/dashboard':
        return 'dashboard';
      case '/history':
        return 'history';
      case '/threat-intel':
      case '/intel':
        return 'threat-intel';
      case '/assistant':
        return 'assistant';
      case '/reports':
        return 'reports';
      case '/settings':
        return 'settings';
      default:
        return 'landing';
    }
  };

  const activePage = getActivePage(location.pathname);

  const handleNavigate = (page: string, param?: string) => {
    if (param) {
      setInitialScanUrl(param);
    }
    switch (page) {
      case 'landing':
        navigate('/');
        break;
      case 'scanner':
        navigate('/scanner');
        break;
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'history':
        navigate('/history');
        break;
      case 'threat-intel':
      case 'intel':
        navigate('/threat-intel');
        break;
      case 'assistant':
        navigate('/assistant');
        break;
      case 'reports':
        navigate('/reports');
        break;
      case 'settings':
        navigate('/settings');
        break;
      default:
        navigate('/');
        break;
    }
  };

  const handleScanFromLanding = (url: string) => {
    setInitialScanUrl(url);
    navigate('/scanner');
  };

  const handleNavigateToAssistant = (prompt: string) => {
    setAssistantPrompt(prompt);
    navigate('/assistant');
  };

  const handleInspectFromHistory = (indicator: string) => {
    setInitialScanUrl(indicator);
    navigate('/scanner');
  };

  return (
    <Layout activePage={activePage} onNavigate={handleNavigate}>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              onScan={handleScanFromLanding}
              onNavigate={handleNavigate}
            />
          }
        />
        <Route
          path="/scanner"
          element={
            <ScannerPage
              initialUrl={initialScanUrl}
              onNavigateToAssistant={handleNavigateToAssistant}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              onNavigate={(page, param) => handleNavigate(page, param)}
            />
          }
        />
        <Route
          path="/history"
          element={
            <HistoryPage
              onInspect={handleInspectFromHistory}
            />
          }
        />
        <Route path="/threat-intel" element={<ThreatIntelPage />} />
        <Route path="/intel" element={<ThreatIntelPage />} />
        <Route
          path="/assistant"
          element={<AssistantChat initialPrompt={assistantPrompt} />}
        />
        <Route
          path="/reports"
          element={
            <div className="space-y-6">
              <Card variant="cyber" className="p-8 text-center space-y-4">
                <h2 className="text-2xl font-bold text-slate-100">Security Audit Reports</h2>
                <p className="text-sm text-slate-400 max-w-lg mx-auto">
                  Export PDF & CSV threat reports, compliance logs, and executive security summaries.
                </p>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 max-w-md mx-auto">
                  Report Ledger Status: 0 Pending Approvals • All automated audits green
                </div>
              </Card>
            </div>
          }
        />
        <Route
          path="/settings"
          element={
            <div className="space-y-6">
              <Card variant="cyber" className="p-8 space-y-6 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-100 border-b border-slate-800 pb-4">Platform Configuration</h2>
                <div className="space-y-4 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-200 block">VirusTotal REST API Key</span>
                      <span className="text-slate-500 text-[11px]">Server-side integrated</span>
                    </div>
                    <span className="text-emerald-400 font-bold">Configured</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-200 block">URLBERT ML Classifier</span>
                      <span className="text-slate-500 text-[11px]">Local inference engine v2</span>
                    </div>
                    <span className="text-blue-400 font-bold">Active</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-200 block">RAG Vector Index</span>
                      <span className="text-slate-500 text-[11px]">50,000+ security citations</span>
                    </div>
                    <span className="text-purple-400 font-bold">Loaded</span>
                  </div>
                </div>
              </Card>
            </div>
          }
        />
      </Routes>
    </Layout>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
