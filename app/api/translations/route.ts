import axios from 'axios'
import { NextRequest, NextResponse, userAgent } from 'next/server'

const API_URL = `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_API_KEY}`

export async function POST(request: NextRequest) {
  const { browser, device } = userAgent(request)
  if (browser.name) {
    throw new Error()
  }
  try {
    const body = await request.json()
    const response = await axios.post(API_URL, body)
    return NextResponse.json(response.data)
  } catch {
    return NextResponse.error
  }
}
