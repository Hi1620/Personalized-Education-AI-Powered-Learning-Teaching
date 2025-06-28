import { GoogleGenerativeAI } from "@google/generative-ai"

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables")
}

export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-pro",
  generationConfig: {
    temperature: 0.7,
    topP: 0.8,
    topK: 40,
    maxOutputTokens: 1024,
  },
})

export async function checkGeminiStatus(): Promise<boolean> {
  try {
    const result = await geminiModel.generateContent("Hello")
    return true
  } catch (error) {
    console.error("Gemini API status check failed:", error)
    return false
  }
}
