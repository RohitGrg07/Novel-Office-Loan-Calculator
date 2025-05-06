import { Box, Typography, Paper, Grid, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Calculator, CreditCard, RefreshCw, Moon, Layers, AlertTriangle, LayoutGrid, Smartphone } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AboutPage = () => {
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
        About This App
      </Typography>
      
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4,
          borderRadius: 2,
          bgcolor: theme === 'light' ? 'white' : '#2d2d2d' 
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: theme === 'light' ? 'text.primary' : 'text.primary' }}>
          About This App
        </Typography>
        <Typography variant="body1" paragraph>
          This Loan Calculator App is a modern, single-page web application built using React JS and Material UI. It allows users to calculate loan EMIs (Equated Monthly Installments), view a detailed amortization schedule, and see real-time currency conversions of their EMI using live exchange rates.
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          <span role="img" aria-label="Features">✨</span> Features
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <Calculator size={24} />
            </ListItemIcon>
            <ListItemText 
              primary="Loan EMI calculation using standard financial formulas" 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Layers size={24} />
            </ListItemIcon>
            <ListItemText 
              primary="Dynamic amortization schedule table with monthly breakdown" 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <RefreshCw size={24} />
            </ListItemIcon>
            <ListItemText 
              primary="Real-time currency conversion of EMI using a live exchange rate API" 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LayoutGrid size={24} />
            </ListItemIcon>
            <ListItemText 
              primary="Paginated exchange rate table for 160+ currencies" 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Moon size={24} />
            </ListItemIcon>
            <ListItemText 
              primary="Dark/Light mode toggle for a customizable experience" 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Smartphone size={24} />
            </ListItemIcon>
            <ListItemText 
              primary="Collapsible header navigation on mobile screens" 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AlertTriangle size={24} />
            </ListItemIcon>
            <ListItemText 
              primary="Error handling and graceful UI fallbacks" 
            />
          </ListItem>
        </List>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          <span role="img" aria-label="Calculator">🧮</span> EMI Formula Used
        </Typography>
        <Typography variant="body1" paragraph>
          The EMI (Equated Monthly Installment) is calculated using the standard formula:
        </Typography>
        <Paper 
          sx={{ 
            p: 3, 
            mb: 3, 
            bgcolor: theme === 'light' ? '#f5f5f5' : '#1e1e1e',
            fontFamily: 'monospace'
          }}
        >
          <Typography variant="body1">
            EMI = [P x R x (1+R)<sup>N</sup>] / [(1+R)<sup>N</sup> - 1]
          </Typography>
        </Paper>
        <Typography variant="body1" paragraph>
          Where:
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="P = Principal loan amount" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="R = Monthly interest rate (annual rate / 12 / 100)" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="N = Loan duration in months" 
            />
          </ListItem>
        </List>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          <span role="img" aria-label="Globe">🌐</span> Currency Conversion API
        </Typography>
        <Typography variant="body1" paragraph>
          This app integrates with the free tier of the ExchangeRate-API to fetch live exchange rates.
        </Typography>
        <Typography variant="body1" paragraph>
          API Endpoint:
        </Typography>
        <Paper 
          sx={{ 
            p: 3, 
            mb: 3, 
            bgcolor: theme === 'light' ? '#f5f5f5' : '#1e1e1e',
            fontFamily: 'monospace',
            overflowX: 'auto'
          }}
        >
          <Typography variant="body2">
            https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD
          </Typography>
        </Paper>
        <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic', color: 'text.secondary' }}>
          Note: For any currency conversion feature to work, make sure the API key is valid and the network allows external API calls.
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          <span role="img" aria-label="Tech">🔧</span> Technologies Used
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="React (Hooks, Routing, Context API)" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Material UI for styling and responsive components" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Axios for API calls" 
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="React Router for navigation" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Custom React hooks for business logic" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Context API for global state management" 
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AboutPage;