import { type ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary'
type Size = 'sm' | 'md' | 'lg' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variantClasses: Record<Variant, string> = {
  default: 'bg-[#A41034] text-white hover:bg-[#8a0d2b] border border-[#A41034]',
  outline: 'bg-white text-[#A41034] border border-[#A41034] hover:bg-[#A41034] hover:text-white',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 border border-transparent',
  destructive: 'bg-red-600 text-white hover:bg-red-700 border border-red-600',
  secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-base',
  icon: 'p-2',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'md', loading = false, disabled, children, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#A41034] focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
