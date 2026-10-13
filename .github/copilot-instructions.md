# GitHub Copilot instructions

This repository holds the documentation for our Home Assistant companion applications. The documentation is written in markdown and use Docusaurus as engine to generate the final website.

When writing in this repository you need to follow the defined guidelines.

## General guidelines

You should follow the general guidelines about writing a documentation from Microsoft and their Microsoft Style Guide.

1. **Be clear and concise**:
   - Use simple, straightforward language.
   - Avoid unnecessary jargon or overly complex sentences.

2. **Use active voice**:
   - Write in the active voice whenever possible.

3. **Follow Home Assistant standards**:
   - Ensure all documentation is consistent.
   - Use the correct formatting for code blocks, links, and headings.

4. **Adopt inclusive language**:
   - Avoid terms that may exclude or offend. For example, use "allowlist" instead of "whitelist."
   - Be objective and not gender favoring, polarizing, race related or religion inconsiderate

5. **Be consistent**:
   - Use consistent terminology, formatting, and structure throughout the documentation.
   - Follow the rules outlined in the Microsoft Style Guide.

## Formatting guidelines

1. **Headings**:
   - Use sentence-style capitalization, also in headings (for example, "Configuring a device").
   - Organize content with appropriate heading levels (`#`, `##`, `###`).

2. **Lists**:
   - Use numbered lists for sequential steps and bulleted lists for unordered items.
   - Keep list items parallel in structure.

3. **Code blocks**:
   - Use fenced code blocks (```` ``` ````) with the appropriate language identifier (for example, `yaml`, `python`).
   - Provide context or explanations for code snippets.

4. **Links**:
   - Use descriptive link text instead of raw URLs. For example, `[Home Assistant Standards](https://developers.home-assistant.io/docs/documenting/standards)`.

5. **Misc**
   - Don't put two spaces after a period.
   - There is no limit for the line length. You are allowed to write in a flowing text style.
   - Do not use ALL CAPITALS for emphasis - use _italics_ instead.
   - Use **bold** to markup UI strings, for example:
     - Under **Settings**, select the three dots menu. Then, select **Restart Home Assistant** > **Quick reload**.

## Writing style

1. **Audience awareness**:
   - Write for a global audience with varying levels of technical expertise.
   - Avoid idioms, cultural references, or region-specific terms.

2. **Second person**:
   - Address the reader directly using "you" to make the documentation more engaging.

3. **Avoid redundancy**:
   - Eliminate repetitive information unless it adds clarity.

4. **Use proper grammar and spelling**:
   - Proofread content for grammatical errors and typos.
   - Use American English spelling (for example, "color" instead of "colour").
   - The case of brand names, services, protocols, integrations, and platforms must match their respective counterparts. For example, "Z-Wave" _not_ "Zwave", "Z-wave", "Z Wave" or "ZWave". Also, "Input Select" _not_ "input select" or "Input select".

5. **Tables**
   - Avoid the use of tables. They are problematic on mobile. Use lists instead. If you cannot avoid a table, minimize the number of columns and keep the amount of text as short as possible:
   - When limiting the amount of text is not possible, consider using other data structures for representing the information. For example, lists or `{% configuration_basic %}` can be used.

6. **Misc**
   - Use a serial comma (also known as the Oxford comma) before the conjunction in a list of three or more items. For example, "Through the use of additional adapters, Home Assistant allows the use of Zigbee, Z-Wave, and other protocols".
   - Don't use "e.g.". Instead, use _for example_, _such as_, or _like_.
   - All examples containing Jinja2 templates should be wrapped _outside_ of the code markdown with the `{% raw %}` tag.

## Common review feedback

These rules come from feedback that reviewers repeatedly give on pull requests in this repository. Follow them when writing documentation, and check for them when reviewing.

### Versions and releases

- Documentation describes the current release of the apps. Don't write "Starting with version 2026.8.0", "Requires app version …", "prior to", or similar once a feature is in a stable release.
- If a feature is not in a stable release yet, mark it as described in [Beta features](#beta-features), or state in the pull request description which app release it depends on so it can wait for that release.
- When you do mention a version, say whether it is the app version or the Home Assistant Core version.

### Settings paths and UI text

- Write companion app settings paths as **Settings** > **Companion app** > …, for example **Settings** > **Companion app** > **Notifications**. Don't write "Companion app settings", leave out **Companion app**, or use arrows (`→`) or commas as separators.
- Put UI elements the user selects in **bold**, matching the capitalization in the app. Put messages the app shows, such as errors, in quotes instead. For example: the app shows "These lists are already being synced" and **Save** stays disabled.
- Use the term the app uses for a concept, and use it everywhere on the page. Don't introduce a second name, such as "pairing" when the app says "list sync".
- When a feature name is shown in the app in title case, such as **Reminders Sync**, use that exact name consistently, including in the page title.
- The apps don't always use the same labels. For example, Android calls the external URL **Home Assistant URL**. Mention both labels when it could cause confusion.

### Headings and anchors

- Don't use `#` headings in the page body. Docusaurus renders them like `##` and the page title is already the top-level heading. Use `##` and `###`.
- Don't add custom heading IDs, such as `{#apple-health-sensors}`, when they match the ID Docusaurus generates.
- Don't put a platform icon in a heading if the topic could apply to the other platform later. Label the paragraph instead, so the other platform can be added under the same heading.

### Platform coverage

- For every change, check what happens on the other platform. If it has an equivalent, add it. For example, a `:::tip` that Android supports snoozing notifications natively, next to the iOS snooze actions.
- Inside a section that applies to both platforms, put platform-specific notes in an admonition with the platform icon:

  ```markdown
  :::note ![iOS](/assets/iOS.svg)
  On iOS, `color` sets the background color of a notification icon instead.
  :::
  ```

- On a page that covers only one platform, state the platform once at the top. Don't repeat "On iOS" in every sentence.
- The pull request title and description must match the platform scope of the change. Don't say "iOS and Android" when only one platform changed.

### Where content lives

- Don't duplicate content across pages. Keep it in one place and link to it. Duplicated text becomes inconsistent over time.
- List all sensors on the main sensors page (`docs/core/sensors.md`), so it remains the complete overview and is easy to search. Feature pages link to the relevant section instead of repeating it.
- Keep alphabetical lists and tables in alphabetical order, such as notification commands and sensors.
- Don't document standard Home Assistant behavior that isn't specific to the companion apps, such as changing the unit of a sensor.

### Wording

- Refer to "the app" and "Home Assistant". Don't switch to "we" or "us".
- Remove sentences that state the obvious, restate the inverse of the previous paragraph, or repeat a requirement already listed. For example, "Changes are saved automatically" is enough without adding "and persist across launches".
- Describe behavior. Don't add justifications for design decisions, such as "…so the history stays a log of real changes".
- Don't use em dashes for a dramatic pause. Use a colon, or split the sentence. Break up long sentences.
- Be precise. Say what "this feature" or "this" refers to, and don't make claims you can't back up. For example, Android detects whether the connection uses _a_ VPN, not _your_ VPN, and a network you trust is not the same as your home network.
- Apps are updated, not patched. Telling the user to update to the latest version is enough.
- Spell out numbers from zero to nine in body text, such as "two options". Write "Wi-Fi" and "unencrypted" (not "WiFi" or "non-encrypted").

### Lists, admonitions, and FAQs

- End list items with a period when they are complete sentences.
- Start list items at the beginning of the line, without a space before the `-`.
- When a list contains several options, make clear whether the user needs to do all of them or only one.
- Use a `:::note` admonition instead of starting a paragraph with "Note that". Use `:::warning` for security risks, and use the same wording in warnings that describe the same risk.
- In an FAQ, answer the question directly in the first sentence, and order questions so they build on each other.

### Screenshots

- Add a screenshot when documenting new app UI.
- Crop screenshots to the relevant part of the UI, so buttons and labels are large enough to read. Avoid large empty areas and busy backgrounds.

### Scope

- Keep pull requests focused on one change. Fix unrelated problems, such as existing title-case headings on the same page, in a separate pull request.
- When reviewing, leave comments and suggestions on the pull request. Don't push unrelated changes or open additional pull requests as part of a review.

## Target audience

This section defines who we write for and how to write for them. These principles are critical for maintaining accessible, helpful documentation.

### Core principles

1. Never assume expert-level knowledge. Write for someone who just installed Home Assistant for the first time. If a concept requires prior knowledge, link to an explanation or provide a brief inline definition.

2. Always cover both platforms. Every feature must document both iOS and Android. When a feature is platform-specific, explicitly state which platform supports it and which does not.

3. Avoid jargon. Use plain language. When technical terms are unavoidable, explain them. Prefer visual aids (screenshots, diagrams, videos) over lengthy text explanations.

4. Don't assume Home Assistant knowledge. Readers may not know what entities, automations, services, or YAML configurations are. Provide context or link to Home Assistant documentation.

### Writing for beginners

Always write as if the reader:

- Has never used Home Assistant before.
- Is not familiar with technical terminology.
- Needs step-by-step guidance with visual confirmation at each step.
- May be using either iOS or Android (cover both).

**Good example:**

```markdown
## Sending a notification to your phone

A notification is a message that appears on your phone's lock screen or notification center,
similar to text message alerts.

### Steps

1. In Home Assistant, go to [**Developer tools** > **Actions**.](https://my.home-assistant.io/redirect/developer_services/)

   <!-- TODO: Add screenshot of Developer Tools location in sidebar -->

2. In the **Action** drop-down,, search for and select `notify.mobile_app_<your_phone_name>`.

   :::info
   Your phone name was set when you first connected the app to Home Assistant and per server.
   You can find it in the Companion app under **Settings** > **Companion app** > **Server & devices**.
   <!-- TODO: Add screenshot showing the name of the device under the server -->
   :::

   ![iOS](/assets/iOS.svg)On iOS, the action might be called `notify.mobile_app_iphone`.

   ![Android](/assets/android.svg) On Android, it might be called `notify.mobile_app_pixel_7`.

   <!-- TODO: Add screenshot showing the action drop-down, with mobile_app actions -->

3. In the **Action message** section, enter a message, such as `Hello from Home Assistant!`.

4. Select **Perform action**.

5. Check your phone. You should see a notification appear.

   <!-- TODO: Add side-by-side screenshots of iOS and Android notifications -->

### Troubleshooting

If the notification does not appear:

- ![iOS](/assets/iOS.svg)Make sure notifications are enabled in iOS **Settings** > **Home Assistant** > **Notifications**.
- ![Android](/assets/android.svg) Check that the app has notification permissions in Android **Settings** > **Apps** > **Home Assistant** > **Notifications**.
```

**Bad example:**

```markdown
## Notifications

Perform the `notify.mobile_app_*` action with a message payload to send notifications.
See the HA docs for more info on action calls.
```


### Documenting requirements

Requirements to consider:

- Supported devices or operating systems
- Whether the feature is in beta or stable release
- Any required Home Assistant integrations or configuration

### Beta features

If a feature is not yet available in the stable release, use the `<span class='beta'>BETA</span>` flag to indicate it:

```markdown
## New feature name <span class="beta">BETA</span>

This feature is currently in beta and available only in the beta version of the app.
```

Use this flag when:

- The feature is only available in beta versions of the iOS or Android app
- The feature is experimental and may change
- The documentation is prepared ahead of a prod release

## Development

### Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start local dev server (auto-detects environment) |
| `npm run build` | Build static site for production |
| `npm run serve` | Serve the built site locally |

### Repository structure

```text
docs/
├── getting_started/    # Installation and setup guides
├── core/               # Core features (actions, location, sensors)
├── notifications/      # Push notification documentation
├── integrations/       # Platform integrations (widgets, shortcuts, etc.)
├── apple-watch/        # Apple Watch specific docs
├── wear-os/            # Wear OS specific docs
├── android-auto/       # Android Auto/Automotive docs
├── carplay/            # CarPlay docs
├── meta-quest/         # Meta Quest VR docs
├── troubleshooting/    # FAQs, errors, networking issues
└── gallery/            # Screenshots and examples
static/
├── assets/             # Images, icons, screenshots
└── img/                # Brand assets and logos
sidebars.js             # Navigation structure
docusaurus.config.js    # Site configuration
```

## Platform indicators

Use platform icons to indicate iOS-only or Android-only features:

```markdown
![iOS](/assets/iOS.svg)        <!-- iOS only -->
![Android](/assets/android.svg) <!-- Android only -->
```

When a feature applies to both platforms, no icon is needed. Place icons inline with text or in table cells.
When you use inline iOS-only platform markers (e.g. `![iOS](/assets/iOS.svg)`), do not add a space between the icon and the following text.

## Docusaurus syntax

### Admonitions

Use admonitions to highlight important information:

```markdown
:::note
General information or tips.
:::

:::info
Helpful context or background information.
:::

:::warning
Important warnings the user should be aware of.
:::

:::danger
Critical information about potential data loss or security issues.
:::
```

## Images

- Store images in `static/assets/`
- Reference images with absolute paths: `/assets/image-name.png`
- Use the `width` attribute to control size in HTML img tags:

  ```html
  <img alt="Description" src="/assets/image.png" width="400" />
  ```

- Always include descriptive `alt` text for accessibility

## Links

### Internal links

Use relative paths with `.md` extension for links between documentation pages:

```markdown
[Android flavors](../core/android-flavors.md)
[Getting started](./index.mdx)
```

### External links

Use descriptive link text, never raw URLs:

```markdown
<!-- Good -->
[Home Assistant installation](https://www.home-assistant.io/installation/)

<!-- Avoid -->
https://www.home-assistant.io/installation/
```

### Special links

- Home Assistant documentation: `https://www.home-assistant.io/docs/...`
- Home Assistant Cloud (Nabu Casa): `https://support.nabucasa.com/...`
- GitHub issues: `https://github.com/home-assistant/iOS/issues/...` or `https://github.com/home-assistant/android/issues/...`

## AI policy

This project follows the [Open Home Foundation AI Policy](../AI_POLICY.md).
Autonomous contributions are not accepted: a human must review, understand,
and be able to explain every change before it is submitted. Do not open
issues or pull requests autonomously, and do not post comments on behalf of
a user without their review.
