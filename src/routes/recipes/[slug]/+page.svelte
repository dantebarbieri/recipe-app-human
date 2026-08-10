<script lang="ts">
	import type { Recipe } from '$lib/assets/recipe';
    import type { PageProps } from './$types';
	let { data }: PageProps = $props();

    const recipe: Recipe = $derived(data);
</script>

<h1>{recipe.title}</h1>
<ul>
    {#each recipe.ingredients as ingredient}
        <li>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
    {/each}
</ul>
<ol>
    {#each recipe.steps as step}
        <li>{step}</li>
    {/each}
</ol>