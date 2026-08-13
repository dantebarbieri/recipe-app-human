<script lang="ts">
	import type { RecipeDraft } from '$lib/assets/models/RecipeDraft';
	import type { IngredientDraft } from '$lib/assets/models/IngredientDraft';
	import type { FormErrors } from '$lib/form';
	import NutritionLabelEditForm from '$lib/NutritionLabelEditForm.svelte';
	import { EMPTY_NUTRITION, type NutritionDraft } from '$lib/assets/models/NutritionDraft';

	interface Props {
		mode: 'create' | 'edit';
		slug?: string;
		slugEditable: boolean;
		initialValue?: RecipeDraft;
		errors?: FormErrors;
	}

	let { mode, slug, slugEditable, initialValue, errors }: Props = $props();

	type IngredientRow = {
		id: string;
		quantity?: number;
		unit: string;
		name: string;
	};

	type StepRow = {
		id: string;
		value: string;
	};

	type TagRow = {
		id: string;
		value: string;
	};

	const newIngredient = (): IngredientRow => ({
		id: crypto.randomUUID(),
		quantity: undefined,
		unit: '',
		name: ''
	});

	const fromIngredients = (ingredients: IngredientDraft[]): IngredientRow[] =>
		ingredients.map((i) => ({
			id: crypto.randomUUID(),
			quantity: i.quantity,
			unit: i.unit,
			name: i.name
		}));

	const newStep = (): StepRow => ({
		id: crypto.randomUUID(),
		value: ''
	});

	const newTag = (): TagRow => ({
		id: crypto.randomUUID(),
		value: ''
	});

	const fromSteps = (steps: string[]): StepRow[] =>
		steps.map((s) => ({
			id: crypto.randomUUID(),
			value: s
		}));

	const fromTags = (tags: string[]): TagRow[] =>
		tags.map((t) => ({
			id: crypto.randomUUID(),
			value: t
		}));

	let slugState = $state<string>(slug ?? initialValue?.slug ?? '');
	let title = $state<string>(initialValue?.title ?? '');
	let prepTime = $state<number | undefined>(initialValue?.prepTime);
	let cookTime = $state<number | undefined>(initialValue?.cookTime);
	let totalTime = $state<number | undefined>(initialValue?.totalTime);
	let ingredients = $state<IngredientRow[]>(
		initialValue ? fromIngredients(initialValue.ingredients) : [newIngredient()]
	);
	let tags = $state<TagRow[]>(initialValue?.tags ? fromTags(initialValue.tags) : []);
	let steps = $state<StepRow[]>(initialValue ? fromSteps(initialValue.steps) : [newStep()]);
	let includeNutrition = $state(initialValue?.nutrition !== undefined);
	let nutritionDraft = $state<NutritionDraft>(
		structuredClone(initialValue?.nutrition ?? EMPTY_NUTRITION)
	);

	function move<T>(items: T[], from: number, to: number) {
		const item = items[from];

		if (item === undefined || to < 0 || to >= items.length) return;

		items.splice(from, 1);
		items.splice(to, 0, item);
	}
</script>

<form method="POST" action={mode === 'edit' ? '?/save' : undefined}>
	<label>
		ID:
		<input
			name="slug"
			type="text"
			required
			readonly={!slugEditable}
			bind:value={slugState}
			aria-invalid={errors?.slug ? 'true' : undefined}
			aria-describedby={errors?.slug ? 'slug-error' : undefined}
		/>
	</label>
	{#if errors?.slug}
		<p id="slug-error" class="error">
			{errors.slug === 'missing' ? 'Enter an ID.' : 'Enter a valid ID (unique and valid in URLs).'}
		</p>
	{/if}
	<label>
		Title
		<input
			name="title"
			type="text"
			required
			bind:value={title}
			aria-invalid={errors?.title ? 'true' : undefined}
			aria-describedby={errors?.title ? 'title-error' : undefined}
		/>
	</label>
	{#if errors?.title}
		<p id="title-error" class="error">
			{errors.title === 'missing' ? 'Enter a title.' : 'Enter a valid title (nonempty).'}
		</p>
	{/if}
	<fieldset aria-describedby={errors?.tags ? 'tags-error' : undefined}>
		<legend>Tags</legend>
		<ul>
			{#each tags as tag, index (tag.id)}
				<li>
					<input name="tag" type="text" bind:value={tag.value} required />
					<button type="button" onclick={() => move(tags, index, index - 1)} disabled={index === 0}>
						Up
					</button>
					<button
						type="button"
						onclick={() => move(tags, index, index + 1)}
						disabled={index === tags.length - 1}
					>
						Down
					</button>
					<button type="button" onclick={() => tags.splice(index, 1)}>Delete</button>
				</li>
			{/each}
		</ul>
		<button type="button" onclick={() => tags.push(newTag())}> Add Tag </button>
		{#if errors?.tags}
			<p id="tags-error" class="error">
				{#if errors.tags === 'invalid'}
					Tags must not be duplicates.
				{/if}
			</p>
		{/if}
	</fieldset>
	<fieldset aria-describedby={errors?.timings ? 'timings-error' : undefined}>
		<legend>Timings</legend>

		<label>
			Prep Time
			<input name="prepTime" type="number" min="0" bind:value={prepTime} />
			minutes
		</label>
		<label>
			Cook Time
			<input name="cookTime" type="number" min="0" bind:value={cookTime} />
			minutes
		</label>
		<label>
			Total Time
			<input name="totalTime" type="number" min="0" bind:value={totalTime} />
			minutes
		</label>
		{#if errors?.timings}
			<p id="timings-error" class="error">
				{#if errors.timings === 'invalid'}
					The timings you have entered are invalid.
				{/if}
			</p>
		{/if}
	</fieldset>
	<fieldset aria-describedby={errors?.ingredients ? 'ingredients-error' : undefined}>
		<legend>Ingredients</legend>
		<ul>
			{#each ingredients as ingredient, index (ingredient.id)}
				<li>
					<label>
						Quantity
						<input
							name="ingredient-qty"
							type="number"
							step="any"
							bind:value={ingredient.quantity}
							required
						/>
					</label>
					<label>
						Unit
						<input name="ingredient-unit" type="text" bind:value={ingredient.unit} required />
					</label>
					<label>
						Name
						<input name="ingredient-name" type="text" bind:value={ingredient.name} required />
					</label>
					<button
						type="button"
						onclick={() => move(ingredients, index, index - 1)}
						disabled={index === 0}>Up</button
					>
					<button
						type="button"
						onclick={() => move(ingredients, index, index + 1)}
						disabled={index === ingredients.length - 1}>Down</button
					>
					<button
						type="button"
						onclick={() => ingredients.splice(index, 1)}
						disabled={ingredients.length === 1}>Delete</button
					>
				</li>
			{/each}
		</ul>
		<button type="button" onclick={() => ingredients.push(newIngredient())}>
			Add Ingredient
		</button>
		{#if errors?.ingredients}
			<p id="ingredients-error" class="error">
				{#if errors.ingredients === 'missing'}
					Enter at least one or more ingredients.
				{:else if errors.ingredients === 'invalid'}
					Ingredients must all have a quantity, a unit, and a name.
				{:else}
					Each ingredient needs a quantity, a unit, and a name.
				{/if}
			</p>
		{/if}
	</fieldset>
	<fieldset aria-describedby={errors?.steps ? 'steps-error' : undefined}>
		<legend>Steps</legend>
		<ol>
			{#each steps as step, index (step.id)}
				<li>
					<textarea name="step" bind:value={step.value} required></textarea>
					<button type="button" onclick={() => move(steps, index, index - 1)} disabled={index === 0}
						>Up</button
					>
					<button
						type="button"
						onclick={() => move(steps, index, index + 1)}
						disabled={index === steps.length - 1}>Down</button
					>
					<button type="button" onclick={() => steps.splice(index, 1)} disabled={steps.length === 1}
						>Delete</button
					>
				</li>
			{/each}
		</ol>
		<button type="button" onclick={() => steps.push(newStep())}> Add Step </button>
		{#if errors?.steps}
			<p id="steps-error" class="error">
				{errors.steps === 'missing'
					? 'Enter at least one or more steps.'
					: 'Each step must be nonempty.'}
			</p>
		{/if}
	</fieldset>
	<div>
		<label>
			<input type="checkbox" bind:checked={includeNutrition} />
			Include nutrition information
		</label>
		{#if includeNutrition}
			<NutritionLabelEditForm bind:nutritionDraft />
		{/if}
		{#if errors?.nutrition}
			<p id="nutrition-error" class="error">
				{#if errors.nutrition === 'missing'}
					Missing required units.
				{:else if errors.nutrition === 'invalid'}
					Check that values are consistent (nonnegative/nonzero where appropriate) and totals are
					not exceeded by their components.
				{:else}
					You can't provide a weight without a unit or vice-a-versa.
				{/if}
			</p>
		{/if}
	</div>
	<button type="submit">
		{#if mode === 'create'}Create{:else}Save{/if} Recipe
	</button>
	{#if mode === 'edit'}
		<button
			type="submit"
			formaction="?/delete"
			formnovalidate
			onclick={(event) => {
				if (!confirm(`Delete "${title}"? This cannot be undone.`)) {
					event.preventDefault();
				}
			}}
		>
			Delete Recipe
		</button>
	{/if}
</form>

<style>
	.error {
		color: hsl(from currentColor 0 50% 50%);
	}

	div {
		margin: 0.5em 0;
	}

	input:read-only,
	textarea:read-only {
		border: 0;
		box-shadow: none;
		background-color: #ddd;
	}
</style>
