'use client'

import { TicketPriority, TicketStatus } from './TicketCard'
import { useState } from 'react'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'

interface TicketFiltersProps {
  onFilterChange: (filters: {
    status?: TicketStatus | 'all'
    priority?: TicketPriority | 'all'
    search?: string
  }) => void
}

export function TicketFilters({ onFilterChange }: TicketFiltersProps) {
  const [status, setStatus] = useState<TicketStatus | 'all'>('all')
  const [priority, setPriority] = useState<TicketPriority | 'all'>('all')
  const [search, setSearch] = useState('')
  
  const handleStatusChange = (newStatus: TicketStatus | 'all') => {
    setStatus(newStatus)
    onFilterChange({ status: newStatus, priority, search })
  }
  
  const handlePriorityChange = (newPriority: TicketPriority | 'all') => {
    setPriority(newPriority)
    onFilterChange({ status, priority: newPriority, search })
  }
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    onFilterChange({ status, priority, search: e.target.value })
  }
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input
          type="search"
          className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search tickets..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Status</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={status === 'all' ? 'default' : 'outline'}
            className="text-xs"
            onClick={() => handleStatusChange('all')}
          >
            All
          </Button>
          <Button
            variant={status === 'open' ? 'default' : 'outline'}
            className="text-xs"
            onClick={() => handleStatusChange('open')}
          >
            Open
          </Button>
          <Button
            variant={status === 'in-progress' ? 'default' : 'outline'}
            className="text-xs"
            onClick={() => handleStatusChange('in-progress')}
          >
            In Progress
          </Button>
          <Button
            variant={status === 'pending' ? 'default' : 'outline'}
            className="text-xs"
            onClick={() => handleStatusChange('pending')}
          >
            Pending
          </Button>
          <Button
            variant={status === 'closed' ? 'default' : 'outline'}
            className="text-xs"
            onClick={() => handleStatusChange('closed')}
          >
            Closed
          </Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Priority</h3>
        <div className="flex flex-wrap gap-2">
          <Badge
            className={`cursor-pointer ${priority === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
            onClick={() => handlePriorityChange('all')}
          >
            All
          </Badge>
          <Badge
            variant="outline"
            className={`cursor-pointer ${priority === 'low' ? 'bg-blue-100 text-blue-800' : ''}`}
            onClick={() => handlePriorityChange('low')}
          >
            Low
          </Badge>
          <Badge
            variant="secondary"
            className={`cursor-pointer ${priority === 'medium' ? 'bg-blue-100 text-blue-800' : ''}`}
            onClick={() => handlePriorityChange('medium')}
          >
            Medium
          </Badge>
          <Badge
            variant="default"
            className={`cursor-pointer ${priority === 'high' ? 'bg-blue-100 text-blue-800' : ''}`}
            onClick={() => handlePriorityChange('high')}
          >
            High
          </Badge>
          <Badge
            variant="destructive"
            className={`cursor-pointer ${priority === 'critical' ? 'bg-blue-100 text-blue-800' : ''}`}
            onClick={() => handlePriorityChange('critical')}
          >
            Critical
          </Badge>
        </div>
      </div>
    </div>
  )
} 