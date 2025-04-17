
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tenant } from "@/types";
import { getPropertyById } from "@/lib/data";
import { Calendar, FileText, Home, DollarSign, ClipboardList } from "lucide-react";

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

  const getBadgeStyle = (status: Tenant['status']) => {
    switch (status) {
      case 'active':
        return "bg-green-50 text-green-700 border-green-200";
      case 'inactive':
        return "bg-gray-50 text-gray-700 border-gray-200";
      case 'pending':
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Tenant Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">
              {tenant.firstName} {tenant.lastName}
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getBadgeStyle(tenant.status)}>
                {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="lease">Lease</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 pt-4">
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
                  <div className="flex items-center gap-1">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <p>{property?.name || "Unknown"}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Unit Number</p>
                  <p>{tenant.unitNumber}</p>
                </div>
              </div>

              {tenant.notes && (
                <div>
                  <p className="text-sm text-muted-foreground">Notes</p>
                  <p className="text-sm">{tenant.notes}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="lease" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Lease Start</p>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p>{format(new Date(tenant.leaseStart), "MMMM d, yyyy")}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lease End</p>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p>{format(new Date(tenant.leaseEnd), "MMMM d, yyyy")}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Rent Amount</p>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <p className="text-lg font-medium">
                      KSh {tenant.rentAmount.toLocaleString()}/month
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <p className={`text-lg font-medium ${(tenant.balance || 0) > 0 ? 'text-red-500' : ''}`}>
                      KSh {(tenant.balance || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {tenant.lastPaymentDate && (
                <div>
                  <p className="text-sm text-muted-foreground">Last Payment Date</p>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p>{format(new Date(tenant.lastPaymentDate), "MMMM d, yyyy")}</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="documents" className="space-y-4 pt-4">
              {tenant.documents && tenant.documents.length > 0 ? (
                <div className="space-y-2">
                  {tenant.documents.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Uploaded on {format(new Date(doc.uploadDate), "MMMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center h-32">
                  <ClipboardList className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No documents available</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TenantViewDialog;
