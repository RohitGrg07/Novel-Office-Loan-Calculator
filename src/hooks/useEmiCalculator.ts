import { useState, useCallback } from 'react';

type LoanData = {
  principal: number;
  interestRate: number;
  tenureYears: number;
};

type AmortizationRow = {
  month: number;
  principal: number;
  interest: number;
  balance: number;
  emi: number;
};

export const useEmiCalculator = () => {
  const [emi, setEmi] = useState<number>(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  const calculateEmi = useCallback((principal: number, interestRate: number, tenureYears: number) => {
    // Convert annual interest rate to monthly and decimal form
    const monthlyRate = interestRate / 12 / 100;
    
    // Convert tenure from years to months
    const tenureMonths = tenureYears * 12;
    
    // Calculate EMI using the formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
    const emiValue = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
                    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    
    return isNaN(emiValue) || !isFinite(emiValue) ? 0 : emiValue;
  }, []);

  const calculateAmortizationSchedule = useCallback((loanData: LoanData) => {
    const { principal, interestRate, tenureYears } = loanData;
    
    // Calculate EMI
    const calculatedEmi = calculateEmi(principal, interestRate, tenureYears);
    setEmi(calculatedEmi);
    
    // Calculate amortization schedule
    const monthlyRate = interestRate / 12 / 100;
    const tenureMonths = tenureYears * 12;
    
    let balance = principal;
    let totalInterestPaid = 0;
    const schedule: AmortizationRow[] = [];
    
    for (let month = 1; month <= tenureMonths; month++) {
      const interestForMonth = balance * monthlyRate;
      const principalForMonth = calculatedEmi - interestForMonth;
      
      balance -= principalForMonth;
      totalInterestPaid += interestForMonth;
      
      schedule.push({
        month,
        principal: principalForMonth,
        interest: interestForMonth,
        balance: Math.max(0, balance), // Ensure balance never goes below 0
        emi: calculatedEmi
      });
    }
    
    setAmortizationSchedule(schedule);
    setTotalInterest(totalInterestPaid);
    setTotalPayment(principal + totalInterestPaid);
    
    return {
      emi: calculatedEmi,
      schedule,
      totalInterest: totalInterestPaid,
      totalPayment: principal + totalInterestPaid
    };
  }, [calculateEmi]);

  return {
    emi,
    amortizationSchedule,
    totalInterest,
    totalPayment,
    calculateEmi,
    calculateAmortizationSchedule
  };
};