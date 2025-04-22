import React, { useEffect, useState } from 'react';
import Calculator from './components/Calculator';

function App() {
  const [mounted, setMounted] = useState(false);

  // Add mounting animation
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <div 
        className={`transform transition-all duration-700 ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Calc
          </span>
          <span className="text-white">ulator</span>
        </h1>
        
        <Calculator />
        
        <p className="text-gray-500 text-center text-xs mt-8">
          © 2025 Calculator App • Built with React & TypeScript
        </p>
      </div>
    </div>
  );
}

export default App;