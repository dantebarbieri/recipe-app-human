import type { PageServerLoad } from './$types';
import { listRecipesFromDatabase } from '$lib/db';

export const load: PageServerLoad = async () => {
    const recipes = await listRecipesFromDatabase();

    if (recipes) {
        return { recipes };
    }

    return { recipes: [] };
};