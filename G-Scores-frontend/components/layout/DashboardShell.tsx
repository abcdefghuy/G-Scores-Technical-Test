'use client'
import React, { useState } from 'react'
import { Menu } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { cn } from '@/lib/utils'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar — drawer on mobile, always visible on lg+ */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 transition-transform duration-200 ease-in-out',
          'lg:relative lg:translate-x-0 lg:transition-none',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <Sidebar onClose={() => setOpen(false)} />
      </div>

      {/* Main area */}
      <main className="flex flex-1 min-w-0 flex-col overflow-y-auto">
        {/* Mobile top bar */}
        <div className="flex shrink-0 items-center gap-3 border-b border-border bg-card px-4 h-14 lg:hidden">
          <button
            onClick={() => setOpen(true)}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Mở menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-sans text-base font-bold tracking-tight">
            <span className="text-primary">G</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-foreground">SCORES</span>
          </span>
        </div>

        {/* Page content */}
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
