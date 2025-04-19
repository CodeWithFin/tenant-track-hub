
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format, parseISO, differenceInDays } from "date-fns";
import { 
  FileText, 
  Search, 
  Plus, 
  AlertTriangle 
} from "lucide-react";
import { leases, getTenantById, getPropertyById } from "@/lib/data";
import { Lease } from "@/types";

const Leases = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const getLeaseBadgeStyle = (status: Lease['status']) => {
    switch (status) {
      case 'active':
        return "bg-green-50 text-green-700 border-green-200";
      case 'expired':
        return "bg-gray-50 text-gray-700 border-gray-200";
      case 'terminated':
        return "bg-red-50 text-red-700 border-red-200";
      case 'pending_renewal':
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const filteredLeases = leases.filter(lease => {
    const tenant = getTenantById(lease.tenantId);
    const property = getPropertyById(lease.propertyId);
    const searchTerm = searchQuery.toLowerCase();
    
    return (
      lease.unitNumber.toLowerCase().includes(searchTerm) ||
      tenant?.firstName.toLowerCase().includes(searchTerm) ||
      tenant?.lastName.toLowerCase().includes(searchTerm) ||
      property?.name.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lease Management</h1>
          <p className="text-muted-foreground">Manage and track property leases</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Lease
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leases..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property & Unit</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Lease Period</TableHead>
              <TableHead>Rent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Documents</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeases.map((lease) => {
              const tenant = getTenantById(lease.tenantId);
              const property = getPropertyById(lease.propertyId);
              const daysUntilExpiry = differenceInDays(parseISO(lease.endDate), new Date());
              const isExpiringSoon = daysUntilExpiry <= 30 && daysUntilExpiry > 0;
              
              return (
                <TableRow key={lease.id}>
                  <TableCell>
                    <div className="font-medium">{property?.name}</div>
                    <div className="text-sm text-muted-foreground">Unit {lease.unitNumber}</div>
                  </TableCell>
                  <TableCell>
                    {tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Unknown'}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {format(parseISO(lease.startDate), 'MMM dd, yyyy')} - 
                      <span className={isExpiringSoon ? "text-amber-600 font-medium" : ""}>
                        {format(parseISO(lease.endDate), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    {isExpiringSoon && (
                      <div className="flex items-center mt-1 text-amber-600">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        <span className="text-xs">
                          Expires in {daysUntilExpiry} days
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    KSh {lease.rentAmount.toLocaleString()}/mo
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={getLeaseBadgeStyle(lease.status)}
                    >
                      {lease.status.replace('_', ' ').charAt(0).toUpperCase() + 
                       lease.status.slice(1).replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        {lease.documents.length} docs
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            
            {filteredLeases.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                  No leases found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Leases;
