import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Calculator from './Calculator';
import { clickButtons } from '../test/test-utils';

describe('Calculator 元件互動測試', () => {
  let display;

  beforeEach(() => {
    // 每次測試執行前，先渲染並抓取元素
    render(<Calculator />);
    display = screen.getByTestId('calculator-display');
  });

  it('應該能執行基礎加法流程：1 + 2 = 3', () => {
    // 找到按鈕並模擬點擊
    clickButtons('1+2=');

    expect(display).toHaveTextContent('3');
  });

  it('按下 AC 鍵應該清空螢幕', () => {
    fireEvent.click(screen.getByRole('button', { name: '9' }));
    expect(display).toHaveTextContent('9');

    fireEvent.click(screen.getByRole('button', { name: 'AC' }));
    expect(display).toHaveTextContent('0');
  });

  it('應該能處理連續的立即運算', () => {
    clickButtons('12+23+3*4=');
    expect(display).toHaveTextContent('152'); 
  });
});
