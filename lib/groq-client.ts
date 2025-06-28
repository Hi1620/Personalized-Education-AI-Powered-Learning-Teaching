import Groq from "groq-sdk"

export interface GroqConfig {
  model: string
  temperature: number
  maxTokens: number
  topP: number
  stream?: boolean
}

export interface GroqMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export interface GroqResponse {
  content: string
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

class GroqClient {
  private client: Groq
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
    this.client = new Groq({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    })
  }

  async chat(messages: GroqMessage[], config: GroqConfig): Promise<GroqResponse> {
    try {
      const completion = await this.client.chat.completions.create({
        messages: messages,
        model: config.model,
        temperature: config.temperature,
        max_tokens: config.maxTokens,
        top_p: config.topP,
        stream: false,
      })

      const content = completion.choices[0]?.message?.content || ""

      return {
        content,
        usage: completion.usage
          ? {
              prompt_tokens: completion.usage.prompt_tokens,
              completion_tokens: completion.usage.completion_tokens,
              total_tokens: completion.usage.total_tokens,
            }
          : undefined,
      }
    } catch (error) {
      console.error("Groq API Error:", error)
      throw new Error(`Groq API Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  async *streamChat(messages: GroqMessage[], config: GroqConfig): AsyncGenerator<string, void, unknown> {
    try {
      const stream = await this.client.chat.completions.create({
        messages: messages,
        model: config.model,
        temperature: config.temperature,
        max_tokens: config.maxTokens,
        top_p: config.topP,
        stream: true,
      })

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || ""
        if (content) {
          yield content
        }
      }
    } catch (error) {
      console.error("Groq Streaming Error:", error)
      throw new Error(`Groq Streaming Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  async checkStatus(): Promise<{ status: "connected" | "error"; message: string }> {
    try {
      const testCompletion = await this.client.chat.completions.create({
        messages: [{ role: "user", content: "Hello" }],
        model: "llama3-8b-8192",
        max_tokens: 1,
      })

      if (testCompletion.choices[0]?.message) {
        return { status: "connected", message: "Groq API is working correctly" }
      } else {
        return { status: "error", message: "Unexpected response format" }
      }
    } catch (error) {
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }
}

export { GroqClient }
