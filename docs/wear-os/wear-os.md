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

The thermostat tile lets you view and adjust the temperature of a climate entity directly from your watch. Add a thermostat tile using the watch's tile picker, then open the Home Assistant app on your watch and go to **Settings** > **Thermostat**. Select the tile you want to configure and tap **Choose entity**. Each thermostat tile can be configured separately.

#### Thermostat tile appearance and controls <span class='beta'>BETA</span>

The thermostat tile offers two layouts: Classic and Enhanced. Newly added tiles default to Enhanced. Existing configured tiles retain Classic and display a one-time invitation to try Enhanced. Select **Switch to Enhanced** or **Keep Classic** to dismiss the invitation. You can change layouts at any time by tapping **Tile appearance** in the thermostat tile settings. Changing the layout does not change the thermostat's operating mode.

| Upgrade invitation | Classic |
| --- | --- |
| ![Invitation to try Enhanced](/assets/wear-os/thermostat/thermostat-invitation.png) | ![Classic thermostat tile](/assets/wear-os/thermostat/thermostat-classic.png) |

##### Classic layout

Classic retains the original temperature adjustment controls and refresh button. The target temperature or target range is displayed prominently, with the current temperature below it.

* Use **+** and **−** to adjust the target temperature. When using the Home Assistant default temperature unit, Classic uses the temperature step supported by the climate entity.
* In Heat/Cool (AUTO) mode, when the entity provides both heating and cooling targets, the buttons shift both targets together while preserving the difference between them and respecting temperature limits.
* To select a specific HVAC mode, switch HVAC off, or control the fan directly, use Enhanced.

##### Enhanced layout

Enhanced displays the current temperature prominently, along with the target temperature or separate heating and cooling targets. The available controls depend on the capabilities and current state of the selected climate entity and your tile settings.

Enhanced automatically adapts its controls to the available screen size. On displays at least 234 dp wide and 234 dp high, temperature and HVAC controls are available directly on the main tile, with 40 × 40 dp buttons. On smaller displays, the tile uses 48 × 48 dp controls and separate selection pages for HVAC modes, fan control, and optional larger temperature adjustments. This keeps the controls easy to tap without crowding the screen. No layout setting is required to switch between these two arrangements. Density-independent pixels (dp) describe the logical display size, not the physical pixel resolution.

###### Temperature adjustments and HVAC modes

* Use **+** and **−** for one-degree target adjustments, subject to the climate entity's supported temperature steps and limits.
* In Heat/Cool (AUTO) mode, when the entity provides both heating and cooling targets, the heating target is marked **H** and the cooling target **C**. Adjust each target independently using the buttons in its row.
* Select a supported HVAC mode using the flame (Heat), snowflake (Cool), or combined flame and snowflake (AUTO) icon. On smaller displays, open the mode selection page first.
* Use the power icon to turn HVAC off where supported. Select a supported HVAC mode to turn it back on. Temperature adjustments are not available while HVAC is off.
* Enable **Show fan button if supported** to control the fan. If both On and Auto fan modes are available, the button switches between them; otherwise it cycles through the available fan modes. Fan mode is independent of HVAC mode, and its behavior depends on the climate entity. With HVAC activity enabled, the tile can display **Fan only** while HVAC is off if the entity reports active fan operation and the layout has room for activity text.
* Enable **Show secondary temperature buttons** for larger adjustments. Tap **Secondary temperature step** in the tile settings to cycle through 3, 5, 2, and 10 degrees. The default secondary step is 3 degrees. The primary one-degree buttons remain available whether or not secondary adjustments are enabled.

###### Larger displays: direct controls

The main tile provides temperature adjustments and the enabled HVAC and fan controls without opening another page. With secondary adjustments enabled, the larger-step buttons appear on either side of the primary **−** and **+** controls.

| Heat | Cool | Heat/Cool (AUTO) |
| --- | --- | --- |
| ![Enhanced Heat with secondary adjustment buttons](/assets/wear-os/thermostat/thermostat-enhanced-heat.png) | ![Enhanced Cool with secondary adjustment buttons](/assets/wear-os/thermostat/thermostat-enhanced-cool.png) | ![Enhanced AUTO with independent heating and cooling adjustment rows](/assets/wear-os/thermostat/thermostat-enhanced-auto.png) |

| HVAC off | Fan control enabled |
| --- | --- |
| ![Enhanced thermostat tile in Off mode](/assets/wear-os/thermostat/thermostat-enhanced-off.png) | ![Enhanced thermostat tile with fan control on](/assets/wear-os/thermostat/thermostat-enhanced-fan-on.png) |

Secondary adjustment buttons and fan control are disabled by default and can be enabled independently. When secondary adjustments are disabled, only the primary **−** and **+** buttons appear in each temperature row. When fan control is disabled, the fan button is hidden.

| Heat | Cool | Heat/Cool (AUTO) |
| --- | --- | --- |
| ![Enhanced Heat with only primary temperature adjustment buttons](/assets/wear-os/thermostat/thermostat-enhanced-heat-primary-only.png) | ![Enhanced Cool with only primary temperature adjustment buttons](/assets/wear-os/thermostat/thermostat-enhanced-cool-primary-only.png) | ![Enhanced AUTO with only primary temperature adjustment buttons](/assets/wear-os/thermostat/thermostat-enhanced-auto-primary-only.png) |

| Heat/Cool (AUTO) with default optional controls |
| --- |
| ![Enhanced AUTO with secondary adjustments and fan control disabled](/assets/wear-os/thermostat/thermostat-enhanced-auto-default.png) |

###### Smaller displays: selection pages

On a smaller watch, Enhanced keeps the primary temperature controls on the main tile. The supported HVAC mode and optional fan controls are available on a separate selection page within the tile. Optional larger temperature adjustments also have their own selection page. These pages provide the same thermostat functions while allowing larger touch targets.

**To adjust the temperature:**

1. Tap **−** or **+** beside the target temperature on the main tile for a one-degree adjustment. In Heat/Cool (AUTO) mode, use the corresponding heating or cooling row.
2. If **Show secondary temperature buttons** is enabled, tap the target temperature itself (for example, **H70°**) to open its larger-step adjustment page.
3. Tap the larger-step **−3** or **+3** button (or the configured step) to adjust that target, or tap **Back** to return without an adjustment.

When secondary adjustments are disabled, the target temperature is a read-only value and does not open a selection page.

| AUTO main tile | Heating target adjustment page |
| --- | --- |
| ![Small Round AUTO main tile with primary heating and cooling adjustments](/assets/wear-os/thermostat/thermostat-small-round-auto.png) | ![Small Round heating target adjustment page with larger-step buttons and Back](/assets/wear-os/thermostat/thermostat-small-round-heat.png) |

**To change HVAC or fan mode:**

1. Tap the button labeled with the current HVAC mode (for example, **Auto**, **Heat**, or **Off**) on the main tile to open the mode selection page.
2. Tap the supported HVAC mode icon or the fan icon, if enabled and supported. Use the power icon to switch HVAC off.
3. Tap **Back** to return to the main tile without making a change if you do not want to select a control.

The mode selection button is available when at least one supported HVAC mode or fan control is enabled in the tile settings. Disabling HVAC mode buttons does not prevent access to an enabled, supported fan control.

| HVAC mode selection | HVAC mode selection with optional fan control |
| --- | --- |
| ![Small Round HVAC mode selection page](/assets/wear-os/thermostat/thermostat-small-round-mode-selector.png) | ![Small Round HVAC and fan control selection page](/assets/wear-os/thermostat/thermostat-small-round-mode-selector-fan.png) |

To make room for two target rows, the compact Heat/Cool (AUTO) main tile hides the entity name and, when the mode selection button is present, omits the separate activity line. Selection pages omit the entity name as well. Temporary command feedback can replace the current temperature without moving the temperature controls.

The Small Round screenshots show a 192 dp (384 × 384 pixel) Wear OS emulator with simulated thermostat data. The main tile example has fan control and secondary adjustments disabled; the adjustment and mode selection examples demonstrate additional controls available when enabled.

##### Tile settings

Open the Home Assistant app on your watch and go to **Settings** > **Thermostat**, then select the tile to customize. Each tile has independent settings.

| Entity and refresh | Appearance and units |
| --- | --- |
| ![Thermostat tile entity selection and refresh interval settings](/assets/wear-os/thermostat/thermostat-settings-1.png) | ![Thermostat tile appearance, temperature unit and HVAC mode settings](/assets/wear-os/thermostat/thermostat-settings-2.png) |

| Fan (enabled in this example), activity and secondary buttons | Secondary buttons and entity name |
| --- | --- |
| ![Enhanced thermostat fan, HVAC activity and secondary temperature button settings](/assets/wear-os/thermostat/thermostat-settings-3.png) | ![Enhanced thermostat secondary temperature buttons and entity name settings](/assets/wear-os/thermostat/thermostat-settings-4.png) |

The Enhanced layout provides the following display options:

* **Show HVAC mode buttons**: Show supported HVAC mode controls directly on larger displays or in the mode selection page on smaller displays.
* **Show fan button if supported**: Show compatible fan controls directly on larger displays or in the mode selection page on smaller displays. Disabled by default.
* **Show HVAC activity**: Show the reported activity, such as heating, cooling, idle, or fan only, where space permits.
* **Show secondary temperature buttons**: Enable larger temperature adjustments alongside the primary buttons on larger displays, or by tapping the target temperature on smaller displays. Disabled by default.
* **Secondary temperature step**: Choose the size of the larger adjustments when secondary adjustments are enabled.

Both layouts offer **Choose entity**, **Refresh interval**, **Tile appearance**, **Temperature unit**, and **Show name on tile**. The Enhanced layout may hide the name on smaller screens when additional space is needed for controls.

##### Temperature units

Both layouts support a temperature unit preference for each tile. Tap **Temperature unit** to cycle through:

* **Home Assistant default**: Uses the temperatures provided by Home Assistant.
* **Celsius**: Displays and adjusts temperatures in Celsius.
* **Fahrenheit**: Displays and adjusts temperatures in Fahrenheit.

When an explicit temperature unit is selected, the tile converts displayed temperatures and adjustments as needed. Temperature changes remain subject to the increments and limits supported by the climate entity, so rounding may occur. Changing this preference does not change the temperature unit configured on the Home Assistant server or on other tiles.

Temperature unit overrides require a supported source temperature unit. The tile uses the climate entity's temperature unit when available and otherwise uses the Home Assistant server's configured temperature unit. If neither provides a supported unit, the tile retains its default behavior.

##### Updates and thermostat responses

Both layouts process commands asynchronously. Rapid temperature adjustments build on pending changes rather than waiting for each command to finish. The tile can indicate that it is waiting for a thermostat response or that a change could not be confirmed.

With automatic refresh enabled, both layouts can receive live state changes from Home Assistant during a limited observation period while the tile is in use. Changes made elsewhere in Home Assistant may therefore appear before the next scheduled refresh. The observation period is bounded and stops when the watch is no longer interactive. Selecting a manual refresh interval disables this live observation, but commands can still be monitored for confirmation. Tap the refresh button in Classic or an empty area of the Enhanced tile to request an immediate refresh. Wear OS controls when tiles can be refreshed, so immediate updates are not guaranteed.

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
