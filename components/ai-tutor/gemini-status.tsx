"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react"

interface StatusResponse {
  status: "connected" | "disconnected" | "error" | "loading"
  message: string
  details: string
}

export function GeminiStatus() {
  const [status, setStatus] = useState<StatusResponse>({
    status: "loading",
    message: "Checking...",
    details: "Verifying connection",
  })

  const checkStatus = async () => {
    try {
      const response = await fetch("/api/gemini-status")
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      setStatus({
        status: "error",
        message: "Connection failed",
        details: "Unable to check status",
      })
    }
  }

  useEffect(() => {
    checkStatus()
    // Check status every 30 seconds
    const interval = setInterval(checkStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = () => {
    switch (status.status) {
      case "connected":
        return <CheckCircle className="w-3 h-3" />
      case "disconnected":
        return <AlertCircle className="w-3 h-3" />
      case "error":
        return <XCircle className="w-3 h-3" />
      case "loading":
        return <Loader2 className="w-3 h-3 animate-spin" />
      default:
        return <AlertCircle className="w-3 h-3" />
    }
  }

  const getStatusColor = () => {
    switch (status.status) {
      case "connected":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "disconnected":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "loading":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="flex flex-col space-y-1">
      <Badge variant="outline" className={`${getStatusColor()} flex items-center space-x-1 w-fit`}>
        {getStatusIcon()}
        <span className="text-xs font-medium">{status.message}</span>
      </Badge>
      <p className="text-xs text-muted-foreground">{status.details}</p>
    </div>
  )
}
