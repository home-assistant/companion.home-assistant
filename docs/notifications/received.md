---
title: "Notification Received"
id: "notification-received"
---

![Android](/assets/android.svg) <span class='beta'>BETA</span>

If you wish to fire an event any time a notification is received on the device you will need to enable the event from [Configuration](https://my.home-assistant.io/redirect/config/) > Companion App > Notification Received Event. All notiifcation data will be present in the event data for the event type `mobile_app_notification_received`.

Example event data:

```json
{
    "event_type": "mobile_app_notification_received",
    "data": {
        "message": "test",
        "device_id": "DEVICE_ID"
    },
    "origin": "REMOTE",
    "time_fired": "2020-10-06T05:36:12.864583+00:00",
    "context": {
        "id": "ID",
        "parent_id": null,
        "user_id": "USER_ID"
    }
}
```