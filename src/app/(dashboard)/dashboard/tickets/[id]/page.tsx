'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

// Mock data for the ticket detail
const mockTicketDetail = {
  id: '1234abcd',
  title: 'Cannot access my account after password reset',
  description: 'I tried to login but keep getting an error message saying my password is incorrect. I reset my password twice but still having issues. This is preventing me from accessing critical features I need for my business.',
  status: 'in-progress' as const,
  priority: 'high' as const,
  createdAt: new Date('2024-09-10T12:00:00'),
  updatedAt: new Date('2024-09-11T09:30:00'),
  assignedTo: {
    id: 'agent1',
    name: 'Jane Smith',
    email: 'jane.smith@support.com',
    avatarUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  customer: {
    id: 'cust1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    company: 'ACME Inc.',
    plan: 'Business Pro',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  tags: ['account', 'login', 'password'],
}

// Mock messages for the chat interface
const mockMessages = [
  {
    id: 'msg1',
    content: 'Hi, I\'m having trouble logging into my account after resetting my password. Can you help?',
    timestamp: new Date('2024-09-10T12:00:00'),
    sender: {
      id: 'cust1',
      name: 'John Doe',
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      role: 'customer' as const,
    },
  },
  {
    id: 'msg2',
    content: 'Ticket #1234abcd has been created. Our support team will assist you shortly.',
    timestamp: new Date('2024-09-10T12:01:00'),
    sender: {
      id: 'system',
      name: 'System',
      role: 'system' as const,
    },
  },
  {
    id: 'msg3',
    content: 'Hello John, I\'m Jane from the support team. I\'ll help you resolve this issue. Could you please tell me which browser and device you\'re using to access our platform?',
    timestamp: new Date('2024-09-10T12:10:00'),
    sender: {
      id: 'agent1',
      name: 'Jane Smith',
      avatarUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
      role: 'agent' as const,
    },
  },
  {
    id: 'msg4',
    content: 'I\'m using Chrome on Windows 10. I keep getting "Invalid credentials" even though I\'ve reset my password twice now.',
    timestamp: new Date('2024-09-10T12:15:00'),
    sender: {
      id: 'cust1',
      name: 'John Doe',
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      role: 'customer' as const,
    },
  },
  {
    id: 'msg5',
    content: 'I\'ve checked your account and I can see that there might be an issue with your account sync. Let me fix that for you. Could you please try clearing your browser cookies and then logging in again?',
    timestamp: new Date('2024-09-10T12:20:00'),
    sender: {
      id: 'agent1',
      name: 'Jane Smith',
      avatarUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
      role: 'agent' as const,
    },
  },
  {
    id: 'msg6',
    content: 'I\'ve attached a screenshot of the error I\'m seeing.',
    timestamp: new Date('2024-09-10T12:30:00'),
    sender: {
      id: 'cust1',
      name: 'John Doe',
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      role: 'customer' as const,
    },
    attachments: [
      {
        id: 'att1',
        name: 'error-screenshot.png',
        url: '#',
        type: 'image/png',
        size: 245000,
      }
    ],
  },
]

export default function TicketDetailPage() {
  const params = useParams()
  const ticketId = params.id as string
  
  // In a real app, you would fetch the ticket details based on the ID
  // For this template, we're using mock data
  const ticket = mockTicketDetail
  
  const [messages, setMessages] = useState(mockMessages)
  
  const handleSendMessage = (content: string) => {
    // In a real app, you would send this to an API
    const newMessage = {
      id: `msg${messages.length + 1}`,
      content,
      timestamp: new Date(),
      sender: {
        id: 'agent1',
        name: 'Jane Smith',
        avatarUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
        role: 'agent' as const,
      },
    }
    
    setMessages([...messages, newMessage])
  }
  
  return (
    <div className="py-6 px-4 md:px-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">{ticket.title}</h1>
            <Badge variant={getStatusVariant(ticket.status)}>{getStatusLabel(ticket.status)}</Badge>
          </div>
          <p className="text-gray-500 text-sm mt-1">Ticket #{ticketId}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Resolve
          </Button>
          <Button variant="outline">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Knowledge Base
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Ticket info sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ticket Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Priority</h3>
                <Badge className="mt-1" variant={getPriorityVariant(ticket.priority)}>
                  {getPriorityLabel(ticket.priority)}
                </Badge>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Created</h3>
                <p className="text-sm">{formatDate(ticket.createdAt)}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                <p className="text-sm">{formatDate(ticket.updatedAt)}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Tags</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {ticket.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="text-sm">{ticket.customer.name}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-sm">{ticket.customer.email}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Company</h3>
                <p className="text-sm">{ticket.customer.company}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Plan</h3>
                <Badge className="mt-1" variant="secondary">{ticket.customer.plan}</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Assigned To</h3>
                <p className="text-sm">{ticket.assignedTo ? ticket.assignedTo.name : 'Unassigned'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-sm">{ticket.assignedTo ? ticket.assignedTo.email : '-'}</p>
              </div>
              
              <Button variant="outline" className="w-full mt-2">Reassign</Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Chat interface */}
        <div className="lg:col-span-2 h-[700px]">
          <ChatInterface
            ticketId={ticket.id}
            customerName={ticket.customer.name}
            customerAvatarUrl={ticket.customer.avatarUrl}
            agentName={ticket.assignedTo?.name}
            agentAvatarUrl={ticket.assignedTo?.avatarUrl}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  )
}

function getStatusVariant(status: string) {
  switch (status) {
    case 'open': return 'default'
    case 'in-progress': return 'secondary'
    case 'closed': return 'outline'
    case 'pending': return 'secondary'
    default: return 'default'
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'open': return 'Open'
    case 'in-progress': return 'In Progress'
    case 'closed': return 'Closed'
    case 'pending': return 'Pending'
    default: return status
  }
}

function getPriorityVariant(priority: string) {
  switch (priority) {
    case 'low': return 'outline'
    case 'medium': return 'secondary'
    case 'high': return 'default'
    case 'critical': return 'destructive'
    default: return 'default'
  }
}

function getPriorityLabel(priority: string) {
  switch (priority) {
    case 'low': return 'Low'
    case 'medium': return 'Medium'
    case 'high': return 'High'
    case 'critical': return 'Critical'
    default: return priority
  }
} 