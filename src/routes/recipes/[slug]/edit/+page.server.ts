import type { Actions, PageServerLoad } from './$types';
import { submit, type FormSubmitResult } from '$lib/form';
import { error, isActionFailure, redirect, type ActionFailure } from '@sveltejs/kit';
import { getRecipeFromDatabase } from '$lib/db';

export const load: PageServerLoad = async ({ params }) => {
    const recipe = await getRecipeFromDatabase(params.slug);

    if (recipe) {
        return recipe;
    }

    error(404, 'Not found');
};

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();
        const slug = event.params.slug;

        const result = await submit(data, slug);

        if (isActionFailure(result)) {
            return result as unknown as ActionFailure<FormSubmitResult>;
        } else {
            const savedSlug = (result as { slug: string }).slug;
            return redirect(303, `/recipes/${savedSlug}`);
        }
    }
} satisfies Actions;