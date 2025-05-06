import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button, Paper, Alert } from '@mui/material';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NotFoundPage = () => {
  const { theme } = useTheme();

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
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 3
          }}
        >
          <FileQuestion 
            size={64} 
            color={theme === 'light' ? '#f44336' : '#ff7961'} 
          />
        </Box>

        <Alert severity="error" sx={{ mb: 3 }}>
          404 - Page Not Found
        </Alert>
        
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
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
            startIcon={<ArrowLeft />}
            onClick={() => window.history.back()}
            sx={{ 
              borderRadius: '20px',
              px: 3
            }}
          >
            Go Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default NotFoundPage;