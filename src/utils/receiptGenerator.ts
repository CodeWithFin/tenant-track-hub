
import { Receipt, Tenant, Payment } from "@/types";
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

export interface ReceiptData {
  tenant: Tenant;
  payment: Payment;
  receiptNumber: string;
  dateGenerated: string;
}

export const generateReceiptNumber = (): string => {
  const year = new Date().getFullYear();
  const randomId = Math.floor(1000 + Math.random() * 9000); // 4-digit number
  return `REC-${year}-${randomId}`;
};

export const createReceipt = (payment: Payment, tenant: Tenant): Receipt => {
  const receiptNumber = generateReceiptNumber();
  
  const newReceipt: Receipt = {
    id: `rec-${uuidv4().substring(0, 8)}`,
    paymentId: payment.id,
    date: format(new Date(), 'yyyy-MM-dd'),
    tenantId: tenant.id,
    tenantName: `${tenant.firstName} ${tenant.lastName}`,
    amount: payment.amount,
    receiptNumber,
    downloadUrl: "#", // In a real app, this would be a URL to the generated PDF
  };
  
  return newReceipt;
};

// This would be replaced with actual PDF generation in a real app
export const generateReceiptPDF = (receiptData: ReceiptData): Blob => {
  // Mock PDF generation
  const content = `
    Receipt Number: ${receiptData.receiptNumber}
    Date: ${receiptData.dateGenerated}
    Tenant: ${receiptData.tenant.firstName} ${receiptData.tenant.lastName}
    Property: ${receiptData.tenant.propertyId}
    Unit: ${receiptData.tenant.unitNumber}
    Amount: KSh ${receiptData.payment.amount.toLocaleString()}
    Payment Method: ${receiptData.payment.method}
    Payment Date: ${format(new Date(receiptData.payment.date), 'MMM dd, yyyy')}
    
    Thank you for your payment!
  `;
  
  // In a real app, we would use a PDF generation library
  // For now, let's just return a text blob
  return new Blob([content], { type: 'text/plain' });
};

export const downloadReceipt = (receipt: Receipt, tenant: Tenant, payment: Payment): void => {
  const receiptData: ReceiptData = {
    tenant,
    payment,
    receiptNumber: receipt.receiptNumber,
    dateGenerated: format(new Date(receipt.date), 'MMM dd, yyyy'),
  };
  
  const pdfBlob = generateReceiptPDF(receiptData);
  const url = URL.createObjectURL(pdfBlob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `Receipt-${receipt.receiptNumber}.txt`; // In a real app, this would be .pdf
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
