"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Send,
  Settings,
  MessageSquare,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  Zap,
  Copy,
  Download,
  Trash2,
} from "lucide-react"
import { useGroq } from "@/hooks/use-groq"
import { GroqStatus } from "./groq-status"
import { useToast } from "@/hooks/use-toast"
import type { GroqMessage } from "@/lib/groq-client"

const GROQ_MODELS = [
  { id: "llama3-8b-8192", name: "Llama 3 8B", context: "8K" },
  { id: "llama3-70b-8192", name: "Llama 3 70B", context: "8K" },
  { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B", context: "32K" },
  { id: "gemma-7b-it", name: "Gemma 7B", context: "8K" },
]

const PRESET_PROMPTS = {
  chat: [
    "Explain quantum computing in simple terms",
    "What are the benefits of renewable energy?",
    "How does machine learning work?",
    "Describe the process of photosynthesis",
  ],
  tutor: [
    "Help me understand calculus derivatives",
    "Explain the causes of World War I",
    "What is the difference between DNA and RNA?",
    "How do I solve quadratic equations?",
  ],
  quiz: [
    "Create a 5-question quiz about the solar system",
    "Generate practice problems for algebra",
    "Make a quiz about European history",
    "Create questions about basic chemistry",
  ],
  concept: [
    "Break down the concept of gravity",
    "Explain how computers process information",
    "What is the water cycle?",
    "How does the human immune system work?",
  ],
}

export function GroqPlayground() {
  const [apiKey, setApiKey] = useState("")
  const [activeTab, setActiveTab] = useState("chat")
  const [messages, setMessages] = useState<GroqMessage[]>([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [streamingContent, setStreamingContent] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)

  // Model configuration
  const [selectedModel, setSelectedModel] = useState("llama3-8b-8192")
  const [temperature, setTemperature] = useState([0.7])
  const [maxTokens, setMaxTokens] = useState([1024])
  const [topP, setTopP] = useState([0.9])

  const { toast } = useToast()
  const { isLoading, error, sendMessage, streamMessage, clearError } = useGroq({
    apiKey,
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  const getSystemPrompt = (mode: string) => {
    switch (mode) {
      case "tutor":
        return "You are an expert AI tutor. Provide clear, educational explanations and help students understand complex topics. Break down concepts step by step and use examples when helpful."
      case "quiz":
        return "You are a quiz generator. Create educational questions and provide detailed explanations for answers. Focus on testing understanding rather than memorization."
      case "concept":
        return "You are a concept explainer. Break down complex ideas into simple, understandable parts. Use analogies and real-world examples to make concepts clear."
      default:
        return "You are a helpful AI assistant focused on education and learning."
    }
  }

  const handleSendMessage = async (useStreaming = false) => {
    if (!currentMessage.trim() || !apiKey) return

    const systemMessage: GroqMessage = {
      role: "system",
      content: getSystemPrompt(activeTab),
    }

    const userMessage: GroqMessage = {
      role: "user",
      content: currentMessage,
    }

    const conversationMessages = [systemMessage, ...messages, userMessage]

    setMessages((prev) => [...prev, userMessage])
    setCurrentMessage("")
    clearError()

    const config = {
      model: selectedModel,
      temperature: temperature[0],
      maxTokens: maxTokens[0],
      topP: topP[0],
    }

    if (useStreaming) {
      setIsStreaming(true)
      setStreamingContent("")

      await streamMessage(conversationMessages, config, (chunk) => {
        setStreamingContent((prev) => prev + chunk)
      })

      setIsStreaming(false)
      if (streamingContent) {
        setMessages((prev) => [...prev, { role: "assistant", content: streamingContent }])
        setStreamingContent("")
      }
    } else {
      await sendMessage(conversationMessages, config)
    }
  }

  const handlePresetPrompt = (prompt: string) => {
    setCurrentMessage(prompt)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied",
        description: "Text copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive",
      })
    }
  }

  const exportConversation = () => {
    const conversation = messages.map((msg) => `${msg.role}: ${msg.content}`).join("\n\n")
    const blob = new Blob([conversation], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `groq-conversation-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearConversation = () => {
    setMessages([])
    setStreamingContent("")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Configuration Panel */}
      <div className="lg:col-span-1 space-y-6">
        {/* API Key */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="api-key">Groq API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your Groq API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="model">Model</Label>
              <select
                id="model"
                className="w-full p-2 border rounded-md"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                {GROQ_MODELS.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name} ({model.context})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Temperature: {temperature[0]}</Label>
              <Slider value={temperature} onValueChange={setTemperature} max={2} min={0} step={0.1} className="mt-2" />
            </div>

            <div>
              <Label>Max Tokens: {maxTokens[0]}</Label>
              <Slider value={maxTokens} onValueChange={setMaxTokens} max={4096} min={1} step={1} className="mt-2" />
            </div>

            <div>
              <Label>Top P: {topP[0]}</Label>
              <Slider value={topP} onValueChange={setTopP} max={1} min={0} step={0.1} className="mt-2" />
            </div>
          </CardContent>
        </Card>

        {/* Status */}
        <GroqStatus apiKey={apiKey} />
      </div>

      {/* Main Chat Interface */}
      <div className="lg:col-span-3">
        <Card className="h-[700px] flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-500" />
                Groq LLM Playground
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={exportConversation} disabled={messages.length === 0}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm" onClick={clearConversation} disabled={messages.length === 0}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="tutor" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Tutor
                </TabsTrigger>
                <TabsTrigger value="quiz" className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Quiz
                </TabsTrigger>
                <TabsTrigger value="concept" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Concept
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Preset Prompts */}
            <div className="p-4 border-b bg-muted/30">
              <div className="flex flex-wrap gap-2">
                {PRESET_PROMPTS[activeTab as keyof typeof PRESET_PROMPTS].map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePresetPrompt(prompt)}
                    className="text-xs"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === "user" ? "bg-blue-600 text-white" : "bg-muted border"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <Badge variant={message.role === "user" ? "secondary" : "default"} className="mb-2">
                            {message.role === "user" ? "You" : "AI"}
                          </Badge>
                          <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                        </div>
                        {message.role === "assistant" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(message.content)}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Streaming Response */}
                {isStreaming && streamingContent && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg bg-muted border">
                      <Badge variant="default" className="mb-2">
                        AI (streaming...)
                      </Badge>
                      <div className="whitespace-pre-wrap text-sm">{streamingContent}</div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Error Display */}
            {error && (
              <div className="p-4 border-t">
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  placeholder={`Enter your ${activeTab} message...`}
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="min-h-[60px] resize-none"
                  disabled={!apiKey || isLoading || isStreaming}
                />
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => handleSendMessage(false)}
                    disabled={!currentMessage.trim() || !apiKey || isLoading || isStreaming}
                    size="sm"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleSendMessage(true)}
                    disabled={!currentMessage.trim() || !apiKey || isLoading || isStreaming}
                    variant="outline"
                    size="sm"
                  >
                    <Zap className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                <span>Press Enter to send, Shift+Enter for new line</span>
                <span>⚡ = Stream response</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
