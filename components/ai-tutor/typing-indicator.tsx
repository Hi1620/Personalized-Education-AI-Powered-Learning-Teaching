"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Bot } from "lucide-react"

export function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <Avatar className="w-8 h-8">
        <AvatarFallback className="bg-blue-100 dark:bg-blue-900">
          <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-start max-w-[80%]">
        <Card className="bg-muted">
          <CardContent className="p-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </CardContent>
        </Card>
        <span className="text-xs text-muted-foreground mt-1">AI is typing...</span>
      </div>
    </div>
  )
}
