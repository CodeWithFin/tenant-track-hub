
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tenant } from "@/types";
import { getPropertyById } from "@/lib/data";

interface TenantViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenant: Tenant;
}

const TenantViewDialog = ({
  open,
  onOpenChange,
  tenant,
}: TenantViewDialogProps) => {
  const property = getPropertyById(tenant.propertyId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tenant Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">
              {tenant.firstName} {tenant.lastName}
            </h3>
            <div className="flex items-center gap-2">
              {tenant.status === "active" ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Active
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                  Inactive
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p>{tenant.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p>{tenant.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Property</p>
              <p>{property?.name || "Unknown"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Unit Number</p>
              <p>{tenant.unitNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Lease Start</p>
              <p>{format(new Date(tenant.leaseStart), "MMMM d, yyyy")}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lease End</p>
              <p>{format(new Date(tenant.leaseEnd), "MMMM d, yyyy")}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Rent Amount</p>
            <p className="text-lg font-medium">
              KSh {tenant.rentAmount.toLocaleString()}/month
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TenantViewDialog;
