# Recipe App Requirements

## Frontend

- A Web Portal provides access to a set of ALL recipes on the landing page
- A search field allows users to find recipes on the landing page
- Recipes open into their own page when selected
- Recipes can be created on the frontend and persisted in the database (create)
- Recipes can be edited on the frontend and persisted in the database (save)
- Recipes can be deleted on the frontend when in edit mode
- Supports "view" and "edit" modes
- Recipes get a nutrition label which matches the visual style for FDA nutrition labels when information is provided for the recipe
- Basic recipe validation on the frontend to hint to users when their input is wrong
- Handles backend validation errors on frontend to indicate what is wrong with inputs

## Backend

- Connects to a persistent database manage recipes
- No auth handling (this is a demo)
- Enumerates recipes
- Handles create, edit, delete
- Enforces recipes conform to the schema
- Validates recipe information and returns errors to frontend

## Database

- Document database (or filesystem if simpler)
- Recipes follow JSON schema
