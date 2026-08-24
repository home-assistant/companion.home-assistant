---
title: "iOS Widgets"
id: ios-widgets
---

# iOS Widgets

Widgets are small panels you can place on your Home Screen, Lock Screen, or (on a Mac) in Notification Center. They show information from Home Assistant at a glance and can run things for you when you tap them.

The Home Assistant app comes with several built-in widgets. You can also build your own with the **Custom widget**, where you pick the entities and how they look.

## Requirements

- Widgets require iOS 17, iPadOS 17, or macOS 14 (Sonoma) or later.
- A few widgets need extra setup in Home Assistant. Those requirements are listed with each widget below.

## Adding a widget

1. On your Home Screen, touch and hold an empty area until the apps start to jiggle.
2. Select the **Edit** button in the upper corner, then select **Add widget**.
3. Search for **Home Assistant** and select it.
4. Swipe through the available widgets, choose a size, and select **Add widget**.
5. To change a widget's settings, touch and hold the widget and select **Edit widget**.

:::note
Not every widget is available in every size. The sizes each widget supports are listed in its section below.
:::

## Available widget sizes

iOS, iPadOS, and macOS offer different widget sizes:

- System (Home Screen, Today view, and macOS Notification Center)
  - Small
  - Medium
  - Large
  - Extra large **(iPadOS and macOS)**
- Accessory (iOS and iPadOS Lock Screen, and Apple Watch)
  - Circular
  - Inline
  - Rectangular

## How often widgets update

iOS decides when a widget is allowed to refresh. Every app gets a limited budget, and even when the app asks for a refresh, iOS may delay or skip it. iOS takes into account how often you use the app, whether the screen is on, whether the widget is visible, and several other factors. In practice, expect an update roughly every 15 minutes at best.

Because of this, widgets are not suitable for information that must be up to the second.

To refresh your widgets more often, [send a silent push notification with the `update_widgets` command](/docs/notifications/notification-commands). You can create an automation that sends this notification whenever an entity you care about changes state.

## Common Controls

The **Common Controls** widget shows the entities you use most, chosen by Home Assistant based on your usage history. You don't select the entities yourself: the list updates as your habits change.

**Requirements:**

- Home Assistant 2025.10 or later, which provides the usage prediction used by this widget.
- Some usage history. If Home Assistant doesn't have enough data yet, the widget shows a message asking you to keep using Home Assistant.

Only entities from these domains are shown: `light`, `switch`, `cover`, `fan`, `input_boolean`, `humidifier`, and `valve`.

**Configuration options:**

- **Server**: The Home Assistant server the entities come from.
- **Show last update time**: Displays at the bottom of the widget when it last refreshed.
- **Show states**: Shows the current state of each entity. See [Showing states](#showing-states) for the limitations.

**Available in:**

- System small
- System medium
- System large

## Custom widget

The most customizable widget available. You create the widget inside the app, under **Settings** > **Widgets** > **Create**, where you decide which entities to display and choose, for each of them, the icon, icon color, display text, text color, background color, the action to run on tap, and whether it asks for confirmation first.

**The "On tap" options are:**

- **Default**: For most entities this toggles them. When toggling isn't possible, it refreshes the widget.
- **More info**: Opens the entity's more info dialog in the app.
- **Navigate**: Opens any Home Assistant path, such as `/lovelace/cameras`.
- **Run Script**: Runs a script you select.
- **Assist**: Opens Assist with the pipeline you select, optionally listening right away.
- **Nothing**: Refreshes the widget, but nothing else runs.

**Configuration options** (in the widget's edit dialog on your Home Screen):

- **Widget**: The widget you created inside the app.
- **Show last update time**: Displays at the bottom of the widget when it last refreshed.
- **Show states**: Shows the current state of each entity. See [Showing states](#showing-states) for the limitations.

:::info
iOS Actions can still be added to a custom widget, but they are deprecated. Use Home Assistant scripts or scenes instead.
:::

**Available in:**

- System small
- System medium
- System large

<table>
  <tr>
    <td><img src='/assets/ios/custom-widget.jpeg' alt="Custom Widget" height="300"/></td>
    <td><img src='/assets/ios/custom-widget-config.jpeg' alt="Custom Widget Configuration" height="300"/></td>
  </tr>

  <tr>
    <td><img src='/assets/ios/custom-widget-create.jpeg' alt="Custom Widget Creation View" height="650"/></td>
    <td><img src='/assets/ios/custom-widget-create-2.jpeg' alt="Custom Widget Item Customization view" height="650"/></td>
  </tr>
</table>

### Showing states <span class="beta">BETA</span> {#showing-states}

The **Show states** option, used by the **Common Controls** and **Custom** widgets, is still in beta. Because iOS limits how often a widget may refresh, the app can't guarantee that the state you see is the latest one.

When **Show states** is enabled and **Require confirmation** is also enabled for an item, the widget may take a moment to return from the confirmation view to its normal view.

If you run into problems, turn **Show states** off, or turn **Require confirmation** off and save the widget again.

## Assist

The **Assist** widget opens Assist inside the app, using the pipeline of your choice.

**Configuration options:**

- **Pipelines**: The Assist pipelines to show. The small and circular sizes show one pipeline, the medium size shows up to six. <span class="beta">BETA</span> Selecting more than one pipeline, and the medium size, are currently available in the beta version of the app only.
- **With voice**: When enabled, Assist starts listening as soon as the widget opens.

**Available in:**

- System small
- System medium <span class="beta">BETA</span>
- Accessory circular

<table>
  <tr>
    <td><img src='/assets/ios/assist-in-app-widget.jpeg' alt="Assist In App Widget" height="300"/></td>
    <td><img src='/assets/ios/assist-in-app-widget-config.jpeg' alt="Assist In App Widget Configuration" height="300"/></td>
  </tr>
</table>

## To-do List

The **To-do List** widget shows the items of one to-do list from Home Assistant.

From the widget you can:

- Select an item to mark it as completed.
- Select the plus button to add a new item.
- Select the list name to open the list in the app.
- Select the refresh button to reload the list.

**Configuration options:**

- **Server**: The Home Assistant server the list comes from.
- **List**: The to-do list to display.

**Available in:**

- System small
- System medium
- System large

## Calendar <span class="beta">BETA</span>

The **Calendar** widget shows your upcoming events. You can select several calendars, even from different servers, and the widget merges them into a single list. Select the refresh button to reload the events.

**Configuration options:**

- **Calendars**: The calendars to show events from. Select as many as you like.
- **Show calendar name**: Displays the name of the calendar under each event. This is useful when you merge several calendars.

**Available in:**

- System small
- System medium
- System large

## Energy <span class="beta">BETA</span>

The **Energy** widget shows a summary of your energy dashboard: your totals for the selected period, a chart, and, in the smaller sizes, your current power. Selecting the widget opens the energy dashboard in the app.

**Requirements:**

- The [energy dashboard](https://www.home-assistant.io/docs/energy/) must be set up in Home Assistant. If it isn't, the widget shows "No energy dashboard configured".

**Configuration options:**

- **Server**: The Home Assistant server the data comes from.
- **Source**: **Auto** shows both grid and solar, **Consumption** shows only what you use, and **Solar** shows only what you produce.
- **Period**: **Today**, **Yesterday**, **This week**, or **This month**.

**Available in:**

- System small
- System medium
- System large
- Accessory circular
- Accessory inline
- Accessory rectangular

## Open Page

The **Open Page** widget opens any Home Assistant sidebar page.

**Configuration options:**

- **Pages**: The pages to display. The small size holds up to 3, medium up to 6, large up to 12, and extra large up to 20.

**Available in:**

- System small
- System medium
- System large
- System extra large (iPadOS and macOS)
- Accessory circular

<table>
  <tr>
    <td><img src='/assets/ios/open-page-widget.jpeg' alt="Open Page Widget" height="300"/></td>
    <td><img src='/assets/ios/open-page-widget-config.jpeg' alt="Open Page Widget Configuration" height="300"/></td>
  </tr>
</table>

## Gauge

The **Gauge** widget shows a single value as a gauge, with text or an emoji in the middle.

**Configuration options:**

- **Source**: Where the value comes from. See the sources below.
- **Gauge Type**: **Normal** shows minimum and maximum labels, **Normal (single label)** shows one label at the bottom center, and **Capacity** shows only the center label.
- **Run Script**: When enabled, selecting the widget runs the script you choose instead of opening the app. **Notify when run** shows a notification once the script has run.

**Available in:**

- System small
- Accessory circular

### Gauge sources

**Entity** <span class="beta">BETA</span>

Select an entity and, optionally, one of its attributes. The value, the labels, and the range are filled in for you.

- **Entity**: The entity whose value drives the gauge.
- **Attribute**: An attribute to read instead of the entity's state. Leave empty to use the state.
- **Minimum Value**: The value that shows as an empty gauge. Defaults to 0.
- **Maximum Value**: The value that shows as a full gauge. Defaults to 100.

**Complication** <span class="beta">BETA</span>

Mirrors one of the circular Apple Watch complications you already built, so you don't have to configure the same thing twice. See [Apple Watch complications](../apple-watch/complications.md).

- **Complication**: The circular complication to mirror. The complication brings its own gauge style, so **Gauge Type** does not apply.

**Template**

Build the gauge with Home Assistant templates.

:::warning
Templates are rendered by your Home Assistant server, and only administrator accounts can render them. If your account is not an administrator, use the **Entity** or **Complication** source instead.
:::

For gauge type **Normal**:

- **Value Template (0-1)**: The current value used to fill the gauge.
- **Value Label Template**: The text or emoji shown in the center of the widget.
- **Min Label Template**: The text shown at the bottom left.
- **Max Label Template**: The text shown at the bottom right.

For gauge type **Normal (single label)**:

- **Value Template (0-1)**: The current value used to fill the gauge.
- **Value Label Template**: The text or emoji shown in the center of the widget.
- **Label Template**: The text or emoji shown at the bottom center.

For gauge type **Capacity**:

- **Value Template (0-1)**: The current value used to fill the gauge.
- **Value Label Template**: The text or emoji shown in the center of the widget.

<table>
  <tr>
    <td><img src='/assets/ios/gauge-widget.jpeg' alt="Gauge Widget" height="300"/></td>
    <td><img src='/assets/ios/gauge-widget-config.jpeg' alt="Gauge Widget Configuration" height="300"/></td>
  </tr>
</table>

## Details

The **Details** widget shows up to three lines of text on your Lock Screen.

**Configuration options:**

- **Source**: Where the text comes from. See the sources below.
- **Run Script**: When enabled, selecting the widget runs the script you choose instead of opening the app. **Notify when run** shows a notification once the script has run. This option only applies to the rectangular size.

**Available in:**

- Accessory inline
- Accessory rectangular

### Details sources

**Entity** <span class="beta">BETA</span>

Select an entity and, optionally, one of its attributes. The lines of text are built from the entity's name, state, and area.

- **Entity**: The entity to display.
- **Attribute**: An attribute to read instead of the entity's state. Leave empty to use the state.

**Complication** <span class="beta">BETA</span>

Mirrors one of the rectangular Apple Watch complications you already built. See [Apple Watch complications](../apple-watch/complications.md).

- **Complication**: The rectangular complication to mirror.

**Template**

Build each line with Home Assistant templates.

:::warning
Templates are rendered by your Home Assistant server, and only administrator accounts can render them. If your account is not an administrator, use the **Entity** or **Complication** source instead.
:::

- **Upper Text Template**: The first line of text.
- **Lower Text Template**: The second line of text.
- **Details Text Template**: A third line, shown only in the rectangular size.

<table>
  <tr>
    <td><img src='/assets/ios/details-widget.jpeg' alt="Details Widget" height="300"/></td>
    <td><img src='/assets/ios/details-widget-config.jpeg' alt="Details Widget Configuration" height="300"/></td>
  </tr>
</table>

## Sensors

The **Sensors** widget displays the values of the entities you select. Selecting an entity opens its more info dialog in the app.

Entities from these domains can be selected: `sensor`, `binary_sensor`, `input_boolean`, `person`, `lock`, `number`, `input_number`, `input_text`, `input_select`, `select`, `climate`, `weather`, `sun`, `device_tracker`, and `update`.

**Configuration options:**

- **Server**: The Home Assistant server the entities come from.
- **Choose Sensor**: The entities to display. The small size holds up to 3, medium up to 6, large up to 12, and extra large up to 20.

:::note
This widget updates at the interval iOS allows, roughly every 15 minutes. Don't use it for values you need in real time. See [How often widgets update](#how-often-widgets-update).
:::

**Available in:**

- System small
- System medium
- System large
- System extra large (iPadOS and macOS)

<table>
  <tr>
    <td><img src='/assets/ios/sensors-widget.jpeg' alt="Sensors Widget" height="300"/></td>
    <td><img src='/assets/ios/sensors-widget-config.jpeg' alt="Sensors Widget Configuration" height="300"/></td>
  </tr>
</table>

## Scripts

The **Scripts** widget runs the scripts you select.

**Configuration options:**

- **Scripts**: The scripts to display. The small size holds up to 3, medium up to 6, large up to 12, and extra large up to 20. The Lock Screen sizes hold one script, except the rectangular size, which holds two.
- **Notify when run**: Shows a notification once the script has run.

**Available in:**

- System small
- System medium
- System large
- System extra large (iPadOS and macOS)
- Accessory circular

<table>
  <tr>
    <td><img src='/assets/ios/scripts-widget.jpeg' alt="Scripts Widget" height="300"/></td>
    <td><img src='/assets/ios/scripts-widget-config.jpeg' alt="Scripts Widget Configuration" height="300"/></td>
  </tr>
</table>

## Removed widgets

- **Actions**: Removed in app release 2026.7. This widget ran iOS Actions, which are being retired. Use the **Scripts** widget, or a **Custom widget** with the **Run Script** action, instead.
