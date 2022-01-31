---
title: "Overview"
id: "wear-os"
---

![Android](/assets/android.svg) &nbsp;<span class="beta">BETA</span><br />

Home Assistant has started to offer a beta version of the Wear OS app in the Google Play Store. Support at this moment is very minimal. You must be a beta user of the phone app to [participate in the beta](https://play.google.com/apps/testing/io.homeassistant.companion.android) for the watch app.

## Home Screen

The following list of domains are currently supported to toggle/execute once you log in and select them:

* `cover`
* `fan`
* `input_boolean`
* `light`
* `lock`
* `scene`
* `script`
* `switch`

### Favorites

Users can go to Settings in the Wear OS app and set favorite entities which will appear at the top of the list. These entities will be present before the rest of the entities are loaded so that they can be executed immediately upon launching the app. If you delete an entity from your Home Assistant instance there is also a setting option to clear the favorites to remove the stale entity.

The favorites can also be managed from the phone app by going to App Configuration > Wear OS app > Manage Favorites. The phone app also allows you to drag and drop the entities to change the order in which they appear on the home screen.

### Areas

If any devices or entities have been added to areas in Home Assistant, these areas will be shown in the Wear OS app below the favorites. Tapping on an area will show all primary entities in that area. Any domains with primary entities not added to an area will be shown near the bottom of the list as 'More entities'. Configuration and diagnostic entities are only shown in 'All entities', at the bottom of the list.

### Settings

The settings screen can be found at the bottom of the home screen. This is where you will be able to add favorites on the watch as well as configuring tiles. You will also find options to enable haptic feedback and/or a toast confirmation to know when you selected an entity. These settings will reflect on the home screen and the shortcuts tile.

## Tiles

Right now, two tiles are supported:

* The shortcuts tile shows up to 7 shortcuts, which can be chosen from the settings section in the Wear OS app. You will be able to select the same set of entities you can access from the home screen.
* The template tile shows a rendered template. The template can only be set from the android companion app. Note: it is not possible to scroll in a tile, the template should fit on the watch screen.

## Sensors

The Wear OS app will have [sensors](../core/sensors.md). To start with, it will only report the [battery sensors](../core/sensors.md#battery-sensors). Its important to note that sensor updates require the app to post a notification to the device in order to prevent it from being killed by the OS. You can go to into Wear device settings and turn off the SensorWorker Notification channel to stop these notifications from buzzing on your wrist.

## Beta

You can sign up for the beta [here](https://play.google.com/apps/testing/io.homeassistant.companion.android). Once installed you will be directed to adding your server and logging in.

Keep an eye out on this page as the application is enhanced with new features!
