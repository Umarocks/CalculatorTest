import React from 'react';
import { CalculatorButtonProps } from '../types/calculator';

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary',
  className = '' 
}) => {
  const baseClasses = "w-full h-14 rounded-full flex items-center justify-center text-xl font-medium transition-all duration-150 active:scale-95 select-none";
  
  const variantClasses = {
    primary: "bg-gray-700/80 text-white hover:bg-gray-600/90",
    secondary: "bg-gray-500/80 text-white hover:bg-gray-400/90",
    accent: "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700",
    memory: "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CalculatorButton;