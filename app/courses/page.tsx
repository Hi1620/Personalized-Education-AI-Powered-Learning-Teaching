"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { CourseCard } from "@/components/education/course-card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, BookOpen, Clock, Star } from "lucide-react"
import type { Course } from "@/types"

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")

  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  const courses: Course[] = [
    {
      id: "1",
      title: "Advanced React Development",
      description: "Master React with hooks, context, and advanced patterns for building scalable applications.",
      instructor: "Sarah Chen",
      duration: "12 hours",
      level: "Advanced",
      category: "Programming",
      rating: 4.8,
      studentsCount: 15420,
      price: 89,
      isEnrolled: true,
      progress: 75,
    },
    {
      id: "2",
      title: "Machine Learning Fundamentals",
      description: "Learn the basics of machine learning, from linear regression to neural networks.",
      instructor: "Dr. Michael Park",
      duration: "20 hours",
      level: "Intermediate",
      category: "Data Science",
      rating: 4.9,
      studentsCount: 8930,
      price: 129,
      isEnrolled: true,
      progress: 45,
    },
    {
      id: "3",
      title: "UI/UX Design Principles",
      description: "Create beautiful and user-friendly interfaces with modern design principles.",
      instructor: "Emma Wilson",
      duration: "8 hours",
      level: "Beginner",
      category: "Design",
      rating: 4.7,
      studentsCount: 12340,
      price: 69,
      isEnrolled: false,
    },
    {
      id: "4",
      title: "Python for Data Analysis",
      description: "Analyze data with Python using pandas, numpy, and matplotlib libraries.",
      instructor: "James Rodriguez",
      duration: "15 hours",
      level: "Intermediate",
      category: "Data Science",
      rating: 4.6,
      studentsCount: 9870,
      price: 99,
      isEnrolled: false,
    },
    {
      id: "5",
      title: "Digital Marketing Strategy",
      description: "Build effective marketing campaigns across digital channels and platforms.",
      instructor: "Lisa Thompson",
      duration: "10 hours",
      level: "Beginner",
      category: "Marketing",
      rating: 4.5,
      studentsCount: 6540,
      price: 79,
      isEnrolled: false,
    },
    {
      id: "6",
      title: "Cloud Computing with AWS",
      description: "Deploy and manage applications on Amazon Web Services cloud platform.",
      instructor: "David Kim",
      duration: "18 hours",
      level: "Advanced",
      category: "Cloud",
      rating: 4.8,
      studentsCount: 7230,
      price: 149,
      isEnrolled: false,
    },
  ]

  const categories = ["All", "Programming", "Data Science", "Design", "Marketing", "Cloud"]
  const levels = ["All", "Beginner", "Intermediate", "Advanced"]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  const enrolledCourses = courses.filter((course) => course.isEnrolled)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Header user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Courses</h1>
            <p className="text-gray-600 dark:text-gray-300">Discover and learn from our comprehensive course library</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Courses</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{courses.length}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Enrolled</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{enrolledCourses.length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Rating</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">4.7</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>

                {/* Level Filter */}
                <div className="flex flex-wrap gap-2">
                  {levels.map((level) => (
                    <Badge
                      key={level}
                      variant={selectedLevel === level ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedLevel(level)}
                    >
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEnroll={(courseId) => console.log("Enroll in course:", courseId)}
                onContinue={(courseId) => console.log("Continue course:", courseId)}
              />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No courses found</h3>
              <p className="text-gray-600 dark:text-gray-300">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
