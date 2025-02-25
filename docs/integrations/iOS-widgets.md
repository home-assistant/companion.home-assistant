---
title: "iOS Widgets"
id: ios-widgets
---

# iOS Widgets

The iOS App comes with several built-in widgets. And since iOS app release 2025.3, there is now a "Custom Widget" (BETA) option to create a customized tile-card-like widget.

For each widget you can configure by tapping on them while in edit mode, you will be prompted with a few options.

iOS, iPadOS and macOS have different widget sizes available:
- System
  - Small
  - Medium
  - Large
  - Extra large **(macOS)**
- Accessory **(iOS & iPadOS lock screen)**
  - Circular
  - Inline
  - Rectangular

# Assist In-App

The Assist in-app widget allows you to open Assist inside the App, using the pipeline of your preference.  To edit the widget options, add the widget to your Home Screen and tap on it once again.

### Available in

<table>
  <tr>
    <td>System small</td>
    <td>Accessory circular</td>
  </tr>
</table>
<table>
  <tr>
    <td><img src='/assets/ios/assist-in-app-widget.jpeg' alt="Assist In App Widget" height="300"/></td>
    <td><img src='/assets/ios/assist-in-app-widget-config.jpeg' alt="Assist In App Widget Configuration" height="300"/></td>
  </tr>
</table>

# Scripts

The **Scripts** widget allows you to execute scripts.
To receive a notification after the script is executed, enable the option in its configuration dialog.
### Available in

<table>
  <tr>
    <td>System small</td>
    <td>System medium</td>
    <td>System large</td>
    <td>System extra large (macOS)</td>
    <td>Accessory circular</td>
  </tr>
</table>

<table>
  <tr>
    <td><img src='/assets/ios/scripts-widget.jpeg' alt="Scripts Widget" height="300"/></td>
    <td><img src='/assets/ios/scripts-widget-config.jpeg' alt="Scripts Widget Configuration" height="300"/></td>
  </tr>
</table>


# Sensors

The **Sensors** widget displays sensor values, using the minimum update interval iOS allows (~15 minutes). Don't use this widget to display data that should show updates in real-time.

<table>
  <tr>
    <td><img src='/assets/ios/sensors-widget.jpeg' alt="Sensors Widget" height="300"/></td>
    <td><img src='/assets/ios/sensors-widget-config.jpeg' alt="Sensors Widget Configuration" height="300"/></td>
  </tr>
</table>

# Open Page

The **Open page** widget allows you to open any Home Assistant sidebar page.
### Available in
<table>
  <tr>
    <td>System small</td>
    <td>System medium</td>
    <td>System large</td>
    <td>System extra large (macOS)</td>
    <td>Accessory circular</td>
  </tr>
</table>

<table>
  <tr>
    <td><img src='/assets/ios/open-page-widget.jpeg' alt="Open Page Widget" height="300"/></td>
    <td><img src='/assets/ios/open-page-widget-config.jpeg' alt="Open Page Widget Configuration" height="300"/></td>
  </tr>
</table>

# Gauge Widget (Advanced)

The **Gauge** widget lets you create a gauge representation using Home Assistant templating **(user needs to be Administrator to be able to use this feature)**, decide the minimum, maximum, and current value, along with the display text (or emoji 🥳) in the center and bottom of the widget.

### Available in

<table>
  <tr>
    <td>Accessory circular</td>
  </tr>
</table>

For gauge type "Normal":
- **Value template:** The current value which will be used to display the gauge chart.
- **Value label template:** The text/emoji that will be displayed on the center of the widget
- **Min label template:** The minimum value that will be displayed on the bottom left
- **Max label template:** The maximum value that will be displayed on the bottom right

For gauge type "Normal (single label)":
- **Value template:** The current value which will be used to display the gauge chart.
- **Value label template:** The text/emoji that will be displayed on the center of the widget
- **Label template:** The text/emoji that will be displayed at the bottom center

For gauge type "Capacity":
- **Value template:** The current value which will be used to display the gauge chart.
- **Value label template:** The text/emoji that will be displayed on the center of the widget

There is also an option to run an iOS Legacy Action, this will soon be converted  into "Run script".
<table>
  <tr>
    <td><img src='/assets/ios/gauge-widget.jpeg' alt="Gauge Widget" height="300"/></td>
    <td><img src='/assets/ios/gauge-widget-config.jpeg' alt="Gauge Widget Configuration" height="300"/></td>
  </tr>
</table>


# Details (Advanced)

The **Details** widget lets you display up to 3 lines of information using Home Assistant templating **(user needs to be Administrator to be able to use this feature)**.

### Available in

<table>
  <tr>
    <td>Accessory Inline</td>
    <td>Accessory Circular</td>
  </tr>
</table>

<table>
  <tr>
    <td><img src='/assets/ios/details-widget.jpeg' alt="Details Widget" height="300"/></td>
    <td><img src='/assets/ios/details-widget-config.jpeg' alt="Details Widget Configuration" height="300"/></td>
  </tr>
</table>

# Custom Widgets (BETA)

The most customizable widget available, this one you can create it's configuration inside the App through **Companion App Settings → Widgets → Create**, decide which entities to display, choose their icon, icon color, display text, text color, background color, "On tap" action and if it requires confirmation before running.

**The "On tap" action options are:**
- Default (for most entities it toggles them and when not possible it will just refresh the widget)
- Navigate: Same funcionality as the "Open page widget" but with the flexibility to define any path for it's navigation.
- Run script
- Assist
- Nothing (It refreshes the widget but nothing else executed)

**In widget configuration dialog (the one you access from your home screen), you have 3 options:**
- Widget: Choose the widget that you created inside the App
- Show last update time: This displays at the bottom of the widget what was the last time it updated since we can't display realtime information in iOS widgets.
- Show states: You can decide to show or not entities states, currently showing is in BETA due to the fact that we can't guarantee the latest state always. When enabled it may also delay the widget UI transition from the confirmation state (if 'Require confirmation' is enabled) back to the default view.

**Workaround to update states more often:**

In iOS we have a limited budget of how many times a widget can be updated and even when we ask for this update (in background) it's not guaranteed that it will happens, iOS takes into consideration user usage of the App, if the screen is on/off, is the widget is visible and several other factors.
To increase the amount of times it is refreshed you can [send a silent push notification with "update_widgets" command on it](/docs/notifications/notification-commands), you can even create an automation to send this push everytime a specific entity state changes.
### Available in
<table>
  <tr>
    <td>System small</td>
    <td>System medium</td>
    <td>System large</td>
  </tr>
</table>

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