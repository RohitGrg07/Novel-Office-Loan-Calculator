import { Box, Typography, Link, Divider } from '@mui/material';
import { Heart, Github } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme === 'light' ? '#f5f5f5' : '#1e1e1e',
        borderTop: '1px solid',
        borderColor: theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'
      }}
    >
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant="body2" color="text.secondary">
          © {currentYear} Loan Calculator App
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Made with
          </Typography>
          <Heart size={16} color={theme === 'light' ? '#f44336' : '#ff6659'} />
          <Typography variant="body2" color="text.secondary">
            by
          </Typography>
          <Link 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 0.5,
              textDecoration: 'none',
              color: theme === 'light' ? '#1976d2' : '#90caf9'
            }}
          >
            <Github size={16} />
            <Typography variant="body2">
              GitHub
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;