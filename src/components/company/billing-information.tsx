'use client';

import { useState } from 'react';

export function BillingInformation() {
  const [sameAsCompanyAddress, setSameAsCompanyAddress] = useState(true);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="space-y-6">
        {/* Billing Address Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Billing Address</h3>
            <div className="flex items-center">
              <input
                id="same-address"
                name="same-address"
                type="checkbox"
                checked={sameAsCompanyAddress}
                onChange={(e) => setSameAsCompanyAddress(e.target.checked)}
                className="form-checkbox h-4 w-4 text-primary-600 bg-white border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500 focus:ring-offset-0"
              />
              <label htmlFor="same-address" className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                Same as company address
              </label>
            </div>
          </div>

          {!sameAsCompanyAddress && (
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
              <div className="sm:col-span-2">
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Street Address
                </label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2"
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  State / Province
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2"
                />
              </div>

              <div>
                <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  ZIP / Postal Code
                </label>
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  defaultValue="Germany"
                  className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2"
                >
                  <option>Germany</option>
                  <option>Austria</option>
                  <option>Switzerland</option>
                  <option>Other EU Country</option>
                  <option>Non-EU Country</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Tax Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tax Information</h3>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
            <div>
              <label htmlFor="tax-id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Tax ID / VAT Number
              </label>
              <input
                type="text"
                name="tax-id"
                id="tax-id"
                defaultValue="DE3684351"
                className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2"
              />
            </div>
          </div>
        </div>

        {/* Invoice Contact */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Invoice Contact</h3>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Contact Person
              </label>
              <input
                type="text"
                name="contact-name"
                id="contact-name"
                defaultValue="Markus Heier"
                className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2"
              />
            </div>

            <div>
              <label htmlFor="invoice-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Invoice Email
              </label>
              <input
                type="email"
                name="invoice-email"
                id="invoice-email"
                defaultValue="rechnung@fount.one"
                className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2"
              />
            </div>
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
    </div>
  );
} 