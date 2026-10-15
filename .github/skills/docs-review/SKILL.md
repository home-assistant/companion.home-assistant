---
name: docs-review
description: Rules for writing and reviewing companion app documentation pages in this repository, based on recurring pull request review feedback. Use when reviewing a pull request or when adding or changing pages under docs/.
---

# Documentation review rules

These rules come from feedback that reviewers repeatedly give on pull requests in this repository. They add to `.github/copilot-instructions.md` and the [Home Assistant documentation style guide](https://developers.home-assistant.io/docs/documenting/general-style-guide), and don't repeat what those already cover. Follow them when writing documentation, and check for them when reviewing.

## Versions and releases

- Documentation describes the current release of the apps. Don't write "Starting with version 2026.8.0", "Requires app version …", "prior to", or similar once a feature is in a stable release.
- If a feature is not in a stable release yet, mark it with the beta flag described in `.github/copilot-instructions.md`, or state in the pull request description which app release it depends on so it can wait for that release.
- When you do mention a version, say whether it is the app version or the Home Assistant Core version.

## Settings paths and app terms

- Write companion app settings paths as **Settings** > **Companion app** > …, for example **Settings** > **Companion app** > **Notifications**. Don't write "Companion app settings", leave out **Companion app**, or use arrows (`→`) or commas as separators.
- Use the term the app uses for a concept, and use it everywhere on the page. Don't introduce a second name, such as "pairing" when the app says "list sync".
- When referring to a feature's UI label in body text, preserve the capitalization shown in the app, such as **Reminders Sync**. Keep page titles and headings in sentence case, preserving proper nouns, as required by `.github/copilot-instructions.md`.
- The apps don't always use the same labels. For example, Android calls the external URL **Home Assistant URL**. Mention both labels when it could cause confusion.

## Headings and anchors

- Don't use `#` headings in the page body. Docusaurus renders them like `##` and the page title is already the top-level heading. Use `##` and `###`.
- Don't add custom heading IDs, such as `{#apple-health-sensors}`, when they match the ID Docusaurus generates.
- Don't put a platform icon in a heading if the topic could apply to the other platform later. Label the paragraph instead, so the other platform can be added under the same heading.

## Platform coverage

- For every change, check what happens on the other platform. If it has an equivalent, add it. For example, a `:::tip` that Android supports snoozing notifications natively, next to the iOS snooze actions.
- Inside a section that applies to both platforms, put platform-specific notes in an admonition with the platform icon:

  ```markdown
  :::note ![iOS](/assets/iOS.svg)
  On iOS, `color` sets the background color of a notification icon instead.
  :::
  ```

- On a page that covers only one platform, state the platform once at the top. Don't repeat "On iOS" in every sentence.
- The pull request title and description must match the platform scope of the change. Don't say "iOS and Android" when only one platform changed.

## Where content lives

- Don't duplicate content across pages. Keep it in one place and link to it. Duplicated text becomes inconsistent over time.
- List all sensors on the main sensors page (`docs/core/sensors.md`), so it remains the complete overview and is easy to search. Feature pages link to the relevant section instead of repeating it.
- Keep alphabetical lists and tables in alphabetical order, such as notification commands and sensors.
- Don't document standard Home Assistant behavior that isn't specific to the companion apps, such as changing the unit of a sensor.

## Wording

- Refer to "the app" and "Home Assistant". Don't switch to "we" or "us".
- Remove sentences that state the obvious, restate the inverse of the previous paragraph, or repeat a requirement already listed. For example, "Changes are saved automatically" is enough without adding "and persist across launches".
- Describe behavior. Don't add justifications for design decisions, such as "…so the history stays a log of real changes".

## Markdown and admonitions

- Start top-level list items at the beginning of the line, without a space before the `-`. Preserve the indentation required for nested lists and lists inside other blocks.
- Use a `:::note` admonition instead of starting a paragraph with "Note that". Use `:::warning` for security risks, and use the same wording in warnings that describe the same risk.

## Screenshots

- Add a screenshot when documenting new app UI.
- Crop screenshots to the relevant part of the UI, so buttons and labels are large enough to read. Avoid large empty areas and busy backgrounds.

## Scope

- Keep pull requests focused on one change. Fix unrelated problems, such as existing title-case headings on the same page, in a separate pull request.
- When reviewing, leave comments and suggestions on the pull request. Don't push unrelated changes or open additional pull requests as part of a review.
