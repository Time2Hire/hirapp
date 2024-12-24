'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CompanyDetails } from '@/components/company/company-details';
import { BillingInformation } from '@/components/company/billing-information';
import { PaymentsSubscriptions } from '@/components/company/payments-subscriptions';

export default function CompanyProfile() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Company Profile</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your company information, billing details, and subscription
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="company-details" className="space-y-6">
          <TabsList>
            <TabsTrigger value="company-details">Company Details</TabsTrigger>
            <TabsTrigger value="billing">Billing Information</TabsTrigger>
            <TabsTrigger value="payments">Payments & Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="company-details">
            <CompanyDetails />
          </TabsContent>

          <TabsContent value="billing">
            <BillingInformation />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentsSubscriptions />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 