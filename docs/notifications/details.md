---
title: "Privacy, rate limiting and security"
id: "notification-details"
---

## Privacy

No notification content is stored on remote servers. Only the required push registration data and a simple counter of the total number of push notifications sent per day per device (for rate-limiting purposes) is kept.

## Architecture
To provide the notification service, the app uses Google's Firebase cloud messaging service. For more information about Firebase, please [click here](https://firebase.google.com/docs/cloud-messaging).

![iOS](/assets/iOS.svg)<br />
If you wish to not exchange data with Google's servers, you can opt out of the Firebase services in the Privacy section of the Companion App settings in [Configuration](https://my.home-assistant.io/redirect/config/) when using the app. Doing so will stop notifications from functioning.  

## Rate limiting

Currently, you are allowed to send a maximum of 500 push notifications per day per device. The rate limit resets at midnight UTC daily. This is to ensure that the service remains cheap to maintain. In the future we may add support for upgrading to allow more notifications.

The in-app Notifications settings screen in the iOS app displays your current rate limits for the day broken out into the following categories: Attempts, Delivered, Errors, Total, and the exact time until next daily reset. For Android you can find these details on the Companion App Screen with [Configuration](https://my.home-assistant.io/redirect/config/). Alternatively, you can also view them by setting `homeassistant.components.mobile_app.notify: info` for the [`logger`](https://www.home-assistant.io/integrations/logger/) integration.

If an error occurs while sending a notification, it does not count towards your rate limit. [Critical Alerts](critical.md) and [Notification Commands](commands.md) also do not count towards your rate limit.


## Security

All traffic between your Home Assistant instance, the push infrastructure and your device's operating system is encrypted with SSL. The contents of the notifications are not encrypted on the Firebase cloud messaging service, thus could be processed by Google.
