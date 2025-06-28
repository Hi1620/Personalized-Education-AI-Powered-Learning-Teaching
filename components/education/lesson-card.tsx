"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, FileText, HelpCircle, ActivityIcon as Assignment, Clock, CheckCircle, Lock } from "lucide-react"
import type { Lesson } from "@/types"

interface LessonCardProps {
  lesson: Lesson
  showProgress?: boolean
  progress?: number
  onStart?: (lessonId: string) => void
}

export function LessonCard({ lesson, showProgress = false, progress = 0, onStart }: LessonCardProps) {
  const getIcon = () => {
    switch (lesson.type) {
      case "video":
        return <Play className="w-5 h-5" />
      case "text":
        return <FileText className="w-5 h-5" />
      case "quiz":
        return <HelpCircle className="w-5 h-5" />
      case "assignment":
        return <Assignment className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  const getTypeColor = () => {
    switch (lesson.type) {
      case "video":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "text":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "quiz":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "assignment":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <Card className={`hover:shadow-md transition-shadow ${lesson.isLocked ? "opacity-60" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${getTypeColor()}`}>{getIcon()}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{lesson.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{lesson.description}</p>
            </div>
          </div>
          {lesson.isCompleted && <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />}
          {lesson.isLocked && <Lock className="w-6 h-6 text-muted-foreground flex-shrink-0" />}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className={getTypeColor()}>
              {lesson.type}
            </Badge>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{lesson.duration}</span>
            </div>
          </div>

          <Button
            size="sm"
            disabled={lesson.isLocked}
            onClick={() => onStart?.(lesson.id)}
            variant={lesson.isCompleted ? "outline" : "default"}
          >
            {lesson.isCompleted ? "Review" : lesson.isLocked ? "Locked" : "Start"}
          </Button>
        </div>

        {showProgress && !lesson.isLocked && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
