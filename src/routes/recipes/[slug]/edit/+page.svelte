<script lang="ts">
	import type { Recipe } from '$lib/assets/types/recipe.js';
	import RecipeEditForm from '$lib/RecipeEditForm.svelte';

	let { data, form } = $props();

	const recipe: Recipe = $derived(data);
</script>

<RecipeEditForm
	mode="edit"
	slug={data.slug}
	slugEditable={false}
	initialValue={form?.fields ?? recipe}
	errors={form?.errors}
/>
