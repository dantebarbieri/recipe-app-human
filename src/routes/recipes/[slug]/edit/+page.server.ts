import type { Actions, PageServerLoad } from './$types';
import { submit, type FormSubmitResult } from '$lib/form';
import { error, isActionFailure, redirect, type ActionFailure } from '@sveltejs/kit';
import { deleteRecipeFromDatabase, getRecipeFromDatabase } from '$lib/db';

export const load: PageServerLoad = async ({ params }) => {
    const recipe = await getRecipeFromDatabase(params.slug);

    if (recipe) {
        return recipe;
    }

    error(404, 'Not found');
};

export const actions = {
    save: async (event) => {
        const data = await event.request.formData();
        const result = await submit(data, event.params.slug);

        if (isActionFailure(result)) {
            return result as unknown as ActionFailure<FormSubmitResult>;
        }

        return redirect(303, `/recipes/${(result as { slug: string }).slug}`);
    },

    delete: async ({ params }) => {
        await deleteRecipeFromDatabase(params.slug);
        return redirect(303, '/');
    }
} satisfies Actions;