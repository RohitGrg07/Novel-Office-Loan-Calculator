import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

type ExchangeRates = {
  [key: string]: number;
};

type CurrencyContextType = {
  baseCurrency: string;
  exchangeRates: ExchangeRates;
  isLoading: boolean;
  error: string | null;
  setBaseCurrency: (currency: string) => void;
  convertAmount: (amount: number, toCurrency: string) => number;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiKey = '0f9840cf419a19591d3a9e22';
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`,
          {
            timeout: 10000, // 10 second timeout
            headers: {
              'Accept': 'application/json',
            }
          }
        );

        if (response.data.result === 'success') {
          setExchangeRates(response.data.conversion_rates);
        } else {
          throw new Error('Failed to fetch exchange rates');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error fetching exchange rates';
        setError(errorMessage);
        console.error('Error fetching exchange rates:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRates();
  }, [baseCurrency]);

  const convertAmount = (amount: number, toCurrency: string): number => {
    if (!exchangeRates[toCurrency]) return amount;
    return amount * exchangeRates[toCurrency];
  };

  return (
    <CurrencyContext.Provider
      value={{
        baseCurrency,
        exchangeRates,
        isLoading,
        error,
        setBaseCurrency,
        convertAmount,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};