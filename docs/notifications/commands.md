---
title: "Notification Commands"
id: "notification-commands"
---

The Companion apps offer a lot of different notification options. In place of posting an actual notification on the device you can instead send a command as the `message` to trigger certain actions on your phone. Read below to find out what commands are supported on each platform.

![iOS](/assets/iOS.svg)

| Command | Description |
| ------- | ----------- |
| `request_location_update` | Request a location update from the device, [see below](#request-location-updates) for implications about this command. |

![Android](/assets/android.svg)

| Command | Description |
| ------- | ----------- |
| `clear_notification` | Removes a notification from the status bar, [more details](basic.md#replacing-notifications). |
| `dnd_off` | Turn off Do Not Disturb mode on the device, [see below](#do-not-disturb) for how it works and whats required. |
| `dnd_on` | Turn on Do Not Disturb mode on the device, [see below](#do-not-disturb) for how it works and whats required. |
| `remove_channel` | Remove a notification channel from the device settings, [more details](basic.md#removing-a-channel). |
| `request_location_update` | Request a location update from the device, [see below](#request-location-updates) for implications about this command. |

## Request Location Updates

:::caution
Do not rely on this functionality due to the time limitations mentioned below.
:::

You can force a device to attempt to report its location by sending a special notification. The notification is not visible to the device owner and only works when the app is running or in the background. On success the sensor.last_update_trigger will change to "Push Notification".

```yaml
automation:
  - alias: Notify Mobile app
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: "request_location_update"
```

Assuming the device receives the notification, it will attempt to get a location update within 5 seconds and report it to Home Assistant. This is a little bit hit or miss since Apple imposes a maximum time allowed for the app to work with the notification and location updates sometimes take longer than usual due to factors such as waiting for GPS acquisition.

:::danger
While it is possible to create an automation in Home Assistant to call this service regularly to update sensors, this is not recommended as doing this too frequently may have a negative impact on your device's battery life and health.
:::


## Do Not Disturb

![Android](/assets/android.svg) Android 6+ only

On Android you have 2 commands that you can send to control the state of Do Not Disturb on the device. These commands require a specific permission that the app is unable to prompt or auto-accept. Instead by sending a command for the first time the app will launch an activity allowing the user to enable Home Assistant access to the devices Notification Policy. This is required in order for the app to gain control of this setting. Turning on Do Not Disturb mode will place your device in `priority_only` mode. This command is also only available for users on Android 6+, users on lower versions the command will do nothing.

```yaml
automation:
  - alias: Notify Mobile app
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: "dnd_on"       # or "dnd_off"
```
