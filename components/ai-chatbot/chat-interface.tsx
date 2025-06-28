"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, Sparkles } from "lucide-react"
import { MessageBubble } from "./message-bubble"
import { QuickSuggestions } from "./quick-suggestions"
import { TypingIndicator } from "./typing-indicator"
import { VoiceRecorder } from "./voice-recorder"

export interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  suggestions?: string[]
}

interface ChatInterfaceProps {
  user?: {
    name: string
    avatar?: string
  }
  className?: string
}

export function ChatInterface({
  user = { name: "You", avatar: "/placeholder.svg?height=32&width=32" },
  className = "",
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content:
        "Hi! I'm your AI tutor. I'm here to help you learn anything you'd like. What subject interests you today?",
      role: "assistant",
      timestamp: new Date(),
      suggestions: ["Math help", "Science questions", "History topics", "Programming basics"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = async (userMessage: string): Promise<ChatMessage> => {
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000))

    const lowerMessage = userMessage.toLowerCase()
    let content = ""
    let suggestions: string[] = []

    if (lowerMessage.includes("math") || lowerMessage.includes("calculate") || lowerMessage.includes("equation")) {
      content =
        "Great! I love helping with math. Whether it's algebra, geometry, calculus, or basic arithmetic, I can break down problems step by step. What specific math topic would you like to explore?"
      suggestions = ["Explain more", "Give an example", "Test me", "Show steps"]
    } else if (
      lowerMessage.includes("science") ||
      lowerMessage.includes("physics") ||
      lowerMessage.includes("chemistry")
    ) {
      content =
        "Science is fascinating! From the tiniest atoms to the vastness of space, there's so much to discover. I can help explain scientific concepts, discuss experiments, or explore how science applies to everyday life."
      suggestions = ["Explain more", "Give an example", "Test me", "Real-world uses"]
    } else if (lowerMessage.includes("history")) {
      content =
        "History helps us understand how we got to where we are today! I can discuss historical events, analyze their causes and effects, or explore different time periods and civilizations."
      suggestions = ["Explain more", "Give an example", "Test me", "Timeline"]
    } else if (
      lowerMessage.includes("programming") ||
      lowerMessage.includes("code") ||
      lowerMessage.includes("coding")
    ) {
      content =
        "Programming is like learning a new language to communicate with computers! I can help with concepts, syntax, debugging, or building projects. What programming language interests you?"
      suggestions = ["Explain more", "Give an example", "Test me", "Practice problems"]
    } else if (lowerMessage.includes("explain more")) {
      content =
        "Let me dive deeper into this topic. I'll break it down into smaller, more manageable parts and provide additional context to help you understand the underlying principles and connections."
      suggestions = ["Give an example", "Test me", "Simplify this", "Related topics"]
    } else if (lowerMessage.includes("give an example") || lowerMessage.includes("example")) {
      content =
        "Here's a practical example to illustrate this concept:\n\n**Example:** Let's say we're learning about photosynthesis. Think of a plant like a solar-powered factory. The leaves are like solar panels that capture sunlight, the roots are like supply trucks bringing in water, and the plant combines these with carbon dioxide from the air to make its own food (glucose) and release oxygen as a bonus!\n\nThis process is essential for life on Earth because it produces the oxygen we breathe."
      suggestions = ["Explain more", "Test me", "Another example", "How it works"]
    } else if (lowerMessage.includes("test me") || lowerMessage.includes("quiz")) {
      content =
        "Perfect! I love helping students test their knowledge. Here's a question for you:\n\n**Question:** If a plant needs sunlight, water, and carbon dioxide for photosynthesis, what do you think would happen if one of these ingredients was missing?\n\nTake your time to think about it, and let me know your answer!"
      suggestions = ["Give a hint", "Explain the answer", "Another question", "Too easy"]
    } else {
      content =
        "That's an interesting question! I'm here to help you learn and understand any topic. Could you tell me more about what you'd like to explore? I can explain concepts, provide examples, create practice questions, or discuss how topics connect to real life."
      suggestions = ["Explain more", "Give an example", "Test me", "Study tips"]
    }

    return {
      id: Date.now().toString(),
      content,
      role: "assistant",
      timestamp: new Date(),
      suggestions,
    }
  }

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: content.trim(),
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const aiResponse = await generateAIResponse(content)
      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      console.error("Error generating AI response:", error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        role: "assistant",
        timestamp: new Date(),
        suggestions: ["Try again", "Ask something else"],
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion)
  }

  const handleVoiceInput = (transcript: string) => {
    setInputValue(transcript)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  return (
    <Card className={`flex flex-col h-[600px] w-full max-w-4xl mx-auto shadow-lg ${className}`}>
      {/* Chat Header */}
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 pb-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 ring-2 ring-blue-200">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Tutor</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Online • Ready to help</span>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
        </div>
      </CardHeader>

      {/* Messages Area */}
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 custom-scrollbar">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                <MessageBubble message={message} userAvatar={user.avatar} userName={user.name} />
                {message.role === "assistant" && message.suggestions && (
                  <div className="mt-3 ml-12">
                    <QuickSuggestions
                      suggestions={message.suggestions}
                      onSuggestionClick={handleSuggestionClick}
                      disabled={isLoading}
                    />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="ml-12">
                <TypingIndicator />
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t bg-gray-50 dark:bg-gray-900 p-4">
          <form onSubmit={handleSubmit} className="flex items-end space-x-2">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="pr-12 py-3 text-base bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <VoiceRecorder
                  isRecording={isRecording}
                  onToggleRecording={toggleRecording}
                  onTranscript={handleVoiceInput}
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              size="lg"
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press and hold the microphone to record voice messages
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
