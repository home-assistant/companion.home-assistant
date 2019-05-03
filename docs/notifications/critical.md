---
title: "Critical notifications"
---

Critical notifications were introduced in iOS 12 and are designed for sending high-priority notifications that you don't want to miss. They will ignore both do not disturb status and silent settings. A simple example of sending a critical notification is:

```yaml
automations:
  - alias: 'Fire Detected'
    trigger:
    - platform: state
      entity_id: sensor.smoke_alarm
      to: 'smoke'
    action:
    - service: notify.mobile_app_<your_device_id_here>
      data:
        title: "Wake up!"
        message: "The house is on fire and the cat's stuck in the dried!"
        data:
          push:
            category: alarm
            sound:
              name: default
              critical: 1
              volume: 1.0

```

If you have previously read the [sounds documentation](sounds.md), this syntax should be mostly familiar. Note that we have now added `category: alarm` to the payload and expanded the `sound` attribute to include the `critical: 1` flag and `volume: 1.0` to set the volume at 100 %.
