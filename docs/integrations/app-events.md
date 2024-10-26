---
title: App Events
id: 'app-events'
---

## Overview


To help with running automations, such as clearing app icon badges, or other tasks you may wish to trigger based on app usage the Home Assistant Companion Apps will fire different events onto the Home Assistant [event bus](https://www.home-assistant.io/docs/configuration/events/) during certain situations.

![iOS](/assets/iOS.svg)<br />

| Event | Cause |
| ----- | ----- |
| `ios.finished_launching` | The app opens when not already running in the background. This will also cause `ios.became_active` to be fired. |
| `ios.entered_background` | The app is closed but left running in background (by either pressing the home button or swiping up on model without a home button). |
| `ios.became_active` | The app is opened whether or not it was already in the background. |
| `ios.zone_entered` | A zone was entered. If this zone is smaller than 100m, this will include a `multi_region_zone_id` key. |
| `ios.zone_exited` | A zone was exited. If this zone is smaller than 100m, this will include a `multi_region_zone_id` key. |

![Android](/assets/android.svg)


| Event | Cause |
| ----- | ----- |
| `android.intent_received` | When the app receives a broadcast intent for a registered intent from [Last Update Sensor](../core/sensors.md#last-update-trigger-sensor). Event data will contain the intent action string and any intent extras, if available. |
| `android.navigation_started` | When a entity under the `Navigation` category is selected from Android Auto/Automotive. Event data will contain the selected entity ID. |
| `android.zone_entered` | A zone was entered. Event data will contain all location data including the triggering zone. Available for [`full` flavor](/docs/core/android-flavors) users only. |
| `android.zone_exited` | A zone was exited. Event data will contain all location data including the triggering zone. Available for [`full` flavor](/docs/core/android-flavors) users only. |
| `mobile_app.migration_failed` | The app database was corrupted and has been reset during the migration to allow the app to open. Sensors will need to be re-enabled and widgets will need to be recreated. A notification will also be posted on the device informing the user of the issue. |

You can use the Events page within Home Assistant's developer tools to show all information contained with the event for a particular event by subscribing to the event you are interested in and carrying out the appropriate action with on your device.
