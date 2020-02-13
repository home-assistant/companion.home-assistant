---
title: Feature overview
id: 'core'
---

The Home Assistant Companion App provides a convenient way to view and control your Home Assistant instance however it also extends the power of your instance by allowing your device to act as a data source. The Home Assistant Companion App adds numerous [sensors](sensors.md) (such as battery and network status among others), creates a `device_tracker` entity to allow [location](location.md) updates to be sent from the device and also provides [action shortcuts](actions.md) to trigger scripts or automations.

Not all features are supported by Android at the moment but eventually most features will be supported.  Look for the ![android](/assets/android.svg) Android logo to see what is currently supported.

![iOS](/assets/apple.svg) iOS and ![android](/assets/android.svg) Android Feature Comparison:

| Integrations | ![android](/assets/android.svg) | ![iOS](/assets/apple.svg) |
| ------ | ------ | ------ |
| [App Events](../integrations/app-events.md) |  | :white_check_mark: |
| [Haptic Feedback](../integrations/haptics.md) |  | :white_check_mark: |
| [Theming](../integrations/theming.md) | :white_check_mark: | :white_check_mark: |
| [URL Handler](../integrations/url-handler.md) |  | :white_check_mark: |
| [Universal Links](../integrations/universal-links.md) |  | :white_check_mark: |
| [X-Callback-URL](../integrations/x-callback-url.md) |  | :white_check_mark: |

| Location Updates | ![android](/assets/android.svg) | ![iOS](/assets/apple.svg) |
| ------ | ------ | ------ |
| [App Opened](location.md#overview) | :white_check_mark: | :white_check_mark: |
| [App Refreshed](location.md#overview) |  | :white_check_mark: |
| [Background](location.md#overview) | :white_check_mark: | :white_check_mark: |
| [Enter/Exit Zone](location.md#location-tracking-in-home-assistant-zones) | :white_check_mark: | :white_check_mark: |
| [iBeacon](location.md#ibeacons) |  | :white_check_mark: |
| [Request Location Updates](../notifications/location.md) | :white_check_mark: | :white_check_mark: |
| [Significant Location Change](location.md#location-tracking-when-outside-a-home-assistant-zone) | :white_check_mark: | :white_check_mark: |
| [URL Handler](location.md#overview) |  | :white_check_mark: |
| [X-Callback-URL](location.md#overview) |  | :white_check_mark: |

| Notifications | ![android](/assets/android.svg) | ![iOS](/assets/apple.svg) |
| ------ | ------ | ------ |
| [Actionable](../notifications/actionable.md) | :white_check_mark: | :white_check_mark: |
| [Badge](../notifications/basic.md#badge) |  | :white_check_mark: |
| [Click Action](../notifications/basic.md#notification-click-action) | :white_check_mark: |  |
| [Color](../notifications/basic.md#notification-color) | :white_check_mark: |  |
| [Critical Alerts](../notifications/critical.md) | :white_check_mark: | :white_check_mark: |
| [Dynamic Attachments](../notifications/dynamic-content.md) |  | :white_check_mark: |
| [Image](../notifications/attachments.md) | :white_check_mark: | :white_check_mark: |
| [Message](../notifications/basic.md) | :white_check_mark: | :white_check_mark: |
| [Presentation](../notifications/basic.md#controlling-how-a-notification-is-displayed-when-in-the-foreground) |  | :white_check_mark: |
| [Replaceable Notifications](../notifications/basic.md#replacing-notifications) | :white_check_mark: | :white_check_mark: |
| [Request Location Updates](../notifications/location.md) | :white_check_mark: | :white_check_mark: |
| [Sound](../notifications/sounds.md) |  | :white_check_mark: |
| [Sticky](../notifications/basic.md#sticky-notification) | :white_check_mark: |  |
| [Subtitle](../notifications/basic.md#subtitle) |  | :white_check_mark: |
| [Threads](../notifications/basic.md#thread-id-grouping-notifications) |  | :white_check_mark: |
| [Title](../notifications/basic.md) | :white_check_mark: | :white_check_mark: |
| [Video](../notifications/attachments.md) |  | :white_check_mark: |

| Sensors | ![android](/assets/android.svg) | ![iOS](/assets/apple.svg) |
| ------ | ------ | ------ |
| [Activity Sensor](sensors.md#activity-sensor) |  | :white_check_mark: |
| [Average Active Pace](sensors.md#pedometer-sensors) |  | :white_check_mark: |
| [Battery Level](sensors.md#battery-sensors) | :white_check_mark: | :white_check_mark: |
| [Battery State](sensors.md#battery-sensors) | :white_check_mark: | :white_check_mark: |
| [BSSID](sensors.md#connection-type-sensor) | :white_check_mark: | :white_check_mark: |
| [Connection Type](sensors.md#connection-type-sensor) | :white_check_mark: | :white_check_mark: |
| [Distance](sensors.md#pedometer-sensors) |  | :white_check_mark: |
| [Floors Ascended](sensors.md#pedometer-sensors) |  | :white_check_mark: |
| [Floors Descended](sensors.md#pedometer-sensors) |  | :white_check_mark: |
| [Geocoded Location](sensors.md#geocoded-location-sensor) |  | :white_check_mark: |
| [Last Update Trigger](sensors.md#last-update-trigger-sensor) |  | :white_check_mark: |
| [Sim 1](sensors.md#cellular-provider-sensor) |  | :white_check_mark: |
| [Sim 2](sensors.md#cellular-provider-sensor) |  | :white_check_mark: |
| [SSID](sensors.md) |  | :white_check_mark: |
| [Steps](sensors.md#pedometer-sensors) |  | :white_check_mark: |
