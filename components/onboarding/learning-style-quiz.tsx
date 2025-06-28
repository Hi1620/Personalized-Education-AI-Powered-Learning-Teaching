"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Eye, Ear, Hand, Brain, CheckCircle, ArrowRight } from "lucide-react"

interface Question {
  id: string
  question: string
  options: Array<{
    text: string
    style: "visual" | "auditory" | "kinesthetic"
  }>
}

interface LearningStyleQuizProps {
  onComplete: (style: string) => void
}

const questions: Question[] = [
  {
    id: "1",
    question: "When learning something new, you prefer to:",
    options: [
      { text: "Read instructions and diagrams", style: "visual" },
      { text: "Listen to explanations and discussions", style: "auditory" },
      { text: "Try it out hands-on immediately", style: "kinesthetic" },
    ],
  },
  {
    id: "2",
    question: "When remembering information, you find it easier to:",
    options: [
      { text: "Picture it in your mind or see it written down", style: "visual" },
      { text: "Hear it repeated or discuss it out loud", style: "auditory" },
      { text: "Practice or physically experience it", style: "kinesthetic" },
    ],
  },
  {
    id: "3",
    question: "In a classroom, you learn best when:",
    options: [
      { text: "There are visual aids like charts and slides", style: "visual" },
      { text: "The teacher explains concepts verbally", style: "auditory" },
      { text: "You can participate in activities and experiments", style: "kinesthetic" },
    ],
  },
  {
    id: "4",
    question: "When solving problems, you tend to:",
    options: [
      { text: "Draw diagrams or make lists", style: "visual" },
      { text: "Talk through the problem out loud", style: "auditory" },
      { text: "Use trial and error or physical models", style: "kinesthetic" },
    ],
  },
  {
    id: "5",
    question: "Your ideal study environment includes:",
    options: [
      { text: "Good lighting and organized visual materials", style: "visual" },
      { text: "Background music or ability to read aloud", style: "auditory" },
      { text: "Space to move around and hands-on materials", style: "kinesthetic" },
    ],
  },
]

export function LearningStyleQuiz({ onComplete }: LearningStyleQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState("")

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value)
  }

  const handleNext = () => {
    if (selectedAnswer) {
      const newAnswers = { ...answers, [questions[currentQuestion].id]: selectedAnswer }
      setAnswers(newAnswers)
      setSelectedAnswer("")

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        calculateResults(newAnswers)
      }
    }
  }

  const calculateResults = (finalAnswers: Record<string, string>) => {
    const scores = { visual: 0, auditory: 0, kinesthetic: 0 }

    Object.values(finalAnswers).forEach((answer) => {
      questions.forEach((question) => {
        const option = question.options.find((opt) => opt.text === answer)
        if (option) {
          scores[option.style]++
        }
      })
    })

    const dominantStyle = Object.entries(scores).reduce((a, b) =>
      scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b,
    )[0]

    setShowResults(true)
    setTimeout(() => onComplete(dominantStyle), 3000)
  }

  const getStyleInfo = (style: string) => {
    switch (style) {
      case "visual":
        return {
          icon: Eye,
          title: "Visual Learner",
          description: "You learn best through seeing and visualizing information",
          color: "bg-blue-100 text-blue-800",
          tips: [
            "Use diagrams, charts, and mind maps",
            "Highlight important text in different colors",
            "Watch educational videos and animations",
            "Create visual summaries of concepts",
          ],
        }
      case "auditory":
        return {
          icon: Ear,
          title: "Auditory Learner",
          description: "You learn best through listening and verbal communication",
          color: "bg-green-100 text-green-800",
          tips: [
            "Listen to lectures and podcasts",
            "Discuss topics with others",
            "Read aloud or use text-to-speech",
            "Use rhymes and music to remember",
          ],
        }
      case "kinesthetic":
        return {
          icon: Hand,
          title: "Kinesthetic Learner",
          description: "You learn best through hands-on experience and movement",
          color: "bg-purple-100 text-purple-800",
          tips: [
            "Use hands-on activities and experiments",
            "Take breaks to move around while studying",
            "Use physical objects and manipulatives",
            "Practice skills through repetition",
          ],
        }
      default:
        return {
          icon: Brain,
          title: "Balanced Learner",
          description: "You benefit from multiple learning approaches",
          color: "bg-gray-100 text-gray-800",
          tips: [],
        }
    }
  }

  if (showResults) {
    const dominantStyle = Object.entries(
      Object.values(answers).reduce(
        (acc, answer) => {
          questions.forEach((question) => {
            const option = question.options.find((opt) => opt.text === answer)
            if (option) {
              acc[option.style] = (acc[option.style] || 0) + 1
            }
          })
          return acc
        },
        {} as Record<string, number>,
      ),
    ).reduce((a, b) => (a[1] > b[1] ? a : b))[0]

    const styleInfo = getStyleInfo(dominantStyle)
    const StyleIcon = styleInfo.icon

    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
            <CardDescription>Here's your personalized learning style</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
              <div className="flex items-center justify-center mb-4">
                <div className={`p-4 rounded-full ${styleInfo.color}`}>
                  <StyleIcon className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{styleInfo.title}</h3>
              <p className="text-muted-foreground mb-4">{styleInfo.description}</p>

              <div className="text-left">
                <h4 className="font-semibold mb-3">Recommended Study Strategies:</h4>
                <ul className="space-y-2">
                  {styleInfo.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">Redirecting to your personalized dashboard...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Learning Style Assessment</h1>
              <p className="text-muted-foreground">Discover how you learn best</p>
            </div>
            <Badge variant="outline">
              Question {currentQuestion + 1} of {questions.length}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{questions[currentQuestion].question}</CardTitle>
          <CardDescription>Choose the option that best describes you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <RadioGroupItem value={option.text} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
                <div className="flex items-center space-x-2">
                  {option.style === "visual" && <Eye className="w-4 h-4 text-blue-500" />}
                  {option.style === "auditory" && <Ear className="w-4 h-4 text-green-500" />}
                  {option.style === "kinesthetic" && <Hand className="w-4 h-4 text-purple-500" />}
                </div>
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
            <Button onClick={handleNext} disabled={!selectedAnswer}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Learning Style Preview */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Learning Styles Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { style: "visual", icon: Eye, title: "Visual", color: "text-blue-500" },
              { style: "auditory", icon: Ear, title: "Auditory", color: "text-green-500" },
              { style: "kinesthetic", icon: Hand, title: "Kinesthetic", color: "text-purple-500" },
            ].map(({ style, icon: Icon, title, color }) => (
              <div key={style} className="text-center p-3 border rounded-lg">
                <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
                <div className="text-sm font-medium">{title}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
