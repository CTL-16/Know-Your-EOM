import React, { useEffect, useState } from 'react';
import { EyeSide, MuscleId } from '../types';

interface EyeGraphicProps {
  side: EyeSide;
  muscleId?: MuscleId; // For Game Mode (discrete animations)
  gaze?: { x: number; y: number }; // For Learn Mode (continuous 3D gaze)
  scale?: number;
  showNoseLabel?: boolean; // Optional control for external layout
}

const EyeGraphic: React.FC<EyeGraphicProps> = ({ 
  side, 
  muscleId, 
  gaze, 
  scale = 1,
  showNoseLabel = true
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Priority: Gaze prop (Learn Mode) > MuscleId prop (Game Mode)
    
    if (gaze) {
      // Map -1 to 1 gaze coordinates to degrees (max +/- 35 degrees)
      // Coordinate System:
      // x=1  -> Screen Right (Viewer Right). CSS rotateY(positive).
      // x=-1 -> Screen Left (Viewer Left). CSS rotateY(negative).
      // y=1  -> Screen Down. CSS rotateX(negative).
      // y=-1 -> Screen Up. CSS rotateX(positive).
      
      setRotation({ 
        x: -gaze.y * 35, 
        y: gaze.x * 35
      });
      return;
    }

    if (!muscleId) {
      setRotation({ x: 0, y: 0 });
      return;
    }

    // Game Mode Logic (Discrete Muscle Actions)
    // Right Eye (OD) is on Viewer Left.
    // Left Eye (OS) is on Viewer Right.
    // CSS rotateY(positive) = Look Right. rotateY(negative) = Look Left.
    // CSS rotateX(positive) = Look Up. rotateX(negative) = Look Down.

    let xDeg = 0;
    let yDeg = 0;
    const mag = 30; // Degree of rotation

    if (side === 'right') { // OD
        switch (muscleId) {
            case MuscleId.MR: yDeg = mag; break; // Adduction (In) -> Looks Viewer Right
            case MuscleId.LR: yDeg = -mag; break; // Abduction (Out) -> Looks Viewer Left
            case MuscleId.SR: xDeg = mag; break; // Up -> CSS rotateX positive
            case MuscleId.IR: xDeg = -mag; break; // Down -> CSS rotateX negative
            case MuscleId.SO: xDeg = -mag; yDeg = -mag; break; // Down & Out (Viewer Left)
            case MuscleId.IO: xDeg = mag; yDeg = -mag; break; // Up & Out (Viewer Left)
        }
    } else { // OS
        switch (muscleId) {
            case MuscleId.MR: yDeg = -mag; break; // Adduction (In) -> Looks Viewer Left
            case MuscleId.LR: yDeg = mag; break; // Abduction (Out) -> Looks Viewer Right
            case MuscleId.SR: xDeg = mag; break; // Up
            case MuscleId.IR: xDeg = -mag; break; // Down
            case MuscleId.SO: xDeg = -mag; yDeg = mag; break; // Down & Out (Viewer Right)
            case MuscleId.IO: xDeg = mag; yDeg = mag; break; // Up & Out (Viewer Right)
        }
    }
    
    // Note: The switch case above uses standard anatomical action directions relative to the eye's primary position.
    // Game Mode simplifies 'Up' to just pure elevation for SR/IO distinction, 
    // but here we align visual rotation to match the "Look" direction.

    setRotation({ x: xDeg, y: yDeg });
  }, [muscleId, side, gaze]);

  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ transform: `scale(${scale})` }}
    >
      {/* Nose Bridge Indicator (Optional internal label) */}
      {showNoseLabel && (
        <div className={`absolute top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-widest pointer-events-none 
          ${side === 'right' ? '-right-16' : '-left-16'}`}>
          Nose
          {/* Arrow pointing to nose */}
          <span className="block text-center text-lg leading-3">
             {side === 'right' ? '←' : '→'}
          </span>
        </div>
      )}

      {/* Sclera (Eyeball) - Static Container / Mask */}
      <div className="w-24 h-24 bg-white rounded-full shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden relative flex items-center justify-center">
        
        {/* Veins / Texture (Static on surface) */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cGF0aCBkPSJNMTAgMTBRMjAgNDAgNDAgMTB6IiBzdHJva2U9InJlZCIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==')] bg-cover"></div>

        {/* The Rotating Globe (Inner Pivot) */}
        {/* This div rotates in 3D, moving the Iris child along the arc */}
        <div 
           className="w-full h-full absolute inset-0 preserve-3d transition-transform duration-500 ease-out"
           style={{ 
             transformStyle: 'preserve-3d', 
             transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
           }}
        >
            {/* Iris - Positioned on the surface of the sphere (radius ~48px, slightly less to tuck in) */}
            <div 
              className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 border border-blue-800 shadow-sm flex items-center justify-center backface-hidden"
              style={{
                transform: `translateZ(42px)` // Push out to surface
              }}
            >
              {/* Pupil */}
              <div className="w-5 h-5 bg-black rounded-full shadow-inner relative">
                  {/* Specular Highlight */}
                  <div className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-white rounded-full opacity-90 filter blur-[0.5px]"></div>
              </div>
            </div>
        </div>

        {/* Lighting Overlay (Static Reflection) */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-white/40 pointer-events-none"></div>
      </div>
      
      {/* Eyelids (Stationary overlay) */}
      <div className="absolute -top-1 w-28 h-8 bg-gradient-to-b from-slate-200 to-transparent rounded-[50%] opacity-20 pointer-events-none"></div>
    </div>
  );
};

export default EyeGraphic;