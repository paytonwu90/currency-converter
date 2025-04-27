import './CurrencyInput.css';

function CurrencyInput({ name, id, value, onCurrencyChange, amount, onAmountChange, readOnly = false }) {
  return (
    <div className="currencyInput">
      <select name={name} id={id} value={value} onChange={onCurrencyChange}>
        <option value="JPY">JPY</option>
        <option value="TWD">TWD</option>
      </select>
      <input type="number" value={amount} onChange={onAmountChange} readOnly={readOnly} />
    </div>
  );
}

export default CurrencyInput;
