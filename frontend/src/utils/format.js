/**
 * Formatting utility functions
 */

/**
 * Format a number amount as Indian Rupees (₹)
 * @param {number} amount
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '₹0.00';
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `₹${num.toFixed(2)}`;
};

/**
 * Format an ISO date string as a readable localized date time
 * @param {string} dateString
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid Date';

  // Options for localized representation
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};
