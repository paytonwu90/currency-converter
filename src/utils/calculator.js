export const calculate = (firstValue, secondValue, operation) => {
  const f = parseFloat(firstValue);
  const s = parseFloat(secondValue);
  let result;
  
  switch (operation) {
    case '+': result = f + s; break;
    case '-': result = f - s; break;
    case '*': result = f * s; break;
    case '/': result = s !== 0 ? f / s : 0; break;
    default: result = s;
  }

  /**
   * 處理浮點數精準度
   * 解決 0.1 + 0.2 !== 0.3 的問題
   */
  return parseFloat(result.toPrecision(12));
};
