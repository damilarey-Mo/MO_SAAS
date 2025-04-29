'use client'

import { ArticleCard, ArticleProps } from '@/components/knowledge-base/ArticleCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

// Mock articles data
const mockArticles: ArticleProps[] = [
  {
    id: 'getting-started',
    title: 'Getting Started with Our Platform',
    summary: 'Learn how to set up your account, navigate the dashboard, and start using our platform effectively.',
    content: 'Long content here...',
    tags: ['Basics', 'Setup', 'Onboarding'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-08-20'),
    author: {
      id: 'author1',
      name: 'Support Team',
    },
    views: 1250,
    helpfulCount: 342,
  },
  {
    id: 'billing-faq',
    title: 'Billing and Subscriptions FAQ',
    summary: 'Frequently asked questions about billing, subscriptions, payment methods, and invoices.',
    content: 'Long content here...',
    tags: ['Billing', 'Payments', 'FAQ'],
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-09-01'),
    author: {
      id: 'author2',
      name: 'Finance Team',
    },
    views: 980,
    helpfulCount: 210,
  },
  {
    id: 'api-integration',
    title: 'API Integration Guide',
    summary: 'Comprehensive guide to integrating with our API including authentication, endpoints, and examples.',
    content: 'Long content here...',
    tags: ['API', 'Development', 'Integration'],
    createdAt: new Date('2024-03-22'),
    updatedAt: new Date('2024-07-18'),
    author: {
      id: 'author3',
      name: 'Developer Relations',
    },
    views: 620,
    helpfulCount: 185,
  },
  {
    id: 'security-best-practices',
    title: 'Security Best Practices',
    summary: 'Learn how to secure your account and data with our recommended security best practices.',
    content: 'Long content here...',
    tags: ['Security', 'Best Practices', 'Data Protection'],
    createdAt: new Date('2024-04-10'),
    updatedAt: new Date('2024-08-05'),
    author: {
      id: 'author4',
      name: 'Security Team',
    },
    views: 840,
    helpfulCount: 275,
  },
  {
    id: 'troubleshooting-common-issues',
    title: 'Troubleshooting Common Issues',
    summary: 'Solutions for the most common issues users encounter and how to resolve them quickly.',
    content: 'Long content here...',
    tags: ['Troubleshooting', 'Common Issues', 'Help'],
    createdAt: new Date('2024-05-15'),
    updatedAt: new Date('2024-09-10'),
    author: {
      id: 'author1',
      name: 'Support Team',
    },
    views: 1150,
    helpfulCount: 390,
  },
  {
    id: 'advanced-features',
    title: 'Advanced Features and Tips',
    summary: 'Unlock the full potential of our platform with these advanced features and expert tips.',
    content: 'Long content here...',
    tags: ['Advanced', 'Tips', 'Features'],
    createdAt: new Date('2024-06-20'),
    updatedAt: new Date('2024-08-30'),
    author: {
      id: 'author5',
      name: 'Product Team',
    },
    views: 750,
    helpfulCount: 220,
  },
]

// Categories for sidebar
const categories = [
  { name: 'Getting Started', count: 5 },
  { name: 'Account Management', count: 3 },
  { name: 'Billing & Payments', count: 7 },
  { name: 'API & Development', count: 9 },
  { name: 'Security', count: 4 },
  { name: 'Troubleshooting', count: 11 },
  { name: 'Advanced Features', count: 6 },
]

export default function KnowledgeBasePage() {
  return (
    <div className="py-6 px-4 md:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Knowledge Base</h1>
        <div className="flex gap-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input 
              type="search" 
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Search articles..."
            />
          </div>
          <Button>New Article</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar with categories */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-1">
                {categories.map(category => (
                  <li key={category.name}>
                    <a 
                      href="#" 
                      className="flex justify-between items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100"
                    >
                      <span>{category.name}</span>
                      <Badge className="text-xs">{category.count}</Badge>
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Article Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockArticles.map(article => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 