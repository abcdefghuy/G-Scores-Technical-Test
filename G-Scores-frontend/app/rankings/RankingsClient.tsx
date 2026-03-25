'use client'
import { useState, useTransition, useEffect } from 'react'
import { GroupSelector } from '@/components/rankings/GroupSelector'
import { RankingTable } from '@/components/rankings/RankingTable'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/lib/api'
import { GROUP_SUBJECTS } from '@/lib/constants'
import type { Top10StudentResponse } from '@/types/api'

interface Props { groups: string[] }

export function RankingsClient({ groups }: Props) {
  const [selected, setSelected] = useState(groups[0] ?? 'A00')
  const [data, setData] = useState<Top10StudentResponse[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  function handleSelect(code: string) {
    setSelected(code)
    startTransition(async () => {
      try {
        const rows = await api.getTop10(code)
        setData(rows)
        setError(null)
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Lỗi tải dữ liệu')
        setData(null)
      }
    })
  }

  // Auto-load on mount
  useEffect(() => {
    if (selected) handleSelect(selected)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-6">
      <GroupSelector groups={groups} selected={selected} onSelect={handleSelect} onOpenChange={setIsDropdownOpen} />

      {/* Initial skeleton — only when no data has been loaded yet */}
      {isPending && !data && (
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-11 w-full" />
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-400 border border-red-800 bg-red-900/20 rounded-md px-4 py-3">{error}</p>
      )}

      {/* Hide table while dropdown is open to avoid stacking-context conflicts */}
      {data && !isDropdownOpen && (
        <div
          style={{ opacity: isPending ? 0.5 : 1 }}
          className={isPending ? 'pointer-events-none' : undefined}
        >
          <RankingTable data={data} subjects={GROUP_SUBJECTS[selected] ?? []} />
        </div>
      )}
    </div>
  )
}
