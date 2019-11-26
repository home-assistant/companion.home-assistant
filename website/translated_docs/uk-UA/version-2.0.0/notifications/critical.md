---
title: Критічні повідомлення
id: version-2.0.0-critical
original_id: critical
---

Critical notifications were introduced in iOS 12 and are designed for sending high-priority notifications that you don't want to miss - for example security system, water leak sensor, and smoke/CO2 alarm alerts.

iOS gives special priority to this type of notification. Critical alerts always appear at the top of your lock screen above all other notifications, and play a sound even if Do Not Disturb is enabled or the iPhone is muted. Because we never want you to miss a critical notification, they are allowed to bypass the app [notification rate limits](details.md) as well.

A simple example of sending a critical notification is:

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
        message: "The house is on fire and the cat's stuck in the dryer!"
        data:
          push:
            sound:
              name: default
              critical: 1
              volume: 1.0

```

Якщо ви раніше читали [документацію для звуків ](sounds.md), цей синтаксис має бути здебільшого знайомим. Зауважте, що приклад розширює атрибут `sound`, щоб включити примітку `critical: 1` і `volume: 1.0`, щоб встановити рівень гучності до 100 %.