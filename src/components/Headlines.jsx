import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  ThemeProvider,
  createTheme,
  IconButton,
} from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Wave from 'react-wavify';

// Create a dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
    },
    background: {
      default: '#0A1929',
      paper: '#132F4C',
    },
    text: {
      primary: '#ffffff',
      secondary: '#B2BAC2',
    }
  }
});

const Headlines = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX);
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const getIcon = (index) => {
    const icons = [
      <LightbulbOutlinedIcon fontSize="small" />,
      <SearchOutlinedIcon fontSize="small" />,
      <FolderOutlinedIcon fontSize="small" />,
      <StorageOutlinedIcon fontSize="small" />,
      <TimelineIcon fontSize="small" />,
      <TrendingUpIcon fontSize="small" />,
      <ShowChartIcon fontSize="small" />,
      <AssessmentIcon fontSize="small" />,
      <AccountBalanceIcon fontSize="small" />
    ];
    return icons[index % icons.length];
  };

  // Calculate years in reverse order (2025 to 2017)
  const years = Array.from({ length: 9 }, (_, i) => 2025 - i);

  // Sample data points for the graph (we can adjust these values)
  const graphData = [
    { year: 2025, value: 65 },
    { year: 2024, value: 45 },
    { year: 2023, value: 75 },
    { year: 2022, value: 35 },
    { year: 2021, value: 55 },
    { year: 2020, value: 25 },
    { year: 2019, value: 60 },
    { year: 2018, value: 40 },
    { year: 2017, value: 50 }
  ];

  // Modify the graph data to be used for wave positioning
  const wavePoints = graphData.map(point => ({
    ...point,
    value: point.value / 100 // Convert to percentage for wave height
  }));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        backgroundColor: 'background.default',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <Container maxWidth="xl" sx={{ overflow: 'hidden', position: 'relative', zIndex: 1 }}>
          <Box sx={{ 
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            height: '300px',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              right: 0,
              top: '50%',
              height: '16px',
              transform: 'translateY(-50%)',
              background: 'linear-gradient(90deg, #ff5252, #ffd740, #69f0ae, #40c4ff)',
              zIndex: 0,
              borderRadius: '8px'
            }
          }}>
            {/* Replace SVG graph with Wave */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              pointerEvents: 'none',
              opacity: 0.6
            }}>
              <Wave 
                fill="url(#graphGradient)"
                paused={false}
                options={{
                  height: 60,
                  amplitude: 15,
                  speed: 0.2,
                  points: 8
                }}
                style={{
                  transform: 'rotate(180deg)', // Flip the wave upside down
                  marginTop: '-50px' // Adjust position
                }}
              >
                <defs>
                  <linearGradient id="graphGradient" x1="0" x2="1">
                    <stop offset="0%" stopColor="rgba(255,82,82,0.4)" />
                    <stop offset="33%" stopColor="rgba(255,215,64,0.4)" />
                    <stop offset="66%" stopColor="rgba(105,240,174,0.4)" />
                    <stop offset="100%" stopColor="rgba(64,196,255,0.4)" />
                  </linearGradient>
                </defs>
              </Wave>
              <Wave 
                fill="url(#graphGradient2)"
                paused={false}
                options={{
                  height: 40,
                  amplitude: 10,
                  speed: 0.15,
                  points: 6
                }}
                style={{
                  transform: 'rotate(180deg)', // Flip the wave upside down
                  marginTop: '-90px' // Adjust position
                }}
              >
                <defs>
                  <linearGradient id="graphGradient2" x1="0" x2="1">
                    <stop offset="0%" stopColor="rgba(255,82,82,0.2)" />
                    <stop offset="33%" stopColor="rgba(255,215,64,0.2)" />
                    <stop offset="66%" stopColor="rgba(105,240,174,0.2)" />
                    <stop offset="100%" stopColor="rgba(64,196,255,0.2)" />
                  </linearGradient>
                </defs>
              </Wave>
            </Box>

            <Box 
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              sx={{
                display: 'flex',
                position: 'relative',
                px: 4,
                overflowX: 'scroll',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                cursor: isDragging ? 'grabbing' : 'grab',
                '&::-webkit-scrollbar': {
                  display: 'none'
                },
                gap: 6,
                width: '100%',
                WebkitUserSelect: 'none',
                userSelect: 'none',
                zIndex: 2
              }}
            >
              {years.map((year, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    minWidth: '220px',
                    opacity: 0,
                    animation: 'fadeIn 0.5s forwards',
                    animationDelay: `${index * 0.15}s`,
                    '@keyframes fadeIn': {
                      from: { opacity: 0, transform: 'translateY(20px)' },
                      to: { opacity: 1, transform: 'translateY(0)' }
                    },
                    ...(index % 2 === 0 ? {
                      marginTop: '-120px',
                    } : {
                      marginTop: '120px',
                    })
                  }}
                >
                  <Paper
                    sx={{
                      p: 2,
                      position: 'relative',
                      background: 'linear-gradient(45deg, rgba(19, 47, 76, 0.4), rgba(19, 47, 76, 0.8))',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                      border: '1px solid rgba(255,255,255,0.1)',
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        ...(index % 2 === 0 ? {
                          bottom: '-20px',
                          left: '50%',
                          transform: 'translateX(-50%) rotate(45deg)',
                          borderBottom: '1px solid rgba(255,255,255,0.1)',
                          borderRight: '1px solid rgba(255,255,255,0.1)',
                        } : {
                          top: '-20px',
                          left: '50%',
                          transform: 'translateX(-50%) rotate(45deg)',
                          borderTop: '1px solid rgba(255,255,255,0.1)',
                          borderLeft: '1px solid rgba(255,255,255,0.1)',
                        }),
                        width: 20,
                        height: 20,
                        background: 'inherit',
                        clipPath: 'polygon(0 0, 100% 100%, 100% 0)',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                        }}
                      >
                        {getIcon(index)}
                      </IconButton>
                      <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
                        {year}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Headlines; 