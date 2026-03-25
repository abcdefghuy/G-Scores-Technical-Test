import React from 'react'
import { api } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatNumber } from '@/lib/utils'
import { SUBJECT_DISPLAY, SCORE_LEVEL_LABELS, SCORE_LEVEL_COLORS } from '@/lib/constants'
import { Users, BarChart3, Trophy, Search } from 'lucide-react'

export default async function OverviewPage() {
  const stats = await api.getSubjectStatistics().catch(() => [])

  const totals = stats.reduce(
    (acc, s) => ({
      excellent: acc.excellent + s.excellent,
      good: acc.good + s.good,
      average: acc.average + s.average,
      weak: acc.weak + s.weak,
      total: acc.total + s.total,
    }),
    { excellent: 0, good: 0, average: 0, weak: 0, total: 0 }
  )

  const topSubjectByExcellent = stats.length
    ? [...stats].sort((a, b) => b.excellent - a.excellent)[0]
    : null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tổng quan</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Kỳ thi THPT Quốc gia 2024 — toàn quốc
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard
          icon={Users}
          label="Tổng thí sinh"
          value={stats.length > 0 ? formatNumber(stats[0]?.total ?? 0) : '—'}
          sub="môn Toán"
        />
        <KpiCard
          icon={BarChart3}
          label="Đạt giỏi (≥ 8)"
          value={stats.length > 0 ? formatNumber(totals.excellent) : '—'}
          sub="tổng hợp tất cả môn"
        />
        <KpiCard
          icon={Search}
          label="Môn thi"
          value="9"
          sub="môn thi chính"
        />
        <KpiCard
          icon={Trophy}
          label="Khối thi"
          value="11"
          sub="A00, A01, B00, C00..."
        />
      </div>

      {/* Per-subject summary */}
      {stats.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Phân bổ mức điểm theo môn
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((s) => {
              const pct = s.total > 0 ? (s.excellent / s.total) * 100 : 0
              return (
                <div key={s.subject} className="rounded-lg border border-border bg-card p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{s.displayName}</span>
                    <span className="font-data text-xs text-muted-foreground">{formatNumber(s.total)} ts</span>
                  </div>
                  <div className="flex gap-1 h-2 rounded-full overflow-hidden">
                    {(
                      [
                        ['excellent', s.excellent],
                        ['good', s.good],
                        ['average', s.average],
                        ['weak', s.weak],
                      ] as [keyof typeof SCORE_LEVEL_COLORS, number][]
                    ).map(([level, count]) => {
                      const w = s.total > 0 ? (count / s.total) * 100 : 0
                      return (
                        <div
                          key={level}
                          className="h-full"
                          title={`${SCORE_LEVEL_LABELS[level]}: ${formatNumber(count)}`}
                          style={{ width: `${w}%`, background: SCORE_LEVEL_COLORS[level] }}
                        />
                      )
                    })}
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Giỏi</span>
                    <span className="font-data text-indigo-400">{pct.toFixed(1)}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {topSubjectByExcellent && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-primary">Môn có nhiều điểm Giỏi nhất</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{SUBJECT_DISPLAY[topSubjectByExcellent.subject] ?? topSubjectByExcellent.displayName}</p>
            <p className="font-data text-muted-foreground text-sm">{formatNumber(topSubjectByExcellent.excellent)} thí sinh đạt ≥ 8 điểm</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function KpiCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ElementType
  label: string
  value: string
  sub: string
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="font-data text-2xl font-semibold">{value}</p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </div>
          <div className="rounded-md bg-primary/10 p-2">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
