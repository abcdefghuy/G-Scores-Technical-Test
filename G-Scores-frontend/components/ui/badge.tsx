import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium font-data transition-colors',
  {
    variants: {
      variant: {
        default: 'border-primary/30 bg-primary/10 text-primary',
        outline: 'border-border text-muted-foreground',
        excellent: 'border-indigo-800 bg-indigo-500/10 text-indigo-400',
        good: 'border-emerald-800 bg-emerald-500/10 text-emerald-400',
        average: 'border-amber-800 bg-amber-500/10 text-amber-400',
        weak: 'border-red-800 bg-red-500/10 text-red-400',
        none: 'border-border bg-secondary text-muted-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
