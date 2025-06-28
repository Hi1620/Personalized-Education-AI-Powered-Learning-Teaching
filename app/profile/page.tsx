import { Header } from "@/components/layout/header"
import { StudentProfilePage } from "@/components/student-profile/profile-page"

export default function ProfilePage() {
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  // Sample student profile data
  const studentProfile = {
    id: "student-001",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "/placeholder.svg?height=96&width=96",
    joinDate: "2023-09-15",
    learningStyle: "visual" as const,
    totalXP: 15750,
    currentLevel: 15,
    streak: 12,
    completedCourses: [
      {
        id: "course-1",
        title: "Introduction to React",
        category: "Programming",
        progress: 100,
        completedDate: "2024-01-15",
        rating: 5,
        thumbnail: "/placeholder.svg?height=48&width=48",
        instructor: "Sarah Chen",
        duration: "8 hours",
        certificate: true,
      },
      {
        id: "course-2",
        title: "JavaScript Fundamentals",
        category: "Programming",
        progress: 100,
        completedDate: "2024-01-08",
        rating: 4,
        thumbnail: "/placeholder.svg?height=48&width=48",
        instructor: "Mike Rodriguez",
        duration: "12 hours",
        certificate: true,
      },
      {
        id: "course-3",
        title: "UI/UX Design Principles",
        category: "Design",
        progress: 100,
        completedDate: "2023-12-20",
        rating: 5,
        thumbnail: "/placeholder.svg?height=48&width=48",
        instructor: "Emma Wilson",
        duration: "6 hours",
        certificate: false,
      },
      {
        id: "course-4",
        title: "Data Structures & Algorithms",
        category: "Computer Science",
        progress: 100,
        completedDate: "2023-12-10",
        rating: 4,
        thumbnail: "/placeholder.svg?height=48&width=48",
        instructor: "Dr. James Park",
        duration: "15 hours",
        certificate: true,
      },
    ],
    inProgressCourses: [
      {
        id: "course-5",
        title: "Advanced React Patterns",
        category: "Programming",
        progress: 65,
        thumbnail: "/placeholder.svg?height=48&width=48",
        instructor: "Sarah Chen",
        duration: "10 hours",
      },
      {
        id: "course-6",
        title: "Machine Learning Basics",
        category: "AI/ML",
        progress: 30,
        thumbnail: "/placeholder.svg?height=48&width=48",
        instructor: "Dr. Lisa Wang",
        duration: "20 hours",
      },
      {
        id: "course-7",
        title: "Mobile App Development",
        category: "Programming",
        progress: 45,
        thumbnail: "/placeholder.svg?height=48&width=48",
        instructor: "Carlos Martinez",
        duration: "14 hours",
      },
    ],
    achievements: [
      {
        id: "achievement-1",
        title: "First Course Complete",
        description: "Completed your first course successfully",
        icon: "trophy",
        category: "milestone" as const,
        earnedDate: "2023-12-10",
        rarity: "common" as const,
        xpReward: 100,
      },
      {
        id: "achievement-2",
        title: "Speed Learner",
        description: "Completed 3 courses in one month",
        icon: "zap",
        category: "learning" as const,
        earnedDate: "2024-01-15",
        rarity: "rare" as const,
        xpReward: 250,
      },
      {
        id: "achievement-3",
        title: "Streak Master",
        description: "Maintained a 10-day learning streak",
        icon: "flame",
        category: "milestone" as const,
        earnedDate: "2024-01-20",
        rarity: "epic" as const,
        xpReward: 500,
      },
      {
        id: "achievement-4",
        title: "Programming Prodigy",
        description: "Mastered 5 programming courses",
        icon: "crown",
        category: "special" as const,
        earnedDate: "2024-01-25",
        rarity: "legendary" as const,
        xpReward: 1000,
      },
      {
        id: "achievement-5",
        title: "Perfect Score",
        description: "Achieved 100% on a difficult quiz",
        icon: "star",
        category: "learning" as const,
        earnedDate: "2024-01-12",
        rarity: "rare" as const,
        xpReward: 300,
      },
      {
        id: "achievement-6",
        title: "Community Helper",
        description: "Helped 10 fellow students",
        icon: "award",
        category: "social" as const,
        earnedDate: "2024-01-18",
        rarity: "epic" as const,
        xpReward: 400,
      },
    ],
    learningTimes: [
      {
        day: "Monday",
        hours: ["9:00 AM", "2:00 PM"],
        isPreferred: true,
      },
      {
        day: "Tuesday",
        hours: ["10:00 AM"],
        isPreferred: false,
      },
      {
        day: "Wednesday",
        hours: ["9:00 AM", "2:00 PM", "7:00 PM"],
        isPreferred: true,
      },
      {
        day: "Thursday",
        hours: ["2:00 PM"],
        isPreferred: false,
      },
      {
        day: "Friday",
        hours: ["9:00 AM", "7:00 PM"],
        isPreferred: true,
      },
      {
        day: "Saturday",
        hours: ["10:00 AM", "3:00 PM"],
        isPreferred: true,
      },
      {
        day: "Sunday",
        hours: ["11:00 AM"],
        isPreferred: false,
      },
    ],
    stats: {
      totalHoursLearned: 156,
      averageSessionTime: 45,
      favoriteSubject: "Programming",
      weeklyGoal: 8,
      weeklyProgress: 6,
      monthlyXP: 2450,
      coursesThisMonth: 2,
    },
    preferences: {
      subjects: ["Programming", "Web Development", "UI/UX Design", "Data Science", "Mobile Development"],
      difficulty: "intermediate" as const,
      sessionLength: "medium" as const,
      notifications: true,
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Header user={user} />
      <main className="container mx-auto px-4 py-8">
        <StudentProfilePage profile={studentProfile} />
      </main>
    </div>
  )
}
