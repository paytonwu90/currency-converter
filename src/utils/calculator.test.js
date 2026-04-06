import { describe, it, expect } from 'vitest';
import { calculate } from './calculator';

describe('計算機核心邏輯測試', () => {
  describe('基礎四則運算', () => {
    it('基礎加法：1 + 2 = 3', () => {
      expect(calculate(1, 2, '+')).toBe(3);
    });

    it('基礎減法：5 - 2 = 3', () => {
      expect(calculate(5, 2, '-')).toBe(3);
    });

    it('基礎乘法：3 * 4 = 12', () => {
      expect(calculate(3, 4, '*')).toBe(12);
    });

    it('基礎除法：10 / 2 = 5', () => {
      expect(calculate(10, 2, '/')).toBe(5);
    });
  });

  describe('極端與錯誤處理', () => {
    it('處理除以零的情況（應回傳 0）', () => {
      expect(calculate(5, 0, '/')).toBe(0);
    });

    it('負數運算：-5 + 2 = -3', () => {
      expect(calculate(-5, 2, '+')).toBe(-3);
    });

    it('傳入未知運算符：應回傳第二個數值', () => {
      expect(calculate(10, 5, '?')).toBe(5);
    });

    it('確保字串輸入也能正確運算', () => {
      expect(calculate('10', '20', '+')).toBe(30);
    });
  });

  describe('浮點數精準度測試', () => {
    it('應解決加法誤差：0.1 + 0.2 = 0.3', () => {
      expect(calculate(0.1, 0.2, '+')).toBe(0.3);
    });

    it('應解決乘法誤差：0.7 * 3 = 2.1', () => {
      expect(calculate(0.7, 3, '*')).toBe(2.1);
    });

    it('應解決減法誤差：1.1 - 1.0 = 0.1', () => {
      expect(calculate(1.1, 1.0, '-')).toBe(0.1);
    });
  });

  describe('大數運算', () => {
    it('處理大數字加法', () => {
      expect(calculate(99999999, 1, '+')).toBe(100000000);
    });
  });
});
