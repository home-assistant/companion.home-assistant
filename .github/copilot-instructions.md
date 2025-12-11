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
   - Use sentence-style capitalization, also in headings (for example, "How to configure a device").
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

## Target audience

This section defines who we write for and how to write for them. These principles are critical for maintaining accessible, helpful documentation.

### Core principles

1. **Never assume expert-level knowledge.** Write for someone who just installed Home Assistant for the first time. If a concept requires prior knowledge, link to an explanation or provide a brief inline definition.

2. **Always cover both platforms.** Every feature must document both iOS and Android. When a feature is platform-specific, explicitly state which platform supports it and which does not.

3. **Avoid jargon.** Use plain language. When technical terms are unavoidable, explain them. Prefer visual aids (screenshots, diagrams, videos) over lengthy text explanations.

4. **Don't assume Home Assistant knowledge.** Readers may not know what entities, automations, services, or YAML configurations are. Provide context or link to Home Assistant documentation.

### Writing for beginners

Always write as if the reader:

- Has never used Home Assistant before
- Is not familiar with technical terminology
- Needs step-by-step guidance with visual confirmation at each step
- May be using either iOS or Android (cover both)

**Good example:**

```markdown
## Sending a notification to your phone

A notification is a message that appears on your phone's lock screen or notification center,
similar to text message alerts.

### Steps

1. In Home Assistant, go to **Developer Tools** > **Services**.

   <!-- TODO: Add screenshot of Developer Tools location in sidebar -->

2. In the **Service** dropdown, search for and select `notify.mobile_app_<your_phone_name>`.

   :::info
   Your phone name was set when you first connected the app to Home Assistant.
   You can find it in the Companion App under **Settings** > **Companion App** > **Device Name**.
   :::

   ![iOS](/assets/iOS.svg) On iOS, the service might be called `notify.mobile_app_iphone`.

   ![Android](/assets/android.svg) On Android, it might be called `notify.mobile_app_pixel_7`.

   <!-- TODO: Add screenshot showing the service dropdown with mobile_app services -->

3. In the **Service Data** section, enter the following:

   '''yaml
   message: "Hello from Home Assistant!"
   title: "Test Notification"
   '''

4. Select **Call Service**.

5. Check your phone. You should see a notification appear.

   <!-- TODO: Add side-by-side screenshots of iOS and Android notifications -->

### Troubleshooting

If the notification does not appear:

- ![iOS](/assets/iOS.svg) Make sure notifications are enabled in iOS **Settings** > **Home Assistant** > **Notifications**.
- ![Android](/assets/android.svg) Check that the app has notification permissions in Android **Settings** > **Apps** > **Home Assistant** > **Notifications**.
```

**Bad example:**

```markdown
## Notifications

Call the `notify.mobile_app_*` service with a message payload to send notifications.
See the HA docs for more info on service calls.
```

### Platform coverage

Every feature documentation must address both platforms. Use this pattern:

```markdown
## Feature name

![iOS](/assets/iOS.svg) ![Android](/assets/android.svg)

Brief description of what the feature does and why it's useful.

### How it works on iOS

<!-- iOS-specific instructions with screenshots -->

### How it works on Android

<!-- Android-specific instructions with screenshots -->
```

When a feature is **not available** on one platform, state it explicitly:

```markdown
## Critical notifications

![iOS](/assets/iOS.svg)

Critical notifications bypass Do Not Disturb and silent mode to alert you of urgent events.

:::warning
This feature is only available on iOS. Android does not support critical notifications due to
platform limitations. For urgent alerts on Android, consider using [notification channels with
high importance](./notification-details.md#android-notification-channels).
:::
```

### Visual aids

Prefer screenshots and videos over text. When writing documentation:

- Add screenshots for every significant UI interaction
- Use placeholder comments when screenshots are not yet available:

  ```markdown
  <!-- TODO: Add screenshot of the Settings > Companion App screen -->
  ```

- For complex flows, consider adding a video or animated GIF:

  ```markdown
  <!-- TODO: Add video walkthrough of the onboarding process -->
  ```

- Always show both iOS and Android screenshots side by side when possible:

  ```markdown
  | iOS | Android |
  |-----|---------|
  | ![iOS settings screen](/assets/ios-settings.png) | ![Android settings screen](/assets/android-settings.png) |
  ```

### Explaining Home Assistant concepts

When referencing Home Assistant concepts, provide brief explanations or link to documentation:

```markdown
<!-- Good: Explains the concept inline -->
The app creates **entities** in Home Assistant. Entities are the basic building blocks that
represent devices and data points in your smart home (like sensors, switches, and lights).

<!-- Good: Links to more information -->
The app uses [automations](https://www.home-assistant.io/docs/automation/) to trigger actions
based on your phone's location.

<!-- Bad: Assumes knowledge -->
Configure the entity's device_class in your automation trigger.
```

### Audience types

While we write for beginners by default, our documentation serves several audiences:

1. **New users**: Just installed Home Assistant and/or the companion app. Need clear installation guides and basic feature explanations.

2. **End users**: Use the app daily but are not technical. Need guidance on features without requiring code or advanced configuration.

3. **Enthusiasts**: Comfortable with Home Assistant, looking for advanced tips and automation ideas. May understand YAML but appreciate clear examples.

4. **Developers**: Contributing to the apps or building custom integrations. Need technical details but still benefit from clear documentation.

For all audiences, start with the simple explanation, then progressively add more detail for advanced users.

### Documenting requirements

When documenting a feature, always specify its requirements. If exact versions are unknown, add a placeholder:

```markdown
:::note
Requires:
- Home Assistant 2023.1 or newer
- iOS app version 2023.1 or newer <!-- TODO: Confirm minimum iOS version -->
- Android app version 2023.1 or newer <!-- TODO: Confirm minimum Android version -->
:::
```

Requirements to consider:

- Minimum Home Assistant version
- Minimum companion app version (iOS and Android separately)
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
- The documentation is prepared ahead of a stable release

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

### Version requirements

When documenting features that require specific versions:

```markdown
:::note
Requires Home Assistant 2021.10 or newer.
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
