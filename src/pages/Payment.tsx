
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CreditCard } from "lucide-react";
import { toast } from "sonner";

const Payment = () => {
  const handleSubscribe = (plan: string, price: number) => {
    // This would connect to a payment gateway in a real application
    toast.success(`Processing ${plan} plan subscription for ₹${price.toLocaleString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Upgrade Your Plan</h1>
          <p className="text-gray-600 text-lg">
            Choose the plan that suits your recruitment needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Premier Plan */}
          <Card className="flex flex-col border-2 hover:border-primary/50 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl">Premier Plan</CardTitle>
              <CardDescription>Perfect for small to medium businesses</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-6">
                <span className="text-3xl font-bold">₹6,000</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Unlimited resume uploads</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Advanced candidate search</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Email outreach campaigns</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Basic analytics dashboard</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSubscribe('Premier', 6000)} className="w-full">
                <CreditCard className="mr-2 h-4 w-4" /> Subscribe Now
              </Button>
            </CardFooter>
          </Card>

          {/* Elite Plan */}
          <Card className="flex flex-col border-2 border-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold">
              RECOMMENDED
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Elite Plan</CardTitle>
              <CardDescription>For enterprises with high-volume recruiting</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-6">
                <span className="text-3xl font-bold">₹15,000</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Everything in Premier plan</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>AI-powered candidate matching</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Automated interview scheduling</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Custom recruitment workflows</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Priority support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSubscribe('Elite', 15000)} variant="default" className="w-full">
                <CreditCard className="mr-2 h-4 w-4" /> Subscribe Now
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Need a custom plan for your enterprise? Contact our sales team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
