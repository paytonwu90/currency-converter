import { useState } from 'react';
import { calculate } from '../utils/calculator';

function Calculator({ initialValue, onConfirm, onClose }) {
  const [currentValue, setCurrentValue] = useState(initialValue || '0');
  const [previousValue, setPreviousValue] = useState('');
  const [operation, setOperation] = useState('');
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [expression, setExpression] = useState('');

  const inputNumber = (num) => {
    let newValue;
    if (waitingForNewValue) {
      newValue = num;
      setCurrentValue(num);
      setWaitingForNewValue(false);
    } else {
      newValue = currentValue === '0' ? num : currentValue + num;
      setCurrentValue(newValue);
    }
    
    // 更新表達式顯示
    if (operation) {
      setExpression(`${previousValue} ${operation} ${newValue}`);
    } else {
      setExpression(newValue);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setCurrentValue('0.');
      setWaitingForNewValue(false);
      setExpression('0.');
    } else if (currentValue.indexOf('.') === -1) {
      setCurrentValue(currentValue + '.');
      setExpression(expression + '.');
    }
  };

  const clear = () => {
    setCurrentValue('0');
    setPreviousValue('');
    setOperation('');
    setWaitingForNewValue(false);
    setExpression('');
  };

  const deleteLastDigit = () => {
    if (currentValue.length > 1) {
      const newValue = currentValue.slice(0, -1);
      setCurrentValue(newValue);
      setExpression(expression.slice(0, -1));
    } else {
      setCurrentValue('0');
      setExpression(operation ? `${previousValue} ${operation}` : '');
    }
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(currentValue);

    if (previousValue === '') {
      setPreviousValue(currentValue);
      setExpression(`${currentValue} ${nextOperation}`);
    } else if (operation) {
      const prevVal = parseFloat(previousValue);
      const newValue = calculate(prevVal, inputValue, operation);

      setCurrentValue(String(newValue));
      setPreviousValue(String(newValue));
      setExpression(`${newValue} ${nextOperation}`);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(currentValue);

    if (previousValue !== '' && operation) {
      const prevVal = parseFloat(previousValue);
      const newValue = calculate(prevVal, inputValue, operation);

      setCurrentValue(String(newValue));
      setPreviousValue('');
      setOperation('');
      setWaitingForNewValue(true);
      setExpression(String(newValue));
    }
  };

  const handleConfirm = () => {
    let result = parseFloat(currentValue);
    
    // 如果還有未完成的運算，先計算出結果
    if (previousValue !== '' && operation) {
      const prevVal = parseFloat(previousValue);
      result = calculate(prevVal, parseFloat(currentValue), operation);
    }
    
    onConfirm(result);
  };

  return (
    <div className="calculator">
      <div className="mb-4">
        <div className="bg-gray-100 p-4 rounded text-right text-2xl font-mono min-h-[60px] flex items-center justify-end">
          {expression || currentValue}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 text-xl">
        {/* 第一行 */}
        <button 
          onClick={clear}
          className="col-span-2 bg-red-500 text-white p-4 rounded hover:bg-red-600 active:bg-red-700 transition-colors"
        >
          AC
        </button>
        <button 
          onClick={deleteLastDigit}
          className="bg-orange-500 text-white p-4 rounded hover:bg-orange-600 active:bg-orange-700 transition-colors"
        >
          DEL
        </button>
        <button 
          onClick={() => performOperation('/')}
          className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600 active:bg-blue-700 transition-colors"
        >
          ÷
        </button>

        {/* 數字鍵 7-9 */}
        <button 
          onClick={() => inputNumber('7')}
          className="bg-gray-200 p-4 rounded hover:bg-gray-300 active:bg-gray-400 transition-colors"
        >
          7
        </button>
        <button 
          onClick={() => inputNumber('8')}
          className="bg-gray-200 p-4 rounded hover:bg-gray-300 active:bg-gray-400 transition-colors"
        >
          8
        </button>
        <button 
          onClick={() => inputNumber('9')}
          className="bg-gray-200 p-4 rounded hover:bg-gray-300 active:bg-gray-400 transition-colors"
        >
          9
        </button>
        <button 
          onClick={() => performOperation('*')}
          className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600 active:bg-blue-700 transition-colors"
        >
          ×
        </button>

        {/* 數字鍵 4-6 */}
        <button 
          onClick={() => inputNumber('4')}
          className="bg-gray-200 p-4 rounded hover:bg-gray-300 active:bg-gray-400 transition-colors"
        >
          4
        </button>
        <button 
          onClick={() => inputNumber('5')}
          className="bg-gray-200 p-4 rounded hover:bg-gray-300 active:bg-gray-400 transition-colors"
        >
          5
        </button>
        <button 
          onClick={() => inputNumber('6')}
          className="bg-gray-200 p-4 rounded hover:bg-gray-300 active:bg-gray-400 transition-colors"
        >
          6
        </button>
        <button 
          onClick={() => performOperation('-')}
          className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600 active:bg-blue-700 transition-colors"
        >
          −
        </button>

        {/* 數字鍵 1-3 */}
        <button 
          onClick={() => inputNumber('1')}
          className="bg-gray-200 p-4 rounded hover:bg-gray-300 active:bg-gray-400 transition-colors"
        >
          1
        </button>
        <button 
          onClick={() => inputNumber('2')}
          className="bg-gray-200 p-4 rounded hover:bg-gray-300 active:bg-gray-400 transition-colors"
        >
          2
        </button>
        <button 
          onClick={() => inputNumber('3')}
          className="bg-gray-200 p-4 rounded hover:bg-gray-300 active:bg-gray-400 transition-colors"
        >
          3
        </button>
        <button 
          onClick={() => performOperation('+')}
          className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600 active:bg-blue-700 transition-colors"
        >
          +
        </button>

        {/* 最後一行 */}
        <button 
          onClick={() => inputNumber('0')}
          className="col-span-2 bg-gray-200 p-4 rounded hover:bg-gray-300 transition-colors"
        >
          0
        </button>
        <button 
          onClick={inputDecimal}
          className="bg-gray-200 p-4 rounded hover:bg-gray-300 active:bg-gray-400 transition-colors"
        >
          .
        </button>
        <button 
          onClick={handleEquals}
          className="bg-green-500 text-white p-4 rounded hover:bg-green-600 active:bg-green-700 transition-colors"
        >
          =
        </button>

        {/* 確認和取消按鈕 */}
        <button 
          onClick={onClose}
          className="col-span-2 bg-gray-500 text-white p-4 rounded hover:bg-gray-600 active:bg-gray-700 transition-colors mt-2"
        >
          取消
        </button>
        <button 
          onClick={handleConfirm}
          className="col-span-2 bg-green-600 text-white p-4 rounded hover:bg-green-700 active:bg-green-800 transition-colors mt-2"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default Calculator;
