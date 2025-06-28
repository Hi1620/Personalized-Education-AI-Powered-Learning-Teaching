export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "student" | "teacher" | "admin"
  joinedAt: Date
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  category: string
  thumbnail: string
  rating: number
  studentsEnrolled: number
  price: number
  lessons: Lesson[]
  progress?: number
}

export interface Lesson {
  id: string
  title: string
  description: string
  duration: string
  type: "video" | "text" | "quiz" | "assignment"
  content: string
  isCompleted: boolean
  videoUrl?: string
  resources?: Resource[]
}

export interface Resource {
  id: string
  title: string
  type: "pdf" | "link" | "document"
  url: string
}

export interface Quiz {
  id: string
  title: string
  description: string
  questions: Question[]
  timeLimit?: number
  passingScore: number
}

export interface Question {
  id: string
  question: string
  type: "multiple-choice" | "true-false" | "short-answer"
  options?: string[]
  correctAnswer: string | number
  explanation?: string
}

export interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  isTyping?: boolean
}

export interface LearningPath {
  id: string
  title: string
  description: string
  courses: Course[]
  estimatedDuration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  progress: number
}
