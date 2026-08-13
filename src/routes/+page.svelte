<script lang="ts">
	import type { Recipe } from '$lib/assets/types/recipe';
	import RecipeCard from '$lib/RecipeCard.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let query = $state<string>();

	let usableQuery = $derived(query?.toLowerCase().trim());

	const recipes: Recipe[] = $derived(
		usableQuery
			? data.recipes.filter(
					(r) =>
						r.title.toLowerCase().includes(usableQuery) ||
						r.slug.toLowerCase().includes(usableQuery) ||
						r.tags?.some((t) => t.toLowerCase().includes(usableQuery))
				)
			: data.recipes
	);
</script>

<h1>Recipes</h1>
<div class="controls">
	<input bind:value={query} placeholder="Search" />
</div>
<div class="recipes">
	{#each recipes as recipe}
		<RecipeCard {recipe} />
	{/each}
	<a class="new" href="/create" aria-label="Create recipe">
		<span class="circle" aria-hidden="true">+</span>
	</a>
</div>

<style>
	.controls {
		padding-bottom: 1em;
	}

	.recipes {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 22rem));
		gap: 1em;
	}

	.new {
		box-sizing: border-box;
		min-width: 0;
		display: grid;
		place-items: center;

		color: inherit;
		text-decoration: none;
		border-style: solid;
		border-radius: 3px;
	}

	.circle {
		display: grid;
		place-items: center;
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		background: #ddd;
		font-size: 2rem;
		font-weight: bold;
		line-height: 1;
	}
</style>
