"use client"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { LandingPage } from "@/components/landing-page"

const mockUser = {
  id: "1",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "/placeholder.svg?height=32&width=32",
  role: "student" as const,
  joinedAt: new Date(),
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header user={mockUser} />
      <main className="flex-1">
        <LandingPage />
      </main>
      <Footer />
    </div>
  )
}
