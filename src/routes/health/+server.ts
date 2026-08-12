import { checkRecipeDatabase } from '$lib/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		await checkRecipeDatabase();
		return new Response(null, { status: 204 });
	} catch (error) {
		console.error('Recipe database health check failed', error);
		return new Response(null, { status: 503 });
	}
};