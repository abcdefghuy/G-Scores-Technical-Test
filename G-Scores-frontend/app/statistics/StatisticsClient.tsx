'use client'
import { useState } from 'react'
import { SubjectLevelChart } from '@/components/statistics/SubjectLevelChart'
import type { SubjectStatisticsResponse } from '@/types/api'
import { Button } from '@/components/ui/button'

interface Props { data: SubjectStatisticsResponse[] }

export function StatisticsClient({ data }: Props) {
  const [mode, setMode] = useState<'grouped' | 'stacked'>('grouped')

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant={mode === 'grouped' ? 'default' : 'outline'}
          onClick={() => setMode('grouped')}
        >
          Grouped
        </Button>
        <Button
          size="sm"
          variant={mode === 'stacked' ? 'default' : 'outline'}
          onClick={() => setMode('stacked')}
        >
          Stacked
        </Button>
      </div>
      <div className="rounded-lg border border-border bg-card p-4">
        <SubjectLevelChart data={data} mode={mode} />
      </div>
    </div>
  )
}
