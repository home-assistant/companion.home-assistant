---
title: "Location"
id: "location"
---

## Overview

Location updates are sent from your device to Home Assistant in a number of situations:
*   When you enter or exit a [zone](https://www.home-assistant.io/components/zone/) defined in Home Assistant. For Android ensure the zone based tracking toggle is enabled in the Companion App section in [Configuration](https://my.home-assistant.io/redirect/config/).
*   When an iBeacon is detected or lost (see [below](#ibeacons)). ![iOS](/assets/iOS.svg)
*   When the app is opened and it was not already open in the background.
*   Via an automated background fetch.
*   When an update is requested via [special notification](/docs/notifications/notification-commands#request-location-updates)
*   When a [URL Handler](integrations/url-handler.md) link is opened. ![iOS](/assets/iOS.svg)
*   When the app is called via a [X-Callback-URL](integrations/x-callback-url.md). ![iOS](/assets/iOS.svg)
*   When your devices detects a [_significant location change_](#location-tracking-when-outside-a-home-assistant-zone).
*   Manually when the app is refreshed (swipe down when at the top of a page) or from the shortcut menu opened from 3D touching the app icon. ![iOS](/assets/iOS.svg)
*   When an update is requested by [sending an intent](#sending-an-intent). ![Android](/assets/android.svg)

You can check the cause of the most recent location update by checking the value of `sensor.last_update_trigger` ![iOS](/assets/iOS.svg)

Depending on your set up, location data is sent directly from your phone to your Home Assistant instances or via the Home Assistant Cloud Service. This will depend on the URLs specified in the Connection section of the Companion App section in [Configuration](https://my.home-assistant.io/redirect/config/). Location data is not sent via any other servers or organizations. Of course, if you decide not to grant the Home Assistant Companion App location permission or if you subsequently remove the location permissions (![iOS](/assets/iOS.svg) Settings>Privacy>Location Services or ![Android](/assets/android.svg) Settings>Privacy>Permissions), no location data will be sent from your device to Home Assistant. **It is important to note that none of the [sensors](sensors.md) will work if location is disabled on iOS![iOS](/assets/iOS.svg), on Android ![Android](/assets/android.svg) you can still expect to see some sensors that are not tied to location permissions**. An alternative is to disable the `device_tracker.<device_name>` entity from the [entity registry](https://www.home-assistant.io/integrations/config/#entity-registry).

## Getting started

Once you have installed and opened the Home Assistant Companion App for the first time, a new `device_tracker.` entity will be created. By default the entity will have a name of the form `device_tracker.<device_ID>` where `<device_ID>` is the device name you have set (![iOS](/assets/iOS.svg) Settings>General>About or ![Android](/assets/android.svg) Settings>About Phone). You can check the entity name within Home Assistant by visiting the [Integrations Dashboard](https://my.home-assistant.io/redirect/integrations/) of the Configuration page from the sidebar then clicking or tapping on the Mobile App integration for your device and scrolling through the list of entities. You can edit the entity's `name` attribute as you desire if needed.

The following is a basic example to switch a light on when you enter your _home_ zone after dark.

```yaml
automation:
  - alias: "Turn door light on when getting home"
    trigger:
      - platform: state
        entity_id: device_tracker.<device_ID>
        to: "home"
    condition:
      - condition: sun
        after: sunset
    action:
      - action: light.turn_on
        data:
          entity_id: light.frontdoor
```

## Entity attributes

The newly created `device_tracker` entity may provide some of the following attributes depending on your operating system.

| Name                | Unit                           |
| ------------------- | ------------------------------ |
| `source`            | _None_                         |
| `battery_level`     | percentage                     |
| `latitude`          | degrees                        |
| `longitude`         | degrees                        |
| `gps_accuracy`      | meters                         |
| `altitude`          | meters                         |
| `course`            | degrees                        |
| `speed`             | meters per second              |
| `vertical_accuracy` | meters                         |
| `floor`             | floors ![iOS](/assets/iOS.svg) |

If you want to know more about the specifics of these attributes, please refer to the relevant documentation of your operating system:

[Android](https://developer.android.com/reference/android/location/Location) or
[iOS](https://developer.apple.com/documentation/corelocation/cllocation)

## Manage location tracking level

When using core 2022.2 or later, you can configure how locations are sent in the Companion App Settings:

 - ![iOS](/assets/iOS.svg) The setting can be managed on a per-server basis. Open the server's settings and change the Location Sent setting under Privacy.
 - ![Android](/assets/android.svg) Enabling location tracking can be managed on a per-server basis, exact/zone name only applies to all servers. Go to Manage Sensors > Background Location and change the Location Sent setting.

Options available:

- **Exact** sends the GPS coordinates of your device.
- **Zone Name Only** sends just the zone name (or `not_home`), which can be useful for presence detection without exposing location. Only zones for the server in question are considered.
- **![iOS](/assets/iOS.svg) Never** or **![Android](/assets/android.svg) Disabled** will not send GPS coordinates nor zone information.

## Location tracking when outside a Home Assistant zone

![iOS](/assets/iOS.svg)

The Home Assistant Companion App receives _significant location changes_ from iOS. Whenever an update is received, it is sent to Home Assistant. Roughly, an update is received every time that your device transfers to a new cellular tower, a significant amount of time has passed (usually a couple hours) or a connection state changes and the system notices your location recently changed.

Apple [defines][apple-location-programming-guide] significant significant-change location updates as:

> The significant-change location service delivers updates only when there has been a significant change in the device’s location, such as 500 meters or more.

They also say in the [Energy Efficiency Guide][apple-energy-guide]:

> Significant-change location updates wake the system and your app once every 15 minutes, at minimum, even if no location changes have occurred.

Finally, I think this answer from [Stack Overflow][stackoverflow] says it best:

> The significant location change is the least accurate of all the location monitoring types. It only gets its updates when there is a cell tower transition or change. This can mean a varying level of accuracy and updates based on where the user is. City area, more updates with more towers. Out of town, interstate, fewer towers and changes.

What's the real story on significant-change location updates? Who knows, because Apple keeps it private.

## Location tracking in Home Assistant zones

At launch, Home Assistant for iOS sets up geofences for all zones in your Home Assistant configuration. Enter and exit notifications are sent to Home Assistant. For Android you will need to ensure that Zone Based Tracking is enabled in the App Configuration page.

### Configuration

Add `track_ios: false` to your [Zone configurations](https://my.home-assistant.io/redirect/zones/) to disable zone location tracking for all connected iOS apps. ![iOS](/assets/iOS.svg)

### iBeacons

![iOS](/assets/iOS.svg)

The app has basic support for using iBeacons to trigger enter/exit updates. To configure them, add your iBeacon details to your zone like this:

```yaml
zone.home:
  beacon:
    uuid: B9407F30-F5F8-466E-AFF9-25556B57FE6D
    major: 60042
    minor: 43814
```

Restart Home Assistant and then the iOS app. It will then begin using iBeacons _instead of your location_ for enter (but not exit) triggers around your zones. To add an iBeacon to `zone.home` add the above under your `customize`.

[apple-energy-guide]: https://developer.apple.com/library/content/documentation/Performance/Conceptual/EnergyGuide-iOS/LocationBestPractices.html#//apple_ref/doc/uid/TP40015243-CH24-SW4
[apple-location-programming-guide]: https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/LocationAwarenessPG/CoreLocation/CoreLocation.html#//apple_ref/doc/uid/TP40009497-CH2-SW9
[stackoverflow]: http://stackoverflow.com/a/13331625/486182

## Sending an intent

![Android](/assets/android.svg) Sending an intent is an advanced feature intended for users who are familiar with Android automation apps. Users can request a location update by sending an intent using an app such as Tasker or any other automation app that allows the user to send an intent. You will need to make sure that the app is running in the [background](/docs/troubleshooting/faqs#location-is-not-updating-in-android-app) and that the Single Accurate Location sensor is enabled for the updates to trigger properly.

The following steps are an example of how to send an intent using Tasker:

1.  Create a new task
2.  Add a step to the task
3.  Select "Send Intent"
4.  Under Action enter `io.homeassistant.companion.android.background.REQUEST_ACCURATE_UPDATE`
5.  Under Package enter `io.homeassistant.companion.android`
6.  Save the task
7.  Use the task with any Tasker profile to request a location update

## Android Location Sensors

![Android](/assets/android.svg) Android users can find custom sensor settings for location tracking under [Settings](https://my.home-assistant.io/redirect/config/) > Companion App > Manage Sensors > Location Sensors. These sensors all require that the app has proper location permissions and location is enabled on the device, if either of these requirements are not met then the sensors will become disabled.

*  The first sensor is `Background Location` this sensor is responsible for registering frequent background updates using [Google's Fused Location API](https://developers.google.com/location-context/fused-location-provider). Updates come in typically between 1-3 minutes but can be as often as every 30 seconds when you are using navigation like Google Maps.
*  `Background Location` also offers [high accuracy mode](#high-accuracy-mode) so you can get even faster updates. The state of this mode can be determined by the next location sensor `High Accuracy Mode` which simply reports if the mode is enabled. This sensor is not directly related to location updates that you get from Google.
*  The third location sensor is `Location Zone`, when enabled this sensor will get a list of all configured [`zones`](https://www.home-assistant.io/integrations/zone/) and will use Google's location service to create geofences containing `zone` data. This will allow for faster entry and exit detection while remaining battery friendly.

:::info 
<span class='beta'>BETA</span><br /> Google has a hard limit of 100 geofences per app. When combined with High Accuracy mode [zone with trigger range constraints](#zones-constraint) you will need to double the count per zone included in the constraint. For example if you have 2 zones total and only want the trigger range for 1 zone that means there will be 3 geofences created.
:::

*  The last location sensor is `Single Accurate Location` this sensor only gets used if the reported accuracy did not meet the criteria as set in the [sensor settings](#location-sensor-settings). This sensor is also used when the [notification command](/docs/notifications/notification-commands#request-location-updates) or an [intent](#sending-an-intent) was received by the app.

### Location Sensor Settings

 The settings allow you to adjust the required accuracy for the location to be reported to Home Assistant. Each location report received from Google contains reported accuracy, sometimes this number can be very high or low depending on certain environmental conditions. Typically the higher the number the more inaccurate the report is. You can adjust this setting independently from Background Location, Location Zone and Single Accurate Location. This will allow you to get faster zone detection while also being accurate when the app is in the background. The default value is `200` and in most use cases this will not need to be changed however you may find during [troubleshooting](/docs/troubleshooting/faqs#location-is-not-updating-in-android-app) that some reports are being skipped. In those cases you can adjust this number to go higher in order to capture those skipped reports.
 
  The Single Accurate Location sensor allows you to adjust the minimum time between updates to be sent to your server, the default is set to 1 minute (60000 milliseconds). The Single Accurate Location sensor also has a setting that allows you to include location updates as part of sensor update, note this may result in excessive location results when enabled. Typically you will not want to adjust these settings.

### High accuracy mode

![Android](/assets/android.svg)
:::caution
Be aware that when this option is enabled, your battery will drain faster than normal because of the permanent usage of GPS.
:::

The background location sensor has also the option to run in high accuracy mode. With the option `High accuracy mode (May drain battery fast)` enabled, the location updates every X seconds (defined with option `High accuracy interval`. Default 5 seconds, Minimal 5 seconds) via GPS.

You can define a Bluetooth and/or a zone constraint to restrict the use of the high accuracy mode.

:::info
If you use both constraints (Bluetooth, Zone), then only one constraint must apply to enable the high accuracy mode by default.

You can enable the combination of both constraints by enabling the according option. See [Combination](/docs/core/location#combination-of-zones-constraint-and-bluetooth-constraint).
:::

#### Bluetooth constraint

You can also enable the high accuracy mode only when connected to specific Bluetooth devices with the option `High accuracy mode only when connected to BT devices`. Be sure that the option `High accuracy mode (May drain battery fast)` is also enabled.

#### Zones constraint

Additionally, you can enable the high accuracy mode when entering a specific zone with the option `High accuracy mode only when entering zone`. If you want to enable the high accuracy mode before entering the zone, you can use the option `High accuracy mode trigger range for zone (meters)`. With this option enabled, a expanded zone (only app internal) around the original zone will be created. If you reach that expanded zone the high accuracy mode will be enabled and then disabled when you reach the original zone. Please have a look at the zone examples.

Both options require you to enable the `Location Zone` sensor.

##### Zones example

![Zones](/assets/Zone.png)

###### Zone when using the `High accuracy mode trigger range for zone (meters)` option (Value greater than 0)

In this case, the zone is defined by an expanded zone (zone.home_expanded) minus the original zone (zone.home). Shown in blue in the image.

Arriving home zone:

- Entering `zone.home_expanded` -> High accuracy mode **enabled**
- Entering `zone.home`, therefore exiting `zone.home_expanded` -> High accuracy mode **disabled**

Leaving home zone:

- Exiting `zone.home`, therefore entering `zone.home_expanded` -> High accuracy mode **enabled**
- Exiting `zone.home_expanded` -> High accuracy mode **disabled**

###### Zone when NOT using the `High accuracy mode trigger range for zone (meters)` option (Value equals 0)

In this case, only the original zone (zone.home) is used. Shown in orange in the image.

Arriving home zone:

- Entering `zone.home` -> High accuracy mode **enabled**

Leaving home zone:

- Exiting `zone.home` -> High accuracy mode **disabled**

###### Combination of Zones constraint and Bluetooth constraint

It is possible to combine in two ways. First and default option is a simple or combination which is used, when the according switch is turned off. As mentioned in the info box above, only one constraint must apply to enable high accuracy mode.

If the combination switch is turned on however, both constraints must apply to enable high accuracy mode.

As an example for enabled state would be: You are connected to your car via bluetooth AND when your device recognizes you enter a specific zone or its radius around, the high accuracy mode is turned on. If you are leaving this zone but stay connected with your car (e.g. driving further away), the high accuracy mode will be disabled. Same applies if you are walking around your home but you are not connected to your car, the high accuracy mode will stay disabled.

#### Notification

If the high accuracy mode is enabled, you will see a notification with details about the location. This notification is permanent due to requirements of the android system. But you can hide/minimize the location notification via notification settings of your system.
The notification will show your current address, if the geocoded sensor is enabled as well. Otherwise, it will show your current coordinates. Also, it will show you the accuracy of the last location found.

The high accuracy mode can be also enabled/disable by a notification command. [See here](/docs/notifications/notification-commands#high-accuracy-mode) for more details.

The state of high accuracy mode can be viewed by enabling the [sensor](sensors.md#high-accuracy-mode).

The update interval for high accuracy mode can also be viewed by enabling the [sensor](sensors.md#high-accuracy-mode).
