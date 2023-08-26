import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_API_KEY}`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const response = await axios.post(API_URL, body)
    return NextResponse.json(response.data)
  } catch {
    return NextResponse.error
  }
}
