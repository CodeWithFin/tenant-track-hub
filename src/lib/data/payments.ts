
import { Payment } from "@/types";
import { v4 as uuidv4 } from 'uuid';
import { format, parseISO, startOfMonth, endOfMonth } from 'date-fns';

// Mock Payments Data
export const payments: Payment[] = [
  {
    id: "pay-001",
    tenantId: "ten-001",
    propertyId: "prop-001",
    amount: 45000,
    date: "2023-08-01",
    method: "bank transfer",
    notes: "August rent",
    bankName: "KCB Bank",
    accountNumber: "1234567890",
  },
  {
    id: "pay-002",
    tenantId: "ten-001",
    propertyId: "prop-001",
    amount: 45000,
    date: "2023-09-02",
    method: "m-pesa",
    notes: "September rent",
    referenceNumber: "QWE123456",
  },
  {
    id: "pay-003",
    tenantId: "ten-002",
    propertyId: "prop-001",
    amount: 48000,
    date: "2023-09-01",
    method: "credit card",
    notes: "September rent",
    referenceNumber: "CC789012",
  },
  {
    id: "pay-004",
    tenantId: "ten-003",
    propertyId: "prop-002",
    amount: 65000,
    date: "2023-09-05",
    method: "cash",
    notes: "September rent",
  },
  {
    id: "pay-005",
    tenantId: "ten-005",
    propertyId: "prop-003",
    amount: 75000,
    date: "2023-09-03",
    method: "paypal",
    notes: "September rent",
    referenceNumber: "PP456789",
  },
  // Adding more payments for better reporting data
  {
    id: "pay-006",
    tenantId: "ten-003",
    propertyId: "prop-002",
    amount: 65000,
    date: "2023-10-04",
    method: "m-pesa",
    notes: "October rent",
    referenceNumber: "MP789123",
  },
  {
    id: "pay-007",
    tenantId: "ten-001",
    propertyId: "prop-001",
    amount: 45000,
    date: "2023-10-01",
    method: "bank transfer",
    notes: "October rent",
    bankName: "Equity Bank",
    accountNumber: "9876543210",
  },
  {
    id: "pay-008",
    tenantId: "ten-002",
    propertyId: "prop-001",
    amount: 48000,
    date: "2023-10-03",
    method: "debit card",
    notes: "October rent",
    referenceNumber: "DC456123",
  },
  {
    id: "pay-009",
    tenantId: "ten-005",
    propertyId: "prop-003",
    amount: 75000,
    date: "2023-10-02",
    method: "check",
    notes: "October rent",
    referenceNumber: "CK123456",
  },
  {
    id: "pay-010",
    tenantId: "ten-001",
    propertyId: "prop-001",
    amount: 45000,
    date: "2023-11-01",
    method: "m-pesa",
    notes: "November rent",
    referenceNumber: "MP234567",
  },
  {
    id: "pay-011",
    tenantId: "ten-002",
    propertyId: "prop-001",
    amount: 48000,
    date: "2023-11-02",
    method: "credit card",
    notes: "November rent",
    referenceNumber: "CC345678",
  },
  {
    id: "pay-012",
    tenantId: "ten-003",
    propertyId: "prop-002",
    amount: 65000,
    date: "2023-11-03",
    method: "bank transfer",
    notes: "November rent",
    bankName: "Cooperative Bank",
    accountNumber: "5678901234",
  }
];

export const getPaymentsForTenant = (tenantId: string): Payment[] => {
  return payments.filter(payment => payment.tenantId === tenantId);
};

export const getTotalRentCollected = (): number => {
  return payments.reduce((total, payment) => total + payment.amount, 0);
};

export const getMonthlyRentCollected = (year: number, month: number): number => {
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(start);
  
  return payments
    .filter(payment => {
      const paymentDate = parseISO(payment.date);
      return paymentDate >= start && paymentDate <= end;
    })
    .reduce((total, payment) => total + payment.amount, 0);
};

export const getPaymentsByPeriod = (startDate: Date, endDate: Date): Payment[] => {
  return payments.filter(payment => {
    const paymentDate = parseISO(payment.date);
    return paymentDate >= startDate && paymentDate <= endDate;
  });
};

export const getPaymentsByMethod = (method: Payment['method']): Payment[] => {
  return payments.filter(payment => payment.method === method);
};

export const addPayment = (payment: Omit<Payment, 'id'>): Payment => {
  const newPayment = { ...payment, id: `pay-${uuidv4().substr(0, 8)}` };
  payments.push(newPayment);
  return newPayment;
};
