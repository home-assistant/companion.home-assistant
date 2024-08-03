---
title: "Sensors"
id: 'sensors'
---

The Wear OS app also offers [sensors](../core/sensors.md#android-sensors) to consume your wearable data in Home Assistant, please refer to the link to learn more about how sensors update on Android. Not all sensors offered by the phone app will be offered by the Wear OS app. Please see the list below for what sensors are currently supported by the Wear OS app. If a sensor requires permissions you will be prompted to accept, otherwise the sensor will not enable and send data.

It's important to note that sensor updates require the app to post a notification to the device in order to prevent it from being killed by the OS. You can go to into Wear device settings and turn off the SensorWorker Notification channel to stop these notifications from buzzing on your wrist.

:::info
Sensor updates are dependent upon the watch having data connectivity and the app being allowed to send an update. Some devices implement stricter battery saving techniques than others so updates may not happen as frequently as you would expect.

There is currently no support for sensor settings. Some sensors may not be fully operational as a result. For example, the BLE Transmitter and Beacon Monitor sensors can only be enabled, none of the settings can be changed as of this moment. These sensors may not be completely functional while we work on adding sensor settings, the default settings will allow for primary functionality.
:::

## Sensor List

| Sensor | Attributes | Description |
| --------- | --------- | ----------- |
| [App Data](../core/sensors.md#app-data-sensors) | None | Sensors that show how much data was sent or received by the app. |
| [App Importance](../core/sensors.md#app-importance-sensor) | None | The current importance of the app to determine if its in the foreground or cached. |
| [App Memory](../core/sensors.md#app-memory-sensor) | None | Information about the memory that is available for the app. |
| [App Usage](../core/sensors.md#app-usage-sensors) | None | Sensors that represent how the app is treated based on its usage. |
| [Audio](../core/sensors.md#audio-sensors) | None | Several different sensors around different types of audio detection from the device. |
| [Battery](../core/sensors.md#battery-sensors) (enabled by default) | None | Several different sensors around the state of the devices battery. Only `battery_level`, `battery_state` and `charger_type` enabled by default. |
| `binary_sensor.bedtime_mode` | None | A sensor to reflect the state of Bedtime mode on the device. For best results enable Do Not Disturb or Interactive sensor. Only available on Wear OS 3 devices |
| [Bluetooth Sensors](../core/sensors.md#bluetooth-sensors) | [See Attributes](../core/sensors.md#bluetooth-sensors) | Several different sensors about the state of bluetooth on the device. Sensors are also available for beacon transmitting and monitoring. |
| `sensor.current_time_zone` | [See Attributes](../core/sensors.md#current-time-zone-sensor) | The current time zone the device is in. |
| [Current Version](../core/sensors.md#current-version-sensor) | None | The current installed version of the application. |
| [Do Not Disturb](../core/sensors.md#do-not-disturb-sensor) | None | The state of do not disturb on the device. |
| [Doze](../core/sensors.md#doze-sensor) | None | Whether or not the device is in doze mode. |
| [Health Services](#health-services) | [See below](#health-services) | A group of sensors provided by the Health Services API. |
| `sensor.heart_rate` | Accuracy | Current heart rate in beats per minute. This sensor makes use of the [heart rate sensor](https://developer.android.com/reference/android/hardware/Sensor#TYPE_HEART_RATE). <span class='beta'>BETA</span> Only available on devices running Wear OS 3 and below. |
| [Interactive](../core/sensors.md#interactive-sensor) | None | Whether or not the device is in an interactive state. |
| [Keyguard Sensors](../core/sensors.md#keyguard-sensors) | None | Sensors that represent various states about the device being locked or secured. |
| `sensor.last_reboot` | [See Attributes](../core/sensors.md#last-reboot-sensor) | The timestamp of the device's last reboot. |
| [Last Update](../core/sensors.md#last-update-trigger-sensor) | None | The state will reflect the intent that caused the last update to get sent. |
| `sensor.light_sensor` | None | The current level of illuminance the device detects. |
| [Mobile Data Sensors](../core/sensors.md#mobile-data-sensors) | None | Several different sensors around the state of mobile data. |
| `binary_sensor.nfc_state` | None | Whether or not the device has its NFC sensor enabled. |
| `sensor.phone_state` | None | The only tracked states are `idle`, `ringing` or `offhook`, no other information is accessed. |
| `sensor.pressure_sensor` | None | The pressure reading from the device. |
| `sensor.proximity_sensor` | None | The current proximity reading from the device, certain devices will only show boolean value of `near` or `far`. |
| [Network](../core/sensors.md#connection-type-sensor) | None | Several different sensors around the state of WiFi. |
| [Next Alarm](../core/sensors.md#next-alarm-sensor) | [See Attributes](../core/sensors.md#next-alarm-sensor) | Date of the next scheduled alarm. |
| `binary_sensor.on_body_sensor` | None | A sensor to indicate whether the wearable believes it is on the body or not. This sensor makes use of the [low latency off body detection](https://developer.android.com/reference/android/hardware/Sensor#TYPE_LOW_LATENCY_OFFBODY_DETECT) sensor. |
| [Power Save](../core/sensors.md#power-save-sensor) | None | Whether or not the device is in power saving mode. |
| `sensor.screen_brightness` | [See Attributes](../core/sensors.md#screen-brightness-sensor) | The current value of screen brightness. |
| `sensor.screen_off_timeout` | None | The current value of screen off timeout setting. |
| `sensor.sim_1` | [See Attributes](../core/sensors.md#cellular-provider-sensor) | Name of your cellular provider. |
| `sensor.sim_2` | [See Attributes](../core/sensors.md#cellular-provider-sensor) | Name of your cellular provider. |
| [Steps](../core//sensors.md#pedometer-sensors) | None | The number of steps taken from the user since the last device reboot. Requires activity recognition permissions on supported devies. |
| [Storage Sensors](../core/sensors.md#storage-sensor) | [See Attributes](../core/sensors.md#storage-sensor) | The amount of total and available internal & external storage on your Android device. |
| `binary_sensor.theater_mode` | None | A sensor to reflect the state of Theater mode on the device. For best results enable the Interactive sensor. |
| [Traffic Stats Sensor](../core/sensors.md#traffic-stats-sensor) | None | Amount of data transmitted and received from mobile and total device usage since last reboot. |
| `binary_sensor.wet_mode` | None | A sensor to indicate the state of Wet Mode on the current device. This sensor is also known as Touch Lock or Water Lock on some devices. This is a special mode where the user must press and hold the crown/power button for 2 seconds to re-enable touch. |


### Health Services

Wear OS 3+ Only<br />

A list of sensors that contain data provided by Googles [Health Services API](https://developer.android.com/training/wearables/health-services/passive#useractivityinfo).

The following sensors are available (if your device supports them):

| Sensor | Attribute | Description |
| --------- | --------- | ----------- |
| `sensor.activity_state` | Exercise type, Time | A sensor to reflect the current user activity state which can be either: asleep, exercise, passive or unknown.|
| `sensor.daily_calories` | None | The total number of calories over a day (including both BMR and active calories), where the previous day ends and a new day begins at 12:00 AM local time. |
| `sensor.daily_distance` | None | The total distance over a day, where the previous day ends and a new day begins at 12:00 AM local time. |
| `sensor.daily_floors` | None | The total number floors climbed over a day, where the previous day ends and a new day begins at 12:00 AM local time. |
| `sensor.daily_steps` | None | The total step count over a day, where the previous day ends and a new day begins at 12:00 AM local time. |
