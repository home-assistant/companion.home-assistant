---
title: "Overview"
id: "wear-os"
---

![Android](/assets/android.svg) 8+ only

You can access Home Assistant directly from your Wear OS watch, even when not connected to your phone using a WiFi or cellular connection on the watch.

The app does not support all Home Assistant features. Keep an eye out on this page as the app is enhanced with new features! Take a look at the [Sensors!](sensors.md)

## Prerequisites

To set up Home Assistant on a watch, you need a paired Android phone with the Home Assistant app installed to login. After logging in, the phone app is no longer used.

## Home Screen

The following list of domains are currently supported to toggle/execute once you log in and select them:

* `button`
* `cover`
* `fan`
* `input_boolean`
* `input_button`
* `light`
* `lock`
* `scene`
* `script`
* `switch`

### Favorites

Users can go to Settings in the Wear OS app and set favorite entities which will appear at the top of the list. These entities will be present before the rest of the entities are loaded so that they can be executed immediately upon launching the app. If you delete an entity from your Home Assistant instance there is also a setting option to clear the favorites to remove the stale entity.

The favorites can also be managed from the phone app by going to App Configuration > Wear OS app > Manage Favorites. The phone app also allows you to drag and drop the entities to change the order in which they appear on the home screen.

If you only wish to display the favorite entities and nothing else from the Wear OS app you can do so by opening the app and navigating to Settings then selecting "Only Show Favorites" option. This will hide the areas and domains so you only see the favorites.

### Areas

If any devices or entities have been added to areas in Home Assistant, these areas will be shown in the Wear OS app below the favorites. Tapping on an area will show all primary entities in that area. Any domains with primary entities not added to an area will be shown near the bottom of the list as 'More entities'. Configuration and diagnostic entities and hidden entities are only shown in 'All entities', at the bottom of the list.

### More details

Long pressing any entity opens the more details screen. This screen contains more information on the state and when the entity was last updated. The following options are given on the details screen, depending on what is supported for the entity:

- `fan`: Speed control
- `light`: Brightness control and Color temperature control

### Settings

The settings screen can be found at the bottom of the home screen. This is where you will be able to add favorites on the watch as well as configuring tiles. You will also find options to enable haptic feedback and/or a toast confirmation to know when you selected an entity. These settings will reflect on the home screen and the shortcuts tile.

## Tiles

* The Shortcuts tile shows up to 7 shortcuts, which can be chosen from the settings section in the Wear OS app. You will be able to select the same set of entities you can access from the home screen.  Starting from Wear OS 3, any number of separately configurable tiles can be added, only limited by Wear OS's limit for the total number of tiles.
* The Template tile shows a rendered template. The template can only be set from the Android companion app. Note: it is not possible to scroll in a tile, the template should fit on the watch screen.
* The Camera tile shows a snapshot of the selected camera.
* The Assist tile allows you to quickly [open Assist on your watch](https://www.home-assistant.io/voice_control/android/#assist-on-wear-os).
* The Thermostat tile allows you to see and control the target temperature of a climate entity.
 
:::note About tile refreshes
Wear OS limits how frequently apps can update tiles and how interactive they can be. For the camera, template and thermostat tiles you can choose a refresh interval which indicates to the system how often the tile should be refreshed.

 - Manual (only updates when you tap the refresh button)
 - In view (only updates when you scroll a tile into view, not supported on Wear OS 6 or newer)
 - Every x minutes/hours (updates the tile in the background, even when not viewed)

For intervals other than 'Manual', the system does not guarantee updates: if the tiles are not placed at the start or end of the tiles list, they will most likely update less frequently. You may see an old version of a tile for 1-2 seconds while it updates.

The options for updating every x minutes/hours still update the tile when viewed. For example: choosing an update interval of 1 hour will indicate to the system that the tile should be updated when viewed, and every hour in the background since it was last viewed.
:::

### Styling the template tile

You may use HTML to format the text displayed. The following tags are currently supported:

* Adding a new line: `<br>`
* Changing the text style: `<b>bold</b>`, `<i>italic</i>` or `<u>underline</u>`
* Changing the text size: `<big>large</big>` or `<small>tiny</small>`
* Changing the color: `<font color='#03a9f4'>colored text</font>`
* Using headers: `<h1>title</h1>`, `<h2>subtitle</h2>`, etc.

### Thermostat tile
The thermostat tile can be used to change the target temperature of a climate entity up or down by the step size. Since tile refreshing is limited it can happen that the target temperature shown is no longer accurate. Therefor, if a user changes the temperature through the tile the current target temperature is always first refreshed. If a user changes the temperature multiple times quickly, each click changes the temperature relative to the result previous click instead of getting the target temperature from the server. This is done to counteract the delay in changing target temperature by some thermostats.


#### Thermostat tile appearance and controls <span class='beta'>BETA</span>

The thermostat tile offers two layouts. To choose a layout, open the Home Assistant app on your watch, go to the thermostat tile settings, and tap **Tile appearance**. You can configure each tile separately.

* **Classic**: Keeps the original temperature controls and refresh button. You can optionally show a power button if the selected climate entity supports power control.
* **Enhanced**: Shows the current temperature, target temperature, and direct controls for supported HVAC modes and fan settings. The name of the selected entity can be shown along the curved top of the tile.

| Classic | Classic with power | Enhanced (Heat) |
| --- | --- | --- |
| ![Classic thermostat tile](/assets/wear-os/thermostat/thermostat-classic.png) | ![Classic thermostat tile with optional power button](/assets/wear-os/thermostat/thermostat-classic-with-power.png) | ![Enhanced thermostat tile in Heat mode](/assets/wear-os/thermostat/thermostat-enhanced-heat.png) |

In the Enhanced layout:

* Use **+** and **−** to adjust the target by one degree, subject to the temperature step and limits supported by the thermostat.
* Use the outer temperature buttons for larger adjustments. Under **Secondary temperature step**, tap to cycle between 2, 3, 5, and 10 degrees.
* Select Heat, Cool, or Auto (Heat/Cool) directly when supported. In Heat/Cool mode, separate rows let you adjust the heating and cooling targets independently.
* Use the fan button to change the fan mode and the power button to turn the thermostat on or off, where supported. Fan mode is independent of HVAC mode; its available options and behavior depend on the climate entity.
* Use **Show HVAC mode buttons**, **Show fan button if supported**, **Show HVAC activity**, and **Show name on tile** to customize the display. On smaller screens, the name may be hidden to make room for both temperature rows.

| Enhanced (Cool) | Enhanced (Auto) | Enhanced (Off) | Enhanced (Off with fan activity) |
| --- | --- | --- | --- |
| ![Enhanced thermostat tile in Cool mode](/assets/wear-os/thermostat/thermostat-enhanced-cool.png) | ![Enhanced thermostat tile in Auto mode](/assets/wear-os/thermostat/thermostat-enhanced-auto.png) | ![Enhanced thermostat tile in Off mode](/assets/wear-os/thermostat/thermostat-enhanced-off.png) | ![Enhanced thermostat tile in Off mode with fan activity](/assets/wear-os/thermostat/thermostat-enhanced-fan-on.png) |

When HVAC activity is enabled, the Enhanced layout displays Fan only even in Off mode if the climate entity reports active fan operation.

With these beta enhancements, both layouts use asynchronous command processing instead of always fetching the current target temperature before sending an adjustment. Rapid temperature adjustments build on pending changes instead of waiting for each command to finish. The tile can indicate that it is waiting for a thermostat response or that a change could not be confirmed.

With automatic refresh enabled, both layouts can also receive live state changes from Home Assistant during a short observation period when the tile is in use. Changes made elsewhere in Home Assistant can therefore appear without waiting for the configured refresh interval. The live subscription is time-limited and stops when the watch is no longer interactive. The Manual refresh setting disables this live observation. Wear OS still controls when tiles can be refreshed, so immediate updates are not guaranteed.

##### Temperature units

Both Classic and Enhanced layouts support an individual temperature unit preference for each tile. Open the thermostat tile settings and select **Temperature unit** to choose:

* **Home Assistant default**: Uses the temperatures provided by Home Assistant.
* **Fahrenheit**: Displays and adjusts temperatures in Fahrenheit.
* **Celsius**: Displays and adjusts temperatures in Celsius.

When a different unit is selected, current temperatures, target temperatures, and temperature adjustments are converted automatically. Adjustments remain subject to the temperature limits and increments supported by the climate entity, so rounding may occur.

Changing this preference does not change the temperature unit configured on the Home Assistant server or in other tiles.

Temperature unit overrides require Home Assistant Core 2026.11 or newer. If the climate entity does not report its temperature unit, the tile retains the default behavior.

Related development: Thanks to [@siemon-geeroms](https://github.com/siemon-geeroms) for his work on optional thermostat power controls and tile responsiveness in [Android PR #7877](https://github.com/home-assistant/android/pull/7877).

## Complications

* An entity state complication can be displayed on your watchface. The complication will display the current state of the selected entity and optionally the name and unit of the measurement. Depending on the watchface, the complication may also show the entity name and icon, and supports 'short text' and 'long text' complication types.

  When you add an entity to a watchface, you can select the entity to display. This only works when editing the watchface on the watch, not in the watch app on the phone. To change the selected entity, just change the complication and select the entity state complication again. The complications are updated automatically whenever the screen is turned on and roughly every 15 minutes. You can force a complication to update by tapping it on the watchface.

  Tip: use a [template sensor](https://www.home-assistant.io/integrations/template/#state-based-template-binary-sensors-buttons-numbers-selects-and-sensors) for full flexibility.

* An Assist complication can be used to quickly interact with the Assist feature directly from the watchface.

## Notifications


Wear OS devices will relay [notifications](../notifications/basic.md) from any app on the connected device by default, meaning the notification needs to be sent to the connected device first before it reaches the wearable. The Wear OS app allows for notifications to be sent directly to the watch itself, skipping the connected device. Not all notification features supported by the connected device will be supported by the Wear OS app due to platform limitations.

Currently only the following parameters are supported.

*  [`channel`](../notifications/basic.md#notification-channels)
*  `message`
*  [`notification_icon`](../notifications/basic.md#notification-status-bar-icon) (Not all devices will show the icon)
*  [`tag`](../notifications/basic.md#replacing) (Support limited to replacing a notification only)
*  `title`
*  [`vibrationPattern`](../notifications/basic.md#notification-vibration-pattern) (May need to set the vibration if your device does not vibrate by default, the pattern may not be respected based on the device)

Example:

```yaml
automation:
  - alias: 'Send Wearable Notification'
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "Notification message"
          title: "Notification title"
          data:
            notification_icon: "mdi:fire"
            tag: "notification"
```

:::info
To speed up delivery of notifications you may need to use the first critical notification format listed in the [docs](../notifications/critical.md#android). Alarm stream notifications are currently not supported in Wear OS.
:::

### Notification Commands

The Wear OS app has basic support for [notification commands](../notifications/commands.md). Unfortunately not all commands will be able to be supported in the app. The below list of commands are currently supported:

*  [BLE Transmitter](../notifications/commands.md#ble-beacon-transmitter)
*  [Beacon Monitor](../notifications/commands.md#beacon-monitor)
*  [Clearing notifications](../notifications/basic.md#clearing)
*  [Stop TTS](../notifications/commands.md#stop-tts)
*  [Update Sensors](../notifications/commands.md#update-sensors)

### Notification Cleared

The Wear OS app also has support for [Notification Cleared](../notifications/notification-cleared/) events. An event will be sent from the companion app when the notification is cleared.

### Text To Speech Notifications

The Wear OS app also has support for [Text To Speech notifications](../notifications/basic.md#text-to-speech-notifications). Please refer to the link above for the format to use as well as considerations on its usage.
