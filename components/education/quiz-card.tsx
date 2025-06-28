"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, HelpCircle, Trophy, AlertCircle, CheckCircle } from "lucide-react"
import type { Quiz } from "@/types"

interface QuizCardProps {
  quiz: Quiz
  userScore?: number
  attempts?: number
  onStart?: (quizId: string) => void
  onRetake?: (quizId: string) => void
}

export function QuizCard({ quiz, userScore, attempts = 0, onStart, onRetake }: QuizCardProps) {
  const hasAttempted = attempts > 0
  const hasPassed = userScore !== undefined && userScore >= quiz.passingScore
  const canRetake = attempts < quiz.attempts
  const scorePercentage = userScore ? (userScore / quiz.questions.length) * 100 : 0

  const getStatusBadge = () => {
    if (!hasAttempted) {
      return <Badge variant="outline">Not Started</Badge>
    }
    if (hasPassed) {
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Passed</Badge>
    }
    if (canRetake) {
      return <Badge variant="destructive">Failed - Can Retake</Badge>
    }
    return <Badge variant="destructive">Failed - No Attempts Left</Badge>
  }

  const getStatusIcon = () => {
    if (!hasAttempted) {
      return <HelpCircle className="w-5 h-5 text-muted-foreground" />
    }
    if (hasPassed) {
      return <CheckCircle className="w-5 h-5 text-green-500" />
    }
    return <AlertCircle className="w-5 h-5 text-red-500" />
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{quiz.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{quiz.description}</p>
            </div>
          </div>
          {getStatusIcon()}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quiz Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-muted-foreground" />
            <span>{quiz.questions.length} questions</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{quiz.timeLimit} minutes</span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-muted-foreground" />
            <span>
              Pass: {quiz.passingScore}/{quiz.questions.length}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-muted-foreground" />
            <span>{quiz.attempts - attempts} attempts left</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex justify-between items-center">
          {getStatusBadge()}
          {hasAttempted && (
            <span className="text-sm text-muted-foreground">
              Attempt {attempts}/{quiz.attempts}
            </span>
          )}
        </div>

        {/* Score Display */}
        {hasAttempted && userScore !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Your Score</span>
              <span className="font-medium">
                {userScore}/{quiz.questions.length} ({Math.round(scorePercentage)}%)
              </span>
            </div>
            <Progress value={scorePercentage} className={`h-2 ${hasPassed ? "bg-green-100" : "bg-red-100"}`} />
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          {!hasAttempted ? (
            <Button onClick={() => onStart?.(quiz.id)} className="w-full">
              Start Quiz
            </Button>
          ) : canRetake && !hasPassed ? (
            <Button onClick={() => onRetake?.(quiz.id)} variant="outline" className="w-full">
              Retake Quiz
            </Button>
          ) : hasPassed ? (
            <Button onClick={() => onRetake?.(quiz.id)} variant="outline" className="w-full">
              Review Quiz
            </Button>
          ) : (
            <Button disabled className="w-full">
              No Attempts Remaining
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
