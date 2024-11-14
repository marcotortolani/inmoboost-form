'use client'
import { useState, useEffect } from 'react'
import { Progress } from '@/components/ui/progress'
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
import { Button } from '@/components/ui/button'

interface Answer {
  text: string
  points: number
}

interface Question {
  id: number
  text: string
  answers: Answer[]
}

interface Section {
  title: string
  questions: Question[]
}

interface DataDiagnostic {
  totalPoints: number
}

interface CardAnswerProps {
  sections: Section[]
  currentSection: number
  currentQuestion: number
  selectedAnswer: string | null
  setSelectedAnswer: (value: string | null) => void
  progress: number
  handleAnswer: () => void
  dataDiagnostic: DataDiagnostic
}

export default function CardAnswer({
  sections,
  currentSection = 0,
  currentQuestion = 0,
  selectedAnswer,
  setSelectedAnswer,
  progress,
  handleAnswer,
  dataDiagnostic,
}: CardAnswerProps) {
  const [currentQuestionData, setcurrentQuestionData] =
    useState<Question | null>(null)

  console.log('current section : ', currentSection)
  console.log('current question : ', currentQuestion)

  useEffect(() => {
    const currentData = sections[currentSection].questions[currentQuestion]

    setcurrentQuestionData(currentData)
  }, [currentSection, currentQuestion])

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
          de{' '}
          {sections.reduce((acc, section) => acc + section.questions.length, 0)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="w-full mb-4" />
        <h3 className="text-lg font-semibold mb-4">
          {currentQuestionData?.text}
        </h3>
        <RadioGroup
          onValueChange={setSelectedAnswer}
          value={selectedAnswer || undefined}
        >
          {currentQuestionData?.answers.map((answer, index) => (
            <div
              key={`${currentQuestionData?.id}-${index}`}
              className="flex items-center space-x-2"
            >
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
  )
}
