import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  useMediaQuery, 
  useTheme as useMuiTheme,
  Switch,
  FormControlLabel
} from '@mui/material';
import { Menu, X, Calculator, DollarSign, Info, AlertTriangle, SunMoon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { text: 'HOME', path: '/', icon: <Calculator size={18} /> },
    { text: 'EXCHANGE RATES (LIVE)', path: '/exchange-rates', icon: <DollarSign size={18} /> },
    { text: 'ABOUT', path: '/about', icon: <Info size={18} /> },
    { text: 'ERROR PAGE', path: '/error', icon: <AlertTriangle size={18} /> }
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Calculator />
          Loan Calculator
        </Typography>

        {isMobile ? (
          <>
            <FormControlLabel
              control={
                <Switch 
                  checked={theme === 'dark'} 
                  onChange={toggleTheme}
                  color="default"
                  size="small"
                />
              }
              label={<SunMoon size={16} />}
              labelPlacement="start"
            />
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <Menu />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer}
            >
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer}
              >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                  <IconButton onClick={toggleDrawer}>
                    <X />
                  </IconButton>
                </Box>
                <List>
                  {navItems.map((item) => (
                    <ListItem 
                      button 
                      component={RouterLink} 
                      to={item.path} 
                      key={item.text}
                      sx={{ 
                        display: 'flex', 
                        gap: 1,
                        borderBottom: '1px solid',
                        borderColor: theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'
                      }}
                    >
                      {item.icon}
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navItems.map((item) => (
              <Button
                component={RouterLink}
                to={item.path}
                key={item.text}
                color="inherit"
                startIcon={item.icon}
                sx={{ 
                  mx: 0.5,
                  textDecoration: 'none',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                {item.text}
              </Button>
            ))}
            <FormControlLabel
              control={
                <Switch 
                  checked={theme === 'dark'} 
                  onChange={toggleTheme}
                  color="default"
                />
              }
              label={<SunMoon size={20} />}
              labelPlacement="start"
              sx={{ ml: 2 }}
            />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;