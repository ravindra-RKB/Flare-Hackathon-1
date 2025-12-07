import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Integrating cva might require installing it, but user request didn't explicitly say install cva.
// I will stick to standard tailwind classes without cva if not installed, 
// OR I will auto-install class-variance-authority and @radix-ui/react-slot if needed. 
// Actually, for speed and minimal deps, I'll write a manual implementation or just install them.
// The user prompt mentioned "Keep using TailwindCSS... and React Query". 
// I'll stick to a simpler implementation without extra deps to avoid clutter unless necessary.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
        const Component = "button"

        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

        const variants = {
            default: "bg-gradient-to-r from-pink-500 to-violet-600 text-white hover:opacity-90",
            destructive: "bg-red-500 text-destructive-foreground hover:bg-red-500/90",
            outline: "border border-slate-700 bg-transparent hover:bg-slate-800 text-slate-100",
            secondary: "bg-slate-800 text-secondary-foreground hover:bg-slate-700 text-white",
            ghost: "hover:bg-slate-800 hover:text-white text-slate-300",
            link: "text-primary underline-offset-4 hover:underline",
        }

        const sizes = {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
        }

        return (
            <button
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
