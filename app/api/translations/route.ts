import { NextRequest, NextResponse, userAgent } from 'next/server'
import { zodResponseFormat } from 'openai/helpers/zod'
import { openAIClient } from '@/src/config/openai'
import { FoodItemResponseSchema } from '@/src/typings'

export async function POST(request: NextRequest) {
  const { browser, device } = userAgent(request)
  if (browser.name || !process.env.OPEN_AI_PROMPT_TRANSLATE) {
    throw new Error()
  }
  try {
    const { text, language } = await request.json()

    const systemPrompt = process.env.OPEN_AI_PROMPT_TRANSLATE.replace(
      'LANGUAGE',
      language,
    )

    const completion = await openAIClient.beta.chat.completions.parse({
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
      response_format: zodResponseFormat(FoodItemResponseSchema, 'food_item'),
    })
    return NextResponse.json(completion.choices[0].message.parsed?.food_item)
  } catch {
    return NextResponse.error
  }
}
