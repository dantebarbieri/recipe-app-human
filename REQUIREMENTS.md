# Recipe App Requirements

## Frontend

- A Web Portal provides access to a set of ALL recipes on the landing page
- A search field allows users to find recipes on the landing page
- Recipes open into their own page when selected
- Recipes can be created on the frontend and persisted in the database (create)
- Recipes can be edited on the frontend and persisted in the database (save)
- Recipes can be deleted on the frontend when in edit mode
- Supports "view" and "edit" modes
- Shows a picture (or pictures) of the recipe

## Backend

- Connects to a persistent database to load & store recipes
- No auth handling (this is a demo)
- Enumerates recipes and handles search/filtering
- Pagination support
- Responds to HTTP verbs PUT, GET, DELETE
- Enforces recipes conform to the schema
- Handles converting uploaded images and persisting them in proper size/format

## Database

- Document database (or filesystem if simpler)
- Recipes follow JSON schema
