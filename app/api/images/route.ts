import axios from 'axios'
import { NextRequest, NextResponse, userAgent } from 'next/server'

const API_URL = 'https://www.googleapis.com/customsearch/v1?'

export async function GET(request: NextRequest) {
  const { browser, device } = userAgent(request)
  if (browser.name || device.type !== 'mobile') {
    throw new Error()
  }
  try {
    const params = {
      key: process.env.GOOGLE_API_KEY,
      cx: process.env.SEARCH_ENGINE_ID,
      q: request.nextUrl.searchParams.get('q'),
      searchType: request.nextUrl.searchParams.get('searchType'),
    }
    const response = await axios.get(API_URL, { params })
    return NextResponse.json(response.data)
  } catch {
    return NextResponse.error
  }
}
