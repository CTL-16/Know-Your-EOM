import React, { useState } from 'react';
import EyeGraphic from './EyeGraphic';

const LearnView: React.FC = () => {
  // Gaze coordinates: x (-1 to 1), y (-1 to 1)
  const [gaze, setGaze] = useState({ x: 0, y: 0 });
  const [activeDirectionLabel, setActiveDirectionLabel] = useState("Primary Position");

  // Helper to determine active muscles based on gaze
  // COORDINATE SYSTEM: 
  // x = 1  -> Screen Right (Viewer Right). This is PATIENT LEFT (Levoversion).
  // x = -1 -> Screen Left (Viewer Left). This is PATIENT RIGHT (Dextroversion).
  // y = -1 -> Screen Up.
  // y = 1  -> Screen Down.
  
  const getActiveMuscles = (x: number, y: number) => {
    if (x === 0 && y === 0) return { od: "None (Primary)", os: "None (Primary)" };
    
    // Screen Right (Patient Left / Levoversion)
    // OD (Viewer Left Eye): Adduction (In) -> Medial Rectus
    // OS (Viewer Right Eye): Abduction (Out) -> Lateral Rectus
    if (x === 1 && y === 0) return { od: "Medial Rectus", os: "Lateral Rectus" }; 

    // Screen Left (Patient Right / Dextroversion)
    // OD (Viewer Left Eye): Abduction (Out) -> Lateral Rectus
    // OS (Viewer Right Eye): Adduction (In) -> Medial Rectus
    if (x === -1 && y === 0) return { od: "Lateral Rectus", os: "Medial Rectus" }; 

    // Up Gaze
    if (x === 0 && y === -1) return { od: "Sup. Rectus / Inf. Oblique", os: "Sup. Rectus / Inf. Oblique" };
    // Down Gaze
    if (x === 0 && y === 1) return { od: "Inf. Rectus / Sup. Oblique", os: "Inf. Rectus / Sup. Oblique" }; 
    
    // Screen Up-Right (Patient Up-Left / Levoelevation)
    // NOTE: User requested interchange for oblique arrows.
    // Swapped: OD uses Superior Rectus, OS uses Inferior Oblique
    if (x === 1 && y === -1) return { od: "Superior Rectus", os: "Inferior Oblique" }; 

    // Screen Up-Left (Patient Up-Right / Dextroelevation)
    // NOTE: User requested interchange for oblique arrows.
    // Swapped: OD uses Inferior Oblique, OS uses Superior Rectus
    if (x === -1 && y === -1) return { od: "Inferior Oblique", os: "Superior Rectus" }; 

    // Screen Down-Right (Patient Down-Left / Levodepression)
    // NOTE: User requested interchange for oblique arrows.
    // Swapped: OD uses Inferior Rectus, OS uses Superior Oblique
    if (x === 1 && y === 1) return { od: "Inferior Rectus", os: "Superior Oblique" }; 

    // Screen Down-Left (Patient Down-Right / Dextrodepression)
    // NOTE: User requested interchange for oblique arrows.
    // Swapped: OD uses Superior Oblique, OS uses Inferior Rectus
    if (x === -1 && y === 1) return { od: "Superior Oblique", os: "Inferior Rectus" }; 
    
    return { od: "-", os: "-" };
  };

  const handleGaze = (x: number, y: number, label: string) => {
    setGaze({ x, y });
    setActiveDirectionLabel(label);
  };

  const activeMuscles = getActiveMuscles(gaze.x, gaze.y);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 animate-fade-in pb-20">
      
      {/* Lecture Notes Section - Based on Chapter 17 PDF */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-indigo-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                Ocular Motor Systems
            </h2>
            <p className="text-indigo-100 mt-2"></p>
        </div>
        
        <div className="p-8 prose prose-slate max-w-none text-slate-600 leading-relaxed">
          
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Six Systems, Two Goals</h3>
            <p className="mb-4">
              The control of eye movements is divided into <strong>six systems</strong>, each with a specific function.
              Despite their complexity, they all share two major goals:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <span className="block font-bold text-indigo-700 mb-1">1. Foveation (Fixation)</span>
                    To bring the image of an object onto the fovea (the center of vision). This is primarily achieved by the <strong>Saccadic</strong> system (fast movements) and maintained by the <strong>Fixation</strong> and <strong>Vergence</strong> systems.
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <span className="block font-bold text-indigo-700 mb-1">2. Image Stabilization</span>
                    To prevent images from slipping on the retina when the head moves. This is the job of the <strong>Vestibulo-ocular</strong>, <strong>Optokinetic</strong>, and <strong>Smooth Pursuit</strong> systems.
                </div>
            </div>
          </div>

          <hr className="my-6 border-slate-100"/>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">Controlling Simultaneous Rotation</h3>
                <p className="mb-4">
                    When an object moves in the world, or when our head moves, our eyes must rotate simultaneously to keep the object seen clearly by both eyes. There are two mechanisms for this:
                </p>
                <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <span className="block font-bold text-slate-800 mb-1">Conjugate Movements (Versions)</span>
                        <p className="text-sm">
                            When an object moves horizontally, vertically, or obliquely in a frontal plane, both eyes must move <strong>simultaneously in the same direction</strong>. 
                        </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <span className="block font-bold text-slate-800 mb-1">Disjunctive Movements (Vergence)</span>
                        <p className="text-sm">
                            When an object moves toward or away from the viewer (in a sagittal plane), the eyes must move in <strong>opposite directions</strong> (converging or diverging) to maintain focus.
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">Laws of Binocular Coordination</h3>
                <p className="mb-4">
                    Historically, researchers like Hering and Helmholtz debated how our two eyes move together. Hering believed that both eyes receive the same signals simultaneously.
                </p>
                <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h4 className="font-bold text-blue-900 text-sm mb-1">Hering's Law of Equal Innervation</h4>
                        <p className="text-xs text-blue-800">
                            Yoked muscles (muscles in each eye that pull in the same direction) receive equal innervation. <br/>
                            <em>Example: For right gaze, the Right Lateral Rectus and Left Medial Rectus are stimulated equally.</em>
                        </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <h4 className="font-bold text-purple-900 text-sm mb-1">Sherrington's Law of Reciprocal Innervation</h4>
                        <p className="text-xs text-purple-800">
                            When a muscle contracts (agonist), its opposing muscle (antagonist) must relax. <br/>
                            <em>Example: When the Medial Rectus contracts to look in, the Lateral Rectus of the same eye is inhibited.</em>
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section className="grid lg:grid-cols-3 gap-6">
        
        {/* Left: Controls */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold text-slate-700 mb-6 uppercase tracking-wider">Binocular Simulator</h3>
            <p className="text-xs text-slate-400 mb-4 text-center">Click arrows to move eyes relative to the screen</p>
            
            <div className="grid grid-cols-3 gap-2 p-4 bg-slate-50 rounded-full shadow-inner border border-slate-200">
                {/* Top Row */}
                <button onClick={() => handleGaze(-1, -1, "Up-Left Gaze")} className="w-12 h-12 rounded-full bg-white shadow-sm hover:bg-blue-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all text-xl">↖</button>
                <button onClick={() => handleGaze(0, -1, "Elevation")} className="w-12 h-12 rounded-full bg-white shadow-sm hover:bg-blue-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all text-xl">↑</button>
                <button onClick={() => handleGaze(1, -1, "Up-Right Gaze")} className="w-12 h-12 rounded-full bg-white shadow-sm hover:bg-blue-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all text-xl">↗</button>
                
                {/* Middle Row */}
                <button onClick={() => handleGaze(-1, 0, "Dextroversion (Right)")} className="w-12 h-12 rounded-full bg-white shadow-sm hover:bg-blue-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all text-xl">←</button>
                <button onClick={() => handleGaze(0, 0, "Primary Position")} className="w-12 h-12 rounded-full bg-blue-600 shadow-md border border-blue-700 flex items-center justify-center text-white font-bold transition-all transform active:scale-95 text-xl">●</button>
                <button onClick={() => handleGaze(1, 0, "Levoversion (Left)")} className="w-12 h-12 rounded-full bg-white shadow-sm hover:bg-blue-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all text-xl">→</button>
                
                {/* Bottom Row */}
                <button onClick={() => handleGaze(-1, 1, "Down-Left Gaze")} className="w-12 h-12 rounded-full bg-white shadow-sm hover:bg-blue-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all text-xl">↙</button>
                <button onClick={() => handleGaze(0, 1, "Depression")} className="w-12 h-12 rounded-full bg-white shadow-sm hover:bg-blue-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all text-xl">↓</button>
                <button onClick={() => handleGaze(1, 1, "Down-Right Gaze")} className="w-12 h-12 rounded-full bg-white shadow-sm hover:bg-blue-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all text-xl">↘</button>
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
            <div className="flex-1 min-h-[300px] flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-900">
                
                <div className="flex items-center justify-center gap-8 perspective-1000">
                  {/* Right Eye (OD) - Placed on the LEFT of the viewer (Clinical View) */}
                  <div className="flex flex-col items-center gap-4">
                      <EyeGraphic side="right" gaze={gaze} scale={1.2} showNoseLabel={false} />
                      <span className="text-white/50 text-sm font-mono tracking-widest">OD (Right Eye)</span>
                  </div>

                  {/* Central Nose Bridge */}
                  <div className="flex flex-col items-center justify-center h-24">
                      <div className="w-1 h-12 bg-slate-700 rounded-full mb-1"></div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nose</div>
                      <div className="w-8 h-20 border-t-4 border-l-4 border-r-4 border-slate-700/50 rounded-t-3xl mt-2"></div>
                  </div>

                  {/* Left Eye (OS) - Placed on the RIGHT of the viewer (Clinical View) */}
                  <div className="flex flex-col items-center gap-4">
                      <EyeGraphic side="left" gaze={gaze} scale={1.2} showNoseLabel={false} />
                      <span className="text-white/50 text-sm font-mono tracking-widest">OS (Left Eye)</span>
                  </div>
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