'use client'

import { useState, useRef } from 'react'
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

const apiUrl = process.env.NEXT_PUBLIC_API_SHEET

export default function FormRegister() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState('')
  const [formCompleted, setFormCompleted] = useState(false)
  const [formData, setFormData] = useState({
    CompanyName: '',
    FullName: '',
    Email: '',
    Location: '',
    Website: '',
    YearsInMarket: '',
    EmployeeCount: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formulario enviado:', formData)
    // Aquí puedes agregar la lógica para enviar los datos a un servidor
    //if (formRef.current instanceof HTMLFormElement === false) return
    if (!apiUrl) return

    setIsSending(true)

    console.log('Form ref current: ', formRef.current)

    fetch(apiUrl, {
      method: 'POST',
      body: new FormData(formRef.current),
    })
      .then((res) => {
        if (!res.ok) {
          setError('La respuesta del servidor no fue exitosa')
        }
        return res.json()
      })
      .then((data) => {
        console.log(data)
        // alert(data.msg)
        setFormCompleted(true)
      })
      .catch((err) => {
        setError(`El envio falló. Intente de nuevo. Error: ${err}`)
      })
      .finally(() => {
        setIsSending(false)
      })
  }

  return (
    <section className="max-w-xl mx-auto bg-card p-6 rounded-lg shadow-sm shadow-black/50">
      <h2 className="text-xl font-semibold mb-6">Formulario de Registro</h2>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="companyName">Nombre de la Empresa</Label>
          <Input
            id="companyName"
            name="CompanyName"
            value={formData.CompanyName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="fullName">Nombre y Apellido</Label>
          <Input
            id="fullName"
            name="FullName"
            value={formData.FullName}
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
            value={formData.Email}
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
            value={formData.Website}
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
        <Button type="submit" className="w-full">
          Enviar
        </Button>
      </form>
    </section>
  )
}
