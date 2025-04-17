
import { z } from "zod";

// Define the form schema
export const propertyFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  type: z.string().min(2, { message: "Type must be at least 2 characters." }),
  units: z.coerce.number().int().positive({ message: "Units must be a positive number." }),
  imageUrl: z.string().url({ message: "Must be a valid URL." }).optional(),
  description: z.string().optional(),
  yearBuilt: z.coerce.number().int().positive().optional(),
  amenities: z.string().optional(),
});

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;
