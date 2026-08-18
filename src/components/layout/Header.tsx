import React from 'react';
import { Menu, Shield, Bell, Sparkles, Search } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onOpenMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  onOpenMobileSidebar,
}) => {
  const getPageTitle = () => {
    switch (activePage) {
      case 'landing':
        return 'PhishGuard AI Overview';
      case 'scanner':
        return 'URL & Indicator Scanner';
      case 'dashboard':
        return 'Security Operations Dashboard';
      case 'history':
        return 'Scan History & Threat Ledger';
      case 'threat-intel':
        return 'Threat Intelligence Hub';
      case 'assistant':
        return 'AI Security Assistant (RAG)';
      case 'reports':
        return 'Security Audit Reports';
      case 'settings':
        return 'Platform Settings';
      default:
        return 'PhishGuard AI';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 glass-card border-b border-slate-800/80 bg-background/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 text-slate-400 hover:text-white rounded-lg lg:hidden hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
            <span>{getPageTitle()}</span>
            <span className="hidden sm:inline-flex text-[10px] px-2 py-0.5 rounded-full font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              v2.4 Production
            </span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Launch Scanner button */}
        {activePage !== 'scanner' && (
          <Button
            size="sm"
            variant="glow"
            leftIcon={<Search className="w-3.5 h-3.5" />}
            onClick={() => onNavigate('scanner')}
          >
            <span className="hidden sm:inline">New Scan</span>
          </Button>
        )}

        {/* AI Assistant Quick Launcher */}
        {activePage !== 'assistant' && (
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Sparkles className="w-3.5 h-3.5 text-cyber-glow" />}
            onClick={() => onNavigate('assistant')}
          >
            <span className="hidden sm:inline">Ask AI</span>
          </Button>
        )}

        {/* Notification indicator */}
        <button 
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl relative transition-colors"
          title="Security Alerts"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        </button>
      </div>
    </header>
  );
};
