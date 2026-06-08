# Mythical Blue production transfer

This folder contains files to overlay onto the current production repository to bring production in line with the tested repository.

## Item detail migration

Character inventory entries in `characters/*.json` were matched against `data/srd-items.json` and updated when a match was found. For matched items, SRD `value`, `type`, `details`, `sourceId`, `source`, `category`, and available metadata such as `weight`, `rarity`, and `attunement` were applied.

Matched inventory names: 33 unique name mappings.

## Production cleanup

The current production repository has a duplicate root-level `srd-spells.json`. The tested app uses `data/srd-spells.json`. You can remove the root-level duplicate after applying this transfer if it is not referenced by your deployment.
