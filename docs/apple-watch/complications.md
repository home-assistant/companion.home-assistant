---
title: "Complications"
id: "complications"
---

![iOS](/assets/iOS.svg)

A complication is a small piece of information on your watch face, next to the time. Home Assistant complications can show an entity's state, a gauge, an icon, or the result of a template — so you can see your indoor temperature, your solar production, or whether the garage is open without opening any app.

:::info
Complications were rebuilt in iOS app version 2026.8 <span class="beta">BETA</span>. The editor, the available styles, and the way complications update all changed. If you are on an earlier version, see [Legacy complications](#legacy-complications).
:::

## Requirements

- An iPhone with the Home Assistant Companion app, connected to your Home Assistant server.
- An Apple Watch running **watchOS 10 or later**. Earlier versions of watchOS cannot show these complications.
- A URL the watch can reach to fetch live values. This can be your Home Assistant Cloud URL, another remote URL, or an internal URL you allowed the watch to use. See [Server URLs on the watch](./settings.md#server-urls).

You do **not** need to be a Home Assistant administrator to create a complication from an entity. You only need administrator rights to use [templates](#template-complications).

## Complication sizes

Every complication you create works in four sizes. watchOS calls these families, and which ones a watch face offers depends on the face.

- **Circular**: a small circle, optionally with a gauge or ring around it. Used in the corners of most faces.
- **Rectangular**: a wider block that fits several lines of text and a progress bar.
- **Inline**: a single line of text, usually shown above or below the time.
- **Corner**: a compact curved slot in a face's corner.

You configure one complication once, and then tune each size separately if you want. For a visual reference of where each size appears, see Apple's [complications guidelines](https://developer.apple.com/design/human-interface-guidelines/complications).

## Creating a complication

1. On your iPhone, open the Home Assistant app and go to **Settings** > **Apple Watch & CarPlay** > **Complications**.

2. Select **Create**.

3. Optionally give the complication a name. This name identifies it in this list and in the watch face picker. It is not shown on the face unless you choose to show it.

4. Under **Source**, choose where the content comes from:

   - **Entity**: shows the state of an entity you pick. Works for every user.
   - **Template**: renders a [Jinja2 template](https://www.home-assistant.io/docs/configuration/templating/) on your server. Requires an administrator account.

5. Finish the source:

   - For **Entity**, pick the entity. If you have several servers, the entity you pick decides the server.
   - For **Template**, pick the server, then enter a **Display name** template for the text and, if you want a gauge, a **Value template**.

6. A live preview at the top of the screen shows how the complication looks in all four sizes. Scroll down and the preview becomes a small floating window you can drag to any corner and tap to resize.

7. Select **Customize** to change how it renders, or select the confirm button to save.

8. Select **Reload Complications** in the complications list to send your changes to the watch.

In the complications list you can also:

- Select an existing complication to edit it.
- Press and hold a complication and select **Duplicate** to copy it, which is the quickest way to make the same reading in a second style.
- Swipe a complication to delete it.

## Customizing how it looks

The **Customize** sheet is where you shape the complication. It has three parts.

### The value

These options apply to every size, because the value text is shared.

- **Value**: whether to show the entity's **State** or one of its attributes. For example, a weather entity can show its `temperature` attribute instead of the word `sunny`.
- **Decimals**: how many decimal places a number gets. **Automatic** follows the display precision set in Home Assistant.
- **Unit**: the unit shown after the value. **Automatic** uses the entity's own unit of measurement.
- **Show unit**: turn the unit off entirely.

### The size being customized

Pick a size at the top of the sheet. Everything below applies to that size only, so you can show a lot on the rectangular face and only an icon on the corner one.

### The elements

Each size is made of elements you can turn on and off:

- **Icon** — circular, rectangular, and corner.
- **Title** — every size.
- **Subtitle** — rectangular only.
- **Value** — circular, rectangular, and corner. This is also what fills the gauge or progress bar.
- **Bottom text** — rectangular only.

For each element you can:

- Turn it on or off with **Show**.
- Choose whether its **Content** is the **Default** for that slot, or **Custom** content you build yourself. See [Building custom content](#building-custom-content).

The **Value** element also carries the gauge and color options:

- **Show as gauge / ring** (circular) or **Show progress bar** (the other sizes).
- **Gauge style** for circular complications: **Open** draws an arc that can show end labels, **Ring** draws a full closed circle.
- **Minimum** and **Maximum**, under **Gauge range (optional)**: the range the gauge spans, in the entity's own units. A temperature gauge from `16` to `24` fills up as the room warms. Values outside the range are clamped.
- **Show minimum** and **Show maximum**: whether the end labels appear next to the gauge.
- **Gauge color** (or **Progress bar color**) and **Text color**.

The **Icon** element carries the icon itself and its color. Pick any icon from the [Material Design Icons](https://pictogrammers.com/library/mdi/) set, or leave it as the entity's own icon.

:::info
For entity complications, the gauge uses real values — set **Minimum** and **Maximum** to the range you care about. There is no need to normalize anything to a number between 0 and 1 as older app versions required.
:::

## Building custom content

By default each element shows something sensible: the title shows the entity name, the value shows the formatted state. Set an element's **Content** to **Custom** to build your own text instead.

Custom content is a row of pieces you can add, edit, remove, and reorder. Select **Insert** to add a piece:

- **Text**: literal text you type, such as `Living room:` or ` kWh`.
- **Entity name**: the entity's name.
- **Value**: the formatted value, with your decimals and unit applied.
- **Attributes**: any attribute of the entity, by name.
- **Template**: the rendered result of your template. Only available for template complications.

Pieces are joined in order. For example, `Battery` + **Value** produces `Battery 87%`.

To reorder pieces, drag one onto another. If you use VoiceOver, each piece offers **Move left** and **Move right** actions instead.

:::note
Entity complications can only use **Text**, **Entity name**, **Value**, and **Attributes**. Rendering a template happens on your Home Assistant server and requires an administrator account, so it is only offered for template complications.
:::

## Template complications

If you are a Home Assistant [administrator](https://www.home-assistant.io/integrations/person/#adding-a-person-to-home-assistant), you can drive a complication with templates instead of a single entity. This is the way to combine several entities, do arithmetic, or format text however you like.

A template complication has two templates:

- **Display name**: the text shown on the face.
- **Value template**: the gauge or progress bar fill. This one must produce a number between `0.0` (empty) and `1.0` (full).

To turn a real measurement into a gauge fill, scale it into that range:

```jinja2
{% set original = states("sensor.living_room_temperature") | float %}
{% set minimum = 16.0 %}
{% set maximum = 24.0 %}
{% set adjusted = min(maximum, max(minimum, original)) %}
{{ (adjusted - minimum) / (maximum - minimum) }}
```

The `adjusted` variable keeps the result inside the range even when the sensor reads outside it.

You can also make the range follow something else, such as today's forecast:

```jinja2
{% set forecast = state_attr("weather.openweathermap", "forecast") | first %}
{% set original = state_attr("weather.openweathermap", "temperature") %}
{% set minimum = forecast["templow"] %}
{% set maximum = forecast["temperature"] %}
{% set adjusted = min(maximum, max(minimum, original)) %}
{{ (adjusted - minimum) / (maximum - minimum) }}
```

### Colors from a template

Template complications can also compute their colors. In the **Customize** sheet, turn on **Color from template** and enter a template for the gauge color, the icon color, or the text color.

Each template must render a hex color, such as `#FF9500`:

```jinja2
{% if states("sensor.living_room_temperature") | float > 24 %}#FF3B30{% else %}#34C759{% endif %}
```

If a template does not produce a valid hex color, the static color you picked is used instead.

## Adding a complication to your watch face

Creating a complication in the app does not put it on your face. You choose it on the watch, the same way you choose any other complication.

1. Make sure your complications reached the watch. On your iPhone, go to **Settings** > **Apple Watch & CarPlay** > **Complications** and select **Reload Complications**.

2. On your Apple Watch, press and hold the watch face, then select **Edit**.

3. Swipe to the complications page and select a slot.

4. Choose **Home Assistant** from the list.

5. Select the slot again, or press the Digital Crown to open the complication's settings, and choose which of your complications it should show.

6. Press the Digital Crown to save the face.

You can also edit your watch face from the **Watch** app on your iPhone.

:::note
The preview in the watch face picker shows `--` instead of a live value. That is deliberate: the picker renders many previews at once, so the app shows the complication's shape and colors rather than a value that might be out of date.
:::

### Built-in complications

Two complications exist without any configuration:

- **Home Assistant**: opens the Home Assistant app when tapped.
- **Assist**: opens Assist directly, so you can talk to your voice assistant from the face.

## How complications update

Complications fetch their own values directly from your Home Assistant server.

- **Automatically**, roughly every 15 minutes. watchOS decides the exact timing and budget, so the interval varies.
- **Whenever you look at the face**, subject to a short cool-down so several complications on one face do not all hit your server at once.
- **When you save a change** and select **Reload Complications** on your iPhone.
- **On demand from the watch**: **Settings** > **Troubleshooting** > **Complications** > **Refresh All**, or open a single complication and select **Retry**.

You can also trigger an update from an automation, using the [`update_complications` notification command](/notifications/commands.md):

```yaml
- action: notify.mobile_app_<your_device_id_here>
  data:
    message: update_complications
```

This wakes the watch app in the background, even when the watch is not reachable, and rebuilds every complication. watchOS budgets these background wakes to roughly 50 per day and shares that budget with **Reload Complications**, so use them for changes you actually want to see right away rather than for every state change. It can take a few seconds or a few minutes for the update to appear.

:::note
Complications refresh their own values on a schedule, so you rarely need this. Reach for it when a value must appear on the face at a specific moment, such as right after an automation finishes.
:::

:::warning
If you use [local push](../notifications/local.md), this command only runs while the Home Assistant app is open on your iPhone, or when you tap the notification. Local push notifications are delivered by a separate part of the app that cannot run commands in the background.
:::

:::info
Complications need a reachable server URL. If your watch cannot reach your Home Assistant server — for example because the server only has an internal URL and you have not allowed the watch to use it — complications keep showing their last known value. See [Server URLs on the watch](./settings.md#server-urls).
:::

### Checking why a complication is stale

The watch can tell you exactly what happened on the last refresh.

1. On your Apple Watch, open the Home Assistant app and select the settings button at the bottom of the home screen.
2. Select **Troubleshooting** > **Complications**.
3. Each complication shows whether its last refresh was **Updated**, is **Showing cached value**, or **Failed**.
4. Select a complication to see when it last tried, why it failed, and to select **Retry**.

## Using a complication elsewhere

A complication you built can also be used outside your watch face:

- **On your watch home screen.** Add a **Complication** item to show a rectangular complication inline in your item list. See [Adding items](./home.md#adding-items).
- **On your iPhone lock screen.** The **Details** widget can mirror a rectangular complication, and the **Gauge** widget can mirror a circular one. Choose **Complication** as the widget's source. See [iOS Widgets](../integrations/iOS-widgets.md).

This means you can build a gauge once and reuse it on your watch face, in your watch app, and on your iPhone lock screen.

## Legacy complications

Complications you created before iOS app version 2026.8 used older watchOS templates, with a separate complication for each position and template on each watch face. That system no longer exists in watchOS.

Your old complications are kept and still work:

- Find them under **Settings** > **Apple Watch & CarPlay** > **Complications** > **Legacy complications**. The entry only appears if you have any.
- They are drawn with the modern styles, so their text areas are mapped onto the closest matching layout. They may look different from how they looked before.
- You can delete them individually, or select **Delete All Legacy Complications** to remove them all at once.

We recommend rebuilding the complications you still use with the new editor. Entity complications in particular no longer need an administrator account or any templating.

## Troubleshooting

**My complication is empty or shows the Home Assistant logo.**
The complication on your face no longer matches one in the app — usually because it was deleted and recreated. Edit your watch face and pick the complication again.

**My complication shows an old value.**
watchOS limits how often a complication may refresh, and it refreshes far less often when it is not on your active watch face. Check the diagnostics under **Settings** > **Troubleshooting** > **Complications** on the watch, and make sure the watch can reach your server.

**The gauge is always empty or always full.**
For entity complications, check that **Minimum** and **Maximum** bracket the values your entity actually reports, and that the value is a number. For template complications, check that your value template produces a number between `0.0` and `1.0`.

**My template complication shows nothing.**
Template rendering happens on your Home Assistant server and requires an administrator account. In the editor, the template row shows the rendered result — if it is empty, the server returned nothing and the template likely has an error.

**Nothing I create reaches the watch.**
Open **Settings** > **Apple Watch & CarPlay** > **Complications** on your iPhone and select **Reload Complications** with your watch nearby. If it reports that the watch is unavailable, check that the watch is paired and the Home Assistant watch app is installed.

For more help, see [Watch settings and troubleshooting](./settings.md).
