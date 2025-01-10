export const CURRENCIES = {
  USD: {
    symbol: '$',
    name: 'US Dollar',
    rate: 1, // Base currency
    format: (value) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  },
  GBP: {
    symbol: '£',
    name: 'British Pound',
    rate: 0.79, // 1 USD = 0.79 GBP
    format: (value) => `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  },
  ZAR: {
    symbol: 'R',
    name: 'South African Rand',
    rate: 18.73, // 1 USD = 18.73 ZAR
    format: (value) => `R${value.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
};

export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  // Convert to USD first (if not already in USD)
  const inUSD = fromCurrency === 'USD' ? amount : amount / CURRENCIES[fromCurrency].rate;
  // Then convert to target currency
  return toCurrency === 'USD' ? inUSD : inUSD * CURRENCIES[toCurrency].rate;
}; 