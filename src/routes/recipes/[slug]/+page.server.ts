import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getRecipeFromDatabase } from '$lib/db';

export const load: PageServerLoad = async ({ params }) => {
	const recipe = await getRecipeFromDatabase(params.slug);

	if (recipe) {
		return recipe;
	}

	error(404, 'Not found');
};