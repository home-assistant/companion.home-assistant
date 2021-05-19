---
title: "Android Quick Settings"
id: 'android-quick-settings'
---

![Android](/assets/android.svg)><br />

The Android app offers support for quick settings [tiles](https://developer.android.com/reference/android/service/quicksettings/TileService) allowing the user to quickly execute a script or scene from the notification pull down menu. Users are able to fully customize the appearance of these tile and can reorganize them as they see fit. This feature is available on devices running Android 7.0+.

The app currently offers 5 tiles for users to setup. Each tile must have a label set and can optionally have a sublabel set. A custom icon can also be used to help differentiate between the tiles. After a label and entity ID have been selected you will be able to update the tile data. Once you have updated your tile data you will be able to edit your devices quick settings menu and then you can drag the Home Assistant icon from the list of tiles into the active section. Once a tile has been added the label and icon will update and the icon will remain in an inactive state. When you select a tile that has proper data set you will see the icon momentarily light up as we execute the service call. Upon success the tile will go back to an inactive state, if there is a failure the tile not be selectable and a toast error message will be shown. If you drag a tile that was not setup yet then the tile will be unavailable preventing action.
