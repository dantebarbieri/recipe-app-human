import { compileSchema, type SchemaNode } from "json-schema-library";
import fs, { constants } from 'fs/promises';
import nutritionJsonSchema from '$lib/assets/schemas/nutrition.schema.json';
import recipeJsonSchema from "$lib/assets/schemas/recipe.schema.json";
import { type Recipe } from '$lib/assets/types/recipe'
import { env } from "$env/dynamic/private";
import path from "path";
import { dev } from "$app/environment";

const getDatabasePath = (): string => {
    const configuredPath = env.RECIPE_DATA_DIR;

    if (configuredPath) {
        return path.resolve(configuredPath);
    }

    if (dev) {
        return path.resolve('src/lib/recipes');
    }

    throw new Error('RECIPE_DATA_DIR must be configured in production');
};

const getPathFromSlug = (slug: string): string => {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        throw new Error(`Invalid recipe slug: ${slug}`);
    }

    return path.join(getDatabasePath(), `${slug}.json`);
};

const schema: SchemaNode = compileSchema(recipeJsonSchema, {
    remotes: [nutritionJsonSchema],
    throwOnInvalidRef: true
});

export const checkRecipeDatabase = async (): Promise<void> => {
    const directory = getDatabasePath();

    await fs.access(directory, constants.R_OK | constants.W_OK);
    await fs.readdir(directory);
};

export const deleteRecipeFromDatabase = async (slug: string): Promise<void> => {
	await fs.unlink(getPathFromSlug(slug));
};

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

export const listRecipesFromDatabase = async (): Promise<Recipe[]> => {
    const recipes: Recipe[] = [];

    const files = await fs.readdir(getDatabasePath(), {
        withFileTypes: true
    });

    for (const file of files) {
        if (!file.isFile() || path.extname(file.name) !== '.json') continue;

        const recipe = await getRecipeFromDatabase(
            path.basename(file.name, '.json')
        );

        if (recipe) recipes.push(recipe);
    }

    return recipes;
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
