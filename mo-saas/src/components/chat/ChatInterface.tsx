import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'

interface ChatMessage {
  id: string
  content: string
  timestamp: Date
  sender: {
    id: string
    name: string
    avatarUrl?: string
    role: 'agent' | 'customer' | 'system'
  }
  attachments?: Array<{
    id: string
    name: string
    url: string
    type: string
    size: number
  }>
}

interface ChatInterfaceProps {
  ticketId: string
  customerName: string
  customerAvatarUrl?: string
  agentName?: string
  agentAvatarUrl?: string
  messages: ChatMessage[]
  onSendMessage: (content: string) => void
  onAttachFile?: (file: File) => void
}

export function ChatInterface({
  ticketId,
  customerName,
  customerAvatarUrl,
  agentName,
  agentAvatarUrl,
  messages,
  onSendMessage,
  onAttachFile
}: ChatInterfaceProps) {
  const [message, setMessage] = useState('')
  
  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  return (
    <div className="flex flex-col h-full bg-white rounded-lg border">
      {/* Chat header */}
      <div className="px-4 py-3 border-b flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Avatar size="sm">
            {customerAvatarUrl ? (
              <AvatarImage src={customerAvatarUrl} alt={customerName} />
            ) : (
              <AvatarFallback initials={getInitials(customerName)} />
            )}
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{customerName}</h3>
            <p className="text-xs text-gray-500">Ticket #{ticketId.substring(0, 8)}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button className="text-xs py-1 px-2" variant="outline">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            Note
          </Button>
          <Button className="text-xs py-1 px-2" variant="outline">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Schedule
          </Button>
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender.role === 'agent' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3/4 ${msg.sender.role === 'agent' ? 'order-2' : 'order-1'}`}>
              <div className="flex items-end">
                {msg.sender.role !== 'agent' && (
                  <Avatar size="sm" className="mr-2 flex-shrink-0">
                    {msg.sender.avatarUrl ? (
                      <AvatarImage src={msg.sender.avatarUrl} alt={msg.sender.name} />
                    ) : (
                      <AvatarFallback initials={getInitials(msg.sender.name)} />
                    )}
                  </Avatar>
                )}
                <div>
                  <div className={`px-4 py-2 rounded-lg text-sm ${
                    msg.sender.role === 'agent' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : msg.sender.role === 'system'
                      ? 'bg-gray-200 text-gray-800'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}>
                    {msg.content}
                    
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {msg.attachments.map(attachment => (
                          <a 
                            key={attachment.id}
                            href={attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-2 bg-white bg-opacity-10 rounded text-xs hover:bg-opacity-20"
                          >
                            <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                            </svg>
                            <span className="truncate">{attachment.name}</span>
                            <span className="ml-1 text-xs opacity-70">({formatFileSize(attachment.size)})</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {formatDate(msg.timestamp)} {msg.sender.role === 'agent' && `• ${msg.sender.name}`}
                  </div>
                </div>
                {msg.sender.role === 'agent' && (
                  <Avatar size="sm" className="ml-2 flex-shrink-0">
                    {msg.sender.avatarUrl ? (
                      <AvatarImage src={msg.sender.avatarUrl} alt={msg.sender.name} />
                    ) : (
                      <AvatarFallback initials={getInitials(msg.sender.name)} />
                    )}
                  </Avatar>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Input area */}
      <div className="p-3 border-t">
        <div className="flex items-end space-x-2">
          <div className="flex-1 border rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              className="block w-full px-3 py-2 focus:outline-none resize-none text-sm"
              placeholder="Type your message..."
              rows={3}
            />
            <div className="px-3 py-2 bg-gray-50 flex justify-between items-center">
              <div className="flex space-x-2">
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
              <span className="text-xs text-gray-500">
                Press <kbd className="px-1 bg-gray-200 rounded">Enter</kbd> to send
              </span>
            </div>
          </div>
          <Button onClick={handleSendMessage}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
} 