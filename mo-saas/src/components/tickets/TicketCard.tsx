import { Badge } from '@/components/ui/Badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'

export type TicketStatus = 'open' | 'in-progress' | 'closed' | 'pending'
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical'

export interface TicketProps {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  createdAt: Date
  assignedTo?: {
    id: string
    name: string
    avatarUrl?: string
  }
  customer: {
    id: string
    name: string
    email: string
    avatarUrl?: string
  }
}

export function TicketCard({
  id,
  title,
  description,
  status,
  priority,
  createdAt,
  assignedTo,
  customer,
}: TicketProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{title}</CardTitle>
          <TicketStatusBadge status={status} />
        </div>
        <div className="flex gap-2 mt-1">
          <TicketPriorityBadge priority={priority} />
          <Badge variant="outline">#{id.substring(0, 8)}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
          <span>Created: {formatDate(createdAt)}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            {customer.avatarUrl ? (
              <AvatarImage src={customer.avatarUrl} alt={customer.name} />
            ) : (
              <AvatarFallback initials={getInitials(customer.name)} />
            )}
          </Avatar>
          <div className="text-xs">
            <p className="font-medium">{customer.name}</p>
            <p className="text-gray-500">{customer.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {assignedTo ? (
            <div className="flex items-center gap-1">
              <Avatar size="sm">
                {assignedTo.avatarUrl ? (
                  <AvatarImage src={assignedTo.avatarUrl} alt={assignedTo.name} />
                ) : (
                  <AvatarFallback initials={getInitials(assignedTo.name)} />
                )}
              </Avatar>
            </div>
          ) : (
            <Button className="text-xs py-1 px-2" variant="outline">Assign</Button>
          )}
          <Button className="text-xs py-1 px-2">View</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

function TicketStatusBadge({ status }: { status: TicketStatus }) {
  const variants = {
    'open': { variant: 'default' as const, label: 'Open' },
    'in-progress': { variant: 'secondary' as const, label: 'In Progress' },
    'closed': { variant: 'outline' as const, label: 'Closed' },
    'pending': { variant: 'secondary' as const, label: 'Pending' },
  }
  
  const { variant, label } = variants[status]
  
  return <Badge variant={variant}>{label}</Badge>
}

function TicketPriorityBadge({ priority }: { priority: TicketPriority }) {
  const variants = {
    'low': { variant: 'outline' as const, label: 'Low' },
    'medium': { variant: 'secondary' as const, label: 'Medium' },
    'high': { variant: 'default' as const, label: 'High' },
    'critical': { variant: 'destructive' as const, label: 'Critical' },
  }
  
  const { variant, label } = variants[priority]
  
  return <Badge variant={variant}>{label}</Badge>
} 