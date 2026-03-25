import { api } from '@/lib/api'
import { StatisticsClient } from './StatisticsClient'
import { formatNumber } from '@/lib/utils'

export default async function StatisticsPage() {
  const data = await api.getSubjectStatistics().catch(() => [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Thống kê theo môn</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Phân bổ 4 mức điểm của từng môn thi — hiển thị dưới dạng biểu đồ cột
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        {[
          { label: '≥ 8 (Giỏi)',        color: '#6366f1' },
          { label: '6–8 (Khá)',          color: '#10b981' },
          { label: '4–6 (Trung bình)',   color: '#f59e0b' },
          { label: '< 4 (Yếu)',          color: '#ef4444' },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
            {label}
          </div>
        ))}
      </div>

      {data.length === 0 ? (
        <p className="text-muted-foreground text-sm">Không thể tải dữ liệu thống kê.</p>
      ) : (
        <StatisticsClient data={data} />
      )}

      {/* Data table */}
      {data.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left text-xs text-muted-foreground uppercase tracking-wider">Môn</th>
                <th className="px-4 py-3 text-right text-xs text-indigo-400 uppercase tracking-wider">≥ 8</th>
                <th className="px-4 py-3 text-right text-xs text-emerald-400 uppercase tracking-wider">6–8</th>
                <th className="px-4 py-3 text-right text-xs text-amber-400 uppercase tracking-wider">4–6</th>
                <th className="px-4 py-3 text-right text-xs text-red-400 uppercase tracking-wider">&lt; 4</th>
                <th className="px-4 py-3 text-right text-xs text-muted-foreground uppercase tracking-wider">Tổng</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.subject} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{row.displayName}</td>
                  <td className="px-4 py-3 font-data text-right text-indigo-400">{formatNumber(row.excellent)}</td>
                  <td className="px-4 py-3 font-data text-right text-emerald-400">{formatNumber(row.good)}</td>
                  <td className="px-4 py-3 font-data text-right text-amber-400">{formatNumber(row.average)}</td>
                  <td className="px-4 py-3 font-data text-right text-red-400">{formatNumber(row.weak)}</td>
                  <td className="px-4 py-3 font-data text-right text-muted-foreground">{formatNumber(row.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
