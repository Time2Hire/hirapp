'use client';

import { useState } from 'react';
import { Search, MessageSquare, FileText, Book, ChevronDown, ChevronRight, Mail, Phone } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
}

const faqs: FAQ[] = [
  {
    id: '1',
    category: 'Getting Started',
    question: 'How do I create my first job posting?',
    answer: 'To create your first job posting, click on the "Jobs" tab in the sidebar, then click "Create Job Posting". Fill in the job details, requirements, and any specific skills you\'re looking for. Our AI will help match you with the best candidates.'
  },
  {
    id: '2',
    category: 'Getting Started',
    question: 'How does the AI matching work?',
    answer: 'Our AI analyzes both job requirements and candidate profiles using advanced machine learning algorithms. It looks at skills, experience, and cultural fit to provide you with the most relevant matches.'
  },
  {
    id: '3',
    category: 'Billing',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express) and offer SEPA direct debit for EU customers. Enterprise customers can also pay via invoice.'
  },
  {
    id: '4',
    category: 'Interviews',
    question: 'How do I schedule an interview with a candidate?',
    answer: 'From the candidate\'s profile, click "Schedule Interview" and select up to three time slots. The candidate will receive an email to choose their preferred time. Once confirmed, both parties will receive calendar invitations.'
  },
  {
    id: '5',
    category: 'Account Management',
    question: 'Can I have multiple users from my company?',
    answer: 'Yes! Our Professional and Enterprise plans support multiple users with different role permissions. You can manage team members in the Company Settings.'
  }
];

const articles: Article[] = [
  {
    id: '1',
    category: 'Best Practices',
    title: 'Writing Effective Job Descriptions',
    description: 'Learn how to write job descriptions that attract the right candidates and improve your AI matching results.',
    readTime: '5 min read'
  },
  {
    id: '2',
    category: 'Best Practices',
    title: 'Conducting Effective Remote Interviews',
    description: 'Tips and best practices for conducting successful remote interviews and evaluating candidates virtually.',
    readTime: '8 min read'
  },
  {
    id: '3',
    category: 'Tutorials',
    title: 'Setting Up Your Company Profile',
    description: 'A complete guide to optimizing your company profile to attract top talent.',
    readTime: '4 min read'
  },
  {
    id: '4',
    category: 'Tutorials',
    title: 'Using the Interview Guidelines Feature',
    description: 'How to create and use structured interview guidelines for consistent candidate evaluation.',
    readTime: '6 min read'
  }
];

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission
    console.log('Ticket submitted:', { ticketSubject, ticketMessage });
    setTicketSubject('');
    setTicketMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            How can we help you?
          </h1>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Submit a Ticket
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get help from our support team
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Documentation
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Browse our guides and tutorials
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                <Book className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  API Reference
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Technical documentation for developers
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQs Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                  >
                    <div>
                      <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                        {faq.category}
                      </span>
                      <h3 className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                        {faq.question}
                      </h3>
                    </div>
                    {expandedFAQ === faq.id ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFAQ === faq.id && (
                    <div className="px-6 pb-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Ticket Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Submit a Ticket
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="What do you need help with?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Describe your issue in detail..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Submit Ticket
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                  Other Ways to Get Help
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      support@fount.one
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      +49 176 685478547
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Popular Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
              >
                <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                  {article.category}
                </span>
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {article.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {article.readTime}
                  </span>
                  <button className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 