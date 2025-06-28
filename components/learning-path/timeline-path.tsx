"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  Circle,
  Clock,
  BookOpen,
  Video,
  FileText,
  HelpCircle,
  Trophy,
  Play,
  RotateCcw,
} from "lucide-react"

interface LearningTopic {
  id: string
  title: string
  description: string
  type: "video" | "reading" | "quiz" | "assignment"
  status: "completed" | "in-progress" | "not-started"
  estimatedTime: string
  difficulty: "beginner" | "intermediate" | "advanced"
  prerequisites?: string[]
}

interface LearningPathProps {
  pathTitle: string
  pathDescription: string
  topics: LearningTopic[]
  overallProgress: number
}

export function TimelineLearningPath({ pathTitle, pathDescription, topics, overallProgress }: LearningPathProps) {
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null)

  const getTopicIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video
      case "reading":
        return BookOpen
      case "quiz":
        return HelpCircle
      case "assignment":
        return FileText
      default:
        return Circle
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle
      case "in-progress":
        return Clock
      default:
        return Circle
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100 border-green-200"
      case "in-progress":
        return "text-blue-600 bg-blue-100 border-blue-200"
      default:
        return "text-gray-400 bg-gray-50 border-gray-200"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActionButton = (topic: LearningTopic) => {
    switch (topic.status) {
      case "completed":
        return (
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            <RotateCcw className="w-4 h-4 mr-2" />
            Review
          </Button>
        )
      case "in-progress":
        return (
          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
            <Play className="w-4 h-4 mr-2" />
            Continue
          </Button>
        )
      default:
        return (
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            <Play className="w-4 h-4 mr-2" />
            Start
          </Button>
        )
    }
  }

  const completedTopics = topics.filter((topic) => topic.status === "completed").length
  const totalTopics = topics.length

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Path Header */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">{pathTitle}</CardTitle>
              <CardDescription className="text-lg mt-2">{pathDescription}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {completedTopics}/{totalTopics}
              </div>
              <div className="text-sm text-muted-foreground">Topics Completed</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Overall Progress</span>
              <span className="font-medium">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
        </CardHeader>
      </Card>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-green-200"></div>

        {/* Timeline Items */}
        <div className="space-y-6">
          {topics.map((topic, index) => {
            const TopicIcon = getTopicIcon(topic.type)
            const StatusIcon = getStatusIcon(topic.status)
            const isHovered = hoveredTopic === topic.id

            return (
              <div
                key={topic.id}
                className="relative flex items-start space-x-6"
                onMouseEnter={() => setHoveredTopic(topic.id)}
                onMouseLeave={() => setHoveredTopic(null)}
              >
                {/* Timeline Node */}
                <div
                  className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 transition-all duration-300 ${getStatusColor(topic.status)} ${isHovered ? "scale-110 shadow-lg" : ""}`}
                >
                  <TopicIcon className="w-6 h-6" />
                  <div className="absolute -bottom-1 -right-1">
                    <StatusIcon
                      className={`w-5 h-5 ${topic.status === "completed" ? "text-green-600" : topic.status === "in-progress" ? "text-blue-600" : "text-gray-400"}`}
                    />
                  </div>
                </div>

                {/* Content Card */}
                <Card className={`flex-1 transition-all duration-300 ${isHovered ? "shadow-lg border-blue-200" : ""}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{topic.title}</h3>
                          <Badge className={getDifficultyColor(topic.difficulty)}>{topic.difficulty}</Badge>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {topic.estimatedTime}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">{topic.description}</p>

                        {topic.prerequisites && topic.prerequisites.length > 0 && (
                          <div className="mb-4">
                            <span className="text-sm font-medium text-muted-foreground">Prerequisites: </span>
                            <span className="text-sm text-muted-foreground">{topic.prerequisites.join(", ")}</span>
                          </div>
                        )}
                      </div>

                      <div className="ml-4 min-w-[120px]">{getActionButton(topic)}</div>
                    </div>

                    {/* Hover Details */}
                    {isHovered && (
                      <div className="mt-4 pt-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Type:</span>
                            <span className="ml-2 capitalize">{topic.type}</span>
                          </div>
                          <div>
                            <span className="font-medium">Status:</span>
                            <span className="ml-2 capitalize">{topic.status.replace("-", " ")}</span>
                          </div>
                        </div>
                        {topic.status === "not-started" && (
                          <div className="mt-2 text-sm text-blue-600 font-medium">→ Next Topic</div>
                        )}
                        {topic.status === "completed" && (
                          <div className="mt-2 text-sm text-green-600 font-medium">✓ Completed - Ready for Review</div>
                        )}
                        {topic.status === "in-progress" && (
                          <div className="mt-2 text-sm text-blue-600 font-medium">
                            🔄 In Progress - Continue Learning
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Completion Badge */}
        {overallProgress === 100 && (
          <div className="relative flex items-center justify-center mt-8">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg">
              <Trophy className="w-10 h-10" />
            </div>
            <div className="absolute -bottom-8 text-center">
              <div className="text-lg font-bold text-yellow-600">Path Completed!</div>
              <div className="text-sm text-muted-foreground">Congratulations on finishing this learning path</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
