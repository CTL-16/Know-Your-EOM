import React, { useState } from 'react';
import EyeGraphic from './EyeGraphic';

const LearnView: React.FC = () => {
  // Gaze coordinates: x (-1 to 1), y (-1 to 1)
  const [gaze, setGaze] = useState({ x: 0, y: 0 });
  const [activeDirectionLabel, setActiveDirectionLabel] = useState("Primary Position");

  // Helper to determine active muscles based on gaze
  const getActiveMuscles = (x: number, y: number) => {
    if (x === 0 && y === 0) return { od: "None (Primary)", os: "None (Primary)" };
    
    // Simple logic for the 8 cardinal directions
    if (x === 1 && y === 0) return { od: "Lateral Rectus", os: "Medial Rectus" }; // Right
    if (x === -1 && y === 0) return { od: "Medial Rectus", os: "Lateral Rectus" }; // Left
    if (x === 0 && y === -1) return { od: "Sup. Rectus / Inf. Oblique", os: "Sup. Rectus / Inf. Oblique" }; // Up
    if (x === 0 && y === 1) return { od: "Inf. Rectus / Sup. Oblique", os: "Inf. Rectus / Sup. Oblique" }; // Down
    
    if (x === 1 && y === -1) return { od: "Superior Rectus", os: "Inferior Oblique" }; // Up-Right
    if (x === -1 && y === -1) return { od: "Inferior Oblique", os: "Superior Rectus" }; // Up-Left
    if (x === 1 && y === 1) return { od: "Inferior Rectus", os: "Superior Oblique" }; // Down-Right
    if (x === -1 && y === 1) return { od: "Superior Oblique", os: "Inferior Rectus" }; // Down-Left
    
    return { od: "-", os: "-" };
  };

  const handleGaze = (x: number, y: number, label: string) => {
    setGaze({ x, y });
    setActiveDirectionLabel(label);
  };

  const activeMuscles = getActiveMuscles(gaze.x, gaze.y);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 animate-fade-in pb-20">
      
      {/* Introduction Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-lg">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-700">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
             </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Binocular Vision & EOM</h2>
        </div>
        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
          <p className="mb-4">
            The six extraocular muscles (EOM) do not work in isolation. To maintain single binocular vision, the eyes must move in perfect coordination. This simultaneous movement is governed by key physiological laws.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2">Hering's Law of Equal Innervation</h3>
              <p className="text-sm">
                States that yoked muscles (contralateral synergists) receive equal and simultaneous innervation. 
                <br/><br/>
                <span className="italic text-blue-800">Example: When looking right, the Right Lateral Rectus and Left Medial Rectus are stimulated equally.</span>
              </p>
            </div>
            <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
              <h3 className="font-bold text-purple-900 mb-2">Sherrington's Law of Reciprocal Innervation</h3>
              <p className="text-sm">
                States that when an agonist muscle contracts, its direct antagonist relaxes (is inhibited).
                <br/><br/>
                <span className="italic text-purple-800">Example: When the Medial Rectus contracts to look in, the Lateral Rectus of the same eye relaxes.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section className="grid lg:grid-cols-3 gap-6">
        
        {/* Left: Controls */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold text-slate-700 mb-6 uppercase tracking-wider">Gaze Control</h3>
            
            <div className="grid grid-cols-3 gap-2 p-4 bg-slate-50 rounded-full shadow-inner border border-slate-200">
                {/* Top Row */}
                <button onClick={() => handleGaze(-1, -1, "Levoelevation")} className="w-12 h-12 rounded-full bg-white shadow-sm hover:bg-blue-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all">↖</button>
                <button onClick={() => handleGaze(0, -1, "Elevation")} className="w-12 h-12 rounded-full bg-white shadow-sm hover:bg-blue-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all">↑</button>
                <button onClick={() => handleGaze(1, -1, "Dextroelevation")} className="w-12 h-12 rounded-full bg-white shadow-sm hover:bg-blue-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all">↗</button>
                
                {/* Middle Row */}
                <button onClick={() => handleGaze(-1, 0, "Levoversion")} className="w-12 h-12 rounded-full bg-white shadow-sm hover:bg-blue-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all">←</button>
                <button onClick={() => handleGaze(0, 0, "Primary Position")} className="w-12 h-12 rounded-full bg-blue-600 shadow-md border border-blue-700 flex items-center justify-center text-white font-bold transition-all transform active:scale-95">●</button>
                <button onClick={() => handleGaze(1, 0, "Dextroversion")} className="w-12 h-12 rounded-full bg-white shadow-sm hover:bg-blue-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all">→</button>
                
                {/* Bottom Row */}
                <button onClick={() => handleGaze(-1, 1, "Levodepression")} className="w-12 h-12 rounded-full bg-white shadow-sm hover:bg-blue-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all">↙</button>
                <button onClick={() => handleGaze(0, 1, "Depression")} className="w-12 h-12 rounded-full bg-white shadow-sm hover:bg-blue-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all">↓</button>
                <button onClick={() => handleGaze(1, 1, "Dextrodepression")} className="w-12 h-12 rounded-full bg-white shadow-sm hover:bg-blue-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all">↘</button>
            </div>
            
            <div className="mt-6 text-center">
                <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1">Current Action</div>
                <div className="text-xl font-bold text-blue-600">{activeDirectionLabel}</div>
            </div>
        </div>

        {/* Center/Right: Simulation Display */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl shadow-xl overflow-hidden relative flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            
            {/* 3D Scene Container */}
            <div className="flex-1 min-h-[300px] flex items-center justify-center gap-8 perspective-1000 relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-900">
                
                {/* Right Eye (OD) */}
                <div className="flex flex-col items-center gap-4">
                    <EyeGraphic side="right" gaze={gaze} scale={1.2} />
                    <span className="text-white/50 text-sm font-mono tracking-widest">OD (Right)</span>
                </div>

                {/* Left Eye (OS) */}
                <div className="flex flex-col items-center gap-4">
                    <EyeGraphic side="left" gaze={gaze} scale={1.2} />
                    <span className="text-white/50 text-sm font-mono tracking-widest">OS (Left)</span>
                </div>

            </div>

            {/* Muscle Data Bar */}
            <div className="bg-slate-800 p-4 border-t border-slate-700">
                <h4 className="text-xs text-slate-400 uppercase font-bold mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Primary Agonist Muscles (Hering's Law Pairs)
                </h4>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
                        <span className="text-xs text-slate-400 block mb-1">Right Eye (OD)</span>
                        <span className="text-green-300 font-semibold">{activeMuscles.od}</span>
                    </div>
                    <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
                        <span className="text-xs text-slate-400 block mb-1">Left Eye (OS)</span>
                        <span className="text-green-300 font-semibold">{activeMuscles.os}</span>
                    </div>
                </div>
            </div>
        </div>

      </section>
    </div>
  );
};

export default LearnView;