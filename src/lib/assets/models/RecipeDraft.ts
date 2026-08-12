import type { Recipe } from "$lib/assets/types/recipe";
import type { IngredientDraft } from "$lib/assets/models/IngredientDraft";
import { toNutrition, type NutritionDraft } from "$lib/assets/models/NutritionDraft";

export type RecipeDraft = {
    slug?: string;
    title?: string;
    prepTime?: number;
    cookTime?: number;
    totalTime?: number;
    ingredients: IngredientDraft[];
    steps: string[];
    nutrition?: NutritionDraft;
    tags?: string[]
}

export const toRecipe = (draft: RecipeDraft): Recipe => {
    const ingredients = draft.ingredients.map((ingredient) => ({
        quantity: ingredient.quantity ?? 0,
        unit: ingredient.unit,
        name: ingredient.name
    }));

    const steps: Recipe['steps'] = draft.steps.length
        ? [draft.steps[0], ...draft.steps.slice(1)]
        : ['']

    const tags: Recipe['tags'] = draft.tags?.length
        ? [draft.tags[0], ...draft.tags.slice(1)]
        : undefined;

    return {
        slug: draft.slug ?? '',
        title: draft.title ?? '',
        ingredients: ingredients.length
            ? [ingredients[0], ...ingredients.slice(1)]
            : [{ quantity: 0, unit: '', name: '' }],
        steps: steps,
        prepTime: draft.prepTime,
        cookTime: draft.cookTime,
        totalTime: draft.totalTime,
        ...(draft.nutrition && { nutrition: toNutrition(draft.nutrition) }),
        tags
    };
};