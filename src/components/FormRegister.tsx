'use client'

import { useState, useRef, useEffect } from 'react'

import useLocalStorage from '@/hooks/use-local-storage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import ModalFormCompleted from './ModalFormCompleted'

const apiUrl =
  'https://script.google.com/macros/s/AKfycbyXj8hj2e8vyDPSv3z5rVfa117bBuO0dUSXqRC2R3t5Ktbhcl_1pa4W9NXunqeYoiX09w/exec'

export const formDataInitialValues = {
  CompanyName: '',
  FullName: '',
  Email: '',
  Location: '',
  Website: '',
  YearsInMarket: '',
  EmployeeCount: '',
  formCompleted: false,
  formSent: false,
}

export default function FormRegister() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useLocalStorage(
    'formData',
    formDataInitialValues
  )
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
      formSent: false,
    })
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData({
      ...formData,
      [name]: value,
      formSent: false,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formRef.current) return
    if (!apiUrl) return
    console.log('Formulario enviado:', formData)

    setIsSending(true)

    fetch(apiUrl, {
      method: 'POST',
      body: new FormData(formRef.current),
    })
      .then((res) => {
        if (!res.ok) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'La respuesta del servidor no fue exitosa',
          })
          setFormData({
            ...formData,
            formCompleted: true,
            formSent: false,
          })
        }
        return res.json()
      })
      .then((data) => {
        console.log(data)
        if (data.result === 'success') {
          toast({
            title: 'Gracias por tu registro',
            description: 'Ahora podés hacer el diagnóstico de tu empresa.',
            className: 'bg-lime-200 text-card-foreground',
          })
        }
        setFormData({
          ...formData,
          formCompleted: true,
          formSent: true,
        })
      })
      .catch((err) => {
        console.log('Error: ', err)

        toast({
          variant: 'destructive',
          title: 'Error',
          description: `El envio falló. Intente de nuevo.`,
        })
        setFormData({
          ...formData,
          formCompleted: true,
          formSent: false,
        })
      })
      .finally(() => {
        setIsSending(false)
      })
  }

  useEffect(() => {
    if (formData?.formCompleted && formData?.formSent) {
      setIsModalOpen(true)
    }
    return () => {}
  }, [formData?.formCompleted, formData?.formSent])

  return (
    <div className=" w-full">
      <section
        className={` max-w-xl mx-auto bg-card p-6 rounded-lg ring-1 ring-black/10 shadow-md shadow-black/50`}
      >
        <h2 className="text-xl font-semibold mb-6">Formulario de Registro</h2>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="companyName">Nombre de la Empresa</Label>
            <Input
              id="companyName"
              name="CompanyName"
              value={formData ? formData?.CompanyName : ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="fullName">Nombre y Apellido</Label>
            <Input
              id="fullName"
              name="FullName"
              value={formData ? formData?.FullName : ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="Email"
              type="email"
              value={formData ? formData?.Email : ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="location">Ubicación</Label>
            <Select
              name="Location"
              onValueChange={handleSelectChange('Location')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione ubicación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Montevideo">Montevideo</SelectItem>
                <SelectItem value="Colonia">Colonia</SelectItem>
                <SelectItem value="Punta Del Este">Punta del Este</SelectItem>
                <SelectItem value="Maldonado">Maldonado</SelectItem>
                <SelectItem value="Otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="website">Dirección web</Label>
            <Input
              id="website"
              name="Website"
              type="text"
              value={formData ? formData?.Website : ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="yearsInMarket">Años en el mercado</Label>
            <Select
              name="YearsInMarket"
              onValueChange={handleSelectChange('YearsInMarket')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione años en el mercado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Menos de 1 año">Menos de 1 año</SelectItem>
                <SelectItem value="1 a 3 años">De 1 a 3 años</SelectItem>
                <SelectItem value="4 a 10 años">De 4 a 10 años</SelectItem>
                <SelectItem value="Más de 10 años">Más de 10 años</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="employeeCount">Cantidad de Empleados</Label>
            <Select
              name="EmployeeCount"
              onValueChange={handleSelectChange('EmployeeCount')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione cantidad de empleados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Entre 1 y 5">Entre 1 a 5</SelectItem>
                <SelectItem value="Entre 6 y 10">Entre 6 a 10</SelectItem>
                <SelectItem value="Entre 11 y 50">Entre 11 y 50</SelectItem>
                <SelectItem value="Más de 50">Más de 50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            disabled={
              !formData || Object.values(formData).some((value) => value === '')
            }
            type="submit"
            className="w-full disabled:cursor-not-allowed disabled:opacity-40 disabled:text-neutral-300 "
          >
            {isSending ? 'Enviando...' : 'Enviar'}
          </Button>
        </form>
      </section>
      {isModalOpen && <ModalFormCompleted />}
    </div>
  )
}
