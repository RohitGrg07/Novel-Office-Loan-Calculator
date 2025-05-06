import { Outlet } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container 
        component="main" 
        maxWidth="lg" 
        sx={{ 
          flexGrow: 1, 
          py: 4, 
          px: { xs: 2, sm: 3 }
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;