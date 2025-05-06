import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ErrorPage = () => {
  const { theme } = useTheme();
  const [errorMessage] = useState<string>('We encountered an unexpected error while processing your request.');

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '70vh',
        textAlign: 'center',
        px: 2
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          maxWidth: 600, 
          width: '100%',
          borderRadius: 2,
          bgcolor: theme === 'light' ? 'white' : '#2d2d2d',
          border: '1px solid',
          borderColor: 'error.main'
        }}
      >
        <AlertTriangle 
          size={64} 
          color={theme === 'light' ? '#f44336' : '#ff7961'} 
          style={{ margin: '0 auto 16px' }}
        />
        
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          color="error"
          sx={{ fontWeight: 'bold' }}
        >
          Error Encountered
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
          {errorMessage}
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="body2" paragraph sx={{ color: 'text.secondary', mb: 3 }}>
          This is a sample error page. In a real application, this would display actual error details and logs.
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Home />}
            component={RouterLink}
            to="/"
            sx={{ 
              borderRadius: '20px',
              px: 3
            }}
          >
            Back to Home
          </Button>
          
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<RefreshCw />}
            onClick={() => window.location.reload()}
            sx={{ 
              borderRadius: '20px',
              px: 3
            }}
          >
            Refresh Page
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ErrorPage;