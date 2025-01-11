import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
  Tooltip,
  ThemeProvider,
  createTheme
} from '@mui/material';

// Create theme to match the calculator page
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
    },
    text: {
      primary: '#2c3e50',
      secondary: '#546e7a',
    },
  },
  components: {
    MuiPaper: {
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
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 'bold',
          backgroundColor: 'rgba(33, 150, 243, 0.04)',
        },
      },
    },
  },
});

const TOP_FUNDS = {
  Vanguard: [
    {
      name: "FTSE All-World UCITS ETF (VWRL)",
      fee: 0.22,
      size: "£7.2B",
      sizeValue: 7.2,
      yield: 2.1,
      risk: "Moderate",
      description: "Global exposure to developed and emerging markets",
      type: "Accumulation/Distribution",
      rating: 5,
      returns: {
        oneYear: 12.4,
        threeYear: 8.9,
        fiveYear: 9.8
      }
    },
    {
      name: "S&P 500 UCITS ETF (VUSA)",
      fee: 0.07,
      size: "£4.8B",
      sizeValue: 4.8,
      yield: 1.4,
      risk: "Moderate",
      description: "Tracks top 500 US companies",
      type: "Distribution",
      rating: 5,
      returns: {
        oneYear: 14.2,
        threeYear: 10.1,
        fiveYear: 11.3
      }
    }
  ],
  BlackRock: [
    {
      name: "iShares Core MSCI World UCITS ETF (IWDA)",
      fee: 0.20,
      size: "£39.8B",
      sizeValue: 39.8,
      yield: 1.2,
      risk: "Moderate",
      description: "Global developed market exposure",
      type: "Accumulation",
      rating: 5,
      returns: {
        oneYear: 11.8,
        threeYear: 8.5,
        fiveYear: 9.2
      }
    },
    {
      name: "iShares Core S&P 500 UCITS ETF (CSPX)",
      fee: 0.07,
      size: "£45.6B",
      sizeValue: 45.6,
      yield: 1.3,
      risk: "Moderate",
      description: "Tracks S&P 500 index",
      type: "Accumulation",
      rating: 5,
      returns: {
        oneYear: 14.1,
        threeYear: 10.0,
        fiveYear: 11.2
      }
    }
  ],
  HSBC: [
    {
      name: "FTSE All-World Index Fund (HMWO)",
      fee: 0.13,
      size: "£3.2B",
      sizeValue: 3.2,
      yield: 1.9,
      risk: "Moderate",
      description: "Global equity exposure at very low cost",
      type: "Accumulation",
      rating: 4,
      returns: {
        oneYear: 12.1,
        threeYear: 8.7,
        fiveYear: 9.5
      }
    },
    {
      name: "FTSE 250 Index Fund",
      fee: 0.12,
      size: "£1.1B",
      sizeValue: 1.1,
      yield: 2.8,
      risk: "Moderate-High",
      description: "Exposure to UK mid-cap companies",
      type: "Accumulation/Distribution",
      rating: 4,
      returns: {
        oneYear: 9.8,
        threeYear: 6.2,
        fiveYear: 7.4
      }
    }
  ],
  "Legal & General": [
    {
      name: "International Index Trust",
      fee: 0.13,
      size: "£3.4B",
      sizeValue: 3.4,
      yield: 2.0,
      risk: "Moderate",
      description: "International developed markets exposure",
      type: "Accumulation",
      rating: 4,
      returns: {
        oneYear: 11.5,
        threeYear: 8.3,
        fiveYear: 9.0
      }
    },
    {
      name: "Global Technology Index Trust",
      fee: 0.32,
      size: "£1.8B",
      sizeValue: 1.8,
      yield: 0.5,
      risk: "High",
      description: "Global technology sector exposure",
      type: "Accumulation",
      rating: 4,
      returns: {
        oneYear: 18.5,
        threeYear: 12.8,
        fiveYear: 15.2
      }
    }
  ]
};

const getRiskColor = (risk) => {
  switch (risk) {
    case 'Low':
      return '#4CAF50';
    case 'Moderate':
      return '#FFA726';
    case 'Moderate-High':
      return '#FF7043';
    case 'High':
      return '#F44336';
    default:
      return '#757575';
  }
};

const FundComparison = () => {
  const maxFundSize = Math.max(...Object.values(TOP_FUNDS).flatMap(funds => 
    funds.map(fund => fund.sizeValue)
  ));

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
            Top Fund Comparison
          </Typography>

          <Paper sx={{ 
            mb: 4, 
            p: 3, 
            borderRadius: 2,
            backgroundColor: 'rgba(33, 150, 243, 0.04)'
          }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.dark', fontWeight: 600 }}>
              Understanding Fund Size and Returns
            </Typography>
            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              <Box sx={{ flex: 1, minWidth: 300 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ color: 'primary.main', fontWeight: 500 }}>
                  Why similar returns despite different sizes?
                </Typography>
                <Typography paragraph>
                  Most of these funds are "index trackers" - they simply follow a market index (like the S&P 500). 
                  Whether a fund has £1B or £45B, they're buying the same proportions of the same companies, 
                  so their returns tend to be very similar. The main differences come from:
                </Typography>
                <Box component="ul" sx={{ mt: 1 }}>
                  <Box component="li">
                    <Typography>
                      <strong>Fees:</strong> Larger funds can often charge lower fees due to economies of scale
                    </Typography>
                  </Box>
                  <Box component="li">
                    <Typography>
                      <strong>Tracking Accuracy:</strong> How closely they follow their target index
                    </Typography>
                  </Box>
                  <Box component="li">
                    <Typography>
                      <strong>Trading Costs:</strong> Larger funds might get better dealing prices
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ flex: 1, minWidth: 300 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ color: 'primary.main', fontWeight: 500 }}>
                  What does fund size actually mean?
                </Typography>
                <Typography paragraph>
                  Fund size shows how much money investors have put into the fund, not its performance. 
                  A larger size often indicates:
                </Typography>
                <Box component="ul" sx={{ mt: 1 }}>
                  <Box component="li">
                    <Typography>
                      <strong>Popularity:</strong> More investors trust the fund
                    </Typography>
                  </Box>
                  <Box component="li">
                    <Typography>
                      <strong>Stability:</strong> Less likely to close or have liquidity issues
                    </Typography>
                  </Box>
                  <Box component="li">
                    <Typography>
                      <strong>Cost Efficiency:</strong> Can often offer lower fees
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>

          {Object.entries(TOP_FUNDS).map(([provider, funds]) => (
            <Paper key={provider} sx={{ 
              mb: 4, 
              p: 3, 
              borderRadius: 2,
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px 0 rgba(0,0,0,0.15)',
              },
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            }}>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  mb: 3
                }}
              >
                {provider}
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Fund Name</TableCell>
                      <TableCell align="right">Fee (%)</TableCell>
                      <TableCell align="right">Fund Size</TableCell>
                      <TableCell align="right">Returns (%)</TableCell>
                      <TableCell align="right">Dividend Yield (%)</TableCell>
                      <TableCell>Risk Level</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Rating</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {funds.map((fund) => (
                      <TableRow 
                        key={fund.name} 
                        hover
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(33, 150, 243, 0.04)',
                          }
                        }}
                      >
                        <TableCell>
                          <Tooltip 
                            title={fund.description} 
                            arrow
                            placement="right"
                          >
                            <Box>
                              <Typography 
                                variant="body1" 
                                sx={{ fontWeight: 500 }}
                              >
                                {fund.name}
                              </Typography>
                              <Typography 
                                variant="caption" 
                                color="text.secondary"
                                sx={{ display: 'block', mt: 0.5 }}
                              >
                                {fund.description}
                              </Typography>
                            </Box>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="right">
                          <Chip 
                            label={fund.fee.toFixed(2) + '%'}
                            size="small"
                            color={fund.fee < 0.15 ? 'success' : 'default'}
                            sx={{ 
                              fontWeight: 500,
                              minWidth: '60px'
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                            <Typography sx={{ fontWeight: 500 }}>
                              {fund.size}
                            </Typography>
                            <Box
                              sx={{
                                width: '60px',
                                height: '4px',
                                backgroundColor: 'primary.main',
                                borderRadius: '2px',
                                opacity: 0.3,
                                position: 'relative',
                                overflow: 'hidden'
                              }}
                            >
                              <Box
                                sx={{
                                  position: 'absolute',
                                  left: 0,
                                  top: 0,
                                  height: '100%',
                                  width: `${(fund.sizeValue / maxFundSize) * 100}%`,
                                  backgroundColor: 'primary.main',
                                  opacity: 1
                                }}
                              />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <Typography sx={{ fontWeight: 600, color: 'primary.main' }}>
                              {fund.returns.fiveYear}% (5Y)
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {fund.returns.threeYear}% (3Y) | {fund.returns.oneYear}% (1Y)
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Typography sx={{ fontWeight: 500 }}>
                            {fund.yield.toFixed(1)}%
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={fund.risk}
                            size="small"
                            sx={{ 
                              backgroundColor: getRiskColor(fund.risk),
                              color: 'white',
                              fontWeight: 500,
                              minWidth: '100px'
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography sx={{ fontWeight: 500 }}>
                            {fund.type}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ 
                            display: 'flex', 
                            gap: 0.5,
                            color: '#FFD700',
                            fontSize: '1.1rem'
                          }}>
                            {[...Array(fund.rating)].map((_, i) => (
                              <span key={i}>★</span>
                            ))}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          ))}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default FundComparison; 