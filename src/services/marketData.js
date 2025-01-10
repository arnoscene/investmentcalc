import axios from 'axios';

const YAHOO_BASE_URL = 'https://query1.finance.yahoo.com/v8/finance/chart/';

// Cache keys
const CACHE_KEYS = {
  FUND_DATA: 'FUND_DATA_CACHE_',
  EXCHANGE_RATES: 'EXCHANGE_RATES_CACHE'
};

// Cache durations
const CACHE_DURATION = {
  PRICES: 15 * 60 * 1000, // 15 minutes
  DIVIDENDS: 24 * 60 * 60 * 1000, // 1 day
  RETURNS: 24 * 60 * 60 * 1000, // 1 day
  EXCHANGE_RATES: 60 * 60 * 1000 // 1 hour
};

// Local storage cache management
const getFromCache = (key) => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    const now = new Date().getTime();
    
    // Check if cache is still valid
    if (now - timestamp < CACHE_DURATION.PRICES) {
      return data;
    }
    
    return null;
  } catch (error) {
    console.error('Cache read error:', error);
    return null;
  }
};

const saveToCache = (key, data) => {
  try {
    const cacheData = {
      data,
      timestamp: new Date().getTime()
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Cache write error:', error);
  }
};

export const updateFundData = async (symbol) => {
  try {
    // Check cache first
    const cacheKey = CACHE_KEYS.FUND_DATA + symbol;
    const cachedData = getFromCache(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    // If not in cache, fetch from Yahoo Finance
    const response = await axios.get(`${YAHOO_BASE_URL}${symbol}`, {
      params: {
        range: '5y',
        interval: '1mo'
      }
    });

    const result = response.data.chart.result[0];
    const quotes = result.indicators.quote[0];
    
    // Calculate returns
    const calculateReturn = (periods) => {
      const currentPrice = quotes.close[quotes.close.length - 1];
      const oldPrice = quotes.close[quotes.close.length - 1 - periods];
      return (currentPrice - oldPrice) / oldPrice;
    };

    const fundData = {
      currentPrice: quotes.close[quotes.close.length - 1],
      dividendYield: 0.0, // Will need separate API call for this
      historicalReturns: {
        oneYear: calculateReturn(12),
        threeYear: calculateReturn(36),
        fiveYear: calculateReturn(60),
        tenYear: calculateReturn(120)
      },
      lastUpdated: new Date().toISOString()
    };

    // Save to cache
    saveToCache(cacheKey, fundData);

    return fundData;
  } catch (error) {
    console.error(`Error updating fund data for ${symbol}:`, error);
    return null;
  }
};

export const updateExchangeRates = async () => {
  try {
    // Check cache first
    const cachedRates = getFromCache(CACHE_KEYS.EXCHANGE_RATES);
    if (cachedRates) {
      return cachedRates;
    }

    // If not in cache, fetch from Exchange Rates API
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/GBP');

    const exchangeData = {
      rates: {
        USD: response.data.rates.USD,
        ZAR: response.data.rates.ZAR
      },
      lastUpdated: new Date().toISOString()
    };

    // Save to cache
    saveToCache(CACHE_KEYS.EXCHANGE_RATES, exchangeData);

    return exchangeData;
  } catch (error) {
    console.error('Error updating exchange rates:', error);
    return null;
  }
};

export const shouldUpdate = (lastUpdate, dataType) => {
  if (!lastUpdate) return true;
  
  const now = new Date().getTime();
  const lastUpdateTime = new Date(lastUpdate).getTime();
  const timeDiff = now - lastUpdateTime;
  
  return timeDiff > CACHE_DURATION[dataType];
}; 