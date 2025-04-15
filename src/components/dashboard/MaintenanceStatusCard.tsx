
import { MaintenanceRequest } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTenantById, getPropertyById } from "@/lib/data";

interface MaintenanceStatusCardProps {
  requests: MaintenanceRequest[];
}

const MaintenanceStatusCard = ({ requests }: MaintenanceStatusCardProps) => {
  const statusCounts = {
    pending: requests.filter(r => r.status === 'pending').length,
    inProgress: requests.filter(r => r.status === 'in-progress').length,
    completed: requests.filter(r => r.status === 'completed').length,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Maintenance Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">Pending</div>
            <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">
              {statusCounts.pending}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">In Progress</div>
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
              {statusCounts.inProgress}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">Completed</div>
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
              {statusCounts.completed}
            </div>
          </div>
        </div>
        
        {requests.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-3">Recent Requests</h4>
            <div className="space-y-3">
              {requests.slice(0, 3).map((request) => {
                const tenant = getTenantById(request.tenantId);
                const property = getPropertyById(request.propertyId);
                
                return (
                  <div key={request.id} className="border-b pb-3 last:border-0">
                    <div className="text-sm font-medium">{request.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {property?.name} - {tenant?.firstName} {tenant?.lastName}
                    </div>
                    <div className="flex mt-1 gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        request.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        request.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {request.status}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        request.priority === 'high' ? 'bg-red-100 text-red-800' :
                        request.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {request.priority} priority
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MaintenanceStatusCard;
