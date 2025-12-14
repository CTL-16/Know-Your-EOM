import React, { useEffect, useState } from 'react';
import { EyeSide, MuscleId } from '../types';

interface EyeGraphicProps {
  side: EyeSide;
  muscleId?: MuscleId; // For Game Mode (discrete animations)
  gaze?: { x: number; y: number }; // For Learn Mode (continuous 3D gaze)
  scale?: number;
}

const EyeGraphic: React.FC<EyeGraphicProps> = ({ side, muscleId, gaze, scale = 1 }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Priority: Gaze prop (Learn Mode) > MuscleId prop (Game Mode)
    
    if (gaze) {
      // Map -1 to 1 gaze coordinates to degrees (max +/- 30 degrees)
      setRotation({ 
        x: -gaze.y * 30, // Up/Down rotates around X axis (inverted)
        y: gaze.x * 30   // Left/Right rotates around Y axis
      });
      return;
    }

    if (!muscleId) {
      setRotation({ x: 0, y: 0 });
      return;
    }

    // Game Mode Logic (Discrete Muscle Actions)
    // Right Eye (OD): Nose is Left. Inward = Left (-Y rotation).
    // Left Eye (OS): Nose is Right. Inward = Right (+Y rotation).

    let xDeg = 0;
    let yDeg = 0;
    const mag = 25; // Degree of rotation

    switch (muscleId) {
      case MuscleId.MR: // Inward (Adduction)
        yDeg = side === 'right' ? -mag : mag;
        break;
      case MuscleId.LR: // Outward (Abduction)
        yDeg = side === 'right' ? mag : -mag;
        break;
      case MuscleId.SR: // Upward
        xDeg = -mag;
        break;
      case MuscleId.IR: // Downward
        xDeg = mag;
        break;
      case MuscleId.SO: // Down & Out
        xDeg = mag;
        yDeg = side === 'right' ? mag : -mag;
        break;
      case MuscleId.IO: // Up & Out
        xDeg = -mag;
        yDeg = side === 'right' ? mag : -mag;
        break;
    }

    setRotation({ x: xDeg, y: yDeg });
  }, [muscleId, side, gaze]);

  return (
    <div 
      className="relative flex items-center justify-center perspective-1000"
      style={{ transform: `scale(${scale})` }}
    >
      {/* Nose Bridge Indicator */}
      <div className={`absolute top-1/2 -translate-y-1/2 text-xs font-bold text-slate-300 uppercase tracking-widest pointer-events-none ${side === 'right' ? '-left-14' : '-right-14'}`}>
        Nose
      </div>

      {/* Sclera (Eyeball) - 3D Container */}
      <div 
        className="w-24 h-24 bg-white rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.2),inset_5px_5px_10px_rgba(255,255,255,1)] border border-slate-200 overflow-hidden relative flex items-center justify-center transform-style-3d transition-transform duration-700 ease-out"
        style={{ 
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* Veins (Subtle texture) */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cGF0aCBkPSJNMTAgMTBRMjAgNDAgNDAgMTB6IiBzdHJva2U9InJlZCIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==')] bg-cover"></div>

        {/* Iris */}
        <div 
          className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 border border-blue-800 shadow-md flex items-center justify-center transform-style-3d translate-z-2"
        >
          {/* Pupil */}
          <div className="w-5 h-5 bg-black rounded-full shadow-inner relative">
              {/* Specular Highlight (Reflection) */}
              <div className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-white rounded-full opacity-90 filter blur-[0.5px]"></div>
          </div>
        </div>
      </div>
      
      {/* Eyelids (Stationary overlay) to enhance depth */}
      <div className="absolute -top-1 w-28 h-8 bg-gradient-to-b from-slate-200 to-transparent rounded-[50%] opacity-20 pointer-events-none"></div>
    </div>
  );
};

export default EyeGraphic;