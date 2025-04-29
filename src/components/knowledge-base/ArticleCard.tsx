import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatDate, truncateText } from '@/lib/utils'
import Link from 'next/link'

export interface ArticleProps {
  id: string
  title: string
  summary: string
  content: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  author: {
    id: string
    name: string
    avatarUrl?: string
  }
  views: number
  helpfulCount: number
}

export function ArticleCard({ 
  id, 
  title, 
  summary, 
  tags = [], 
  createdAt, 
  updatedAt, 
  views, 
  helpfulCount 
}: ArticleProps) {
  return (
    <Link href={`/dashboard/knowledge-base/${id}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {truncateText(summary, 150)}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-between text-xs text-gray-500">
            <div>
              Updated: {formatDate(updatedAt || createdAt)}
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {views}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                {helpfulCount}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
} 