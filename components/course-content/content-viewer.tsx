"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  BookOpen,
  Video,
  FileText,
  Clock,
  Download,
  Bookmark,
  Share,
  Play,
  Pause,
} from "lucide-react"

interface Lesson {
  id: string
  title: string
  type: "video" | "text" | "document"
  content: string
  duration: string
  isCompleted: boolean
}

interface CourseContentViewerProps {
  lessons: Lesson[]
  currentLessonIndex: number
  onLessonChange: (index: number) => void
  onMarkComplete: (lessonId: string) => void
}

export function CourseContentViewer({
  lessons,
  currentLessonIndex,
  onLessonChange,
  onMarkComplete,
}: CourseContentViewerProps) {
  const [notes, setNotes] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const currentLesson = lessons[currentLessonIndex]
  const completedLessons = lessons.filter((lesson) => lesson.isCompleted).length
  const progressPercentage = (completedLessons / lessons.length) * 100

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      onLessonChange(currentLessonIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentLessonIndex < lessons.length - 1) {
      onLessonChange(currentLessonIndex + 1)
    }
  }

  const handleMarkComplete = () => {
    onMarkComplete(currentLesson.id)
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video
      case "text":
        return BookOpen
      case "document":
        return FileText
      default:
        return BookOpen
    }
  }

  const renderContent = () => {
    switch (currentLesson.type) {
      case "video":
        return (
          <div className="relative bg-black rounded-lg overflow-hidden">
            <div className="aspect-video flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </div>
                <p className="text-lg font-medium">{currentLesson.title}</p>
                <p className="text-sm opacity-75">Video Lesson • {currentLesson.duration}</p>
              </div>
            </div>
            <Button
              className="absolute inset-0 w-full h-full bg-transparent hover:bg-black/10"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <span className="sr-only">{isPlaying ? "Pause" : "Play"} video</span>
            </Button>
          </div>
        )
      case "text":
        return (
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap leading-relaxed">{currentLesson.content}</div>
          </div>
        )
      case "document":
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">{currentLesson.title}</h3>
            <p className="text-muted-foreground mb-4">Document content would be displayed here</p>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Document
            </Button>
          </div>
        )
      default:
        return <div>Content not available</div>
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Course Progress Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Introduction to React Development</h1>
              <p className="text-muted-foreground">Master the fundamentals of React</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Progress</div>
              <div className="text-2xl font-bold">
                {completedLessons}/{lessons.length}
              </div>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lesson Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    {getLessonIcon(currentLesson.type)({ className: "w-5 h-5" })}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{currentLesson.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {currentLesson.duration}
                      </div>
                      <Badge variant={currentLesson.isCompleted ? "default" : "secondary"}>
                        {currentLesson.isCompleted ? "Completed" : "In Progress"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => setBookmarked(!bookmarked)}>
                    <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Content Display */}
          <Card>
            <CardContent className="p-6">{renderContent()}</CardContent>
          </Card>

          {/* Navigation and Completion */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={handlePrevious} disabled={currentLessonIndex === 0}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous Lesson
                </Button>

                <div className="flex items-center space-x-4">
                  {!currentLesson.isCompleted && (
                    <Button onClick={handleMarkComplete} className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Completed
                    </Button>
                  )}

                  <Button onClick={handleNext} disabled={currentLessonIndex === lessons.length - 1}>
                    Next Lesson
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">My Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Take notes about this lesson..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[200px] resize-none"
              />
              <Button size="sm" className="mt-3 w-full">
                Save Notes
              </Button>
            </CardContent>
          </Card>

          {/* Lesson Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lesson Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Key Points:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Understanding React components</li>
                    <li>• JSX syntax and structure</li>
                    <li>• Props and state management</li>
                    <li>• Event handling in React</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Resources:</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <FileText className="w-4 h-4 mr-2" />
                      Lesson Slides
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Code Examples
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Outline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Outline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      index === currentLessonIndex ? "bg-blue-100 text-blue-900" : "hover:bg-gray-100"
                    }`}
                    onClick={() => onLessonChange(index)}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        lesson.isCompleted
                          ? "bg-green-500 text-white"
                          : index === currentLessonIndex
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {lesson.isCompleted ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{lesson.title}</div>
                      <div className="text-xs text-muted-foreground">{lesson.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
