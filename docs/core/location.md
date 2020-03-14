---
title: "Location"
id: 'location'
---

## Overview

Location updates are sent from your device to Home Assistant in a number of situations:
*   When you enter or exit a [zone](https://www.home-assistant.io/components/zone/) defined in Home Assistant. For Android ensure the zone based tracking toggle is enabled in App Configuration.
*   When an iBeacon is detected or lost (see [below](#ibeacons)). ![iOS](/assets/apple.svg)
*   When the app is opened and it was not already open in the background.
*   Via an automated background fetch.
*   When an update is requested via [special notification](notifications/location.md)
*   When a [URL Handler](integrations/url-handler.md) link is opened. ![iOS](/assets/apple.svg)
*   When the app is called via a [X-Callback-URL](integrations/x-callback-url.md). ![iOS](/assets/apple.svg)
*   When your devices detects a [_significant location change_](#location-tracking-when-outside-a-home-assistant-zone).
*   Manually when the app is refreshed (swipe down when at the top of a page) or from the shortcut menu opened from 3D touching the app icon. ![iOS](/assets/apple.svg)
*   When an update is requested by [sending an intent](#sending-an-intent). ![Android](/assets/android.svg)

You can check the cause of the most recent location update by checking the value of `sensor.last_update_trigger` ![iOS](/assets/apple.svg)

Depending on your set up, location data is sent directly from your phone to your Home Assistant instances or via the Home Assistant Cloud Service. This will depend on the URLs specified in the Connection section of the App Configuration menu. Location data is not sent via any other servers or organisations. Of course, if you decide not grant the Home Assistant Companion App location permission or if you subsequently remove the location permissions (![iOS](/assets/apple.svg) Settings>Privacy>Location Services or ![android](/assets/android.svg) Settings>Privacy>Permissions), no location data will be sent from your device to Home Assistant. **It is important to note that none of the [sensors](sensors.md) will work if location is disabled**. An alternative is to disable the `device_tracker.<device_name>` entity from the [entity registry](https://www.home-assistant.io/integrations/config/#entity-registry).

## Getting started

Once you have installed and opened the Home Assistant Companion App for the first time, a new `device_tracker.` entity will be created. By default the entity will have a name of the form `device_tracker.<device_ID>` where `<device_ID>` is the device name you have set (![iOS](/assets/apple.svg) Settings>General>About or ![android](/assets/android.svg) Settings>About Phone). You can check the entity name within Home Assistant by visiting the Integration section of the Configuration page from the sidebar (swipe right if you're using the ![iOS](/assets/apple.svg) Companion App) then clicking or tapping on the Mobile App integration for your device and scrolling through the list of entities. You can edit the entity's `name` attribute as you desire if needed.

The following is a basic example to switch a light on when you enter your _home_ zone after dark.

```yaml
automation:
  - alias: 'Turn door light on when getting home'
    trigger:
      platform: state
      entity_id: device_tracker.<device_ID>
      to: 'home'
    condition:
      condition: sun
      after: sunset
    action:
      - service: light.turn_on
        data:
          entity_id: light.frontdoor
```

## Entity attributes
The newly created `device_tracker` entity may provide some of the following attributes depending on your operating system.

| Name              | Unit          |
|-------------------|---------------|
| `source`   |  _None_  |
| `battery_level`  |  percentage  |
| `latitude`          | degrees       |
| `longitude`         | degrees       |
| `gps_accuracy`      | meters        |
| `altitude`          | meters        |
| `course`            | degrees       |
| `speed`             | meters per second |
| `vertical_accuracy` | meters        |
| `floor`             | floors  ![iOS](/assets/apple.svg)      |

If you want to know more about the specifics of these attributes, please refer to the relevant documentation of your operating system:

[Android](https://developer.android.com/reference/android/location/Location) or
[iOS](https://developer.apple.com/documentation/corelocation/cllocation)

## Location tracking when outside a Home Assistant zone

![iOS](/assets/apple.svg)

The Home Assistant Companion App receives _significant location updates_ from iOS. Whenever an update is received, it is sent to Home Assistant. Roughly, an update is received every time that your device transfers to a new cellular tower, a significant amount of time has passed (usually a couple hours) or a connection state changes and the system notices your location recently changed.

Apple [defines][apple-location-programming-guide] significant significant-change location updates as:

> The significant-change location service delivers updates only when there has been a significant change in the device’s location, such as 500 meters or more.

They also say in the [Energy Efficiency Guide][apple-energy-guide]:

> Significant-change location updates wake the system and your app once every 15 minutes, at minimum, even if no location changes have occurred.

Finally, I think this answer from [Stack Overflow][stackoverflow] says it best:

> The significant location change is the least accurate of all the location monitoring types. It only gets its updates when there is a cell tower transition or change. This can mean a varying level of accuracy and updates based on where the user is. City area, more updates with more towers. Out of town, interstate, fewer towers and changes.

What's the real story on significant-change location updates? Who knows, because Apple keeps it private.

## Location tracking in Home Assistant zones

At launch, Home Assistant for iOS sets up geofences for all zones in your Home Assistant configuration. Enter and exit notifications are sent to Home Assistant.  For Android you will need to ensure that Zone Based Tracking is enabled in the App Configuration page.

### Configuration

Add `track_ios: false` to your zone configurations to disable zone location tracking for all connected iOS apps. ![iOS](/assets/apple.svg)

### iBeacons

![iOS](/assets/apple.svg)

The app has basic support for using iBeacons to trigger enter/exit updates. To configure them, add your iBeacon details to your zone like this:

```yaml
zone.home:
  beacon:
    uuid: B9407F30-F5F8-466E-AFF9-25556B57FE6D
    major: 60042
    minor: 43814
```

Restart Home Assistant and then the iOS app. It will then begin using iBeacons _instead of your location_ for enter triggers around your zones. To add an iBeacon to `zone.home` add the above under your `customize`.

[apple-energy-guide]: https://developer.apple.com/library/content/documentation/Performance/Conceptual/EnergyGuide-iOS/LocationBestPractices.html#//apple_ref/doc/uid/TP40015243-CH24-SW4
[apple-location-programming-guide]: https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/LocationAwarenessPG/CoreLocation/CoreLocation.html#//apple_ref/doc/uid/TP40009497-CH2-SW9
[stackoverflow]: http://stackoverflow.com/a/13331625/486182

## Sending an intent

![Android](/assets/android.svg) Sending an intent is an advanced feature intended for users who are familiar with Android automation apps. Users can request a location update by sending an intent using an app such as Tasker or any other automation app that allows the user to send an intent. You will need to make sure that the app is running in the [background](/docs/troubleshooting/faqs#location-is-not-updating-in-android-app) for the updates to trigger properly.

The following steps are an example of how to send an intent using Tasker:

1.  Create a new task
2.  Add a step to the task
3.  Select "Send Intent"
4.  Under Action enter `io.homeassistant.companion.android.background.REQUEST_ACCURATE_UPDATE`
5.  Save the task
6.  Use the task with any Tasker profile to request a location update
