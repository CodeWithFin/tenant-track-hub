
import { differenceInDays, differenceInMonths, addMonths, startOfMonth, endOfMonth, isAfter } from "date-fns";

// Late fee calculation
export const calculateLateFee = (
  rentAmount: number, 
  dueDate: Date, 
  paymentDate: Date, 
  lateFeePercentage: number = 5, 
  maxLateFee: number = 0 // 0 means no maximum
): number => {
  // If payment date is on or before due date, no late fee
  if (!isAfter(paymentDate, dueDate)) {
    return 0;
  }
  
  // Calculate days late
  const daysLate = differenceInDays(paymentDate, dueDate);
  
  // Calculate late fee amount
  const lateFeeAmount = (rentAmount * (lateFeePercentage / 100));
  
  // If maxLateFee is set (not 0), cap the late fee
  if (maxLateFee > 0) {
    return Math.min(lateFeeAmount, maxLateFee);
  }
  
  return lateFeeAmount;
};

// Prorated rent calculation
export const calculateProratedRent = (
  monthlyRentAmount: number, 
  leaseStartDate: Date, 
  isFirstMonth: boolean = true
): number => {
  const startOfCurrentMonth = startOfMonth(leaseStartDate);
  const endOfCurrentMonth = endOfMonth(leaseStartDate);
  
  // If lease starts on the 1st of the month, return full month's rent
  if (isFirstMonth && leaseStartDate.getDate() === 1) {
    return monthlyRentAmount;
  }
  
  const totalDaysInMonth = differenceInDays(endOfCurrentMonth, startOfCurrentMonth) + 1;
  const daysOccupied = differenceInDays(endOfCurrentMonth, leaseStartDate) + 1;
  
  return Math.round((monthlyRentAmount / totalDaysInMonth) * daysOccupied);
};

// Security deposit interest calculation
export const calculateDepositInterest = (
  depositAmount: number, 
  interestRate: number, 
  months: number
): number => {
  // Simple interest calculation: principal * rate * time
  // where time is in years, so we divide months by 12
  const interest = depositAmount * (interestRate / 100) * (months / 12);
  return Math.round(interest);
};

// Tax calculation for rental income
export const calculateRentalTax = (
  annualRentalIncome: number, 
  deductibleExpenses: number, 
  taxRate: number
): { taxableIncome: number; taxAmount: number } => {
  const taxableIncome = Math.max(0, annualRentalIncome - deductibleExpenses);
  const taxAmount = taxableIncome * (taxRate / 100);
  
  return {
    taxableIncome,
    taxAmount
  };
};

// Calculate annual rent from monthly rent
export const calculateAnnualRent = (monthlyRent: number): number => {
  return monthlyRent * 12;
};

// Calculate rent increase
export const calculateRentIncrease = (
  currentRent: number, 
  increasePercentage: number
): { newRent: number; increase: number } => {
  const increase = currentRent * (increasePercentage / 100);
  const newRent = currentRent + increase;
  
  return {
    newRent: Math.round(newRent),
    increase: Math.round(increase)
  };
};

// Calculate lease renewal financial summary
export const calculateLeaseRenewal = (
  currentRent: number, 
  increasePercentage: number, 
  leaseTerm: number // months
): { 
  monthlyRent: number; 
  increase: number; 
  totalContractValue: number 
} => {
  const { newRent, increase } = calculateRentIncrease(currentRent, increasePercentage);
  const totalContractValue = newRent * leaseTerm;
  
  return {
    monthlyRent: newRent,
    increase: increase,
    totalContractValue: totalContractValue
  };
};
