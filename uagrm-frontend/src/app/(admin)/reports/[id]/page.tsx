'use client'

import PreviewReport from '@/modules/report/components/PreviewReport'
import { useParams } from 'next/navigation'

export default function Page() {
  const params = useParams<{ id: string }>()

  return <PreviewReport id={params.id} />
}