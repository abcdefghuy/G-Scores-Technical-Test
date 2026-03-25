export const SUBJECT_DISPLAY: Record<string, string> = {
  toan: 'Toán',
  ngu_van: 'Ngữ Văn',
  ngoai_ngu: 'Ngoại Ngữ',
  vat_li: 'Vật Lý',
  hoa_hoc: 'Hóa Học',
  sinh_hoc: 'Sinh Học',
  lich_su: 'Lịch Sử',
  dia_li: 'Địa Lý',
  gdcd: 'GDCD',
  // enum name variants from backend
  TOAN: 'Toán',
  NGU_VAN: 'Ngữ Văn',
  NGOAI_NGU: 'Ngoại Ngữ',
  VAT_LI: 'Vật Lý',
  HOA_HOC: 'Hóa Học',
  SINH_HOC: 'Sinh Học',
  LICH_SU: 'Lịch Sử',
  DIA_LI: 'Địa Lý',
  GDCD: 'GDCD',
}

export const ALL_SUBJECTS = [
  'toan', 'ngu_van', 'ngoai_ngu', 'vat_li',
  'hoa_hoc', 'sinh_hoc', 'lich_su', 'dia_li', 'gdcd',
] as const

export const GROUP_SUBJECTS: Record<string, string[]> = {
  A00: ['toan', 'vat_li', 'hoa_hoc'],
  A01: ['toan', 'vat_li', 'ngoai_ngu'],
  A02: ['toan', 'vat_li', 'sinh_hoc'],
  B00: ['toan', 'hoa_hoc', 'sinh_hoc'],
  B03: ['toan', 'sinh_hoc', 'ngu_van'],
  C00: ['ngu_van', 'lich_su', 'dia_li'],
  C01: ['ngu_van', 'toan', 'vat_li'],
  C03: ['ngu_van', 'toan', 'lich_su'],
  D01: ['toan', 'ngu_van', 'ngoai_ngu'],
  D07: ['toan', 'hoa_hoc', 'ngoai_ngu'],
  D14: ['ngu_van', 'lich_su', 'ngoai_ngu'],
}

export const SCORE_LEVEL_COLORS = {
  excellent: '#6366f1',
  good: '#10b981',
  average: '#f59e0b',
  weak: '#ef4444',
} as const

export const SCORE_LEVEL_LABELS = {
  excellent: '≥ 8 điểm',
  good: '6 – 8 điểm',
  average: '4 – 6 điểm',
  weak: '< 4 điểm',
} as const
