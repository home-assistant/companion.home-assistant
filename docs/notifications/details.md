---
title: "Privacy, rate limiting and security"
---

## Privacy

No notification content is stored on remote servers. Only the required push registration data and a simple counter of the total number of push notifications sent per day per device (for rate-limiting purposes) is kept.

## Rate limiting

Currently, you are allowed to send a maximum of 150 push notifications per day per device. This is to ensure that the service remains cheap to maintain. In the future we may add support for upgrading to allow more notifications. 

The in-app Notifications settings screen displays your current rate limits for the day broken out into the following categories: Attempts, Delivered, Errors, Total, and the exact time until next daily reset. The rate limit resets at midnight UTC daily.

If an error occurs while sending a notification, it does not count towards your rate limit. Requesting location updates [via push notiifcation](notifications/location.md) and the special `clear_badge` notification type also do not count towards your rate limit.



## Security

All traffic between your Home Assistant instance, the push infrastructure, and Apple, is encrypted with SSL.
