"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"

interface VoiceRecorderProps {
  isRecording: boolean
  onToggleRecording: () => void
  onTranscript: (transcript: string) => void
}

export function VoiceRecorder({ isRecording, onToggleRecording, onTranscript }: VoiceRecorderProps) {
  const [isSupported] = useState(() => {
    return typeof window !== "undefined" && "webkitSpeechRecognition" in window
  })

  const handleClick = () => {
    if (!isSupported) {
      alert("Speech recognition is not supported in your browser")
      return
    }

    if (isRecording) {
      onToggleRecording()
    } else {
      // Start recording
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onstart = () => {
        onToggleRecording()
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        onTranscript(transcript)
        onToggleRecording()
      }

      recognition.onerror = () => {
        onToggleRecording()
      }

      recognition.onend = () => {
        onToggleRecording()
      }

      recognition.start()
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className={`p-1 h-8 w-8 ${isRecording ? "text-red-500" : "text-gray-500"}`}
    >
      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
    </Button>
  )
}
