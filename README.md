# EXPEDITION ARCHIVE

> Ongoing field documentation. Unclassified.

A personal field archive built with Next.js. Spy-dossier aesthetic, National Geographic restraint.

## Structure

```
/expeditions   → Mission files (MDX)
/lab           → Field rations trial logs (MDX)
/gallery       → Photo evidence (cross-tagged)
/field-notes   → Personal log
/loadout       → Equipment manifest
```

## Adding Content

### New Expedition
Create `content/expeditions/mission-XXX-title.mdx` with frontmatter:
```yaml
---
file_no: "003"
title: "Your Mission Title"
location: "Location, State"
date: "YYYY.MM.DD"
status: "ACTIVE" # ACTIVE | ARCHIVED | ABORTED | CLASSIFIED
clearance: 3     # 1-5
duration: "Xh Ym"
duration_days: 1
summary: "One line summary."
---
```

### New Lab Trial
Create `content/lab/trial-XXX-subject-vX.mdx` with frontmatter:
```yaml
---
trial_no: "003"
subject: "Dish Name"
version: "v1"
date: "YYYY.MM.DD"
viability: 7
status: "APPROVED FOR RESUPPLY" # or DISCONTINUED or ONGOING
notes: "Brief verdict."
---
```

## Deploy

Connected to Vercel. Push to `main` to deploy.
