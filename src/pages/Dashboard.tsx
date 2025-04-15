
import { Building2, DollarSign, Home, Users, ArrowUpRight, Wrench } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import PropertyCard from "@/components/dashboard/PropertyCard";
import RecentPaymentsTable from "@/components/dashboard/RecentPaymentsTable";
import MaintenanceStatusCard from "@/components/dashboard/MaintenanceStatusCard";
import { properties, tenants, payments, maintenanceRequests, getVacancyRate, getTotalRentCollected, getActiveTenantsCount } from "@/lib/data";

const Dashboard = () => {
  // Sort payments to get the most recent ones first
  const recentPayments = [...payments].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your properties and tenant activity.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Properties" 
          value={properties.length} 
          icon={Building2} 
          description="Across all locations"
          iconColor="text-blue-600"
          bgColor="bg-blue-100"
        />
        <StatCard 
          title="Active Tenants" 
          value={getActiveTenantsCount()} 
          icon={Users} 
          description={`Out of ${tenants.length} total tenants`}
          iconColor="text-emerald-600"
          bgColor="bg-emerald-100"
        />
        <StatCard 
          title="Monthly Income" 
          value={`$${getTotalRentCollected().toLocaleString()}`} 
          icon={DollarSign} 
          description="Total rent collected"
          trend="up"
          trendValue="8.2% from last month"
          iconColor="text-violet-600"
          bgColor="bg-violet-100"
        />
        <StatCard 
          title="Vacancy Rate" 
          value={`${getVacancyRate().toFixed(1)}%`} 
          icon={Home} 
          description="Average across all properties"
          iconColor="text-amber-600"
          bgColor="bg-amber-100"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Properties</h2>
              <a href="/properties" className="text-sm flex items-center text-primary hover:underline">
                View All <ArrowUpRight className="h-3 w-3 ml-1" />
              </a>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {properties.slice(0, 4).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Payments</h2>
              <a href="/payments" className="text-sm flex items-center text-primary hover:underline">
                View All <ArrowUpRight className="h-3 w-3 ml-1" />
              </a>
            </div>
            <RecentPaymentsTable payments={recentPayments} />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Maintenance</h2>
            <a href="/maintenance" className="text-sm flex items-center text-primary hover:underline">
              View All <ArrowUpRight className="h-3 w-3 ml-1" />
            </a>
          </div>
          <MaintenanceStatusCard requests={maintenanceRequests} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
