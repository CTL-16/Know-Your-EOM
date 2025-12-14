import React from 'react';
import { Card as CardType, EyeSide, MuscleData, MuscleId } from '../types';
import EyeGraphic from './EyeGraphic';

interface CardProps {
  card: CardType;
  muscleInfo: MuscleData;
  eyeSide: EyeSide;
  onClick: (card: CardType) => void;
}

const Card: React.FC<CardProps> = ({ card, muscleInfo, eyeSide, onClick }) => {
  const handleClick = () => {
    if (!card.isFlipped && !card.isMatched) {
      onClick(card);
    }
  };

  return (
    <div 
      className="relative w-full perspective-1000 cursor-pointer group"
      onClick={handleClick}
    >
      {/* 
         Robust Aspect Ratio Fix: 
         Using padding-top 100% forces the container to be a square based on width,
         preventing the "slit" (0 height) issue if browser support for aspect-ratio is lacking.
      */}
      <div className="pt-[100%]"></div>

      <div 
        className={`absolute inset-0 transform-style-3d transition-all duration-500 shadow-md rounded-xl ${card.isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Card Back (Face Down) */}
        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl border-2 border-slate-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-400 opacity-50">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        {/* Card Front (Face Up) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-xl border-2 border-indigo-100 flex flex-col items-center justify-center p-2 shadow-lg overflow-hidden">
          {card.isMatched && (
            <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center z-10 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 opacity-40" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </div>
          )}
          
          {card.type === 'text' ? (
            <div className="text-center">
              <span className="block text-2xl font-bold text-slate-800 mb-1">{muscleInfo.id}</span>
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{muscleInfo.name}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
               {/* Show eye animation only when flipped */}
               <EyeGraphic side={eyeSide} muscleId={muscleInfo.id} scale={0.7} />
               <div className="mt-2 text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-2 py-1 rounded-full">
                 Action
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;