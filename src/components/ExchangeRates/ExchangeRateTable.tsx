import { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Typography,
  Pagination,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Search } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useTheme } from '../../context/ThemeContext';

const ExchangeRateTable = () => {
  const { baseCurrency, exchangeRates, isLoading, error } = useCurrency();
  const { theme } = useTheme();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 15;
  
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Please check your internet connection and try again later.
        </Typography>
      </Box>
    );
  }
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };
  
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  
  const ratesArray = Object.entries(exchangeRates)
    .filter(([currency]) => 
      currency.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a[0].localeCompare(b[0]));
  
  const paginatedRates = ratesArray.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  
  const totalPages = Math.ceil(ratesArray.length / rowsPerPage);
  
  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search currency..."
        value={searchTerm}
        onChange={handleSearch}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={20} />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />
      
      <TableContainer 
        component={Paper} 
        sx={{ 
          mb: 3,
          boxShadow: 2,
          borderRadius: 2,
          bgcolor: theme === 'light' ? 'white' : '#2d2d2d'
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Currency</TableCell>
              <TableCell>Rate (1 {baseCurrency} =)</TableCell>
              <TableCell>Inverse Rate (1 = {baseCurrency})</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRates.map(([currency, rate]) => (
              <TableRow 
                key={currency}
                sx={{ 
                  '&:hover': {
                    bgcolor: theme === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)'
                  }
                }}
              >
                <TableCell 
                  sx={{ 
                    fontWeight: currency === baseCurrency ? 'bold' : 'normal',
                    color: currency === baseCurrency ? 'primary.main' : 'inherit'
                  }}
                >
                  {currency}
                </TableCell>
                <TableCell>{rate.toFixed(6)}</TableCell>
                <TableCell>{(1 / rate).toFixed(6)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={handleChangePage} 
          color="primary" 
          variant="outlined" 
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

export default ExchangeRateTable;