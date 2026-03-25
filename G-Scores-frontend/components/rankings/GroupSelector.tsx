'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GROUP_SUBJECTS, SUBJECT_DISPLAY } from '@/lib/constants'

interface Props {
  groups: string[]
  selected: string
  onSelect: (code: string) => void
  onOpenChange?: (open: boolean) => void
}

export function GroupSelector({ groups, selected, onSelect, onOpenChange }: Props) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
      <Select value={selected} onValueChange={onSelect} onOpenChange={onOpenChange}>
        <SelectTrigger className="w-full font-data sm:w-56">
          <SelectValue placeholder="Chọn khối thi..." />
        </SelectTrigger>
        <SelectContent>
          {groups.map((code) => {
            const subjects = GROUP_SUBJECTS[code] ?? []
            const label = subjects.map((s) => SUBJECT_DISPLAY[s] ?? s).join(' – ')
            return (
              <SelectItem key={code} value={code} className="font-data">
                <span className="font-semibold">{code}</span>
                <span className="text-muted-foreground text-xs ml-2">{label}</span>
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
      {selected && (
        <p className="text-xs text-muted-foreground">
          {(GROUP_SUBJECTS[selected] ?? []).map((s) => SUBJECT_DISPLAY[s] ?? s).join(' + ')}
        </p>
      )}
    </div>
  )
}
