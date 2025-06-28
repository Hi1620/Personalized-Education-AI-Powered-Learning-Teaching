import { Header } from "@/components/layout/header"
import { ChatInterface } from "@/components/ai-tutor/chat-interface"

const user = {
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "/placeholder.svg?height=32&width=32",
}

export default function AITutorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Header user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AI Tutor</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Get personalized help with your studies from our AI-powered tutor
            </p>
          </div>

          <div className="h-[700px]">
            <ChatInterface />
          </div>
        </div>
      </main>
    </div>
  )
}
