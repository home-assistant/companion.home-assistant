---
title: "Android Quick Settings"
id: 'android-quick-settings'
---

![Android](/assets/android.svg)<br />

The Android app offers support for quick settings [tiles](https://developer.android.com/reference/android/service/quicksettings/TileService) allowing you to quickly execute a script/scene, press (input) buttons or toggle supported domains from the notification pull down menu. You can fully customize the appearance of these tile and can reorganize them as you see fit. This feature is available on devices running Android 7.0+. To get started navigate to [Settings](https://my.home-assistant.io/redirect/config/) > Companion App > Manage Tiles.

The app currently offers 12 tiles to setup. Each tile must have a label set and on Android 10 or newer can optionally have a sublabel set. A custom icon can also be used to help differentiate between the tiles. After a label and entity have been selected you will be able to update the tile data. Once updated, the tile is ready to be used: edit your device's quick settings panel and drag the Home Assistant tile from the list of tiles into the active section.

Once a tile has been added, the state, label and icon will update to reflect the entity's state and tile settings. When you select a tile you will see the tile momentarily light up as the app calls the server. If successfull the tile will go back to show the entity's state, if there is a failure the tile changes to a disabled state and an error message will be shown.

The following domains are supported: 

*  `automation` Toggle <span class='beta'>BETA</span>
*  `button` Press
*  `cover` Toggle
*  `fan` Toggle
*  `humidifier` Toggle
*  `input_boolean` Toggle
*  `input_button` Press
*  `light` Toggle
*  `lock` Lock/Unlock
*  `media_player` Toggle
*  `remote` Toggle
*  `siren` Toggle
*  `scene` Turn on scene
*  `script` Turn on script
*  `switch` Toggle
