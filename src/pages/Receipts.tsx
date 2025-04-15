
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Receipt } from "@/types";
import { getPropertyById, getTenantById } from "@/lib/data";
import { Plus, Search, Download } from "lucide-react";

// Temporary mock data - will be replaced with actual data fetching later
const mockReceipts: Receipt[] = [
  {
    id: "rec-001",
    paymentId: "pay-001",
    date: "2024-01-15",
    tenantId: "ten-001",
    tenantName: "John Kamau",
    amount: 75000,
    receiptNumber: "REC-2024-0001",
    downloadUrl: "#"
  }
];

const Receipts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredReceipts = mockReceipts.filter(
    (receipt) => 
      receipt.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Receipts</h1>
          <p className="text-muted-foreground">Manage and track payment receipts.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Generate Receipt
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search receipts..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Receipt Number</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReceipts.map((receipt) => (
              <TableRow key={receipt.id}>
                <TableCell>{receipt.receiptNumber}</TableCell>
                <TableCell>{receipt.tenantName}</TableCell>
                <TableCell>KSh {receipt.amount.toLocaleString()}</TableCell>
                <TableCell>{format(new Date(receipt.date), 'MMM dd, yyyy')}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredReceipts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                  No receipts found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Receipts;
