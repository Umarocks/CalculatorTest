import React from 'react';
import { CalculationHistoryItem } from '../types/calculator';

interface CalculatorHistoryProps {
  history: CalculationHistoryItem[];
  onUseHistoryItem: (item: CalculationHistoryItem) => void;
  onClose: () => void;
}

const CalculatorHistory: React.FC<CalculatorHistoryProps> = ({ 
  history, 
  onUseHistoryItem,
  onClose
}) => {
  if (history.length === 0) {
    return (
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900/90 backdrop-blur-md rounded-2xl z-10 flex flex-col p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">History</h2>
          <button 
            onClick={onClose}
            className="text-white p-2 hover:bg-gray-700/50 rounded-full"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400">No calculations yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-900/90 backdrop-blur-md rounded-2xl z-10 flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">History</h2>
        <button 
          onClick={onClose}
          className="text-white p-2 hover:bg-gray-700/50 rounded-full"
        >
          ✕
        </button>
      </div>
      <div className="overflow-y-auto flex-1">
        {history.map((item, index) => (
          <div 
            key={item.timestamp} 
            className="mb-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
            onClick={() => onUseHistoryItem(item)}
          >
            <div className="text-gray-400 text-sm mb-1">
              {new Date(item.timestamp).toLocaleTimeString()}
            </div>
            <div className="text-gray-300">
              {item.expression} = <span className="text-white font-medium">{item.result}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalculatorHistory;