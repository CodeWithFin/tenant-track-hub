
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { tenants, getPropertyById, addTenant, updateTenant, deleteTenant } from "@/lib/data";
import { Plus, Search, Edit, Trash, EyeIcon } from "lucide-react";
import { Tenant } from "@/types";
import TenantFormDialog from "@/components/tenants/TenantFormDialog";
import TenantViewDialog from "@/components/tenants/TenantViewDialog";
import { useToast } from "@/hooks/use-toast";
import DeleteConfirmDialog from "@/components/shared/DeleteConfirmDialog";

const Tenants = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const { toast } = useToast();
  
  const filteredTenants = tenants.filter(
    (tenant) => 
      `${tenant.firstName} ${tenant.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.phone.includes(searchQuery)
  );

  const handleAddTenant = (tenant: Omit<Tenant, 'id'>) => {
    addTenant(tenant);
    setIsAddDialogOpen(false);
    toast({
      title: "Tenant Added",
      description: "New tenant has been added successfully.",
    });
  };

  const handleEditTenant = (tenant: Tenant) => {
    updateTenant(tenant);
    setIsEditDialogOpen(false);
    setSelectedTenant(null);
    toast({
      title: "Tenant Updated",
      description: "Tenant information has been updated successfully.",
    });
  };

  const handleDeleteTenant = () => {
    if (selectedTenant) {
      deleteTenant(selectedTenant.id);
      setIsDeleteDialogOpen(false);
      setSelectedTenant(null);
      toast({
        title: "Tenant Deleted",
        description: "Tenant has been removed successfully.",
      });
    }
  };

  const openViewDialog = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setIsViewDialogOpen(true);
  };

  const openEditDialog = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tenants</h1>
          <p className="text-muted-foreground">Manage your tenants and leases.</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
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
              <TableHead className="text-right">Actions</TableHead>
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
                  <TableCell>KSh {tenant.rentAmount.toLocaleString()}/mo</TableCell>
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
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openViewDialog(tenant)}
                        title="View Details"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(tenant)}
                        title="Edit Tenant"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteDialog(tenant)}
                        title="Delete Tenant"
                        className="text-destructive hover:text-destructive/90"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            
            {filteredTenants.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-6">
                  No tenants found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Tenant Dialog */}
      <TenantFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddTenant}
        title="Add New Tenant"
      />

      {/* View Tenant Dialog */}
      {selectedTenant && (
        <TenantViewDialog
          open={isViewDialogOpen}
          onOpenChange={setIsViewDialogOpen}
          tenant={selectedTenant}
        />
      )}

      {/* Edit Tenant Dialog */}
      {selectedTenant && (
        <TenantFormDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={handleEditTenant}
          title="Edit Tenant"
          tenant={selectedTenant}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {selectedTenant && (
        <DeleteConfirmDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onDelete={handleDeleteTenant}
          title="Delete Tenant"
          description={`Are you sure you want to delete ${selectedTenant.firstName} ${selectedTenant.lastName}? This action cannot be undone.`}
        />
      )}
    </div>
  );
};

export default Tenants;
