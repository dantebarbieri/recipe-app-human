<script lang="ts">
	import RecipeEditForm from '$lib/RecipeEditForm.svelte';

	let { form } = $props();
</script>

<RecipeEditForm
	mode="create"
	slugEditable={true}
	initialValue={form?.fields}
	errors={form?.errors}
/>
