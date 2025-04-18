
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Payment } from "@/types";
import { format } from "date-fns";
import { PaymentMethodBadge } from "@/components/payments/PaymentMethodBadge";
import { getTenantById, getPropertyById } from "@/lib/data";

interface RecentPaymentsTableProps {
  payments: Payment[];
}

const RecentPaymentsTable = ({ payments }: RecentPaymentsTableProps) => {
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
                <TableCell><PaymentMethodBadge method={payment.method} /></TableCell>
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
