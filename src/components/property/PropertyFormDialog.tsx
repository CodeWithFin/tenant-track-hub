
import { useState } from "react";
import { Property } from "@/types";
import { addProperty, updateProperty } from "@/lib/data";
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
        // For editing an existing property
        const updatedProperty = {
          ...property,
          ...data,
        };
        
        // Update the property in our data store
        const result = updateProperty(updatedProperty);
        
        toast.success("Property updated successfully");
        if (onPropertyUpdated) {
          onPropertyUpdated(result);
        }
      } else {
        // For adding a new property
        // Ensure all required fields are present with their correct types
        const newPropertyData: Omit<Property, "id"> = {
          name: data.name,
          address: data.address,
          type: data.type,
          units: data.units,
          // Only include optional fields if they exist
          ...(data.imageUrl ? { imageUrl: data.imageUrl } : {}),
          ...(data.description ? { description: data.description } : {}),
          ...(data.yearBuilt ? { yearBuilt: data.yearBuilt } : {}),
          ...(data.amenities ? { amenities: data.amenities } : {})
        };
        
        const newProperty = addProperty(newPropertyData);
        toast.success("Property added successfully");
        if (onPropertyAdded) {
          onPropertyAdded(newProperty);
        }
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
      <DialogContent className="sm:max-w-[525px] rounded-2xl border-gray-100 shadow-lg">
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
