import { api } from '@/lib/api'
import { SubjectBandCard } from '@/components/report/SubjectBandCard'
import { formatNumber } from '@/lib/utils'

export default async function ReportPage() {
  const reports = await api.getAllSubjectReports().catch(() => [])

  const totalParticipants = reports.reduce((sum, r) => sum + r.totalWithScore, 0)
  const totalExcellent = reports.reduce((sum, r) => sum + r.counts.gte8, 0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Báo cáo phân bổ điểm</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Phân tích 4 mức điểm theo từng môn thi
        </p>
      </div>

      {/* Summary strip */}
      <div className="flex flex-wrap gap-6 rounded-lg border border-border bg-card p-5">
        <Stat label="Tổng lượt thi (9 môn)" value={formatNumber(totalParticipants)} />
        <Stat label="Tổng điểm Giỏi (≥ 8)" value={formatNumber(totalExcellent)} />
        <Stat
          label="Tỉ lệ Giỏi trung bình"
          value={
            totalParticipants > 0
              ? `${((totalExcellent / totalParticipants) * 100).toFixed(1)}%`
              : '—'
          }
        />
        <Stat label="Số môn được thống kê" value={`${reports.length} / 9`} />
      </div>

      {reports.length === 0 ? (
        <p className="text-muted-foreground text-sm">Không thể tải dữ liệu báo cáo.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((r, i) => (
            <SubjectBandCard key={i} data={r} />
          ))}
        </div>
      )}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-data text-lg font-semibold">{value}</p>
    </div>
  )
}
