
import { Payment, Property, Tenant } from "@/types";
import { format, parseISO } from "date-fns";
import Papa from "papaparse";
import { generatePaymentsCsvData } from "@/lib/utils/paymentUtils";
import { saveAs } from "file-saver";

/**
 * Exports payment data to CSV format
 */
export const exportPaymentsToCSV = (
  payments: Payment[],
  tenants: Tenant[],
  properties: Property[],
  fileName: string = "payments_export.csv"
) => {
  // Generate CSV data using the utility function
  const csvData = generatePaymentsCsvData(payments, tenants, properties);
  
  // Convert to CSV string
  const csv = Papa.unparse(csvData);
  
  // Create blob and trigger download
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  saveAs(blob, fileName);
};

/**
 * Format date for export
 */
export const formatDateForExport = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'yyyy-MM-dd');
  } catch (error) {
    return dateString;
  }
};
