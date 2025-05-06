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
  Button,
  Pagination,
  useMediaQuery,
  useTheme as useMuiTheme,
} from '@mui/material';
import { ArrowUpDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

type AmortizationRow = {
  month: number;
  principal: number;
  interest: number;
  balance: number;
  emi: number;
};

type AmortizationTableProps = {
  amortizationData: AmortizationRow[];
  baseCurrency: string;
};

const AmortizationTable = ({ amortizationData, baseCurrency }: AmortizationTableProps) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  
  const [page, setPage] = useState<number>(1);
  const [sortField, setSortField] = useState<keyof AmortizationRow>('month');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const rowsPerPage = 10;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: baseCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  
  const handleSort = (field: keyof AmortizationRow) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const sortedData = [...amortizationData].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });
  
  const paginatedData = sortedData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  
  const totalPages = Math.ceil(amortizationData.length / rowsPerPage);
  
  return (
    <Box>
      <TableContainer 
        component={Paper} 
        sx={{ 
          maxHeight: 440,
          boxShadow: 2,
          borderRadius: 2,
          bgcolor: theme === 'light' ? 'white' : '#2d2d2d'
        }}
      >
        <Table stickyHeader size={isMobile ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Button 
                  size="small" 
                  endIcon={<ArrowUpDown size={16} />} 
                  onClick={() => handleSort('month')}
                  sx={{ textTransform: 'none' }}
                >
                  Month
                </Button>
              </TableCell>
              <TableCell>
                <Button 
                  size="small" 
                  endIcon={<ArrowUpDown size={16} />} 
                  onClick={() => handleSort('principal')}
                  sx={{ textTransform: 'none' }}
                >
                  Principal
                </Button>
              </TableCell>
              <TableCell>
                <Button 
                  size="small" 
                  endIcon={<ArrowUpDown size={16} />} 
                  onClick={() => handleSort('interest')}
                  sx={{ textTransform: 'none' }}
                >
                  Interest
                </Button>
              </TableCell>
              <TableCell>
                <Button 
                  size="small" 
                  endIcon={<ArrowUpDown size={16} />} 
                  onClick={() => handleSort('balance')}
                  sx={{ textTransform: 'none' }}
                >
                  Remaining Balance
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow 
                key={row.month}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { 
                    bgcolor: theme === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)'
                  }
                }}
              >
                <TableCell>{row.month}</TableCell>
                <TableCell>{formatCurrency(row.principal)}</TableCell>
                <TableCell>{formatCurrency(row.interest)}</TableCell>
                <TableCell>{formatCurrency(row.balance)}</TableCell>
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

export default AmortizationTable;