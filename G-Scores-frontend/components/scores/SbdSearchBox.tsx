'use client'
import { useState, useTransition } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import type { ScoreResponse } from '@/types/api'

interface Props {
  onResult: (data: ScoreResponse) => void
  onError: (msg: string) => void
}

export function SbdSearchBox({ onResult, onError }: Props) {
  const [sbd, setSbd] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleSearch() {
    const trimmed = sbd.trim()
    if (!trimmed) return
    startTransition(async () => {
      try {
        const data = await api.getScore(trimmed)
        onResult(data)
      } catch (e: unknown) {
        onError(e instanceof Error ? e.message : 'Không tìm thấy số báo danh')
      }
    })
  }

  return (
    <div className="flex gap-2 w-full max-w-md">
      <Input
        className="font-data text-base h-11"
        placeholder="Nhập số báo danh..."
        value={sbd}
        onChange={(e) => setSbd(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        maxLength={20}
      />
      <Button className="h-11 px-5 gap-2" onClick={handleSearch} disabled={isPending || !sbd.trim()}>
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        Tìm
      </Button>
    </div>
  )
}
