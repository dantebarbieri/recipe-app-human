import { compileSchema, type SchemaNode } from "json-schema-library";
import fs from 'fs/promises';
import recipeJsonSchema from "$lib/assets/recipe.schema.json";
import { type Recipe } from '$lib/assets/recipe'


const getPathFromSlug = (slug: string): URL => {
    const RECIPES_PATH = './recipes'
    const filePath = new URL(`${RECIPES_PATH}/${slug}`, import.meta.url);
    return filePath
}

const schema: SchemaNode = compileSchema(recipeJsonSchema);

export const getRecipeFromDatabase = async (slug: string): Promise<Recipe> => {
    const path = getPathFromSlug(slug)

    try {
        const contents = await fs.readFile(path, { encoding: "utf-8" });

        const result = schema.validate(contents);

        if (result.valid) {
            return JSON.parse(contents) as Recipe;
        }

        for (let err in result.errors) {
            console.error(err);
        }
    } catch (err) {
        console.error(err);
    }

    throw "No valid Recipe Found";
}

export const setRecipeToDatabase = async (slug: string, recipe: Recipe): Promise<Recipe> => {
    const path = getPathFromSlug(slug)
    const data = JSON.stringify(recipe)

    const result = schema.validate(data);

    console.assert(result.valid, "recipe %s (%s) is not valid according to the schema!", recipe.title, recipe.slug);

    try {
        await fs.writeFile(path, data, { encoding: "utf-8" });
    } catch (err) {
        console.error(err);
        throw `Unable to Persist Recipe ${recipe.title} (${recipe.slug})`;
    }
}
