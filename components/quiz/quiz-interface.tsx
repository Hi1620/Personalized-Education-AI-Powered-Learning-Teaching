"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Clock, CheckCircle, XCircle, Award, RotateCcw, BookOpen, TrendingUp, AlertCircle } from "lucide-react"

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  topic: string
}

interface QuizResult {
  questionId: string
  selectedAnswer: number
  isCorrect: boolean
  timeSpent: number
}

interface QuizInterfaceProps {
  title: string
  description: string
  questions: QuizQuestion[]
  timeLimit?: number
  onComplete: (results: QuizResult[], score: number) => void
}

export function QuizInterface({
  title,
  description,
  questions,
  timeLimit = 600, // 10 minutes default
  onComplete,
}: QuizInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [results, setResults] = useState<QuizResult[]>([])
  const [timeRemaining, setTimeRemaining] = useState(timeLimit)
  const [showResults, setShowResults] = useState(false)
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !showResults) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0) {
      handleQuizComplete()
    }
  }, [timeRemaining, showResults])

  // Reset question start time when question changes
  useEffect(() => {
    setQuestionStartTime(Date.now())
  }, [currentQuestion])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000)
      const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer

      const newResult: QuizResult = {
        questionId: questions[currentQuestion].id,
        selectedAnswer,
        isCorrect,
        timeSpent,
      }

      const newResults = [...results, newResult]
      setResults(newResults)
      setSelectedAnswer(null)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        handleQuizComplete(newResults)
      }
    }
  }

  const handleQuizComplete = (finalResults = results) => {
    const score = Math.round((finalResults.filter((r) => r.isCorrect).length / questions.length) * 100)
    setShowResults(true)
    onComplete(finalResults, score)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { text: "Excellent", color: "bg-green-100 text-green-800" }
    if (score >= 80) return { text: "Good", color: "bg-blue-100 text-blue-800" }
    if (score >= 60) return { text: "Fair", color: "bg-yellow-100 text-yellow-800" }
    return { text: "Needs Improvement", color: "bg-red-100 text-red-800" }
  }

  if (showResults) {
    const score = Math.round((results.filter((r) => r.isCorrect).length / questions.length) * 100)
    const correctAnswers = results.filter((r) => r.isCorrect).length
    const averageTime = Math.round(results.reduce((acc, r) => acc + r.timeSpent, 0) / results.length)
    const scoreBadge = getScoreBadge(score)

    // Group incorrect answers by topic for review suggestions
    const incorrectTopics = results
      .filter((r) => !r.isCorrect)
      .map((r) => questions.find((q) => q.id === r.questionId)?.topic)
      .filter((topic, index, arr) => topic && arr.indexOf(topic) === index)

    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Award className="w-10 h-10 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
            <CardDescription>Here are your results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score Overview */}
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(score)}`}>{score}%</div>
              <Badge className={scoreBadge.color}>{scoreBadge.text}</Badge>
              <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
                <div>
                  <div className="font-semibold">
                    {correctAnswers}/{questions.length}
                  </div>
                  <div className="text-muted-foreground">Correct</div>
                </div>
                <div>
                  <div className="font-semibold">{formatTime(averageTime)}</div>
                  <div className="text-muted-foreground">Avg Time</div>
                </div>
                <div>
                  <div className="font-semibold">{formatTime(timeLimit - timeRemaining)}</div>
                  <div className="text-muted-foreground">Total Time</div>
                </div>
              </div>
            </div>

            {/* Question Review */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Question Review</h3>
              <div className="space-y-3">
                {questions.map((question, index) => {
                  const result = results[index]
                  const isCorrect = result?.isCorrect

                  return (
                    <div key={question.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCorrect ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                          }`}
                        >
                          {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="font-medium">Question {index + 1}</div>
                          <div className="text-sm text-muted-foreground">{question.topic}</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {result ? formatTime(result.timeSpent) : "Not answered"}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Review Suggestions */}
            {incorrectTopics.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Suggested Topics to Review
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {incorrectTopics.map((topic, index) => (
                    <div key={index} className="p-3 border rounded-lg flex items-center justify-between">
                      <span className="font-medium">{topic}</span>
                      <Button size="sm" variant="outline">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Review
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 pt-4">
              <Button variant="outline" onClick={() => window.location.reload()}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Quiz
              </Button>
              <Button>
                <TrendingUp className="w-4 h-4 mr-2" />
                Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Quiz Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-lg font-semibold">
                <Clock className="w-5 h-5" />
                <span className={timeRemaining < 60 ? "text-red-600" : ""}>{formatTime(timeRemaining)}</span>
              </div>
              <div className="text-sm text-muted-foreground">Time Remaining</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline">{questions[currentQuestion].topic}</Badge>
            {timeRemaining < 60 && (
              <Badge className="bg-red-100 text-red-800">
                <AlertCircle className="w-3 h-3 mr-1" />
                Time Running Out
              </Badge>
            )}
          </div>
          <CardTitle className="text-xl leading-relaxed">{questions[currentQuestion].question}</CardTitle>
          <CardDescription>Choose the best answer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer leading-relaxed">
                  <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button onClick={handleNext} disabled={selectedAnswer === null}>
              {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Info */}
      <Card className="mt-6">
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground text-center">
            Take your time to read each question carefully. You can go back to previous questions if needed.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
