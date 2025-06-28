"use client"

import { useState, useCallback } from "react"
import { GroqClient, type GroqConfig, type GroqMessage, type GroqResponse } from "@/lib/groq-client"

interface UseGroqOptions {
  apiKey?: string
  onError?: (error: Error) => void
}

interface UseGroqReturn {
  isLoading: boolean
  error: string | null
  response: GroqResponse | null
  sendMessage: (messages: GroqMessage[], config: GroqConfig) => Promise<void>
  streamMessage: (messages: GroqMessage[], config: GroqConfig, onChunk: (chunk: string) => void) => Promise<void>
  checkStatus: () => Promise<{ status: "connected" | "error"; message: string }>
  clearError: () => void
  clearResponse: () => void
}

export function useGroq(options: UseGroqOptions = {}): UseGroqReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<GroqResponse | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const clearResponse = useCallback(() => {
    setResponse(null)
  }, [])

  const sendMessage = useCallback(
    async (messages: GroqMessage[], config: GroqConfig) => {
      if (!options.apiKey) {
        const errorMsg = "Groq API key is required"
        setError(errorMsg)
        if (options.onError) {
          options.onError(new Error(errorMsg))
        }
        return
      }

      setIsLoading(true)
      setError(null)
      setResponse(null)

      try {
        const client = new GroqClient(options.apiKey)
        const result = await client.chat(messages, config)
        setResponse(result)
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "An unknown error occurred"
        setError(errorMsg)
        if (options.onError) {
          options.onError(err instanceof Error ? err : new Error(errorMsg))
        }
      } finally {
        setIsLoading(false)
      }
    },
    [options.apiKey, options.onError],
  )

  const streamMessage = useCallback(
    async (messages: GroqMessage[], config: GroqConfig, onChunk: (chunk: string) => void) => {
      if (!options.apiKey) {
        const errorMsg = "Groq API key is required"
        setError(errorMsg)
        if (options.onError) {
          options.onError(new Error(errorMsg))
        }
        return
      }

      setIsLoading(true)
      setError(null)
      setResponse(null)

      try {
        const client = new GroqClient(options.apiKey)
        let fullContent = ""

        for await (const chunk of client.streamChat(messages, config)) {
          fullContent += chunk
          onChunk(chunk)
        }

        setResponse({ content: fullContent })
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "An unknown error occurred"
        setError(errorMsg)
        if (options.onError) {
          options.onError(err instanceof Error ? err : new Error(errorMsg))
        }
      } finally {
        setIsLoading(false)
      }
    },
    [options.apiKey, options.onError],
  )

  const checkStatus = useCallback(async () => {
    if (!options.apiKey) {
      return { status: "error" as const, message: "API key is required" }
    }

    try {
      const client = new GroqClient(options.apiKey)
      return await client.checkStatus()
    } catch (err) {
      return {
        status: "error" as const,
        message: err instanceof Error ? err.message : "Unknown error",
      }
    }
  }, [options.apiKey])

  return {
    isLoading,
    error,
    response,
    sendMessage,
    streamMessage,
    checkStatus,
    clearError,
    clearResponse,
  }
}
