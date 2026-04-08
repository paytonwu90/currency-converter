
import { screen, fireEvent } from '@testing-library/react';

/**
 * 輔助函式：模擬連續點擊計算機按鈕
 * @param {string} sequence - 想要點擊的字元字串，例如 '123+45'
 */
export const clickButtons = (sequence) => {
  const map = {
    '*': '×',
    '/': '÷',
  };
  
  // 將字串拆解為字元陣列並逐一模擬點擊
  sequence.split('').forEach(char => {
    const btn = screen.getByRole('button', { name: map[char] || char });
    fireEvent.click(btn);
  });
};