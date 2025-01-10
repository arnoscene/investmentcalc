// Fund Categories
export const FUND_CATEGORIES = {
  GLOBAL_EQUITY: 'Global Equity',
  REGIONAL_EQUITY: 'Regional Equity',
  UK_EQUITY: 'UK Equity',
  ESG: 'ESG/Sustainable',
  LIFESTRATEGY: 'LifeStrategy',
  TARGET_RETIREMENT: 'Target Retirement',
  BONDS: 'Bonds & Money Market',
  ACTIVE: 'Actively Managed'
};

export const INDEX_FUNDS = {
  // Global Equity Funds
  'VWRL': {
    name: 'Vanguard FTSE All-World UCITS ETF',
    category: FUND_CATEGORIES.GLOBAL_EQUITY,
    description: 'Provides broad exposure to developed and emerging market stocks worldwide',
    expenseRatio: 0.0022, // 0.22%
    historicalReturns: {
      oneYear: 0.2197,
      threeYear: 0.0789,
      fiveYear: 0.0967,
      tenYear: 0.0898,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate',
    dividendYield: 0.0234,
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'IE00B3RBWM25',
    assetType: 'Pure Equity'
  },
  'VEVE': {
    name: 'Vanguard FTSE Developed World UCITS ETF',
    category: FUND_CATEGORIES.GLOBAL_EQUITY,
    description: 'Tracks developed market stocks, excluding emerging markets',
    expenseRatio: 0.0012, // 0.12%
    historicalReturns: {
      oneYear: 0.1834,
      threeYear: 0.0867,
      fiveYear: 0.1087,
      tenYear: 0.1156,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate',
    dividendYield: 0.0189,
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'IE00BK5BQT80',
    assetType: 'Pure Equity'
  },
  'VHYL': {
    name: 'Vanguard FTSE All-World High Dividend Yield UCITS ETF',
    category: FUND_CATEGORIES.GLOBAL_EQUITY,
    description: 'Focuses on global stocks with above-average dividend yields',
    expenseRatio: 0.0029, // 0.29%
    historicalReturns: {
      oneYear: 0.1723,
      threeYear: 0.0845,
      fiveYear: 0.0978,
      tenYear: 0.1087,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate',
    dividendYield: 0.0445, // 4.45%
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'IE00B8GKDB10',
    assetType: 'Pure Equity'
  },
  'VGSG': {
    name: 'Vanguard Global Small-Cap Index Fund',
    category: FUND_CATEGORIES.GLOBAL_EQUITY,
    description: 'Tracks the performance of small-cap companies worldwide',
    expenseRatio: 0.0029,
    historicalReturns: {
      oneYear: 0.1645,
      threeYear: 0.0823,
      fiveYear: 0.0912,
      tenYear: 0.0945,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate-High',
    dividendYield: 0.0189,
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'IE00B42W3S00',
    assetType: 'Pure Equity',
    accumulationFund: true
  },

  // Regional Equity Funds
  'VUSA': {
    name: 'Vanguard S&P 500 UCITS ETF',
    category: FUND_CATEGORIES.REGIONAL_EQUITY,
    description: 'UK version of VOO - Tracks the S&P 500 index of large-cap U.S. stocks. Available on the London Stock Exchange.',
    expenseRatio: 0.0007, // 0.07%
    historicalReturns: {
      oneYear: 0.2429,
      threeYear: 0.0991,
      fiveYear: 0.1197,
      tenYear: 0.1223,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate',
    dividendYield: 0.0153,
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'IE00B3XXRP09',
    assetType: 'Pure Equity'
  },
  'VUAG': {
    name: 'Vanguard U.S. Equity Index Fund',
    category: FUND_CATEGORIES.REGIONAL_EQUITY,
    description: 'Tracks the performance of the S&P Total Market Index, providing exposure to the entire U.S. equity market including large, mid, and small-cap stocks. This accumulation fund automatically reinvests dividends.',
    expenseRatio: 0.0010, // 0.10%
    historicalReturns: {
      oneYear: 0.2345,
      threeYear: 0.0987,
      fiveYear: 0.1156,
      tenYear: 0.1234,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate',
    dividendYield: 0.0167, // 1.67%
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'GB00B5B71H31',
    accumulationFund: true,
    assetType: 'Pure Equity'
  },
  'VEUR': {
    name: 'Vanguard FTSE Developed Europe UCITS ETF',
    category: FUND_CATEGORIES.REGIONAL_EQUITY,
    description: 'Tracks the performance of large and mid-sized companies in developed European markets. This distributing ETF pays out dividends to investors rather than reinvesting them.',
    expenseRatio: 0.0012, // 0.12%
    historicalReturns: {
      oneYear: 0.1834,
      threeYear: 0.0856,
      fiveYear: 0.0945,
      tenYear: 0.0987,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate',
    dividendYield: 0.0278, // 2.78%
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'IE00B945VV12',
    distributionFrequency: 'Quarterly',
    assetType: 'Pure Equity'
  },
  'VGER': {
    name: 'Vanguard Germany All Cap UCITS ETF',
    category: FUND_CATEGORIES.REGIONAL_EQUITY,
    description: 'Tracks the performance of large, mid, and small-sized German companies. This distributing ETF pays out dividends to investors rather than reinvesting them.',
    expenseRatio: 0.0010, // 0.10%
    historicalReturns: {
      oneYear: 0.1645,
      threeYear: 0.0734,
      fiveYear: 0.0856,
      tenYear: 0.0923,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate',
    dividendYield: 0.0245, // 2.45%
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'IE00BG143G97',
    distributionFrequency: 'Quarterly',
    assetType: 'Pure Equity'
  },
  'VJPN': {
    name: 'Vanguard FTSE Japan UCITS ETF',
    category: FUND_CATEGORIES.REGIONAL_EQUITY,
    description: 'Tracks the performance of large and mid-sized Japanese companies. This distributing ETF pays out dividends to investors rather than reinvesting them.',
    expenseRatio: 0.0015, // 0.15%
    historicalReturns: {
      oneYear: 0.1523,
      threeYear: 0.0645,
      fiveYear: 0.0734,
      tenYear: 0.0856,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate',
    dividendYield: 0.0234, // 2.34%
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'IE00B95PGT31',
    distributionFrequency: 'Quarterly',
    assetType: 'Pure Equity'
  },
  'VAPX': {
    name: 'Vanguard FTSE Developed Asia Pacific ex Japan UCITS ETF',
    category: FUND_CATEGORIES.REGIONAL_EQUITY,
    description: 'Tracks the performance of large and mid-sized companies in the developed Asia Pacific region, excluding Japan',
    expenseRatio: 0.0015,
    historicalReturns: {
      oneYear: 0.1534,
      threeYear: 0.0756,
      fiveYear: 0.0867,
      tenYear: 0.0923,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate-High',
    dividendYield: 0.0312,
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'IE00B9F5YL18',
    assetType: 'Pure Equity',
    distributionFrequency: 'Quarterly'
  },

  // UK Equity Funds
  'VUKE': {
    name: 'Vanguard FTSE 100 UCITS ETF',
    category: FUND_CATEGORIES.UK_EQUITY,
    description: 'Tracks the performance of the UK\'s largest 100 companies',
    expenseRatio: 0.0009, // 0.09%
    historicalReturns: {
      oneYear: 0.1523,
      threeYear: 0.0397,
      fiveYear: 0.0567,
      tenYear: 0.0423,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate',
    dividendYield: 0.0389, // 3.89%
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'IE00B810Q511',
    assetType: 'Pure Equity'
  },
  'VMID': {
    name: 'Vanguard FTSE 250 UCITS ETF',
    category: FUND_CATEGORIES.UK_EQUITY,
    description: 'Tracks the performance of the UK\'s mid-sized companies in the FTSE 250 index',
    expenseRatio: 0.0010,
    historicalReturns: {
      oneYear: 0.1423,
      threeYear: 0.0534,
      fiveYear: 0.0645,
      tenYear: 0.0789,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate-High',
    dividendYield: 0.0289,
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'IE00BKX55Q28',
    assetType: 'Pure Equity',
    distributionFrequency: 'Quarterly'
  },

  // ESG/Sustainable Funds
  'VESG': {
    name: 'Vanguard ESG Global All Cap UCITS ETF',
    category: FUND_CATEGORIES.ESG,
    description: 'Provides broad exposure to companies worldwide that meet environmental, social, and governance standards.',
    expenseRatio: 0.0024, // 0.24%
    historicalReturns: {
      oneYear: 0.1723,
      threeYear: 0.0845,
      fiveYear: 0.0912,
      tenYear: 0.1045,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate',
    dividendYield: 0.0156, // 1.56%
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'IE00BNG8L385',
    assetType: 'Pure Equity'
  },
  'VESGD': {
    name: 'Vanguard ESG Developed World All Cap Equity Index Fund',
    category: FUND_CATEGORIES.ESG,
    description: 'Tracks the performance of developed-market companies that meet specific environmental, social, and governance criteria.',
    expenseRatio: 0.0020, // 0.20%
    historicalReturns: {
      oneYear: 0.1645,
      threeYear: 0.0823,
      fiveYear: 0.0934,
      tenYear: 0.1023,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate',
    dividendYield: 0.0167, // 1.67%
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'GB00BPN5P238',
    assetType: 'Pure Equity'
  },
  'V3EL': {
    name: 'Vanguard ESG Developed Europe All Cap UCITS ETF',
    category: FUND_CATEGORIES.ESG,
    description: 'Tracks European companies that meet environmental, social, and governance criteria. This distributing ETF pays out dividends to investors rather than reinvesting them.',
    expenseRatio: 0.0014, // 0.14%
    historicalReturns: {
      oneYear: 0.1756,
      threeYear: 0.0823,
      fiveYear: 0.0912,
      tenYear: 0.0945,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate',
    dividendYield: 0.0267, // 2.67%
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'IE000JVZXRG48',
    assetType: 'Pure Equity'
  },
  'VSGB': {
    name: 'Vanguard ESG Sterling Corporate Bond UCITS ETF',
    category: FUND_CATEGORIES.ESG,
    description: 'Tracks UK corporate bonds that meet environmental, social, and governance criteria',
    expenseRatio: 0.0012,
    historicalReturns: {
      oneYear: 0.0423,
      threeYear: 0.0234,
      fiveYear: 0.0312,
      tenYear: 0.0389,
    },
    minimumInvestment: 500,
    riskLevel: 'Low',
    dividendYield: 0.0445,
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'IE00BKPTXQ89',
    assetType: 'Pure Bond',
    distributionFrequency: 'Monthly'
  },
  'SL60': {
    name: 'Vanguard SustainableLife 60% Equity Fund',
    category: FUND_CATEGORIES.ESG,
    description: 'Sustainable multi-asset fund with 60% allocation to ESG-screened equities',
    expenseRatio: 0.0048,
    historicalReturns: {
      oneYear: 0.1234,
      threeYear: 0.0645,
      fiveYear: 0.0789,
      tenYear: 0.0856,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate',
    dividendYield: 0.0189,
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'GB00BLLZQ805',
    assetType: 'Blended',
    accumulationFund: true
  },

  // LifeStrategy Funds
  'VLS100': {
    name: 'Vanguard LifeStrategy® 100% Equity Fund',
    category: FUND_CATEGORIES.LIFESTRATEGY,
    description: 'Provides diversified exposure to global equities through a portfolio of passive funds, maintaining a long-term 100% allocation to equities.',
    expenseRatio: 0.0022, // 0.22%
    historicalReturns: {
      oneYear: 0.1756,
      threeYear: 0.0867,
      fiveYear: 0.0945,
      tenYear: 0.1087,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate-High',
    dividendYield: 0.0189, // 1.89%
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'GB00B41XG308',
    assetType: 'Pure Equity'
  },
  'VLS80': {
    name: 'Vanguard LifeStrategy® 80% Equity Fund',
    category: FUND_CATEGORIES.LIFESTRATEGY,
    description: 'Provides diversified exposure with 80% allocation to global equities and 20% to bonds',
    expenseRatio: 0.0022,
    historicalReturns: {
      oneYear: 0.1534,
      threeYear: 0.0756,
      fiveYear: 0.0867,
      tenYear: 0.0945,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate',
    dividendYield: 0.0167,
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'GB00B4PQW151',
    assetType: 'Blended',
    accumulationFund: true
  },
  'VLS60': {
    name: 'Vanguard LifeStrategy® 60% Equity Fund',
    category: FUND_CATEGORIES.LIFESTRATEGY,
    description: 'Provides balanced exposure with 60% allocation to global equities and 40% to bonds',
    expenseRatio: 0.0022,
    historicalReturns: {
      oneYear: 0.1234,
      threeYear: 0.0645,
      fiveYear: 0.0756,
      tenYear: 0.0834,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate',
    dividendYield: 0.0156,
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'GB00B3TYHH97',
    assetType: 'Blended',
    accumulationFund: true
  },
  'VLS40': {
    name: 'Vanguard LifeStrategy® 40% Equity Fund',
    category: FUND_CATEGORIES.LIFESTRATEGY,
    description: 'Provides conservative exposure with 40% allocation to global equities and 60% to bonds',
    expenseRatio: 0.0022,
    historicalReturns: {
      oneYear: 0.0923,
      threeYear: 0.0534,
      fiveYear: 0.0645,
      tenYear: 0.0723,
    },
    minimumInvestment: 500,
    riskLevel: 'Low-Moderate',
    dividendYield: 0.0145,
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'GB00B3TYHK27',
    assetType: 'Blended',
    accumulationFund: true
  },
  'VLS20': {
    name: 'Vanguard LifeStrategy® 20% Equity Fund',
    category: FUND_CATEGORIES.LIFESTRATEGY,
    description: 'Provides very conservative exposure with 20% allocation to global equities and 80% to bonds',
    expenseRatio: 0.0022,
    historicalReturns: {
      oneYear: 0.0612,
      threeYear: 0.0423,
      fiveYear: 0.0534,
      tenYear: 0.0612,
    },
    minimumInvestment: 500,
    riskLevel: 'Low',
    dividendYield: 0.0134,
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'GB00B3TYHJ12',
    assetType: 'Blended',
    accumulationFund: true
  },

  // Target Retirement Funds
  'TR2065': {
    name: 'Vanguard Target Retirement 2065 Fund',
    category: FUND_CATEGORIES.TARGET_RETIREMENT,
    description: 'Automatically adjusts asset allocation, becoming more conservative as 2065 approaches',
    expenseRatio: 0.0024,
    historicalReturns: {
      oneYear: 0.1645,
      threeYear: 0.0823,
      fiveYear: 0.0945,
      tenYear: 0.1023,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate-High',
    dividendYield: 0.0167,
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'GB00BMFX1Y18',
    assetType: 'Blended',
    accumulationFund: true
  },
  'TR2060': {
    name: 'Vanguard Target Retirement 2060 Fund',
    category: FUND_CATEGORIES.TARGET_RETIREMENT,
    description: 'Automatically adjusts asset allocation, becoming more conservative as 2060 approaches',
    expenseRatio: 0.0024,
    historicalReturns: {
      oneYear: 0.1623,
      threeYear: 0.0812,
      fiveYear: 0.0934,
      tenYear: 0.1012,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate-High',
    dividendYield: 0.0165,
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'GB00BPLWVH43',
    assetType: 'Blended',
    accumulationFund: true
  },

  // Bond & Money Market Funds
  'VAGP': {
    name: 'Vanguard Global Aggregate Bond UCITS ETF',
    category: FUND_CATEGORIES.BONDS,
    description: 'Provides broad exposure to global investment-grade bonds',
    expenseRatio: 0.0010, // 0.10%
    historicalReturns: {
      oneYear: 0.0523,
      threeYear: -0.0149,
      fiveYear: 0.0127,
      tenYear: 0.0156,
    },
    minimumInvestment: 500,
    riskLevel: 'Low',
    dividendYield: 0.0312,
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'IE00BG47KH54',
    assetType: 'Pure Bond'
  },
  'VGOV': {
    name: 'Vanguard UK Government Bond UCITS ETF',
    category: FUND_CATEGORIES.BONDS,
    description: 'Tracks UK government bonds (gilts) across different maturities',
    expenseRatio: 0.0007,
    historicalReturns: {
      oneYear: 0.0345,
      threeYear: 0.0123,
      fiveYear: 0.0234,
      tenYear: 0.0312,
    },
    minimumInvestment: 500,
    riskLevel: 'Low',
    dividendYield: 0.0389,
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'IE00B42WWV65',
    assetType: 'Pure Bond',
    distributionFrequency: 'Monthly'
  },
  'VGST': {
    name: 'Vanguard Global Short-Term Bond Index Fund',
    category: FUND_CATEGORIES.BONDS,
    description: 'Tracks short-term global bonds, providing lower duration risk',
    expenseRatio: 0.0015,
    historicalReturns: {
      oneYear: 0.0234,
      threeYear: 0.0145,
      fiveYear: 0.0189,
      tenYear: 0.0223,
    },
    minimumInvestment: 500,
    riskLevel: 'Low',
    dividendYield: 0.0289,
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'IE00BH65QP47',
    assetType: 'Pure Bond',
    distributionFrequency: 'Quarterly'
  },
  'VMST': {
    name: 'Vanguard Sterling Short-Term Money Market Fund',
    category: FUND_CATEGORIES.BONDS,
    description: 'Invests in high-quality, short-term money market instruments',
    expenseRatio: 0.0012,
    historicalReturns: {
      oneYear: 0.0145,
      threeYear: 0.0089,
      fiveYear: 0.0112,
      tenYear: 0.0134,
    },
    minimumInvestment: 500,
    riskLevel: 'Very Low',
    dividendYield: 0.0145,
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'IE00B41CGH57',
    assetType: 'Money Market',
    distributionFrequency: 'Monthly'
  },

  // Actively Managed Funds
  'VGEI': {
    name: 'Vanguard Global Equity Income Fund',
    category: FUND_CATEGORIES.ACTIVE,
    description: 'Actively managed fund focusing on companies worldwide that pay above-average dividends, with potential for dividend growth.',
    expenseRatio: 0.0048, // 0.48%
    historicalReturns: {
      oneYear: 0.1834,
      threeYear: 0.0912,
      fiveYear: 0.1023,
      tenYear: 0.1156,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate',
    dividendYield: 0.0312, // 3.12%
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'GB00BD87PF57',
    assetType: 'Pure Equity'
  },
  'VGCS': {
    name: 'Vanguard Global Capital Stewards Equity Fund',
    category: FUND_CATEGORIES.ACTIVE,
    description: 'Actively managed fund focusing on companies with strong governance practices and sustainable competitive advantages. This accumulation fund automatically reinvests dividends.',
    expenseRatio: 0.0045, // 0.45%
    historicalReturns: {
      oneYear: 0.1834,
      threeYear: 0.0912,
      fiveYear: 0.1045,
      tenYear: 0.1123,
    },
    minimumInvestment: 500,
    riskLevel: 'Moderate',
    dividendYield: 0.0189, // 1.89%
    ukAvailable: true,
    tradingCurrency: 'GBP',
    isin: 'GB00BP3R3K47',
    accumulationFund: true,
    assetType: 'Pure Equity'
  }
}; 