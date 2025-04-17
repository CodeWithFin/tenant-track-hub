
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPropertyById, deleteProperty, getTenantsForProperty } from "@/lib/data";
import { Tenant } from "@/types";
import { toast } from "sonner";
import { Building2, MapPin, Home, Edit, Trash2, Users, Calendar, Clock, User, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PropertyFormDialog from "@/components/property/PropertyFormDialog";
import DeleteConfirmDialog from "@/components/shared/DeleteConfirmDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const property = getPropertyById(id || "");
  const [tenants, setTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    if (id) {
      const propertyTenants = getTenantsForProperty(id);
      setTenants(propertyTenants);
    }
  }, [id]);

  const activeTenants = tenants.filter(tenant => tenant.status === 'active');
  const occupancyRate = property ? Math.round((activeTenants.length / property.units) * 100) : 0;
  const vacantUnits = property ? property.units - activeTenants.length : 0;

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The property you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate("/properties")}>
          Back to Properties
        </Button>
      </div>
    );
  }

  const handlePropertyUpdate = () => {
    toast.success("Property updated successfully");
    // Force a re-render by toggling the dialog
    setIsEditDialogOpen(false);
  };

  const handleDelete = () => {
    try {
      const deleted = deleteProperty(property.id);
      if (deleted) {
        toast.success("Property deleted successfully");
        navigate("/properties");
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the property");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{property.name}</h1>
          <p className="text-muted-foreground">Property details and management</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setIsEditDialogOpen(true)}
            className="flex items-center gap-2 rounded-full bg-white shadow-sm border-gray-200"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button 
            variant="destructive" 
            onClick={() => setIsDeleteDialogOpen(true)}
            className="flex items-center gap-2 rounded-full"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div 
        className="h-64 w-full rounded-2xl bg-cover bg-center mb-6 shadow-md" 
        style={{ 
          backgroundImage: property.imageUrl 
            ? `url(${property.imageUrl})` 
            : "url('https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=2970')" 
        }}
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 rounded-xl shadow-sm border-gray-100">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Property Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Type</p>
                  <p className="text-muted-foreground">{property.type}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">{property.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Home className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Units</p>
                  <p className="text-muted-foreground">{property.units} units</p>
                </div>
              </div>
              {property.yearBuilt && (
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Year Built</p>
                    <p className="text-muted-foreground">{property.yearBuilt}</p>
                  </div>
                </div>
              )}
              {property.amenities && (
                <div className="flex items-start gap-3">
                  <Home className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Amenities</p>
                    <p className="text-muted-foreground">{property.amenities}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 rounded-xl shadow-sm border-gray-100">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Occupancy Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-sm font-medium text-gray-500">Occupancy Rate</h3>
                <div className="mt-2 flex items-end">
                  <span className="text-2xl font-semibold text-gray-900">{occupancyRate}%</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-sm font-medium text-gray-500">Occupied Units</h3>
                <div className="mt-2 flex items-end">
                  <span className="text-2xl font-semibold text-gray-900">{activeTenants.length}</span>
                  <span className="ml-1 text-sm text-gray-500">/ {property.units}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-sm font-medium text-gray-500">Vacant Units</h3>
                <div className="mt-2 flex items-end">
                  <span className="text-2xl font-semibold text-gray-900">{vacantUnits}</span>
                  <span className="ml-1 text-sm text-gray-500">units</span>
                </div>
              </div>
            </div>
            
            {tenants.length > 0 ? (
              <div>
                <h3 className="text-lg font-medium mb-3">Current Tenants</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tenant</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Rent</TableHead>
                        <TableHead>Lease End</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tenants.map((tenant) => (
                        <TableRow key={tenant.id} className="cursor-pointer hover:bg-gray-50" onClick={() => navigate(`/tenants?id=${tenant.id}`)}>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">{tenant.firstName} {tenant.lastName}</div>
                                <div className="text-xs text-muted-foreground">{tenant.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{tenant.unitNumber}</TableCell>
                          <TableCell>
                            <Badge variant={tenant.status === 'active' ? 'success' : tenant.status === 'pending' ? 'warning' : 'destructive'}>
                              {tenant.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <DollarSign className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                              KSh {tenant.rentAmount.toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                              {new Date(tenant.leaseEnd).toLocaleDateString()}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 bg-gray-50 rounded-xl">
                <Users className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground text-center">No tenants for this property yet.</p>
                <Button 
                  variant="outline" 
                  className="mt-2 rounded-full"
                  onClick={() => navigate('/tenants')}
                >
                  Manage Tenants
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Property Dialog */}
      <PropertyFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        property={property}
        onPropertyUpdated={handlePropertyUpdate}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={handleDelete}
        title="Delete Property"
        description="Are you sure you want to delete this property? This action cannot be undone and will remove all data associated with this property."
      />
    </div>
  );
};

export default PropertyDetail;
