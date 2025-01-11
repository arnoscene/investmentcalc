import React, { useState, useMemo } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  ThemeProvider,
  createTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  IconButton,
  Stack
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import TimelineIcon from '@mui/icons-material/Timeline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CancelIcon from '@mui/icons-material/Cancel';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer } from 'recharts';

// Sample historical data (in practice, this would come from an API)
const HISTORICAL_DATA = {
  'VWRL': {
    name: 'Vanguard FTSE All-World UCITS ETF',
    provider: 'Vanguard',
    sizeHistory: [
      { date: '2021-01', size: 5.2 },
      { date: '2021-02', size: 5.4 },
      { date: '2021-03', size: 5.6 },
      { date: '2021-04', size: 5.9 },
      { date: '2021-05', size: 6.1 },
      { date: '2021-06', size: 6.3 },
      { date: '2021-07', size: 6.5 },
      { date: '2021-08', size: 6.8 },
      { date: '2021-09', size: 6.7 },
      { date: '2021-10', size: 7.0 },
      { date: '2021-11', size: 6.9 },
      { date: '2021-12', size: 7.1 },
      { date: '2022-01', size: 6.8 },
      { date: '2022-02', size: 6.7 },
      { date: '2022-03', size: 6.9 },
      { date: '2022-04', size: 7.0 },
      { date: '2022-05', size: 7.2 },
      { date: '2022-06', size: 7.0 },
      { date: '2022-07', size: 7.3 },
      { date: '2022-08', size: 7.5 },
      { date: '2022-09', size: 7.2 },
      { date: '2022-10', size: 7.4 },
      { date: '2022-11', size: 7.6 },
      { date: '2022-12', size: 7.5 },
      { date: '2023-01', size: 7.7 },
      { date: '2023-02', size: 7.6 },
      { date: '2023-03', size: 7.5 },
      { date: '2023-04', size: 7.7 },
      { date: '2023-05', size: 7.6 },
      { date: '2023-06', size: 7.7 },
      { date: '2023-07', size: 7.8 },
      { date: '2023-08', size: 7.9 },
      { date: '2023-09', size: 7.7 },
      { date: '2023-10', size: 8.1 },
      { date: '2023-11', size: 8.3 },
      { date: '2023-12', size: 8.5 },
      { date: '2024-01', size: 8.6 }
    ]
  },
  'VUSA': {
    name: 'Vanguard S&P 500 UCITS ETF',
    provider: 'Vanguard',
    sizeHistory: [
      // 2014
      { date: '2014-01', size: 8.2 },
      { date: '2014-06', size: 9.5 },
      { date: '2014-12', size: 11.3 },
      // 2015
      { date: '2015-06', size: 13.2 },
      { date: '2015-12', size: 14.8 },
      // 2016
      { date: '2016-06', size: 15.9 },
      { date: '2016-12', size: 17.4 },
      // 2017
      { date: '2017-06', size: 19.2 },
      { date: '2017-12', size: 20.8 },
      // 2018
      { date: '2018-06', size: 22.1 },
      { date: '2018-12', size: 21.6 },
      // 2019
      { date: '2019-06', size: 24.5 },
      { date: '2019-12', size: 27.2 },
      // 2020
      { date: '2020-06', size: 28.9 },
      { date: '2020-12', size: 31.4 },
      // 2021
      { date: '2021-01', size: 31.8 },
      { date: '2021-02', size: 32.2 },
      { date: '2021-03', size: 32.7 },
      { date: '2021-04', size: 33.1 },
      { date: '2021-05', size: 33.6 },
      { date: '2021-06', size: 34.2 },
      { date: '2021-07', size: 34.8 },
      { date: '2021-08', size: 35.3 },
      { date: '2021-09', size: 35.0 },
      { date: '2021-10', size: 35.6 },
      { date: '2021-11', size: 35.9 },
      { date: '2021-12', size: 36.2 },
      // 2022
      { date: '2022-01', size: 35.8 },
      { date: '2022-02', size: 35.4 },
      { date: '2022-03', size: 35.9 },
      { date: '2022-04', size: 36.2 },
      { date: '2022-05', size: 36.5 },
      { date: '2022-06', size: 35.8 },
      { date: '2022-07', size: 36.4 },
      { date: '2022-08', size: 36.8 },
      { date: '2022-09', size: 36.2 },
      { date: '2022-10', size: 36.7 },
      { date: '2022-11', size: 37.1 },
      { date: '2022-12', size: 36.8 },
      // 2023
      { date: '2023-01', size: 37.2 },
      { date: '2023-02', size: 37.0 },
      { date: '2023-03', size: 36.8 },
      { date: '2023-04', size: 37.1 },
      { date: '2023-05', size: 37.4 },
      { date: '2023-06', size: 37.6 },
      { date: '2023-07', size: 37.8 },
      { date: '2023-08', size: 37.5 },
      { date: '2023-09', size: 37.0 },
      { date: '2023-10', size: 37.4 },
      { date: '2023-11', size: 38.8 },
      { date: '2023-12', size: 39.5 },
      { date: '2024-01', size: 40.1 }
    ]
  },
  'VEVE': {
    name: 'Vanguard FTSE Developed World UCITS ETF',
    provider: 'Vanguard',
    sizeHistory: [
      { date: '2014-01', size: 6.4 },
      { date: '2014-06', size: 7.2 },
      { date: '2014-12', size: 8.5 },
      { date: '2015-06', size: 9.8 },
      { date: '2015-12', size: 11.2 },
      { date: '2016-06', size: 12.4 },
      { date: '2016-12', size: 13.8 },
      { date: '2017-06', size: 15.2 },
      { date: '2017-12', size: 16.5 },
      { date: '2018-06', size: 17.8 },
      { date: '2018-12', size: 17.2 },
      { date: '2019-06', size: 19.4 },
      { date: '2019-12', size: 21.6 },
      { date: '2020-06', size: 22.8 },
      { date: '2020-12', size: 24.2 },
      { date: '2021-01', size: 18.2 },
      { date: '2021-02', size: 18.8 },
      { date: '2021-03', size: 19.3 },
      { date: '2021-04', size: 19.8 },
      { date: '2021-05', size: 20.4 },
      { date: '2021-06', size: 21.0 },
      { date: '2021-07', size: 21.5 },
      { date: '2021-08', size: 22.1 },
      { date: '2021-09', size: 21.8 },
      { date: '2021-10', size: 22.5 },
      { date: '2021-11', size: 22.8 },
      { date: '2021-12', size: 23.2 },
      { date: '2022-01', size: 22.8 },
      { date: '2022-02', size: 22.5 },
      { date: '2022-03', size: 23.0 },
      { date: '2022-04', size: 23.4 },
      { date: '2022-05', size: 23.8 },
      { date: '2022-06', size: 23.2 },
      { date: '2022-07', size: 24.0 },
      { date: '2022-08', size: 24.5 },
      { date: '2022-09', size: 24.0 },
      { date: '2022-10', size: 24.6 },
      { date: '2022-11', size: 25.0 },
      { date: '2022-12', size: 24.8 },
      { date: '2023-01', size: 25.2 },
      { date: '2023-02', size: 25.0 },
      { date: '2023-03', size: 24.8 },
      { date: '2023-04', size: 25.2 },
      { date: '2023-05', size: 25.3 },
      { date: '2023-06', size: 25.4 },
      { date: '2023-07', size: 25.4 },
      { date: '2023-08', size: 25.1 },
      { date: '2023-09', size: 24.8 },
      { date: '2023-10', size: 25.2 },
      { date: '2023-11', size: 26.5 },
      { date: '2023-12', size: 27.1 },
      { date: '2024-01', size: 27.8 }
    ]
  },
  'VFEM': {
    name: 'Vanguard FTSE Emerging Markets UCITS ETF',
    provider: 'Vanguard',
    sizeHistory: [
      { date: '2023-07', size: 6.2 },
      { date: '2023-08', size: 6.0 },
      { date: '2023-09', size: 5.8 },
      { date: '2023-10', size: 5.9 },
      { date: '2023-11', size: 6.1 },
      { date: '2023-12', size: 6.3 },
      { date: '2024-01', size: 6.4 }
    ]
  },
  'VEUR': {
    name: 'Vanguard FTSE Developed Europe UCITS ETF',
    provider: 'Vanguard',
    sizeHistory: [
      { date: '2023-07', size: 15.6 },
      { date: '2023-08', size: 15.3 },
      { date: '2023-09', size: 15.0 },
      { date: '2023-10', size: 15.4 },
      { date: '2023-11', size: 16.2 },
      { date: '2023-12', size: 16.8 },
      { date: '2024-01', size: 17.1 }
    ]
  },
  'VAPX': {
    name: 'Vanguard FTSE Developed Asia Pacific ex Japan UCITS ETF',
    provider: 'Vanguard',
    sizeHistory: [
      { date: '2023-07', size: 4.8 },
      { date: '2023-08', size: 4.6 },
      { date: '2023-09', size: 4.5 },
      { date: '2023-10', size: 4.7 },
      { date: '2023-11', size: 4.9 },
      { date: '2023-12', size: 5.1 },
      { date: '2024-01', size: 5.2 }
    ]
  },
  'VJPN': {
    name: 'Vanguard FTSE Japan UCITS ETF',
    provider: 'Vanguard',
    sizeHistory: [
      { date: '2023-07', size: 5.8 },
      { date: '2023-08', size: 5.6 },
      { date: '2023-09', size: 5.5 },
      { date: '2023-10', size: 5.7 },
      { date: '2023-11', size: 6.0 },
      { date: '2023-12', size: 6.2 },
      { date: '2024-01', size: 6.4 }
    ]
  },
  'VUKE': {
    name: 'Vanguard FTSE 100 UCITS ETF',
    provider: 'Vanguard',
    sizeHistory: [
      { date: '2023-07', size: 12.4 },
      { date: '2023-08', size: 12.1 },
      { date: '2023-09', size: 11.9 },
      { date: '2023-10', size: 12.2 },
      { date: '2023-11', size: 12.8 },
      { date: '2023-12', size: 13.2 },
      { date: '2024-01', size: 13.5 }
    ]
  },
  'VGOV': {
    name: 'Vanguard UK Gilt UCITS ETF',
    provider: 'Vanguard',
    sizeHistory: [
      { date: '2023-07', size: 8.4 },
      { date: '2023-08', size: 8.2 },
      { date: '2023-09', size: 8.0 },
      { date: '2023-10', size: 8.1 },
      { date: '2023-11', size: 8.3 },
      { date: '2023-12', size: 8.5 },
      { date: '2024-01', size: 8.6 }
    ]
  },
  'VHYL': {
    name: 'Vanguard FTSE All-World High Dividend Yield UCITS ETF',
    provider: 'Vanguard',
    sizeHistory: [
      { date: '2023-07', size: 9.2 },
      { date: '2023-08', size: 9.0 },
      { date: '2023-09', size: 8.8 },
      { date: '2023-10', size: 9.1 },
      { date: '2023-11', size: 9.5 },
      { date: '2023-12', size: 9.8 },
      { date: '2024-01', size: 10.0 }
    ]
  },
  'VWRP': {
    name: 'Vanguard FTSE All-World UCITS ETF (GBP Hedged)',
    provider: 'Vanguard',
    sizeHistory: [
      { date: '2023-07', size: 4.2 },
      { date: '2023-08', size: 4.1 },
      { date: '2023-09', size: 4.0 },
      { date: '2023-10', size: 4.2 },
      { date: '2023-11', size: 4.4 },
      { date: '2023-12', size: 4.6 },
      { date: '2024-01', size: 4.7 }
    ]
  },
  'VDEM': {
    name: 'Vanguard FTSE Developed Europe ex UK UCITS ETF',
    provider: 'Vanguard',
    sizeHistory: [
      { date: '2023-07', size: 3.8 },
      { date: '2023-08', size: 3.7 },
      { date: '2023-09', size: 3.6 },
      { date: '2023-10', size: 3.8 },
      { date: '2023-11', size: 4.0 },
      { date: '2023-12', size: 4.2 },
      { date: '2024-01', size: 4.3 }
    ]
  },
  'VMID': {
    name: 'Vanguard FTSE 250 UCITS ETF',
    provider: 'Vanguard',
    sizeHistory: [
      { date: '2023-07', size: 2.8 },
      { date: '2023-08', size: 2.7 },
      { date: '2023-09', size: 2.6 },
      { date: '2023-10', size: 2.7 },
      { date: '2023-11', size: 2.9 },
      { date: '2023-12', size: 3.0 },
      { date: '2024-01', size: 3.1 }
    ]
  },
  'VVAL': {
    name: 'Vanguard Global Value Factor UCITS ETF',
    provider: 'Vanguard',
    sizeHistory: [
      { date: '2023-07', size: 1.8 },
      { date: '2023-08', size: 1.7 },
      { date: '2023-09', size: 1.6 },
      { date: '2023-10', size: 1.7 },
      { date: '2023-11', size: 1.9 },
      { date: '2023-12', size: 2.0 },
      { date: '2024-01', size: 2.1 }
    ]
  },
  'VDPG': {
    name: 'Vanguard Developed World All Cap UCITS ETF',
    provider: 'Vanguard',
    sizeHistory: [
      { date: '2023-07', size: 2.4 },
      { date: '2023-08', size: 2.3 },
      { date: '2023-09', size: 2.2 },
      { date: '2023-10', size: 2.3 },
      { date: '2023-11', size: 2.5 },
      { date: '2023-12', size: 2.6 },
      { date: '2024-01', size: 2.7 }
    ]
  },
  'VNGA': {
    name: 'Vanguard Global Aggregate Bond UCITS ETF (GBP Hedged)',
    provider: 'Vanguard',
    sizeHistory: [
      { date: '2023-07', size: 3.2 },
      { date: '2023-08', size: 3.1 },
      { date: '2023-09', size: 3.0 },
      { date: '2023-10', size: 3.1 },
      { date: '2023-11', size: 3.3 },
      { date: '2023-12', size: 3.4 },
      { date: '2024-01', size: 3.5 }
    ]
  },
  'VFEA': {
    name: 'Vanguard FTSE Emerging Markets UCITS ETF (USD)',
    provider: 'Vanguard',
    sizeHistory: [
      { date: '2023-07', size: 4.6 },
      { date: '2023-08', size: 4.4 },
      { date: '2023-09', size: 4.3 },
      { date: '2023-10', size: 4.4 },
      { date: '2023-11', size: 4.6 },
      { date: '2023-12', size: 4.8 },
      { date: '2024-01', size: 4.9 }
    ]
  },
  'VDLQ': {
    name: 'Vanguard USD Corporate Bond UCITS ETF (GBP Hedged)',
    provider: 'Vanguard',
    sizeHistory: [
      { date: '2023-07', size: 2.6 },
      { date: '2023-08', size: 2.5 },
      { date: '2023-09', size: 2.4 },
      { date: '2023-10', size: 2.5 },
      { date: '2023-11', size: 2.7 },
      { date: '2023-12', size: 2.8 },
      { date: '2024-01', size: 2.9 }
    ]
  },
  'VETY': {
    name: 'Vanguard EUR Eurozone Government Bond UCITS ETF',
    provider: 'Vanguard',
    sizeHistory: [
      { date: '2023-07', size: 2.2 },
      { date: '2023-08', size: 2.1 },
      { date: '2023-09', size: 2.0 },
      { date: '2023-10', size: 2.1 },
      { date: '2023-11', size: 2.3 },
      { date: '2023-12', size: 2.4 },
      { date: '2024-01', size: 2.5 }
    ]
  }
};

const getWarningLevel = (history) => {
  if (history.length < 2) return { level: 'normal', details: [] };
  
  const latest = history[history.length - 1].size;
  const previous = history[history.length - 2].size;
  const threeMonthsAgo = history[Math.max(0, history.length - 4)].size;
  const sixMonthsAgo = history[Math.max(0, history.length - 7)].size;
  
  const monthlyChange = ((latest - previous) / previous) * 100;
  const threeMonthChange = ((latest - threeMonthsAgo) / threeMonthsAgo) * 100;
  const sixMonthChange = ((latest - sixMonthsAgo) / sixMonthsAgo) * 100;

  const details = [];
  let level = 'normal';

  // Check for positive growth
  if (monthlyChange > 5) {
    level = 'excellent';
    details.push(`Strong monthly growth: +${monthlyChange.toFixed(1)}%`);
  } else if (monthlyChange > 2) {
    level = 'good';
    details.push(`Healthy monthly growth: +${monthlyChange.toFixed(1)}%`);
  } else if (monthlyChange > 0) {
    level = 'stable';
    details.push(`Stable monthly growth: +${monthlyChange.toFixed(1)}%`);
  }
  
  // Check for negative trends
  else if (monthlyChange < -10) {
    level = 'severe';
    details.push(`Significant monthly decline: ${monthlyChange.toFixed(1)}%`);
  } else if (monthlyChange < -5) {
    level = 'warning';
    details.push(`Notable monthly decline: ${monthlyChange.toFixed(1)}%`);
  } else if (monthlyChange < -2) {
    level = 'caution';
    details.push(`Minor monthly decline: ${monthlyChange.toFixed(1)}%`);
  }

  // Check three-month trend
  if (threeMonthChange > 10) {
    if (level !== 'excellent') {
      level = 'excellent';
      details.push(`Exceptional 3-month growth: +${threeMonthChange.toFixed(1)}%`);
    }
  } else if (threeMonthChange < -15) {
    level = 'severe';
    details.push(`Severe 3-month decline: ${threeMonthChange.toFixed(1)}%`);
  } else if (threeMonthChange < -10) {
    if (level !== 'severe' && level !== 'excellent') {
      level = 'warning';
      details.push(`Significant 3-month decline: ${threeMonthChange.toFixed(1)}%`);
    }
  }

  // Check six-month trend
  if (sixMonthChange > 15) {
    if (level !== 'excellent') {
      level = 'excellent';
      details.push(`Outstanding 6-month growth: +${sixMonthChange.toFixed(1)}%`);
    }
  } else if (sixMonthChange < -20) {
    level = 'severe';
    details.push(`Critical 6-month decline: ${sixMonthChange.toFixed(1)}%`);
  }

  // Check for volatility
  const volatility = calculateVolatility(history);
  if (volatility > 5) {
    details.push(`High size volatility detected: ${volatility.toFixed(1)}%`);
    if (level !== 'excellent' && level !== 'severe') {
      level = 'warning';
    }
  }

  return { level, details };
};

const calculateVolatility = (history) => {
  if (history.length < 2) return 0;
  
  const changes = [];
  for (let i = 1; i < history.length; i++) {
    const change = ((history[i].size - history[i-1].size) / history[i-1].size) * 100;
    changes.push(change);
  }
  
  const mean = changes.reduce((a, b) => a + b, 0) / changes.length;
  const variance = changes.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / changes.length;
  return Math.sqrt(variance);
};

const getWarningColor = (level) => {
  switch (level) {
    case 'excellent': return '#00c853';  // Bright green for excellent growth
    case 'good': return '#64dd17';       // Light green for good growth
    case 'stable': return '#81c784';     // Pale green for stable growth
    case 'severe': return '#d32f2f';     // Red for severe decline
    case 'warning': return '#f57c00';    // Orange for warning
    case 'caution': return '#ffd700';    // Yellow for caution
    default: return '#4caf50';           // Default green
  }
};

const getWarningMessage = (level) => {
  switch (level) {
    case 'excellent': return 'Exceptional fund growth';
    case 'good': return 'Healthy growth trend';
    case 'stable': return 'Stable positive growth';
    case 'severe': return 'Significant decline detected';
    case 'warning': return 'Notable decrease in fund size';
    case 'caution': return 'Minor decline observed';
    default: return 'Fund size stable';
  }
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#66bb6a',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    }
  }
});

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          {label}
        </Typography>
        <Typography variant="body2" color="primary">
          Size: £{payload[0].value}B
        </Typography>
      </Paper>
    );
  }
  return null;
};

// Add new analytics functions
const calculateMovingAverage = (history, window = 3) => {
  const ma = [];
  for (let i = window - 1; i < history.length; i++) {
    const sum = history.slice(i - window + 1, i + 1).reduce((acc, val) => acc + val.size, 0);
    ma.push({
      date: history[i].date,
      ma: sum / window
    });
  }
  return ma;
};

const calculateMomentum = (history) => {
  const momentum = [];
  for (let i = 1; i < history.length; i++) {
    const current = history[i].size;
    const previous = history[i - 1].size;
    momentum.push({
      date: history[i].date,
      momentum: ((current - previous) / previous) * 100
    });
  }
  return momentum;
};

const calculateRiskMetrics = (history) => {
  const changes = [];
  for (let i = 1; i < history.length; i++) {
    const change = ((history[i].size - history[i-1].size) / history[i-1].size) * 100;
    changes.push(change);
  }
  
  const mean = changes.reduce((a, b) => a + b, 0) / changes.length;
  const variance = changes.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / changes.length;
  const volatility = Math.sqrt(variance);
  
  const totalReturn = ((history[history.length - 1].size - history[0].size) / history[0].size) * 100;
  const riskAdjustedReturn = totalReturn / volatility;
  
  return {
    volatility,
    riskAdjustedReturn,
    meanReturn: mean
  };
};

const rankFundsByRisk = (historicalData) => {
  const rankings = Object.entries(historicalData).map(([symbol, fund]) => {
    const riskMetrics = calculateRiskMetrics(fund.sizeHistory);
    const warningLevel = getWarningLevel(fund.sizeHistory);
    const monthlyChange = ((fund.sizeHistory[fund.sizeHistory.length - 1].size - 
                          fund.sizeHistory[fund.sizeHistory.length - 2].size) / 
                          fund.sizeHistory[fund.sizeHistory.length - 2].size) * 100;
    
    // Calculate a composite score (higher is better)
    const score = (
      (riskMetrics.riskAdjustedReturn * 2) + // Double weight on risk-adjusted returns
      (monthlyChange) + // Recent performance
      (riskMetrics.volatility < 3 ? 2 : 0) + // Bonus for low volatility
      (warningLevel.level === 'excellent' ? 3 : 
       warningLevel.level === 'good' ? 2 : 
       warningLevel.level === 'stable' ? 1 : 0) // Bonus for positive trends
    );

    return {
      symbol,
      name: fund.name,
      riskMetrics,
      monthlyChange,
      warningLevel: warningLevel.level,
      score,
      currentSize: fund.sizeHistory[fund.sizeHistory.length - 1].size
    };
  });

  return rankings.sort((a, b) => b.score - a.score);
};

// Add new metrics for long-term analysis
const calculateLongTermMetrics = (history) => {
  const years = {};
  history.forEach(point => {
    const year = point.date.split('-')[0];
    if (!years[year]) {
      years[year] = [];
    }
    years[year].push(point.size);
  });

  const yearlyReturns = Object.entries(years).map(([year, sizes]) => {
    const startSize = sizes[0];
    const endSize = sizes[sizes.length - 1];
    return {
      year,
      return: ((endSize - startSize) / startSize) * 100
    };
  });

  const maxDrawdown = calculateMaxDrawdown(history);
  const sharpeRatio = calculateSharpeRatio(history);

  return {
    yearlyReturns,
    maxDrawdown,
    sharpeRatio
  };
};

const calculateMaxDrawdown = (history) => {
  let maxDrawdown = 0;
  let peak = history[0].size;

  history.forEach(point => {
    if (point.size > peak) {
      peak = point.size;
    }
    const drawdown = ((peak - point.size) / peak) * 100;
    maxDrawdown = Math.max(maxDrawdown, drawdown);
  });

  return maxDrawdown;
};

const calculateSharpeRatio = (history) => {
  const returns = [];
  for (let i = 1; i < history.length; i++) {
    const monthlyReturn = ((history[i].size - history[i-1].size) / history[i-1].size) * 100;
    returns.push(monthlyReturn);
  }

  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const stdDev = Math.sqrt(returns.reduce((a, b) => a + Math.pow(b - avgReturn, 2), 0) / returns.length);
  const riskFreeRate = 2; // Assuming 2% risk-free rate

  return (avgReturn - riskFreeRate) / stdDev;
};

const calculateCorrelation = (history1, history2) => {
  const commonDates = history1
    .filter(h1 => history2.some(h2 => h2.date === h1.date))
    .map(h => h.date);

  const values1 = commonDates.map(date => 
    history1.find(h => h.date === date).size
  );
  const values2 = commonDates.map(date => 
    history2.find(h => h.date === date).size
  );

  const mean1 = values1.reduce((a, b) => a + b, 0) / values1.length;
  const mean2 = values2.reduce((a, b) => a + b, 0) / values2.length;

  const variance1 = values1.reduce((a, b) => a + Math.pow(b - mean1, 2), 0);
  const variance2 = values2.reduce((a, b) => a + Math.pow(b - mean2, 2), 0);

  const covariance = commonDates.reduce((sum, _, i) => 
    sum + (values1[i] - mean1) * (values2[i] - mean2), 0
  );

  return covariance / Math.sqrt(variance1 * variance2);
};

const FundMonitoring = () => {
  const [selectedFund, setSelectedFund] = useState('');  // For single selection
  const [comparedFunds, setComparedFunds] = useState([]); // For funds being compared
  const [analysisMode, setAnalysisMode] = useState('basic');
  const [showRecommendations, setShowRecommendations] = useState(true);

  // Calculate rankings once
  const fundRankings = useMemo(() => rankFundsByRisk(HISTORICAL_DATA), []);
  
  // Get top 3 recommendations
  const topRecommendations = useMemo(() => fundRankings.slice(0, 3), [fundRankings]);

  // Calculate warning levels for all funds once
  const fundWarningLevels = useMemo(() => {
    const levels = {};
    Object.entries(HISTORICAL_DATA).forEach(([symbol, fund]) => {
      levels[symbol] = getWarningLevel(fund.sizeHistory);
    });
    return levels;
  }, []);

  const handleFundSelect = (event) => {
    setSelectedFund(event.target.value);
  };

  const handleAddToComparison = () => {
    if (selectedFund && !comparedFunds.includes(selectedFund)) {
      setComparedFunds([...comparedFunds, selectedFund]);
      setSelectedFund(''); // Clear selection after adding
    }
  };

  const handleRemoveFromComparison = (fundToRemove) => {
    setComparedFunds(comparedFunds.filter(fund => fund !== fundToRemove));
  };

  const handleAnalysisModeChange = (event, newMode) => {
    if (newMode !== null) {
      setAnalysisMode(newMode);
    }
  };

  // Calculate metrics for all selected funds
  const selectedFundsData = useMemo(() => {
    return comparedFunds.map(symbol => {
      const fund = HISTORICAL_DATA[symbol];
      const warningInfo = fundWarningLevels[symbol];
      
      return {
        ...fund,
        symbol,
        warningInfo,
        movingAverage: calculateMovingAverage(fund.sizeHistory),
        momentum: calculateMomentum(fund.sizeHistory),
        riskMetrics: calculateRiskMetrics(fund.sizeHistory),
        metrics: {
          current: fund.sizeHistory[fund.sizeHistory.length - 1].size,
          yearChange: ((fund.sizeHistory[fund.sizeHistory.length - 1].size - fund.sizeHistory[0].size) / fund.sizeHistory[0].size) * 100
        }
      };
    });
  }, [comparedFunds, fundWarningLevels]);

  const correlationData = useMemo(() => {
    if (comparedFunds.length < 2) return null;

    const correlations = [];
    for (let i = 0; i < comparedFunds.length; i++) {
      for (let j = i + 1; j < comparedFunds.length; j++) {
        const fund1 = HISTORICAL_DATA[comparedFunds[i]];
        const fund2 = HISTORICAL_DATA[comparedFunds[j]];
        const correlation = calculateCorrelation(fund1.sizeHistory, fund2.sizeHistory);
        correlations.push({
          pair: `${comparedFunds[i]} vs ${comparedFunds[j]}`,
          correlation: correlation
        });
      }
    }
    return correlations;
  }, [comparedFunds]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: '100vh',
        backgroundColor: 'background.default',
        py: 4,
        px: 2
      }}>
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
              WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 4
            }}>
              Fund Size Monitoring
            </Typography>

          {showRecommendations && (
            <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                Top 3 Recommended Funds (Risk-Adjusted)
              </Typography>
              <Grid container spacing={3}>
                {topRecommendations.map((fund, index) => (
                  <Grid item xs={12} md={4} key={fund.symbol}>
                    <Paper 
                      elevation={3}
                      sx={{ 
                        p: 2,
                        border: '1px solid',
                        borderColor: getWarningColor(fund.warningLevel),
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '4px',
                          height: '100%',
                          bgcolor: getWarningColor(fund.warningLevel)
                        }}
                      />
                      <Typography variant="h6" gutterBottom>
                        #{index + 1}: {fund.symbol}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        {fund.name}
                      </Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">
                            Risk-Adjusted Return
                          </Typography>
                          <Typography variant="body1" color="primary">
                            {fund.riskMetrics.riskAdjustedReturn.toFixed(2)}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">
                            Volatility
                          </Typography>
                          <Typography 
                            variant="body1" 
                            color={fund.riskMetrics.volatility < 3 ? 'success.main' : 'warning.main'}
                          >
                            {fund.riskMetrics.volatility.toFixed(1)}%
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">
                            Monthly Change
                          </Typography>
                          <Typography 
                            variant="body1" 
                            color={fund.monthlyChange >= 0 ? 'success.main' : 'error.main'}
                          >
                            {fund.monthlyChange.toFixed(1)}%
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">
                            Fund Size
                          </Typography>
                          <Typography variant="body1">
                            £{fund.currentSize.toFixed(1)}B
                          </Typography>
                        </Grid>
                      </Grid>
            <Button
                        variant="outlined"
                        size="small"
                        sx={{ mt: 2 }}
                        onClick={() => {
                          if (!comparedFunds.includes(fund.symbol)) {
                            setComparedFunds([...comparedFunds, fund.symbol]);
                            setAnalysisMode('risk');
                          }
                        }}
                      >
                        Add to Comparison
            </Button>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Select Fund</InputLabel>
                  <Select
                    value={selectedFund}
                    label="Select Fund"
                    onChange={handleFundSelect}
                    MenuProps={{
                      PaperProps: {
                        sx: { maxHeight: 450 }
                      }
                    }}
                  >
                    {Object.entries(HISTORICAL_DATA).map(([symbol, fund]) => {
                      const warningInfo = fundWarningLevels[symbol];
                      const color = getWarningColor(warningInfo.level);
                      const message = getWarningMessage(warningInfo.level);
                      
                      // Don't show already compared funds in the selection
                      if (comparedFunds.includes(symbol)) return null;
                      
                      return (
                        <MenuItem 
                          key={symbol} 
                          value={symbol}
                          sx={{
                            borderLeft: `4px solid ${color}`,
                            '&:hover': {
                              backgroundColor: `${color}10`
                            }
                          }}
                        >
                          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {warningInfo.level === 'excellent' || warningInfo.level === 'good' ? (
                                <TrendingUpIcon sx={{ color, fontSize: 20 }} />
                              ) : warningInfo.level === 'severe' || warningInfo.level === 'warning' ? (
                                <TrendingDownIcon sx={{ color, fontSize: 20 }} />
                              ) : (
                                <InfoIcon sx={{ color, fontSize: 20 }} />
                              )}
                              <Typography>
                        {fund.name} ({symbol})
                              </Typography>
                            </Box>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: 'text.secondary',
                                ml: 3.5
                              }}
                            >
                              {message}
                            </Typography>
                          </Box>
                      </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <Button
                  fullWidth
                  variant="contained"
                  disabled={!selectedFund}
                  onClick={handleAddToComparison}
                  sx={{ mb: 3 }}
                >
                  Add to Comparison
                </Button>

                {comparedFunds.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Currently Comparing
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Stack spacing={1}>
                        {comparedFunds.map(symbol => {
                          const fund = HISTORICAL_DATA[symbol];
                          const warningInfo = fundWarningLevels[symbol];
                          const color = getWarningColor(warningInfo.level);
                          
                          return (
                            <Box
                              key={symbol}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                p: 1,
                                borderRadius: 1,
                                bgcolor: `${color}10`,
                                border: `1px solid ${color}`
                              }}
                            >
                              <Box>
                                <Typography variant="subtitle2">
                                  {symbol}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {fund.name}
                        </Typography>
                      </Box>
                              <IconButton
                                size="small"
                                onClick={() => handleRemoveFromComparison(symbol)}
                                sx={{ 
                                  color: color,
                                  '&:hover': {
                                    color: 'error.main'
                                  }
                                }}
                              >
                                <CancelIcon />
                              </IconButton>
                    </Box>
                          );
                        })}
                      </Stack>
                    </Paper>
                  </Box>
                )}

                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Analysis Mode
                  </Typography>
                  <ToggleButtonGroup
                    value={analysisMode}
                    exclusive
                    onChange={handleAnalysisModeChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    <ToggleButton value="basic">
                      <Tooltip title="Basic Size Comparison">
                        <CompareArrowsIcon />
                      </Tooltip>
                    </ToggleButton>
                    <ToggleButton value="technical">
                      <Tooltip title="Technical Analysis">
                        <TimelineIcon />
                      </Tooltip>
                    </ToggleButton>
                    <ToggleButton value="risk">
                      <Tooltip title="Risk Analysis">
                        <AssessmentIcon />
                      </Tooltip>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>

                {comparedFunds.map(symbol => {
                  const fundData = selectedFundsData.find(f => f.symbol === symbol);
                  if (!fundData) return null;
                  
                  return (
                    <Box key={fundData.symbol} sx={{ mt: 3 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        {fundData.name} ({fundData.symbol})
                      </Typography>
                      
                      {analysisMode === 'basic' && (
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(33, 150, 243, 0.04)' }}>
                              <Typography variant="caption" color="text.secondary">
                                Current Size
                              </Typography>
                              <Typography variant="h6" color="primary">
                                £{fundData.metrics.current.toFixed(1)}B
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(33, 150, 243, 0.04)' }}>
                              <Typography variant="caption" color="text.secondary">
                                Year Change
                              </Typography>
                              <Typography 
                                variant="h6" 
                                color={fundData.metrics.yearChange >= 0 ? 'success.main' : 'error.main'}
                              >
                                {fundData.metrics.yearChange.toFixed(1)}%
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      )}

                      {analysisMode === 'technical' && (
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(33, 150, 243, 0.04)' }}>
                              <Typography variant="caption" color="text.secondary">
                                3M Moving Avg
                              </Typography>
                              <Typography variant="h6" color="primary">
                                £{fundData.movingAverage[fundData.movingAverage.length - 1].ma.toFixed(1)}B
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(33, 150, 243, 0.04)' }}>
                              <Typography variant="caption" color="text.secondary">
                                Momentum
                              </Typography>
                              <Typography 
                                variant="h6" 
                                color={fundData.momentum[fundData.momentum.length - 1].momentum >= 0 ? 'success.main' : 'error.main'}
                              >
                                {fundData.momentum[fundData.momentum.length - 1].momentum.toFixed(1)}%
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      )}

                      {analysisMode === 'risk' && (
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(33, 150, 243, 0.04)' }}>
                              <Typography variant="caption" color="text.secondary">
                                Volatility
                              </Typography>
                              <Typography 
                                variant="h6" 
                                color={fundData.riskMetrics.volatility < 3 ? 'success.main' : 'error.main'}
                              >
                                {fundData.riskMetrics.volatility.toFixed(1)}%
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={6}>
                            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(33, 150, 243, 0.04)' }}>
                              <Typography variant="caption" color="text.secondary">
                                Risk-Adjusted Return
                              </Typography>
                              <Typography variant="h6" color="primary">
                                {fundData.riskMetrics.riskAdjustedReturn.toFixed(2)}
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      )}
                    </Box>
                  );
                })}
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  {analysisMode === 'basic' ? 'Size History Comparison' :
                   analysisMode === 'technical' ? 'Technical Analysis' :
                   'Risk Analysis'}
                </Typography>
                {selectedFundsData.length > 0 ? (
                  <Box sx={{ height: 400, width: '100%' }}>
                    <ResponsiveContainer>
                      <LineChart
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(date) => {
                            const [year, month] = date.split('-');
                            return `${month}/${year.slice(2)}`;
                          }}
                        />
                        <YAxis 
                          domain={['auto', 'auto']}
                          tickFormatter={(value) => 
                            analysisMode === 'basic' ? `£${value}B` :
                            analysisMode === 'technical' ? `£${value}B` :
                            `${value}%`
                          }
                        />
                        <ChartTooltip content={<CustomTooltip />} />
                        
                        {selectedFundsData.map((fundData, index) => {
                          const colors = ['#2196f3', '#4caf50', '#f44336', '#ff9800', '#9c27b0'];
                          
                          if (analysisMode === 'basic') {
                            return (
                              <Line
                                key={fundData.symbol}
                                data={fundData.sizeHistory}
                                type="monotone"
                                dataKey="size"
                                name={fundData.symbol}
                                stroke={colors[index % colors.length]}
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                              />
                            );
                          } else if (analysisMode === 'technical') {
                            return (
                              <React.Fragment key={fundData.symbol}>
                                <Line
                                  data={fundData.sizeHistory}
                                  type="monotone"
                                  dataKey="size"
                                  name={`${fundData.symbol} Size`}
                                  stroke={colors[index % colors.length]}
                                  strokeWidth={2}
                                  dot={{ r: 4 }}
                                />
                                <Line
                                  data={fundData.movingAverage}
                                  type="monotone"
                                  dataKey="ma"
                                  name={`${fundData.symbol} MA`}
                                  stroke={colors[index % colors.length]}
                                  strokeDasharray="5 5"
                                  dot={false}
                                />
                              </React.Fragment>
                            );
                          } else {
                            return (
                              <Line
                                key={fundData.symbol}
                                data={fundData.momentum}
                                type="monotone"
                                dataKey="momentum"
                                name={`${fundData.symbol} Momentum`}
                                stroke={colors[index % colors.length]}
                                strokeWidth={2}
                              />
                            );
                          }
                        })}
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                ) : (
                  <Box sx={{ 
                    height: 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography color="text.secondary">
                      Select funds to compare their performance
                    </Typography>
                  </Box>
                )}

                {correlationData && correlationData.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Fund Correlations
                    </Typography>
                    <Grid container spacing={2}>
                      {correlationData.map((corr, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Paper sx={{ 
                            p: 2, 
                            textAlign: 'center',
                            bgcolor: 'rgba(33, 150, 243, 0.04)',
                            border: '1px solid',
                            borderColor: Math.abs(corr.correlation) > 0.8 ? 'warning.main' : 'primary.main'
                          }}>
                            <Typography variant="subtitle2" gutterBottom>
                              {corr.pair}
                            </Typography>
                            <Typography 
                              variant="h6" 
                              color={Math.abs(corr.correlation) > 0.8 ? 'warning.main' : 'primary.main'}
                            >
                              {(corr.correlation * 100).toFixed(1)}%
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {Math.abs(corr.correlation) > 0.8 ? 'High Correlation' : 'Moderate Correlation'}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      High correlation (>80%) suggests funds move very similarly. Consider diversifying with less correlated funds for better risk management.
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default FundMonitoring; 