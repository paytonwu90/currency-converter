import { useState, useEffect } from 'react'
import axios from 'axios';
import Modal from './components/Modal';
import Calculator from './components/Calculator';

function App() {
  const [fromAmount, setFromAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('JPY');
  const [toCurrency, setToCurrency] = useState('TWD');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  
  const toAmount = parseFloat(fromAmount * exchangeRate).toFixed(3)

  useEffect(() => {
    async function getData() {
      //這一段短短的，不一定要另外獨立成 function
      try {
        const res = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const rate = res.data.rates[toCurrency];
        setExchangeRate(rate);
      } catch (error) {
        console.error('fetch error:', error);
      }
    }

    getData();
  }, [fromCurrency, toCurrency]);

  function swapCurrencies() {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  }

  const openCalculator = () => {
    setShowCalculator(true);
  };

  const closeCalculator = () => {
    setShowCalculator(false);
  };

  const handleCalculatorConfirm = (result) => {
    setFromAmount(result);
    setShowCalculator(false);
  };
  

  return (
    <>
      <h1 className="lg:text-4xl font-bold text-center">Currency Converter</h1>
      <div className="currencyInput relative">
        <select name="fromCurrency" id="fromCurrency" value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
          <option value="JPY">JPY</option>
          <option value="TWD">TWD</option>
        </select>
        <input 
          type="number" 
          value={fromAmount} 
          onChange={e => setFromAmount(e.target.value)}
          onClick={e => {
            // 檢測是否為手機版
            if (window.innerWidth <= 768) {
              e.target.select();
            }
          }}
        />
        <button 
          onClick={openCalculator}
          className="circle-button
            absolute
            -top-10
            right-0
            md:top-1/2
            md:-right-10
            md:-translate-y-1/2
            "
          title="開啟計算機"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2m0 2v16h16V4H4m2 2h2v2H6V6m0 3h2v2H6V9m0 3h2v2H6v-2m3-6h2v2H9V6m0 3h2v2H9V9m0 3h2v2H9v-2m3-6h6v6h-6V6m0 7h6v6h-6v-6z"/>
          </svg>
        </button>
      </div>

      <div className="middle">
        <button className="circle-button rotate-90" onClick={swapCurrencies} title='切換貨幣'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z"
              fill="currentColor" />
          </svg>
        </button>
        <div className="exchangeRate">1 {fromCurrency} = {exchangeRate} {toCurrency}</div>
      </div>

      <div className="currencyInput">
        <select name="toCurrency" id="toCurrency" value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
          <option value="JPY">JPY</option>
          <option value="TWD">TWD</option>
        </select>
        <input 
          type="text" 
          value={toAmount}
          readOnly 
        />
      </div>

      <footer className="absolute bottom-0 right-0 text-sm text-[#5f5f5f]">
        UI inspired by{' '}
        <a 
          href="https://codepen.io/FlorinPop17/pen/oNNYWxK" 
          target="_blank" 
          rel="noreferrer"
        >
          this CodePen project
        </a>.
      </footer>

      <Modal isOpen={showCalculator} onClose={closeCalculator}>
        <Calculator 
          initialValue={fromAmount.toString()}
          onConfirm={handleCalculatorConfirm}
          onClose={closeCalculator}
        />
      </Modal>
    </>
  );
}

export default App
