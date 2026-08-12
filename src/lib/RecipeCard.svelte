<script lang="ts">
	import type { Recipe } from '$lib/assets/types/recipe';
	import { roundCalories } from '$lib/util';

	interface Props {
		recipe: Recipe;
	}

	const { recipe }: Props = $props();
</script>

<a href="/recipes/{recipe.slug}">
	<article class="recipe-card">
		<h2 class="title">{recipe.title}</h2>
		{#if recipe.prepTime || recipe.cookTime || recipe.totalTime}
			<div class="timing">
				{#if recipe.prepTime}
					<label for="prep-time--{recipe.slug}">
						Prep Time<br />
						<span id="prep-time--{recipe.slug}">{recipe.prepTime}</span>
						minutes
					</label>
				{/if}
				{#if recipe.cookTime}
					<label for="cook-time--{recipe.slug}">
						Cook Time<br />
						<span id="cook-time--{recipe.slug}">{recipe.cookTime}</span>
						minutes
					</label>
				{/if}
				{#if recipe.totalTime}
					<label for="total-time--{recipe.slug}">
						Total Time<br />
						<span id="total-time--{recipe.slug}">{recipe.totalTime}</span>
						minutes
					</label>
				{/if}
			</div>
		{/if}
		<div class="metadata">
			<label for="ingredients--{recipe.slug}">
				<span id="ingredients--{recipe.slug}">{recipe.ingredients.length}</span>
				Ingredient{#if recipe.ingredients.length > 1}s{/if}
			</label>
			<label for="steps--{recipe.slug}">
				<span id="steps--{recipe.slug}">{recipe.steps.length}</span>
				Step{#if recipe.steps.length > 1}s{/if}
			</label>
		</div>
		{#if recipe.nutrition}
			<p>
				Produces
				<span id="servings--{recipe.slug}">{recipe.nutrition.servings}</span>
				<label for="servings--{recipe.slug}">servings</label>
				of
				<span id="calories--{recipe.slug}">{roundCalories(recipe.nutrition.calories)}</span>
				<label for="calories--{recipe.slug}">calories</label>
				per serving.
			</p>
		{/if}
		{#if recipe.tags && recipe.tags.length > 0}
			<div class="tags">
				{#each recipe.tags as tag}
					<span class="tag">{tag}</span>
				{/each}
			</div>
		{/if}
	</article>
</a>

<style>
	a {
		text-decoration: none;
		color: inherit;
        width: fit-content;
        display: block;
	}

	.title {
		margin-top: 0;
	}

	.recipe-card {
		display: flex;
		flex-direction: column;
		align-items: center;
        gap: 0.5em;
		border-style: solid;
		min-width: 20%;
		width: fit-content;
		padding: 0.5em;
		border-radius: 3px;
	}

	.timing,
	.metadata {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
	}

	.timing {
		justify-content: space-between;
        gap: 0.67em;
	}

	.metadata {
		justify-content: space-around;
	}

	.tags {
		display: flex;
		gap: 0.33em;
	}

	.tag {
		background-color: #ddd;
		border-radius: 1em;
		padding: 0 0.5em;
	}

    .tag:hover, .tag:focus {
        background-color: #eee;
    }
</style>
