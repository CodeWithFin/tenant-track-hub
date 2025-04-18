
import { Payment } from "@/types";
import { format, startOfMonth, endOfMonth, parseISO, isWithinInterval } from "date-fns";

export const PAYMENT_METHODS = [
  { value: 'cash', label: 'Cash' },
  { value: 'm-pesa', label: 'M-Pesa' },
  { value: 'bank transfer', label: 'Bank Transfer' },
  { value: 'check', label: 'Check' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'credit card', label: 'Credit Card' },
  { value: 'debit card', label: 'Debit Card' },
  { value: 'other', label: 'Other' }
] as const;

export const getPaymentMethodBadge = (method: Payment['method']) => {
  switch (method) {
    case "cash":
      return { variant: 'outline', className: 'bg-green-50 text-green-700 border-green-200' };
    case "m-pesa":
      return { variant: 'outline', className: 'bg-blue-50 text-blue-700 border-blue-200' };
    case "bank transfer":
      return { variant: 'outline', className: 'bg-purple-50 text-purple-700 border-purple-200' };
    case "check":
      return { variant: 'outline', className: 'bg-amber-50 text-amber-700 border-amber-200' };
    case "paypal":
      return { variant: 'outline', className: 'bg-sky-50 text-sky-700 border-sky-200' };
    case "credit card":
      return { variant: 'outline', className: 'bg-pink-50 text-pink-700 border-pink-200' };
    case "debit card":
      return { variant: 'outline', className: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
    default:
      return { variant: 'outline', className: 'bg-gray-50 text-gray-700 border-gray-200' };
  }
};

// New advanced reporting functions
export function getPaymentsByTimeRange(payments: Payment[], startDate: Date, endDate: Date): Payment[] {
  return payments.filter(payment => {
    const paymentDate = parseISO(payment.date);
    return isWithinInterval(paymentDate, { start: startDate, end: endDate });
  });
}

export function getPaymentsByMethod(payments: Payment[], method: Payment['method']): Payment[] {
  return payments.filter(payment => payment.method === method);
}

export function getPaymentsByProperty(payments: Payment[], propertyId: string): Payment[] {
  return payments.filter(payment => payment.propertyId === propertyId);
}

export function getPaymentsByTenant(payments: Payment[], tenantId: string): Payment[] {
  return payments.filter(payment => payment.tenantId === tenantId);
}

export function calculateTotalsByMethod(payments: Payment[]): Record<string, number> {
  return payments.reduce((acc, payment) => {
    if (!acc[payment.method]) {
      acc[payment.method] = 0;
    }
    acc[payment.method] += payment.amount;
    return acc;
  }, {} as Record<string, number>);
}

export function calculateMonthlyRevenue(payments: Payment[]): { month: string; amount: number }[] {
  const monthlyTotals: Record<string, number> = {};
  
  payments.forEach(payment => {
    const date = parseISO(payment.date);
    const monthKey = format(date, 'yyyy-MM');
    const monthDisplay = format(date, 'MMM yyyy');
    
    if (!monthlyTotals[monthKey]) {
      monthlyTotals[monthKey] = 0;
    }
    
    monthlyTotals[monthKey] += payment.amount;
  });
  
  return Object.entries(monthlyTotals)
    .map(([key, amount]) => ({
      month: format(parseISO(`${key}-01`), 'MMM yyyy'),
      amount
    }))
    .sort((a, b) => 
      parseISO(`${a.month} 01`).getTime() - parseISO(`${b.month} 01`).getTime()
    );
}

// Function to generate data for a CSV export
export function generatePaymentsCsvData(payments: Payment[], tenants: any[], properties: any[]): any[] {
  return payments.map(payment => {
    const tenant = tenants.find(t => t.id === payment.tenantId);
    const property = properties.find(p => p.id === payment.propertyId);
    
    return {
      'Payment ID': payment.id,
      'Date': format(parseISO(payment.date), 'yyyy-MM-dd'),
      'Tenant': tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Unknown',
      'Property': property ? property.name : 'Unknown',
      'Amount': payment.amount,
      'Method': payment.method,
      'Reference Number': payment.referenceNumber || 'N/A',
      'Notes': payment.notes || 'N/A'
    };
  });
}
