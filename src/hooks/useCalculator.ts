import { useState, useCallback, useEffect } from 'react';
import { Operation, CalculationHistoryItem, MemoryAction } from '../types/calculator';

export const useCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState<number>(0);
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        inputDigit(e.key);
      } else if (e.key === '.') {
        inputDot();
      } else if (e.key === '+') {
        performOperation('+');
      } else if (e.key === '-') {
        performOperation('-');
      } else if (e.key === '*') {
        performOperation('×');
      } else if (e.key === '/') {
        performOperation('÷');
      } else if (e.key === '%') {
        performOperation('%');
      } else if (e.key === 'Enter' || e.key === '=') {
        performOperation('=');
      } else if (e.key === 'Backspace') {
        clearLastChar();
      } else if (e.key === 'Escape') {
        clearAll();
      } 
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [display, operation, previousValue, waitingForOperand]);

  const inputDigit = useCallback((digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  }, [display, waitingForOperand]);

  const inputDot = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  const clearLastChar = useCallback(() => {
    if (display.length > 1) {
      setDisplay(display.substring(0, display.length - 1));
    } else {
      setDisplay('0');
    }
  }, [display]);

  const clearDisplay = useCallback(() => {
    setDisplay('0');
  }, []);

  const clearAll = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const addToHistory = (expression: string, result: string) => {
    const newItem: CalculationHistoryItem = {
      expression,
      result,
      timestamp: Date.now()
    };
    setHistory(prev => [newItem, ...prev].slice(0, 10)); // Keep only last 10 calculations
  };

  const handleMemory = useCallback((action: MemoryAction) => {
    const currentValue = parseFloat(display);
    
    switch (action) {
      case 'M+':
        setMemory(memory + currentValue);
        setWaitingForOperand(true);
        break;
      case 'M-':
        setMemory(memory - currentValue);
        setWaitingForOperand(true);
        break;
      case 'MR':
        setDisplay(memory.toString());
        setWaitingForOperand(true);
        break;
      case 'MC':
        setMemory(0);
        break;
    }
  }, [display, memory]);

  const performOperation = useCallback((nextOperation: Operation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(display);
      setOperation(nextOperation);
      setWaitingForOperand(true);
      return;
    }

    const previousValueFloat = parseFloat(previousValue);
    let newValue: number;
    let expressionStr = '';

    if (operation === '+') {
      newValue = previousValueFloat + inputValue;
      expressionStr = `${previousValueFloat} + ${inputValue}`;
    } else if (operation === '-') {
      newValue = previousValueFloat - inputValue;
      expressionStr = `${previousValueFloat} - ${inputValue}`;
    } else if (operation === '×') {
      newValue = previousValueFloat * inputValue;
      expressionStr = `${previousValueFloat} × ${inputValue}`;
    } else if (operation === '÷') {
      newValue = previousValueFloat / inputValue;
      expressionStr = `${previousValueFloat} ÷ ${inputValue}`;
    } else if (operation === '%') {
      newValue = previousValueFloat * (inputValue / 100);
      expressionStr = `${previousValueFloat} % ${inputValue}`;
    } else {
      newValue = inputValue;
      expressionStr = `${inputValue}`;
    }

    // Handle special operations that don't need a second operand
    if (nextOperation === 'sqrt') {
      newValue = Math.sqrt(inputValue);
      expressionStr = `√(${inputValue})`;
      addToHistory(expressionStr, newValue.toString());
      setDisplay(newValue.toString());
      setWaitingForOperand(true);
      return;
    } else if (nextOperation === 'x²') {
      newValue = Math.pow(inputValue, 2);
      expressionStr = `${inputValue}²`;
      addToHistory(expressionStr, newValue.toString());
      setDisplay(newValue.toString());
      setWaitingForOperand(true);
      return;
    }

    if (nextOperation === '=') {
      addToHistory(expressionStr, newValue.toString());
    }

    setDisplay(newValue.toString());
    setPreviousValue(nextOperation === '=' ? null : newValue.toString());
    setOperation(nextOperation === '=' ? null : nextOperation);
    setWaitingForOperand(true);
  }, [display, operation, previousValue]);

  const toggleHistory = useCallback(() => {
    setShowHistory(!showHistory);
  }, [showHistory]);

  const useHistoryItem = useCallback((item: CalculationHistoryItem) => {
    setDisplay(item.result);
    setWaitingForOperand(true);
    setShowHistory(false);
  }, []);

  return {
    display,
    inputDigit,
    inputDot,
    clearLastChar,
    clearDisplay,
    clearAll,
    performOperation,
    handleMemory,
    memory,
    history,
    showHistory,
    toggleHistory,
    useHistoryItem
  };
};