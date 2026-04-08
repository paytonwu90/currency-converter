import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import { clickButtons } from './test/test-utils';

describe('App 與 Calculator 整合互動', () => {
  it('按下 OK 後，應將 1 + 2 的運算結果 3 帶回 #fromAmount', () => {
    render(<App />);

    const openCalculatorBtn = screen.getByRole('button', { name: '開啟計算機' });
    fireEvent.click(openCalculatorBtn); 

    clickButtons('1+2');

    const okBtn = screen.getByRole('button', { name: 'OK' });
    fireEvent.click(okBtn);

    // type="number" 的預設 Role 是 spinbutton，且取出的值是數字
    expect(screen.getByRole('spinbutton', { name: 'From Amount' })).toHaveValue(3);
  });
});