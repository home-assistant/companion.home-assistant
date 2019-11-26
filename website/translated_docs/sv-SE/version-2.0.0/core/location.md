---
title: Location
id: version-2.0.0-location
original_id: location
---

## Översikt

Location updates are sent from your device to Home Assistant in a number of situations:

* When you enter or exit a [zone](https://www.home-assistant.io/components/zone/) defined in Home Assistant.
* When an iBeacon is detected or lost (see [below](#ibeacons)).
* When the app is opened and it was not already open in the background.
* Via an automated background fetch.
* When an update is requested via [special notification](notifications/location.md)
* When a [URL Handler](integrations/url-handler.md) link is opened.
* When the app is called via a [X-Callback-URL](integrations/x-callback-url.md).
* When your devices detects a [*significant location change*](#location-tracking-when-outside-a-home-assistant-zone).
* Manually when the app is refreshed (swipe down when at the top of a page) or from the shortcut menu opened from 3D touching the app icon.

You can check the cause of the most recent location update by checking the value of `sensor.last_update_trigger`

Depending on your set up, location data is sent directly from your phone to your Home Assistant instances or via the Home Assistant Cloud Service. This will depend on the URLs specified in the Connection section of the App Configuration menu. Location data is not sent via any other servers or organisations. Of course, if you decide not grant the Home Assistant Companion App location permission or if you subsequently remove the location permissions (via iOS Settings>Privacy>Location Services), no location data will be sent from your device to Home Assistant. **Check this is true for notification updates**

## Getting started

Once you have installed and opened the Home Assistant Companion App for the first time, a new `device_tracker.` entity will be created. By default the entity will have a name of the form `device_tracker.<device_ID>` where `<device_ID>` is the name you have device name you have set in iOS (see: Settings>General>About). You can check the entity name within Home Assistant by visiting the Integration section of the Configuration page from the sidebar (swipe right if you're using the Companion App) then clicking or tapping on the Mobile App integration for your device and scrolling through the list of entities. You can edit the entity's `name` attribute as you desire if needed.

The following is a basic example to switch a light on when you enter your *home* zone after dark.

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

## Location tracking when outside a Home Assistant zone

The Home Assistant Companion App receives *significant location updates* from iOS. Whenever an update is received, it is sent to Home Assistant. Roughly, an update is received every time that your device transfers to a new cellular tower, a significant amount of time has passed (usually a couple hours) or a connection state changes and the system notices your location recently changed.

Apple [defines](https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/LocationAwarenessPG/CoreLocation/CoreLocation.html#//apple_ref/doc/uid/TP40009497-CH2-SW9) significant significant-change location updates as:

> The significant-change location service delivers updates only when there has been a significant change in the device’s location, such as 500 meters or more.

They also say in the [Energy Efficiency Guide](https://developer.apple.com/library/content/documentation/Performance/Conceptual/EnergyGuide-iOS/LocationBestPractices.html#//apple_ref/doc/uid/TP40015243-CH24-SW4):

> Significant-change location updates wake the system and your app once every 15 minutes, at minimum, even if no location changes have occurred.

Finally, I think this answer from [Stack Overflow](http://stackoverflow.com/a/13331625/486182) says it best:

> The significant location change is the least accurate of all the location monitoring types. It only gets its updates when there is a cell tower transition or change. This can mean a varying level of accuracy and updates based on where the user is. City area, more updates with more towers. Out of town, interstate, fewer towers and changes.

What's the real story on significant-change location updates? Who knows, because Apple keeps it private.

## Location tracking in Home Assistant zones

At launch, Home Assistant for iOS sets up geofences for all zones in your Home Assistant configuration. Enter and exit notifications are sent to Home Assistant.

### Configuration

Add `track_ios: false` to your zone configurations to disable zone location tracking for all connected iOS apps.

### iBeacons

The app has basic support for using iBeacons to trigger enter/exit updates. To configure them, add your iBeacon details to your zone like this:

```yaml
zone.home:
  beacon:
    uuid: B9407F30-F5F8-466E-AFF9-25556B57FE6D
    major: 60042
    minor: 43814
```

Restart Home Assistant and then the iOS app. It will then begin using iBeacons *instead of your location* for enter triggers around your zones. To add an iBeacon to `zone.home` add the above under your `customize`.