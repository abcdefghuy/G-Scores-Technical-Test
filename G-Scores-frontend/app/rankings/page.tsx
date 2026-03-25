import { api } from '@/lib/api'
import { RankingsClient } from './RankingsClient'

export default async function RankingsPage() {
  const groups = await api.getGroupCodes().catch(() => [
    'A00','A01','A02','B00','B03','C00','C01','C03','D01','D07','D14',
  ])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Top 10 khối thi</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Xếp hạng thí sinh theo tổng điểm 3 môn của từng khối
        </p>
      </div>

      <RankingsClient groups={groups} />
    </div>
  )
}
