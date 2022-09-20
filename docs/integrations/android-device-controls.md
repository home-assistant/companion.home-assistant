---
title: "Android Device Controls"
id: 'android-device-controls'
---


The ![Android](/assets/android.svg) Android app will automatically integrate with the [smart home device controls](https://developer.android.com/guide/topics/ui/device-control) feature on devices running Android 11 or newer that support it. All that is required is that you are able to login to the app and use it remotely.

To get started, open the device controls on your device. It will depend on the device manufacturer and Android version where you'll find them, some common places are: in the quick settings panel, in the notification drawer, or in the power menu. Tap on "Add Controls" and choose the Home Assistant app. All domains listed below will be available to get added to the device controls panel. Tapping on a tile will either turn it on or off. Certain domains will also allow you to increase or decrease the range by sliding your finger back and forth on the tile.

The following domains are supported:

*  `automation` On/Off
*  `button` Press
*  `camera` Snapshot image (only supported on Android 12 or newer)
*  `climate` Temperature slider
*  `cover` Open/Close
*  `fan` On/Off, speed slider
*  `input_boolean` On/Off
*  `input_button` Press
*  `input_number` Number control slider
*  `light` On/Off, Brightness control slider
*  `lock` Lock/Unlock
*  `scene` Turn on scene
*  `script` Turn on script
*  `switch` On/Off
*  `vacuum` Start/Dock or On/Off depending on vacuum type

## Use when locked

On Android 11, you can use added controls when your device is locked.

On Android 12, you cannot use added controls when your device is locked.

On Android 13, you can control the use of added controls when your device is locked. First, make sure you've enabled the option to use device controls when locked in the system settings (Settings app > Display > Lock screen). Now you can use added controls when your device is locked! If you want to change the setting for specific controls or entities, open Home Assistant and go to Settings > Companion app > Manage Device Controls.
