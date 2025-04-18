
import { Payment } from "@/types";

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
