"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, Clock, Users, Play, BookOpen } from "lucide-react"
import type { Course } from "@/types"

interface CourseCardProps {
  course: Course
  variant?: "default" | "compact"
  onEnroll?: (courseId: string) => void
  onContinue?: (courseId: string) => void
}

export function CourseCard({ course, variant = "default", onEnroll, onContinue }: CourseCardProps) {
  const handleAction = () => {
    if (course.isEnrolled) {
      onContinue?.(course.id)
    } else {
      onEnroll?.(course.id)
    }
  }

  if (variant === "compact") {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{course.title}</h3>
              <p className="text-xs text-muted-foreground">{course.instructor}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {course.level}
                </Badge>
                <span className="text-xs text-muted-foreground">{course.duration}</span>
              </div>
            </div>
          </div>
          {course.progress !== undefined && (
            <div className="mt-3">
              <Progress value={course.progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">{course.progress}% complete</p>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
        <Badge className="absolute top-2 left-2" variant="secondary">
          {course.category}
        </Badge>
        <Badge className="absolute top-2 right-2" variant="outline">
          {course.level}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg leading-tight">{course.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
          <p className="text-sm font-medium text-blue-600">{course.instructor}</p>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{course.studentsCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
          </div>
        </div>

        {course.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2">
        <div className="flex items-center justify-between w-full">
          <div className="text-lg font-bold">{course.price === 0 ? "Free" : `$${course.price}`}</div>
          <Button onClick={handleAction} className="ml-auto">
            {course.isEnrolled ? "Continue" : "Enroll Now"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
