import React, { useState } from 'react';
import { Bot, User, Send, Sparkles, BookOpen, ShieldCheck, HelpCircle, RefreshCw } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  citations?: { title: string; source: string }[];
}

interface AssistantChatProps {
  initialPrompt?: string;
  className?: string;
}

export const AssistantChat: React.FC<AssistantChatProps> = ({ initialPrompt, className = '' }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: "Hello! I am your **PhishGuard RAG AI Assistant**. I can help you analyze suspicious URLs, interpret VirusTotal evidence, explain risk scores, or look up MITRE ATT&CK & OWASP security guidance. How can I assist your security analysis today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: [
        { title: 'OWASP Phishing Prevention Guide', source: 'OWASP v2.4' },
        { title: 'MITRE ATT&CK T1566', source: 'MITRE Framework' },
      ],
    },
  ]);
  const [input, setInput] = useState(initialPrompt || '');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedPrompts = [
    'Why was paypaI-security-verify.xyz flagged as high risk?',
    'What is typosquatting homograph domain deception?',
    'How does VirusTotal engine count affect risk fusion?',
    'What steps should I take if a user clicked a phishing link?',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate RAG AI Response
    setTimeout(() => {
      let responseText = '';
      let citations = [
        { title: 'PhishGuard RAG Knowledge Index', source: 'Internal Playbook' },
      ];

      if (query.toLowerCase().includes('paypal') || query.toLowerCase().includes('flagged')) {
        responseText = "The URL **paypaI-security-verify.xyz** was flagged with a **94/100 Risk Score** for three critical reasons:\n\n1. **Homograph Typosquatting**: The domain uses an uppercase 'I' to trick users into reading 'paypal'.\n2. **Newly Registered TLD (.xyz)**: Domain WHOIS indicates creation 3 days prior.\n3. **19 VirusTotal Detections**: 19 out of 72 security vendors explicitly classify it as malicious credential-harvesting phishing.";
        citations.push({ title: 'MITRE ATT&CK T1566.002 Spearphishing Link', source: 'MITRE Enterprise' });
      } else if (query.toLowerCase().includes('typosquatting')) {
        responseText = "Typosquatting (or URL hijacking) relies on common typos, visual homographs, or alternate TLDs (e.g. `g00gle.com` or `paypal-update.xyz`). Adversaries register these domains to intercept users attempting to access legitimate websites.";
        citations.push({ title: 'OWASP Automated Threat A9', source: 'OWASP Foundation' });
      } else {
        responseText = `Based on PhishGuard's grounded security knowledge base, indicators evaluated with high risk scores should be immediately isolated, blocked in perimeter DNS/firewalls, and reported to relevant abuse authorities.`;
      }

      const assistantMsg: Message = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <Card variant="cyber" className={`flex flex-col h-[650px] p-0 overflow-hidden ${className}`}>
      {/* Assistant Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-cyber-glow">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span>PhishGuard Security Assistant</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                RAG Active
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">Grounded on MITRE ATT&CK & PhishGuard Threat Knowledge Base</p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-xs font-mono flex items-center gap-1"
          title="Clear Conversation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Suggested Prompts Bar */}
      <div className="p-3 bg-slate-900/40 border-b border-slate-800/80 overflow-x-auto no-scrollbar flex items-center gap-2">
        <span className="text-[11px] font-mono font-semibold text-slate-400 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyber-glow" /> Prompts:
        </span>
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 whitespace-nowrap transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Message History Window */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`p-2 rounded-xl text-white shrink-0 ${
                  isUser
                    ? 'bg-blue-600 shadow-md shadow-blue-500/20'
                    : 'bg-indigo-600 shadow-md shadow-indigo-500/20'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[80%] space-y-2`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-blue-600/20 border border-blue-500/40 text-slate-100 rounded-tr-none'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none font-sans'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Citations list if available */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap gap-2">
                      {msg.citations.map((c, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                        >
                          <BookOpen className="w-3 h-3" /> {c.title} ({c.source})
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <span className="text-[10px] font-mono text-slate-500 block px-1">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-3 text-slate-400 text-xs font-mono">
            <div className="p-2 rounded-xl bg-indigo-600 text-white">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-100" />
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce delay-200" />
              <span className="text-slate-400">Retrieving RAG security context...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI Assistant about phishing tactics, risk scores, or security mitigation..."
            className="flex-1 bg-slate-950 text-xs sm:text-sm text-slate-100 placeholder-slate-500 font-mono px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          <Button
            type="submit"
            variant="glow"
            disabled={!input.trim() || isTyping}
            rightIcon={<Send className="w-4 h-4" />}
          >
            <span>Send</span>
          </Button>
        </form>
      </div>
    </Card>
  );
};
