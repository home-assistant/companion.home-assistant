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
| `clear_notification` | Removes a notification, [more details](basic.md#clearing). |
| `update_complications` | Updates the complications on a paired Apple Watch. [More details](/apple-watch/complications.md). |

![Android](/assets/android.svg)

| Command | Description |
| ------- | ----------- |
| `clear_notification` | Removes a notification from the status bar, [more details](basic.md#clearing). |
| `command_activity` | Launch an activity with a specified URI to any app, [more details](#activity) and use cases below. |
| `command_bluetooth` | Turn bluetooth on or off. |
| `command_ble_transmitter` | Turn BLE beacon transmitter on or off. |
| `command_broadcast_intent` | Send a broadcast intent to another app, [see below](#broadcast-intent) for how it works and whats required. |
| `command_dnd` | Control Do Not Disturb mode on the device, [see below](#do-not-disturb) for how it works and whats required. |
| `command_high_accuracy_mode` | Control the high accuracy mode of the background location sensor, [see below](#high-accuracy-mode) for how it works and whats required. |
| `command_media` | Control media playing on the device, [see below](#media) for how it works and whats required. |
| `command_ringer_mode` | Control the ringer mode on the device, [see below](#ringer-mode) for how it works and whats required. |
| `command_screen_on` | Turn on the device screen. |
| `command_volume_level` | Control the volume for all available audio streams, [see below](#volume-level) for how it works and whats required. |
| `command_webview` | Open the app to the homepage or any dashboard or view, [see below](#webview) for how. |
| `remove_channel` | Remove a notification channel from the device settings, [more details](basic.md#removing-a-channel). |
| `request_location_update` | Request a location update from the device, [see below](#request-location-updates) for implications about this command. |


## Activity

![Android](/assets/android.svg)

On Android you can send `message: command_activity` to launch any activity. This command requires a specific permission that the app is unable to prompt or auto-accept. Instead by sending the command for the first time the app will launch an activity allowing the user to enable Home Assistant access to the devices Display over other apps Policy. This is required in order for the app to gain control of this setting.

The `tag` parameter will need to be set to the Intent Action string, or the notification will post as normal. If the activity requires a URI then you will need set that as the `title`, otherwise the notification will post as normal. `channel` can be set to the package of where the activity is to be launched, otherwise Android will make a best effort to pick a default. If the package cannot be found then the notification will post as normal. You must know the intending URI (if required), action and package to start the activity. Typically this will be a documented feature if supported by the app.

[Extras](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20java.lang.String)) are also supported under the `group` parameter. As there can be any number of extras added to the intent we will need to split each extra by a comma `,`. Then each extra name and value needs to be separated by a colon `:`. Please refer to the example in [Broadcast Intent](#broadcast-intent) to see the proper format.

`subject` can also be set to the MIME type if you need to set it. You will need to know the MIME type string if the activity requires it.

Some applications also require the class or component to be provided. For these applications you will need to provide the package as the `channel` and the full and complete class name under the `intent_class_name` parameter. You will need to know what class name to provide as each application is different.

The below example follows [Google's documentation](https://developers.google.com/maps/documentation/urls/android-intents#launch-turn-by-turn-navigation) to show you how this feature works by launching Google Maps Navigation.

Example:

```yaml
automation:
  - alias: Navigate
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_activity"
          title: "google.navigation:q=arbys"
          data:
            channel: "com.google.android.apps.maps"
            tag: "android.intent.action.VIEW"
```

To continue with the above example you can also launch [search results](https://developer.android.com/guide/components/intents-common#Maps) with the following:

```yaml
automation:
  - alias: Search google maps
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_activity"
          title: "geo:0,0?q=1600+Amphitheatre+Parkway%2C+CA"
          data:
            channel: "com.google.android.apps.maps"
            tag: "android.intent.action.VIEW"
```

## BLE Beacon Transmitter

![Android](/assets/android.svg)

Users can turn the iBeacon transmitter on or off using `message: command_ble_transmitter` with the `title` being either `turn_off` or `turn_on`. If `title` is blank, not set or not one of the above expected values then the notification will post as normal.

Example:

```yaml
automation:
  - alias: Turn off BLE transmitter
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_ble_transmitter"
          title: "turn_off"
```


## Bluetooth

![Android](/assets/android.svg)

Users can turn Bluetooth on or off using `message: command_bluetooth` with the `title` being either `turn_off` or `turn_on`. If `title` is blank, not set or not one of the above expected values then the notification will post as normal.

Example:

```yaml
automation:
  - alias: Command bluetooth
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_bluetooth"
          title: "turn_off"
```

## Broadcast Intent

![Android](/assets/android.svg)

Using notification commands you are now able to send a broadcast intent to another app in order to control that app based on the intent. Not all apps support intents and if they do they may document it for users to control. You must set `message: command_broadcast_intent` and the `title` must contain the intent action while `channel` must contain the package the intent is for. The package name and action are provided by the app you wish to send the intent to.

Some applications also require the class or component to be provided. For these applications you will need to provide the package as the `channel` and the full and complete class name under the `intent_class_name` parameter. You will need to know what class name to provide as each application is different.

If an invalid format is sent you may either see a notification or a toast message.

Example:

```yaml
automation:
  - alias: Send broadcast intent
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_broadcast_intent"
          title: "action"
          data:
            channel: "package-name"
```

An example of an application that accepts broadcast intents is [Sleep as Android](https://docs.sleep.urbandroid.org/devs/intent_api.html#action-intents-to-control-sleep). To start a sleep tracking event the format would be as follows:

```yaml
automation:
  - alias: Send broadcast intent to start sleep tracking
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_broadcast_intent"
          title: "com.urbandroid.sleep.alarmclock.START_SLEEP_TRACK"
          data:
            channel: "com.urbandroid.sleep"
```

[Extras](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20java.lang.String)) are also supported under the `group` parameter. As there can be any number of extras added to the intent we will need to split each extra by a comma `,`. Then each extra name and value needs to be separated by a colon `:`. The below example shows you how to turn on an alarm labeled `work` in the Sleep as Android application. In this example there are 2 extras being added to the intent.

```yaml
automation:
  - alias: Send broadcast intent with extras
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_broadcast_intent"
          title: "com.urbandroid.sleep.alarmclock.ALARM_STATE_CHANGE"
          data:
            channel: "com.urbandroid.sleep"
            group: "alarm_label:work,alarm_enabled:false"
```

Special characters in extras are supported by urlencoding the extra value and appending `:urlencoded` to the end. For example, to send a JSON-formatted extra to Gadgetbridge we can do the following:

```yaml
automation:
  - alias: Send broadcast intent with JSON-formatted extra
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_broadcast_intent"
          title: "nodomain.freeyourgadget.gadgetbridge.Q_PUSH_CONFIG"
          data:
            channel: "nodomain.freeyourgadget.gadgetbridge"
            group: "EXTRA_CONFIG_JSON:%7B%22push%22%3A%7B%22set%22%3A%7B%22widgetCustom0._.config.upper_text%22%3A%22Hi%22%7D%7D%7D:urlencoded"
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
  - alias: Command do not disturb
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_dnd"
          title: "priority_only"
```


## High accuracy mode

![Android](/assets/android.svg)

Users can turn the high accuracy mode of the background location sensor on or off using `message: command_high_accuracy_mode` with the `title` being either `turn_off` or `turn_on`. If `title` is blank, not set or not one of the above expected values then the notification will post as normal.

Example:

```yaml
automation:
  - alias: Turn off high accuracy mode
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_high_accuracy_mode"
          title: "turn_off"
```

## Media

![Android](/assets/android.svg)

Users are able to control any active media session on their devices. You must set `message: command_media` and the `title` must be one from the list below. The `channel` must be set to the package name you wish to control. The notification will post as normal if one of the required fields is left blank, has incorrect data or a media session is not active.

List of accepted `title` media commands:
*  `fast_forward`
*  `next`
*  `pause`
*  `play`
*  `play_pause`
*  `previous`
*  `rewind`
*  `stop`

Example:

```yaml
automation:
  - alias: Pause spotify
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_media"
          title: "pause"
          data:
            channel: "com.spotify.music"
```

## Request Location Updates

![Android](/assets/android.svg) ![iOS](/assets/iOS.svg)
:::caution
Do not rely on this functionality due to the time limitations mentioned below.
:::

You can force a device to attempt to report its location by sending a special notification. The notification is not visible to the device owner and only works when the app is running or in the background. On success the sensor.last_update_trigger will change to "Push Notification".

```yaml
automation:
  - alias: Request location update
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
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
  - alias: Command ringer mode
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_ringer_mode"
          title: "vibrate"
```

## Screen On

![Android](/assets/android.svg)

On Android you can turn on the screen using a notification by simply sending `message: command_screen_on`. This will not remove or disable any lock screens you have setup on the device. The reason behind this is the risk associated with the app being unable to set the device policy back (app crash) or if the device requires the policy to be setup again after being removed. All of which is out of the app's control. You may want to adjust the screen timeout setting on your device to control when the screen will turn back off.

&nbsp;<span class="beta">BETA</span> Also you can optionally add `title: keep_screen_on` to enable [Keep screen On](https://companion.home-assistant.io/docs/integrations/android-webview#keep-screen-on) feature in App Configuration. The screen will remain on only if the webview activity is currently active, otherwise it will turn back off. Notification with `title` having another value will reset this setting to default Disabled state.

```yaml
automation:
  - alias: Screen on
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_screen_on"
          title: "keep_screen_on"
```


## Volume Level

![Android](/assets/android.svg)

On Android you can control the devices volume level by sending `message: command_volume_level` with an appropriate `title` that must be a number. If `title` is larger than the maximum level then the maximum level will be used or if `title` is less than `0` then we will default to `0`, anything else will result in the notification posting to the device. `channel` is also required as outlined in the table below. Certain devices will need to grant a special permission that will appear upon the first command received if the permission was not already granted. This is the same permission as [Do Not Disturb](#do-not-disturb) up above. Changing the volume level will have a direct impact on Do Not Disturb and Ringer Modes, behavior will vary from device to device.<br />

| `channel` | Description |
| ------- | ----------- |
| `alarm_stream` | Set the volume level for the alarm stream. |
| `music_stream` | Set the volume level for the music stream. |
| `notification_stream` | Set the volume level for the notification stream. |
| `ring_stream` | Set the volume level for the ring stream. |
| Anything else | The notification will post as a normal notification and the command will not process. |
<br />

```yaml
automation:
  - alias: Command volume level
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_volume_level"
          title: 20
          data:
            channel: "music_stream"
```

## Webview

![Android](/assets/android.svg)

If you want to just open the Companion app to any page or even the homepage you will want to send `message: command_webview`. If you wish to navigate to a specific [view or dashboard](https://www.home-assistant.io/lovelace/dashboards-and-views/) you will want to use `title` to specify the [`path`](https://www.home-assistant.io/lovelace/dashboards-and-views/#path) (example: `/lovelace/settings`). If `title` is not provided the user will be directed to the homepage. The first time you send this command you will be taken to a permission screen to grant the app access to display over other apps policy. This permission is necessary for the feature to work in the background and we cannot prompt the user to grant it.

Example:

```yaml
automation:
  - alias: Open android webview
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_webview"
          title: "/lovelace/settings"
```
