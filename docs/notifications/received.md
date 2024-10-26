---
title: "Notification Received"
id: "notification-received"
---

![Android](/assets/android.svg)

You can receive an event when a notification is received on the device. In order to receive this event you will need to set `confirmation: true` as a parameter in your notification action. All notification data will be present in the event data for the event type `mobile_app_notification_received`. If you do not set this parameter then no event will be sent from the device when the notification is received.

Example:

```yaml
automation:
  - alias: Notification received confirmation
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "This notification has been received"
          data:
            confirmation: true
```

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
