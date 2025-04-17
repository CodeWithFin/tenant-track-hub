
import { useState } from "react";
import { Property } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Home, MoreVertical, CalendarClock } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PropertyFormDialog from "@/components/property/PropertyFormDialog";
import DeleteConfirmDialog from "@/components/shared/DeleteConfirmDialog";
import { deleteProperty, updateProperty } from "@/lib/data";
import { toast } from "sonner";

interface PropertyCardProps {
  property: Property;
  onDeleted?: () => void;
  onUpdated?: (property: Property) => void;
}

const PropertyCard = ({ property, onDeleted, onUpdated }: PropertyCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentProperty, setCurrentProperty] = useState<Property>(property);

  const handlePropertyUpdated = (updatedProperty: Property) => {
    setCurrentProperty(updatedProperty);
    if (onUpdated) {
      onUpdated(updatedProperty);
    }
  };

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
      <Card className="overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all border-gray-100">
        <div 
          className="h-40 w-full bg-cover bg-center" 
          style={{ 
            backgroundImage: currentProperty.imageUrl 
              ? `url(${currentProperty.imageUrl})` 
              : "url('https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=2970')" 
          }}
        />
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold">{currentProperty.name}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1 rounded-full">
                <Home className="h-3 w-3" />
                {currentProperty.units} units
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none" aria-label="Property options">
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl border-gray-100">
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
            <Building2 className="h-4 w-4 mr-1 text-primary" />
            {currentProperty.type}
          </div>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 mr-1 text-primary" />
            {currentProperty.address}
          </div>
          {currentProperty.yearBuilt && (
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarClock className="h-4 w-4 mr-1 text-primary" />
              Built {currentProperty.yearBuilt}
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-2">
          <Link 
            to={`/properties/${currentProperty.id}`} 
            className="text-sm text-primary hover:underline"
          >
            View Details
          </Link>
        </CardFooter>
      </Card>

      <PropertyFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        property={currentProperty}
        onPropertyUpdated={(updatedProperty) => {
          try {
            updateProperty(updatedProperty);
            handlePropertyUpdated(updatedProperty);
            toast.success("Property updated successfully");
          } catch (error) {
            toast.error("Failed to update property");
            console.error(error);
          }
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
