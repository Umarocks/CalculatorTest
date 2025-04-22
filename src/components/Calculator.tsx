import React from 'react';
import { useCalculator } from '../hooks/useCalculator';
import CalculatorButton from './CalculatorButton';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorHistory from './CalculatorHistory';
import { ClockIcon } from 'lucide-react';

const Calculator: React.FC = () => {
  const {
    display,
    inputDigit,
    inputDot,
    clearLastChar,
    clearAll,
    performOperation,
    handleMemory,
    memory,
    history,
    showHistory,
    toggleHistory,
    useHistoryItem
  } = useCalculator();

  return (
    <div className="relative max-w-sm w-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-5 rounded-3xl shadow-xl backdrop-blur-lg border border-gray-700/50">
      {showHistory && (
        <CalculatorHistory 
          history={history} 
          onUseHistoryItem={useHistoryItem} 
          onClose={toggleHistory} 
        />
      )}
      
      <div className="flex justify-between items-center mb-3">
        <div className="text-gray-400 text-sm">
          {memory !== 0 && <span className="mr-2 px-2 py-1 bg-purple-800/40 rounded-full text-purple-300">M</span>}
        </div>
        <button 
          onClick={toggleHistory} 
          className="text-gray-400 hover:text-white transition-colors p-2"
        >
          <ClockIcon size={18} />
        </button>
      </div>
      
      <CalculatorDisplay value={display} />
      
      <div className="grid grid-cols-4 gap-3">
        {/* First row */}
        <CalculatorButton label="AC" onClick={clearAll} variant="danger" />
        <CalculatorButton label="C" onClick={clearLastChar} variant="secondary" />
        <CalculatorButton label="%" onClick={() => performOperation('%')} variant="secondary" />
        <CalculatorButton label="÷" onClick={() => performOperation('÷')} variant="accent" />
        
        {/* Second row */}
        <CalculatorButton label="7" onClick={() => inputDigit('7')} />
        <CalculatorButton label="8" onClick={() => inputDigit('8')} />
        <CalculatorButton label="9" onClick={() => inputDigit('9')} />
        <CalculatorButton label="×" onClick={() => performOperation('×')} variant="accent" />
        
        {/* Third row */}
        <CalculatorButton label="4" onClick={() => inputDigit('4')} />
        <CalculatorButton label="5" onClick={() => inputDigit('5')} />
        <CalculatorButton label="6" onClick={() => inputDigit('6')} />
        <CalculatorButton label="-" onClick={() => performOperation('-')} variant="accent" />
        
        {/* Fourth row */}
        <CalculatorButton label="1" onClick={() => inputDigit('1')} />
        <CalculatorButton label="2" onClick={() => inputDigit('2')} />
        <CalculatorButton label="3" onClick={() => inputDigit('3')} />
        <CalculatorButton label="+" onClick={() => performOperation('+')} variant="accent" />
        
        {/* Fifth row */}
        <CalculatorButton label="0" onClick={() => inputDigit('0')} className="col-span-2" />
        <CalculatorButton label="." onClick={inputDot} />
        <CalculatorButton label="=" onClick={() => performOperation('=')} variant="accent" />
      </div>
      
      {/* Memory and Advanced functions */}
      <div className="grid grid-cols-4 gap-3 mt-3">
        <CalculatorButton label="MC" onClick={() => handleMemory('MC')} variant="memory" />
        <CalculatorButton label="MR" onClick={() => handleMemory('MR')} variant="memory" />
        <CalculatorButton label="M-" onClick={() => handleMemory('M-')} variant="memory" />
        <CalculatorButton label="M+" onClick={() => handleMemory('M+')} variant="memory" />
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-3">
        <CalculatorButton label="√x" onClick={() => performOperation('sqrt')} variant="secondary" />
        <CalculatorButton label="x²" onClick={() => performOperation('x²')} variant="secondary" />
      </div>
    </div>
  );
};

export default Calculator;