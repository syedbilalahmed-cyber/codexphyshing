import React from 'react';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  Search, 
  History, 
  Database, 
  Bot, 
  FileText, 
  Settings, 
  ExternalLink,
  Lock
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'landing', label: 'Home / Hero', icon: ShieldAlert },
    { id: 'scanner', label: 'URL Scanner', icon: Search, badge: 'Core' },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'history', label: 'Scan History', icon: History },
    { id: 'threat-intel', label: 'Threat Intelligence', icon: Database },
    { id: 'assistant', label: 'AI Assistant (RAG)', icon: Bot, badge: 'AI' },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 glass-card border-r border-slate-800/80 bg-background/95 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
          <button 
            onClick={() => { onNavigate('landing'); onCloseMobile(); }}
            className="flex items-center gap-3 text-left group"
          >
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-cyber-glow group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                PhishGuard <span className="cyber-gradient-text">AI</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider">CYBERSECURITY PLATFORM</p>
            </div>
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 py-2 text-[10px] font-bold font-mono tracking-wider text-slate-500 uppercase">
            Platform Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-white border border-blue-500/30 shadow-sm shadow-blue-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyber-glow' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                    isActive ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700/50'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* System Status Box */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/40">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-emerald-400" /> API Engine
              </span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Online
              </span>
            </div>
            <div className="text-[11px] text-slate-300 font-mono flex items-center justify-between">
              <span>VirusTotal v3</span>
              <span className="text-slate-400">Integrated</span>
            </div>
            <div className="text-[11px] text-slate-300 font-mono flex items-center justify-between">
              <span>ML Classifier</span>
              <span className="text-blue-400">URLBERT-v2</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
