---
title: "Local Push"
id: "notification-local"
---

Local Push uses the [WebSocket API](https://developers.home-assistant.io/docs/api/websocket) to deliver notifications to your device instead of using Apple's Push Notification Service or Google's Firebase Cloud Messaging.

| Platform | Version |
| -------- | ------- |
| ![iOS](/assets/iOS.svg) | 2021.7 |
| ![macOS](/assets/macOS.svg) | 2021.7 |

:::info
Local Push requires HA core-2021.6 or later in combination with a supported platform above.
:::

## Requirements

![iOS](/assets/iOS.svg) has a few limitations:

1. Local Push will only occur when connected via Internal URL, and requires configuring SSIDs to consider internal. This is an Operating System limitation as this feature is designed for low or minimal connectivity situations.
2. Although small, battery usage will be increased by a small amount when Local Push is enabled as it maintains an ongoing connection to your HA server. You can disable it in the connection settings for your server.

![macOS](/assets/macOS.svg) will always maintain a Local Push connection as long as the app is running and has no additional battery impact.

## Rate limits

Notifications delivered via Local Push do not count against [Rate Limits](details.md).

## Configuration

![iOS](/assets/iOS.svg) can disable Local Push by editing the internal connection settings for the server. Go to App Configuration, tap on the server row, then tap Internal URL.

![macOS](/assets/macOS.svg) does not have an option to disable Local Push, see requirements above for more information.

## Viewing Status

You can view the status of Local Push under App Configuration in the Notifications section. This will show one of a few statuses:

* Disabled, when toggled off by the connection setting or not currently on the internal network.
* Unsupported, when the iOS version does not support Local Push.
* Unavailable, when the core version does not support Local Push.
* Establishing, when it is initially connecting to the server.
* Available, when it is connected and ready for pushes. The number after indicates the number of messages received since the connection began, which can be useful for debugging.
