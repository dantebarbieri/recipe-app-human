<script lang="ts">
	import { NutritionDailyValues, roundCalories, roundCarbs, roundCholesterol, roundFat, roundProtein, roundSodium, roundWeight } from "$lib/util";
	import type { Nutrition } from "./assets/types/nutrition";
	import { toVulgar, vulgarString } from "./util";

	interface Props {
		nutrition: Nutrition,
	};

	let { nutrition }: Props = $props();

	

	const roundPercent = (n: number): string => n.toLocaleString(undefined, {
		maximumFractionDigits: 0,
		style: 'percent'
	})

	const vulgarServings = $derived(toVulgar(nutrition.servings));
	const vulgarServingSize = $derived(toVulgar(nutrition.servingSize.quantity));

	const vulgarServingsText = $derived(vulgarServings ? vulgarString(vulgarServings) : `${nutrition.servings}`);
	const vulgarServingSizeText = $derived(vulgarServingSize ? vulgarString(vulgarServingSize) : `${nutrition.servingSize.quantity}`);

</script>

<article class="nfl-no-pad-lr">
	<div id="facts" class="nfl-front">
		<div class="facts_title">Nutrition Facts</div>
		<div class="facts_serving_pre">
			<p>{vulgarServingsText} servings per container</p>
		</div>
		<div class="facts_serving_size">
			<label for="serving-size">Serving size</label> <span id="serving-size">{vulgarServingSizeText} {nutrition.servingSize.unit} {#if nutrition.servingSize.weight && nutrition.servingSize.weightUnit}({roundWeight(nutrition.servingSize.weight)}{nutrition.servingSize.weightUnit}){/if}</span>
		</div>
		<div class="facts_box">
			<div class="fact_row_norule"><small>Amount Per Serving</small></div>
			<div class="fact_row calories">
				<div id="calories" class="calorieamt">{roundCalories(nutrition.calories)}</div>
				<strong><label for="calories">Calories</label></strong>
			</div>
		</div>
		<!--.facts_box-->
		<div class="facts_box thin">
			<div class="fact_row txt_right">
				<strong><p><small>% Daily Value*</small></p></strong>
			</div>
			<div class="fact_row">
				<div><strong>{roundPercent(nutrition.fat.total / NutritionDailyValues.fat.total)}</strong></div>
				<strong><label for="total-fat">Total Fat</label></strong> <span id="total-fat">{roundFat(nutrition.fat.total)}g</span>
			</div>
			<div class="fact_row sub">
				<div><strong>{roundPercent(nutrition.fat.saturated / NutritionDailyValues.fat.saturated)}</strong></div>
				<label for="saturated-fat">Saturated Fat</label> <span id="saturated-fat">{roundFat(nutrition.fat.saturated)}g</span>
			</div>
			<div class="fact_row sub"><label for="trans-fat"><em>Trans</em> Fat</label> <span id="trans-fat">{roundFat(nutrition.fat.trans)}g</span></div>
			<div class="fact_row">
				<div><strong>{roundPercent(nutrition.cholesterol / NutritionDailyValues.cholesterol)}</strong></div>
				<strong><label for="cholesterol">Cholesterol</label></strong> <span id="cholesterol">{roundCholesterol(nutrition.cholesterol)}mg</span>
			</div>
			<div class="fact_row">
				<div><strong>{roundPercent(nutrition.sodium / NutritionDailyValues.sodium)}</strong></div>
				<strong><label for="sodium">Sodium</label></strong> <span id="sodium">{roundSodium(nutrition.sodium)}mg</span>
			</div>
			<div class="fact_row">
				<div><strong>{roundPercent(nutrition.carbs.total / NutritionDailyValues.carbs.total)}</strong></div>
				<strong><label for="total-carbs">Total Carbohydrate</label></strong> <span id="total-carbs">{roundCarbs(nutrition.carbs.total)}g</span>
			</div>
			<div class="fact_row sub">
				<div><strong>{roundPercent(nutrition.carbs.fiber / NutritionDailyValues.carbs.fiber)}</strong></div>
				<label for="fiber">Dietary Fiber</label> <span id="fiber">{roundCarbs(nutrition.carbs.fiber)}g</span>
			</div>
			<div class="fact_row sublv2"><label for="total-sugars">Total Sugars</label> <span id="total-sugars">{roundCarbs(nutrition.carbs.sugars.total)}g</span></div>
			<div class="fact_row sublv3">
				<div><strong>{roundPercent(nutrition.carbs.sugars.added / NutritionDailyValues.carbs.sugars.added)}</strong></div>
				<label for="added-sugars">Includes <span id="added-sugars">{roundCarbs(nutrition.carbs.sugars.added)}g</span> Added Sugars</label>
			</div>
			<div class="fact_row"><strong><label for="protein">Protein</label></strong> <span id="protein">{roundProtein(nutrition.protein)}g</span></div>
		</div>
		<!--.facts_box-->
		<div class="facts_box">
			<!-- <div class="fact_row">
				<div>10%</div>
				<label>Vitamin D</label> 2mcg
			</div>
			<div class="fact_row">
				<div>20%</div>
				<label>Calcium</label> 260mg
			</div>
			<div class="fact_row">
				<div>35%</div>
				<label>Iron</label> 6mg
			</div>
			<div class="fact_row">
				<div>6%</div>
				<label>Potassium</label> 240mg
			</div> -->
		</div>
		<!--.facts_box-->
		<div class="facts_descr">
			The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a
			daily diet. 2,000 calories a day is used for general nutrition advice.
		</div>
	</div>
	<!--#facts-->
</article>

<style>
	@font-face {
		font-family: 'NeueRoman';
		src: url('./assets/fonts/2CA3C4_0_0.eot');
		src:
			url('./assets/fonts/HelveticaNeueLTStd-Roman.otf'),
			url('./assets/fonts/2CA3C4_0_0.eot?#iefix') format('embedded-opentype'),
			url('./assets/fonts/2CA3C4_0_0.woff2') format('woff2'),
			url('./assets/fonts/2CA3C4_0_0.woff') format('woff'),
			url('./assets/fonts/2CA3C4_0_0.ttf') format('truetype');
	}

	@font-face {
		font-family: 'NeueBl';
		src: url('./assets/fonts/2CA3C4_1_0.eot');
		src:
			url('./assets/fonts/HelveticaNeueLTStd-Bd.otf'),
			url('./assets/fonts/2CA3C4_1_0.eot?#iefix') format('embedded-opentype'),
			url('./assets/fonts/2CA3C4_1_0.woff2') format('woff2'),
			url('./assets/fonts/2CA3C4_1_0.woff') format('woff'),
			url('./assets/fonts/2CA3C4_1_0.ttf') format('truetype');
	}

	@font-face {
		font-family: 'NeueBlk';
		src: url('./assets/fonts/2CA3C4_2_0.eot');
		src:
			url('./assets/fonts/HelveticaNeueLTStd-Blk.otf'),
			url('./assets/fonts/2CA3C4_2_0.eot?#iefix') format('embedded-opentype'),
			url('./assets/fonts/2CA3C4_2_0.woff2') format('woff2'),
			url('./assets/fonts/2CA3C4_2_0.woff') format('woff'),
			url('./assets/fonts/2CA3C4_2_0.ttf') format('truetype');
	}

	article {
		-webkit-text-size-adjust: 100%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		font-family: 'NeueRoman';
		font-size: 16px;
		line-height: 24px;
		font-weight: normal;
		color: #000000;
		box-sizing: border-box;
		position: relative;
		min-height: 1px;
		float: left;
		width: min(100%, 28rem);
	}

	.nfl-no-pad-lr {
		padding-left: 0rem !important;
		padding-right: 0rem !important;
	}

	/* Nutrition Label */
	#facts {
		margin: 20px 0 0;
		box-sizing: border-box;
		z-index: 10;
		background: #fff;
		border: 1px solid #000;
		padding: 20px 0px;
		font-size: 15px;
		line-height: 15px;
		box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);
	}

	#facts .facts_title {
		font-family: 'NeueBlk';
		font-size: 35px;
		line-height: 16px;
		color: #231f20;
		padding-left: 10px;
		padding-right: 10px;
		margin-bottom: 5px;
	}

	#facts p {
		margin: 0;
	}

	#facts label, #facts span, #facts p {
		color: #231f20;
		text-decoration: none;
		transition: all 0.5s;
		position: relative;
		z-index: 10;
	}

	#facts .facts_serving_size {
		padding-top: 4px;
		padding-bottom: 3px;
		font-size: 16px;
		font-family: 'NeueBlk';
		line-height: 14px;
		padding-left: 10px;
		padding-right: 10px;
	}

	#facts .facts_serving_pre {
		padding-bottom: 3px;
		font-size: 14px;
		line-height: 14px;
		padding-left: 10px;
		padding-right: 10px;
	}
	#facts .calories {
		padding-top: 4px;
		padding-bottom: 12px;
		font-size: 1.5em !important;
		font-family: 'NeueBlk';
		line-height: 1em !important;
		position: relative;
	}
	#facts .calorieamt {
		padding-top: 4px;
		padding-bottom: 12px;
		font-size: 1.8em !important;
		font-family: 'NeueBlk';
		line-height: 14px;
	}
	#facts .txt_right {
		text-align: right;
	}
	#facts strong {
		font-family: 'NeueBlk';
	}
	#facts .facts_box {
		border-top: 13px solid #231f20;
		margin-left: 10px;
		margin-right: 10px;
	}

	#facts .facts_box.thin {
		border-width: 5px;
	}

	#facts .fact_row {
		padding-bottom: 2px;
		padding-top: 5px;
		font-size: 14px;
		line-height: 14px;
		border-bottom: 1px solid #838181;
		position: relative;
	}
	#facts .fact_row_norule {
		padding-bottom: 2px;
		padding-top: 5px;
		font-size: 14px;
		line-height: 14px;
		position: relative;
	}

	#facts .fact_row.sub {
		padding-left: 18px;
	}
	#facts .fact_row.sublv2 {
		margin-left: 18px;
	}
	#facts .fact_row.sublv3 {
		padding-left: 36px;
	}

	#facts .fact_row small {
		font-size: 12px;
		line-height: 12px;
		font-family: 'NeueBl';
		color: #000;
	}

	#facts .fact_row div {
		float: right;
	}

	#facts strong {
		color: #000;
	}

	#facts .facts_descr {
		padding-left: 20px;
		padding-right: 10px;
		font-size: 11px;
		line-height: 12px;
		margin: 8px 0 8px;
		position: relative;
		color: #000;
	}

	#facts .facts_descr:before {
		content: '*';
		font-size: 12px;
		position: absolute;
		top: 2px;
		left: 12px;
	}

	@media (max-width: 767px) {
		#facts .facts_title {
			font-size: 33px !important;
		}
	}

	/* Microsoft Internet Explorer 11+ */
	@media screen and (-ms-high-contrast: none) {
		#facts strong {
			font-family: 'NeueBl' !important;
			font-weight: 400 !important;
		}
		#facts .facts_serving_size {
			font-family: 'NeueBl' !important;
			font-weight: 400 !important;
		}
		#facts .facts_serving_pre {
			padding-top: 3px;
		}
		.calorieamt {
			top: -5px;
			position: relative;
		}
	}
	/* 
	.container {
		-webkit-text-size-adjust: 100%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		font-family: 'NeueRoman';
		font-size: 16px;
		line-height: 24px;
		font-weight: normal;
		color: #000000;
		box-sizing: border-box;
		position: relative;
		min-height: 1px;
		float: left;
		width: 33.33333333%;
		padding-left: 0rem !important;
		padding-right: 0rem !important;
	}

	.nfl-front {
		-webkit-text-size-adjust: 100%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		font-family: 'NeueRoman';
		font-weight: normal;
		color: #000000;
		box-sizing: border-box;
		margin-top: 20px;
		margin-right: 1rem;
		z-index: 10;
		background: #fff;
		border: 1px solid #000;
		padding: 20px 0px;
		font-size: 15px;
		line-height: 15px;
		box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.2);
	}

	.facts_title {
		-webkit-text-size-adjust: 100%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		font-weight: normal;
		box-sizing: border-box;
		font-family: 'NeueBlk';
		font-size: 35px;
		line-height: 16px;
		color: #231f20;
		padding-left: 10px;
		padding-right: 10px;
		margin-bottom: 5px;
	}

	.facts_serving_pre {
		-webkit-text-size-adjust: 100%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		font-family: 'NeueRoman';
		font-weight: normal;
		color: #000000;
		box-sizing: border-box;
		padding-bottom: 3px;
		font-size: 14px;
		line-height: 14px;
		padding-left: 10px;
		padding-right: 10px;
	}

	.facts_serving_size {
		-webkit-text-size-adjust: 100%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		font-weight: normal;
		color: #000000;
		box-sizing: border-box;
		padding-top: 4px;
		padding-bottom: 3px;
		font-size: 16px;
		font-family: 'NeueBlk';
		line-height: 14px;
		padding-left: 10px;
		padding-right: 10px;
	}

	.facts_box {
		-webkit-text-size-adjust: 100%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		font-family: 'NeueRoman';
		font-weight: normal;
		color: #000000;
		font-size: 15px;
		line-height: 15px;
		box-sizing: border-box;
		border-top: 13px solid #231f20;
		margin-left: 10px;
		margin-right: 10px;
	}

	.fact_row_norule {
		-webkit-text-size-adjust: 100%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		font-family: 'NeueRoman';
		font-weight: normal;
		color: #000000;
		box-sizing: border-box;
		padding-bottom: 2px;
		padding-top: 5px;
		font-size: 14px;
		line-height: 14px;
		position: relative;
	}

	.fact_row.calories {
		-webkit-text-size-adjust: 100%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		font-weight: normal;
		color: #000000;
		box-sizing: border-box;
		font-size: 1.5em !important;
		font-family: 'NeueBlk';
		line-height: 1em !important;
		padding-bottom: 2px;
		padding-top: 5px;
		border-bottom: 1px solid #838181;
		position: relative;
	}

	.calorieamt {
		-webkit-text-size-adjust: 100%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		font-weight: normal;
		color: #000000;
		box-sizing: border-box;
		padding-top: 4px;
		padding-bottom: 12px;
		font-size: 1.8em !important;
		font-family: 'NeueBlk';
		line-height: 14px;
		float: right;
	}

	.facts_box.thin {
		-webkit-text-size-adjust: 100%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		font-family: 'NeueRoman';
		font-weight: normal;
		color: #000000;
		font-size: 15px;
		line-height: 15px;
		box-sizing: border-box;
		border-top: 13px solid #231f20;
		margin-left: 10px;
		margin-right: 10px;
		border-width: 5px;
	}

	.fact_row.txt_right {
		-webkit-text-size-adjust: 100%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		font-family: 'NeueRoman';
		font-weight: normal;
		color: #000000;
		box-sizing: border-box;
		text-align: right;
		padding-bottom: 2px;
		padding-top: 5px;
		font-size: 14px;
		line-height: 14px;
		border-bottom: 1px solid #838181;
		position: relative;
	}

	strong {
		-webkit-text-size-adjust: 100%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		font-size: 1.5em !important;
		line-height: 1em !important;
		box-sizing: border-box;
		font-weight: bold;
		font-family: 'NeueBlk';
		color: #000;

		-webkit-text-size-adjust: 100%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		text-align: right;
		font-size: 14px;
		line-height: 14px;
		box-sizing: border-box;
		font-weight: bold;
		font-family: 'NeueBlk';
		color: #000;
	}

	small {
		-webkit-text-size-adjust: 100%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		font-family: 'NeueRoman';
		font-weight: normal;
		color: #000000;
		line-height: 14px;
		box-sizing: border-box;
		font-size: 85%;
	}

	a {
		-webkit-text-size-adjust: 100%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		font-family: 'NeueRoman';
		font-weight: normal;
		font-size: 14px;
		line-height: 14px;
		box-sizing: border-box;
		background-color: transparent;
		color: #231f20;
		text-decoration: none;
		transition: all 0.5s;
		position: relative;
		z-index: 10;
	} */
</style>
