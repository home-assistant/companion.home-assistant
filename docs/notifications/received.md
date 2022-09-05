---
title: "Notification Received"
id: "notification-received"
---

![Android](/assets/android.svg)

Anytime a notification is received on the Android device an event will be sent to Home Assistant. All notification data will be present in the event data for the event type `mobile_app_notification_received`.

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