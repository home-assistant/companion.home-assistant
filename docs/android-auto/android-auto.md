---
title: "Overview"
id: "android-auto"
---

![Android](/assets/android.svg)

Home Assistant offers an Android Auto (AA) and Android Automotive OS (AAOS) experience. This will allow you to interact with various entities safely while driving your vehicle. It will also allow you to navigate to any `zone`, `person`, `sensor` or `device_tracker`* that has a location associated with it.

\* Device tracker entities that are considered `home` will not be shown in the navigation screen.

### Setup

In order to use the app in your vehicle you will need to be signed in to either your phone if using AA or your vehicle if using AAOS. Once you are signed in with you will be all set to use the Home Assistant icon on the home screen in the vehicle.

### Supported Actionable Domains

- `alarm_control_panel` If a code is not required will allow for `arm_away` & `disarm` otherwise no action
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

### Favorites

If you would like to gain quick access to certain entities you can select some entities to be shown in the app. When you are parked simply go to [Settings](https://my.home-assistant.io/redirect/config/) > Companion app > Android Auto favorites (or Driving favorites) and select the entities you wish to view. Once you have added favorites the next time you start the Home Assistant app in the vehicle you will be shown your favorite entities. From there you can toggle entities, navigate to an entity, view all entities and also change your server.

In addition to adding the above supported domains you can also add `binary_sensor` and `sensor` entities to favorites in order to view their state in the driving interface.

:::info
If you installed the app from the Google Play Store on your AAOS vehicle then currently you will not be able to set your favorite entities. In the meantime you are free to use the AA app.
:::

### Notifications

By default Home Assistant notifications do not show up in the AA interface. To show Home Assistant notifications in AA, add [`car_ui: true` to the notification data](../notifications/basic.md#android-auto-visibility). Notifications will now show up on your phone _and_ in AA. Opening the notification from AA will open the driving interface for Home Assistant.

Notifications in AA, share settings with your phone and do not support all notification features. For example, in order to have a notification show on top of the current screen in AA, the notification channel will also need to be set to pop up on your phone. For the best experience, it is recommended to use a specific [channel](../notifications/basic.md#notification-channels) for notifications that should be visible in AA. Example:

```yaml
  - alias: Send door unlocked alert
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          title: "Door unlocked"
          message: "Everyone left home but the door is still unlocked"
          data:
            car_ui: true
            notification_icon: "mdi:door-open"
            channel: "Door unlocked"
            importance: high
```

### Sensors

The sensors available for AA and AAOS are described on the main [sensors](../core/sensors.md#android-sensors) page. The below list of sensors are unique to AA and AAOS:

*  [Android Auto Connection](../core/sensors.md#android-auto)
*  [Car Sensors](../core/sensors.md#car-sensors)

:::info
<span class='beta'>BETA</span><br /> If you are using the Home Assistant app installed via the Play Store in your vehicle then you can enable sensors by following the below steps while the vehicle is parked. Login to the app in the vehicle to sync up sensors with your server, then navigate to the home screen. From your server go to [Devices & Services](https://my.home-assistant.io/redirect/integrations/) > Select Mobile App > Select your vehicle name. Enable any sensors you like for the vehicle. Once completed start the app in the vehicle again. If you enabled any sensors that require special permissions the app will post a notification in the vehicle. You will need to click on that notification to open the app, enable the sensor again and grant any permissions the vehicle requests.
:::
