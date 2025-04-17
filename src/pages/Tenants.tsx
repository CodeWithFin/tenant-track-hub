
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { tenants, getPropertyById, addTenant, updateTenant, deleteTenant, getTenantsByStatus, getTenantsWithBalance } from "@/lib/data";
import { Plus, Search, Edit, Trash, EyeIcon, Filter, SortDesc, SortAsc, DollarSign, Clock } from "lucide-react";
import { Tenant } from "@/types";
import TenantFormDialog from "@/components/tenants/TenantFormDialog";
import TenantViewDialog from "@/components/tenants/TenantViewDialog";
import { useToast } from "@/hooks/use-toast";
import DeleteConfirmDialog from "@/components/shared/DeleteConfirmDialog";

type SortField = 'name' | 'property' | 'rentAmount' | 'leaseEnd';
type SortDirection = 'asc' | 'desc';

type StatusFilter = 'all' | 'active' | 'inactive' | 'pending' | 'withBalance';

const Tenants = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const { toast } = useToast();
  
  // Filter tenants based on status
  const getFilteredTenantsByStatus = () => {
    if (statusFilter === 'all') {
      return tenants;
    } else if (statusFilter === 'withBalance') {
      return getTenantsWithBalance();
    } else {
      return getTenantsByStatus(statusFilter as Tenant['status']);
    }
  };
  
  // Filter tenants by search query
  const filteredTenants = getFilteredTenantsByStatus().filter(
    (tenant) => 
      `${tenant.firstName} ${tenant.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.phone.includes(searchQuery) ||
      tenant.unitNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort tenants
  const sortedTenants = [...filteredTenants].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        break;
      case 'property': {
        const propertyA = getPropertyById(a.propertyId)?.name || '';
        const propertyB = getPropertyById(b.propertyId)?.name || '';
        comparison = propertyA.localeCompare(propertyB);
        break;
      }
      case 'rentAmount':
        comparison = a.rentAmount - b.rentAmount;
        break;
      case 'leaseEnd':
        comparison = new Date(a.leaseEnd).getTime() - new Date(b.leaseEnd).getTime();
        break;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

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

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      toggleSortDirection();
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };
  
  const getBadgeStyle = (status: Tenant['status']) => {
    switch (status) {
      case 'active':
        return "bg-green-50 text-green-700 border-green-200";
      case 'inactive':
        return "bg-gray-50 text-gray-700 border-gray-200";
      case 'pending':
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
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
      
      <div className="flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tenants..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="px-3">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={statusFilter === 'all'}
                onCheckedChange={() => setStatusFilter('all')}
              >
                All Tenants
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter === 'active'}
                onCheckedChange={() => setStatusFilter('active')}
              >
                Active Tenants
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter === 'inactive'}
                onCheckedChange={() => setStatusFilter('inactive')}
              >
                Inactive Tenants
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter === 'pending'}
                onCheckedChange={() => setStatusFilter('pending')}
              >
                Pending Tenants
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={statusFilter === 'withBalance'}
                onCheckedChange={() => setStatusFilter('withBalance')}
              >
                With Outstanding Balance
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="px-3">
                {sortDirection === 'asc' ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />}
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSort('name')}>
                Name {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('property')}>
                Property {sortBy === 'property' && (sortDirection === 'asc' ? '↑' : '↓')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('rentAmount')}>
                Rent Amount {sortBy === 'rentAmount' && (sortDirection === 'asc' ? '↑' : '↓')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('leaseEnd')}>
                Lease End Date {sortBy === 'leaseEnd' && (sortDirection === 'asc' ? '↑' : '↓')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
            {sortedTenants.map((tenant) => {
              const property = getPropertyById(tenant.propertyId);
              const leaseEnd = new Date(tenant.leaseEnd);
              const isLeaseEndingSoon = leaseEnd <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
              
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
                      <span className={isLeaseEndingSoon && tenant.status === 'active' ? 'text-amber-600 font-medium' : ''}>
                        {format(new Date(tenant.leaseEnd), 'MMM dd, yyyy')}
                      </span>
                      {isLeaseEndingSoon && tenant.status === 'active' && (
                        <div className="flex items-center mt-1">
                          <Clock className="h-3 w-3 text-amber-600 mr-1" />
                          <span className="text-xs text-amber-600">Ending soon</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>KSh {tenant.rentAmount.toLocaleString()}/mo</div>
                    {(tenant.balance || 0) > 0 && (
                      <div className="flex items-center mt-1">
                        <DollarSign className="h-3 w-3 text-red-500 mr-1" />
                        <span className="text-xs text-red-500">KSh {tenant.balance?.toLocaleString()}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getBadgeStyle(tenant.status)}>
                      {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                    </Badge>
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
            
            {sortedTenants.length === 0 && (
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
