import { Badge } from '@/components/ui/badge'
import { formatScore, formatNumber } from '@/lib/utils'
import { SUBJECT_DISPLAY } from '@/lib/constants'
import type { Top10StudentResponse } from '@/types/api'
import { cn } from '@/lib/utils'

interface Props {
  data: Top10StudentResponse[]
  subjects: string[]
}

const RANK_STYLES: Record<number, string> = {
  1: 'text-primary font-bold',
  2: 'text-slate-300 font-semibold',
  3: 'text-amber-600 font-semibold',
}

export function RankingTable({ data, subjects }: Props) {
  if (data.length === 0) {
    return <p className="text-muted-foreground text-sm py-8 text-center">Không có dữ liệu.</p>
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/50">
            <th className="px-4 py-3 text-left text-xs text-muted-foreground uppercase tracking-wider w-12">#</th>
            <th className="px-4 py-3 text-left text-xs text-muted-foreground uppercase tracking-wider">SBD</th>
            {subjects.map((s) => (
              <th key={s} className="px-4 py-3 text-right text-xs text-muted-foreground uppercase tracking-wider">
                {SUBJECT_DISPLAY[s] ?? s}
              </th>
            ))}
            <th className="px-4 py-3 text-right text-xs text-muted-foreground uppercase tracking-wider">Tổng</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.sbd}
              className={cn(
                'border-b border-border transition-colors hover:bg-secondary/40',
                row.rank === 1 && 'border-l-2 border-l-primary'
              )}
            >
              <td className={cn('px-4 py-3 font-data', RANK_STYLES[row.rank] ?? 'text-muted-foreground')}>
                {row.rank}
              </td>
              <td className="px-4 py-3 font-data text-foreground">{row.sbd}</td>
              {subjects.map((s) => (
                <td key={s} className="px-4 py-3 font-data text-right text-foreground">
                  {formatScore(row.scores[s] ?? null)}
                </td>
              ))}
              <td className="px-4 py-3 font-data text-right font-semibold text-primary">
                {formatNumber(row.groupTotal)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
