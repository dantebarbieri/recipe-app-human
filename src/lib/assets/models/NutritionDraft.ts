import type { Nutrition } from "$lib/assets/types/nutrition";

export type NutritionDraft = {
    servings?: number;
    servingSize: {
        quantity?: number;
        unit?: string;
        weight?: number;
        weightUnit?: string;
    };
    calories?: number;
    fat: {
        total?: number;
        saturated?: number;
        trans?: number;
    };
    cholesterol?: number;
    sodium?: number;
    carbs: {
        total?: number;
        fiber?: number;
        sugars: {
            total?: number;
            added?: number;
        };
    };
    protein?: number;
}

export const EMPTY_NUTRITION: Nutrition = {
    servings: 0,
    servingSize: {
        quantity: 0,
        unit: '',
    },
    calories: 0,
    fat: {
        total: 0,
        saturated: 0,
        trans: 0,
    },
    cholesterol: 0,
    sodium: 0,
    carbs: {
        total: 0,
        fiber: 0,
        sugars: {
            total: 0,
            added: 0
        },
    },
    protein: 0,
}

export const toNutrition = (draft: NutritionDraft): Nutrition => ({
    servings: draft.servings ?? EMPTY_NUTRITION.servings,
    servingSize: {
        ...draft.servingSize,
        quantity: draft.servingSize.quantity ?? EMPTY_NUTRITION.servingSize.quantity,
        unit: draft.servingSize.unit ?? EMPTY_NUTRITION.servingSize.unit,
    },
    calories: draft.calories ?? EMPTY_NUTRITION.calories,
    fat: {
        total: draft.fat.total ?? EMPTY_NUTRITION.fat.total,
        saturated: draft.fat.saturated ?? EMPTY_NUTRITION.fat.saturated,
        trans: draft.fat.trans ?? EMPTY_NUTRITION.fat.trans,
    },
    cholesterol: draft.cholesterol ?? EMPTY_NUTRITION.cholesterol,
    sodium: draft.sodium ?? EMPTY_NUTRITION.sodium,
    carbs: {
        total: draft.carbs.total ?? EMPTY_NUTRITION.carbs.total,
        fiber: draft.carbs.fiber ?? EMPTY_NUTRITION.carbs.fiber,
        sugars: {
            total: draft.carbs.sugars.total ?? EMPTY_NUTRITION.carbs.sugars.total,
            added: draft.carbs.sugars.added ?? EMPTY_NUTRITION.carbs.sugars.added,
        }
    },
    protein: draft.protein ?? EMPTY_NUTRITION.protein,
})
