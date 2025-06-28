"use client"

import { Button } from "@/components/ui/button"

interface QuickSuggestionsProps {
  suggestions: string[]
  onSuggestionClick: (suggestion: string) => void
  disabled?: boolean
}

export function QuickSuggestions({ suggestions, onSuggestionClick, disabled }: QuickSuggestionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onSuggestionClick(suggestion)}
          disabled={disabled}
          className="text-xs bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600"
        >
          {suggestion}
        </Button>
      ))}
    </div>
  )
}
