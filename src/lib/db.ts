import { compileSchema, type SchemaNode } from "json-schema-library";
import fs from 'fs/promises';
import nutritionJsonSchema from '$lib/assets/schemas/nutrition.schema.json';
import recipeJsonSchema from "$lib/assets/schemas/recipe.schema.json";
import { type Recipe } from '$lib/assets/types/recipe'

const getDatabasePath = (): URL => new URL('recipes/', import.meta.url);

const getPathFromSlug = (slug: string): URL => new URL(`${slug}.json`, getDatabasePath());

const schema: SchemaNode = compileSchema(recipeJsonSchema, {
    remotes: [nutritionJsonSchema],
    throwOnInvalidRef: true
});

export const getRecipeFromDatabase = async (slug: string): Promise<Recipe | undefined> => {
    const path = getPathFromSlug(slug)

    try {
        const contents = await fs.readFile(path, { encoding: "utf-8" });

        const possibleRecipe = JSON.parse(contents) as unknown;

        const result = schema.validate(possibleRecipe);

        if (result.valid) {
            const recipe = possibleRecipe as Recipe;
            return recipe;
        }

        for (const err of result.errors) {
            console.error(err);
        }
    } catch (err) {
        console.error(err);
    }

    return undefined;
}

const removeExtension = (s: string) => s.substring(0, s.lastIndexOf('.'));

export const listRecipesFromDatabase = async (): Promise<Recipe[]> => {
    const path = getDatabasePath()
    const retval: Recipe[] = [];

    try {
        const contents = await fs.readdir(path, { encoding: "utf-8", withFileTypes: true });

        for (const file of contents) {
            try {
                const recipe = await getRecipeFromDatabase(removeExtension(file.name))
                if (recipe)
                    retval.push(recipe);
            }
            catch {
                console.error(file);
            }
        }
    } catch (err) {
        console.error(err);
    }

    return retval;
}

export const setRecipeToDatabase = async (slug: string, recipe: Recipe): Promise<void> => {
    const path = getPathFromSlug(slug)

    const result = schema.validate(recipe);

    if (!result.valid) {
        throw new Error(
            `Recipe ${recipe.title} (${recipe.slug}) failed schema validation: ${JSON.stringify(result.errors)}`
        );
    }

    try {
        await fs.writeFile(path, JSON.stringify(recipe), { encoding: "utf-8" });
    } catch (err) {
        console.error(err);
        throw new Error(`Unable to Persist Recipe ${recipe.title} (${recipe.slug})`);
    }
}
