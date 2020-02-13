---
title: Feature overview
id: 'core'
---

The Home Assistant Companion App provides a convenient way to view and control your Home Assistant instance however it also extends the power of your instance by allowing your device to act as a data source. The Home Assistant Companion App adds numerous [sensors](sensors.md) (such as battery and network status among others), creates a `device_tracker` entity to allow [location](location.md) updates to be sent from the device and also provides [action shortcuts](actions.md) to trigger scripts or automations.

Not all features are supported by Android at the moment but eventually most features will be supported.  Look for the ![android](/assets/android.svg) Android logo to see what is currently supported.

![iOS](/assets/apple.svg) iOS and ![android](/assets/android.svg) Android Feature Comparison:

| Integrations | ![android](/assets/android.svg) | ![iOS](/assets/apple.svg) |
| ------ | ------ | ------ |
| [App Events](../integrations/app-events.md) |  | ☑ |
| [Haptic Feedback](../integrations/haptics.md) |  | ☑ |
| [Theming](../integrations/theming.md) | ☑ | ☑ |
| [URL Handler](../integrations/url-handler.md) |  | ☑ |
| [Universal Links](../integrations/universal-links.md) |  | ☑ |
| [X-Callback-URL](../integrations/x-callback-url.md) |  | ☑ |

| Location Updates | ![android](/assets/android.svg) | ![iOS](/assets/apple.svg) |
| ------ | ------ | ------ |
| [App Opened](location.md#overview) | ☑ | ☑ |
| [App Refreshed](location.md#overview) |  | ☑ |
| [Background](location.md#overview) | ☑ | ☑ |
| [Enter/Exit Zone](location.md#location-tracking-in-home-assistant-zones) | ☑ | ☑ |
| [iBeacon](location.md#ibeacons) |  | ☑ |
| [Request Location Updates](../notifications/location.md) | ☑ | ☑ |
| [Significant Location Change](location.md#location-tracking-when-outside-a-home-assistant-zone) | ☑ | ☑ |
| [URL Handler](location.md#overview) |  | ☑ |
| [X-Callback-URL](location.md#overview) |  | ☑ |

| Notifications | ![android](/assets/android.svg) | ![iOS](/assets/apple.svg) |
| ------ | ------ | ------ |
| [Actionable](../notifications/actionable.md) | ☑ | ☑ |
| [Badge](../notifications/basic.md#badge) |  | ☑ |
| [Click Action](../notifications/basic.md#notification-click-action) | ☑ |  |
| [Color](../notifications/basic.md#notification-color) | ☑ |  |
| [Critical Alerts](../notifications/critical.md) | ☑ | ☑ |
| [Dynamic Attachments](../notifications/dynamic-content.md) |  | ☑ |
| [Image](../notifications/attachments.md) | ☑ | ☑ |
| [Message](../notifications/basic.md) | ☑ | ☑ |
| [Presentation](../notifications/basic.md#controlling-how-a-notification-is-displayed-when-in-the-foreground) |  | ☑ |
| [Replaceable Notifications](../notifications/basic.md#replacing-notifications) | ☑ | ☑ |
| [Request Location Updates](../notifications/location.md) | ☑ | ☑ |
| [Sound](../notifications/sounds.md) |  | ☑ |
| [Sticky](../notifications/basic.md#sticky-notification) | ☑ |  |
| [Subtitle](../notifications/basic.md#subtitle) |  | ☑ |
| [Threads](../notifications/basic.md#thread-id-grouping-notifications) |  | ☑ |
| [Title](../notifications/basic.md) | ☑ | ☑ |
| [Video](../notifications/attachments.md) |  | ☑ |

| Sensors | ![android](/assets/android.svg) | ![iOS](/assets/apple.svg) |
| ------ | ------ | ------ |
| [Activity Sensor](sensors.md#activity-sensor) |  | ☑ |
| [Average Active Pace](sensors.md#pedometer-sensors) |  | ☑ |
| [Battery Level](sensors.md#battery-sensors) | ☑ | ☑ |
| [Battery State](sensors.md#battery-sensors) | ☑ | ☑ |
| [BSSID](sensors.md#connection-type-sensor) | ☑ | ☑ |
| [Connection Type](sensors.md#connection-type-sensor) | ☑ | ☑ |
| [Distance](sensors.md#pedometer-sensors) |  | ☑ |
| [Floors Ascended](sensors.md#pedometer-sensors) |  | ☑ |
| [Floors Descended](sensors.md#pedometer-sensors) |  | ☑ |
| [Geocoded Location](sensors.md#geocoded-location-sensor) |  | ☑ |
| [Last Update Trigger](sensors.md#last-update-trigger-sensor) |  | ☑ |
| [Sim 1](sensors.md#cellular-provider-sensor) |  | ☑ |
| [Sim 2](sensors.md#cellular-provider-sensor) |  | ☑ |
| [SSID](sensors.md) |  | ☑ |
| [Steps](sensors.md#pedometer-sensors) |  | ☑ |
