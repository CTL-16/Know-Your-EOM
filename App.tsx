import React, { useState } from 'react';
import GameView from './components/GameView';
import LearnView from './components/LearnView';

type Tab = 'learn' | 'test';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('learn');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Global Navigation Header */}
      <header className="bg-white shadow-md border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
               E
             </div>
             <span className="text-slate-800 font-bold text-xl tracking-tight">Know Your EOM</span>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('learn')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'learn' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Learn
            </button>
            <button
              onClick={() => setActiveTab('test')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'test' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Test Yourself
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        {activeTab === 'learn' ? <LearnView /> : <GameView />}
      </main>

      {/* Simple Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 py-6 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} EOM Educational Tool. Optometry Clinical Skills.</p>
      </footer>
    </div>
  );
};

export default App;