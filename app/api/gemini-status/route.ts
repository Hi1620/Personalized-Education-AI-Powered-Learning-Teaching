import { NextResponse } from "next/server"

export async function GET() {
  try {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_gemini_api_key_here") {
      return NextResponse.json({
        status: "disconnected",
        message: "Gemini API key not configured. Running in demo mode.",
        details: "Add GEMINI_API_KEY to enable full AI features",
      })
    }

    // Test the API connection
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
                  text: "Hello",
                },
              ],
            },
          ],
        }),
      },
    )

    if (response.ok) {
      return NextResponse.json({
        status: "connected",
        message: "Gemini AI",
        details: "Connected and ready",
      })
    } else {
      const errorData = await response.text()
      console.error("Gemini API error:", errorData)
      return NextResponse.json({
        status: "error",
        message: "Connection failed",
        details: "Check API key validity",
      })
    }
  } catch (error) {
    console.error("Error checking Gemini status:", error)
    return NextResponse.json({
      status: "error",
      message: "Connection failed",
      details: "Network or configuration error",
    })
  }
}
