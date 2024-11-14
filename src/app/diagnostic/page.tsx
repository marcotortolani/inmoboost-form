import DiagnosticQuestionnaire from '@/components/diagnostic-questionnaire'
//import DiagnosticQuestionnaire from '@/components/DiagnosticQuestionnaire'

export default function page() {
  return (
    <main className="flex-grow p-4">
      <section className={` max-w-xl mx-auto`}>
        <h2 className="text-xl font-semibold mb-6">Informe de Diagnóstico</h2>
        <DiagnosticQuestionnaire />
      </section>
    </main>
  )
}
