import { describe, it, expect } from 'vitest';

import { formatCurrency } from '@/utils';

describe('formatCurrency', () => {
  it('formats regular numbers correctly', () => {
    expect(formatCurrency(1000)).toBe('$1,000');
    expect(formatCurrency(1000000)).toBe('$1,000,000');
    expect(formatCurrency(999)).toBe('$999');
  });

  it('handles zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0');
  });

  it('handles negative numbers correctly', () => {
    expect(formatCurrency(-1000)).toBe('-$1,000');
    expect(formatCurrency(-999999)).toBe('-$999,999');
  });

  it('handles decimal numbers by rounding them', () => {
    expect(formatCurrency(1000.4)).toBe('$1,000');
    expect(formatCurrency(1000.5)).toBe('$1,001');
    expect(formatCurrency(999.99)).toBe('$1,000');
  });

  it('handles very large numbers', () => {
    expect(formatCurrency(1000000000)).toBe('$1,000,000,000');
    expect(formatCurrency(1234567890)).toBe('$1,234,567,890');
  });

  it('handles very small decimal numbers', () => {
    expect(formatCurrency(0.1)).toBe('$0');
    expect(formatCurrency(0.5)).toBe('$1');
    expect(formatCurrency(0.49)).toBe('$0');
  });
});
