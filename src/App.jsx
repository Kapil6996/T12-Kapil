import React, { useState } from 'react';
import { 
  Activity, 
  Briefcase, 
  Search, 
  Database, 
  Star, 
  Mail, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Download, 
  Printer, 
  ArrowRight, 
  Code, 
  Clock, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Settings,
  Zap,
  Building2,
  User,
  Shield,
  FileText
} from 'lucide-react';

// Mock data for Tab 3 - Test Run Log
const INITIAL_LOG_DATA = [
  { run: 1, timestamp: "Jun 7 09:22", name: "Rajesh Kumar", company: "Vedic Bazaar", score: "8/10", duration: "3.9s", status: "Success", crm: "Yes" },
  { run: 2, timestamp: "Jun 7 11:45", name: "Priya Mehta", company: "Wellness India", score: "7/10", duration: "4.2s", status: "Success", crm: "Yes" },
  { run: 3, timestamp: "Jun 7 14:12", name: "Amit Singh", company: "ArogyaWell", score: "9/10", duration: "3.8s", status: "Success", crm: "Yes" },
  { run: 4, timestamp: "Jun 7 16:30", name: "Unknown", company: "Incomplete", score: "—/10", duration: "2.1s", status: "Flagged", crm: "No" },
  { run: 5, timestamp: "Jun 8 09:15", name: "Sunita Patel", company: "Om Shanti", score: "6/10", duration: "4.5s", status: "Success", crm: "Yes" },
  { run: 6, timestamp: "Jun 8 11:28", name: "Vikram Joshi", company: "NatureCure", score: "8/10", duration: "3.7s", status: "Success", crm: "Yes" },
  { run: 7, timestamp: "Jun 8 13:44", name: "Deepak Nair", company: "Ayur Wellness", score: "7/10", duration: "4.8s", status: "Success", crm: "Yes" },
  { run: 8, timestamp: "Jun 8 16:02", name: "Meena K", company: "Giri Trading", score: "9/10", duration: "3.5s", status: "Success", crm: "Yes" },
  { run: 9, timestamp: "Jun 9 09:33", name: "Kavya Iyer", company: "Sattvic Foods", score: "6/10", duration: "4.1s", status: "Success", crm: "Yes" },
  { run: 10, timestamp: "Jun 9 11:20", name: "Arjun Reddy", company: "Pure Nature", score: "8/10", duration: "3.9s", status: "Retried", crm: "Yes" },
  { run: 11, timestamp: "Jun 9 14:15", name: "Smita K", company: "Prana Life", score: "7/10", duration: "4.3s", status: "Success", crm: "Yes" },
  { run: 12, timestamp: "Jun 9 16:48", name: "Gaurav S", company: "BioHerb", score: "5/10", duration: "4.0s", status: "Success", crm: "Yes" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSteps, setExpandedSteps] = useState({
    1: true, // Default open first one to show it is interactive
  });
  
  // Search & Filter state for logs table
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const toggleStep = (stepId) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  // CSV Exporter using Blob download
  const handleDownloadCSV = () => {
    const headers = "Run#,Timestamp,Lead Name,Company,Score,Duration,Status,CRM Created\n";
    const rows = INITIAL_LOG_DATA.map(row => 
      `"${row.run}","${row.timestamp}","${row.name}","${row.company}","${row.score}","${row.duration}","${row.status}","${row.crm}"`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "go_brics_lead_capture_runs_log.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter logs based on search inputs
  const filteredLogs = INITIAL_LOG_DATA.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'All' || 
      item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#080A10] text-white flex flex-col font-sans selection:bg-[#06B6D4]/30 selection:text-white">
      {/* GLOBAL HEADER */}
      <header className="border-b border-[#242C3F] bg-[#080A10] py-6 px-4 md:px-8 relative overflow-hidden">
        {/* Decorative Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#141c2f_1px,transparent_1px),linear-gradient(to_bottom,#141c2f_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none"></div>
        <div className="absolute top-0 right-1/4 w-96 h-2 bg-[#06B6D4]/30 blur-xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between relative z-10 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3 print:text-black print-heading-main">
              GO-BRICS Lead Capture Automation
            </h1>
            <p className="text-sm text-slate-400 font-mono mt-1 print:text-slate-600 print-heading-sub">
              LinkedIn Connection to HubSpot CRM Synchronization Pipeline
            </p>
          </div>

          <div className="flex items-center gap-3 no-print">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-[#111625] hover:bg-[#242C3F] text-white border border-[#242C3F] hover:border-[#06B6D4]/50 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer shadow-md hover:shadow-[#06B6D4]/10"
            >
              <Printer className="w-4 h-4 text-[#06B6D4]" />
              <span>Download PDF Report</span>
            </button>
          </div>
        </div>
      </header>

      {/* TAB NAVIGATION (Hidden during Print) */}
      <nav className="border-b border-[#242C3F] bg-[#0b0e17] no-print">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex overflow-x-auto gap-8 no-scrollbar scroll-smooth">
            {[
              { id: 'overview', label: 'TAB 1 — OVERVIEW' },
              { id: 'flow', label: 'TAB 2 — FLOW DIAGRAM' },
              { id: 'logs', label: 'TAB 3 — TEST RUN LOG' },
              { id: 'errors', label: 'TAB 4 — ERROR HANDLING' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-mono text-xs md:text-sm tracking-wider font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer relative ${
                  activeTab === tab.id
                    ? 'border-[#06B6D4] text-[#06B6D4] glow-cyan-text'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#06B6D4] shadow-[0_0_8px_#06B6D4]"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* CORE WORKSPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">

        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW */}
        {/* ========================================================================= */}
        <section className={`space-y-8 animate-fade-in ${activeTab === 'overview' ? 'block' : 'hidden'} print-force-block`}>
          {/* Print Section Title */}
          <div className="hidden print:block mb-4">
            <h2 className="print-section-title">SECTION 1 — WORKFLOW OVERVIEW</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print-grid-1">
            {/* Main Workflow Metadata Card */}
            <div className="lg:col-span-2 bg-[#111625] border border-[#242C3F] rounded-xl p-6 glow-cyan-box transition-all duration-300 print-card-style">
              <div className="flex justify-between items-start border-b border-[#242C3F]/60 pb-4 mb-6 print:border-slate-300">
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-[#06B6D4] font-bold">System Status Card</span>
                  <h3 className="text-xl font-bold text-white mt-1 print:text-black">GO-BRICS B2B Lead Capture Automation</h3>
                </div>
                <span className="px-3 py-1 bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 animate-pulse-glow">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]"></span> Live
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm print-grid-2">
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-[#1b2232] pb-2 print:border-slate-100">
                    <span className="text-slate-400 print:text-slate-500">Platform:</span>
                    <span className="font-semibold text-white print:text-black">Zapier Cloud</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1b2232] pb-2 print:border-slate-100">
                    <span className="text-slate-400 print:text-slate-500">Active Trigger:</span>
                    <span className="font-semibold text-white print:text-black">New LinkedIn Connection Accepted</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1b2232] pb-2 print:border-slate-100">
                    <span className="text-slate-400 print:text-slate-500">Integration Steps:</span>
                    <span className="font-semibold text-white print:text-black">6 Steps</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-[#1b2232] pb-2 print:border-slate-100">
                    <span className="text-slate-400 print:text-slate-500">Total Runs logged:</span>
                    <span className="font-semibold text-white print:text-black">38 Execution Runs</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1b2232] pb-2 print:border-slate-100">
                    <span className="text-slate-400 print:text-slate-500">Success Rate:</span>
                    <span className="font-semibold text-[#06B6D4] font-bold">96.8%</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1b2232] pb-2 print:border-slate-100">
                    <span className="text-slate-400 print:text-slate-500">Avg Execution Time:</span>
                    <span className="font-semibold text-white print:text-black">4.1s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Health Quick Watch */}
            <div className="bg-[#111625] border border-[#242C3F] rounded-xl p-6 flex flex-col justify-between print-card-style">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#06B6D4] font-bold block mb-4">Target Integrations</span>
                <div className="flex flex-wrap gap-2.5 print:gap-1.5">
                  {['LinkedIn', 'Zapier', 'HubSpot CRM', 'Gmail', 'Slack', 'Google Sheets'].map(tool => (
                    <span key={tool} className="px-3 py-1.5 bg-[#1b2232] border border-[#2e3952] text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 print:bg-slate-100 print:text-slate-700 print:border-slate-300">
                      <Zap className="w-3.5 h-3.5 text-[#06B6D4]" />
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 border-t border-[#242C3F] pt-4 print:border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#06B6D4]/10 rounded-lg text-[#06B6D4]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-400 uppercase tracking-wider font-mono">Operations Contact</h4>
                    <p className="text-sm font-semibold text-white print:text-black">GO-BRICS Operations Desk</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 print-grid-4">
            {[
              { label: 'Integration Steps', value: '6 Steps', desc: 'Configured Actions', icon: Settings },
              { label: 'Avg Run Time', value: '4.1s', desc: 'Latency Rate', icon: Clock },
              { label: 'Success Rate', value: '96.8%', desc: 'Workflow Reliability', icon: Activity },
              { label: 'Leads Captured', value: '38', desc: 'Total Live Records', icon: User }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-[#111625] border border-[#242C3F] rounded-xl p-5 hover:border-[#06B6D4]/30 transition-all duration-300 print-card-style">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs text-slate-400 font-mono tracking-wider print:text-slate-500">{stat.label}</span>
                    <Icon className="w-4 h-4 text-[#06B6D4]" />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-extrabold text-white font-mono tracking-tight print:text-black">{stat.value}</h4>
                  <p className="text-[10px] md:text-xs text-slate-400 font-mono mt-1 print:text-slate-400">{stat.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Impact Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold tracking-tight text-white flex items-center gap-2 print:text-black">
              <CheckCircle2 className="w-5 h-5 text-[#06B6D4]" />
              Business Impact & Saved Overhead
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print-grid-3">
              {[
                { title: "8 hrs/week saved", desc: "Previously entered manually", icon: Clock },
                { title: "38 leads captured", desc: "Since workflow went live", icon: User },
                { title: "100% CRM accuracy", desc: "Zero manual entry errors", icon: Shield }
              ].map((impact, idx) => {
                const Icon = impact.icon;
                return (
                  <div key={idx} className="bg-[#111625] border border-[#242C3F] rounded-xl p-5 flex items-start gap-4 hover:bg-[#151d30] transition-all duration-300 print-card-style">
                    <div className="p-3 bg-[#06B6D4]/5 border border-[#06B6D4]/20 rounded-lg text-[#06B6D4] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-[#06B6D4] print:text-black">{impact.title}</h4>
                      <p className="text-sm text-slate-400 font-mono mt-0.5 print:text-slate-500">{impact.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TAB 2: FLOW DIAGRAM */}
        {/* ========================================================================= */}
        <section className={`space-y-8 animate-fade-in ${activeTab === 'flow' ? 'block' : 'hidden'} print-force-block`}>
          {/* Print Section Title */}
          <div className="hidden print:block mb-4">
            <h2 className="print-section-title">SECTION 2 — AUTOMATION WORKFLOW PIPELINE</h2>
            <p className="text-sm text-slate-500 font-mono mb-4">Click steps on screen to review technical details & JSON sample payloads</p>
          </div>

          <div className="bg-[#111625] border border-[#242C3F] rounded-xl p-4 md:p-8 print-card-style print-card-allow-break">
            
            {/* Instructions */}
            <div className="mb-6 flex items-center justify-between no-print">
              <span className="text-xs font-mono text-slate-400">Interactive Blueprint: Click steps to expand technical payloads</span>
              <button 
                onClick={() => setExpandedSteps({ 1: true, 2: true, 3: true, 4: true, 5: true, 6: true })}
                className="text-xs text-[#06B6D4] font-mono border border-[#06B6D4]/20 hover:border-[#06B6D4]/60 px-2.5 py-1 rounded hover:bg-[#06B6D4]/5 transition-all duration-200 cursor-pointer"
              >
                Expand All Payload Details
              </button>
            </div>

            {/* Vertical Stepper Flow */}
            <div className="relative pl-4 md:pl-8 space-y-8">
              
              {/* Connector Backbone Line */}
              <div className="absolute left-[26px] md:left-[42px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#06B6D4] via-[#8B5CF6] to-[#06B6D4] opacity-40"></div>

              {/* --------------------- STEP 1 --------------------- */}
              <div className="relative group">
                {/* Step Circle Indicator */}
                <div 
                  onClick={() => toggleStep(1)}
                  className={`absolute -left-[30px] md:-left-[46px] top-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 font-mono text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer z-10 ${
                    expandedSteps[1] 
                      ? 'bg-[#06B6D4] border-[#06B6D4] text-black shadow-[0_0_12px_rgba(6,182,212,0.4)]' 
                      : 'bg-[#080A10] border-[#242C3F] text-slate-400 hover:border-[#06B6D4] hover:text-[#06B6D4]'
                  }`}
                >
                  01
                </div>

                <div className="bg-[#080A10]/50 border border-[#242C3F] rounded-xl p-5 md:p-6 transition-all duration-300 hover:border-[#06B6D4]/30 print:bg-white print:border-slate-300">
                  <div 
                    onClick={() => toggleStep(1)}
                    className="flex justify-between items-center cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <div className="flex items-center gap-2 text-[#06B6D4]">
                        <Briefcase className="w-5 h-5" />
                        <span className="font-mono text-xs font-bold tracking-widest uppercase">TRIGGER NODE</span>
                      </div>
                      <h4 className="text-base md:text-lg font-bold text-white print:text-black">LinkedIn Connection Accepted</h4>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 no-print">
                      <span>{expandedSteps[1] ? 'Hide Payload' : 'Show Payload'}</span>
                      {expandedSteps[1] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 mt-2 print:text-slate-600">New B2B connection accepted on LinkedIn</p>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs font-mono bg-[#111625] border border-[#242C3F] px-2 py-0.5 rounded text-white print:bg-slate-100 print:text-slate-700 print:border-slate-300">
                      Webhook Listener
                    </span>
                    <span className="text-xs font-mono text-[#06B6D4] bg-[#06B6D4]/5 px-2 py-0.5 rounded border border-[#06B6D4]/20">
                      Zapier Trigger
                    </span>
                  </div>

                  {expandedSteps[1] && (
                    <div className="mt-5 border-t border-[#242C3F] pt-4 space-y-3 animate-fade-in print:border-slate-200">
                      <div>
                        <span className="text-[10px] text-[#06B6D4] uppercase tracking-wider font-mono font-bold block mb-1">Configuration</span>
                        <p className="text-xs text-slate-400 font-mono print:text-slate-600">Zapier LinkedIn trigger — fires on new accepted connection. Authenticated via OAuth 2.0 connection.</p>
                      </div>
                      <div className="bg-[#0b0e17] p-3 rounded-lg border border-[#1b2232] print:bg-slate-50 print:border-slate-200">
                        <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider block mb-2 font-bold">API Payload Structure</span>
                        <pre className="text-[10px] text-[#06B6D4] font-mono overflow-x-auto leading-relaxed print:text-slate-800">
{`{
  "event": "new_connection",
  "linkedin_id": "li_982312",
  "full_name": "Rajesh Kumar",
  "profile_url": "https://linkedin.com/in/rajesh-kumar",
  "timestamp": "2026-06-07T09:22:00Z"
}`}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* --------------------- STEP 2 --------------------- */}
              <div className="relative group">
                {/* Step Circle Indicator */}
                <div 
                  onClick={() => toggleStep(2)}
                  className={`absolute -left-[30px] md:-left-[46px] top-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 font-mono text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer z-10 ${
                    expandedSteps[2] 
                      ? 'bg-[#3B82F6] border-[#3B82F6] text-black shadow-[0_0_12px_rgba(59,130,246,0.4)]' 
                      : 'bg-[#080A10] border-[#242C3F] text-slate-400 hover:border-[#3B82F6] hover:text-[#3B82F6]'
                  }`}
                >
                  02
                </div>

                <div className="bg-[#080A10]/50 border border-[#242C3F] rounded-xl p-5 md:p-6 transition-all duration-300 hover:border-[#3B82F6]/30 print:bg-white print:border-slate-300">
                  <div 
                    onClick={() => toggleStep(2)}
                    className="flex justify-between items-center cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <div className="flex items-center gap-2 text-[#3B82F6]">
                        <Search className="w-5 h-5" />
                        <span className="font-mono text-xs font-bold tracking-widest uppercase">ENRICHMENT DATA</span>
                      </div>
                      <h4 className="text-base md:text-lg font-bold text-white print:text-black">Enrich Lead Data</h4>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 no-print">
                      <span>{expandedSteps[2] ? 'Hide Payload' : 'Show Payload'}</span>
                      {expandedSteps[2] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 mt-2 print:text-slate-600">Pull company name, role, industry, and scale metrics from LinkedIn profile</p>

                  {/* Branch Warning */}
                  <div className="mt-3 p-3 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg text-xs font-mono flex items-start gap-2 text-white print:bg-red-50 print:border-red-300 print:text-red-800">
                    <AlertTriangle className="w-4 h-4 text-[#EF4444] shrink-0" />
                    <div>
                      <span className="font-bold uppercase text-[#EF4444]">BRANCH TO ERROR PATH (Red):</span> Profile incomplete (missing email, company, or job title) — flag for manual review, halt integration.
                    </div>
                  </div>

                  {expandedSteps[2] && (
                    <div className="mt-5 border-t border-[#242C3F] pt-4 space-y-3 animate-fade-in print:border-slate-200">
                      <div>
                        <span className="text-[10px] text-[#3B82F6] uppercase tracking-wider font-mono font-bold block mb-1">Configuration</span>
                        <p className="text-xs text-slate-400 font-mono print:text-slate-600">Enrichment parser uses direct API filters. Inspects public profile parameters and resolves verified corporate email templates.</p>
                      </div>
                      <div className="bg-[#0b0e17] p-3 rounded-lg border border-[#1b2232] print:bg-slate-50 print:border-slate-200">
                        <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider block mb-2 font-bold">API Payload Structure</span>
                        <pre className="text-[10px] text-[#3B82F6] font-mono overflow-x-auto leading-relaxed print:text-slate-800">
{`{
  "input": {
    "profile_url": "https://linkedin.com/in/rajesh-kumar"
  },
  "enriched_data": {
    "company_name": "Vedic Bazaar",
    "role": "VP Operations",
    "industry": "Wellness & E-commerce",
    "company_size": "50-200",
    "seniority": "Executive"
  }
}`}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* --------------------- STEP 3 --------------------- */}
              <div className="relative group">
                {/* Step Circle Indicator */}
                <div 
                  onClick={() => toggleStep(3)}
                  className={`absolute -left-[30px] md:-left-[46px] top-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 font-mono text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer z-10 ${
                    expandedSteps[3] 
                      ? 'bg-[#06B6D4] border-[#06B6D4] text-black shadow-[0_0_12px_rgba(6,182,212,0.4)]' 
                      : 'bg-[#080A10] border-[#242C3F] text-slate-400 hover:border-[#06B6D4] hover:text-[#06B6D4]'
                  }`}
                >
                  03
                </div>

                <div className="bg-[#080A10]/50 border border-[#242C3F] rounded-xl p-5 md:p-6 transition-all duration-300 hover:border-[#06B6D4]/30 print:bg-white print:border-slate-300">
                  <div 
                    onClick={() => toggleStep(3)}
                    className="flex justify-between items-center cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <div className="flex items-center gap-2 text-[#06B6D4]">
                        <Database className="w-5 h-5" />
                        <span className="font-mono text-xs font-bold tracking-widest uppercase">CRM ENTRY NODE</span>
                      </div>
                      <h4 className="text-base md:text-lg font-bold text-white print:text-black">Create HubSpot Contact</h4>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 no-print">
                      <span>{expandedSteps[3] ? 'Hide Payload' : 'Show Payload'}</span>
                      {expandedSteps[3] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 mt-2 print:text-slate-600">Create new contact with full details, assign to Sales pipeline — Cold stage</p>

                  {expandedSteps[3] && (
                    <div className="mt-5 border-t border-[#242C3F] pt-4 space-y-3 animate-fade-in print:border-slate-200">
                      <div>
                        <span className="text-[10px] text-[#06B6D4] uppercase tracking-wider font-mono font-bold block mb-1">Configuration</span>
                        <p className="text-xs text-slate-400 font-mono print:text-slate-600">HubSpot API integration v3. Deduplicates based on corporate email. Maps company metadata fields to corporate properties.</p>
                      </div>
                      <div className="bg-[#0b0e17] p-3 rounded-lg border border-[#1b2232] print:bg-slate-50 print:border-slate-200">
                        <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider block mb-2 font-bold">API Payload Structure</span>
                        <pre className="text-[10px] text-[#06B6D4] font-mono overflow-x-auto leading-relaxed print:text-slate-800">
{`{
  "hubspot_contact": {
    "email": "rajesh@vedicbazaar.com",
    "firstname": "Rajesh",
    "lastname": "Kumar",
    "company": "Vedic Bazaar",
    "jobtitle": "VP Operations",
    "hs_lead_status": "NEW",
    "pipeline_stage": "Cold Lead"
  }
}`}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* --------------------- STEP 4 --------------------- */}
              <div className="relative group">
                {/* Step Circle Indicator */}
                <div 
                  onClick={() => toggleStep(4)}
                  className={`absolute -left-[30px] md:-left-[46px] top-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 font-mono text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer z-10 ${
                    expandedSteps[4] 
                      ? 'bg-[#F59E0B] border-[#F59E0B] text-black shadow-[0_0_12px_rgba(245,158,11,0.4)]' 
                      : 'bg-[#080A10] border-[#242C3F] text-slate-400 hover:border-[#F59E0B] hover:text-[#F59E0B]'
                  }`}
                >
                  04
                </div>

                <div className="bg-[#080A10]/50 border border-[#242C3F] rounded-xl p-5 md:p-6 transition-all duration-300 hover:border-[#F59E0B]/30 print:bg-white print:border-slate-300">
                  <div 
                    onClick={() => toggleStep(4)}
                    className="flex justify-between items-center cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <div className="flex items-center gap-2 text-[#F59E0B]">
                        <Star className="w-5 h-5" />
                        <span className="font-mono text-xs font-bold tracking-widest uppercase">SCORING SCRIPT</span>
                      </div>
                      <h4 className="text-base md:text-lg font-bold text-white print:text-black">Score Lead (1 to 10)</h4>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 no-print">
                      <span>{expandedSteps[4] ? 'Hide Payload' : 'Show Payload'}</span>
                      {expandedSteps[4] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 mt-2 print:text-slate-600">Score 1-10 based on: industry fit, company size, and designation seniority weights</p>

                  {expandedSteps[4] && (
                    <div className="mt-5 border-t border-[#242C3F] pt-4 space-y-3 animate-fade-in print:border-slate-200">
                      <div>
                        <span className="text-[10px] text-[#F59E0B] uppercase tracking-wider font-mono font-bold block mb-1">Configuration</span>
                        <p className="text-xs text-slate-400 font-mono print:text-slate-600">Algorithmic scoring weights: Seniority (Max 4 pts), Company Size (Max 3 pts), Target Industry (Max 3 pts). Total sum maps to score / 10.</p>
                      </div>
                      <div className="bg-[#0b0e17] p-3 rounded-lg border border-[#1b2232] print:bg-slate-50 print:border-slate-200">
                        <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider block mb-2 font-bold">API Payload Structure</span>
                        <pre className="text-[10px] text-[#F59E0B] font-mono overflow-x-auto leading-relaxed print:text-slate-800">
{`{
  "scoring_rules": {
    "industry_fit": 3,
    "company_size_fit": 2,
    "seniority_fit": 3
  },
  "total_score": "8/10"
}`}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* --------------------- STEP 5 --------------------- */}
              <div className="relative group">
                {/* Step Circle Indicator */}
                <div 
                  onClick={() => toggleStep(5)}
                  className={`absolute -left-[30px] md:-left-[46px] top-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 font-mono text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer z-10 ${
                    expandedSteps[5] 
                      ? 'bg-[#06B6D4] border-[#06B6D4] text-black shadow-[0_0_12px_rgba(6,182,212,0.4)]' 
                      : 'bg-[#080A10] border-[#242C3F] text-slate-400 hover:border-[#06B6D4] hover:text-[#06B6D4]'
                  }`}
                >
                  05
                </div>

                <div className="bg-[#080A10]/50 border border-[#242C3F] rounded-xl p-5 md:p-6 transition-all duration-300 hover:border-[#06B6D4]/30 print:bg-white print:border-slate-300">
                  <div 
                    onClick={() => toggleStep(5)}
                    className="flex justify-between items-center cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <div className="flex items-center gap-2 text-[#06B6D4]">
                        <Mail className="w-5 h-5" />
                        <span className="font-mono text-xs font-bold tracking-widest uppercase">NOTIFIER NODE</span>
                      </div>
                      <h4 className="text-base md:text-lg font-bold text-white print:text-black">Send Email + Slack Alert</h4>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 no-print">
                      <span>{expandedSteps[5] ? 'Hide Payload' : 'Show Payload'}</span>
                      {expandedSteps[5] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 mt-2 print:text-slate-600">Email to Sales Lead + Slack channel notification</p>

                  <div className="mt-3 p-3 bg-[#111625] border border-[#242C3F] rounded-lg text-xs font-mono text-white print:bg-slate-50 print:border-slate-200 print:text-slate-800">
                    <span className="font-bold text-[#06B6D4] block mb-1 uppercase tracking-wider text-[10px]">Slack Channel Message Format:</span>
                    🎯 <span className="font-semibold text-white print:text-black">New Lead:</span> Rajesh Kumar | Vedic Bazaar | Score: 8/10
                  </div>

                  {expandedSteps[5] && (
                    <div className="mt-5 border-t border-[#242C3F] pt-4 space-y-3 animate-fade-in print:border-slate-200">
                      <div>
                        <span className="text-[10px] text-[#06B6D4] uppercase tracking-wider font-mono font-bold block mb-1">Configuration</span>
                        <p className="text-xs text-slate-400 font-mono print:text-slate-600">Slack incoming webhook integration on `#sales-pipeline`. Gmail SMTP node alerts regional director on leads scoring 8/10 or higher.</p>
                      </div>
                      <div className="bg-[#0b0e17] p-3 rounded-lg border border-[#1b2232] print:bg-slate-50 print:border-slate-200">
                        <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider block mb-2 font-bold">API Payload Structure</span>
                        <pre className="text-[10px] text-[#06B6D4] font-mono overflow-x-auto leading-relaxed print:text-slate-800">
{`{
  "slack_payload": {
    "channel": "#sales-pipeline",
    "text": "🎯 *New B2B Lead Enriched & Captured*\\n*Name:* Rajesh Kumar\\n*Company:* Vedic Bazaar\\n*Score:* 8/10\\n*Action Required:* Assign sales representative"
  }
}`}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* --------------------- STEP 6 --------------------- */}
              <div className="relative group">
                {/* Step Circle Indicator */}
                <div 
                  onClick={() => toggleStep(6)}
                  className={`absolute -left-[30px] md:-left-[46px] top-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 font-mono text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer z-10 ${
                    expandedSteps[6] 
                      ? 'bg-[#06B6D4] border-[#06B6D4] text-black shadow-[0_0_12px_rgba(6,182,212,0.4)]' 
                      : 'bg-[#080A10] border-[#242C3F] text-slate-400 hover:border-[#06B6D4] hover:text-[#06B6D4]'
                  }`}
                >
                  06
                </div>

                <div className="bg-[#080A10]/50 border border-[#242C3F] rounded-xl p-5 md:p-6 transition-all duration-300 hover:border-[#06B6D4]/30 print:bg-white print:border-slate-300">
                  <div 
                    onClick={() => toggleStep(6)}
                    className="flex justify-between items-center cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <div className="flex items-center gap-2 text-[#06B6D4]">
                        <FileSpreadsheet className="w-5 h-5" />
                        <span className="font-mono text-xs font-bold tracking-widest uppercase">LOGGER NODE</span>
                      </div>
                      <h4 className="text-base md:text-lg font-bold text-white print:text-black">Log to Google Sheets</h4>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 no-print">
                      <span>{expandedSteps[6] ? 'Hide Payload' : 'Show Payload'}</span>
                      {expandedSteps[6] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 mt-2 print:text-slate-600">Append detailed metrics to master lead tracker: timestamp, name, company, score, source</p>

                  {expandedSteps[6] && (
                    <div className="mt-5 border-t border-[#242C3F] pt-4 space-y-3 animate-fade-in print:border-slate-200">
                      <div>
                        <span className="text-[10px] text-[#06B6D4] uppercase tracking-wider font-mono font-bold block mb-1">Configuration</span>
                        <p className="text-xs text-slate-400 font-mono print:text-slate-600">Google Sheets integration. Appends values to the master database. Auto-inserts transaction timestamps.</p>
                      </div>
                      <div className="bg-[#0b0e17] p-3 rounded-lg border border-[#1b2232] print:bg-slate-50 print:border-slate-200">
                        <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider block mb-2 font-bold">API Payload Structure</span>
                        <pre className="text-[10px] text-[#06B6D4] font-mono overflow-x-auto leading-relaxed print:text-slate-800">
{`{
  "sheets_row": [
    "2026-06-07T09:22:00Z",
    "Rajesh Kumar",
    "Vedic Bazaar",
    "8/10",
    "LinkedIn Connection",
    "captured_via_zapier_run_01"
  ]
}`}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TAB 3: TEST RUN LOG */}
        {/* ========================================================================= */}
        <section className={`space-y-6 animate-fade-in ${activeTab === 'logs' ? 'block' : 'hidden'} print-force-block`}>
          {/* Print Section Title */}
          <div className="hidden print:block mb-4">
            <h2 className="print-section-title">SECTION 3 — TEST RUN EXECUTION LOG</h2>
          </div>

          {/* Execution Overview Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#111625] border border-[#242C3F] rounded-xl p-5 print-card-style print-grid-4">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-mono uppercase tracking-wider print:text-slate-500">Log Scope Runs</span>
              <h4 className="text-xl md:text-2xl font-bold text-white print:text-black">12 Runs Checked</h4>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-mono uppercase tracking-wider print:text-slate-500">Successful Executions</span>
              <h4 className="text-xl md:text-2xl font-bold text-[#06B6D4]">11 Success</h4>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-mono uppercase tracking-wider print:text-slate-500">Flagged Incidents</span>
              <h4 className="text-xl md:text-2xl font-bold text-[#EF4444]">1 Flagged</h4>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-mono uppercase tracking-wider print:text-slate-500">Average Performance</span>
              <h4 className="text-xl md:text-2xl font-bold text-white print:text-black">4.1 seconds</h4>
            </div>
          </div>

          {/* Log Controls Card (Hidden in Print) */}
          <div className="bg-[#111625] border border-[#242C3F] rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
            <div className="flex flex-1 flex-col sm:flex-row gap-3">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by Lead or Company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#080A10] border border-[#242C3F] focus:border-[#06B6D4]/80 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none transition-all duration-200"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#080A10] border border-[#242C3F] focus:border-[#06B6D4]/80 text-sm text-white rounded-lg px-3 py-2 focus:outline-none transition-all duration-200 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Success">Success (✅)</option>
                <option value="Flagged">Flagged (⚠️)</option>
                <option value="Retried">Retried (🔄)</option>
              </select>
            </div>

            {/* CSV Exporter Trigger */}
            <button
              onClick={handleDownloadCSV}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#06B6D4]/10 hover:bg-[#06B6D4]/25 border border-[#06B6D4]/30 hover:border-[#06B6D4]/70 text-[#06B6D4] rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Log CSV</span>
            </button>
          </div>

          {/* Logs Table */}
          <div className="bg-[#111625] border border-[#242C3F] rounded-xl overflow-hidden print-card-style print-card-allow-break">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#242C3F] bg-[#151d30] font-mono text-[10px] md:text-xs uppercase tracking-wider text-slate-400 print:bg-slate-100 print:text-slate-800 print:border-slate-300">
                    <th className="py-3.5 px-4 font-semibold">Run#</th>
                    <th className="py-3.5 px-4 font-semibold">Timestamp</th>
                    <th className="py-3.5 px-4 font-semibold">Lead Name</th>
                    <th className="py-3.5 px-4 font-semibold">Company</th>
                    <th className="py-3.5 px-4 font-semibold">Score</th>
                    <th className="py-3.5 px-4 font-semibold">Duration</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-4 font-semibold">CRM Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#242C3F]/60 font-mono text-xs print:divide-slate-200">
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => (
                      <tr 
                        key={log.run} 
                        className="hover:bg-[#151d30]/40 transition-colors duration-150 print:bg-white"
                      >
                        <td className="py-3 px-4 text-white font-bold print:text-black">
                          #{log.run}
                        </td>
                        <td className="py-3 px-4 text-slate-400 print:text-slate-500">
                          {log.timestamp}
                        </td>
                        <td className="py-3 px-4 text-white font-semibold print:text-black">
                          {log.name}
                        </td>
                        <td className="py-3 px-4 text-slate-400 print:text-slate-600">
                          {log.company}
                        </td>
                        <td className={`py-3 px-4 font-bold ${
                          log.score.startsWith('—') 
                            ? 'text-slate-500' 
                            : parseInt(log.score) >= 8 
                              ? 'text-[#06B6D4] print:text-cyan-800' 
                              : 'text-[#F59E0B] print:text-yellow-800'
                        }`}>
                          {log.score}
                        </td>
                        <td className="py-3 px-4 text-white print:text-black">
                          {log.duration}
                        </td>
                        <td className="py-3 px-4">
                          {log.status === 'Success' && (
                            <span className="px-2 py-0.5 bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] rounded text-[10px] font-bold">
                              ✅ Success
                            </span>
                          )}
                          {log.status === 'Flagged' && (
                            <span className="px-2 py-0.5 bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] rounded text-[10px] font-bold">
                              ⚠️ Flagged
                            </span>
                          )}
                          {log.status === 'Retried' && (
                            <span className="px-2 py-0.5 bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] rounded text-[10px] font-bold">
                              🔄 Retried
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            log.crm === 'Yes' 
                              ? 'bg-slate-900/60 text-slate-200 border border-slate-800 print:bg-slate-100 print:text-slate-800' 
                              : 'bg-red-950/20 text-red-400 border border-red-950/30'
                          }`}>
                            {log.crm}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="py-8 text-center text-slate-400 font-semibold">
                        No automation logs found matching the filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Table Footer Summary (Hidden in Print) */}
            <div className="border-t border-[#242C3F] p-4 bg-[#151d30] text-xs text-slate-400 flex justify-between items-center no-print">
              <span>Showing {filteredLogs.length} of {INITIAL_LOG_DATA.length} workflow log records</span>
              <span>Filter configuration matches query criteria</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TAB 4: ERROR HANDLING */}
        {/* ========================================================================= */}
        <section className={`space-y-8 animate-fade-in ${activeTab === 'errors' ? 'block' : 'hidden'} print-force-block`}>
          {/* Print Section Title */}
          <div className="hidden print:block mb-4">
            <h2 className="print-section-title">SECTION 4 — EXCEPTION ROUTING & OPERATIONS HANDBOOK</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print-grid-2">
            
            {/* Card 1: Incomplete Profile */}
            <div className="bg-[#111625] border border-[#242C3F] rounded-xl p-5 hover:border-[#EF4444]/30 transition-all duration-300 print-card-style">
              <div className="flex justify-between items-start border-b border-[#242C3F]/60 pb-3 mb-4 print:border-slate-200">
                <div>
                  <h4 className="text-base font-extrabold text-white print:text-black">1. Incomplete LinkedIn Profile</h4>
                  <span className="text-[10px] font-mono text-[#EF4444] uppercase tracking-wider">Exception Class: ParsingError</span>
                </div>
                <span className="px-2 py-0.5 bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] rounded text-[10px] font-mono font-bold">
                  ✅ Handled
                </span>
              </div>
              <div className="space-y-2.5 text-xs font-mono">
                <div>
                  <span className="text-slate-400 print:text-slate-500 uppercase tracking-widest text-[9px] block">Trigger Criterion:</span>
                  <p className="text-white print:text-black">Profile missing company or role parameters during payload enrichment</p>
                </div>
                <div>
                  <span className="text-slate-400 print:text-slate-500 uppercase tracking-widest text-[9px] block">Recovery Action:</span>
                  <p className="text-[#EF4444] font-semibold">Flag for manual review, notify Sales Lead on Slack queue immediately</p>
                </div>
              </div>
            </div>

            {/* Card 2: HubSpot API Limit */}
            <div className="bg-[#111625] border border-[#242C3F] rounded-xl p-5 hover:border-[#F59E0B]/30 transition-all duration-300 print-card-style">
              <div className="flex justify-between items-start border-b border-[#242C3F]/60 pb-3 mb-4 print:border-slate-200">
                <div>
                  <h4 className="text-base font-extrabold text-white print:text-black">2. HubSpot API Limit reached</h4>
                  <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-wider">Exception Class: RateLimit429</span>
                </div>
                <span className="px-2 py-0.5 bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] rounded text-[10px] font-mono font-bold">
                  ✅ Handled
                </span>
              </div>
              <div className="space-y-2.5 text-xs font-mono">
                <div>
                  <span className="text-slate-400 print:text-slate-500 uppercase tracking-widest text-[9px] block">Trigger Criterion:</span>
                  <p className="text-white print:text-black">HubSpot API returns HTTP status code 429 (Rate Limit Exceeded)</p>
                </div>
                <div>
                  <span className="text-slate-400 print:text-slate-500 uppercase tracking-widest text-[9px] block">Recovery Action:</span>
                  <p className="text-[#F59E0B] font-semibold">Queue lead locally, retry transaction after a 60-second backoff delay</p>
                </div>
              </div>
            </div>

            {/* Card 3: Duplicate Contact */}
            <div className="bg-[#111625] border border-[#242C3F] rounded-xl p-5 hover:border-[#06B6D4]/30 transition-all duration-300 print-card-style">
              <div className="flex justify-between items-start border-b border-[#242C3F]/60 pb-3 mb-4 print:border-slate-200">
                <div>
                  <h4 className="text-base font-extrabold text-white print:text-black">3. Duplicate CRM Contact</h4>
                  <span className="text-[10px] font-mono text-[#06B6D4] uppercase tracking-wider">Exception Class: UniqueCheckConflict</span>
                </div>
                <span className="px-2 py-0.5 bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] rounded text-[10px] font-mono font-bold">
                  ✅ Handled
                </span>
              </div>
              <div className="space-y-2.5 text-xs font-mono">
                <div>
                  <span className="text-slate-400 print:text-slate-500 uppercase tracking-widest text-[9px] block">Trigger Criterion:</span>
                  <p className="text-white print:text-black">Target email address already exists in HubSpot contacts records</p>
                </div>
                <div>
                  <span className="text-slate-400 print:text-slate-500 uppercase tracking-widest text-[9px] block">Recovery Action:</span>
                  <p className="text-[#06B6D4] font-semibold">Update existing contact history, skip redundant duplicate record creation</p>
                </div>
              </div>
            </div>

            {/* Card 4: Slack Webhook Offline */}
            <div className="bg-[#111625] border border-[#242C3F] rounded-xl p-5 hover:border-[#EF4444]/30 transition-all duration-300 print-card-style">
              <div className="flex justify-between items-start border-b border-[#242C3F]/60 pb-3 mb-4 print:border-slate-200">
                <div>
                  <h4 className="text-base font-extrabold text-white print:text-black">4. Slack Webhook Offline</h4>
                  <span className="text-[10px] font-mono text-[#EF4444] uppercase tracking-wider">Exception Class: WebhookConnectionError</span>
                </div>
                <span className="px-2 py-0.5 bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] rounded text-[10px] font-mono font-bold">
                  ✅ Handled
                </span>
              </div>
              <div className="space-y-2.5 text-xs font-mono">
                <div>
                  <span className="text-slate-400 print:text-slate-500 uppercase tracking-widest text-[9px] block">Trigger Criterion:</span>
                  <p className="text-white print:text-black">Slack API returns connection timeout or HTTP status error codes</p>
                </div>
                <div>
                  <span className="text-slate-400 print:text-slate-500 uppercase tracking-widest text-[9px] block">Recovery Action:</span>
                  <p className="text-[#EF4444] font-semibold">Execute email fallback logic, route lead info directly to Sales Lead inbox</p>
                </div>
              </div>
            </div>

          </div>

          {/* Monitoring SOP Guide Box */}
          <div className="bg-[#111625] border border-[#06B6D4]/30 rounded-xl p-6 glow-cyan-box print-card-style">
            <div className="flex items-center gap-3 border-b border-[#242C3F] pb-4 mb-4 print:border-slate-200">
              <div className="p-2 bg-[#06B6D4]/10 rounded-lg text-[#06B6D4]">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white print:text-black">Operations Monitoring SOP Protocol</h3>
                <p className="text-xs text-slate-400 font-mono print:text-slate-500">Standard operating procedure for workflow exception management</p>
              </div>
            </div>

            <div className="font-mono text-sm space-y-4 print:text-slate-800">
              <p className="text-[#06B6D4] font-bold text-xs uppercase tracking-wider">Weekly Maintenance Routine:</p>
              <ul className="space-y-3 pl-1.5 print-bullets">
                <li className="flex items-start gap-2">
                  <span className="text-[#06B6D4] font-bold">1.</span>
                  <span>Open <span className="text-white font-semibold print:text-black">Zapier Console</span> and navigate to <span className="text-white font-semibold print:text-black">Task History</span> workspace page.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#06B6D4] font-bold">2.</span>
                  <span>Filter log database by the active template: <span className="text-white font-semibold print:text-black">GO-BRICS Lead Capture</span>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#06B6D4] font-bold">3.</span>
                  <span>Check task pipeline daily for any unresolved failed or flagged operations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#06B6D4] font-bold">4.</span>
                  <span>Export monthly analytics run log report and dispatch to the designated Tech Lead for verification.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#242C3F] bg-[#080A10] py-6 px-4 md:px-8 text-center text-xs text-slate-400 font-mono no-print">
        <p>© 2026 GO-BRICS Business Lab & Shungite Shield. Systems Operations Group.</p>
        <p className="mt-1 text-slate-600">TASK_T12 Lead Capture Workflow Documentation Console v1.0.0</p>
      </footer>
    </div>
  );
}
