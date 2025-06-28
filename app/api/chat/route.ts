import { type NextRequest, NextResponse } from "next/server"

// Fallback responses for demo mode
const demoResponses = [
  "I'm currently in demo mode! To enable full AI functionality, please configure your Gemini API key in the environment variables. For now, I can help you explore the platform features.",
  "Hello! I'm your AI tutor in demo mode. While I can't access the full AI capabilities without a proper API key, I'm here to show you how the chat interface works!",
  "Great question! In a fully configured environment, I would use Google's Gemini AI to provide detailed, personalized responses. Right now, I'm running in demo mode.",
  "I'd love to help you learn! This is a demonstration of the chat interface. With a proper Gemini API key configured, I could provide comprehensive tutoring across all subjects.",
  "That's an interesting topic! In production mode with the Gemini API, I could give you detailed explanations, examples, and even quiz you on the material.",
  "I understand you're curious about that! In demo mode, I can show you how our conversation flows. With full AI enabled, I'd provide detailed, subject-specific guidance.",
  "Excellent question! When properly configured with the Gemini API, I can offer personalized learning experiences, practice problems, and detailed explanations across all academic subjects.",
  "I appreciate your engagement! This demo showcases our chat interface. With the full AI system, I'd adapt my teaching style to your learning preferences and provide comprehensive support.",
]

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    // Check if Gemini API key is configured
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_gemini_api_key_here") {
      // Return a contextual demo response
      let demoResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)]

      // Add some context based on the message
      if (message.toLowerCase().includes("math")) {
        demoResponse =
          "I'd love to help with math! In demo mode, I can show you how I'd structure a response. With full AI enabled, I could solve equations, explain concepts step-by-step, and create practice problems tailored to your level."
      } else if (message.toLowerCase().includes("science")) {
        demoResponse =
          "Science is fascinating! In production mode, I could explain complex scientific concepts, provide real-world examples, and help you understand everything from basic chemistry to advanced physics."
      } else if (message.toLowerCase().includes("history")) {
        demoResponse =
          "History is full of amazing stories! With the full AI system, I could provide detailed historical context, analyze events, and help you understand cause-and-effect relationships throughout time."
      }

      return NextResponse.json({
        response: demoResponse,
        isDemo: true,
      })
    }

    // Try to use Gemini API with the correct model and API version
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are an AI tutor helping students learn. Format your responses using single bullet points organized by categories. Be encouraging, clear, and educational.

IMPORTANT FORMATTING RULES:
- Use single bullet points (•) for each piece of information
- Organize information into clear categories with headers
- Keep each bullet point concise and focused
- Use categories like: Key Concepts, Examples, Practice Tips, Remember, etc.

Previous conversation:
${
  history
    ?.slice(-5)
    ?.map((msg: any) => `${msg.role === "user" ? "Student" : "Tutor"}: ${msg.content}`)
    .join("\n") || ""
}

Student: ${message}

Please provide a helpful, educational response formatted with single bullet points organized by categories:`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topP: 0.8,
              topK: 40,
              maxOutputTokens: 1024,
            },
          }),
        },
      )

      if (!response.ok) {
        const errorData = await response.text()
        console.error(`Gemini API error: ${response.status} - ${errorData}`)
        throw new Error(`Gemini API error: ${response.status}`)
      }

      const data = await response.json()
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response."

      return NextResponse.json({ response: text })
    } catch (apiError) {
      console.error("Gemini API Error:", apiError)

      // Fallback response for API errors
      return NextResponse.json({
        response:
          "I'm experiencing some technical difficulties connecting to the AI service. This might be due to an invalid API key or network issues. In a production environment, I would provide comprehensive tutoring assistance!",
        isDemo: true,
      })
    }
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json(
      {
        error: "Failed to process your message. Please try again.",
        isDemo: true,
      },
      { status: 500 },
    )
  }
}
