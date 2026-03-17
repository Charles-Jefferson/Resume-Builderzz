import type { HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline'
}

const variants = {
  default: 'bg-[#A41034] text-white',
  secondary: 'bg-gray-100 text-gray-700',
  outline: 'border border-gray-300 text-gray-700 bg-white',
}

export function Badge({ variant = 'secondary', className = '', children, ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
