---
title: "Sensors"
id: 'sensors'
---

The Wear OS app also offers [sensors](../core/sensors.md#android-sensors) to consume your wearable data in Home Assistant, please refer to the link to learn more about how sensors update on Android. Not all sensors offered by the phone app will be offered by the Wear OS app. Please see the list below for what sensors are currently supported by the Wear OS app. If a sensor requires permissions you will be prompted to accept, otherwise the sensor will not enable and send data.

It's important to note that sensor updates require the app to post a notification to the device in order to prevent it from being killed by the OS. You can go to into Wear device settings and turn off the SensorWorker Notification channel to stop these notifications from buzzing on your wrist.

:::info
Sensor updates are dependent upon the watch having data connectivity and the app being allowed to send an update. Some devices implement stricter battery saving techniques than others so updates may not happen as frequently as you would expect.
:::

## Sensor List

| Sensor | Attributes | Description |
| --------- | --------- | ----------- |
| [App Data](../core/sensors.md#app-data-sensors) | None | Sensors that show how much data was sent or received by the app. |
| [App Importance](../core/sensors.md#app-importance-sensor) | None | The current importance of the app to determine if its in the foreground or cached. |
| [App Memory](../core/sensors.md#app-memory-sensor) | None | Information about the memory that is available for the app. |
| [App Usage](../core/sensors.md#app-usage-sensors) | None | Sensors that represent how the app is treated based on its usage. |
| [Audio](../core/sensors.md#audio-sensors) | None | Several different sensors around different types of audio detection from the device. |
| [Battery](../core/sensors.md#battery-sensors) (enabled by default) | None | Several different sensors around the state of the devices battery. |
| `binary_sensor.bedtime_mode` | None | A sensor to reflect the state of Bedtime mode on the device. For best results enable Do Not Disturb or Interactive sensor. Only available on Wear OS 3 devices |
| [Current Version](../core/sensors.md#current-version-sensor) | None | The current installed version of the application. |
| [Do Not Disturb](../core/sensors.md#do-not-disturb-sensor) | None | The state of do not disturb on the device. |
| [Doze](../core/sensors.md#doze-sensor) | None | Whether or not the device is in doze mode. |
| [Health Services](#health-services) | [See below](#health-services) | A group of sensors provided by the Health Services API. |
| `sensor.heart_rate` | Accuracy | Current heart rate in beats per minute. This sensor makes use of the [heart rate sensor](https://developer.android.com/reference/android/hardware/Sensor#TYPE_HEART_RATE). |
| [Interactive](../core/sensors.md#interactive-sensor) | None | Whether or not the device is in an interactive state. |
| [Last Update](../core/sensors.md#last-update-trigger-sensor) | None | The state will reflect the intent that caused the last update to get sent. |
| [Network](../core/sensors.md#connection-type-sensor) | None | Several different sensors around the state of WiFi. |
| [Next Alarm](../core/sensors.md#next-alarm-sensor) | [See Attributes](../core/sensors.md#next-alarm-sensor) | Date of the next scheduled alarm. |
| `binary_sensor.on_body_sensor` | None | A sensor to indicate whether the wearable believes it is on the body or not. This sensor makes use of the [low latency off body detection](https://developer.android.com/reference/android/hardware/Sensor#TYPE_LOW_LATENCY_OFFBODY_DETECT) sensor. |
| [Power Save](../core/sensors.md#power-save-sensor) | None | Whether or not the device is in power saving mode. |
| [Steps](../core//sensors.md#pedometer-sensors) | None | The number of steps taken from the user since the last device reboot. Requires activity recognition permissions on supported devies. |
| `binary_sensor.theater_mode` | None | A sensor to reflect the state of Theater mode on the device. For best results enable the Interactive sensor. |
| `binary_sensor.wet_mode` | None | A sensor to indicate the state of Wet Mode on the current device. This sensor is also known as Touch Lock or Water Lock on some devices. This is a special mode where the user must press and hold the crown/power button for 2 seconds to re-enable touch. |


### Health Services

Wear OS 3 Only<br /><br />

A list of sensors that contain data provided by Googles [Health Services API](https://developer.android.com/training/wearables/health-services/passive#useractivityinfo).

The following sensors are available (if your device supports them):

| Sensor | Attribute | Description |
| --------- | --------- | ----------- |
| `sensor.activity_state` | Exercise type, Time | A sensor to reflect the current user activity state which can be either: asleep, exercise, passive or unknown.|
| `sensor.daily_calories` | None | The total number of calories over a day (including both BMR and active calories), where the previous day ends and a new day begins at 12:00 AM local time. |
| `sensor.daily_distance` | None | The total distance over a day, where the previous day ends and a new day begins at 12:00 AM local time. |
| `sensor.daily_floors` | None | The total number floors climbed over a day, where the previous day ends and a new day begins at 12:00 AM local time. |
| `sensor.daily_steps` | None | The total step count over a day, where the previous day ends and a new day begins at 12:00 AM local time. |
