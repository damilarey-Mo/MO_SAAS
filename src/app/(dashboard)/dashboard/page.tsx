'use client'

import { TicketList } from '@/components/tickets/TicketList'
import { TicketFilters } from '@/components/tickets/TicketFilters'
import { TicketCard, TicketPriority, TicketStatus } from '@/components/tickets/TicketCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

// Mock data for the dashboard
const mockTickets = [
  {
    id: '1234abcd',
    title: 'Cannot access my account',
    description: 'I tried to login but keep getting an error message saying my password is incorrect. I reset my password twice but still having issues.',
    status: 'open' as TicketStatus,
    priority: 'high' as TicketPriority,
    createdAt: new Date('2024-09-10T12:00:00'),
    customer: {
      id: 'cust1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    }
  },
  {
    id: '5678efgh',
    title: 'Feature request: Dark mode',
    description: 'Would it be possible to add a dark mode option to the dashboard? It would be much easier on the eyes when working late at night.',
    status: 'in-progress' as TicketStatus,
    priority: 'medium' as TicketPriority,
    createdAt: new Date('2024-09-09T14:30:00'),
    assignedTo: {
      id: 'staff1',
      name: 'Jane Smith',
    },
    customer: {
      id: 'cust2',
      name: 'Mike Johnson',
      email: 'mike.j@example.com',
    }
  },
  {
    id: '9012ijkl',
    title: 'Integration with Zapier not working',
    description: 'We set up a Zapier integration last week but it stopped syncing data yesterday. We need this fixed urgently as it impacts our workflow.',
    status: 'pending' as TicketStatus,
    priority: 'critical' as TicketPriority,
    createdAt: new Date('2024-09-08T09:15:00'),
    assignedTo: {
      id: 'staff2',
      name: 'Robert Brown',
    },
    customer: {
      id: 'cust3',
      name: 'Sarah Williams',
      email: 's.williams@example.com',
    }
  },
  {
    id: '3456mnop',
    title: 'Cannot export data as CSV',
    description: 'The export functionality seems broken. When I try to export my data as a CSV file, the download starts but the file is empty.',
    status: 'open' as TicketStatus,
    priority: 'low' as TicketPriority,
    createdAt: new Date('2024-09-07T16:45:00'),
    customer: {
      id: 'cust4',
      name: 'David Chen',
      email: 'david.c@example.com',
    }
  },
  {
    id: '7890qrst',
    title: 'Billing issue - charged twice',
    description: 'I was charged twice for my monthly subscription. Please refund the extra payment and fix this issue.',
    status: 'closed' as TicketStatus,
    priority: 'high' as TicketPriority,
    createdAt: new Date('2024-09-06T11:20:00'),
    assignedTo: {
      id: 'staff3',
      name: 'Emily Davis',
    },
    customer: {
      id: 'cust5',
      name: 'Alex Rodriguez',
      email: 'alex.r@example.com',
    }
  },
]

// Stats for dashboard
const stats = [
  { label: 'Open Tickets', value: '12', change: '+2', changeType: 'negative' },
  { label: 'Closed Today', value: '8', change: '+3', changeType: 'positive' },
  { label: 'Avg. Response Time', value: '1.4h', change: '-10min', changeType: 'positive' },
  { label: 'Customer Satisfaction', value: '94%', change: '+2%', changeType: 'positive' },
]

export default function Dashboard() {
  return (
    <div className="py-6 px-4 md:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Support Dashboard</h1>
        <Button>New Ticket</Button>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`text-sm px-2 py-1 rounded-full ${
                  stat.changeType === 'positive' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar with filters */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <TicketFilters 
                onFilterChange={(filters) => {
                  console.log('Filters changed:', filters)
                  // Would normally filter the tickets here
                }}
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Ticket list */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="text-lg">Recent Tickets</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <TicketList tickets={mockTickets} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 