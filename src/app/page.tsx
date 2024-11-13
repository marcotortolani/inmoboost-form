// import FormMailing from '@/components/FormMailing'
import FormRegister from '@/components/FormRegister'


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold">by InmoBoost</h1>
      </header>
      <main className="flex-grow p-4">
        <FormRegister />
      </main>
    </div>
  )
}
