import { z } from 'zod'

export const FoodItemSchema = z.object({
  original: z.string(),
  translated: z.string(),
})

export const FoodItemsResponseSchema = z.object({
  food_items: z.array(FoodItemSchema),
})

export const FoodItemResponseSchema = z.object({
  food_item: FoodItemSchema,
})
