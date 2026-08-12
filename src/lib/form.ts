import { fail, type ActionFailure } from "@sveltejs/kit";
import type { Recipe } from "$lib/assets/types/recipe";
import { setRecipeToDatabase } from "$lib/db";
import type { IngredientDraft } from "$lib/assets/models/IngredientDraft";
import { toRecipe, type RecipeDraft } from "$lib/assets/models/RecipeDraft";
import type { NutritionDraft } from "$lib/assets/models/NutritionDraft";
import type { Nutrition } from "$lib/assets/types/nutrition";

const resolveString = (value: FormDataEntryValue | null): string | undefined => typeof value === 'string' ? value : undefined

const resolveNumber = (value: string | undefined): number | undefined => {
    const number = value?.trim() ? (Number(value.trim())) : undefined;
    return Number.isFinite(number) ? number : undefined;
}

const getString = (data: FormData, name: string) => {
    const value = data.get(name);
    return resolveString(value);
};

const getNumber = (data: FormData, name: string) => {
    const value = getString(data, name);
    return resolveNumber(value);
};

const getStrings = (data: FormData, name: string): (string | undefined)[] => {
    const values = data.getAll(name);
    return values.map(resolveString);
};

const getNumbers = (data: FormData, name: string): (number | undefined)[] => {
    const values = data.getAll(name);
    return values.map(resolveString).map(resolveNumber);
};

const zipIngredients = (quantities: (number | undefined)[], units: (string | undefined)[], names: (string | undefined)[]): IngredientDraft[] =>
    Array(Math.max(quantities.length, units.length, names.length))
        .fill(undefined) // garbage value so length is max of arrays
        .map((_, i) => ({
            quantity: quantities ? quantities[i] : undefined,
            unit: units && units[i] !== undefined ? units[i].trim() : '',
            name: names && names[i] !== undefined ? names[i].trim() : ''
        }));

type ErrorCode = "invalid";

type RequiredErrorCode = ErrorCode | "missing";

type ingredientsCode = RequiredErrorCode;

type NutritionErrorCode = RequiredErrorCode | "weightUnitMismatch"

export type FormErrors = {
    slug?: RequiredErrorCode;
    title?: RequiredErrorCode;
    timings?: ErrorCode;
    ingredients?: ingredientsCode;
    steps?: RequiredErrorCode;
    nutrition?: NutritionErrorCode;
    tags?: ErrorCode;
}

export type FormSubmitResult = {
    fields: RecipeDraft;
    errors: FormErrors
}

const hasDefinedValue = (value: unknown): boolean => {
    if (value === undefined) return false;
    if (value === null || typeof value !== 'object') return true;

    return Object.values(value).some(hasDefinedValue);
};

export const isCompleteNutritionDraft = (
    draft: NutritionDraft
): draft is Nutrition =>
    [
        draft.servings,
        draft.servingSize.quantity,
        draft.servingSize.unit,
        draft.calories,
        draft.fat.total,
        draft.fat.saturated,
        draft.fat.trans,
        draft.cholesterol,
        draft.sodium,
        draft.carbs.total,
        draft.carbs.fiber,
        draft.carbs.sugars.total,
        draft.carbs.sugars.added,
        draft.protein
    ].every((value) => value !== undefined);

const parseFormData = (data: FormData): RecipeDraft => {
    const submittedSlug = getString(data, 'slug');
    const title = getString(data, 'title');
    const prepTime = getNumber(data, 'prepTime');
    const cookTime = getNumber(data, 'cookTime');
    const totalTime = getNumber(data, 'totalTime');
    const quantities = getNumbers(data, 'ingredient-qty');
    const units = getStrings(data, 'ingredient-unit');
    const names = getStrings(data, 'ingredient-name');
    const steps = getStrings(data, 'step');
    const ingredients: IngredientDraft[] = zipIngredients(quantities, units, names);
    const servings = getNumber(data, 'nutrition-servings');
    const servingSizeQuantity = getNumber(data, 'nutrition-servingSizeQuantity');
    const servingSizeUnit = getString(data, 'nutrition-servingSizeUnit');
    const servingSizeWeight = getNumber(data, 'nutrition-servingSizeWeight');
    const servingSizeWeightUnit = getString(data, 'nutrition-servingSizeWeightUnit');
    const calories = getNumber(data, 'nutrition-calories');
    const totalFat = getNumber(data, 'nutrition-totalFat');
    const saturatedFat = getNumber(data, 'nutrition-saturatedFat');
    const transFat = getNumber(data, 'nutrition-transFat');
    const cholesterol = getNumber(data, 'nutrition-cholesterol');
    const sodium = getNumber(data, 'nutrition-sodium');
    const totalCarbs = getNumber(data, 'nutrition-totalCarbs');
    const fiber = getNumber(data, 'nutrition-fiber');
    const totalSugars = getNumber(data, 'nutrition-totalSugars');
    const addedSugars = getNumber(data, 'nutrition-addedSugars');
    const protein = getNumber(data, 'nutrition-protein');
    const tags = getStrings(data, 'tag');
    const normalizedTags = (tags ?? [])
        .filter((tag): tag is string => tag !== undefined)
        .map((tag) => tag.trim())
        .filter(Boolean);

    const nutrition: NutritionDraft = {
        servings: servings,
        servingSize: {
            quantity: servingSizeQuantity,
            unit: servingSizeUnit ? servingSizeUnit.trim() : undefined,
            weight: servingSizeWeight,
            weightUnit: servingSizeWeightUnit?.trim() || undefined,
        },
        calories: calories,
        fat: {
            total: totalFat,
            saturated: saturatedFat,
            trans: transFat,
        },
        cholesterol: cholesterol,
        sodium: sodium,
        carbs: {
            total: totalCarbs,
            fiber: fiber,
            sugars: {
                total: totalSugars,
                added: addedSugars,
            },
        },
        protein: protein,
    }

    return {
        slug: submittedSlug,
        title: title !== undefined ? title.trim() : undefined,
        prepTime,
        cookTime,
        totalTime,
        ingredients,
        steps: steps ? steps.filter(s => s !== undefined).map(s => s.trim()) : [],
        nutrition: hasDefinedValue(nutrition) ? nutrition : undefined,
        tags: normalizedTags.length ? normalizedTags : undefined,
    }
}

const validateDraft = (draft: RecipeDraft): FormErrors => {
    let slug: RequiredErrorCode | undefined = undefined;
    let title: RequiredErrorCode | undefined = undefined;
    let timings: ErrorCode | undefined = undefined;
    let ingredients: ingredientsCode | undefined = undefined;
    let steps: RequiredErrorCode | undefined = undefined;
    let nutrition: NutritionErrorCode | undefined = undefined;
    let tags: ErrorCode | undefined = undefined;

    if (!draft.slug) {
        slug ??= 'missing';
    }

    if (!draft.slug?.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)) {
        slug ??= 'invalid';
    }

    if (!draft.title) {
        title ??= 'missing';
    }

    if (!draft.title?.trim()) {
        title ??= 'invalid'
    }

    if ((draft.prepTime !== undefined && draft.prepTime < 0) ||
        (draft.cookTime !== undefined && draft.cookTime <= 0) ||
        (draft.totalTime !== undefined && draft.totalTime <= 0) ||
        (draft.prepTime !== undefined && draft.totalTime !== undefined && draft.prepTime >= draft.totalTime) ||
        (draft.cookTime !== undefined && draft.totalTime !== undefined && draft.cookTime >= draft.totalTime) ||
        (draft.prepTime !== undefined && draft.cookTime !== undefined && draft.totalTime !== undefined && draft.prepTime + draft.cookTime > draft.totalTime)) {
        timings = 'invalid';
    }

    if (draft.ingredients.length === 0) {
        ingredients ??= 'missing'
    }

    if (draft.steps.length === 0) {
        steps ??= 'missing'
    }

    if (
        draft.ingredients.some(
            ({ quantity, unit, name }) =>
                quantity === undefined || !Number.isFinite(quantity) || quantity <= 0 || !unit.trim() || !name.trim()
        )
    ) {
        ingredients ??= 'invalid';
    }

    if (draft.steps?.some((step) => !step.trim())) {
        steps ??= 'invalid'
    }

    if (draft.nutrition) {
        if (!isCompleteNutritionDraft(draft.nutrition)) {
            nutrition ??= 'missing';
        } else {
            if (!draft.nutrition.servingSize.unit.trim()) {
                nutrition ??= 'invalid'
            }
            if (draft.nutrition.servingSize.weight !== undefined && draft.nutrition.servingSize.weight <= 0) {
                nutrition ??= 'invalid'
            }
            if (draft.nutrition.carbs.total < draft.nutrition.carbs.fiber + draft.nutrition.carbs.sugars.total) {
                nutrition ??= 'invalid'
            }
            if (draft.nutrition.carbs.sugars.total < draft.nutrition.carbs.sugars.added) {
                nutrition ??= 'invalid'
            }
            if (draft.nutrition.fat.total < draft.nutrition.fat.saturated + draft.nutrition.fat.trans) {
                nutrition ??= 'invalid'
            }
            if (draft.nutrition.servings <= 0 || draft.nutrition.servingSize.quantity <= 0) {
                nutrition ??= 'invalid'
            }
            const nonnegativeNutrients = [
                draft.nutrition.calories,
                draft.nutrition.fat.total,
                draft.nutrition.fat.saturated,
                draft.nutrition.fat.trans,
                draft.nutrition.cholesterol,
                draft.nutrition.sodium,
                draft.nutrition.carbs.total,
                draft.nutrition.carbs.fiber,
                draft.nutrition.carbs.sugars.total,
                draft.nutrition.carbs.sugars.added,
                draft.nutrition.protein
            ];

            if (nonnegativeNutrients.some((value) => value < 0)) {
                nutrition ??= 'invalid';
            }
            if ((draft.nutrition.servingSize.weight && !draft.nutrition.servingSize.weightUnit?.trim()) ||
                (!draft.nutrition.servingSize.weight && draft.nutrition.servingSize.weightUnit?.trim())) {
                nutrition ??= 'weightUnitMismatch';
            }
        }
    }

    if (draft.tags) {
        if (draft.tags.length !== (new Set(draft.tags)).size) {
            tags ??= 'invalid'
        }
    }

    return {
        slug,
        title,
        timings,
        ingredients,
        steps,
        nutrition,
        tags
    }
}

export const submit = async (data: FormData, authoritativeSlug?: string): Promise<ActionFailure<FormSubmitResult> | { slug: string }> => {
    const draft = parseFormData(data);
    const slug = authoritativeSlug ?? draft.slug;
    draft.slug = slug;
    const errors = validateDraft(draft);

    if (hasDefinedValue(errors)) {
        return fail(400, { fields: draft, errors })
    }

    const recipe: Recipe = toRecipe(draft);

    await setRecipeToDatabase(slug!, recipe);

    return { slug: slug! };
}