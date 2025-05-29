import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Calendar, CheckCircle, Clock, HelpCircle, Info, Wrench, AlertCircle, BarChart3 } from "lucide-react";

// Mock data for demonstration
const mockMaintenanceItems = [
  {
    id: "item1",
    name: "Water Heater - Unit 3B",
    property: "Kilimani Residences",
    lastService: "2025-01-15",
    nextService: "2025-07-15",
    healthScore: 72,
    riskLevel: "medium",
    estimatedLifeRemaining: "3 years",
    recommendations: [
      { id: "rec1", text: "Schedule inspection within 30 days", priority: "medium" },
      { id: "rec2", text: "Check pressure relief valve", priority: "low" }
    ]
  },
  {
    id: "item2",
    name: "HVAC System - Building A",
    property: "Karen Gardens",
    lastService: "2025-03-10",
    nextService: "2025-06-10",
    healthScore: 45,
    riskLevel: "high",
    estimatedLifeRemaining: "1 year",
    recommendations: [
      { id: "rec3", text: "Replace air filter immediately", priority: "high" },
      { id: "rec4", text: "Schedule comprehensive maintenance", priority: "high" },
      { id: "rec5", text: "Budget for potential replacement next year", priority: "medium" }
    ]
  },
  {
    id: "item3",
    name: "Roof - Main Building",
    property: "Mombasa Coastal Complex",
    lastService: "2024-11-05",
    nextService: "2025-11-05",
    healthScore: 88,
    riskLevel: "low",
    estimatedLifeRemaining: "7 years",
    recommendations: [
      { id: "rec6", text: "Inspect after rainy season", priority: "low" }
    ]
  },
  {
    id: "item4",
    name: "Elevator - Building B",
    property: "Kilimani Residences",
    lastService: "2025-04-22",
    nextService: "2025-07-22",
    healthScore: 63,
    riskLevel: "medium",
    estimatedLifeRemaining: "4 years",
    recommendations: [
      { id: "rec7", text: "Schedule lubrication service", priority: "medium" },
      { id: "rec8", text: "Inspect door mechanisms", priority: "medium" }
    ]
  },
  {
    id: "item5",
    name: "Security System",
    property: "Karen Gardens",
    lastService: "2025-02-18",
    nextService: "2025-08-18",
    healthScore: 91,
    riskLevel: "low",
    estimatedLifeRemaining: "5 years",
    recommendations: []
  }
];

const PredictiveMaintenance = () => {
  const [selectedProperty, setSelectedProperty] = useState("all");
  const [selectedRisk, setSelectedRisk] = useState("all");
  const [selectedItem, setSelectedItem] = useState(mockMaintenanceItems[0]);

  const getHealthColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "high":
        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" /> High Risk</Badge>;
      case "medium":
        return <Badge variant="warning"><AlertCircle className="h-3 w-3 mr-1" /> Medium Risk</Badge>;
      case "low":
        return <Badge variant="success"><CheckCircle className="h-3 w-3 mr-1" /> Low Risk</Badge>;
      default:
        return <Badge variant="outline"><HelpCircle className="h-3 w-3 mr-1" /> Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="warning">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  const filteredItems = mockMaintenanceItems.filter(item => {
    const matchesProperty = selectedProperty === "all" || item.property === selectedProperty;
    const matchesRisk = selectedRisk === "all" || item.riskLevel === selectedRisk;
    return matchesProperty && matchesRisk;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Predictive Maintenance</h1>
        <p className="text-muted-foreground">AI-powered maintenance forecasting and planning.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Equipment Health</CardTitle>
            <CardDescription>Maintenance predictions and alerts</CardDescription>
            
            <div className="flex flex-col gap-2 mt-4">
              <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by property" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="Kilimani Residences">Kilimani Residences</SelectItem>
                  <SelectItem value="Karen Gardens">Karen Gardens</SelectItem>
                  <SelectItem value="Mombasa Coastal Complex">Mombasa Coastal Complex</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedRisk} onValueChange={setSelectedRisk}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {filteredItems.map((item) => (
                  <div 
                    key={item.id}
                    className={`p-3 rounded-md border cursor-pointer hover:bg-accent ${selectedItem.id === item.id ? 'bg-accent' : ''}`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.property}</p>
                      </div>
                      {getRiskBadge(item.riskLevel)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Health Score</span>
                        <span className="font-medium">{item.healthScore}%</span>
                      </div>
                      <Progress value={item.healthScore} className={`h-2 ${getHealthColor(item.healthScore)}`} />
                    </div>
                  </div>
                ))}
                
                {filteredItems.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No items match your filters
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{selectedItem.name}</CardTitle>
                <CardDescription>{selectedItem.property}</CardDescription>
              </div>
              {getRiskBadge(selectedItem.riskLevel)}
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm font-medium">Health Score</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0">
                      <div className="text-2xl font-bold">{selectedItem.healthScore}%</div>
                      <Progress value={selectedItem.healthScore} className={`h-2 mt-2 ${getHealthColor(selectedItem.healthScore)}`} />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm font-medium">Estimated Life</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0">
                      <div className="text-2xl font-bold">{selectedItem.estimatedLifeRemaining}</div>
                      <p className="text-xs text-muted-foreground mt-1">Remaining useful life</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm font-medium">Next Service</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0">
                      <div className="text-2xl font-bold">
                        {new Date(selectedItem.nextService).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(selectedItem.nextService) < new Date() 
                          ? 'Overdue' 
                          : `In ${Math.ceil((new Date(selectedItem.nextService).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days`
                        }
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm font-medium">AI Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="py-3">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">
                          Based on usage patterns and sensor data, this {selectedItem.name.split(' - ')[0].toLowerCase()} 
                          is showing signs of {selectedItem.riskLevel === 'high' ? 'significant' : selectedItem.riskLevel === 'medium' ? 'moderate' : 'minimal'} wear.
                        </p>
                      </div>
                      
                      {selectedItem.riskLevel === 'high' && (
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">
                            Failure probability within the next 90 days is estimated at 35-45% if recommended maintenance is not performed.
                          </p>
                        </div>
                      )}
                      
                      {selectedItem.riskLevel === 'medium' && (
                        <div className="flex items-start gap-2">
                          <Clock className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">
                            Preventive maintenance now could extend the useful life by an additional 1-2 years.
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-start gap-2">
                        <BarChart3 className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">
                          Similar equipment typically requires major service after {selectedItem.riskLevel === 'high' ? '5-6' : selectedItem.riskLevel === 'medium' ? '7-8' : '10-12'} years.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="recommendations">
                {selectedItem.recommendations.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Recommendation</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedItem.recommendations.map((rec) => (
                        <TableRow key={rec.id}>
                          <TableCell>{rec.text}</TableCell>
                          <TableCell>{getPriorityBadge(rec.priority)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              <Calendar className="h-4 w-4 mr-2" />
                              Schedule
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No recommendations at this time
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="history">
                <div className="text-center py-8 text-muted-foreground">
                  Maintenance history will be displayed here
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="outline">
              <Wrench className="h-4 w-4 mr-2" />
              Create Work Order
            </Button>
            <Button>
              Schedule Maintenance
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PredictiveMaintenance;
