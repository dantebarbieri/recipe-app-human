<script lang="ts">
	import RecipeEditForm from '$lib/RecipeEditForm.svelte';

	let { data, form } = $props();
</script>

<RecipeEditForm
	mode="create"
	slug={data.slug}
	slugEditable={false}
	initialValue={form?.fields}
	errors={form?.errors}
/>
