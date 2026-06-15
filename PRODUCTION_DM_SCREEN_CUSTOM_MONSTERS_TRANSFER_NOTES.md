# Mythical Blue production transfer — DM Screen custom monsters and legendary tracking

Upload these files over the latest production repository. This package contains only DM Screen related changes and does not include character JSON files.

## Add or replace

- dm-screen.html
- css/dm-screen.css
- js/dm-screen.js
- data/custom-statblocks.json
- netlify/functions/get-custom-statblocks.js
- netlify/functions/save-custom-statblocks.js

## What this adds

- Preview statblocks before adding NPCs.
- Create and edit custom monster statblocks in the Mythical Blue builder.
- Editing SRD monsters creates a custom campaign copy instead of changing the SRD library.
- Bundled Custom Monsters category with Deck Swabbie, Below Deck Swabbie, and Bosun.
- Legendary Resistances and Legendary Actions tracked compactly on one initiative-tracker row.
- Legendary Actions reset at the start of the monster's turn when using Next Turn.
- Proficiency bonus support in statblock previews and the builder.
- Saving throw proficiency and skill proficiency/expertise support in the builder.
- Description field shown inside the statblock, not on the initiative tracker.
- Action line-break parsing so entries such as Scimitar and Crossbow (light) render as separate action blocks.
- Campaign-wide saved custom monsters through Netlify functions.

## Production saving requirement

The new Netlify functions use the same GitHub API pattern as the existing live HP save function. Production needs these environment variables configured:

- GITHUB_TOKEN
- GITHUB_REPO
- GITHUB_BRANCH, optional; defaults to main

Custom campaign monsters are saved to campaign/custom-statblocks.json in the GitHub repository. If the file does not exist yet, the save function creates it.

## Validation performed

- JavaScript syntax check passed for dm-screen.js.
- JavaScript syntax check passed for both new Netlify functions.
- JSON files parse correctly.
- dm-screen.html local references resolve.
- No character files are included.
