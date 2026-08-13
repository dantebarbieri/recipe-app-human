<script lang="ts">
	import type { Recipe } from '$lib/assets/types/recipe';
	import { formatTime, toVulgar, vulgarString } from '$lib/util';

	interface Props {
		recipe: Recipe;
	}

	const { recipe }: Props = $props();
</script>

<h1 id="title">{recipe.title}</h1>
{#if recipe.tags && recipe.tags.length > 0}
	<div class="tags">
		Tags:
		{#each recipe.tags as tag, index}
			<span class="tag">{tag}</span>{#if recipe.tags.length > 2 && index !== recipe.tags.length - 1},{/if}
			{#if index === recipe.tags.length - 2}
				and{' '}
			{/if}
		{/each}
	</div>
{/if}
{#if recipe.prepTime || recipe.cookTime || recipe.totalTime}
	<table class="timings">
		<thead>
			<tr>
				{#if recipe.prepTime}<th scope="col">Prep Time</th>{/if}
				{#if recipe.cookTime}<th scope="col">Cook Time</th>{/if}
				{#if recipe.totalTime}<th scope="col">Total Time</th>{/if}
			</tr>
		</thead>
		<tbody>
			<tr>
				{#if recipe.prepTime}<td>{formatTime(recipe.prepTime)}</td>{/if}
				{#if recipe.cookTime}<td>{formatTime(recipe.cookTime)}</td>{/if}
				{#if recipe.totalTime}<td>{formatTime(recipe.totalTime)}</td>{/if}
			</tr>
		</tbody>
	</table>
{/if}
<h2 id="ingredients">Ingredients</h2>
<ul>
	{#each recipe.ingredients as ingredient}
		{const vulgar = toVulgar(ingredient.quantity)}
		<li>{vulgar ? vulgarString(vulgar) : ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
	{/each}
</ul>
<h2 id="steps">Steps</h2>
<ol>
	{#each recipe.steps as step}
		<li>{step}</li>
	{/each}
</ol>
