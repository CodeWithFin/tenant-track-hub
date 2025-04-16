
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Property } from "@/types";
import { addProperty } from "@/lib/data";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define the form schema
const propertyFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  type: z.string().min(2, { message: "Type must be at least 2 characters." }),
  units: z.coerce.number().int().positive({ message: "Units must be a positive number." }),
  imageUrl: z.string().url({ message: "Must be a valid URL." }).optional(),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

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

  // Initialize the form with default values or existing property data
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      name: property?.name || "",
      address: property?.address || "",
      type: property?.type || "",
      units: property?.units || 1,
      imageUrl: property?.imageUrl || "",
    },
  });

  const onSubmit = async (data: PropertyFormValues) => {
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
        const newProperty = addProperty(data);
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter property name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, City, Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Apartment, House, Commercial, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="units"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Units</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1"
                      placeholder="Number of units" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : isEditing ? "Update Property" : "Add Property"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyFormDialog;
