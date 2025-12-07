import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const variants = {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-slate-800/80 text-secondary-foreground hover:bg-slate-800/60",
        destructive: "border-transparent bg-red-900/40 text-red-300 border-red-500/30",
        outline: "text-foreground",
        success: "border-transparent bg-emerald-900/40 text-emerald-300 border border-emerald-500/30",
        warning: "border-transparent bg-yellow-900/40 text-yellow-300 border border-yellow-500/30",
    }

    return (
        <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", variants[variant], className)} {...props} />
    )
}

export { Badge }
