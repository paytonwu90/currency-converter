import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import CurrencyInput from './components/CurrencyInput';


function App() {
  const [fromAmount, setFromAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('JPY');
  const [toAmount, setToAmount] = useState(0);
  const [toCurrency, setToCurrency] = useState('TWD');
  const [exchangeRate, setExchangeRate] = useState(0);
  

  useEffect(() => {
    async function getData() {
      //這一段短短的，不一定要另外獨立成 function
      try {
        const res = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const rate = res.data.rates[toCurrency];
        setExchangeRate(rate);
        setToAmount(parseFloat(fromAmount * rate).toFixed(3));
      } catch (error) {
        console.error('fetch error:', err);
      }
    }

    getData();
  }, [fromCurrency, toCurrency]);

  function swapCurrencies() {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  }
  

  return (
    <>
      <h1>Currency Converter</h1>
      <CurrencyInput
        name="fromCurrency"
        id="fromCurrency"
        value={fromCurrency}
        onCurrencyChange={e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onAmountChange={e => {
          setFromAmount(e.target.value);
          setToAmount(parseFloat(e.target.value * exchangeRate).toFixed(3)); //這行可以考慮拆到另一個 useEffect，並監聽 fromAmount
        }} />

      <div className="middle">
        <button className="swapButton" onClick={swapCurrencies} title='切換貨幣'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z"
              fill="currentColor" />
          </svg>
        </button>
        <div className="exchangeRate">1 {fromCurrency} = {exchangeRate} {toCurrency}</div>
      </div>

      <CurrencyInput
        name="toCurrency"
        id="toCurrency"
        value={toCurrency}
        onCurrencyChange={e => setToCurrency(e.target.value)}
        amount={toAmount}
        onAmountChange={e => {
          setToAmount(e.target.value);
        }} />
    </>
  );
}

export default App
