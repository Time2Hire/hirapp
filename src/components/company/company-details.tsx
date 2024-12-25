'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera, Twitter, Linkedin, Instagram } from 'lucide-react';

export function CompanyDetails() {
  const [logo, setLogo] = useState<string>('/images/user/Logo.png');
  const [banner, setBanner] = useState<string>('/images/user/Banner.png');

  const handleImageUpload = (file: File, setImage: (value: string) => void) => {
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Banner Section */}
      <div className="relative h-48 rounded-t-lg overflow-hidden group">
        <Image
          src={banner}
          alt="Company Banner"
          width={1200}
          height={300}
          className="object-cover w-full h-full transition-opacity group-hover:opacity-75"
          priority
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/user/default-banner.png';
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
          <label htmlFor="banner-upload" className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium">
            <Camera className="w-4 h-4" />
            Change Banner
          </label>
          <input
            id="banner-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleImageUpload(file, setBanner);
              }
            }}
          />
        </div>
      </div>

      {/* Logo Section */}
      <div className="px-6 pb-6">
        <div className="relative -mt-12 w-24 h-24">
          <div className="relative w-full h-full rounded-lg overflow-hidden ring-4 ring-white dark:ring-gray-800 group">
            <Image
              src={logo}
              alt="Company Logo"
              width={96}
              height={96}
              className="object-cover w-full h-full transition-opacity group-hover:opacity-75"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/user/default-logo.png';
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
              <label htmlFor="logo-upload" className="cursor-pointer">
                <Camera className="w-6 h-6 text-white" />
              </label>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageUpload(file, setLogo);
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Company Information Form */}
        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
          <div className="sm:col-span-2">
            <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Company Name
            </label>
            <input
              type="text"
              name="company-name"
              id="company-name"
              defaultValue="fount.one GmbH"
              className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Company Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              defaultValue="We help startups find the right talents by providing innovative recruitment solutions and AI-powered talent matching."
              className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2"
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Website
            </label>
            <input
              type="url"
              name="website"
              id="website"
              defaultValue="www.fount.one"
              className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2"
            />
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Industry
            </label>
            <select
              id="industry"
              name="industry"
              defaultValue="HR Tech"
              className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-2"
            >
              <option>HR Tech</option>
              <option>Technology</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Other</option>
            </select>
          </div>

          {/* Contact Information */}
          <div className="sm:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue="info@fount.one"
                  className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  defaultValue="01766/85478547"
                  className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  defaultValue="Werderseestr. 7, 30163 Hannover"
                  className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2"
                />
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="sm:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Social Media Links</h3>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
              <div className="flex items-center gap-2">
                <Twitter className="w-5 h-5 text-blue-400" />
                <input
                  type="url"
                  name="twitter"
                  defaultValue="x.com/fountone"
                  placeholder="Twitter URL"
                  className="block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2"
                />
              </div>

              <div className="flex items-center gap-2">
                <Linkedin className="w-5 h-5 text-blue-700" />
                <input
                  type="url"
                  name="linkedin"
                  defaultValue="linkedin.com/company/fount-one-gmbh/"
                  placeholder="LinkedIn URL"
                  className="block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2"
                />
              </div>

              <div className="flex items-center gap-2">
                <Instagram className="w-5 h-5 text-pink-600" />
                <input
                  type="url"
                  name="instagram"
                  defaultValue="instagram.com/fount.one/"
                  placeholder="Instagram URL"
                  className="block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
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