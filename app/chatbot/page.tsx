"use client"

import { Header } from "@/components/layout/header"
import { ChatInterface } from "@/components/ai-chatbot/chat-interface"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, MessageSquare, Mic, Zap } from "lucide-react"

export default function ChatbotPage() {
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  const features = [
    {
      icon: Bot,
      title: "Smart AI Assistant",
      description: "Advanced conversational AI for natural interactions",
    },
    {
      icon: MessageSquare,
      title: "Real-time Chat",
      description: "Instant responses with contextual understanding",
    },
    {
      icon: Mic,
      title: "Voice Input",
      description: "Speak your questions using voice recognition",
    },
    {
      icon: Zap,
      title: "Quick Suggestions",
      description: "Smart reply suggestions to continue conversations",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <Header user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4 dark:bg-purple-900 dark:text-purple-300">
              <Bot className="w-4 h-4 mr-2" />
              AI Chatbot Assistant
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Chat with AI Assistant</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have natural conversations with our AI assistant. Ask questions, get help, or just chat about anything
              you're curious about.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Features Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Capabilities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                          <feature.icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{feature.title}</h3>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Sample Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      🤔 Ask
                    </Badge>
                    <p className="text-sm text-muted-foreground">"Explain quantum physics in simple terms"</p>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      💡 Ask
                    </Badge>
                    <p className="text-sm text-muted-foreground">"Help me plan my study schedule"</p>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      🎯 Ask
                    </Badge>
                    <p className="text-sm text-muted-foreground">"What are the best learning strategies?"</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <ChatInterface user={user} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
