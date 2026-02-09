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
| `update_widgets`* | Updates 'Gauge' and 'Details' widgets introduced on App v2024.7 (iOS will decide if the update is allowed or not, so don't worry if it doesn't work all the time). |

\* On iOS, manual widget reloads are limited to around 40-70 per 24 hour, depending on how often you look at the widget. This will not always reset at exactly midnight.

![Android](/assets/android.svg)

| Command | Description |
| ------- | ----------- |
| `clear_notification`* | Removes a notification from the status bar, [more details](basic.md#clearing). |
| `command_activity` | Launch an activity with a specified URI to any app, [more details](#activity) and use cases below. |
| `command_app_lock` | Change the companion app lock settings, [more details](#app-lock) and use cases below. |
| `command_auto_screen_brightness` | Control if automatic screen brightness is enabled. |
| `command_bluetooth` | Turn bluetooth on or off. |
| `command_ble_transmitter` | Turn BLE beacon transmitter on or off. |
| `command_beacon_monitor` | Turn Beacon Monitoring on or off. |
| `command_broadcast_intent` | Send a broadcast intent to another app, [see below](#broadcast-intent) for how it works and whats required. |
| `command_dnd` | Control Do Not Disturb mode on the device, [see below](#do-not-disturb) for how it works and whats required. |
| `command_flashlight` | Turn the flashlight LED on or off. |
| `command_high_accuracy_mode` | Control the high accuracy mode of the background location sensor, [see below](#high-accuracy-mode) for how it works and whats required. |
| `command_launch_app` | Launch an application, [see below](#launch-app) for how it works and whats required. |
| `command_media` | Control media playing on the device, [see below](#media) for how it works and whats required. |
| `command_ringer_mode` | Control the ringer mode on the device, [see below](#ringer-mode) for how it works and whats required. |
| `command_screen_brightness_level` | Control the screen brightness level on the device. |
| `command_screen_off_timeout` | Control the screen off timeout on the device. |
| `command_screen_on` | Turn on the device screen. |
| `command_stop_tts`* | Stops Text To Speech if it's currently in use. |
| `command_persistent_connection` | Toggle persistent connection mode, [see below](#persistent) for the available modes. |
| `command_update_sensors` | Updates all enabled sensors, if the state changed since the last update. |
| `command_volume_level` | Control the volume for all available audio streams, [see below](#volume-level) for how it works and whats required. |
| <span class="beta">BETA</span> `command_wake_word_detection` | Turn wake word detection on or off. |
| `command_webview` | Open the app to the homepage or any dashboard or view, [see below](#webview) for how. |
| `remove_channel`* | Remove a notification channel from the device settings, [more details](basic.md#removing-a-channel). |
| `request_location_update` | Request a location update from the device, [see below](#request-location-updates) for implications about this command. |

\*  These commands will always work, even when other commands are disabled.

## Activity

![Android](/assets/android.svg)

On Android you can send `message: command_activity` to launch any activity. This command requires a specific permission that the app is unable to prompt or auto-accept. Instead by sending the command for the first time the app will launch an activity allowing the user to enable Home Assistant access to the device\'s Display over other apps Policy. This is required in order for the app to gain control of this setting.

The `intent_action` parameter will need to be set to the Intent Action string, or the notification will post as normal. If the activity requires a URI then you will need set that as the `intent_uri`, otherwise the notification will post as normal. `intent_package_name` can be set to the package of where the activity is to be launched, otherwise Android will make a best effort to pick a default. If the package cannot be found then the notification will post as normal. You must know the intending URI (if required), action and package to start the activity. Typically this will be a documented feature if supported by the app.

[Extras](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20java.lang.String)) are also supported under the `intent_extras` parameter. As there can be any number of extras added to the intent we will need to split each extra by a comma `,`. Then each extra name and value needs to be separated by a colon `:`. Please refer to the example in [Broadcast Intent](#broadcast-intent) to see the proper format.

`intent_type` can also be set to the MIME type if you need to set it. You will need to know the MIME type string if the activity requires it.

Some applications also require the class or component to be provided. For these applications you will need to provide the package as the `intent_package_name` and the full and complete class name under the `intent_class_name` parameter. You will need to know what class name to provide as each application is different.

The below example follows [Google's documentation](https://developers.google.com/maps/documentation/urls/android-intents#launch-turn-by-turn-navigation) to show you how this feature works by launching Google Maps Navigation.

Example:

```yaml
automation:
  - alias: Navigate
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_activity"
          data:
            intent_package_name: "com.google.android.apps.maps"
            intent_action: "android.intent.action.VIEW"
            intent_uri: "google.navigation:q=arbys"
```

To continue with the above example you can also launch [search results](https://developer.android.com/guide/components/intents-common#Maps) with the following:

```yaml
automation:
  - alias: Search google maps
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_activity"
          data:
            intent_package_name: "com.google.android.apps.maps"
            intent_action: "android.intent.action.VIEW"
            intent_uri: "geo:0,0?q=1600+Amphitheatre+Parkway%2C+CA"
```


In order to use the Intent Action `android.intent.action.CALL` you will also need to grant the app Phone permissions. If not granted the app will direct you to the app info screen to grant the permissions along with a toast message letting you know the missing permissions.


## App lock

![Android](/assets/android.svg) 

To take control of an Android companion app's security Users can alter the app lock settings using `message: command_app_lock`. All settings related to the app lock can be configured in a single command. The following settings are accessible through the notify command:

| Parameter | Type | Description |
|---------|---------|--------|
| `app_lock_enabled` | boolean | Whether the biometric / screen lock will be enabled |
| `app_lock_timeout` | integer | Session timeout in seconds |
| `home_bypass_enabled` | boolean | Whether the lock is bypassed when connected to home WiFi |

Example:

```yaml
automation:
  - alias: Reset App lock to defaults
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_app_lock"
          data:
            app_lock_enabled: true
            app_lock_timeout: 60
            home_bypass_enabled: false
```


## Auto Screen Brightness

![Android](/assets/android.svg)

You can control if automatic brightness is enabled or not on the device by using `message: command_auto_screen_brightness` with the `command` being either `turn_off` or `turn_on`. If `command` is blank, not set or not one of the above expected values then the notification will post as normal.

Example:

```yaml
automation:
  - alias: Turn off automatic screen brightness
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_auto_screen_brightness"
          data:
            command: "turn_off"
```

## BLE Beacon Transmitter

![Android](/assets/android.svg)

Users can turn the iBeacon transmitter on or off using `message: command_ble_transmitter` with the `command` being either `turn_off` or `turn_on`. If `command` is blank, not set or not one of the above expected values then the notification will post as normal.

Example:

```yaml
automation:
  - alias: Turn off BLE transmitter
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_ble_transmitter"
          data:
            command: "turn_off"
```

You can also adjust the advertise mode and transmit power of the BLE Transmitter. To adjust the Advertise mode you will need to set `command` to `ble_set_advertise_mode` and then set the `ble_advertise` parameter to either `ble_advertise_low_latency`, `ble_advertise_balanced` or `ble_advertise_low_power`

```yaml
automation:
  - alias: Change Advertise Mode BLE transmitter
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_ble_transmitter"
          data:
            command: "ble_set_advertise_mode"
            ble_advertise: "ble_advertise_balanced"
```

To adjust Transmit Power you will need to set `command` to `ble_set_transmit_power` and then set the `ble_transmit` parameter to either `ble_transmit_high`, `ble_transmit_medium`, `ble_transmit_low` or `ble_transmit_ultra_low`

```yaml
automation:
  - alias: Change Transmit Power BLE transmitter
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_ble_transmitter"
          data:
            command: "ble_set_transmit_power"
            ble_transmit: "ble_transmit_high"
```


Users can also change the reporting UUID, Major and Minor parameters by using the following commands and their respective parameters. You can send any type of string value for the UUID, Major and Minor attributes. If any data is missing the notification will post as normal on the device.

| Command | Parameter |
|---------|---------|
| `ble_set_uuid` | `ble_uuid` |
| `ble_set_major` | `ble_major` |
| `ble_set_minor` | `ble_minor` |

Example to change the UUID for the transmitter:

```yaml
automation:
  - alias: Change BLE transmitter UUID
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_ble_transmitter"
          data:
            command: "ble_set_uuid"
            ble_uuid: "b4306bba-0e3a-44df-9518-dc74284e8214"
```

Users can also change the measured power at 1 meter to help improve detection for their devices. This number must be a negative number. The default value `-59` will be set in some cases like junk characters, if data is missing or the number is positive the notification will post as normal on the device.

```yaml
automation:
  - alias: Change BLE transmitter measured power
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: command_ble_transmitter
          data:
            command: ble_set_measured_power
            ble_measured_power: "-75"
```

## Beacon Monitor

![Android](/assets/android.svg) <br />

You can turn the Beacon Monitor on or off using `message: command_beacon_monitor` with the `command` being either `turn_off` or `turn_on`. If `command` is blank, not set or not one of the above expected values then the notification will post as normal.

Example:

```yaml
automation:
  - alias: Turn Beacon Monitor off
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_beacon_monitor"
          data:
            command: "turn_off"
```

## Bluetooth

![Android](/assets/android.svg) &nbsp;Android 12 or older

Users can turn Bluetooth on or off using `message: command_bluetooth` with the `command` being either `turn_off` or `turn_on`. If `command` is blank, not set or not one of the above expected values then the notification will post as normal.

Example:

```yaml
automation:
  - alias: Command bluetooth
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_bluetooth"
          data:
            command: "turn_off"
```

## Broadcast Intent

![Android](/assets/android.svg)

Using notification commands you are now able to send a broadcast intent to another app in order to control that app based on the intent. Not all apps support intents and if they do they may document it for users to control. You must set `message: command_broadcast_intent` and the `intent_action` must contain the intent action while `intent_package_name` must contain the package the intent is for. The package name and action are provided by the app you wish to send the intent to.

Some applications also require the class or component to be provided. For these applications you will need to provide the package as the `intent_package_name` and the full and complete class name under the `intent_class_name` parameter. You will need to know what class name to provide as each application is different.

If an invalid format is sent you may either see a notification or a toast message.

Example:

```yaml
automation:
  - alias: Send broadcast intent
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_broadcast_intent"
          data:
            intent_package_name: "package-name"
            intent_action: "action"
```

An example of an application that accepts broadcast intents is [Sleep as Android](https://docs.sleep.urbandroid.org/devs/intent_api.html#action-intents-to-control-sleep). To start a sleep tracking event the format would be as follows:

```yaml
automation:
  - alias: Send broadcast intent to start sleep tracking
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_broadcast_intent"
          data:
            intent_package_name: "com.urbandroid.sleep"
            intent_action: "com.urbandroid.sleep.alarmclock.START_SLEEP_TRACK"

```

[Extras](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20java.lang.String)) are also supported under the `intent_extras` parameter. As there can be any number of extras added to the intent we will need to split each extra by a comma `,`. Then each extra name and value needs to be separated by a colon `:`. The below example shows you how to turn on an alarm labeled `work` in the Sleep as Android application. In this example there are 2 extras being added to the intent.

```yaml
automation:
  - alias: Send broadcast intent with extras
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_broadcast_intent"
          data:
            intent_package_name: "com.urbandroid.sleep"
            intent_extras: "alarm_label:work,alarm_enabled:false"
            intent_action: "com.urbandroid.sleep.alarmclock.ALARM_STATE_CHANGE"

```

If you do not specify a specific type, the type is guessed based on your input. Numbers will be converted to Integers, `true` or `false` will be converted to Boolean values. Otherwise the intent extra will be set as String.

It is not unlikely that the data you are trying to send contains special characters or characters that are used as delimiters when parsing the intent_extra parameter (`,`, `:` or `;`). In this case, it is recommended that you specify the data type as `String.urlencoded` by appending it after another colon `:` at the end. For example, to send a JSON formatted extra to Gadgetbridge, you could use the following:

```yaml
automation:
  - alias: Send broadcast intent with JSON-formatted extra
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_broadcast_intent"
          data:
            intent_package_name: "nodomain.freeyourgadget.gadgetbridge"
            intent_extras: "EXTRA_CONFIG_JSON:%7B%22push%22%3A%7B%22set%22%3A%7B%22widgetCustom0._.config.upper_text%22%3A%22Hi%22%7D%7D%7D:String.urlencoded"
            intent_action: "nodomain.freeyourgadget.gadgetbridge.Q_PUSH_CONFIG"

```

Strings can be urlencoded in templates by applying the [filter](https://www.home-assistant.io/docs/configuration/templating/#string-filters) `urlencode`. For example the template `{{ ",:;" | urlencode }}` results in `%2C%3A%3B`.

If you are trying to send data as an Array or ArrayList, the individual values are separated by a semicolon `;`. The type of the Array, such as `float[]`, must be specified when sending values in this way. For example you can send multiple sensor values as movement data to Sleep as Android using the [Wearable integration API](https://docs.sleep.urbandroid.org/devs/wearable_api.html#send-movement-data):

```yaml
automation:
  - alias: Send broadcast intent to Sleep as Android with movement data in float array
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_broadcast_intent"
          data:
            intent_package_name: "com.urbandroid.sleep"
            intent_extras: "MAX_RAW_DATA:0.2;0.2;0.4;0.3;5.4;6.8;1.2:float[]"
            intent_action: "com.urbandroid.sleep.watch.DATA_UPDATE"

```

In addition to the types above, you can add other specific types to your intent extra. Your values will then be converted according to the type you specified. Make sure the type conversion is possible/meaningful.

Currently supported types are:

|Type|Example|
|----|-------|
|[Integer](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20int))|`EXTRA:101:int`|
|[Integer Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20int[]))|`EXTRA:101;102;103:int[]`|
|[ArrayList\<Integer\>](https://developer.android.com/reference/android/content/Intent#putIntegerArrayListExtra(java.lang.String,%20java.util.ArrayList%3Cjava.lang.Integer%3E))|`EXTRA:1;2;3:ArrayList<Integer>`|
|[Double](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20double))|`EXTRA:10.1:double`|
|[Double Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20double[]))|`EXTRA:10.1;10.2;10.3:double[]`|
|[Float](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20float))|`EXTRA:10.1:float`|
|[Float Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20float[]))|`EXTRA:10.1;10.2;10.3:float[]`|
|[Long](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20long))|`EXTRA:101:long`|
|[Long Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20long[]))|`EXTRA:101;102;103:long[]`|
|[Short](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20short))|`EXTRA:1:short`|
|[Short Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20short[]))|`EXTRA:1;2;3:short[]`|
|[Byte](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20byte))|`EXTRA:127:byte`|
|[Byte Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20byte[]))|`EXTRA:127;64:byte[]`|
|[Boolean](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20boolean))|`EXTRA:true:boolean`|
|[Boolean Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20boolean[]))|`EXTRA:true;true;false:boolean[]`|
|[Char](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20char))|`EXTRA:a:char`|
|[Char Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20char[]))|`EXTRA:a;b;c:char[]`|
|[String](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20java.lang.String))|`EXTRA:abc:String`|
|[String (urlencoded)](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20java.lang.String))|`EXTRA:%2C%3A%3B:String.urlencoded` or `EXTRA:%2C%3A%3B:urlencoded`|
|[String Array](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20java.lang.String[]))|`EXTRA:a;b;c:String[]`|
|[String Array (urlencoded)](https://developer.android.com/reference/android/content/Intent#putExtra(java.lang.String,%20java.lang.String[]))|`EXTRA:colon%3A;semicolon%3B;comma%2C:String[].urlencoded`|
|[ArrayList\<String\>](https://developer.android.com/reference/android/content/Intent#putStringArrayListExtra(java.lang.String,%20java.util.ArrayList%3Cjava.lang.String%3E))|`EXTRA:a;b;c:ArrayList<String>`|
|[ArrayList\<String\> (urlencoded)](https://developer.android.com/reference/android/content/Intent#putStringArrayListExtra(java.lang.String,%20java.util.ArrayList%3Cjava.lang.String%3E))|`EXTRA:colon%3A;semicolon%3B;comma%2C:ArrayList<String>.urlencoded`|

## Do Not Disturb

![Android](/assets/android.svg)

On Android you can send `message: command_dnd` that you can use to control the state of Do Not Disturb on the device. This command requires a specific permission that the app is unable to prompt or auto-accept. Instead by sending the command for the first time the app will launch an activity allowing you to enable Home Assistant access to the device\'s Notification Policy. This is required in order for the app to gain control of this setting.

In addition to sending the `message` you must also provide the state of Do Not Disturb that you wish to set as the `command`, see the table below for what is accepted. If the `command` does not match one of the listed commands then the notification will post as normal and the command will not process.

:::info
On Android 15 and newer, Android will keep track of which apps are enabling/disabling Do Not Disturb, and only allow apps to adjust settings previously set _by the app_. This means:

 - If multiple apps enable Do Not Disturb, Android will use the most restrictive Do Not Disturb filter. For example, if you send a notification command with alarms only and another app sets Do Not Disturb to no interruptions, the no interruptions filter will 'win'.
 - The app can only disable Do Not Disturb (`off`) if it was previously enabled using a notification command from Home Assistant.
:::
<br />


| `command` | Description |
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
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_dnd"
          data:
            command: "priority_only"
```

## Flashlight

![Android](/assets/android.svg)

This command allows you to toggle the flashlight on or off directly from a notification, enabling control of the device's flashlight without opening the app. To use it, send `message: command_flashlight` with the `command` parameter set to either `turn_on` or `turn_off` to control the flashlight state.

Example:

```yaml
automation:
  - alias: Turn on flashlight
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_flashlight"
          data:
            command: "turn_on"
```

## High accuracy mode

![Android](/assets/android.svg)

Users can turn the high accuracy mode of the background location sensor on or off using `message: command_high_accuracy_mode` with the `command` being either `turn_off`, `turn_on`, `force_off` or `force_on`. If `command` is blank, not set or not one of the above expected values then the notification will post as normal. The difference between `turn` and `force` is only relevant if you have zone and/or bluetooth constraints set in the high accuracy mode settings. In this case `force_on` will make high accuracy mode active until either `force_off` is sent, or the constraints go from active to inactive.  Similarly, `force_off` will turn off high accuracy mode until either `force_on` is sent, or the constraints go from inactive to active.

Example:

```yaml
automation:
  - alias: Turn off high accuracy mode
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_high_accuracy_mode"
          data:
            command: "turn_off"
```

You can also adjust the update interval of high accuracy mode by following the example below. You must send a valid value that cannot be less than `5`. Anything else will result in the notification posting to the device. After performing this command high accuracy mode will restart which can take a few seconds to complete.

```yaml
automation:
  - alias: Set high accuracy update interval
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_high_accuracy_mode"
          data:
            high_accuracy_update_interval: 60
            command: "high_accuracy_set_update_interval"
```

## Launch App

![Android](/assets/android.svg)

If you would like to simply just launch an application you can use `message: command_launch_app` to launch any application installed on your device. You must send the package name you wish to open using the `package_name` parameter, if not set then you will see the notification post as normal. If the application is not installed on the device then the user will be directed to the Google Play Store to install the application. This command requires the Draw Over Other Apps permission, the first time you send this command you will be directed to granting this special permission to the Home Assistant application.

```yaml
automation:
  - alias: Launch app
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_launch_app"
          data:
            package_name: "com.twitter.android"
```

## Media

![Android](/assets/android.svg)

Users are able to control any active media session on their devices. You must set `message: command_media` and the `media_command` must be one from the list below. The `media_package_name` must be set to the package name you wish to control. The notification will post as normal if one of the required fields is left blank, has incorrect data or a media session is not active.

List of accepted `media_command` media commands:
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
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_media"
          data:
            media_command: "pause"
            media_package_name: "com.spotify.music"
```

## Request Location Updates

![Android](/assets/android.svg) ![iOS](/assets/iOS.svg)
:::caution
Do not rely on this functionality due to the time limitations mentioned below.
:::

You can force a device to attempt to report its location by sending a special notification. The notification is not visible to the device owner and only works when the app is running or in the background.

![iOS](/assets/iOS.svg)
On success the sensor.last_update_trigger will change to "Push Notification".

```yaml
automation:
  - alias: Request location update
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "request_location_update"
```

Assuming the device receives the notification, it will attempt to get a location update within 5 seconds and report it to Home Assistant. This is a little bit hit or miss since Apple imposes a maximum time allowed for the app to work with the notification and location updates sometimes take longer than usual due to factors such as waiting for GPS acquisition.

:::danger
While it is possible to create an automation in Home Assistant to call this action regularly to update sensors, this is not recommended as doing this too frequently may have a negative impact on your device's battery life and health.
:::


## Ringer Mode

![Android](/assets/android.svg)

On Android you can control the device\'s ringer mode by sending `message: command_ringer_mode` with an appropriate `command` as outlined in the table below. Certain devices will need to grant a special permission that will appear upon the first command received if the permission was not already granted. This is the same permission as [Do Not Disturb](#do-not-disturb) up above. If the device has Do Not Disturb enabled then setting to `normal` or `vibrate` will turn it off. If the device does not have Do Not Disturb enabled then `silent` will turn it on.<br />

| `command` | Description |
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
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_ringer_mode"
          data:
            command: "vibrate"
```

## Screen Brightness Level

![Android](/assets/android.svg)

You can control the screen brightness level on the device by sending `message: command_screen_brightness_level` with `command` being the level of brightness the screen should be. Valid values are between `0` and `255`. If you do not send a number or send a blank value then the notificaton will post as normal. If you send a value below `0` or above `255` then the app will default to `0` or `255` respectively.

```yaml
automation:
  - alias: Set screen brightness level
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_screen_brightness_level"
          data:
            command: 50
```

## Screen Off Timeout

![Android](/assets/android.svg) 

You can control the screen off timeout on the device by sending `message: command_screen_off_timeout` with `command` being the timeout value in milliseconds. If you do not send a number or send a blank value then the notificaton will post as normal. The values will respect the minimum and maximum defined by the android system, for example on a Pixel device anything below `10000` will be treated as a 10 second timeout.

```yaml
automation:
  - alias: Set screen off timeout
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_screen_off_timeout"
          data:
            command: 10000
```

## Screen On

![Android](/assets/android.svg)

On Android you can turn on the screen using a notification by simply sending `message: command_screen_on`. This will not remove or disable any lock screens you have setup on the device. The reason behind this is the risk associated with the app being unable to set the device policy back (app crash) or if the device requires the policy to be setup again after being removed. All of which is out of the app's control. You may want to adjust the screen timeout setting on your device to control when the screen will turn back off.

Also you can optionally add `command: keep_screen_on` to enable [Keep screen On](https://companion.home-assistant.io/docs/integrations/android-webview#keep-screen-on) feature in the Companion App section within [Configuration](https://my.home-assistant.io/redirect/config/). The screen will remain on only if the webview activity is currently active, otherwise it will turn back off. Notification with `command` having another value will reset this setting to default Disabled state.

```yaml
automation:
  - alias: Screen on
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_screen_on"
          data:
            command: "keep_screen_on"
```

## Stop TTS

![Android](/assets/android.svg)

If you wish to stop the device from completing its Text to Speech notification you can stop it by sending the command `message: command_stop_tts`.

```yaml
automation:
  - alias: Stop TTS
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_stop_tts"
```

## Persistent

![Android](/assets/android.svg)

On Android you can toggle the persistent connection mode using a notification by sending `message: command_persistent_connection` and passing `data -> persistent: (always, home_wifi, screen_on, never)`

```yaml
automation:
  - alias: Turn on persistent connection
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_persistent_connection"
          data:
            persistent: always
```

## Update Sensors
![Android](/assets/android.svg)<br />

The app will check all enabled sensors for an update and if the state has changed since the last update it will send over the update. Check [sensor](/docs/core/sensors) documentation for more details on sensors.

```yaml
automation:
  - alias: Update sensors
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_update_sensors"
```

## Volume Level

![Android](/assets/android.svg)

On Android you can control the device\'s volume level by sending `message: command_volume_level` with an appropriate `command` that must be a number. If `command` is larger than the maximum level then the maximum level will be used or if `command` is less than `0` then we will default to `0`, anything else will result in the notification posting to the device. `media_stream` is also required as outlined in the table below. Certain devices will need to grant a special permission that will appear upon the first command received if the permission was not already granted. This is the same permission as [Do Not Disturb](#do-not-disturb) up above. Changing the volume level will have a direct impact on Do Not Disturb and Ringer Modes, behavior will vary from device to device.<br />

| `media_stream` | Description |
| ------- | ----------- |
| `alarm_stream` | Set the volume level for the alarm stream. |
| `call_stream` | Set the volume level for the voice call stream. |
| `dtmf_stream` | Set the volume level for DTMF tones. |
| `music_stream` | Set the volume level for the music stream. |
| `notification_stream` | Set the volume level for the notification stream. |
| `ring_stream` | Set the volume level for the ring stream. |
| `system_stream` | Set the volume level for the system stream. |
| Anything else | The notification will post as a normal notification and the command will not process. |
<br />

```yaml
automation:
  - alias: Command volume level
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_volume_level"
          data:
            media_stream: "music_stream"
            command: 20
```

## Wake word detection <span class="beta">BETA</span>

![Android](/assets/android.svg)

This command allows you to toggle wake word detection on or off directly from a notification, enabling control of the device's wake word detection feature without opening the app. Wake word detection can be battery-intensive, so you can use this command to enable it only when needed through automation. To use it, send `message: command_wake_word_detection` with the `command` parameter set to either `turn_on` or `turn_off` to control the wake word detection state.

Example:

```yaml
automation:
  - alias: Turn on wake word detection
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_wake_word_detection"
          data:
            command: "turn_on"
```

## Webview

![Android](/assets/android.svg)

If you want to just open the Companion app to any page or even the homepage you will want to send `message: command_webview`. If you wish to navigate to a specific [view](https://www.home-assistant.io/lovelace/views/) or [dashboard](https://www.home-assistant.io/lovelace/dashboards/) you will want to use `command` to specify the [`path`](https://www.home-assistant.io/lovelace/views/#path) (example: `/lovelace/settings`). You can also open the More Info panel for any entity by using the following format for `command`: `entityId:sun.sun` just replace `sun.sun` with the entity you wish to open. If `command` is not provided the user will be directed to the homepage. The first time you send this command you will be taken to a permission screen to grant the app access to display over other apps policy. This permission is necessary for the feature to work in the background and we cannot prompt the user to grant it.

Example:

```yaml
automation:
  - alias: Open android webview
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "command_webview"
          data:
            command: "/lovelace/settings"
```
