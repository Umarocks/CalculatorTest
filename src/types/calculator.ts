export type Operation = '+' | '-' | '×' | '÷' | '=' | '%' | 'sqrt' | 'x²';

export interface CalculationHistoryItem {
  expression: string;
  result: string;
  timestamp: number;
}

export type MemoryAction = 'M+' | 'M-' | 'MR' | 'MC';

export interface CalculatorButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'memory';
  className?: string;
}