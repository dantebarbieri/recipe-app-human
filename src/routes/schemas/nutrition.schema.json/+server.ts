import nutritionJsonSchema from '$lib/assets/schemas/nutrition.schema.json'
import { json } from '@sveltejs/kit'

export const GET = () => json(nutritionJsonSchema);