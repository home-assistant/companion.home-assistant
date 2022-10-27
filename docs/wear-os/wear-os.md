---
title: "Overview"
id: "wear-os"
---

![Android](/assets/android.svg)

You can access Home Assistant directly from your Wear OS watch, even when not connected to your phone using a WiFi or cellular connection on the watch or when using an iPhone. 

The app does not support all Home Assistant features. Keep an eye out on this page as the app is enhanced with new features!

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

### Areas

If any devices or entities have been added to areas in Home Assistant, these areas will be shown in the Wear OS app below the favorites. Tapping on an area will show all primary entities in that area. Any domains with primary entities not added to an area will be shown near the bottom of the list as 'More entities'. Configuration and diagnostic entities and hidden entities are only shown in 'All entities', at the bottom of the list.

### More details

Long pressing any entity opens the more details screen. This screen contains more information on the state and when the entity was last updated. The following options are given on the details screen, depending on what is supported for the entity:

- `fan`: Speed control
- `light`: Brightness control and Color temperature control

### Settings

The settings screen can be found at the bottom of the home screen. This is where you will be able to add favorites on the watch as well as configuring tiles. You will also find options to enable haptic feedback and/or a toast confirmation to know when you selected an entity. These settings will reflect on the home screen and the shortcuts tile.

## Tiles

Right now, two tiles are supported:

* The shortcuts tile shows up to 7 shortcuts, which can be chosen from the settings section in the Wear OS app. You will be able to select the same set of entities you can access from the home screen.
* The template tile shows a rendered template. The template can only be set from the android companion app. Note: it is not possible to scroll in a tile, the template should fit on the watch screen.

### Styling the template tile

You may use HTML to format the text displayed. The following tags are currently supported:

* Adding a new line: `<br>`
* Changing the text style: `<b>bold</b>`, `<i>italic</i>` or `<u>underline</u>`
* Changing the text size: `<big>large</big>` or `<small>tiny</small>`
* Changing the color: `<font color='#03a9f4'>colored text</font>`
* Using headers: `<h1>title</h1>`, `<h2>subtitle</h2>`, etc.

## Complications

An entity state complication can be displayed on your watchface. The complication is of the 'short text' type and will display the current state of the selected entity. Depending on the watch face it will also show the entity name and icon. When you add an entity to a watch face, you can select the entity to display. To change the selected entity, just change the complication and select the entity state complication again.

The complications are updated automatically whenever the screen is turned on and roughly every 15 minutes. You can force a complication to update by tapping it on the watch face.

Hint: use a [template sensor](https://www.home-assistant.io/integrations/template/#state-based-template-binary-sensors-buttons-numbers-selects-and-sensors) for full flexibility.

## Sensors

The Wear OS app also offers [sensors](../core/sensors.md#android-sensors) to consume your wearable data in Home Assistant, please refer to the link to learn more about how sensors update on Android. Not all sensors offered by the phone app will be offered by the Wear OS app. Please see the list below for what sensors are currently supported by the Wear OS app. If a sensor requires permissions you will be prompted to accept, otherwise the sensor will not enable and send data.

List of supported sensors:

*  [Battery](../core/sensors.md#battery-sensors) (enabled by default)

<span class='beta'>BETA</span>

*  [App Data](../core/sensors.md#app-data-sensors), [App Importance](../core/sensors.md#app-importance-sensor), [App Memory](../core/sensors.md#app-memory-sensor), [App Usage](../core/sensors.md#app-usage-sensors), [Current Version](../core/sensors.md#current-version-sensor)
*  [Audio](../core/sensors.md#audio-sensors)
*  Bedtime Mode - A sensor to reflect the state of Bedtime mode on the device. For best results enable Do Not Disturb or Interactive sensor. Only available on Wear OS 3 devices
*  [Do Not Disturb](../core/sensors.md#do-not-disturb-sensor)
*  [Doze](../core/sensors.md#doze-sensor), [Interactive](../core/sensors.md#interactive-sensor), [Power Save](../core/sensors.md#power-save-sensor)
*  Health Services -  Data is provided by [Health Services API](https://developer.android.com/training/wearables/health-services/passive#useractivityinfo). The following sensors are only available on Wear OS 3 devices.
    *   Activity State - A sensor to reflect the current user activity state which can be either: asleep, exercise, passive or unknown.
    *   Daily Floors - The total number floors climbed over a day, where the previous day ends and a new day begins at 12:00 AM local time.
*  [Last Update](../core/sensors.md#last-update-trigger-sensor)
*  [Network](../core/sensors.md#connection-type-sensor)
*  [Next Alarm](../core/sensors.md#next-alarm-sensor)
*  On Body - A sensor to indicate whether the wearable believes it is on the body or not. This sensor makes use of the [low latency off body detection](https://developer.android.com/reference/android/hardware/Sensor#TYPE_LOW_LATENCY_OFFBODY_DETECT) sensor.
*  [Steps](../core//sensors.md#pedometer-sensors)
*  Theater Mode - A sensor to reflect the state of Theater mode on the device. For best results enable the Interactive sensor.
*  Wet Mode - A sensor to indicate the state of Wet Mode on the current device. This sensor is also known as Touch Lock or Water Lock on some devices. This is a special mode where the user must press and hold the crown/power button for 2 seconds to re-enable touch.

Its important to note that sensor updates require the app to post a notification to the device in order to prevent it from being killed by the OS. You can go to into Wear device settings and turn off the SensorWorker Notification channel to stop these notifications from buzzing on your wrist.

:::info
Sensors updates are dependent upon the watch having data connectivity and the app being allowed to send an update. Some devices implement stricter battery saving techniques than others so updates may not happen as frequently as you would expect.
:::
