import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { maintenanceRequests, getTenantById, getPropertyById, updateMaintenanceStatus } from "@/lib/data";
import { Plus, Search, Activity, Wrench, BarChart } from "lucide-react";
import { MaintenanceRequestDialog } from "@/components/maintenance/MaintenanceRequestDialog";
import { useToast } from "@/hooks/use-toast";
import { MaintenanceRequest } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { properties, tenants } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PredictiveMaintenance from "@/components/maintenance/PredictiveMaintenance";

const Maintenance = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("requests");
  const { toast } = useToast();

  const handleStatusUpdate = (request: MaintenanceRequest, newStatus: MaintenanceRequest['status']) => {
    updateMaintenanceStatus(request.id, newStatus);
    toast({
      title: "Status Updated",
      description: `Request status changed to ${newStatus}`,
    });
  };
  
  const filteredRequests = maintenanceRequests.filter(
    (request) => {
      const tenant = getTenantById(request.tenantId);
      const property = getPropertyById(request.propertyId);
      const tenantName = tenant ? `${tenant.firstName} ${tenant.lastName}` : '';
      const propertyName = property ? property.name : '';
      
      const matchesSearch = 
        request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        propertyName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || request.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    }
  );
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Medium</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Maintenance</h1>
          <p className="text-muted-foreground">Manage property maintenance and repairs.</p>
        </div>
        {activeTab === "requests" && (
          <MaintenanceRequestDialog 
            properties={properties.map(p => ({ id: p.id, name: p.name }))}
            tenants={tenants.map(t => ({ id: t.id, firstName: t.firstName, lastName: t.lastName }))}
          />
        )}
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-[400px]">
          <TabsTrigger value="requests">
            <Wrench className="h-4 w-4 mr-2" />
            Requests
          </TabsTrigger>
          <TabsTrigger value="predictive">
            <Activity className="h-4 w-4 mr-2" />
            Predictive AI
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests" className="space-y-4 mt-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:w-1/2 lg:w-1/3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Issue</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Reported</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => {
                  const tenant = getTenantById(request.tenantId);
                  const property = getPropertyById(request.propertyId);
                  
                  return (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        <div>{request.title}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-xs">
                          {request.description}
                        </div>
                      </TableCell>
                      <TableCell>{property?.name || 'Unknown'}</TableCell>
                      <TableCell>
                        {tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Unknown'}
                      </TableCell>
                      <TableCell>{format(new Date(request.dateReported), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Update Status
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(request, 'pending')}>
                              Mark as Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(request, 'in-progress')}>
                              Mark as In Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(request, 'completed')}>
                              Mark as Completed
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
                
                {filteredRequests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-6">
                      No maintenance requests found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="predictive" className="mt-6">
          <PredictiveMaintenance />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <div className="flex flex-col items-center justify-center p-12 border rounded-md bg-muted/10">
            <BarChart className="h-16 w-16 text-muted mb-4" />
            <h3 className="text-xl font-medium mb-2">Maintenance Analytics</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Advanced maintenance analytics and reporting features coming soon. Track costs, identify trends, and optimize your maintenance operations.  
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Maintenance;
