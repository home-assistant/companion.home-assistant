---
title: "Notification Dismissed"
id: "notification-dismissed"
---

![Android](/assets/android.svg)<br />

When a notifications is dismissed Android will notify the Companion app of the event. Along with ensuring that the groups are also canceled the app will send a `mobile_app_notification_dismissed` event to your Home Assistant instance. This event will contain the `message` along with the usual event data. This event will fire with each and every notification that gets dismissed.

Example event data:

```json
{
    "event_type": "mobile_app_notification_dismissed",
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