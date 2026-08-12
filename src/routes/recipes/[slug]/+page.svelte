<script lang="ts">
	import type { Recipe } from '$lib/assets/types/recipe';
	import NutritionLabel from '$lib/NutritionLabel.svelte';
	import RecipePage from '$lib/RecipePage.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

	const recipe: Recipe = $derived(data);
</script>

<RecipePage {recipe} />
{#if recipe.nutrition}
	<NutritionLabel nutrition={recipe.nutrition} />
{/if}
