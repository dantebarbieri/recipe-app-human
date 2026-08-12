<script lang="ts">
	import { page } from '$app/state';
</script>

<h1>{page.status}: {page.error?.message}</h1>

<p>Recipe <code>{page.params.slug}</code> does not exist yet. <a href="./{page.params.slug}/create">Create it?</a></p>