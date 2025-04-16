
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Receipt, Payment } from "@/types";
import { getTenantById, tenants, payments } from "@/lib/data";
import { Plus, Search, FileDown } from "lucide-react";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { createReceipt, downloadReceipt } from "@/utils/receiptGenerator";

// Expanded mock data for receipts
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
  },
  {
    id: "rec-002",
    paymentId: "pay-002",
    date: "2024-02-03",
    tenantId: "ten-001",
    tenantName: "John Kamau",
    amount: 75000,
    receiptNumber: "REC-2024-0002",
    downloadUrl: "#"
  },
  {
    id: "rec-003",
    paymentId: "pay-003",
    date: "2024-02-01",
    tenantId: "ten-002",
    tenantName: "Jane Wanjiru",
    amount: 85000,
    receiptNumber: "REC-2024-0003",
    downloadUrl: "#"
  },
  {
    id: "rec-004",
    paymentId: "pay-004",
    date: "2024-02-05",
    tenantId: "ten-003",
    tenantName: "Michael Omondi",
    amount: 65000,
    receiptNumber: "REC-2024-0004",
    downloadUrl: "#"
  },
  {
    id: "rec-005",
    paymentId: "pay-005",
    date: "2024-02-03",
    tenantId: "ten-005",
    tenantName: "David Mutua",
    amount: 75000,
    receiptNumber: "REC-2024-0005",
    downloadUrl: "#"
  }
];

const Receipts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [receipts, setReceipts] = useState<Receipt[]>(mockReceipts);
  const [selectedTenantId, setSelectedTenantId] = useState("");
  const [selectedPaymentId, setSelectedPaymentId] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const filteredReceipts = receipts.filter(
    (receipt) => 
      receipt.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const eligiblePayments = payments.filter(
    payment => payment.tenantId === selectedTenantId && 
    !receipts.some(receipt => receipt.paymentId === payment.id)
  );

  const handleDownload = (receiptId: string) => {
    const receipt = receipts.find(r => r.receiptNumber === receiptId);
    if (!receipt) return;
    
    const tenant = getTenantById(receipt.tenantId);
    const payment = payments.find(p => p.id === receipt.paymentId);
    
    if (tenant && payment) {
      downloadReceipt(receipt, tenant, payment);
      toast.success("Receipt download started", {
        description: `Receipt ${receiptId} is being downloaded.`
      });
    } else {
      toast.error("Could not download receipt", {
        description: "Tenant or payment information is missing."
      });
    }
  };

  const handleGenerateReceipt = () => {
    if (!selectedTenantId || !selectedPaymentId) {
      toast.error("Unable to generate receipt", {
        description: "Please select both a tenant and payment."
      });
      return;
    }

    const tenant = getTenantById(selectedTenantId);
    const payment = payments.find(p => p.id === selectedPaymentId);

    if (tenant && payment) {
      const newReceipt = createReceipt(payment, tenant);
      setReceipts([newReceipt, ...receipts]);
      setIsDialogOpen(false);
      
      toast.success("Receipt generated successfully", {
        description: `Receipt ${newReceipt.receiptNumber} has been created.`
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Receipts</h1>
          <p className="text-muted-foreground">Manage and track payment receipts.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate Receipt
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate New Receipt</DialogTitle>
              <DialogDescription>
                Select a tenant and a payment to generate a receipt.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="tenant">Tenant</Label>
                <Select 
                  value={selectedTenantId} 
                  onValueChange={(value) => {
                    setSelectedTenantId(value);
                    setSelectedPaymentId("");
                  }}
                >
                  <SelectTrigger id="tenant">
                    <SelectValue placeholder="Select a tenant" />
                  </SelectTrigger>
                  <SelectContent>
                    {tenants.map((tenant) => (
                      <SelectItem key={tenant.id} value={tenant.id}>
                        {tenant.firstName} {tenant.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="payment">Payment</Label>
                <Select 
                  value={selectedPaymentId} 
                  onValueChange={setSelectedPaymentId}
                  disabled={!selectedTenantId || eligiblePayments.length === 0}
                >
                  <SelectTrigger id="payment">
                    <SelectValue placeholder={
                      !selectedTenantId 
                        ? "Select a tenant first" 
                        : eligiblePayments.length === 0 
                        ? "No eligible payments" 
                        : "Select a payment"
                    } />
                  </SelectTrigger>
                  <SelectContent>
                    {eligiblePayments.map((payment) => (
                      <SelectItem key={payment.id} value={payment.id}>
                        KSh {payment.amount.toLocaleString()} - {format(new Date(payment.date), 'MMM dd, yyyy')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleGenerateReceipt}>
                Generate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDownload(receipt.receiptNumber)}
                  >
                    <FileDown className="h-4 w-4" />
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
