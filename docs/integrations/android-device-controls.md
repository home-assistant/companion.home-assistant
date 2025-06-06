---
title: "Android Device Controls"
id: 'android-device-controls'
---


The ![Android](/assets/android.svg) Android app will automatically integrate with the [smart home device controls](https://developer.android.com/guide/topics/ui/device-control) feature on devices running Android 11 or newer that support it. All that is required is that you are able to login to the app and use it remotely.

To get started, open the device controls on your device. It will depend on the device manufacturer and Android version where you'll find them, some common places are: in the quick settings panel, in the notification drawer, or in the power menu. Tap on "Add Controls" and choose the Home Assistant app. All domains listed below will be available to get added to the device controls panel.

Tapping on a tile will either turn it on or off. Certain domains will also allow you to increase or decrease the range by sliding your finger back and forth on the tile.

The following domains are supported:

*  `automation` On/Off
*  `button` Press
*  `camera` Snapshot image (only supported on Android 12 or newer)
*  `climate` Temperature slider, cycle through modes
*  `cover` Open/Close
*  `fan` On/Off, speed slider
*  `humidifier` On/Off
*  `input_boolean` On/Off
*  `input_button` Press
*  `input_number` Number control slider
*  `light` On/Off, Brightness control slider
*  `lock` Lock/Unlock
*  `media_player` Play/Pause, Volume control slider
*  `number` Number control slider
*  `remote` On/Off
*  `scene` Turn on scene
*  `script` Turn on script
*  `siren` On/Off
*  `switch` On/Off
*  `vacuum` Start/Dock or On/Off depending on vacuum type

## Use when locked

On Android 11, you can use added controls when your device is locked.

On Android 12, you cannot use added controls when your device is locked.

On Android 13 and later, you can control the use of added controls when your device is locked. First, make sure you've enabled the option to use device controls when locked in the system settings (Settings app > Display > Lock screen). Now you can use added controls when your device is locked! If you want to change the setting for specific controls or entities, open Home Assistant and go to [Settings](https://my.home-assistant.io/redirect/config/) > Companion app > Manage device controls.

## Use a dashboard instead of built-in controls

Starting with Android 14, on supported devices you can also show a Home Assistant dashboard instead of the built-in controls when using the device controls feature. Both modes have their own advantages: the built-in controls are easy to use, allow you to manage locked settings for each entity and control multiple servers side by side, while a dashboard supports all Home Assistant features and allows fully customizing the controls to suit your needs. The documentation above describes built-in controls.

To switch between modes, open the app and go to [Settings](https://my.home-assistant.io/redirect/config/) > Companion app > Manage device controls and choose either 'Built-in' or 'Dashboard'. After selecting Dashboard, you can also enter the dashboard path to use (ex: `/lovelace/default_view` or `/lovelace-dashboardname/viewname`) to use a different dashboard than the default.

:::info
When switching from built-in device controls to a dashboard: if you previously used built-in device controls, you may need to remove all controls before the dashboard will be shown.
:::

## Split multiple servers into separate pages

If you are logged into multiple servers in the companion app, you can split those servers into separate 'structures'. This will make the controls for each server appear on different pages within device controls (the same as if you had other apps feeding into device controls).

This is disabled by default, but if you wish to enable it, you must have multiple servers added in the app. To enable it, open the app and go to [Settings](https://my.home-assistant.io/redirect/config/) > Companion app > Manage device controls and then toggle 'Split multiple servers into individual pages within device controls'. You may need to remove and re-add device controls in order to show the split within device controls.
