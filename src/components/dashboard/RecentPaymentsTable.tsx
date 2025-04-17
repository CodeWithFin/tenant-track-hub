
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Payment } from "@/types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { tenants, getPropertyById, getTenantById } from "@/lib/data";

interface RecentPaymentsTableProps {
  payments: Payment[];
}

const RecentPaymentsTable = ({ payments }: RecentPaymentsTableProps) => {
  const getPaymentMethodBadge = (method: Payment["method"]) => {
    switch (method) {
      case "cash":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Cash</Badge>;
      case "m-pesa":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">M-Pesa</Badge>;
      case "bank transfer":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Bank Transfer</Badge>;
      case "check":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Check</Badge>;
      default:
        return <Badge variant="outline">Other</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tenant</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => {
            const tenant = getTenantById(payment.tenantId);
            const property = getPropertyById(payment.propertyId);
            
            return (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">
                  {tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Unknown'}
                </TableCell>
                <TableCell>{property?.name || 'Unknown'}</TableCell>
                <TableCell>{format(new Date(payment.date), 'MMM dd, yyyy')}</TableCell>
                <TableCell className="font-medium">KSh {payment.amount.toLocaleString()}</TableCell>
                <TableCell>{getPaymentMethodBadge(payment.method)}</TableCell>
              </TableRow>
            );
          })}
          {payments.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                No recent payments found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentPaymentsTable;
