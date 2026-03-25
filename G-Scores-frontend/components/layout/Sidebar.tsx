'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, BarChart3, Trophy, FileText, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const navItems = [
  { href: '/',            label: 'Tổng quan',      icon: LayoutDashboard },
  { href: '/scores',      label: 'Tra cứu điểm',   icon: Search },
  { href: '/report',      label: 'Báo cáo',         icon: FileText },
  { href: '/statistics',  label: 'Thống kê',        icon: BarChart3 },
  { href: '/rankings',    label: 'Bảng xếp hạng',  icon: Trophy },
]

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-14 items-center px-5">
        <span className="font-sans text-lg font-bold tracking-tight">
          <span className="text-primary">G</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-foreground">SCORES</span>
        </span>
      </div>

      <Separator />

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors mb-0.5',
                active
                  ? 'bg-primary/10 text-primary font-medium border-l-2 border-primary pl-[10px]'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      <Separator />

      {/* Footer */}
      <div className="px-5 py-3">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Kỳ thi THPT 2024
        </p>
        <p className="font-data text-xs text-muted-foreground/60">
          1.061.606 thí sinh
        </p>
      </div>
    </aside>
  )
}
