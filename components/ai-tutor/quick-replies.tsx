"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, HelpCircle, Lightbulb, Calculator, Beaker, Globe } from "lucide-react"

interface QuickRepliesProps {
  onReply: (reply: string) => void
  disabled?: boolean
}

const quickReplies = [
  {
    text: "Explain this concept",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300",
  },
  {
    text: "Give me an example",
    icon: Lightbulb,
    color: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300",
  },
  {
    text: "Test my knowledge",
    icon: HelpCircle,
    color: "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300",
  },
  {
    text: "Help with math",
    icon: Calculator,
    color: "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300",
  },
  {
    text: "Science question",
    icon: Beaker,
    color: "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-300",
  },
  {
    text: "History topic",
    icon: Globe,
    color: "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300",
  },
]

export function QuickReplies({ onReply, disabled = false }: QuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {quickReplies.map((reply, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onReply(reply.text)}
          disabled={disabled}
          className={`${reply.color} border-0`}
        >
          <reply.icon className="w-3 h-3 mr-1" />
          {reply.text}
        </Button>
      ))}
    </div>
  )
}
