---
title: "(Legacy) iOS Actions"
id: "watch-actions"
---

:::info Before continuing
You can easily run scripts and active scenes directly by adding Script/Scene to your watch [configuration](/docs/apple-watch/#home).
iOS Actions won't receive future support, please migrate to other recommended solutions such as scripts widget, Apple Watch configuration.
:::

Actions that are fired from Apple Watch will be delivered to the Home Assistant Event Bus in the same way as actions triggered on iPhone with the `ios.action_fired` event, however the payload of the event will differ slightly to clarify the source of the event. Actions triggered by Apple Watch will have the `triggerSource` key set to `watch`.

An example `ios.action_fired` payload for an event triggered on Apple Watch is:

```json
{
    "event_type": "ios.action_fired",
    "data": {
        "sourceDeviceID": "my_iphone",
        "actionID": "09CEA437-4585-4A97-B946-79D2C8B3145A",
        "sourceDevicePermanentID": "BCEE1730-E6BE-453B-B9E5-9601FA182C64",
        "actionName": "MyActionName",
        "triggerSource": "watch",
        "sourceDeviceName": "My iPhone"
    },
    "origin": "REMOTE",
    "time_fired": "2020-06-13T14:40:43.009700+00:00",
    "context": {
        "id": "d2f58b921b2f41809af9fce444416aab",
        "parent_id": null,
        "user_id": "3831508509fe4124abaf1d144c2e8ca4"
    }
}
```
