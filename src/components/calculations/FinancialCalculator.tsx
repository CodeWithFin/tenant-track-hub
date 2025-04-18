
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePicker } from "@/components/ui/date-picker";
import { 
  calculateLateFee, 
  calculateProratedRent, 
  calculateDepositInterest,
  calculateRentalTax,
  calculateRentIncrease,
  calculateLeaseRenewal
} from "@/lib/utils/financialCalculations";

const FinancialCalculator = () => {
  // Late Fee Calculator
  const [rentAmount, setRentAmount] = useState<number>(50000);
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
  const [paymentDate, setPaymentDate] = useState<Date | undefined>(new Date());
  const [lateFeePercent, setLateFeePercent] = useState<number>(5);
  const [maxLateFee, setMaxLateFee] = useState<number>(0);
  const [lateFeeResult, setLateFeeResult] = useState<number | null>(null);
  
  // Prorated Rent Calculator
  const [monthlyRent, setMonthlyRent] = useState<number>(50000);
  const [leaseStartDate, setLeaseStartDate] = useState<Date | undefined>(new Date());
  const [proratedResult, setProratedResult] = useState<number | null>(null);
  
  // Security Deposit Calculator
  const [depositAmount, setDepositAmount] = useState<number>(50000);
  const [interestRate, setInterestRate] = useState<number>(3);
  const [months, setMonths] = useState<number>(12);
  const [interestResult, setInterestResult] = useState<number | null>(null);
  
  // Tax Calculator
  const [annualIncome, setAnnualIncome] = useState<number>(600000);
  const [expenses, setExpenses] = useState<number>(100000);
  const [taxRate, setTaxRate] = useState<number>(16);
  const [taxResult, setTaxResult] = useState<{taxableIncome: number; taxAmount: number} | null>(null);
  
  // Rent Increase Calculator
  const [currentRent, setCurrentRent] = useState<number>(50000);
  const [increasePercentage, setIncreasePercentage] = useState<number>(5);
  const [renewalMonths, setRenewalMonths] = useState<number>(12);
  const [renewalResult, setRenewalResult] = useState<{
    monthlyRent: number;
    increase: number;
    totalContractValue: number;
  } | null>(null);
  
  const calculateLateFeeResult = () => {
    if (!dueDate || !paymentDate) return;
    
    const fee = calculateLateFee(
      rentAmount,
      dueDate,
      paymentDate,
      lateFeePercent,
      maxLateFee
    );
    
    setLateFeeResult(fee);
  };
  
  const calculateProratedRentResult = () => {
    if (!leaseStartDate) return;
    
    const prorated = calculateProratedRent(
      monthlyRent,
      leaseStartDate
    );
    
    setProratedResult(prorated);
  };
  
  const calculateDepositInterestResult = () => {
    const interest = calculateDepositInterest(
      depositAmount,
      interestRate,
      months
    );
    
    setInterestResult(interest);
  };
  
  const calculateTaxResult = () => {
    const result = calculateRentalTax(
      annualIncome,
      expenses,
      taxRate
    );
    
    setTaxResult(result);
  };
  
  const calculateRenewalResult = () => {
    const result = calculateLeaseRenewal(
      currentRent,
      increasePercentage,
      renewalMonths
    );
    
    setRenewalResult(result);
  };
  
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle>Financial Calculators</CardTitle>
        <CardDescription>
          Calculate various financial aspects of property management
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="late-fee" className="w-full">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="late-fee">Late Fee</TabsTrigger>
            <TabsTrigger value="prorated">Prorated Rent</TabsTrigger>
            <TabsTrigger value="deposit">Deposit Interest</TabsTrigger>
            <TabsTrigger value="tax">Tax</TabsTrigger>
            <TabsTrigger value="increase">Rent Increase</TabsTrigger>
          </TabsList>
          
          {/* Late Fee Calculator */}
          <TabsContent value="late-fee" className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rentAmount">Rent Amount (KSh)</Label>
                <Input
                  id="rentAmount"
                  type="number"
                  value={rentAmount}
                  onChange={(e) => setRentAmount(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lateFeePercent">Late Fee Percentage (%)</Label>
                <Input
                  id="lateFeePercent"
                  type="number"
                  value={lateFeePercent}
                  onChange={(e) => setLateFeePercent(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxLateFee">Maximum Late Fee (0 for no max)</Label>
                <Input
                  id="maxLateFee"
                  type="number"
                  value={maxLateFee}
                  onChange={(e) => setMaxLateFee(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Due Date</Label>
                <DatePicker date={dueDate} setDate={setDueDate} />
              </div>
              
              <div className="space-y-2">
                <Label>Payment Date</Label>
                <DatePicker date={paymentDate} setDate={setPaymentDate} />
              </div>
            </div>
            
            <Button onClick={calculateLateFeeResult} className="w-full mt-4">Calculate Late Fee</Button>
            
            {lateFeeResult !== null && (
              <div className="mt-4 p-4 bg-secondary/20 rounded-md">
                <h3 className="font-medium mb-2">Late Fee Result:</h3>
                <p className="text-2xl font-bold">KSh {lateFeeResult.toLocaleString()}</p>
                {lateFeeResult > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    This is {(lateFeeResult / rentAmount * 100).toFixed(1)}% of the monthly rent.
                  </p>
                )}
              </div>
            )}
          </TabsContent>
          
          {/* Prorated Rent Calculator */}
          <TabsContent value="prorated" className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyRent">Monthly Rent (KSh)</Label>
                <Input
                  id="monthlyRent"
                  type="number"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Lease Start Date</Label>
                <DatePicker date={leaseStartDate} setDate={setLeaseStartDate} />
              </div>
            </div>
            
            <Button onClick={calculateProratedRentResult} className="w-full mt-4">Calculate Prorated Rent</Button>
            
            {proratedResult !== null && (
              <div className="mt-4 p-4 bg-secondary/20 rounded-md">
                <h3 className="font-medium mb-2">Prorated Rent for First Month:</h3>
                <p className="text-2xl font-bold">KSh {proratedResult.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  This is {((proratedResult / monthlyRent) * 100).toFixed(1)}% of the full month's rent.
                </p>
              </div>
            )}
          </TabsContent>
          
          {/* Security Deposit Interest Calculator */}
          <TabsContent value="deposit" className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="depositAmount">Security Deposit (KSh)</Label>
                <Input
                  id="depositAmount"
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="months">Lease Term (Months)</Label>
                <Input
                  id="months"
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                />
              </div>
            </div>
            
            <Button onClick={calculateDepositInterestResult} className="w-full mt-4">Calculate Deposit Interest</Button>
            
            {interestResult !== null && (
              <div className="mt-4 p-4 bg-secondary/20 rounded-md">
                <h3 className="font-medium mb-2">Security Deposit Interest:</h3>
                <p className="text-2xl font-bold">KSh {interestResult.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Total to return: KSh {(depositAmount + interestResult).toLocaleString()}
                </p>
              </div>
            )}
          </TabsContent>
          
          {/* Tax Calculator */}
          <TabsContent value="tax" className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="annualIncome">Annual Rental Income (KSh)</Label>
                <Input
                  id="annualIncome"
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expenses">Deductible Expenses (KSh)</Label>
                <Input
                  id="expenses"
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                />
              </div>
            </div>
            
            <Button onClick={calculateTaxResult} className="w-full mt-4">Calculate Rental Income Tax</Button>
            
            {taxResult !== null && (
              <div className="mt-4 p-4 bg-secondary/20 rounded-md">
                <h3 className="font-medium mb-2">Rental Income Tax:</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Annual Income:</span>
                    <span className="font-medium">KSh {annualIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deductible Expenses:</span>
                    <span className="font-medium">KSh {expenses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxable Income:</span>
                    <span className="font-medium">KSh {taxResult.taxableIncome.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span>Tax Amount ({taxRate}%):</span>
                    <span className="font-bold">KSh {taxResult.taxAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          {/* Rent Increase Calculator */}
          <TabsContent value="increase" className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentRent">Current Rent (KSh)</Label>
                <Input
                  id="currentRent"
                  type="number"
                  value={currentRent}
                  onChange={(e) => setCurrentRent(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="increasePercentage">Increase Percentage (%)</Label>
                <Input
                  id="increasePercentage"
                  type="number"
                  value={increasePercentage}
                  onChange={(e) => setIncreasePercentage(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="renewalMonths">Renewal Term (Months)</Label>
                <Input
                  id="renewalMonths"
                  type="number"
                  value={renewalMonths}
                  onChange={(e) => setRenewalMonths(Number(e.target.value))}
                />
              </div>
            </div>
            
            <Button onClick={calculateRenewalResult} className="w-full mt-4">Calculate Rent Increase</Button>
            
            {renewalResult !== null && (
              <div className="mt-4 p-4 bg-secondary/20 rounded-md">
                <h3 className="font-medium mb-2">Rent Increase Calculation:</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Current Monthly Rent:</span>
                    <span className="font-medium">KSh {currentRent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Increase Amount:</span>
                    <span className="font-medium">KSh {renewalResult.increase.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>New Monthly Rent:</span>
                    <span>KSh {renewalResult.monthlyRent.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t flex justify-between">
                    <span>Total Contract Value ({renewalMonths} months):</span>
                    <span className="font-bold">KSh {renewalResult.totalContractValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FinancialCalculator;
