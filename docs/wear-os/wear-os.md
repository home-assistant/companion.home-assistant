---
title: "Overview"
id: "wear-os"
---

![Android](/assets/android.svg) &nbsp;<span class="beta">BETA</span><br />

Home Assistant has started to offer a beta version of the Wear OS app in the Google Play Store. Support at this moment is very minimal. You must be a beta user of the phone app to participate in the beta for the watch app. The following list of domains are currently supported to toggle/execute once you login and select them:

* `input_boolean`
* `light`
* `lock`
* `scene`
* `script`
* `switch`

## Favorites

Users can also go to Settings in the Wear OS app and set favorite entities which will appear at the top of the list. These entities will also be present before the rest of the entities are loaded so that they can be executed immediately upon launching the app. If you delete an entity from your Home Assistant instance there is also a setting option to clear the favorites to remove the stale entity.

The favorites can also be managed from the phone app by going to App Configuration > Wear OS app > Manage Favorites

## Tiles

The shortcuts tile shows up to 7 shortcuts, which can be chosen from the settings section in the Wear OS app.

## Sensors

The Wear OS app will have [sensors](../core/sensors.md). To start with, it will only report the [battery sensors](../core/sensors.md#battery-sensors).

## Beta

You can sign up for the beta [here](https://play.google.com/apps/testing/io.homeassistant.companion.android). Once installed you will be directed to adding your server and logging in.

Keep an eye out on this page as the application is enhanced with new features!
