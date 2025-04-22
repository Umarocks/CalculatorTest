import React, { useRef, useEffect } from 'react';

interface CalculatorDisplayProps {
  value: string;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ value }) => {
  const displayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (displayRef.current) {
      // Adjust font size based on content length
      const length = value.length;
      let fontSize = '2.5rem';
      
      if (length > 8) fontSize = '2rem';
      if (length > 10) fontSize = '1.75rem';
      if (length > 12) fontSize = '1.5rem';
      
      displayRef.current.style.fontSize = fontSize;
    }
  }, [value]);

  return (
    <div className="w-full bg-gray-900/50 backdrop-blur-md h-24 flex items-end justify-end p-4 rounded-2xl mb-4 overflow-hidden">
      <div 
        ref={displayRef}
        className="font-mono text-4xl text-white transition-all duration-200 tracking-wider"
      >
        {value}
      </div>
    </div>
  );
};

export default CalculatorDisplay;