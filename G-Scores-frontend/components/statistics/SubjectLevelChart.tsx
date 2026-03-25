'use client'
import dynamic from 'next/dynamic'
import type { SubjectStatisticsResponse } from '@/types/api'
import { SCORE_LEVEL_COLORS } from '@/lib/constants'

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Props {
  data: SubjectStatisticsResponse[]
  mode: 'grouped' | 'stacked'
}

export function SubjectLevelChart({ data, mode }: Props) {
  const categories = data.map((d) => d.displayName)

  const series = [
    { name: '≥ 8 (Giỏi)',        data: data.map((d) => d.excellent), color: SCORE_LEVEL_COLORS.excellent },
    { name: '6–8 (Khá)',          data: data.map((d) => d.good),      color: SCORE_LEVEL_COLORS.good },
    { name: '4–6 (Trung bình)',   data: data.map((d) => d.average),   color: SCORE_LEVEL_COLORS.average },
    { name: '< 4 (Yếu)',          data: data.map((d) => d.weak),      color: SCORE_LEVEL_COLORS.weak },
  ]

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      stacked: mode === 'stacked',
      background: 'transparent',
      toolbar: { show: false },
      fontFamily: 'IBM Plex Mono, monospace',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 3,
        dataLabels: { position: 'top' },
        barHeight: mode === 'grouped' ? '65%' : '80%',
      },
    },
    dataLabels: { enabled: false },
    colors: series.map((s) => s.color),
    xaxis: {
      categories,
      labels: { style: { colors: '#6b7280', fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { style: { colors: '#9ca3af', fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px' } },
    },
    grid: {
      borderColor: '#232630',
      strokeDashArray: 3,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: '#9ca3af' },
      markers: { size: 8, shape: 'square' },
      fontFamily: 'Space Grotesk, sans-serif',
      fontSize: '12px',
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) =>
          new Intl.NumberFormat('vi-VN').format(val) + ' học sinh',
      },
    },
    fill: { opacity: mode === 'stacked' ? 0.9 : 0.85 },
    theme: { mode: 'dark' },
  }

  return (
    <ApexCharts
      type="bar"
      series={series}
      options={options}
      height={420}
      width="100%"
    />
  )
}
