<script lang="ts">
	import type { Recipe } from '$lib/assets/types/recipe';
	import RecipeCard from '$lib/RecipeCard.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const recipes: Recipe[] = $derived(data.recipes);
</script>

<h1>Recipes</h1>
<div class="recipes">
{#each recipes as recipe}
	<RecipeCard {recipe} />
{/each}
</div>

<style>
    .recipes {
        display: flex;
        gap: 1em;
    }
</style>
