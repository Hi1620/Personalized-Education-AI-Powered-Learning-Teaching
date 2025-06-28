"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { TimelineLearningPath } from "@/components/learning-path/timeline-path"
import { TeacherAnalyticsDashboard } from "@/components/teacher-analytics/dashboard"
import { CourseContentViewer } from "@/components/course-content/content-viewer"
import { LearningStyleQuiz } from "@/components/onboarding/learning-style-quiz"
import { QuizInterface } from "@/components/quiz/quiz-interface"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, BarChart3, Video, Brain, HelpCircle, ArrowRight } from "lucide-react"

export default function DemoPage() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  // Sample data for demos
  const learningPathData = {
    pathTitle: "React Development Fundamentals",
    pathDescription: "Master the core concepts of React development from basics to advanced topics",
    overallProgress: 65,
    topics: [
      {
        id: "1",
        title: "Introduction to React",
        description: "Learn the basics of React, JSX, and component structure",
        type: "video" as const,
        status: "completed" as const,
        estimatedTime: "45 min",
        difficulty: "beginner" as const,
      },
      {
        id: "2",
        title: "Components and Props",
        description: "Understanding React components and how to pass data with props",
        type: "reading" as const,
        status: "completed" as const,
        estimatedTime: "30 min",
        difficulty: "beginner" as const,
      },
      {
        id: "3",
        title: "State Management",
        description: "Learn how to manage component state with useState hook",
        type: "video" as const,
        status: "in-progress" as const,
        estimatedTime: "60 min",
        difficulty: "intermediate" as const,
      },
      {
        id: "4",
        title: "Event Handling",
        description: "Handle user interactions and events in React applications",
        type: "assignment" as const,
        status: "not-started" as const,
        estimatedTime: "40 min",
        difficulty: "intermediate" as const,
      },
      {
        id: "5",
        title: "React Hooks Deep Dive",
        description: "Advanced hooks like useEffect, useContext, and custom hooks",
        type: "video" as const,
        status: "not-started" as const,
        estimatedTime: "90 min",
        difficulty: "advanced" as const,
      },
    ],
  }

  const teacherAnalyticsData = {
    classStats: {
      totalStudents: 28,
      averageProgress: 73,
      averageScore: 82,
      activeStudents: 24,
    },
    students: [
      {
        id: "1",
        name: "Emma Wilson",
        email: "emma@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
        courseProgress: 95,
        averageScore: 92,
        lastActive: "2 hours ago",
        alerts: [{ type: "excellent" as const, message: "Top performer this week" }],
        timeSpent: 120,
        assignmentsCompleted: 8,
        totalAssignments: 8,
      },
      {
        id: "2",
        name: "James Chen",
        email: "james@example.com",
        courseProgress: 45,
        averageScore: 68,
        lastActive: "1 day ago",
        alerts: [
          { type: "low-progress" as const, message: "Behind on coursework" },
          { type: "missed-deadline" as const, message: "Assignment overdue" },
        ],
        timeSpent: 45,
        assignmentsCompleted: 4,
        totalAssignments: 8,
      },
      {
        id: "3",
        name: "Sarah Davis",
        email: "sarah@example.com",
        courseProgress: 78,
        averageScore: 85,
        lastActive: "30 minutes ago",
        alerts: [],
        timeSpent: 95,
        assignmentsCompleted: 6,
        totalAssignments: 8,
      },
    ],
    performanceData: [
      { week: "Week 1", classAverage: 75, topPerformer: 95, strugglingStudents: 45 },
      { week: "Week 2", classAverage: 78, topPerformer: 92, strugglingStudents: 52 },
      { week: "Week 3", classAverage: 82, topPerformer: 96, strugglingStudents: 58 },
      { week: "Week 4", classAverage: 85, topPerformer: 98, strugglingStudents: 62 },
    ],
  }

  const courseContentData = {
    lessons: [
      {
        id: "1",
        title: "Introduction to React Components",
        type: "video" as const,
        content:
          "Welcome to React! In this lesson, we'll explore the fundamental building blocks of React applications - components.\n\nComponents are reusable pieces of UI that can be composed together to build complex interfaces. Think of them as custom HTML elements that you can create and use throughout your application.\n\nKey concepts we'll cover:\n• What are React components\n• Functional vs Class components\n• JSX syntax and structure\n• Component composition\n• Best practices for component design\n\nBy the end of this lesson, you'll understand how to create your first React component and use it in your applications.",
        duration: "15 min",
        isCompleted: true,
      },
      {
        id: "2",
        title: "Props and Data Flow",
        type: "text" as const,
        content:
          'Props (short for properties) are how we pass data from parent components to child components in React.\n\nThink of props like function arguments - they allow you to customize how a component behaves and what it displays.\n\nExample:\n```jsx\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}!</h1>;\n}\n\n// Usage\n<Welcome name="Alice" />\n```\n\nImportant rules about props:\n• Props are read-only\n• Data flows down from parent to child\n• Props can be any JavaScript value\n• Use destructuring for cleaner code',
        duration: "12 min",
        isCompleted: false,
      },
      {
        id: "3",
        title: "State Management Basics",
        type: "video" as const,
        content: "State allows components to remember and update information over time.",
        duration: "18 min",
        isCompleted: false,
      },
    ],
    currentLessonIndex: 1,
  }

  const quizData = {
    title: "React Fundamentals Quiz",
    description: "Test your understanding of React basics including components, props, and state",
    questions: [
      {
        id: "1",
        question: "What is JSX in React?",
        options: [
          "A JavaScript library for styling",
          "A syntax extension for JavaScript that looks like HTML",
          "A database query language",
          "A CSS framework",
        ],
        correctAnswer: 1,
        explanation:
          "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.",
        topic: "JSX Basics",
      },
      {
        id: "2",
        question: "How do you pass data from a parent component to a child component?",
        options: ["Using state", "Using props", "Using context", "Using refs"],
        correctAnswer: 1,
        explanation: "Props are used to pass data from parent components to child components in React.",
        topic: "Props",
      },
      {
        id: "3",
        question: "Which hook is used to add state to functional components?",
        options: ["useEffect", "useContext", "useState", "useReducer"],
        correctAnswer: 2,
        explanation: "useState is the hook used to add state to functional components in React.",
        topic: "React Hooks",
      },
    ],
  }

  const demos = [
    {
      id: "learning-path",
      title: "Timeline Learning Path",
      description: "Interactive timeline showing course progression with status indicators",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "teacher-analytics",
      title: "Teacher Analytics Dashboard",
      description: "Comprehensive dashboard for monitoring student performance and engagement",
      icon: BarChart3,
      color: "bg-green-100 text-green-800",
    },
    {
      id: "content-viewer",
      title: "Course Content Viewer",
      description: "Clean interface for viewing lessons with integrated note-taking",
      icon: Video,
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "learning-style",
      title: "Learning Style Quiz",
      description: "Onboarding quiz to detect user's preferred learning style",
      icon: Brain,
      color: "bg-orange-100 text-orange-800",
    },
    {
      id: "quiz-interface",
      title: "Interactive Quiz",
      description: "Distraction-free quiz interface with progress tracking and results",
      icon: HelpCircle,
      color: "bg-pink-100 text-pink-800",
    },
  ]

  const renderDemo = () => {
    switch (activeDemo) {
      case "learning-path":
        return <TimelineLearningPath {...learningPathData} />
      case "teacher-analytics":
        return <TeacherAnalyticsDashboard {...teacherAnalyticsData} />
      case "content-viewer":
        return (
          <CourseContentViewer
            lessons={courseContentData.lessons}
            currentLessonIndex={courseContentData.currentLessonIndex}
            onLessonChange={(index) => console.log("Lesson changed to:", index)}
            onMarkComplete={(lessonId) => console.log("Marked complete:", lessonId)}
          />
        )
      case "learning-style":
        return <LearningStyleQuiz onComplete={(style) => console.log("Learning style:", style)} />
      case "quiz-interface":
        return (
          <QuizInterface
            {...quizData}
            onComplete={(results, score) => console.log("Quiz completed:", { results, score })}
          />
        )
      default:
        return null
    }
  }

  if (activeDemo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <Header user={user} />
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setActiveDemo(null)}>
              ← Back to Demo Gallery
            </Button>
          </div>
          {renderDemo()}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Header user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">EduMate UI Components Demo</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our comprehensive collection of educational UI components designed for modern learning platforms
            </p>
          </div>

          {/* Demo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demos.map((demo) => (
              <Card key={demo.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-3 rounded-lg ${demo.color}`}>
                      <demo.icon className="w-6 h-6" />
                    </div>
                    <Badge variant="outline">Interactive Demo</Badge>
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors">{demo.title}</CardTitle>
                  <CardDescription>{demo.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => setActiveDemo(demo.id)}>
                    View Demo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Overview */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">Component Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Responsive Design", description: "Works perfectly on all devices" },
                { title: "Accessibility", description: "WCAG compliant with screen reader support" },
                { title: "Dark Mode", description: "Built-in dark mode support" },
                { title: "Interactive", description: "Rich interactions and animations" },
              ].map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
