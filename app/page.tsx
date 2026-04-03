'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Save, FileText, Zap, ChevronRight } from 'lucide-react';

export default function AlchemistWorkstation() {
  const [sourceText, setSourceText] = useState('');
  const [instructions, setInstructions] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTransmute = async () => {
    setLoading(true);
    // In a real local setup, this would call a server action or local API
    // For now, I am acting as the brain during our session.
    console.log("Transmuting...");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-white font-sans p-8 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
            <Beaker className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase">EndoBrain <span className="text-cyan-400">Alchemist</span></h1>
            <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">Knowledge Transmutation Terminal</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Local Brain Connected</span>
        </div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 h-[70vh]">
        
        {/* Input Column */}
        <div className="flex flex-col gap-6">
          <div className="flex-1 flex flex-col p-8 bg-white/[0.02] border border-white/10 rounded-[2.5rem] backdrop-blur-3xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6 opacity-40">
              <FileText className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Raw Textbook Input</span>
            </div>
            <textarea 
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Paste raw Williams text here..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-white/60 leading-relaxed resize-none scrollbar-hide"
            />
          </div>

          <div className="p-8 bg-white/[0.02] border border-white/10 rounded-[2.5rem] backdrop-blur-3xl">
            <div className="flex items-center gap-3 mb-6 opacity-40">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Clinical Directives</span>
            </div>
            <input 
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Condensed clinical detail, focus on pathogenesis..."
              className="w-full bg-transparent border-none outline-none text-sm text-white/80 placeholder:text-white/10"
            />
          </div>
        </div>

        {/* Output Column */}
        <div className="flex flex-col gap-6">
          <div className="flex-1 p-8 bg-white/[0.01] border border-white/5 rounded-[2.5rem] flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3 opacity-40">
                <ChevronRight className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Obsidian Preview</span>
              </div>
              {preview && (
                <button className="flex items-center gap-2 text-[10px] font-bold text-cyan-400 uppercase tracking-widest hover:text-cyan-300 transition-colors">
                  <Save className="w-3 h-3" /> Save to Vault
                </button>
              )}
            </div>
            
            {!preview ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-1 bg-white/5 rounded-full mb-4 overflow-hidden">
                  <div className={`h-full bg-cyan-500 transition-all duration-1000 ${loading ? 'w-full animate-pulse' : 'w-0'}`} />
                </div>
                <p className="text-[10px] text-white/10 uppercase tracking-widest font-black italic">
                  {loading ? 'Transmuting Knowledge...' : 'Ready for Transmutation'}
                </p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto text-xs text-white/40 font-mono leading-relaxed scrollbar-hide">
                {preview}
              </div>
            )}
          </div>

          <button 
            onClick={handleTransmute}
            disabled={!sourceText || loading}
            className="w-full py-8 bg-cyan-500 text-[#05070a] rounded-[2rem] font-black uppercase tracking-[0.5em] text-xs hover:bg-cyan-400 transition-all shadow-[0_20px_50px_rgba(0,255,242,0.2)] disabled:opacity-20 disabled:grayscale"
          >
            {loading ? 'Processing...' : 'Transmute to Obsidian'}
          </button>
        </div>

      </div>

      <div className="mt-12 text-white/5 text-[8px] uppercase tracking-[1em] font-bold">
        EndoBrain Workstation | v0.1
      </div>
    </div>
  );
}
