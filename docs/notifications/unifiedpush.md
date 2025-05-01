---
title: "UnifiedPush"
id: "notification-unifiedpush"
---

[UnifiedPush](https://unifiedpush.org/) is a decentralized system to deliver notifications to your device instead of using Google's Firebase Cloud Messaging.

| Platform | Version |
| -------- | ------- |
| ![Android](/assets/android.svg) | 2025.3 |

:::info
UnifiedPush is not supported on Apple devices as they do not support running services in the background
:::

## Requirements

![Android](/assets/android.svg) requires a UnifiedPush distributor to be installed, such as [ntfy](https://play.google.com/store/apps/details?id=io.heckel.ntfy) or [Sunup](https://f-droid.org/en/packages/org.unifiedpush.distributor.sunup/) and the distributor app should be exempted from battery optimization.

## Rate limits

Notifications delivered via UnifiedPush may be rate limited by the selected server, independent of Home Assistant's [Rate Limits](https://companion.home-assistant.io/docs/notifications/notification-details).

## Configuration

![Android](/assets/android.svg) can configure UnifiedPush settings in [Settings](https://my.home-assistant.io/redirect/config/) then Companion App and tap UnifiedPush in the Notifications section, then select the distributor app to use, or `Disabled` to disable UnifiedPush. Some UnifiedPush distributors allow for the use of a custom server, which can be configured from within the distributor app.
