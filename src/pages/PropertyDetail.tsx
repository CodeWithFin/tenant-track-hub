
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPropertyById, deleteProperty } from "@/lib/data";
import { toast } from "sonner";
import { Building2, MapPin, Home, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PropertyFormDialog from "@/components/property/PropertyFormDialog";
import DeleteConfirmDialog from "@/components/shared/DeleteConfirmDialog";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const property = getPropertyById(id || "");

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
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button 
            variant="destructive" 
            onClick={() => setIsDeleteDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div 
        className="h-64 w-full rounded-lg bg-cover bg-center mb-6" 
        style={{ 
          backgroundImage: property.imageUrl 
            ? `url(${property.imageUrl})` 
            : "url('https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=2970')" 
        }}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Property Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Type</p>
                  <p className="text-muted-foreground">{property.type}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">{property.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Home className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Units</p>
                  <p className="text-muted-foreground">{property.units} units</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Occupancy Summary</h2>
            <div className="flex items-center justify-center h-48">
              <p className="text-muted-foreground text-center">
                Tenant information will be displayed here.
              </p>
            </div>
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
