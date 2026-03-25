import type {
  ScoreResponse,
  ScoreBandReportResponse,
  SubjectStatisticsResponse,
  Top10StudentResponse,
} from '@/types/api'
import { ALL_SUBJECTS } from '@/lib/constants'

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { cache: 'no-store' })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(error?.error ?? `Request failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}

export const api = {
  getScore: (sbd: string) =>
    apiFetch<ScoreResponse>(`/api/scores/${encodeURIComponent(sbd)}`),

  getSubjectReport: (subject: string) =>
    apiFetch<ScoreBandReportResponse>(`/api/reports/levels/${subject}`),

  getAllSubjectReports: () =>
    Promise.all(ALL_SUBJECTS.map((s) => api.getSubjectReport(s))),

  getSubjectStatistics: () =>
    apiFetch<SubjectStatisticsResponse[]>(`/api/statistics/subjects`),

  getGroupCodes: () =>
    apiFetch<string[]>(`/api/statistics/top10/groups`),

  getTop10: (groupCode: string) =>
    apiFetch<Top10StudentResponse[]>(`/api/statistics/top10/${groupCode}`),
}
