import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Award, Gift, CreditCard, TrendingUp, Calendar, CheckCircle, Star } from "lucide-react";

// Mock data for demonstration
const mockRewardsData = {
  points: 1250,
  tier: "silver",
  nextTier: "gold",
  pointsToNextTier: 750,
  creditScore: {
    current: 685,
    previous: 670,
    change: 15
  },
  history: [
    { id: 1, date: "2025-05-01", description: "On-time rent payment", points: 100, status: "credited" },
    { id: 2, date: "2025-04-15", description: "Referred a new tenant", points: 250, status: "credited" },
    { id: 3, date: "2025-04-01", description: "On-time rent payment", points: 100, status: "credited" },
    { id: 4, date: "2025-03-28", description: "Maintenance feedback", points: 50, status: "credited" },
    { id: 5, date: "2025-03-01", description: "On-time rent payment", points: 100, status: "credited" },
    { id: 6, date: "2025-02-01", description: "On-time rent payment", points: 100, status: "credited" },
    { id: 7, date: "2025-02-15", description: "Community event participation", points: 75, status: "credited" },
    { id: 8, date: "2025-01-01", description: "On-time rent payment", points: 100, status: "credited" },
  ],
  redeemed: [
    { id: 1, date: "2025-03-15", description: "KSh 500 rent discount", points: 500, status: "redeemed" },
    { id: 2, date: "2025-01-10", description: "Free cleaning service", points: 350, status: "redeemed" },
  ],
  available: [
    { id: 1, name: "KSh 500 rent discount", description: "Get KSh 500 off your next rent payment", points: 500, category: "discount" },
    { id: 2, name: "Free cleaning service", description: "Professional cleaning of your apartment", points: 350, category: "service" },
    { id: 3, name: "Priority maintenance", description: "Priority scheduling for non-emergency maintenance", points: 200, category: "service" },
    { id: 4, name: "Grocery delivery credit", description: "KSh 1,000 credit for grocery delivery", points: 800, category: "partner" },
    { id: 5, name: "KSh 1,500 rent discount", description: "Get KSh 1,500 off your next rent payment", points: 1500, category: "discount" },
    { id: 6, name: "Late fee waiver", description: "One-time waiver of late payment fee", points: 300, category: "discount" },
  ]
};

const RentRewards = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedReward, setSelectedReward] = useState<null | { id: number, name: string, points: number }>(null);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "bronze": return "text-amber-700";
      case "silver": return "text-slate-400";
      case "gold": return "text-amber-400";
      case "platinum": return "text-emerald-400";
      default: return "text-slate-400";
    }
  };

  const getTierProgress = () => {
    const { points, pointsToNextTier } = mockRewardsData;
    const totalNeeded = points + pointsToNextTier;
    return (points / totalNeeded) * 100;
  };

  const handleRedeemPoints = () => {
    if (selectedReward) {
      // Here you would normally send the redemption request to your backend
      console.log(`Redeeming ${selectedReward.points} points for ${selectedReward.name}`);
      setSelectedReward(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rent Rewards Program</h1>
        <p className="text-muted-foreground">Earn rewards for on-time payments and build your credit.</p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="credit">Credit Building</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Award className="h-5 w-5 mr-2 text-primary" />
                  Current Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{mockRewardsData.points}</div>
                <p className="text-sm text-muted-foreground">Available to redeem</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Star className="h-5 w-5 mr-2 text-primary" />
                  Membership Tier
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold capitalize ${getTierColor(mockRewardsData.tier)}`}>
                    {mockRewardsData.tier}
                  </span>
                  <Badge variant="outline" className="capitalize">
                    Next: {mockRewardsData.nextTier}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress to {mockRewardsData.nextTier}</span>
                    <span>{mockRewardsData.pointsToNextTier} points needed</span>
                  </div>
                  <Progress value={getTierProgress()} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  Credit Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-bold">{mockRewardsData.creditScore.current}</div>
                  <div className="text-sm text-green-600 flex items-center pb-1">
                    +{mockRewardsData.creditScore.change} <TrendingUp className="h-3 w-3 ml-1" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Updated monthly</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>How to Earn Points</CardTitle>
              <CardDescription>Multiple ways to earn rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium">On-time Payments</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Earn 100 points for each on-time rent payment. Consistency builds your rewards faster.
                  </p>
                </div>

                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium">Property Engagement</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Earn 50-100 points for community participation, feedback, and referrals.
                  </p>
                </div>

                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                    <h3 className="font-medium">Credit Building</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We report your on-time payments to credit bureaus to help build your credit history.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Available Rewards</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockRewardsData.available.map((reward) => (
                  <Card 
                    key={reward.id} 
                    className={`cursor-pointer transition-all ${selectedReward?.id === reward.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setSelectedReward(reward)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{reward.name}</CardTitle>
                      <CardDescription>{reward.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2 flex justify-between">
                      <Badge variant="outline" className="capitalize">
                        {reward.category}
                      </Badge>
                      <div className="font-semibold text-sm flex items-center">
                        <Gift className="h-4 w-4 mr-1 text-primary" />
                        {reward.points} points
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Redeem Points</CardTitle>
                  <CardDescription>Select a reward to redeem your points</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedReward ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">{selectedReward.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          You're about to redeem {selectedReward.points} points
                        </p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Your points</span>
                          <span>{mockRewardsData.points}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Cost</span>
                          <span>-{selectedReward.points}</span>
                        </div>
                        <div className="border-t pt-1 mt-1">
                          <div className="flex justify-between font-medium">
                            <span>Remaining</span>
                            <span>{mockRewardsData.points - selectedReward.points}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <Gift className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Select a reward to redeem</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    disabled={!selectedReward || selectedReward.points > mockRewardsData.points}
                    onClick={handleRedeemPoints}
                  >
                    {selectedReward && selectedReward.points > mockRewardsData.points
                      ? "Not enough points"
                      : "Redeem Points"
                    }
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Points History</CardTitle>
              <CardDescription>Track your rewards activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...mockRewardsData.history, ...mockRewardsData.redeemed]
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((item) => (
                        <TableRow key={`${item.id}-${item.status}`}>
                          <TableCell>{format(new Date(item.date), 'MMM dd, yyyy')}</TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell className={item.status === 'credited' ? 'text-green-600' : 'text-red-600'}>
                            {item.status === 'credited' ? '+' : '-'}{item.points}
                          </TableCell>
                          <TableCell>
                            <Badge variant={item.status === 'credited' ? 'outline' : 'secondary'} className="capitalize">
                              {item.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credit" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Credit Building</CardTitle>
                <CardDescription>How your rent payments build credit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Current Credit Score</h3>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-bold">{mockRewardsData.creditScore.current}</div>
                    <Badge variant="outline" className="text-green-600">
                      +{mockRewardsData.creditScore.change} from last month
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">How It Works</h3>
                  <p className="text-sm text-muted-foreground">
                    We report your on-time rent payments to major credit bureaus, helping you build a positive credit history. 
                    Consistent payments can improve your credit score over time, making it easier to qualify for loans and credit cards.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Benefits</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Build credit history without taking on debt</li>
                    <li>• Improve your credit score with payments you're already making</li>
                    <li>• Access better interest rates on future loans</li>
                    <li>• Qualify for better housing opportunities</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Credit Report</CardTitle>
                <CardDescription>Your rent payment reporting history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Payment Reporting</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Month</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {["May 2025", "April 2025", "March 2025", "February 2025", "January 2025"].map((month, i) => (
                          <TableRow key={month}>
                            <TableCell>{month}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Reported On-Time
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="text-center pt-4">
                    <Button variant="outline">
                      View Full Credit Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RentRewards;
