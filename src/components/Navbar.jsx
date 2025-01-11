import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: 2 }}>
      <Toolbar>
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          <Button
            color="primary"
            variant={isActive('/investmentCalc/') ? 'contained' : 'text'}
            onClick={() => navigate('/investmentCalc/')}
          >
            Calculator
          </Button>
          <Button
            color="primary"
            variant={isActive('/investmentCalc/compare') ? 'contained' : 'text'}
            onClick={() => navigate('/investmentCalc/compare')}
          >
            Compare Funds
          </Button>
          <Button
            color="primary"
            variant={isActive('/investmentCalc/monitor') ? 'contained' : 'text'}
            onClick={() => navigate('/investmentCalc/monitor')}
          >
            Monitor
          </Button>
          <Button
            color="primary"
            variant={isActive('/investmentCalc/headlines') ? 'contained' : 'text'}
            onClick={() => navigate('/investmentCalc/headlines')}
          >
            Headlines
          </Button>
          <Button
            color="primary"
            variant={isActive('/investmentCalc/faq') ? 'contained' : 'text'}
            onClick={() => navigate('/investmentCalc/faq')}
          >
            FAQ
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 