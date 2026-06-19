'use client'

import PreviewTask from '@/modules/tasks/components/PreviewTask'
import { useParams } from 'next/navigation'

export default function Page() {
  const params = useParams<{ id: string }>()

  return <PreviewTask id={params.id} />
}