"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  Calendar,
  Target,
  Play,
  ChevronRight,
  Users,
  MessageSquare,
} from "lucide-react"

interface DashboardProps {
  user: {
    name: string
    avatar?: string
    level: string
    xp: number
    nextLevelXp: number
  }
}

export function StudentDashboard({ user }: DashboardProps) {
  const stats = [
    { label: "Courses Completed", value: "12", icon: Trophy, color: "text-green-600" },
    { label: "Study Hours", value: "48", icon: Clock, color: "text-blue-600" },
    { label: "Current Streak", value: "7 days", icon: Target, color: "text-orange-600" },
    { label: "Avg. Score", value: "92%", icon: TrendingUp, color: "text-purple-600" },
  ]

  const currentCourses = [
    {
      id: 1,
      title: "Advanced React Development",
      instructor: "Sarah Chen",
      progress: 75,
      nextLesson: "React Hooks Deep Dive",
      timeLeft: "2h 30m",
      thumbnail: "/placeholder.svg?height=80&width=120",
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Michael Park",
      progress: 45,
      nextLesson: "Neural Networks Basics",
      timeLeft: "1h 45m",
      thumbnail: "/placeholder.svg?height=80&width=120",
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      instructor: "Emma Wilson",
      progress: 60,
      nextLesson: "Color Theory",
      timeLeft: "3h 15m",
      thumbnail: "/placeholder.svg?height=80&width=120",
    },
  ]

  const recentAchievements = [
    { title: "Quiz Master", description: "Scored 100% on 5 consecutive quizzes", icon: "🏆" },
    { title: "Consistent Learner", description: "Maintained 7-day study streak", icon: "🔥" },
    { title: "Fast Learner", description: "Completed React course in record time", icon: "⚡" },
  ]

  const upcomingEvents = [
    { title: "Live Q&A Session", time: "Today, 3:00 PM", type: "webinar" },
    { title: "Assignment Due", time: "Tomorrow, 11:59 PM", type: "deadline" },
    { title: "New Course Release", time: "Friday, 9:00 AM", type: "announcement" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user.name}! 👋</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Ready to continue your learning journey?</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Level</p>
              <p className="font-semibold text-lg">{user.level}</p>
            </div>
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* XP Progress */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress to next level</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user.xp} / {user.nextLevelXp} XP
              </span>
            </div>
            <Progress value={(user.xp / user.nextLevelXp) * 100} className="h-2" />
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Courses */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Continue Learning
                  <Button variant="ghost" size="sm">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-20 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">{course.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">by {course.instructor}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Progress value={course.progress} className="flex-1 h-2" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{course.progress}%</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Next: {course.nextLesson} • {course.timeLeft} left
                      </p>
                    </div>
                    <Button size="sm" className="shrink-0">
                      <Play className="h-4 w-4 mr-1" />
                      Continue
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        event.type === "deadline"
                          ? "bg-red-500"
                          : event.type === "webinar"
                            ? "bg-blue-500"
                            : "bg-green-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{event.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ask AI Tutor
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Courses
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Study Groups
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
