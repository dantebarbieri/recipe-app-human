<script lang="ts">
	import type { Recipe } from '$lib/assets/types/recipe';

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
<h2 id="ingredients">Ingredients</h2>
<ul>
	{#each recipe.ingredients as ingredient}
		<li>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
	{/each}
</ul>
<h2 id="steps">Steps</h2>
<ol>
	{#each recipe.steps as step}
		<li>{step}</li>
	{/each}
</ol>
