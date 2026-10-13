---
title: "iOS widgets"
id: ios-widgets
---

# iOS widgets

![iOS](/assets/iOS.svg)This page covers the widgets of the iOS, iPadOS, and macOS app. For Android, see [Android widgets](android-widgets.md).

Widgets are small panels you can place on your Home Screen, Lock Screen, or (on a Mac) on the desktop and in Notification Center. They show information from Home Assistant at a glance and can run things for you when you tap them.

The Home Assistant app comes with several built-in widgets. You can also build your own with the **Custom widget**, where you pick the entities and how they look.

## Requirements

- Widgets require iOS 17, iPadOS 17, or macOS 14 (Sonoma) or later.
- A few widgets need extra setup in Home Assistant. Those requirements are listed with each widget below.

## Adding a widget

1. On your Home Screen, touch and hold an empty area until the apps start to jiggle.
2. On iOS 18 and iPadOS 18 or later, select the **Edit** button in the upper corner, then select **Add widget**. On iOS 17 and iPadOS 17, select the **+** button in the upper corner.
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
  - Extra large **(iPadOS and macOS)**. On iPadOS 27 and later, a portrait version of the extra large size is also available.
- Accessory (iOS and iPadOS Lock Screen). These sizes are not available on ![macOS](/assets/macOS.svg) macOS.
  - Circular
  - Inline
  - Rectangular

## How often widgets update

iOS decides when a widget is allowed to refresh. Every app gets a limited budget, and even when the app asks for a refresh, iOS may delay or skip it. iOS takes into account how often you use the app, whether the screen is on, whether the widget is visible, and several other factors. In practice, expect an update roughly every 15 minutes at best.

Because of this, widgets are not suitable for information that must be up to the second.

Many widgets show the time of their last update, together with a refresh icon. Select it to reload the widget right away.

To refresh your widgets more often, [send a silent push notification with the `update_widgets` command](../notifications/commands.md). You can create an automation that sends this notification whenever an entity you care about changes state. This command reloads the **Common Controls**, **Entities**, **Areas**, **Custom**, **To-do List**, **Gauge**, **Details**, and **Sensors** widgets. The other widgets refresh on their own schedule or when you select their refresh button.

If your widgets are stuck on a blank state or stop updating, open the companion app and go to **Settings** > **Companion app** > **Widgets**, then select **Reload all widgets**.

## How tapping an entity works

The **Common Controls**, **Entities**, and **Custom** widgets show each entity as a tile. Like the tile card in the Home Assistant dashboard, a tile has two areas you can tap:

- **The icon** runs the entity's main action without opening the app. For example, it toggles a light or switch, opens or closes a cover, locks or unlocks a lock, runs a script, activates a scene, presses a button, or triggers an automation. The icon has a colored background when it can do this.
- **The rest of the tile** opens the entity's more info dialog in the app.

For entities without a main action, such as sensors, the whole tile opens the more info dialog. In the **Custom widget**, you can change what each area does.

## Areas

The **Areas** widget shows the [areas](https://www.home-assistant.io/docs/organizing/areas/) of your home, grouped by floor. Areas that are not assigned to a floor are listed under **Other areas**.

<img src="/assets/ios/widgets/areas.png" alt="Areas widget in the medium size, showing four areas of the ground floor, with arrows to move between pages" width="370" />

- Select an area to open its page in the Home Assistant dashboard. In the small size, selecting the widget opens the areas dashboard instead.
- When your home has more areas than fit in the widget, use the arrows at the bottom to move between pages.

**Configuration options:**

- **Server**: The Home Assistant server the areas come from.

**Available in:**

- System small
- System medium
- System large
- System extra large (iPadOS and macOS)

## Assist

The **Assist** widget opens [Assist](https://www.home-assistant.io/voice_control/) inside the app, using the pipeline of your choice.

<table>
  <tr>
    <td><img src="/assets/ios/widgets/assist-small.png" alt="Assist widget in the small size" width="190" /></td>
    <td><img src="/assets/ios/widgets/assist-medium.png" alt="Assist widget in the medium size, showing three Assist pipelines" width="370" /></td>
  </tr>
</table>

**Configuration options:**

- **Pipelines**: The Assist pipelines to show. The small and circular sizes show one pipeline, the medium size shows up to six. If a pipeline is missing from the list, open Assist in the app once to refresh the list.
- **With voice**: When enabled, Assist starts listening as soon as the widget opens. Enabled by default.

**Available in:**

- System small
- System medium
- Accessory circular

## Calendar

The **Calendar** widget shows your upcoming events for the next 14 days. You can select several calendars, even from different servers, and the widget merges them into a single list.

<img src="/assets/ios/widgets/calendar.png" alt="Calendar widget in the medium size, showing three events from two calendars for Monday the 18th" width="370" />

- Select an event to open its calendar in the app. In the small size, selecting the widget opens the calendar page instead.
- Select the time at the bottom of the widget to reload the events.

**Configuration options:**

- **Calendars**: The calendars to show events from. Select as many as you like. If you don't select any, the widget shows events from all your calendars.
- **Show calendar name**: Displays the name of the calendar next to each event. This is useful when you merge several calendars.

The small size shows up to 2 events, medium up to 3, large and extra large up to 6, and the portrait version of extra large up to 12. The large and extra large sizes group the events by day.

**Available in:**

- System small
- System medium
- System large
- System extra large (iPadOS and macOS)

## Common Controls

The **Common Controls** widget shows the entities you use most, chosen by Home Assistant based on your usage history. You don't select the entities yourself: the list updates as your habits change.

<img src="/assets/ios/widgets/common-controls.png" alt="Common Controls widget in the medium size, showing four tiles: a light that is on, a switch that is off, an open cover, and a fan that is off" width="350" />

**Requirements:**

- Home Assistant 2025.10 or later, which provides the usage prediction used by this widget.
- Some usage history. If Home Assistant doesn't have enough data yet, the widget shows a message asking you to keep using Home Assistant.

**Configuration options:**

- **Server**: The Home Assistant server the entities come from.
- **Show last update time**: Displays at the bottom of the widget when it last refreshed. Enabled by default.
- **Show states**: Shows the current state of each entity. Enabled by default. See [Showing states](#showing-states) for the limitations.
- **Include domains**: When you select one or more domains, such as `light` or `cover`, only entities from those domains are shown.
- **Exclude domains**: Entities from the domains you select here are never shown. If a domain is in both lists, it is excluded.

The small size shows up to 2 entities, medium up to 4, large up to 10, and extra large up to 20.

**Available in:**

- System small
- System medium
- System large
- System extra large (iPadOS and macOS)

## Custom widget

The most customizable widget available. You create the widget inside the app, and then add it to your Home Screen.

<img src="/assets/ios/widgets/custom-widget.png" alt="Custom widget in the medium size, showing six tiles: Kitchen light, Temperature, Front door, Good morning, Garage, and Porch" width="350" />

### Creating a custom widget

1. In the companion app, go to **Settings** > **Companion app** > **Widgets** and select **Create widget**.
2. Enter a **Name** for the widget.
3. Select **Add item** and choose the entities you want to display.
4. To customize an item, select it in the **Items** list. You can change:
   - **Display text**: The icon and the name shown on the tile.
   - **Icon color**: **Default** uses the entity's own color, or choose **Custom** to pick a color.
   - **Use custom colors**: Lets you choose the **Background color** and **Text color** of the tile.
   - **Tap behavior**: What happens when you select the tile, outside the icon.
   - **Icon tap behavior**: What happens when you select the icon.
   - **Require confirmation**: Asks "Are you sure?" before running the action.
5. Select **Save**.

You can also add an entity to a custom widget from the Home Assistant dashboard: open the entity's more info dialog, select the **Add to** button, and choose **Widget**.

**The "Tap behavior" and "Icon tap behavior" options are:**

- **Default**: The action that fits the entity. The option shows which action this is, for example **Default (Toggle)** or **Default (More info)**.
- **More info**: Opens the entity's more info dialog in the app.
- **Toggle**: Toggles the entity. Only available for entities that can be toggled.
- **Main action**: The entity's main action, shown with the name that fits it, such as **Press**, **Activate**, **Run**, or **Trigger**.
- **Turn on** and **Turn off**: Shown with the names that fit the entity, such as **Lock** and **Unlock**, or **Open** and **Close**.
- **Navigate**: Opens any Home Assistant path, such as `/lovelace/cameras`.
- **URL**: Opens a web address.
- **Perform action**: Performs a Home Assistant action you select, with optional action data in JSON format.
- **Run Script**: Runs a script you select.
- **Assist**: Opens Assist with the pipeline you select, optionally listening right away.
- **Nothing**: Refreshes the widget, but nothing else runs.

When **Require confirmation** is enabled, selecting the item first replaces the widget with a confirmation view. Select the checkmark to run the action, or the cross to cancel.

<img src="/assets/ios/widgets/custom-widget-confirmation.png" alt="Custom widget asking Are you sure? before running the action of the Kitchen light tile, with a cross to cancel and a checkmark to confirm" width="350" />

**Configuration options** (in the widget's edit dialog on your Home Screen):

- **Widget**: The widget you created inside the app.
- **Show last update time**: Displays at the bottom of the widget when it last refreshed.
- **Show states**: Shows the current state of each entity. Enabled by default. See [Showing states](#showing-states) for the limitations.

The small size shows up to 3 items, medium up to 6, large up to 12, and extra large up to 20. If your widget has more items, the extra items are not shown in the smaller sizes.

**Available in:**

- System small
- System medium
- System large
- System extra large (iPadOS and macOS)

### Showing states {#showing-states}

Because iOS limits how often a widget may refresh, the app can't guarantee that the state shown by the **Common Controls** and **Custom** widgets is the latest one.

When **Show states** is enabled and **Require confirmation** is also enabled for an item, the widget may take a moment to return from the confirmation view to its normal view.

If you run into problems, turn **Show states** off, or turn **Require confirmation** off and save the widget again.

## Details

The **Details** widget shows up to three lines of text on your Lock Screen.

<img src="/assets/ios/widgets/details.png" alt="Details widget on the Lock Screen in the rectangular size, showing Living room, 21.4 °C, and Humidity 48%" width="204" />

**Configuration options:**

- **Source**: Where the text comes from. See the sources below.
- **Run Script**: When enabled, selecting the widget runs the script you choose instead of opening the app. **Notify when run** shows a notification once the script has run. This option only applies to the rectangular size.

**Available in:**

- Accessory inline
- Accessory rectangular

### Details sources

**Entity**

Select an entity and, optionally, one of its attributes. The first line shows the entity's name, the second its state, and the third its area.

- **Entity**: The entity to display.
- **Attribute**: An attribute to read instead of the entity's state. Leave empty to use the state.

**Complication**

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

## Energy

The **Energy** widget shows a summary of your energy dashboard: your totals for the selected period, the cost, and a chart. The small size shows your current power when it's available. Selecting the widget opens the energy dashboard in the app, and selecting the period or the time reloads the data.

<table>
  <tr>
    <td><img src="/assets/ios/widgets/energy.png" alt="Energy widget in the medium size, showing grid and solar totals for today, the cost, and an hourly chart" width="370" /></td>
    <td><img src="/assets/ios/widgets/energy-lock-screen.png" alt="Energy widget on the Lock Screen in the rectangular size, showing grid and solar totals for today" width="204" /></td>
  </tr>
</table>

**Requirements:**

- The [energy dashboard](https://www.home-assistant.io/docs/energy/) must be set up in Home Assistant. If it isn't, the widget shows "No energy dashboard configured".

**Configuration options:**

- **Server**: The Home Assistant server the data comes from.
- **Source**: **Auto** shows everything your energy dashboard tracks: grid, solar, battery, and gas. **Consumption** shows only the grid, while **Solar**, **Battery**, and **Gas** show only that source.
- **Period**: **Today**, **Yesterday**, **This week**, or **This month**.

**Available in:**

- System small
- System medium
- System large
- System extra large (iPadOS and macOS)
- Accessory circular
- Accessory inline
- Accessory rectangular

## Entities

The **Entities** widget shows the entities you choose, with their current state. Selecting a tile works as described in [How tapping an entity works](#how-tapping-an-entity-works).

Unlike the **Custom widget**, you set up this widget directly from your Home Screen, without creating anything in the app first. In exchange, you can't change the icons, colors, names, or tap actions.

<img src="/assets/ios/widgets/entities.png" alt="Entities widget in the medium size, showing six entities with their states, such as a kitchen light that is on, a temperature of 21.5 °C, and a locked front door" width="350" />

**Configuration options:**

- **Server**: The Home Assistant server the entities come from.
- **Entities**: The entities to display, in the order you pick them. Entities from any domain can be selected. The small size shows up to 3, medium up to 6, large up to 12, and extra large up to 20.
- **Show last update time**: Displays at the bottom of the widget when it last refreshed. Enabled by default.

**Available in:**

- System small
- System medium
- System large
- System extra large (iPadOS and macOS)

## Gauge

The **Gauge** widget shows a single value as a gauge, with text or an emoji in the middle.

<table>
  <tr>
    <td><img src="/assets/ios/widgets/gauge.png" alt="Gauge widget in the small size, showing 67% on a gauge from 0 to 100" width="190" /></td>
    <td><img src="/assets/ios/widgets/gauge-lock-screen.png" alt="Gauge widget on the Lock Screen in the circular size" width="108" /></td>
  </tr>
</table>

**Configuration options:**

- **Source**: Where the value comes from. See the sources below.
- **Gauge Type**: **Normal** shows minimum and maximum labels, **Normal (single label)** shows one label at the bottom center, and **Capacity** shows only the center label.
- **Run Script**: When enabled, selecting the widget runs the script you choose instead of opening the app. **Notify when run** shows a notification once the script has run.

**Available in:**

- System small
- Accessory circular

### Gauge sources

**Entity**

Select an entity and, optionally, one of its attributes. The value, the labels, and the range are filled in for you.

- **Entity**: The entity whose value drives the gauge.
- **Attribute**: An attribute to read instead of the entity's state. Leave empty to use the state.
- **Minimum Value**: The value that shows as an empty gauge. Defaults to 0.
- **Maximum Value**: The value that shows as a full gauge. Defaults to 100.

**Complication**

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

## Open Page

The **Open Page** widget opens any Home Assistant sidebar page.

**Configuration options:**

- **Pages**: The pages to display. The small size holds up to 3, medium up to 6, large up to 12, and extra large up to 20. The circular size holds one page. If you don't select any pages, the widget shows the first pages of your sidebar.

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

## Scripts

The **Scripts** widget runs the scripts you select. Selecting a script runs it without opening the app.

**Configuration options:**

- **Scripts**: The scripts to display. The small size holds up to 3, medium up to 6, large up to 12, and extra large up to 20. The circular size holds one script.
- **Notify when run**: Shows a notification once the script has run. Enabled by default.

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

## Sensors

The **Sensors** widget displays the values of the entities you select. Selecting an entity opens its more info dialog in the app.

<img src="/assets/ios/widgets/sensors.png" alt="Sensors widget in the medium size, showing six values: temperature, humidity, power, battery, pressure, and air quality" width="370" />

Entities from these domains can be selected: `binary_sensor`, `climate`, `device_tracker`, `input_boolean`, `input_number`, `input_select`, `input_text`, `lock`, `number`, `person`, `select`, `sensor`, `sun`, `update`, and `weather`.

**Configuration options:**

- **Server**: The Home Assistant server the entities come from.
- **Choose Sensor**: The entities to display. The small size holds up to 3, medium up to 6, large up to 12, and extra large up to 20.

:::note
This widget doesn't show values in real time. See [How often widgets update](#how-often-widgets-update).
:::

**Available in:**

- System small
- System medium
- System large
- System extra large (iPadOS and macOS)

## To-do List

The **To-do List** widget shows the open items of one to-do list from Home Assistant.

<img src="/assets/ios/widgets/todo-list.png" alt="To-do List widget in the medium size, showing a Groceries list with two items, a refresh button, and a plus button" width="370" />

From the widget you can:

- Select the circle next to an item to mark it as completed.
- Select the plus button to add a new item.
- Select an item or the list name to open the list in the app.
- Select the refresh button to reload the list.

**Configuration options:**

- **Server**: The Home Assistant server the list comes from.
- **List**: The to-do list to display. Select a server first.

The small size shows up to 2 items, medium up to 3, large up to 6, and extra large up to 12.

**Available in:**

- System small
- System medium
- System large
- System extra large (iPadOS and macOS)

## Removed widgets

- **Actions**: This widget ran iOS Actions, which are no longer supported. Use the **Scripts** widget, or a **Custom widget** with the **Run Script** action, instead.
