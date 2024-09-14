import { NextRequest, NextResponse, userAgent } from 'next/server'

import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY })

const FoodItemSchema = z.object({
  original: z.string(), // Original food item name
  translated: z.string(), // Translated food item name
})

const FoodItemsResponseSchema = z.object({
  food_items: z.array(FoodItemSchema), // Array of food item objects
})

export async function POST(request: NextRequest) {
  const { browser, device } = userAgent(request)
  if (browser.name || !process.env.OPEN_AI_PROMPT) {
    throw new Error()
  }
  try {
    const { text, language } = await request.json()

    const systemPrompt = process.env.OPEN_AI_PROMPT.replace(
      'LANGUAGE',
      language,
    )

    const completion = await openai.beta.chat.completions.parse({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      response_format: zodResponseFormat(FoodItemsResponseSchema, 'food_items'),
    })

    return NextResponse.json(completion.choices[0].message.parsed?.food_items)
  } catch {
    return NextResponse.error
  }
}
