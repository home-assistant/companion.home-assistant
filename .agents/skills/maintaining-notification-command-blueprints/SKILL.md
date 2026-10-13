---
name: maintaining-notification-command-blueprints
description: Use when adding, renaming, changing the parameters of, or removing a companion app notification command in this documentation, on docs/notifications/commands.md or any other page that documents a command (for example notifications/basic.md, apple-watch/complications.md, integrations/iOS-widgets.md).
---

# Maintaining notification command blueprints

## Overview

Every documented notification command has a matching automation blueprint in `static/assets/blueprints/notification_commands/`, with an import badge on the page that documents the command. CI (`.github/workflows/validate-blueprints.yml`) cross-checks blueprints and badges, but it cannot know that a newly documented command needs a blueprint in the first place — that is your job.

## Rules

- **New command** → create `static/assets/blueprints/notification_commands/<message>.yaml`. Copy the closest existing blueprint (`command_flashlight.yaml` for a plain `turn_on`/`turn_off` command, `kiosk_commands.yaml` for a command picker) and keep its structure: `trigger` and `condition` inputs, a `notify_devices` device selector (`multiple: true`, `filter.integration: mobile_app`), one selector per parameter, `mode: parallel`, and an action that repeats over `notify_devices` calling `notify.mobile_app_{{ device_attr(repeat.item, 'name') | slugify }}`. Command parameters go under the nested `data:` key, never at the top level. `source_url` must be the file's own GitHub master URL.
- **Verify parameter semantics against the app source** (Android: `MessagingManager.kt` in home-assistant/android; iOS: home-assistant/iOS) instead of guessing. On Android, empty strings are treated as absent, so optional text inputs use `default: ""` and are always sent.
- **Badge** → in the command's docs section, after the intro paragraph: the import sentence linking to `commands.md#blueprints-for-commands`, the `blueprint_import.svg` badge with the URL-encoded GitHub URL of the YAML file, then the command syntax wrapped in `<details><summary>Command syntax and settings</summary>`. Commands documented on pages other than commands.md get the badge on that page.
- **Changed parameters** → update the blueprint inputs and the docs example together.
- **Renamed or removed command** → rename or remove the blueprint and its badge. Renaming the file breaks previously imported copies (their `source_url` dangles), so mention it in the PR.
- Keep `min_version: 2024.10.0` unless the blueprint uses newer Home Assistant syntax.

## Verify

```bash
node scripts/validate-blueprints.js
pipx run yamllint --strict .github static .yamllint
npm run build   # checks docs links and anchors
```

All three run in CI; run them locally before opening a PR.
