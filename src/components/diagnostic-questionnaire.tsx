'use client'

import { useState } from 'react'
import useLocalStorage from '@/hooks/use-local-storage'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react'

type Answer = {
  id: string
  answer: string
  points: number
}

type DataDiagnosticType = {
  answers: Answer[]
  totalPoints: number
}

type DiagnosisType = {
  score_range: {
    min: number
    max: number
  }
  message: string
}

import data from '@/data/data.json'
const { sections, diagnosis } = data

//import CardAnswer from './CardAnswer'

export default function DiagnosticQuestionnaire() {
  const [currentSection, setCurrentSection] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [dataDiagnostic, setDataDiagnostic] =
    useLocalStorage<DataDiagnosticType>('dataDiagnostic', {
      answers: [],
      totalPoints: 0,
    })
  const [isComplete, setIsComplete] = useState(false)

  const totalAnswers = sections.reduce(
    (acc, section) => acc + section.questions.length,
    0
  )

  console.log('selected answer', selectedAnswer)

  const handleAnswer = () => {
    if (selectedAnswer === null) return

    const [answer, points] = selectedAnswer.split('|')
    const newAnswer: Answer = {
      id: sections[currentSection].questions[currentQuestion].id.toString(),
      answer,
      points: parseInt(points),
    }
    //const prevData = dataDiagnostic

    setDataDiagnostic((prevData) => ({
      answers: [
        ...prevData.answers.filter((a: Answer) => a.id !== newAnswer.id),
        newAnswer,
      ],
      totalPoints:
        prevData.totalPoints +
        newAnswer.points -
        (prevData.answers.find((a: Answer) => a.id === newAnswer.id)?.points ||
          0),
    }))

    if (currentQuestion < sections[currentSection].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
      setCurrentQuestion(0)
    } else {
      setIsComplete(true)
    }

    setSelectedAnswer(null)
  }

  const getDiagnosis = (totalPoints: number): DiagnosisType => {
    if (
      totalPoints >= diagnosis.optimal.score_range.min &&
      totalPoints <= diagnosis.optimal.score_range.max
    ) {
      return diagnosis.optimal
    } else if (
      totalPoints >= diagnosis.potential_improvement.score_range.min &&
      totalPoints <= diagnosis.potential_improvement.score_range.max
    ) {
      return diagnosis.potential_improvement
    } else {
      return diagnosis.urgent_need
    }
  }

  const currentQuestionData =
    sections[currentSection]?.questions[currentQuestion]
  const progress =
    ((currentSection * 3 + currentQuestion + 1) / (sections.length * 3)) * 100

  if (isComplete) {
    const finalDiagnosis = getDiagnosis(dataDiagnostic?.totalPoints)
    const alertVariant =
      finalDiagnosis === diagnosis.optimal
        ? 'default'
        : finalDiagnosis === diagnosis.potential_improvement
        ? undefined
        : 'destructive'
    const AlertIcon =
      finalDiagnosis === diagnosis.optimal
        ? CheckCircle2
        : finalDiagnosis === diagnosis.potential_improvement
        ? AlertTriangle
        : AlertCircle

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Diagnóstico Final</CardTitle>
          <CardDescription>
            Basado en tus respuestas, hemos preparado un diagnóstico para tu
            inmobiliaria.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant={alertVariant}>
            <AlertIcon className="h-4 w-4" />
            <AlertTitle>
              Puntuación Total: {dataDiagnostic.totalPoints}
            </AlertTitle>
            <AlertDescription>{finalDiagnosis.message}</AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              setIsComplete(false)
              setCurrentSection(0)
              setCurrentQuestion(0)
              setDataDiagnostic({ answers: [], totalPoints: 0 })
            }}
          >
            Reiniciar Diagnóstico
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{sections[currentSection].title}</CardTitle>
        <CardDescription>
          Pregunta{' '}
          {sections
            .slice(0, currentSection)
            .reduce((acc, section) => acc + section.questions.length, 0) +
            currentQuestion +
            1}{' '}
          de {totalAnswers}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="w-full mb-4" />
        <h3 className="text-lg font-semibold mb-4">
          {currentQuestionData.text}
        </h3>
        <RadioGroup
          onValueChange={setSelectedAnswer}
          value={selectedAnswer || ''}
        >
          {currentQuestionData.answers.map((answer, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem
                value={`${answer.text}|${answer.points}`}
                id={`answer-${index}`}
              />
              <Label htmlFor={`answer-${index}`}>{answer.text}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Puntos totales: {dataDiagnostic.totalPoints}
        </p>
        <Button onClick={handleAnswer} disabled={selectedAnswer === null}>
          Aceptar
        </Button>
      </CardFooter>
    </Card>
    // <CardAnswer
    //   sections={sections}
    //   currentSection={currentSection}
    //   currentQuestion={currentQuestion}
    //   selectedAnswer={selectedAnswer}
    //   setSelectedAnswer={setSelectedAnswer}
    //   progress={progress}
    //   handleAnswer={handleAnswer}
    //   dataDiagnostic={dataDiagnostic}
    // />
  )
}
