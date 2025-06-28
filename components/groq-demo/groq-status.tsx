"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, RefreshCw, Wifi, WifiOff } from "lucide-react"
import { useGroq } from "@/hooks/use-groq"

interface GroqStatusProps {
  apiKey?: string
}

export function GroqStatus({ apiKey }: GroqStatusProps) {
  const [lastChecked, setLastChecked] = useState<Date | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [status, setStatus] = useState<{ status: "connected" | "error"; message: string } | null>(null)

  const { checkStatus } = useGroq({ apiKey })

  const handleStatusCheck = async () => {
    setIsChecking(true)
    try {
      const result = await checkStatus()
      setStatus(result)
      setLastChecked(new Date())
    } catch (error) {
      setStatus({
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsChecking(false)
    }
  }

  useEffect(() => {
    if (apiKey) {
      handleStatusCheck()
    }
  }, [apiKey])

  const getStatusIcon = () => {
    if (isChecking) {
      return <RefreshCw className="h-4 w-4 animate-spin" />
    }
    if (!status) {
      return <WifiOff className="h-4 w-4" />
    }
    return status.status === "connected" ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-red-600" />
    )
  }

  const getStatusBadge = () => {
    if (isChecking) {
      return <Badge variant="secondary">Checking...</Badge>
    }
    if (!status) {
      return <Badge variant="secondary">Not checked</Badge>
    }
    return (
      <Badge variant={status.status === "connected" ? "default" : "destructive"}>
        {status.status === "connected" ? "Connected" : "Error"}
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          {getStatusIcon()}
          Groq API Status
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!apiKey ? (
          <Alert>
            <WifiOff className="h-4 w-4" />
            <AlertDescription>Please enter your Groq API key to check connection status.</AlertDescription>
          </Alert>
        ) : status ? (
          <Alert variant={status.status === "connected" ? "default" : "destructive"}>
            {status.status === "connected" ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
            <AlertDescription>{status.message}</AlertDescription>
          </Alert>
        ) : null}

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {lastChecked ? <>Last checked: {lastChecked.toLocaleTimeString()}</> : "Not checked yet"}
          </div>
          <Button variant="outline" size="sm" onClick={handleStatusCheck} disabled={!apiKey || isChecking}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isChecking ? "animate-spin" : ""}`} />
            Check Status
          </Button>
        </div>

        {status?.status === "connected" && (
          <div className="text-xs text-muted-foreground space-y-1">
            <div>✓ API key is valid</div>
            <div>✓ Connection established</div>
            <div>✓ Ready for requests</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
