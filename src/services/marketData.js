import axios from 'axios';

const YAHOO_BASE_URL = 'https://query1.finance.yahoo.com/v8/finance/chart/';

// Cache keys
const CACHE_KEYS = {
  FUND_DATA: 'FUND_DATA_CACHE_',
  EXCHANGE_RATES: 'EXCHANGE_RATES_CACHE',
  LAST_BATCH_UPDATE: 'LAST_BATCH_UPDATE',
  UPDATE_STATUS: 'UPDATE_STATUS'
};

// Cache durations
const CACHE_DURATION = {
  PRICES: 24 * 60 * 60 * 1000, // 24 hours
  DIVIDENDS: 30 * 24 * 60 * 60 * 1000, // 30 days
  RETURNS: 30 * 24 * 60 * 60 * 1000, // 30 days
  EXCHANGE_RATES: 24 * 60 * 60 * 1000, // 24 hours
  BATCH_COOLDOWN: 6 * 60 * 60 * 1000 // 6 hours between batch updates
};

// Update status tracking
const UPDATE_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  IN_PROGRESS: 'in_progress'
};

// Local storage cache management
const getFromCache = (key, type = 'PRICES') => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    const now = new Date().getTime();
    
    // Check if cache is still valid based on data type
    if (now - timestamp < CACHE_DURATION[type]) {
      return data;
    }
    
    return null;
  } catch (error) {
    console.error('Cache read error:', error);
    return null;
  }
};

const saveToCache = (key, data, status = UPDATE_STATUS.SUCCESS) => {
  try {
    const cacheData = {
      data,
      timestamp: new Date().getTime(),
      status
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Cache write error:', error);
  }
};

// Batch update management
const getLastBatchUpdate = () => {
  return getFromCache(CACHE_KEYS.LAST_BATCH_UPDATE);
};

const setLastBatchUpdate = () => {
  saveToCache(CACHE_KEYS.LAST_BATCH_UPDATE, new Date().toISOString());
};

const shouldBatchUpdate = () => {
  const lastUpdate = getLastBatchUpdate();
  if (!lastUpdate) return true;
  
  const now = new Date().getTime();
  const lastUpdateTime = new Date(lastUpdate).getTime();
  return now - lastUpdateTime > CACHE_DURATION.BATCH_COOLDOWN;
};

// Enhanced fund data update with fallback
export const updateFundData = async (symbol) => {
  try {
    // Check cache first
    const cacheKey = CACHE_KEYS.FUND_DATA + symbol;
    const cachedData = getFromCache(cacheKey, 'PRICES');
    if (cachedData) {
      return { ...cachedData, source: 'cache' };
    }

    // Set status to in progress
    saveToCache(cacheKey, null, UPDATE_STATUS.IN_PROGRESS);

    // If not in cache, fetch from Yahoo Finance
    const response = await axios.get(`${YAHOO_BASE_URL}${symbol}`, {
      params: {
        range: '5y',
        interval: '1mo'
      }
    });

    const result = response.data.chart.result[0];
    const quotes = result.indicators.quote[0];
    
    // Calculate returns with error handling
    const calculateReturn = (periods) => {
      try {
        const currentPrice = quotes.close[quotes.close.length - 1];
        const oldPrice = quotes.close[quotes.close.length - 1 - periods];
        return (currentPrice - oldPrice) / oldPrice;
      } catch (error) {
        console.warn(`Could not calculate ${periods} period return for ${symbol}`);
        return 0;
      }
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
      lastUpdated: new Date().toISOString(),
      source: 'api'
    };

    // Save to cache
    saveToCache(cacheKey, fundData, UPDATE_STATUS.SUCCESS);

    return fundData;
  } catch (error) {
    console.error(`Error updating fund data for ${symbol}:`, error);
    
    // Try to get expired cache as fallback
    const expiredCache = localStorage.getItem(CACHE_KEYS.FUND_DATA + symbol);
    if (expiredCache) {
      const { data } = JSON.parse(expiredCache);
      return { ...data, source: 'expired_cache' };
    }
    
    saveToCache(CACHE_KEYS.FUND_DATA + symbol, null, UPDATE_STATUS.ERROR);
    return null;
  }
};

// Batch update all funds
export const batchUpdateFunds = async (symbols) => {
  if (!shouldBatchUpdate()) {
    console.log('Batch update skipped: too soon since last update');
    return;
  }

  const updates = [];
  const batchSize = 5; // Update 5 funds at a time
  
  for (let i = 0; i < symbols.length; i += batchSize) {
    const batch = symbols.slice(i, i + batchSize);
    const batchUpdates = batch.map(symbol => updateFundData(symbol));
    
    try {
      await Promise.all(batchUpdates);
      updates.push(...batchUpdates);
    } catch (error) {
      console.error('Batch update error:', error);
    }
    
    // Wait 1 second between batches to avoid rate limiting
    if (i + batchSize < symbols.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  setLastBatchUpdate();
  return updates;
};

export const updateExchangeRates = async () => {
  try {
    // Check cache first
    const cachedRates = getFromCache(CACHE_KEYS.EXCHANGE_RATES, 'EXCHANGE_RATES');
    if (cachedRates) {
      return { ...cachedRates, source: 'cache' };
    }

    // If not in cache, fetch from Exchange Rates API
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/GBP');

    const exchangeData = {
      rates: {
        USD: response.data.rates.USD,
        ZAR: response.data.rates.ZAR
      },
      lastUpdated: new Date().toISOString(),
      source: 'api'
    };

    // Save to cache
    saveToCache(CACHE_KEYS.EXCHANGE_RATES, exchangeData);

    return exchangeData;
  } catch (error) {
    console.error('Error updating exchange rates:', error);
    
    // Try to get expired cache as fallback
    const expiredCache = localStorage.getItem(CACHE_KEYS.EXCHANGE_RATES);
    if (expiredCache) {
      const { data } = JSON.parse(expiredCache);
      return { ...data, source: 'expired_cache' };
    }
    
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

// Get update status for monitoring
export const getUpdateStatus = (symbol) => {
  try {
    const cached = localStorage.getItem(CACHE_KEYS.FUND_DATA + symbol);
    if (!cached) return null;
    
    const { status, timestamp } = JSON.parse(cached);
    return {
      status,
      lastUpdate: new Date(timestamp).toISOString(),
      age: new Date().getTime() - timestamp
    };
  } catch (error) {
    console.error('Status check error:', error);
    return null;
  }
}; 