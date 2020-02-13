---
title: Feature overview
id: 'core'
---

The Home Assistant Companion App provides a convenient way to view and control your Home Assistant instance however it also extends the power of your instance by allowing your device to act as a data source. The Home Assistant Companion App adds numerous [sensors](sensors.md) (such as battery and network status among others), creates a `device_tracker` entity to allow [location](location.md) updates to be sent from the device and also provides [action shortcuts](actions.md) to trigger scripts or automations.

Not all features are supported by Android at the moment but eventually most features will be supported.  Look for the ![android](/assets/android.svg) Android logo to see what is currently supported.

![iOS](/assets/apple.svg) iOS and ![android](/assets/android.svg) Android Feature Comparison:

| Feature | ![android](/assets/android.svg) | ![iOS](/assets/apple.svg) |
| ------ | ------ | ------ |
| [Actionable Notifications](../notifications/actionable.md) | ✔ | ✔ |
| [Activity](sensors.md#activity-sensor) |  | ✔ |
| [App Events](../integrations/app-events.md) |  | ✔ |
| [Average Active Pace](sensors.md#pedometer-sensors) |  | ✔ |
| [Battery Level](sensors.md#battery-sensors) | ✔ | ✔ |
| [Battery State](sensors.md#battery-sensors) | ✔ | ✔ |
| [BSSID](sensors.md#connection-type-sensor) | ✔ | ✔ |
| [Connection Type](sensors.md#connection-type-sensor) | ✔ | ✔ |
| [Critical Notifications](../notifications/critical.md) | ✔ | ✔ |
| [Distance](sensors.md#pedometer-sensors) |  | ✔ |
| [Floors Ascended](sensors.md#pedometer-sensors) |  | ✔ |
| [Floors Descended](sensors.md#pedometer-sensors) |  | ✔ |
| [Geocoded Location](sensors.md#geocoded-location-sensor) |  | ✔ |
| [Haptic Feedback](../integrations/haptics.md) |  | ✔ |
| [Last Update Trigger](sensors.md#last-update-trigger-sensor) |  | ✔ |
| [Location Tracking](location.md) | ✔ | ✔ |
| [NFC](../integrations/universal-links.md) |  | ✔ |
| [Notification Badge](../notifications/basic.md#badge) |  | ✔ |
| [Notification Click Action](../notifications/basic.md#notification-click-action) | ✔ |  |
| [Notification Color](../notifications/basic.md#notification-color) | ✔ |  |
| [Notification Dynamic Attachments](../notifications/dynamic-content.md) |  | ✔ |
| [Notification Image](../notifications/attachments.md) | ✔ | ✔ |
| [Notification Message](../notifications/basic.md) | ✔ | ✔ |
| [Notification Presentation](../notifications/basic.md#controlling-how-a-notification-is-displayed-when-in-the-foreground) |  | ✔ |
| [Notification Sound](../notifications/sounds.md) |  | ✔ |
| [Notification Sticky](../notifications/basic.md#sticky-notification) | ✔ |  |
| [Notification Subtitle](../notifications/basic.md#subtitle) |  | ✔ |
| [Notification Thread-id](../notifications/basic.md#thread-id-grouping-notifications) |  | ✔ |
| [Notification Title](../notifications/basic.md) | ✔ | ✔ |
| [Notification Video](../notifications/attachments.md) |  | ✔ |
| [Replaceable Notifications](../notifications/basic.md#replacing-notifications) | ✔ | ✔ |
| [Request Location Updates](../notifications/location.md) | ✔ | ✔ |
| [Sim 1](sensors.md#cellular-provider-sensor) |  | ✔ |
| [Sim 2](sensors.md#cellular-provider-sensor) |  | ✔ |
| [SSID](sensors.md) |  | ✔ |
| [Steps](sensors.md#pedometer-sensors) |  | ✔ |
| [Theming](../integrations/theming.md) | ✔ | ✔ |
| [URL Handler](../integrations/url-handler.md) |  | ✔ |
| [X-Callback-URL](../integrations/x-callback-url.md) |  | ✔ |