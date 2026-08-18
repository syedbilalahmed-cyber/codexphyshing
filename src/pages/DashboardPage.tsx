import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge, RiskBadge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { MOCK_HISTORY_ITEMS } from '../mock/scanData';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ShieldAlert, 
  Search, 
  TrendingUp, 
  Activity,
  ArrowRight,
  Database
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface DashboardPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const chartData = [
    { day: 'Mon', total: 120, malicious: 18, suspicious: 24, safe: 78 },
    { day: 'Tue', total: 185, malicious: 29, suspicious: 35, safe: 121 },
    { day: 'Wed', total: 240, malicious: 42, suspicious: 50, safe: 148 },
    { day: 'Thu', total: 310, malicious: 55, suspicious: 62, safe: 193 },
    { day: 'Fri', total: 290, malicious: 48, suspicious: 58, safe: 184 },
    { day: 'Sat', total: 160, malicious: 22, suspicious: 30, safe: 108 },
    { day: 'Sun', total: 210, malicious: 34, suspicious: 40, safe: 136 },
  ];

  const pieData = [
    { name: 'Safe', value: 65, color: '#10B981' },
    { name: 'Suspicious', value: 20, color: '#F59E0B' },
    { name: 'Malicious', value: 15, color: '#EF4444' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="p-5 bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 font-mono">Total Scans Executed</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-slate-100">1,515</span>
            <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +14.2%
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono block mt-1">Past 7 days volume</span>
        </Card>

        <Card className="p-5 bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 font-mono">Verified Safe</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-emerald-400">968</span>
            <span className="text-xs text-slate-400 font-mono">63.9%</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono block mt-1">Clean reputation targets</span>
        </Card>

        <Card className="p-5 bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 font-mono">Suspicious Targets</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-amber-400">299</span>
            <span className="text-xs text-slate-400 font-mono">19.7%</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono block mt-1">Heuristic warnings flagged</span>
        </Card>

        <Card className="p-5 bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 font-mono">High-Risk Malicious</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-rose-400">248</span>
            <span className="text-xs text-slate-400 font-mono">16.4%</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono block mt-1">Confirmed phishing attacks</span>
        </Card>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scan Activity Timeline Area Chart */}
        <Card className="lg:col-span-2 p-6 glass-card border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-100">Scan Activity & Threat Trends</h3>
              <p className="text-xs text-slate-400 font-mono">Daily volume of scanned indicators breakdown</p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300">Last 7 Days</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMalicious" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B0F17', borderColor: '#1E293B', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="total" stroke="#3B82F6" fillOpacity={1} fill="url(#colorTotal)" />
                <Area type="monotone" dataKey="malicious" stroke="#EF4444" fillOpacity={1} fill="url(#colorMalicious)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Risk Distribution Donut Chart */}
        <Card className="p-6 glass-card border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100 mb-1">Risk Level Distribution</h3>
            <p className="text-xs text-slate-400 font-mono mb-4">Percentage breakdown of scan verdicts</p>
            
            <div className="h-48 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0B0F17', borderColor: '#1E293B', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center pointer-events-none">
                <span className="text-xl font-extrabold font-mono text-slate-100">100%</span>
                <span className="text-[10px] font-mono text-slate-400 block">Threat Ratio</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-4 border-t border-slate-800">
            <div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-1" />
              <span className="text-slate-300">65% Safe</span>
            </div>
            <div>
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block mr-1" />
              <span className="text-slate-300">20% Susp.</span>
            </div>
            <div>
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block mr-1" />
              <span className="text-slate-300">15% Malic.</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Scans Feed */}
      <Card className="glass-card border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <h3 className="text-sm font-bold text-slate-100 font-mono uppercase tracking-wider">
            Recent Scanned Indicators Feed
          </h3>
          <Button
            size="sm"
            variant="ghost"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            onClick={() => onNavigate('history')}
          >
            View Full Scan History
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 font-mono uppercase border-b border-slate-800">
              <tr>
                <th className="px-6 py-3">Indicator Target</th>
                <th className="px-6 py-3">Verdict</th>
                <th className="px-6 py-3">Risk Score</th>
                <th className="px-6 py-3">VirusTotal</th>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {MOCK_HISTORY_ITEMS.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-6 py-3.5 font-bold text-slate-200 truncate max-w-xs">{item.indicator}</td>
                  <td className="px-6 py-3.5">
                    <RiskBadge riskLevel={item.riskLevel} size="sm" />
                  </td>
                  <td className="px-6 py-3.5 font-bold font-mono">
                    <span className={item.riskScore > 50 ? 'text-rose-400' : 'text-emerald-400'}>
                      {item.riskScore} / 100
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-slate-400">{item.virusTotal.maliciousCount}/{item.virusTotal.totalEngines}</td>
                  <td className="px-6 py-3.5 text-slate-500">{new Date(item.scanTimestamp).toLocaleTimeString()}</td>
                  <td className="px-6 py-3.5 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onNavigate('scanner', item.indicator)}
                    >
                      Inspect
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
