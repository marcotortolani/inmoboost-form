'use client'
import { useRef, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
const apiUrl = process.env.NEXT_PUBLIC_API_SHEET

export default function FormMailing() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState('')
  const [formCompleted, setFormCompleted] = useState(false)

  console.log('Error: ', error)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formRef.current instanceof HTMLFormElement === false) return
    if (!apiUrl) return

    setIsSending(true)

    console.log(formRef.current)

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
    <div className=" w-full flex flex-col items-center justify-center ">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className=" w-5/6 max-w-lg  p-4 rounded-lg flex flex-col gap-2"
      >
        <div>
          <label htmlFor="business-name">Nombre de la Empresa</label>
          <Input
            required
            type="text"
            id="business-name"
            name="BusinessName"
            className=" w-full"
          />
        </div>
        <div>
          <label htmlFor="name">Nombre y Apellido</label>
          <Input
            required
            type="text"
            id="name"
            name="Name"
            className=" w-full"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <Input
            required
            type="email"
            id="email"
            name="Email"
            className=" w-full"
          />
        </div>

        <div>
          <label htmlFor="location">Ubicación (Ciudad/Zona)</label>
          {/** Options */}
          <Input
            required
            type="text"
            id="location"
            name="Location"
            className=" w-full"
          />
        </div>

        <div>
          <label htmlFor="url-web">Web de la empresa</label>
          {/** Options + "otra" */}
          <Input
            required
            type="text"
            id="url-web"
            placeholder="www.tuempresa.com"
            name="Web"
            className=" w-full"
          />
        </div>

        <div>
          <label htmlFor="work-years">Años en el Mercado</label>
          {/** Options */}
          <Input
            required
            type="text"
            id="work-years"
            name="MarketYears"
            className=" w-full"
          />
        </div>

        <div>
          <label htmlFor="amount-employees">
            Tamaño de la Empresa (num de empleados)
          </label>
          {/** Options */}
          {/* <input
            required
            type="text"
            id="amount-employees"
            name="Empleados"
            className=" w-full"
          /> */}
          <div className=" w-full flex flex-col items-center gap-1">
            <div className=" gap-1">
              <Button className=" lowercase first-letter:uppercase">
                Entre 1 y 5
              </Button>
              <Button className=" lowercase first-letter:uppercase">
                Entre 6 y 10
              </Button>
            </div>
            <div className=" gap-1">
              <Button className=" lowercase first-letter:uppercase">
                Entre 11 y 50
              </Button>
              <Button className=" lowercase first-letter:uppercase">
                Más de 50
              </Button>
            </div>
          </div>
        </div>

        <Button
          // loading={isSending}

          // onPointerEnterCapture={() => {}}
          // onPointerLeaveCapture={() => {}}
          type="submit"
          className=" mt-2"
        >
          {isSending ? 'Enviando' : 'Enviar'}
        </Button>
      </form>
      {formCompleted && <p>Mensaje exitoso</p>}
    </div>
  )
}
