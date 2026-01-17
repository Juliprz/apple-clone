import * as React from "react"
import { cn } from "../../lib/utils"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

const base =
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none"

const variants = {
  default: "bg-black text-white hover:bg-black/90",
  outline: "border border-gray-300 bg-white hover:bg-gray-50",
  ghost: "hover:bg-gray-100",
} as const

const sizes = {
  sm: "h-9 px-3",
  md: "h-10 px-4",
  lg: "h-11 px-6",
} as const

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"