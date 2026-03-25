import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getScoreLevel(score: number | null): 'excellent' | 'good' | 'average' | 'weak' | 'none' {
  if (score === null || score === undefined) return 'none'
  if (score >= 8) return 'excellent'
  if (score >= 6) return 'good'
  if (score >= 4) return 'average'
  return 'weak'
}

export function formatScore(score: number | null): string {
  if (score === null || score === undefined) return '—'
  return score.toFixed(2)
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('vi-VN').format(n)
}
