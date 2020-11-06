---
title: "Notification Cleared"
id: "notification-cleared"
---

![Android](/assets/android.svg)

When a notification is cleared Android will notify the Companion app of the event. Along with ensuring that the groups are canceled, the app will send a `mobile_app_notification_cleared` event to your Home Assistant instance. This event will contain all of the notification data that was sent to the device. This event will fire with each and every notification that gets cleared.

Example event data:

```json
{
    "event_type": "mobile_app_notification_cleared",
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