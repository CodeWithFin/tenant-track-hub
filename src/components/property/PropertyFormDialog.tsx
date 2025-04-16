
import { useState } from "react";
import { Property } from "@/types";
import { addProperty } from "@/lib/data";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import PropertyForm from "./PropertyForm";
import { PropertyFormValues } from "./propertyFormSchema";

interface PropertyFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property?: Property;
  onPropertyAdded?: (property: Property) => void;
  onPropertyUpdated?: (property: Property) => void;
}

const PropertyFormDialog = ({
  open,
  onOpenChange,
  property,
  onPropertyAdded,
  onPropertyUpdated,
}: PropertyFormDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!property;

  const handleSubmit = async (data: PropertyFormValues) => {
    setIsSubmitting(true);
    try {
      if (isEditing && property) {
        // For editing, we'd normally call an update API
        // Since we're using mock data, we're just showing how this would work
        const updatedProperty = {
          ...property,
          ...data,
        };
        
        // In a real app, you'd call an update API here
        // For now, just simulate an update with toast
        toast.success("Property updated successfully");
        onPropertyUpdated?.(updatedProperty);
      } else {
        // For adding, use the addProperty function
        // Ensure all required fields are present with their correct types
        const newPropertyData: Omit<Property, "id"> = {
          name: data.name,
          address: data.address,
          type: data.type,
          units: data.units,
          // Only include imageUrl if it exists
          ...(data.imageUrl ? { imageUrl: data.imageUrl } : {})
        };
        
        const newProperty = addProperty(newPropertyData);
        toast.success("Property added successfully");
        onPropertyAdded?.(newProperty);
      }
      onOpenChange(false);
    } catch (error) {
      toast.error("An error occurred while saving the property");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Property" : "Add New Property"}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Update property details below."
              : "Fill in the details for your new property."
            }
          </DialogDescription>
        </DialogHeader>
        <PropertyForm 
          onSubmit={handleSubmit} 
          property={property} 
          isSubmitting={isSubmitting} 
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PropertyFormDialog;
