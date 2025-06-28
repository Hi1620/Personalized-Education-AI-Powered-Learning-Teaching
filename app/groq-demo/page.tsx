import { Header } from "@/components/layout/header"
import { GroqPlayground } from "@/components/groq-demo/groq-playground"

export default function GroqDemoPage() {
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Header user={user} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Groq LLM Playground</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experiment with Groq's lightning-fast LLM inference for educational applications
            </p>
          </div>
          <GroqPlayground />
        </div>
      </main>
    </div>
  )
}
