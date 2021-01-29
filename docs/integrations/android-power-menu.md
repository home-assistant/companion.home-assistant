---
title: "Android Power Menu"
id: 'android-power-menu'
---


The ![Android](/assets/android.svg) Android app will automatically integrate with the [Android 11 power menu controls](https://developer.android.com/guide/topics/ui/device-control) feature on devices that support it. All that is required is that you are able to login to the app and use it remotely. Once you are logged into the app you can then long hold the power button on your device and you will be able to "Add Controls" from the Home Assistant app. All domains listed below will be available to get added to the power menu. Tapping on a tile will either turn it on or off. Certain domains will also allow for the user increase or decrease the range by sliding their finger back and forth on the tile.

Currently support is limited to the following domains:

*  `automation` On/Off
*  `climate` Temperature slider
*  `cover` Open/Close
*  `fan` On/Off, speed slider
*  `input_boolean` On/Off
*  `input_number` Number control slider
*  `light` On/Off, Brightness control slider
*  `lock` Lock/Unlock
*  `scene` Turn on scene
*  `script` Turn on script
*  `switch` On/Off
*  `vacuum` Start/Dock or On/Off depending on vacuum type
