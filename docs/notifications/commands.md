---
title: "Notification Commands"
id: "notification-commands"
---

The Companion apps offer a lot of different notification options. In place of posting an actual notification on the device you can instead send a command as the `message` to trigger certain actions on your phone. Read below to find out what commands are supported on each platform.

![iOS](/assets/iOS.svg)

| Command | Description |
| ------- | ----------- |
| `request_location_update` | Request a location update from the device, [see below](#request-location-updates) for implications about this command. |
| `clear_badge` | Silently removes the badge from the App icon without displaying a notification. |

![Android](/assets/android.svg)

| Command | Description |
| ------- | ----------- |
| `clear_notification` | Removes a notification from the status bar, [more details](basic.md#replacing-notifications). |
| `command_broadcast_intent` | Send a broadcast intent to another app, [see below](#broadcast-intent) for how it works and whats required. |
| `command_dnd` | Control Do Not Disturb mode on the device, [see below](#do-not-disturb) for how it works and whats required. |
| `command_ringer_mode` | Control the ringer mode on the device, [see below](#ringer-mode) for how it works and whats required. |
| `remove_channel` | Remove a notification channel from the device settings, [more details](basic.md#removing-a-channel). |
| `request_location_update` | Request a location update from the device, [see below](#request-location-updates) for implications about this command. |


## Broadcast Intent

![Android](/assets/android.svg)

Using notification commands you are now able to send a broadcast intent to another app in order to control that app based on the intent. Not all apps support intents and if they do they may document it for users to control. There are no `extras` provided at this time, it is only for sending an intent to another app. You must set `message: command_broadcast_intent` and the `title` must contain the intent action while `channel` must contain the package the intent is for. The package name and action are provided by the app you wish to send the intent to. If an invalid format is sent you may either see a notification or a toast message.

Example:

```yaml
automation:
  - alias: Notify Mobile app
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: "command_broadcast_intent"
        title: "action"
        data:
          channel: "package-name"
```

An example of an application that accepts broadcast intents is [Sleep as Android](https://docs.sleep.urbandroid.org/devs/intent_api.html#action-intents-to-control-sleep). To start a sleep tracking event the format would be as follows:

```yaml
automation:
  - alias: Notify Mobile app
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: "command_broadcast_intent"
        title: "com.urbandroid.sleep.alarmclock.START_SLEEP_TRACK"
        data:
          channel: "com.urbandroid.sleep"
```


## Do Not Disturb

![Android](/assets/android.svg) &nbsp;Android 6+ only

On Android you can send `message: command_dnd` that you can use to control the state of Do Not Disturb on the device. This command requires a specific permission that the app is unable to prompt or auto-accept. Instead by sending the command for the first time the app will launch an activity allowing the user to enable Home Assistant access to the devices Notification Policy. This is required in order for the app to gain control of this setting.

In addition to sending the `message` you must also provide the state of Do Not Disturb that you wish to set as the `title`, see the table below for what is accepted. If the `title` does not match one of the listed commands then the notification will post as normal and the command will not process. This command is only available for users on Android 6+, users on lower versions will see the notification just like any other.
<br />


| `title` | Description |
| ------- | ----------- |
| `alarms_only` | Alarms only interruption filter - all notifications except those in the alarm category are suppressed. Some audio streams are muted. |
| `off` | Normal interruption filter - no notifications are suppressed. |
| `priority_only` | Priority interruption filter - all notifications are suppressed except those that match the priority criteria. Some audio streams are muted. |
| `total_silence` | No interruptions filter - all notifications are suppressed and all audio streams (except those used for phone calls) and vibrations are muted. |
| Anything else | The notification will post as a normal notification and the command will not process. |
<br />

```yaml
automation:
  - alias: Notify Mobile app
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: "command_dnd"
        title: "priority_only"
```

## Request Location Updates

![Android](/assets/android.svg) ![iOS](/assets/iOS.svg)
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


## Ringer Mode

![Android](/assets/android.svg)

On Android you can control the devices ringer mode by sending `message: command_ringer_mode` with an appropriate `title` as outlined in the table below. Certain devices will need to grant a special permission that will appear upon the first command received if the permission was not already granted. This is the same permission as [Do Not Disturb](#do-not-disturb) up above. If the device has Do Not Disturb enabled then setting to `normal` or `vibrate` will turn it off. If the device does not have Do Not Disturb enabled then `silent` will turn it on.<br />

| `title` | Description |
| ------- | ----------- |
| `normal` | Set the device to normal ringer mode, will turn off Do Not Disturb if enabled and supported. |
| `silent` | Set the device to silent ringer mode, will turn on Do Not Disturb if disabled and supported. |
| `vibrate` | Set the device to vibrate ringer mode, will turn off Do Not Disturb if enabled and supported. |
| Anything else | The notification will post as a normal notification and the command will not process. |
<br />

```yaml
automation:
  - alias: Notify Mobile app
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: "command_ringer_mode"
        title: "vibrate"
```
