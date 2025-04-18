
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";
import { 
  Download, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Calendar, 
  FileText,
  FilePlus2,
  Table as TableIcon
} from "lucide-react";
import { 
  properties, 
  tenants, 
  payments, 
  getVacancyRate, 
  getTotalRentCollected 
} from "@/lib/data";
import { PaymentMethodBadge } from "@/components/payments/PaymentMethodBadge";
import { 
  PAYMENT_METHODS, 
  calculateTotalsByMethod,
  calculateMonthlyRevenue,
  generatePaymentsCsvData
} from "@/lib/utils/paymentUtils";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import Papa from 'papaparse';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Chart colors
const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#ffc658', '#ff8042'];

// Create a function to download data as CSV
const downloadCsv = (data: any[], filename: string) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Create a function to download data as PDF
const downloadPdf = () => {
  // In a real app, you would use a library like jsPDF to generate PDFs
  alert('PDF generation would be implemented with a library like jsPDF');
};

const Reports = () => {
  const [activeTab, setActiveTab] = useState("revenue");
  const [timeRange, setTimeRange] = useState("6months");
  const [startDate, setStartDate] = useState(subMonths(new Date(), 6));
  const [endDate, setEndDate] = useState(new Date());
  
  // Prepare data for the monthly revenue chart
  const monthlyRevenue = calculateMonthlyRevenue(payments);
  
  // Prepare data for property occupancy chart
  const propertyOccupancy = properties.map(property => {
    const totalUnits = property.units;
    const occupiedUnits = tenants.filter(
      tenant => tenant.propertyId === property.id && tenant.status === 'active'
    ).length;
    
    return {
      name: property.name,
      occupied: occupiedUnits,
      vacant: totalUnits - occupiedUnits
    };
  });
  
  // Prepare data for payment method distribution
  const paymentMethodTotals = calculateTotalsByMethod(payments);
  const paymentMethods = Object.entries(paymentMethodTotals).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1).replace('-', ' '), // Capitalize and format
    value
  }));
  
  // Calculate key financial metrics
  const totalRentCollected = getTotalRentCollected();
  const vacancyRate = getVacancyRate();
  const averagePaymentAmount = payments.length > 0 
    ? payments.reduce((sum, payment) => sum + payment.amount, 0) / payments.length 
    : 0;
  
  const handleExportCsv = () => {
    const csvData = generatePaymentsCsvData(payments, tenants, properties);
    downloadCsv(csvData, `payments-report-${format(new Date(), 'yyyy-MM-dd')}.csv`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            View analytics and generate reports for your properties.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportCsv}>
            <FileText className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={downloadPdf}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Rent Collected
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh {totalRentCollected.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Vacancy Rate
            </CardTitle>
            <PieChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vacancyRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Payment
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh {averagePaymentAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Payments
            </CardTitle>
            <FilePlus2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payments.length}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 md:items-end">
          <div className="grid gap-1.5">
            <Label htmlFor="time-range">Time Range</Label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger id="time-range" className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="12months">Last 12 Months</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {timeRange === 'custom' && (
            <>
              <div className="grid gap-1.5">
                <Label>Start Date</Label>
                <DatePicker date={startDate} setDate={setStartDate} />
              </div>
              <div className="grid gap-1.5">
                <Label>End Date</Label>
                <DatePicker date={endDate} setDate={setEndDate} />
              </div>
            </>
          )}
          
          <Button className="md:mb-0" variant="secondary">
            Apply Filters
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          <TabsTrigger value="payments">Payment Methods</TabsTrigger>
          <TabsTrigger value="details">Payment Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyRevenue}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `KSh ${value / 1000}k`}
                  />
                  <Tooltip 
                    formatter={(value) => [`KSh ${Number(value).toLocaleString()}`, 'Amount']}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#8884d8" 
                    name="Revenue" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="occupancy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Property Occupancy</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={propertyOccupancy}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="occupied" stackId="a" fill="#82ca9d" name="Occupied Units" />
                  <Bar dataKey="vacant" stackId="a" fill="#ffc658" name="Vacant Units" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethods}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {paymentMethods.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`KSh ${Number(value).toLocaleString()}`, 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.slice(0, 10).map((payment) => {
                      const tenant = tenants.find(t => t.id === payment.tenantId);
                      const property = properties.find(p => p.id === payment.propertyId);
                      
                      return (
                        <TableRow key={payment.id}>
                          <TableCell>{format(new Date(payment.date), 'MMM dd, yyyy')}</TableCell>
                          <TableCell className="font-medium">
                            {tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Unknown'}
                          </TableCell>
                          <TableCell>{property?.name || 'Unknown'}</TableCell>
                          <TableCell className="font-medium">KSh {payment.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <PaymentMethodBadge method={payment.method} showIcon={true} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
