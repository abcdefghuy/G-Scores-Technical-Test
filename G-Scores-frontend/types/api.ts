export interface ScoreResponse {
  sbd: string
  toan: number | null
  nguVan: number | null
  ngoaiNgu: number | null
  vatLi: number | null
  hoaHoc: number | null
  sinhHoc: number | null
  lichSu: number | null
  diaLi: number | null
  gdcd: number | null
  maNgoaiNgu: string | null
}

export interface ScoreBandCounts {
  gte8: number
  gte6lt8: number
  gte4lt6: number
  lt4: number
}

export interface ScoreBandReportResponse {
  subject: string
  counts: ScoreBandCounts
  totalWithScore: number
}

export interface SubjectStatisticsResponse {
  subject: string
  displayName: string
  excellent: number
  good: number
  average: number
  weak: number
  total: number
}

export interface Top10StudentResponse {
  rank: number
  sbd: string
  scores: Record<string, number>
  groupTotal: number
}
