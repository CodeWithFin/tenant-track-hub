
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { MaintenanceRequest } from "@/types"
import { addMaintenanceRequest } from "@/lib/data/maintenance"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface MaintenanceRequestFormData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  propertyId: string;
  tenantId: string;
}

interface MaintenanceRequestDialogProps {
  properties: { id: string; name: string; }[];
  tenants: { id: string; firstName: string; lastName: string; }[];
  onRequestCreated?: () => void;
}

export function MaintenanceRequestDialog({ properties, tenants, onRequestCreated }: MaintenanceRequestDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<MaintenanceRequestFormData>({
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      propertyId: "",
      tenantId: ""
    }
  });

  const onSubmit = (data: MaintenanceRequestFormData) => {
    const newRequest: Omit<MaintenanceRequest, "id"> = {
      ...data,
      dateReported: new Date().toISOString(),
      status: "pending"
    };

    addMaintenanceRequest(newRequest);
    toast({
      title: "Success",
      description: "Maintenance request has been created",
    });
    setOpen(false);
    form.reset();
    onRequestCreated?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Request</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Maintenance Request</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter issue title" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the issue..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="propertyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {properties.map((property) => (
                        <SelectItem key={property.id} value={property.id}>
                          {property.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tenantId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tenant</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tenant" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tenants.map((tenant) => (
                        <SelectItem key={tenant.id} value={tenant.id}>
                          {tenant.firstName} {tenant.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Create Request</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
