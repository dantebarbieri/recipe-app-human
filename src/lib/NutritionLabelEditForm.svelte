<script lang="ts">
	import { NutritionDailyValues } from '$lib/util';
	import { type NutritionDraft } from '$lib/assets/models/NutritionDraft';
	interface Props {
		nutritionDraft: NutritionDraft;
	}
	let { nutritionDraft: nutritionDraft = $bindable() }: Props = $props();
	const percent = (value: number | undefined, dailyValue: number) =>
		((value ?? 0) / dailyValue).toLocaleString(undefined, {
			maximumFractionDigits: 0,
			style: 'percent'
		});
</script>

<article aria-label="Editable nutrition facts">
	<div class="facts">
		<h2>Nutrition Facts</h2>
		<div class="servings">
			<label>
				<input
					class="inline-number"
					name={'nutrition-servings'}
					type="number"
					min="1"
					step="any"
					bind:value={nutritionDraft.servings}
					required
				/>
				servings per container
			</label>
		</div>
		<div class="serving-size">
			<strong>Serving size</strong>
			<span class="serving-size-fields">
				<label>
					<span class="sr-only">Serving-size quantity</span>
					<input
						class="inline-number"
						name={'nutrition-servingSizeQuantity'}
						type="number"
						min="0"
						step="any"
						bind:value={nutritionDraft.servingSize.quantity}
						required
					/>
				</label>
				<label>
					<span class="sr-only">Serving-size unit</span>
					<input
						class="inline-text unit"
						name={'nutrition-servingSizeUnit'}
						type="text"
						bind:value={nutritionDraft.servingSize.unit}
						placeholder="unit"
						required
					/>
				</label>
				<span aria-hidden="true">(</span>
				<label>
					<span class="sr-only">Serving-size weight</span>
					<input
						class="inline-number"
						name={'nutrition-servingSizeWeight'}
						type="number"
						min="0"
						step="any"
						bind:value={nutritionDraft.servingSize.weight}
						placeholder="weight"
					/>
				</label>
				<label>
					<span class="sr-only">Serving-size weight unit</span>
					<input
						class="inline-text unit"
						name={'nutrition-servingSizeWeightUnit'}
						type="text"
						bind:value={nutritionDraft.servingSize.weightUnit}
						placeholder="g"
					/>
				</label>
				<span aria-hidden="true">)</span>
			</span>
		</div>
		<div class="thick-rule"></div>
		<div class="amount"><small>Amount Per Serving</small></div>
		<div class="calories row">
			<strong>Calories</strong>
			<label>
				<span class="sr-only">Calories</span>
				<input
					class="calorie-input"
					name={'nutrition-calories'}
					type="number"
					min="0"
					step="any"
					bind:value={nutritionDraft.calories}
					required
				/>
			</label>
		</div>
		<div class="medium-rule"></div>
		<div class="daily-value-heading"><strong><small>% Daily Value*</small></strong></div>
		<div class="row">
			<span>
				<strong>Total Fat</strong>
				<label class="nutrient-control">
					<span class="sr-only">Total fat</span>
					<input
						name={'nutrition-totalFat'}
						type="number"
						min="0"
						step="any"
						bind:value={nutritionDraft.fat.total}
						required
					/>
					<span>g</span>
				</label>
			</span>
			<strong>{percent(nutritionDraft.fat.total, NutritionDailyValues.fat.total)}</strong>
		</div>
		<div class="row sub">
			<span>
				Saturated Fat
				<label class="nutrient-control">
					<span class="sr-only">Saturated fat</span>
					<input
						name={'nutrition-saturatedFat'}
						type="number"
						min="0"
						step="any"
						bind:value={nutritionDraft.fat.saturated}
						required
					/>
					<span>g</span>
				</label>
			</span>
			<strong>{percent(nutritionDraft.fat.saturated, NutritionDailyValues.fat.saturated)}</strong>
		</div>
		<div class="row sub">
			<span>
				<em>Trans</em> Fat
				<label class="nutrient-control">
					<span class="sr-only">Trans fat</span>
					<input
						name={'nutrition-transFat'}
						type="number"
						min="0"
						step="any"
						bind:value={nutritionDraft.fat.trans}
						required
					/>
					<span>g</span>
				</label>
			</span>
		</div>
		<div class="row">
			<span>
				<strong>Cholesterol</strong>
				<label class="nutrient-control">
					<span class="sr-only">Cholesterol</span>
					<input
						name={'nutrition-cholesterol'}
						type="number"
						min="0"
						step="any"
						bind:value={nutritionDraft.cholesterol}
						required
					/>
					<span>mg</span>
				</label>
			</span>
			<strong>{percent(nutritionDraft.cholesterol, NutritionDailyValues.cholesterol)}</strong>
		</div>
		<div class="row">
			<span>
				<strong>Sodium</strong>
				<label class="nutrient-control">
					<span class="sr-only">Sodium</span>
					<input
						name={'nutrition-sodium'}
						type="number"
						min="0"
						step="any"
						bind:value={nutritionDraft.sodium}
						required
					/>
					<span>mg</span>
				</label>
			</span>
			<strong>{percent(nutritionDraft.sodium, NutritionDailyValues.sodium)}</strong>
		</div>
		<div class="row">
			<span>
				<strong>Total Carbohydrate</strong>
				<label class="nutrient-control">
					<span class="sr-only">Total carbohydrate</span>
					<input
						name={'nutrition-totalCarbs'}
						type="number"
						min="0"
						step="any"
						bind:value={nutritionDraft.carbs.total}
						required
					/>
					<span>g</span>
				</label>
			</span>
			<strong>{percent(nutritionDraft.carbs.total, NutritionDailyValues.carbs.total)}</strong>
		</div>
		<div class="row sub">
			<span>
				Dietary Fiber
				<label class="nutrient-control">
					<span class="sr-only">Dietary fiber</span>
					<input
						name={'nutrition-fiber'}
						type="number"
						min="0"
						step="any"
						bind:value={nutritionDraft.carbs.fiber}
						required
					/>
					<span>g</span>
				</label>
			</span>
			<strong>{percent(nutritionDraft.carbs.fiber, NutritionDailyValues.carbs.fiber)}</strong>
		</div>
		<div class="row sub">
			<span>
				Total Sugars
				<label class="nutrient-control">
					<span class="sr-only">Total sugars</span>
					<input
						name={'nutrition-totalSugars'}
						type="number"
						min="0"
						step="any"
						bind:value={nutritionDraft.carbs.sugars.total}
						required
					/>
					<span>g</span>
				</label>
			</span>
		</div>
		<div class="row sub-level-two">
			<span>
				Includes
				<label class="nutrient-control">
					<span class="sr-only">Added sugars</span>
					<input
						name={'nutrition-addedSugars'}
						type="number"
						min="0"
						step="any"
						bind:value={nutritionDraft.carbs.sugars.added}
						required
					/>
					<span>g</span>
				</label>
				Added Sugars
			</span>
			<strong
				>{percent(nutritionDraft.carbs.sugars.added, NutritionDailyValues.carbs.sugars.added)}</strong
			>
		</div>
		<div class="row protein">
			<span>
				<strong>Protein</strong>
				<label class="nutrient-control">
					<span class="sr-only">Protein</span>
					<input
						name={'nutrition-protein'}
						type="number"
						min="0"
						step="any"
						bind:value={nutritionDraft.protein}
						required
					/>
					<span>g</span>
				</label>
			</span>
		</div>
		<div class="thick-rule"></div>
		<p class="footnote">
			The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a
			daily diet. 2,000 calories a day is used for general nutrition advice.
		</p>
	</div>
</article>

<style>
	article {
		box-sizing: border-box;
		width: min(100%, 28rem);
		color: #000;
		font-family: Arial, Helvetica, sans-serif;
	}
	.facts {
		border: 1px solid #000;
		background: #fff;
		padding: 8px;
	}
	h2 {
		margin: 0;
		font-size: 2.25rem;
		font-weight: 900;
		letter-spacing: -0.08rem;
		line-height: 1;
	}
	label {
		color: inherit;
	}
	input {
		box-sizing: border-box;
		border: 1px solid #777;
		border-radius: 2px;
		background: #fff;
		color: #000;
		font: inherit;
		line-height: 1;
	}
	input:focus-visible {
		outline: 2px solid #1565c0;
		outline-offset: 1px;
	}
	input:invalid {
		border-color: #b00020;
	}
	.servings {
		padding-top: 4px;
		font-size: 0.9rem;
	}
	.serving-size {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		padding: 3px 0 5px;
		font-size: 0.95rem;
	}
	.serving-size-fields {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 2px;
		min-width: 0;
	}
	.inline-number {
		width: 4.4rem;
		padding: 2px 3px;
		text-align: right;
	}
	.inline-text {
		width: 5rem;
		padding: 2px 3px;
	}
	.inline-text.unit {
		width: 3.5rem;
	}
	.thick-rule {
		height: 0;
		border-top: 12px solid #000;
	}
	.medium-rule {
		height: 0;
		border-top: 5px solid #000;
	}
	.amount {
		padding-top: 3px;
	}
	.row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 8px;
		border-bottom: 1px solid #777;
		padding: 3px 0;
		font-size: 0.9rem;
	}
	.row > span {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 3px;
	}
	.calories {
		align-items: center;
		border-bottom: 0;
		font-size: 1.5rem;
		font-weight: 900;
	}
	.calorie-input {
		width: 6rem;
		padding: 2px 4px;
		font-size: 1.5rem;
		font-weight: 900;
		text-align: right;
	}
	.daily-value-heading {
		padding: 3px 0;
		text-align: right;
	}
	.sub {
		padding-left: 18px;
	}
	.sub-level-two {
		padding-left: 36px;
	}
	.protein {
		border-bottom: 0;
		padding: 7px 0 10px;
	}
	.nutrient-control {
		display: inline-flex;
		align-items: baseline;
		gap: 1px;
		font-weight: normal;
	}
	.nutrient-control input {
		width: 4.5rem;
		padding: 1px 3px;
		text-align: right;
	}
	.footnote {
		position: relative;
		margin: 7px 0 0;
		padding-left: 9px;
		font-size: 0.68rem;
		line-height: 1.15;
	}
	.footnote::before {
		position: absolute;
		left: 0;
		content: '*';
	}
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
	@media (max-width: 420px) {
		.serving-size {
			align-items: flex-start;
			flex-direction: column;
		}
		.serving-size-fields {
			justify-content: flex-start;
			flex-wrap: wrap;
		}
	}
</style>
