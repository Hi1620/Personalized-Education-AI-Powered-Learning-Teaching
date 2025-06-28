"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Users, BookOpen, Clock, MessageSquare, Target, Award } from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  avatar?: string
  courseProgress: number
  averageScore: number
  lastActive: string
  alerts: Array<{
    type: "low-progress" | "missed-deadline" | "struggling" | "excellent"
    message: string
  }>
  timeSpent: number
  assignmentsCompleted: number
  totalAssignments: number
}

interface PerformanceData {
  week: string
  classAverage: number
  topPerformer: number
  strugglingStudents: number
}

interface TeacherAnalyticsProps {
  students: Student[]
  performanceData: PerformanceData[]
  classStats: {
    totalStudents: number
    averageProgress: number
    averageScore: number
    activeStudents: number
  }
}

export function TeacherAnalyticsDashboard({ students, performanceData, classStats }: TeacherAnalyticsProps) {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)

  const getAlertColor = (type: string) => {
    switch (type) {
      case "low-progress":
        return "bg-yellow-100 text-yellow-800"
      case "missed-deadline":
        return "bg-red-100 text-red-800"
      case "struggling":
        return "bg-orange-100 text-orange-800"
      case "excellent":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "low-progress":
        return "⏳"
      case "missed-deadline":
        return "⚠️"
      case "struggling":
        return "📉"
      case "excellent":
        return "🌟"
      default:
        return "ℹ️"
    }
  }

  const interventionSuggestions = [
    {
      title: "Schedule One-on-One Sessions",
      description: "For students with progress below 60%",
      priority: "high",
      affectedStudents: students.filter((s) => s.courseProgress < 60).length,
    },
    {
      title: "Create Study Groups",
      description: "Pair struggling students with high performers",
      priority: "medium",
      affectedStudents: students.filter((s) => s.averageScore < 70).length,
    },
    {
      title: "Send Motivational Messages",
      description: "To students who haven't been active recently",
      priority: "low",
      affectedStudents: students.filter((s) => new Date(s.lastActive) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
        .length,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teacher Analytics Dashboard</h1>
          <p className="text-muted-foreground">Monitor student performance and engagement</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Export Report</Button>
          <Button>Send Messages</Button>
        </div>
      </div>

      {/* Class Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{classStats.totalStudents}</div>
                <div className="text-sm text-muted-foreground">Total Students</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{classStats.averageProgress}%</div>
                <div className="text-sm text-muted-foreground">Avg Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{classStats.averageScore}%</div>
                <div className="text-sm text-muted-foreground">Avg Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{classStats.activeStudents}</div>
                <div className="text-sm text-muted-foreground">Active Today</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Performance Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Student Performance</CardTitle>
              <CardDescription>Overview of all students in your class</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Avg Score</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Alerts</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow
                      key={student.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedStudent(student.id)}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">{student.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>{student.courseProgress}%</span>
                          </div>
                          <Progress value={student.courseProgress} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`font-medium ${student.averageScore >= 80 ? "text-green-600" : student.averageScore >= 60 ? "text-yellow-600" : "text-red-600"}`}
                        >
                          {student.averageScore}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{student.lastActive}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {student.alerts.slice(0, 2).map((alert, index) => (
                            <Badge key={index} className={`text-xs ${getAlertColor(alert.type)}`}>
                              {getAlertIcon(alert.type)} {alert.type.replace("-", " ")}
                            </Badge>
                          ))}
                          {student.alerts.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{student.alerts.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Interventions Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Suggested Interventions</CardTitle>
              <CardDescription>Recommended actions to improve student outcomes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {interventionSuggestions.map((suggestion, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{suggestion.title}</h4>
                    <Badge
                      className={
                        suggestion.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : suggestion.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }
                    >
                      {suggestion.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{suggestion.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{suggestion.affectedStudents} students</span>
                    <Button size="sm" variant="outline">
                      Take Action
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Class Announcement
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <BookOpen className="w-4 h-4 mr-2" />
                Create Assignment
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Target className="w-4 h-4 mr-2" />
                Schedule Office Hours
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Class Performance Trends</CardTitle>
          <CardDescription>Weekly performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="classAverage" stroke="#3b82f6" strokeWidth={3} name="Class Average" />
                <Line type="monotone" dataKey="topPerformer" stroke="#10b981" strokeWidth={2} name="Top Performer" />
                <Line
                  type="monotone"
                  dataKey="strugglingStudents"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Struggling Students"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
