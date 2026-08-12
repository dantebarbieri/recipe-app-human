import { compileFromFile } from "json-schema-to-typescript";
import { mkdir, writeFile } from 'fs/promises';
import { fileURLToPath } from "url";

const assets = new URL("../src/lib/assets/", import.meta.url);
const schemas = new URL("schemas/", assets);
const types = new URL("types/", assets);

const nutrition = await compileFromFile(
    fileURLToPath(new URL('nutrition.schema.json', schemas))
);

const recipe = await compileFromFile(
    fileURLToPath(new URL('recipe.schema.json', schemas)),
    {
        declareExternallyReferenced: false,
        bannerComment: `/* eslint-disable */
/* This file is generated. Do not edit. */
import type { Nutrition } from './nutrition';
`
    }
);

await mkdir(types, { recursive: true });

await Promise.all([
  writeFile(new URL('nutrition.d.ts', types), nutrition),
  writeFile(new URL('recipe.d.ts', types), recipe)
]);
