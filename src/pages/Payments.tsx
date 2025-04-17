
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { payments, getTenantById, getPropertyById } from "@/lib/data";
import { Plus, Search, Download, ArrowUpDown } from "lucide-react";

const Payments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  
  // Get unique properties from payments
  const uniqueProperties = Array.from(
    new Set(payments.map((payment) => payment.propertyId))
  ).map((propertyId) => getPropertyById(propertyId));
  
  // Get unique payment methods
  const uniqueMethods = Array.from(
    new Set(payments.map((payment) => payment.method))
  );
  
  const filteredPayments = payments.filter(
    (payment) => {
      const tenant = getTenantById(payment.tenantId);
      const tenantName = tenant ? `${tenant.firstName} ${tenant.lastName}` : '';
      
      const matchesSearch = 
        tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.notes?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.amount.toString().includes(searchQuery);
      
      const matchesProperty = propertyFilter === "all" || payment.propertyId === propertyFilter;
      const matchesMethod = methodFilter === "all" || payment.method === methodFilter;
      
      return matchesSearch && matchesProperty && matchesMethod;
    }
  );
  
  const getPaymentMethodBadge = (method: string) => {
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">Track and manage tenant payments.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Record Payment
        </Button>
      </div>
      
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search payments..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 md:w-1/2 lg:w-1/3">
          <Select value={propertyFilter} onValueChange={setPropertyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Properties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              {uniqueProperties.map((property) => 
                property && (
                  <SelectItem key={property.id} value={property.id}>
                    {property.name}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          
          <Select value={methodFilter} onValueChange={setMethodFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Methods" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              {uniqueMethods.map((method) => (
                <SelectItem key={method} value={method}>
                  {method.charAt(0).toUpperCase() + method.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => {
              const tenant = getTenantById(payment.tenantId);
              const property = getPropertyById(payment.propertyId);
              
              return (
                <TableRow key={payment.id}>
                  <TableCell>{format(new Date(payment.date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>
                    {tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Unknown'}
                  </TableCell>
                  <TableCell>{property?.name || 'Unknown'}</TableCell>
                  <TableCell className="font-medium">KSh {payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{getPaymentMethodBadge(payment.method)}</TableCell>
                  <TableCell>{payment.notes || '-'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            
            {filteredPayments.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-6">
                  No payments found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Payments;
