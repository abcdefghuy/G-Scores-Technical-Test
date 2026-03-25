import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatNumber } from '@/lib/utils'
import { SUBJECT_DISPLAY, SCORE_LEVEL_COLORS } from '@/lib/constants'
import type { ScoreBandReportResponse } from '@/types/api'

interface BandRowProps {
  label: string
  count: number
  total: number
  color: string
}

function BandRow({ label, count, total, color }: BandRowProps) {
  const pct = total > 0 ? (count / total) * 100 : 0
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <div className="flex items-center gap-3">
          <span className="font-data text-xs text-muted-foreground">{pct.toFixed(1)}%</span>
          <span className="font-data font-medium w-20 text-right">{formatNumber(count)}</span>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}

export function SubjectBandCard({ data }: { data: ScoreBandReportResponse }) {
  const subjectKey = typeof data.subject === 'string' ? data.subject : (data.subject as { columnName?: string })?.columnName ?? ''
  const displayName = SUBJECT_DISPLAY[subjectKey] ?? subjectKey
  const { gte8, gte6lt8, gte4lt6, lt4 } = data.counts
  const total = data.totalWithScore

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">{displayName}</CardTitle>
        <p className="text-xs text-muted-foreground font-data">{formatNumber(total)} thí sinh có điểm</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <BandRow label="≥ 8 (Giỏi)"    count={gte8}    total={total} color={SCORE_LEVEL_COLORS.excellent} />
        <BandRow label="6–8 (Khá)"      count={gte6lt8} total={total} color={SCORE_LEVEL_COLORS.good} />
        <BandRow label="4–6 (Trung bình)" count={gte4lt6} total={total} color={SCORE_LEVEL_COLORS.average} />
        <BandRow label="< 4 (Yếu)"      count={lt4}     total={total} color={SCORE_LEVEL_COLORS.weak} />
      </CardContent>
    </Card>
  )
}
