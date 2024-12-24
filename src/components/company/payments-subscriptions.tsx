'use client';

import { useState } from 'react';
import { Check, Download, CreditCard } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    description: 'Access to talent pool and pay per hire',
    price: '0',
    features: [
      'Access to talent pool',
      'Pay per hire',
      'Basic company profile',
      'Standard support'
    ]
  },
  {
    name: 'Standard',
    description: 'More insights and 50% savings on hiring fees',
    price: '99',
    features: [
      'All Free features',
      'Assessment results access',
      'AI-powered recommendations',
      '50% savings on hiring fees',
      'Priority support'
    ]
  },
  {
    name: 'Premium',
    description: 'Full access to all features including AI coach',
    price: '299',
    features: [
      'All Standard features',
      'AI interview coach',
      'Interview guidelines',
      'Workforce analytics',
      'Dedicated account manager'
    ]
  }
];

const paymentHistory = [
  {
    id: 1,
    date: '2024-03-01',
    description: 'Premium Plan - March 2024',
    amount: '299.00',
    status: 'Paid'
  },
  {
    id: 2,
    date: '2024-02-01',
    description: 'Premium Plan - February 2024',
    amount: '299.00',
    status: 'Paid'
  },
  {
    id: 3,
    date: '2024-01-01',
    description: 'Standard Plan - January 2024',
    amount: '99.00',
    status: 'Paid'
  }
];

export function PaymentsSubscriptions() {
  const [selectedPlan, setSelectedPlan] = useState('Premium');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('stripe');

  return (
    <div className="space-y-8">
      {/* Current Plan Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Subscription Plans</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg border ${
                selectedPlan === plan.name
                  ? 'border-primary-500 ring-2 ring-primary-500'
                  : 'border-gray-300 dark:border-gray-600'
              } p-6 shadow-sm hover:border-primary-500 cursor-pointer`}
              onClick={() => setSelectedPlan(plan.name)}
            >
              {selectedPlan === plan.name && (
                <div className="absolute top-4 right-4">
                  <Check className="h-5 w-5 text-primary-500" />
                </div>
              )}
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">{plan.name}</h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Check className="h-4 w-4 text-primary-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Payment Method</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div
            className={`relative rounded-lg border ${
              selectedPaymentMethod === 'stripe'
                ? 'border-primary-500 ring-2 ring-primary-500'
                : 'border-gray-300 dark:border-gray-600'
            } p-4 flex items-center cursor-pointer`}
            onClick={() => setSelectedPaymentMethod('stripe')}
          >
            <CreditCard className="h-6 w-6 text-gray-400 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Credit Card (Stripe)</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Secure payment via Stripe</p>
            </div>
          </div>

          <div
            className={`relative rounded-lg border ${
              selectedPaymentMethod === 'paypal'
                ? 'border-primary-500 ring-2 ring-primary-500'
                : 'border-gray-300 dark:border-gray-600'
            } p-4 flex items-center cursor-pointer`}
            onClick={() => setSelectedPaymentMethod('paypal')}
          >
            <div className="h-6 w-6 mr-3 flex items-center justify-center">
              <span className="text-blue-500 font-bold">P</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">PayPal</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pay with your PayPal account</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Payment History</h3>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paymentHistory.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {payment.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ${payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
} 