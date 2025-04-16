
import { useState } from "react";
import { Property } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Home, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PropertyFormDialog from "@/components/property/PropertyFormDialog";
import DeleteConfirmDialog from "@/components/shared/DeleteConfirmDialog";
import { deleteProperty } from "@/lib/data";
import { toast } from "sonner";

interface PropertyCardProps {
  property: Property;
  onDeleted?: () => void;
}

const PropertyCard = ({ property, onDeleted }: PropertyCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    try {
      const deleted = deleteProperty(property.id);
      if (deleted) {
        toast.success("Property deleted successfully");
        if (onDeleted) {
          onDeleted();
        } else {
          // Force page refresh as a fallback if no callback
          window.location.reload();
        }
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the property");
      console.error(error);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Card className="overflow-hidden">
        <div 
          className="h-40 w-full bg-cover bg-center" 
          style={{ 
            backgroundImage: property.imageUrl 
              ? `url(${property.imageUrl})` 
              : "url('https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=2970')" 
          }}
        />
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold">{property.name}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Home className="h-3 w-3" />
                {property.units} units
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none" aria-label="Property options">
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-destructive focus:text-destructive"
                    onSelect={() => setIsDeleteDialogOpen(true)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Building2 className="h-4 w-4 mr-1" />
            {property.type}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {property.address}
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Link 
            to={`/properties/${property.id}`} 
            className="text-sm text-primary hover:underline"
          >
            View Details
          </Link>
        </CardFooter>
      </Card>

      <PropertyFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        property={property}
        onPropertyUpdated={() => {
          toast.success("Property updated successfully");
          // Force page refresh as a simple solution
          window.location.reload();
        }}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={handleDelete}
        title="Delete Property"
        description="Are you sure you want to delete this property? This action cannot be undone."
      />
    </>
  );
};

export default PropertyCard;
