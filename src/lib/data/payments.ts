
import { Payment } from "@/types";
import { v4 as uuidv4 } from 'uuid';

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
];

export const getPaymentsForTenant = (tenantId: string): Payment[] => {
  return payments.filter(payment => payment.tenantId === tenantId);
};

export const getTotalRentCollected = (): number => {
  return payments.reduce((total, payment) => total + payment.amount, 0);
};

export const addPayment = (payment: Omit<Payment, 'id'>): Payment => {
  const newPayment = { ...payment, id: `pay-${uuidv4().substr(0, 8)}` };
  payments.push(newPayment);
  return newPayment;
};
