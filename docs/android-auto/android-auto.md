---
title: "Overview"
id: "android-auto"
---

![Android](/assets/android.svg)

Home Assistant offers an Android Auto experience. This will allow you to interact with various entities safely while driving your vehicle. It will also allow you to navigate to any `zone`, `person`, `sensor` or `device_tracker`* that has a location associated with it.

\* Device tracker entities that are considered `home` will not be shown in the navigation screen.

### Setup

In order to use this integration you will need a phone as well as a vehicle with a head unit that supports Android Auto. Once you are signed in with your phone you should be all set to use the Home Assistant icon on the Android Auto home screen.

### Supported Actionable Domains

- `button`
- `cover`
- `input_boolean`
- `input_button`
- `light`
- `lock`
- `scene`
- `script`
- `switch`

:::note
The amount of entities shown will depend on the imposed limit set by the vehicle.
:::

### Notifications

By default Home Assistant notifications do not show up in the Android Auto interface. To show Home Assistant notifications in Android Auto, add [`car_ui: true` to the notification data](../notifications/basic.md#android-auto-visibility). Notifications will now show up on your phone _and_ in Android Auto. Opening the notification from Android Auto will open the driving interface for Home Assistant.

Notifications in Android Auto share settings with your phone and do not support all notification features. This means that, for example, to have a notification show on top of the current screen in Android Auto, it will also need to be set to pop up on your phone. For the best experience, it is recommended to use a specific [channel](../notifications/basic.md#notification-channels) for notifications that should be visible in Android Auto. Example:

```yaml
  - alias: Send door unlocked alert
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          title: "Door unlocked"
          message: "Everyone left home but the door is still unlocked"
          data:
            car_ui: true
            notification_icon: "mdi:door-open"
            channel: "Door unlocked"
            importance: high
```

### Favorites <span class='beta'>BETA</span>

If you would like to gain quick access to certain entities you can select some entities to be shown in the app. Simply go to [Settings](https://my.home-assistant.io/redirect/config/) > Companion App > Android Auto Favorites and select the entities you wish to view. Once you have added favorites the next time you start the Home Assistant app in the car you will be shown your favorite entities. From there you can toggle entities, navigate to an entity, view all entities and also change your server.
