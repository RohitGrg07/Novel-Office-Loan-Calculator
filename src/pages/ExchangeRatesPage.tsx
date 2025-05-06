import { Box, Typography } from '@mui/material';
import ExchangeRateTable from '../components/ExchangeRates/ExchangeRateTable';
import { useTheme } from '../context/ThemeContext';

const ExchangeRatesPage = () => {
  const { theme } = useTheme();

  return (
    <Box sx={{ my: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        align="center"
        sx={{ 
          fontWeight: 'bold',
          color: theme === 'light' ? 'primary.main' : 'primary.light',
          mb: 4
        }}
      >
        Live Exchange Rates
      </Typography>
      
      <Typography 
        variant="body1" 
        paragraph 
        align="center" 
        sx={{ mb: 4 }}
      >
        Below are the current exchange rates from the ExchangeRate API. Rates are updated regularly.
      </Typography>
      
      <ExchangeRateTable />
    </Box>
  );
};

export default ExchangeRatesPage;