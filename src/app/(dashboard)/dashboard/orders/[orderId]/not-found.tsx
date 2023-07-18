'use client'
import { Shell } from '@/components/Shell'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function OrderNotFound() {
  const router = useRouter()
  return (
    <Shell className='justify-start'>
      <p className='font-medium'>❌ Este pedido no se encuentra en nuestra base de datos</p>
      <Button onClick={() => router.push("/dashboard/orders")} variant={'outline'} size={'sm'}>
        Volver a la tabla de pedidos
      </Button>
    </Shell>
  )
}
