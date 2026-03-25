import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getScoreLevel, formatScore } from '@/lib/utils'
import { SUBJECT_DISPLAY, SCORE_LEVEL_LABELS, GROUP_SUBJECTS } from '@/lib/constants'
import type { ScoreResponse } from '@/types/api'

const SCORE_FIELDS: { key: keyof ScoreResponse; label: string }[] = [
  { key: 'toan',     label: SUBJECT_DISPLAY['toan'] },
  { key: 'nguVan',   label: SUBJECT_DISPLAY['ngu_van'] },
  { key: 'ngoaiNgu', label: SUBJECT_DISPLAY['ngoai_ngu'] },
  { key: 'vatLi',    label: SUBJECT_DISPLAY['vat_li'] },
  { key: 'hoaHoc',   label: SUBJECT_DISPLAY['hoa_hoc'] },
  { key: 'sinhHoc',  label: SUBJECT_DISPLAY['sinh_hoc'] },
  { key: 'lichSu',   label: SUBJECT_DISPLAY['lich_su'] },
  { key: 'diaLi',    label: SUBJECT_DISPLAY['dia_li'] },
  { key: 'gdcd',     label: SUBJECT_DISPLAY['gdcd'] },
]

const SCORE_FIELD_KEY_MAP: Record<string, keyof ScoreResponse> = {
  toan: 'toan', ngu_van: 'nguVan', ngoai_ngu: 'ngoaiNgu',
  vat_li: 'vatLi', hoa_hoc: 'hoaHoc', sinh_hoc: 'sinhHoc',
  lich_su: 'lichSu', dia_li: 'diaLi', gdcd: 'gdcd',
}

function GroupTotal({ label, groupKey, data }: { label: string; groupKey: string; data: ScoreResponse }) {
  const subjects = GROUP_SUBJECTS[groupKey] ?? []
  const scores = subjects.map((s) => data[SCORE_FIELD_KEY_MAP[s]] as number | null)
  if (scores.some((s) => s === null)) return null
  const total = scores.reduce<number>((a, b) => a + (b ?? 0), 0)
  return (
    <div className="flex items-center justify-between px-3 py-1.5 rounded-md bg-secondary border border-border">
      <span className="text-xs text-muted-foreground">Khối {label}</span>
      <span className="font-data text-sm font-medium text-primary">{total.toFixed(2)}</span>
    </div>
  )
}

export function ScoreGrid({ data }: { data: ScoreResponse }) {
  return (
    <Card className="mt-6 w-full sm:max-w-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Kết quả thi</CardTitle>
          <span className="font-data text-sm text-muted-foreground">SBD: {data.sbd}</span>
        </div>
        {data.maNgoaiNgu && (
          <p className="text-xs text-muted-foreground">Mã ngoại ngữ: {data.maNgoaiNgu}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Score grid */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {SCORE_FIELDS.map(({ key, label }) => {
            const score = data[key] as number | null
            const level = getScoreLevel(score)
            return (
              <div
                key={key}
                className="flex flex-col gap-1 rounded-md border border-border bg-secondary/50 p-3"
              >
                <span className="text-xs text-muted-foreground">{label}</span>
                <div className="flex items-center justify-between">
                  <span className="font-data text-lg font-medium">{formatScore(score)}</span>
                  {level !== 'none' && (
                    <Badge variant={level} className="text-[10px] px-1.5 py-0">{SCORE_LEVEL_LABELS[level]}</Badge>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Group totals */}
        <div>
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Tổng điểm khối</p>
          <div className="grid grid-cols-2 gap-1.5">
            {Object.keys(GROUP_SUBJECTS).map((code) => (
              <GroupTotal key={code} label={code} groupKey={code} data={data} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
