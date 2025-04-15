
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { tenants, getPropertyById } from "@/lib/data";
import { Plus, Search, ArrowUpDown } from "lucide-react";

const Tenants = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredTenants = tenants.filter(
    (tenant) => 
      `${tenant.firstName} ${tenant.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tenants</h1>
          <p className="text-muted-foreground">Manage your tenants and leases.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Tenant
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tenants..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Lease Period</TableHead>
              <TableHead>Rent</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTenants.map((tenant) => {
              const property = getPropertyById(tenant.propertyId);
              
              return (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium">
                    <div>{tenant.firstName} {tenant.lastName}</div>
                    <div className="text-xs text-muted-foreground">{tenant.email}</div>
                  </TableCell>
                  <TableCell>{property?.name || 'Unknown'}</TableCell>
                  <TableCell>{tenant.unitNumber}</TableCell>
                  <TableCell>
                    <div className="text-xs">
                      {format(new Date(tenant.leaseStart), 'MMM dd, yyyy')} - 
                      {format(new Date(tenant.leaseEnd), 'MMM dd, yyyy')}
                    </div>
                  </TableCell>
                  <TableCell>${tenant.rentAmount}/mo</TableCell>
                  <TableCell>
                    {tenant.status === 'active' ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
            
            {filteredTenants.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                  No tenants found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Tenants;
