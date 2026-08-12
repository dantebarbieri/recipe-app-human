<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<a href="/">Home</a>
	<a href="/create">Create</a>

	{#if page.route.id === '/recipes/[slug]'}
    <a href={`/recipes/${page.params.slug}/edit`}>Edit</a>
  {/if}
</nav>

{@render children()}
