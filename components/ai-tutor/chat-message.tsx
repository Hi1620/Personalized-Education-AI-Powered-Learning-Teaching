"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, User } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" />
          <AvatarFallback className="bg-blue-100 dark:bg-blue-900">
            <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </AvatarFallback>
        </Avatar>
      )}

      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[80%]`}>
        <Card className={`${isUser ? "bg-blue-500 text-white" : "bg-muted"}`}>
          <CardContent className="p-3">
            <div className="text-sm whitespace-pre-wrap">{message.content}</div>
          </CardContent>
        </Card>
        <span className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(message.timestamp, { addSuffix: true })}
        </span>
      </div>

      {isUser && (
        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" />
          <AvatarFallback className="bg-green-100 dark:bg-green-900">
            <User className="w-4 h-4 text-green-600 dark:text-green-400" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
