import recipeJsonSchema from '$lib/assets/schemas/recipe.schema.json'
import { json } from '@sveltejs/kit'

export const GET = () => json(recipeJsonSchema);