---
title: "Android Quick Settings"
id: 'android-quick-settings'
---

![Android](/assets/android.svg)<br />

The Android app offers support for quick settings [tiles](https://developer.android.com/reference/android/service/quicksettings/TileService) allowing you to quickly execute a script/scene, press (input) buttons or toggle supported domains from the notification pull down menu. You can fully customize the appearance of these tile and can reorganize them as you see fit. This feature is available on devices running Android 7.0+. To get started navigate to [Settings](https://my.home-assistant.io/redirect/config/) > Companion App > Manage Tiles.

The app currently offers up to 40 tiles to setup. Each tile must have a label set and on Android 10 or newer can optionally have a sublabel set. After a label and entity have been selected you will be able to update the tile data. Once updated, the tile is ready to be used: edit your device's quick settings panel and drag the Home Assistant tile from the list of tiles into the active section.

Once a tile has been added, the state, label and icon will update to reflect the entity's state and tile settings. When you select a tile you will see the tile momentarily light up as the app calls the server. If successfull the tile will go back to show the entity's state, if there is a failure the tile changes to a disabled state and an error message will be shown.

The following domains are supported: 

*  `automation` Toggle
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

State Display via Binary Sensor:

To address entities that perform actions (such as toggling or pressing) without changing their state, tiles can now be linked to a `binary_sensor`. This sensor provides visual feedback on the tile, representing the actual state of the entity. This feature is ideal for entities like switches controlling mechanisms (e.g., a garage door opener) where the state (open or closed) needs to be monitored separately.

Optional additional settings:

* Tiles will use the entity icon by default. Tap on the icon to use a different icon for the tile.
* Vibrate when clicked can be enabled to vibrate once when the tile is clicked and twice if the service call fails.
* Requires unlocked device can be enabled to only allow interacting with the tile if the device is unlocked.
