import { useState, useEffect } from 'react';
import { 
  Container, 
  Card, 
  CardContent, 
  TextField, 
  Typography, 
  Box,
  ThemeProvider,
  createTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Chip,
  Button,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { INDEX_FUNDS, FUND_CATEGORIES } from './data/indexFunds';
import { CURRENCIES, convertCurrency } from './data/currencies';
import { updateFundData, updateExchangeRates, shouldUpdate } from './services/marketData';

// Add new calculation parameters
const MARKET_FACTORS = {
  inflation: 0.024, // Current UK inflation rate
  platformFee: 0.0025, // Average platform fee
  tradingCosts: 0.001, // Average trading costs
};

// Import our calculation functions
const calculateInvestmentGrowth = (
  initialInvestment,
  monthlyContribution,
  annualReturnRate,
  years,
  expenseRatio
) => {
  // Adjust return rate for all costs
  const totalCosts = expenseRatio + MARKET_FACTORS.platformFee + MARKET_FACTORS.tradingCosts;
  const inflationAdjustedReturn = (annualReturnRate - MARKET_FACTORS.inflation);
  const effectiveReturnRate = (inflationAdjustedReturn - totalCosts) / 12;
  
  let futureValue = initialInvestment;
  let monthlyInflationAdjustment = 1 + (MARKET_FACTORS.inflation / 12);

  for (let month = 0; month < years * 12; month++) {
    // Adjust monthly contribution for inflation
    const inflationAdjustedContribution = monthlyContribution * Math.pow(monthlyInflationAdjustment, month);
    
    // Apply monthly growth
    futureValue = futureValue * (1 + effectiveReturnRate) + inflationAdjustedContribution;
  }

  return Math.round(futureValue * 100) / 100;
};

const calculateExpenseRatioImpact = (
  investmentAmount,
  expenseRatio,
  years
) => {
  // Include all costs
  const totalCosts = expenseRatio + MARKET_FACTORS.platformFee + MARKET_FACTORS.tradingCosts;
  const totalCost = investmentAmount * totalCosts * years;
  return Math.round(totalCost * 100) / 100;
};

const calculateTotalContributions = (
  initialInvestment,
  monthlyContribution,
  years
) => {
  const totalContributions = initialInvestment + (monthlyContribution * 12 * years);
  return Math.round(totalContributions * 100) / 100;
};

const calculateWithDividendReinvestment = (
  initialInvestment,
  monthlyContribution,
  annualReturnRate,
  dividendYield,
  years,
  expenseRatio
) => {
  const totalCosts = expenseRatio + MARKET_FACTORS.platformFee + MARKET_FACTORS.tradingCosts;
  const inflationAdjustedReturn = (annualReturnRate - MARKET_FACTORS.inflation);
  const effectiveReturnRate = (inflationAdjustedReturn - totalCosts) / 12;
  
  // Assume modest dividend growth rate
  const dividendGrowthRate = 0.02 / 12; // 2% annual dividend growth
  let currentDividendRate = dividendYield / 12;
  let futureValue = initialInvestment;
  let monthlyInflationAdjustment = 1 + (MARKET_FACTORS.inflation / 12);

  for (let month = 0; month < years * 12; month++) {
    // Adjust monthly contribution for inflation
    const inflationAdjustedContribution = monthlyContribution * Math.pow(monthlyInflationAdjustment, month);
    
    // Apply monthly growth
    futureValue = futureValue * (1 + effectiveReturnRate);
    
    // Apply growing dividend rate
    futureValue = futureValue * (1 + currentDividendRate);
    currentDividendRate *= (1 + dividendGrowthRate);
    
    // Add monthly contribution
    futureValue += inflationAdjustedContribution;
  }

  return Math.round(futureValue * 100) / 100;
};

const calculateYearlyDividends = (
  futureValue,
  dividendYield
) => {
  return Math.round(futureValue * dividendYield * 100) / 100;
};

// Default values
const DEFAULT_VALUES = {
  initialInvestment: 800, // ~1000 USD in GBP
  monthlyContribution: 80, // ~100 USD in GBP
  years: 10,
  annualReturnRate: 0.08,
  expenseRatio: 0.0015
};

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Modern blue
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#66bb6a', // Success green
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#546e7a',
    },
  },
  typography: {
    h5: {
      fontWeight: 600,
      color: '#1a237e',
    },
    h6: {
      fontWeight: 500,
      color: '#1565c0',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px 0 rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
});

const getRiskColor = (riskLevel) => {
  switch (riskLevel) {
    case 'Very Low':
      return '#89CFF0'; // Baby Blue
    case 'Low':
      return '#4CAF50'; // Green
    case 'Low-Moderate':
      return '#FFA726'; // Orange
    case 'Moderate':
      return '#FF7043'; // Deep Orange
    case 'Moderate-High':
      return '#F44336'; // Red
    default:
      return '#757575'; // Grey for unknown risk levels
  }
};

const sortByRisk = (funds) => {
  const riskOrder = {
    'Low': 1,
    'Moderate': 2,
    'Moderate-High': 3,
    'High': 4
  };
  
  return Object.entries(funds).sort((a, b) => {
    return riskOrder[a[1].riskLevel] - riskOrder[b[1].riskLevel];
  });
};

function App() {
  const [inputs, setInputs] = useState(DEFAULT_VALUES);
  const [results, setResults] = useState({
    futureValue: 0,
    futureValueWithDividends: 0,
    expenseImpact: 0,
    totalContributions: 0,
    yearlyDividends: 0
  });
  const [selectedFund, setSelectedFund] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('GBP');
  const [filters, setFilters] = useState({
    riskLevel: 'all',
    category: 'all',
    assetType: 'all',
    distributionType: 'all'
  });
  const [lastUpdate, setLastUpdate] = useState({
    prices: null,
    dividends: null,
    returns: null,
    exchangeRates: null
  });

  useEffect(() => {
    calculateResults();
  }, [inputs]);

  const calculateResults = () => {
    console.log('Calculating results with inputs:', inputs);
    const futureValue = calculateInvestmentGrowth(
      inputs.initialInvestment,
      inputs.monthlyContribution,
      inputs.annualReturnRate,
      inputs.years,
      inputs.expenseRatio
    );

    // Calculate with dividend reinvestment if a fund is selected
    const dividendYield = selectedFund ? INDEX_FUNDS[selectedFund].dividendYield : 0;
    const futureValueWithDividends = calculateWithDividendReinvestment(
      inputs.initialInvestment,
      inputs.monthlyContribution,
      inputs.annualReturnRate,
      dividendYield,
      inputs.years,
      inputs.expenseRatio
    );

    const yearlyDividends = calculateYearlyDividends(
      futureValueWithDividends,
      dividendYield
    );

    const expenseImpact = calculateExpenseRatioImpact(
      futureValueWithDividends, // Use the higher value for expense calculation
      inputs.expenseRatio,
      inputs.years
    );

    const totalContributions = calculateTotalContributions(
      inputs.initialInvestment,
      inputs.monthlyContribution,
      inputs.years
    );

    const newResults = {
      futureValue,
      futureValueWithDividends,
      expenseImpact,
      totalContributions,
      yearlyDividends
    };
    console.log('New results:', newResults);
    setResults(newResults);
  };

  const updateInput = (field, value) => {
    // Remove leading zeros and handle empty/invalid inputs
    let cleanValue = value;
    if (value !== '') {
      // Convert to number and back to string to remove leading zeros
      cleanValue = Number(value).toString();
      // If the conversion resulted in 'NaN', use '0'
      if (cleanValue === 'NaN') {
        cleanValue = '0';
      }
    }
    const numValue = parseFloat(cleanValue) || 0;
    setInputs(prev => ({ ...prev, [field]: numValue }));
  };

  const handleFundChange = (event) => {
    const fundSymbol = event.target.value;
    console.log('Selected fund:', fundSymbol);
    setSelectedFund(fundSymbol);
    
    if (fundSymbol && INDEX_FUNDS[fundSymbol]) {
      console.log('Fund data:', INDEX_FUNDS[fundSymbol]);
      const fund = INDEX_FUNDS[fundSymbol];
      // Update both the return rate and expense ratio when a fund is selected
      const newInputs = {
        ...inputs,
        annualReturnRate: fund.historicalReturns.tenYear,
        expenseRatio: fund.expenseRatio
      };
      console.log('New inputs:', newInputs);
      setInputs(newInputs);
      
      // Trigger recalculation with the new values
      calculateResults();
    }
  };

  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    const oldCurrency = selectedCurrency;
    
    // Convert input values to new currency
    const newInitialInvestment = convertCurrency(inputs.initialInvestment, oldCurrency, newCurrency);
    const newMonthlyContribution = convertCurrency(inputs.monthlyContribution, oldCurrency, newCurrency);
    
    setSelectedCurrency(newCurrency);
    setInputs(prev => ({
      ...prev,
      initialInvestment: Math.round(newInitialInvestment * 100) / 100,
      monthlyContribution: Math.round(newMonthlyContribution * 100) / 100
    }));
  };

  const formatCurrency = (value) => {
    return CURRENCIES[selectedCurrency].format(value);
  };

  const formatPercent = (value) => {
    return (value * 100).toFixed(2) + '%';
  };

  const clearFundSelection = () => {
    setSelectedFund('');
    setInputs(prev => ({
      ...prev,
      annualReturnRate: DEFAULT_VALUES.annualReturnRate,
      expenseRatio: DEFAULT_VALUES.expenseRatio
    }));
  };

  // Add filter handlers
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Filter funds based on selected criteria
  const getFilteredFunds = () => {
    return Object.entries(INDEX_FUNDS).filter(([_, fund]) => {
      const matchesRisk = filters.riskLevel === 'all' || fund.riskLevel === filters.riskLevel;
      const matchesCategory = filters.category === 'all' || fund.category === filters.category;
      const matchesAssetType = filters.assetType === 'all' || fund.assetType === filters.assetType;
      const matchesDistribution = filters.distributionType === 'all' || 
        (filters.distributionType === 'accumulation' && fund.accumulationFund) ||
        (filters.distributionType === 'distribution' && fund.distributionFrequency);
      
      return matchesRisk && matchesCategory && matchesAssetType && matchesDistribution;
    });
  };

  const updateMarketData = async () => {
    // Update exchange rates if needed
    if (shouldUpdate(lastUpdate.exchangeRates, 'EXCHANGE_RATES')) {
      const newRates = await updateExchangeRates();
      if (newRates) {
        setLastUpdate(prev => ({ ...prev, exchangeRates: newRates.lastUpdated }));
        // Update currency conversion rates
        // This would need to be implemented in your currencies.js
      }
    }

    // Update fund data if a fund is selected
    if (selectedFund && shouldUpdate(lastUpdate.prices, 'PRICES')) {
      const newFundData = await updateFundData(selectedFund);
      if (newFundData) {
        setLastUpdate(prev => ({
          ...prev,
          prices: newFundData.lastUpdated,
          dividends: newFundData.lastUpdated,
          returns: newFundData.lastUpdated
        }));
        
        // Update the fund data
        const updatedFund = {
          ...INDEX_FUNDS[selectedFund],
          dividendYield: newFundData.dividendYield,
          historicalReturns: newFundData.historicalReturns
        };
        
        // Update inputs with new return rate
        setInputs(prev => ({
          ...prev,
          annualReturnRate: newFundData.historicalReturns.tenYear
        }));
      }
    }
  };

  // Add effect to periodically check for updates
  useEffect(() => {
    // Initial update
    updateMarketData();

    // Set up periodic updates
    const updateInterval = setInterval(() => {
      updateMarketData();
    }, 15 * 60 * 1000); // Check every 15 minutes

    return () => clearInterval(updateInterval);
  }, [selectedFund]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: '100vh',
        backgroundColor: 'background.default',
        py: 4,
        px: 2
      }}>
        <Container maxWidth="xl">
          <Typography 
            variant="h4" 
            align="center" 
            sx={{ 
              mb: 4,
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Index Fund Investment Calculator
          </Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 3,
                flexWrap: 'wrap',
                gap: 2
              }}>
                <Typography variant="h5" sx={{ mb: 0 }}>
                  Index Fund Selection
                </Typography>
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={selectedCurrency}
                    label="Currency"
                    onChange={handleCurrencyChange}
                    sx={{ borderRadius: 2 }}
                  >
                    {Object.entries(CURRENCIES).map(([code, currency]) => (
                      <MenuItem key={code} value={code}>
                        {currency.symbol} {code}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Filters
                </Typography>
                <Grid container spacing={2}>
                  {/* Risk Level Filter */}
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Risk Level</InputLabel>
                      <Select
                        value={filters.riskLevel}
                        label="Risk Level"
                        onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="all">All Risk Levels</MenuItem>
                        <MenuItem value="Very Low" sx={{ color: getRiskColor('Very Low') }}>Very Low Risk</MenuItem>
                        <MenuItem value="Low" sx={{ color: getRiskColor('Low') }}>Low Risk</MenuItem>
                        <MenuItem value="Low-Moderate" sx={{ color: getRiskColor('Low-Moderate') }}>Low-Moderate Risk</MenuItem>
                        <MenuItem value="Moderate" sx={{ color: getRiskColor('Moderate') }}>Moderate Risk</MenuItem>
                        <MenuItem value="Moderate-High" sx={{ color: getRiskColor('Moderate-High') }}>Moderate-High Risk</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Category Filter */}
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={filters.category}
                        label="Category"
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="all">All Categories</MenuItem>
                        {Object.values(FUND_CATEGORIES).map((category) => (
                          <MenuItem key={category} value={category}>{category}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Asset Type Filter */}
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Asset Type</InputLabel>
                      <Select
                        value={filters.assetType}
                        label="Asset Type"
                        onChange={(e) => handleFilterChange('assetType', e.target.value)}
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="all">All Asset Types</MenuItem>
                        <MenuItem value="Pure Equity">Pure Equity</MenuItem>
                        <MenuItem value="Pure Bond">Pure Bond</MenuItem>
                        <MenuItem value="Blended">Blended</MenuItem>
                        <MenuItem value="Money Market">Money Market</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Distribution Type Filter */}
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Distribution Type</InputLabel>
                      <Select
                        value={filters.distributionType}
                        label="Distribution Type"
                        onChange={(e) => handleFilterChange('distributionType', e.target.value)}
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="all">All Types</MenuItem>
                        <MenuItem value="accumulation">Accumulation</MenuItem>
                        <MenuItem value="distribution">Distribution</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>Select an Index Fund</InputLabel>
                  <Select
                    value={selectedFund}
                    label="Select an Index Fund"
                    onChange={handleFundChange}
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="">
                      <em>Select a fund...</em>
                    </MenuItem>
                    
                    {getFilteredFunds().map(([symbol, fund], index, array) => {
                      const isFirstOfRisk = index === 0 || array[index - 1][1].riskLevel !== fund.riskLevel;
                      
                      return [
                        isFirstOfRisk && (
                          <MenuItem
                            key={`${fund.riskLevel}-header`}
                            disabled
                            sx={{
                              backgroundColor: 'background.default',
                              opacity: 0.7,
                              fontWeight: 'bold',
                              color: getRiskColor(fund.riskLevel)
                            }}
                          >
                            {fund.riskLevel} Risk
                          </MenuItem>
                        ),
                        <MenuItem 
                          key={symbol}
                          value={symbol}
                          sx={{
                            borderLeft: `4px solid ${getRiskColor(fund.riskLevel)}`,
                            pl: 3
                          }}
                        >
                          <Box>
                            <Typography>
                              {symbol} - {fund.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Dividend Yield: {(fund.dividendYield * 100).toFixed(2)}% | Category: {fund.category}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ];
                    }).flat().filter(Boolean)}
                  </Select>
                </FormControl>
                {selectedFund && (
                  <Button 
                    onClick={clearFundSelection}
                    sx={{ 
                      mt: 1,
                      borderRadius: 2,
                      textTransform: 'none'
                    }}
                    size="small"
                    color="secondary"
                    variant="outlined"
                  >
                    Clear Selection & Use Custom Values
                  </Button>
                )}
              </Box>

              {selectedFund && (
                <Box sx={{ 
                  mb: 3,
                  p: 2,
                  bgcolor: 'rgba(33, 150, 243, 0.04)',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 2
                }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {INDEX_FUNDS[selectedFund].name} ({selectedFund})
                    </Typography>
                    <Typography color="text.secondary" paragraph>
                      {INDEX_FUNDS[selectedFund].description}
                    </Typography>
                    
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={12} sm={6}>
                        <Chip 
                          label={`Risk Level: ${INDEX_FUNDS[selectedFund].riskLevel}`}
                          sx={{ 
                            mr: 1, 
                            mb: 1,
                            borderColor: getRiskColor(INDEX_FUNDS[selectedFund].riskLevel),
                            color: getRiskColor(INDEX_FUNDS[selectedFund].riskLevel)
                          }}
                          variant="outlined"
                        />
                        <Chip 
                          label={`Category: ${INDEX_FUNDS[selectedFund].category}`}
                          sx={{ mr: 1, mb: 1 }}
                          color="secondary"
                          variant="outlined"
                        />
                        <Chip 
                          label={`Dividend Yield: ${(INDEX_FUNDS[selectedFund].dividendYield * 100).toFixed(2)}%`}
                          sx={{ mr: 1, mb: 1 }}
                          color="success"
                          variant="outlined"
                        />
                        <Chip 
                          label={`ISIN: ${INDEX_FUNDS[selectedFund].isin}`}
                          sx={{ mr: 1, mb: 1 }}
                          color="primary"
                          variant="outlined"
                        />
                        <Chip 
                          label={`Min Investment: ${formatCurrency(INDEX_FUNDS[selectedFund].minimumInvestment)}`}
                          sx={{ mr: 1, mb: 1 }}
                          color="info"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                      Last Updated: {lastUpdate.prices ? new Date(lastUpdate.prices).toLocaleString() : 'Not yet updated'}
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                  }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ color: 'primary.dark', fontWeight: 500 }}>
                      Historical Returns
                    </Typography>
                    <Grid container spacing={2}>
                      {Object.entries(INDEX_FUNDS[selectedFund].historicalReturns).map(([period, value]) => (
                        <Grid item xs={6} sm={3} key={period}>
                          <Box sx={{ 
                            p: 2, 
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.05)',
                            textAlign: 'center'
                          }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {period.replace(/([A-Z])/g, ' $1').trim()}
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'primary.main' }}>
                              {formatPercent(value)}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Investment Calculator
              </Typography>
              
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    fullWidth
                    label={`Initial Investment (${CURRENCIES[selectedCurrency].symbol})`}
                    value={inputs.initialInvestment === 0 ? '' : inputs.initialInvestment.toString()}
                    onChange={(e) => updateInput('initialInvestment', e.target.value)}
                    type="number"
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <TextField
                    fullWidth
                    label={`Monthly Contribution (${CURRENCIES[selectedCurrency].symbol})`}
                    value={inputs.monthlyContribution === 0 ? '' : inputs.monthlyContribution.toString()}
                    onChange={(e) => updateInput('monthlyContribution', e.target.value)}
                    type="number"
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  <TextField
                    fullWidth
                    label="Years"
                    value={inputs.years === 0 ? '' : inputs.years.toString()}
                    onChange={(e) => updateInput('years', e.target.value)}
                    type="number"
                    inputProps={{ min: 1 }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Results
              </Typography>
              
              <Grid container spacing={3}>
                {[
                  { 
                    label: 'Future Value (Without Dividend Reinvestment)', 
                    value: results.futureValue,
                    color: 'primary.main',
                    xs: 12,
                    sm: 6,
                    md: 4
                  },
                  { 
                    label: 'Future Value (With Dividend Reinvestment)', 
                    value: results.futureValueWithDividends,
                    color: '#66bb6a',
                    xs: 12,
                    sm: 6,
                    md: 4
                  },
                  { 
                    label: 'Total Contributions', 
                    value: results.totalContributions,
                    color: 'primary.main',
                    xs: 12,
                    sm: 6,
                    md: 4
                  },
                  { 
                    label: 'Investment Growth', 
                    value: results.futureValueWithDividends - results.totalContributions,
                    color: 'primary.main',
                    xs: 12,
                    sm: 6,
                    md: 4
                  },
                  { 
                    label: 'Projected Yearly Dividend Income', 
                    value: results.yearlyDividends,
                    color: '#66bb6a',
                    xs: 12,
                    sm: 6,
                    md: 4
                  },
                  { 
                    label: 'Expense Cost', 
                    value: results.expenseImpact,
                    color: '#ef5350',
                    xs: 12,
                    sm: 6,
                    md: 4
                  }
                ].map((item) => (
                  <Grid item xs={item.xs} sm={item.sm} md={item.md} key={item.label}>
                    <Box sx={{ 
                      p: 3,
                      bgcolor: 'rgba(33, 150, 243, 0.04)',
                      borderRadius: 2,
                      textAlign: 'center',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}>
                      <Typography color="text.secondary" gutterBottom>
                        {item.label}
                      </Typography>
                      <Typography variant="h5" sx={{ color: item.color, fontWeight: 'bold' }}>
                        {formatCurrency(item.value)}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
