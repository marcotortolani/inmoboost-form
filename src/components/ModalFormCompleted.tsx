'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from './ui/button'

export default function ModalFormCompleted() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(true)

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Formulario Completado</DialogTitle>
          <DialogDescription>
            El formulario ha sido completado con éxito. Gracias por su registro.
          </DialogDescription>
        </DialogHeader>
        <Button
          className="mt-6 w-full bg-sky-600 "
          onClick={() => router.push('/diagnostic')}
        >
          Realizar diagnóstico
        </Button>
      </DialogContent>
    </Dialog>
  )
}
