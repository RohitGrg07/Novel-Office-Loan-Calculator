import { useState, FormEvent } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Calculator } from "lucide-react";
import { useEmiCalculator } from "../../hooks/useEmiCalculator";
import { useCurrency } from "../../context/CurrencyContext";
import AmortizationTable from "./AmortizationTable";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<string>("100000");
  const [interestRate, setInterestRate] = useState<string>("8.5");
  const [loanTerm, setLoanTerm] = useState<string>("5");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  const {
    emi,
    amortizationSchedule,
    totalInterest,
    totalPayment,
    calculateAmortizationSchedule,
  } = useEmiCalculator();
  const { exchangeRates, convertAmount, baseCurrency } = useCurrency();

  const availableCurrencies = Object.keys(exchangeRates).sort();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const term = parseFloat(loanTerm);

    if (isNaN(principal) || isNaN(rate) || isNaN(term)) {
      return;
    }

    calculateAmortizationSchedule({
      principal,
      interestRate: rate,
      tenureYears: term,
    });

    setHasCalculated(true);
  };

  const handleCurrencyChange = (e: SelectChangeEvent<string>) => {
    setSelectedCurrency(e.target.value);
  };

  const handleReset = () => {
    setHasCalculated(false);
    setLoanAmount("100000");
    setInterestRate("8.5");
    setLoanTerm("5");
    setSelectedCurrency("USD");
  };

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const convertedEmi = hasCalculated ? convertAmount(emi, selectedCurrency) : 0;

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 4 }}
      >
        Loan Calculator Dashboard
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Loan Amount"
                  fullWidth
                  variant="outlined"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {baseCurrency}
                      </InputAdornment>
                    ),
                    type: "number",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Interest Rate (%)"
                  fullWidth
                  variant="outlined"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                    type: "number",
                    inputProps: { min: 0, step: 0.01 },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Term (Years)"
                  fullWidth
                  variant="outlined"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Years</InputAdornment>
                    ),
                    type: "number",
                    inputProps: { min: 1, step: 1 },
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center", mt: 1 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  startIcon={<Calculator />}
                  sx={{ px: 4, py: 1 }}
                >
                  CALCULATE
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {hasCalculated && (
        <>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Monthly EMI: {formatCurrency(emi, baseCurrency)}
            </Typography>

            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={selectedCurrency}
                    onChange={handleCurrencyChange}
                    label="Currency"
                  >
                    {availableCurrencies.map((currency) => (
                      <MenuItem key={currency} value={currency}>
                        {currency}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1">
                  Converted EMI:{" "}
                  {formatCurrency(convertedEmi, selectedCurrency)}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={5}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleReset}
                >
                  RESET TABLE
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Loan Summary
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Principal Amount
                    </Typography>
                    <Typography variant="h6">
                      {formatCurrency(parseFloat(loanAmount), baseCurrency)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Total Interest
                    </Typography>
                    <Typography variant="h6">
                      {formatCurrency(totalInterest, baseCurrency)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Total Payment
                    </Typography>
                    <Typography variant="h6">
                      {formatCurrency(totalPayment, baseCurrency)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom>
              Amortization Schedule
            </Typography>
            <AmortizationTable
              amortizationData={amortizationSchedule}
              baseCurrency={baseCurrency}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default LoanCalculator;
