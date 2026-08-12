/* eslint-disable */
/* This file is generated. Do not edit. */
import type {Nutrition} from "./nutrition";

/**
 * A recipe in the catalog
 */
export interface Recipe {
  /**
   * The title of a recipe, displayed to users
   */
  title: string;
  /**
   * The unique identifier for a recipe
   */
  slug: string;
  /**
   * The time spent preparing to cook a recipe (minutes)
   */
  prepTime?: number;
  /**
   * The time spent cooking a recipe (minutes)
   */
  cookTime?: number;
  /**
   * The total time spent before food is ready to eat (minutes; includes prep, cooking, cooling, etc.)
   */
  totalTime?: number;
  /**
   * The components required to cook the recipe
   *
   * @minItems 1
   */
  ingredients: [
    {
      /**
       * The amount of the ingredient required for the recipe
       */
      quantity: number;
      /**
       * The measurement of the quantity required for the recipe
       */
      unit: string;
      /**
       * The common name of the ingredient required for the recipe
       */
      name: string;
      [k: string]: unknown;
    },
    ...{
      /**
       * The amount of the ingredient required for the recipe
       */
      quantity: number;
      /**
       * The measurement of the quantity required for the recipe
       */
      unit: string;
      /**
       * The common name of the ingredient required for the recipe
       */
      name: string;
      [k: string]: unknown;
    }[]
  ];
  /**
   * The steps required to cook the recipe
   *
   * @minItems 1
   */
  steps: [string, ...string[]];
  nutrition?: Nutrition;
  /**
   * Recipe tags, such as allergens, vegetarian, spiciness, kosher/halal, etc.
   *
   * @minItems 1
   */
  tags?: [string, ...string[]];
  [k: string]: unknown;
}
