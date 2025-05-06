import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { useTheme } from './context/ThemeContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ExchangeRatesPage from './pages/ExchangeRatesPage';
import AboutPage from './pages/AboutPage';
import ErrorPage from './pages/ErrorPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { theme } = useTheme();

  return (
    <>
      <CssBaseline />
      <div className={`app ${theme}`}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="exchange-rates" element={<ExchangeRatesPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="error" element={<ErrorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;