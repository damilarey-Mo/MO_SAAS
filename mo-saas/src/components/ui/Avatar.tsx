import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
}

export interface AvatarImageProps {
  src: string
  alt: string
  className?: string
}

export interface AvatarFallbackProps extends HTMLAttributes<HTMLDivElement> {
  initials?: string
}

export function Avatar({ 
  size = 'md',
  className, 
  ...props 
}: AvatarProps) {
  const sizeClass = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  }

  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        sizeClass[size],
        className
      )}
      {...props}
    />
  )
}

export function AvatarImage({ src, alt, className }: AvatarImageProps) {
  return (
    <div className={cn('aspect-square h-full w-full', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  )
}

export function AvatarFallback({ 
  initials, 
  className, 
  ...props 
}: AvatarFallbackProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-gray-100 font-medium text-gray-600',
        className
      )}
      {...props}
    >
      {initials}
    </div>
  )
} 