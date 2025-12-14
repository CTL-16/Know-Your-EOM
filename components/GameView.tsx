import React, { useState, useEffect, useCallback } from 'react';
import { Card as CardType, EyeSide, GameState, MuscleId } from '../types';
import { MUSCLES, INTRO_TEXT } from '../constants';
import Card from './Card';
import EyeGraphic from './EyeGraphic';

const GameView: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    gameWon: false,
    currentEye: 'right', // Default init
    moves: 0,
    timer: 0,
  });

  const [cards, setCards] = useState<CardType[]>([]);
  const [choiceOne, setChoiceOne] = useState<CardType | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState(false);

  // Shuffle and set up cards
  const shuffleCards = useCallback(() => {
    // Randomize Eye for this round
    const randomEye: EyeSide = Math.random() > 0.5 ? 'right' : 'left';
    
    // Create matching pairs
    const visualCards: CardType[] = MUSCLES.map(muscle => ({
      uniqueId: `v-${muscle.id}`,
      muscleId: muscle.id,
      type: 'visual',
      isFlipped: false,
      isMatched: false
    }));
    
    const textCards: CardType[] = MUSCLES.map(muscle => ({
      uniqueId: `t-${muscle.id}`,
      muscleId: muscle.id,
      type: 'text',
      isFlipped: false,
      isMatched: false
    }));

    const allCards = [...visualCards, ...textCards]
      .sort(() => Math.random() - 0.5);

    setCards(allCards);
    setGameState({
      isPlaying: true,
      gameWon: false,
      currentEye: randomEye,
      moves: 0,
      timer: 0,
    });
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  }, []);

  // Handle Card Choice
  const handleChoice = (card: CardType) => {
    if (disabled) return;
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.muscleId === choiceTwo.muscleId) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.muscleId === choiceOne.muscleId) {
              return { ...card, isMatched: true, isFlipped: true };
            }
            return card;
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(prevCards => {
      return prevCards.map(card => {
        if (!card.isMatched && (card.uniqueId === choiceOne?.uniqueId || card.uniqueId === choiceTwo?.uniqueId)) {
          return { ...card, isFlipped: false }; // Flip back
        }
        return card;
      });
    });
    setGameState(prev => ({ ...prev, moves: prev.moves + 1 }));
    setDisabled(false);
  };

  // Flip logic visually
  useEffect(() => {
    if (choiceOne) {
        setCards(prev => prev.map(card => 
            card.uniqueId === choiceOne.uniqueId ? { ...card, isFlipped: true } : card
        ));
    }
    if (choiceTwo) {
        setCards(prev => prev.map(card => 
            card.uniqueId === choiceTwo.uniqueId ? { ...card, isFlipped: true } : card
        ));
    }
  }, [choiceOne, choiceTwo]);

  // Timer
  useEffect(() => {
    let interval: any;
    if (gameState.isPlaying && !gameState.gameWon) {
      interval = setInterval(() => {
        setGameState(prev => ({ ...prev, timer: prev.timer + 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState.isPlaying, gameState.gameWon]);

  // Check Win Condition
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setGameState(prev => ({ ...prev, gameWon: true }));
    }
  }, [cards]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!gameState.isPlaying) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 animate-fade-in">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-indigo-600 p-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Know Your EOM</h1>
            <p className="text-indigo-200 text-lg">Memory Flip Card</p>
          </div>
          <div className="p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 p-3 rounded-full shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">Ready to Test?</h3>
                <p className="text-slate-600 mt-2 leading-relaxed whitespace-pre-line text-sm">{INTRO_TEXT}</p>
              </div>
            </div>
            
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r">
                <div className="flex">
                    <div className="shrink-0">
                        <svg className="h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-amber-700">
                        Match the <span className="font-bold">Muscle Name</span> with the correct <span className="font-bold">Eye Movement animation</span>.
                        </p>
                    </div>
                </div>
            </div>

            <button 
              onClick={shuffleCards}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Exercise
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Game Status Bar */}
      <div className="bg-white shadow-sm border-b border-slate-200 p-4 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-700 hidden sm:block">Test Mode</h2>
            <div className="flex items-center gap-6 sm:gap-8 text-sm font-medium text-slate-600">
             <div className="flex flex-col items-center">
                <span className="text-xs text-slate-400 uppercase">Moves</span>
                <span className="text-lg text-slate-800 leading-none">{gameState.moves}</span>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-xs text-slate-400 uppercase">Time</span>
                <span className="text-lg text-slate-800 leading-none">{formatTime(gameState.timer)}</span>
             </div>
          </div>
          <button 
            onClick={shuffleCards}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Restart
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-6xl mx-auto w-full p-4 flex flex-col md:flex-row gap-6">
        {/* Left Panel: Clinical Context / Instructions */}
        <aside className="md:w-64 shrink-0 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Patient</h2>
            
            <div className="flex flex-col items-center py-2">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-2 relative border-4 border-white shadow-sm">
                     <EyeGraphic side={gameState.currentEye} scale={1.0} />
                </div>
                <div className="text-lg font-bold text-slate-800">
                    {gameState.currentEye === 'right' ? 'Right Eye (OD)' : 'Left Eye (OS)'}
                </div>
            </div>
            
            <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100 text-[11px] text-blue-800 leading-snug">
              Nose is on the <span className="font-bold">{gameState.currentEye === 'right' ? 'LEFT' : 'RIGHT'}</span> side.
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hidden md:block">
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">Muscle Reference</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              {MUSCLES.map(m => (
                <li key={m.id} className="flex justify-between">
                  <span className="font-semibold">{m.id}</span>
                  <span className="text-slate-400 truncate ml-2">{m.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Right Panel: Game Grid */}
        <section className="flex-1">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 w-full mx-auto">
            {cards.map(card => {
                const muscleInfo = MUSCLES.find(m => m.id === card.muscleId)!;
                return (
                    <Card 
                        key={card.uniqueId} 
                        card={card} 
                        muscleInfo={muscleInfo}
                        eyeSide={gameState.currentEye}
                        onClick={handleChoice}
                    />
                );
            })}
          </div>
        </section>
      </div>

      {/* Victory Modal */}
      {gameState.gameWon && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center animate-[bounce_1s_ease-out]">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Excellent Work!</h2>
            <p className="text-slate-600 mb-6">
              You correctly identified all EOM actions for the <span className="font-bold text-indigo-600">{gameState.currentEye === 'right' ? 'Right Eye' : 'Left Eye'}</span>.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-slate-400">Time</div>
                    <div className="font-bold text-slate-800">{formatTime(gameState.timer)}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-slate-400">Moves</div>
                    <div className="font-bold text-slate-800">{gameState.moves}</div>
                </div>
            </div>

            <button 
              onClick={shuffleCards}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-indigo-200"
            >
              Next Patient (Play Again)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameView;