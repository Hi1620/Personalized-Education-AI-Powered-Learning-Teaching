"use client"

import { Header } from "@/components/layout/header"
import { StudentDashboard } from "@/components/student-dashboard"

export default function DashboardPage() {
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    level: "Intermediate",
    xp: 2450,
    nextLevelXp: 3000,
  }

  return (
    <div className="min-h-screen">
      <Header user={user} />
      <StudentDashboard user={user} />
    </div>
  )
}
