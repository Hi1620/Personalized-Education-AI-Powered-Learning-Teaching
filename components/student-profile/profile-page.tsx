"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Clock,
  Trophy,
  BookOpen,
  Eye,
  Ear,
  Hand,
  Star,
  Award,
  Target,
  Flame,
  Zap,
  Crown,
  Medal,
  Edit,
  Settings,
  Share,
} from "lucide-react"

interface StudentProfile {
  id: string
  name: string
  email: string
  avatar: string
  joinDate: string
  learningStyle: "visual" | "auditory" | "kinesthetic"
  totalXP: number
  currentLevel: number
  streak: number
  completedCourses: Course[]
  inProgressCourses: Course[]
  achievements: Achievement[]
  learningTimes: LearningTime[]
  stats: StudentStats
  preferences: LearningPreferences
}

interface Course {
  id: string
  title: string
  category: string
  progress: number
  completedDate?: string
  rating?: number
  thumbnail: string
  instructor: string
  duration: string
  certificate?: boolean
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: "learning" | "social" | "milestone" | "special"
  earnedDate: string
  rarity: "common" | "rare" | "epic" | "legendary"
  xpReward: number
}

interface LearningTime {
  day: string
  hours: string[]
  isPreferred: boolean
}

interface StudentStats {
  totalHoursLearned: number
  averageSessionTime: number
  favoriteSubject: string
  weeklyGoal: number
  weeklyProgress: number
  monthlyXP: number
  coursesThisMonth: number
}

interface LearningPreferences {
  subjects: string[]
  difficulty: "beginner" | "intermediate" | "advanced"
  sessionLength: "short" | "medium" | "long"
  notifications: boolean
}

export function StudentProfilePage({ profile }: { profile: StudentProfile }) {
  const [activeTab, setActiveTab] = useState("overview")

  const getLearningStyleInfo = (style: string) => {
    switch (style) {
      case "visual":
        return {
          icon: Eye,
          title: "Visual Learner",
          description: "Learns best through seeing and visualizing",
          color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
          tips: ["Use diagrams and charts", "Highlight important text", "Watch educational videos"],
        }
      case "auditory":
        return {
          icon: Ear,
          title: "Auditory Learner",
          description: "Learns best through listening and discussion",
          color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
          tips: ["Listen to podcasts", "Discuss topics aloud", "Use text-to-speech"],
        }
      case "kinesthetic":
        return {
          icon: Hand,
          title: "Kinesthetic Learner",
          description: "Learns best through hands-on experience",
          color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
          tips: ["Practice with hands-on activities", "Take breaks to move", "Use physical objects"],
        }
      default:
        return {
          icon: Eye,
          title: "Mixed Learner",
          description: "Benefits from multiple learning approaches",
          color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
          tips: [],
        }
    }
  }

  const getAchievementIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      trophy: Trophy,
      star: Star,
      award: Award,
      target: Target,
      crown: Crown,
      medal: Medal,
      flame: Flame,
      zap: Zap,
    }
    return icons[iconName] || Trophy
  }

  const getAchievementColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRarityBadge = (rarity: string) => {
    const colors = {
      common: "bg-gray-500",
      rare: "bg-blue-500",
      epic: "bg-purple-500",
      legendary: "bg-yellow-500",
    }
    return colors[rarity as keyof typeof colors] || colors.common
  }

  const learningStyleInfo = getLearningStyleInfo(profile.learningStyle)
  const LearningStyleIcon = learningStyleInfo.icon

  const xpToNextLevel = (profile.currentLevel + 1) * 1000
  const currentLevelXP = profile.totalXP - profile.currentLevel * 1000
  const levelProgress = (currentLevelXP / 1000) * 100

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-10"></div>
        <CardContent className="relative p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar and Basic Info */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{profile.currentLevel}</span>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
                <p className="text-muted-foreground">{profile.email}</p>
                <p className="text-sm text-muted-foreground">
                  Member since {new Date(profile.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 ml-0 md:ml-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{profile.totalXP.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total XP</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{profile.completedCourses.length}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 flex items-center justify-center">
                  <Flame className="w-6 h-6 mr-1" />
                  {profile.streak}
                </div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{profile.achievements.length}</div>
                <div className="text-sm text-muted-foreground">Achievements</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Level {profile.currentLevel}</span>
              <span>
                {currentLevelXP.toLocaleString()} / {(1000).toLocaleString()} XP
              </span>
            </div>
            <Progress value={levelProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Learning Style */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LearningStyleIcon className="w-5 h-5 mr-2" />
                  Learning Style
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className={`mb-3 ${learningStyleInfo.color}`}>{learningStyleInfo.title}</Badge>
                <p className="text-sm text-muted-foreground mb-4">{learningStyleInfo.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Recommended Strategies:</h4>
                  <ul className="space-y-1">
                    {learningStyleInfo.tips.map((tip, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Weekly Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Learning Hours</span>
                    <span className="font-medium">
                      {profile.stats.weeklyProgress} / {profile.stats.weeklyGoal} hrs
                    </span>
                  </div>
                  <Progress value={(profile.stats.weeklyProgress / profile.stats.weeklyGoal) * 100} className="h-2" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium">{profile.stats.averageSessionTime} min</div>
                      <div className="text-muted-foreground">Avg Session</div>
                    </div>
                    <div>
                      <div className="font-medium">{profile.stats.coursesThisMonth}</div>
                      <div className="text-muted-foreground">Courses This Month</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferred Learning Times */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Learning Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profile.learningTimes.map((time, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{time.day}</span>
                      <div className="flex space-x-1">
                        {time.hours.map((hour, hourIndex) => (
                          <Badge
                            key={hourIndex}
                            variant={time.isPreferred ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {hour}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.inProgressCourses.slice(0, 3).map((course) => (
                  <div key={course.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{course.title}</h4>
                      <p className="text-sm text-muted-foreground">{course.instructor}</p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-1" />
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Continue
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Completed Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Completed Courses ({profile.completedCourses.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.completedCourses.map((course) => (
                    <div key={course.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">{course.instructor}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{course.category}</Badge>
                          {course.certificate && (
                            <Badge className="bg-green-100 text-green-800">
                              <Award className="w-3 h-3 mr-1" />
                              Certified
                            </Badge>
                          )}
                          {course.rating && (
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs ml-1">{course.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">100%</div>
                        <div className="text-xs text-muted-foreground">
                          {course.completedDate && new Date(course.completedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* In Progress Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  In Progress ({profile.inProgressCourses.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.inProgressCourses.map((course) => (
                    <div key={course.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">{course.instructor}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{course.category}</Badge>
                          <Badge variant="secondary">{course.duration}</Badge>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-1" />
                        </div>
                      </div>
                      <Button size="sm">Continue</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.achievements.map((achievement) => {
              const AchievementIcon = getAchievementIcon(achievement.icon)
              return (
                <Card
                  key={achievement.id}
                  className={`relative overflow-hidden ${getAchievementColor(achievement.rarity)}`}
                >
                  <div
                    className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getRarityBadge(achievement.rarity)}`}
                  ></div>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-white/50 rounded-lg">
                        <AchievementIcon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm opacity-80 mt-1">{achievement.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <Badge variant="secondary" className="text-xs">
                            +{achievement.xpReward} XP
                          </Badge>
                          <span className="text-xs opacity-70">
                            {new Date(achievement.earnedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Learning Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Favorite Subjects</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.preferences.subjects.map((subject, index) => (
                      <Badge key={index} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Difficulty Level</h4>
                  <Badge className="capitalize">{profile.preferences.difficulty}</Badge>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Session Length</h4>
                  <Badge variant="outline" className="capitalize">
                    {profile.preferences.sessionLength} sessions
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{profile.stats.totalHoursLearned}</div>
                    <div className="text-sm text-muted-foreground">Total Hours</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{profile.stats.monthlyXP}</div>
                    <div className="text-sm text-muted-foreground">Monthly XP</div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Favorite Subject</h4>
                  <Badge className="bg-purple-100 text-purple-800">{profile.stats.favoriteSubject}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
