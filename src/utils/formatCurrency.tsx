/**
 * Formats a number as a US dollar amount without decimal places.
 *
 * @param {number} value - The number to format as currency
 * @returns {string} The formatted currency string (e.g. "$1,000")
 *
 * @example
 * formatCurrency(1000) // Returns "$1,000"
 * formatCurrency(1000000) // Returns "$1,000,000"
 * formatCurrency(0) // Returns "$0"
 *
 * @remarks
 * - Uses US locale and USD currency
 * - Removes decimal places from the output
 * - Adds thousands separators
 * - Includes dollar sign
 */
export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
