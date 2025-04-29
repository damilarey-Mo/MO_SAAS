import { TicketCard, TicketProps } from './TicketCard'

interface TicketListProps {
  tickets: TicketProps[]
  loading?: boolean
  emptyMessage?: string
}

export function TicketList({ 
  tickets, 
  loading = false, 
  emptyMessage = "No tickets found" 
}: TicketListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-gray-200 bg-white shadow-sm animate-pulse p-6">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 mb-4 text-gray-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={1.5}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
        <p className="text-center">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          {...ticket}
        />
      ))}
    </div>
  )
} 