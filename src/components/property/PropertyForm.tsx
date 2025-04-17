
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Property } from "@/types";
import { propertyFormSchema, PropertyFormValues } from "./propertyFormSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface PropertyFormProps {
  onSubmit: (data: PropertyFormValues) => Promise<void>;
  property?: Property;
  isSubmitting: boolean;
  onCancel: () => void;
}

const PropertyForm = ({
  onSubmit,
  property,
  isSubmitting,
  onCancel,
}: PropertyFormProps) => {
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
      description: property?.description || "",
      yearBuilt: property?.yearBuilt || undefined,
      amenities: property?.amenities || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter property name" className="rounded-lg" {...field} />
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
                <Input placeholder="123 Main St, City, Country" className="rounded-lg" {...field} />
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
                <Input placeholder="Apartment, House, Commercial, etc." className="rounded-lg" {...field} />
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
                  className="rounded-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="yearBuilt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year Built (Optional)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="e.g. 2010" 
                  className="rounded-lg"
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => {
                    const value = e.target.value === '' ? undefined : parseInt(e.target.value);
                    field.onChange(value);
                  }}
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
                <Input placeholder="https://example.com/image.jpg" className="rounded-lg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the property..." 
                  className="resize-none rounded-lg" 
                  rows={3}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amenities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amenities (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="WiFi, Parking, Swimming Pool, etc." 
                  className="rounded-lg"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Separate multiple amenities with commas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className="rounded-full"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="rounded-full">
            {isSubmitting ? "Saving..." : isEditing ? "Update Property" : "Add Property"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default PropertyForm;
