---
title: "Sensors"
id: 'sensors'
---

Along with providing [location services](location.md), the companion app also adds several additional sensors to Home Assistant. If you don't want the `device_tracker` entity but still want sensors to update then just disable the entity in the [entity registry](https://www.home-assistant.io/integrations/config/#entity-registry) to stop location updates and keep sensor updates.

The sensors provided by the companion app are:

![iOS](/assets/apple.svg) iOS Sensor List

**It is important to know that these sensors are only updated when a location is pushed to Home Assistant or the web view is refreshed**.

| Sensor | Attributes | Description |
| --------- | --------- | ----------- |
| `sensor.activity` | `confidence`, `types` | The current activity type as computed by iOS. Requires motion permissions to be enabled. |
| `sensor.average_active_pace` | None | The averaged pace calculated by iOS from pedometer data. Units: meters per second, m/s |
| `sensor.battery_level` | `Battery State`, `Low Power Mode` | The current battery level of the device. Current battery state is available from the `Battery State` attribute of this sensor. |
| `sensor.battery_state` | `Battery Level`, `Low Power Mode` | The current charging state (either `Charging`, `Not Charging`, or `Full`) of the device. Current battery level is available from the `Level` attribute of this sensor. |
| `sensor.bssid` | None |  The MAC address of the wireless access point your phone is connected to. When off Wi-Fi, this sensor will report `Not Connected`. |
| `sensor.connection_type` | `Cellular Technology` | The current data connection being used by the phone. |
| `sensor.distance` | None | The estimated distance walked by the user since midnight local time. Units: meters, m |
| `sensor.floors_ascended` | None | The approximate number of floors ascended by walking since midnight local time. |
| `sensor.floors_descended` | None | The approximate number of floors descended by walking. Since |
| `sensor.geocoded_location` | [See Below](#geocoded-location-sensor) | Calculated address based on GPS data. |
| `sensor.last_update_trigger` | None | The cause of the last update of location and sensor data from the device to Home Assistant |
| `sensor.sim_1` | [See Below](#cellular-provider-sensor) | Name of your cellular provider. |
| `sensor.sim_2` | [See Below](#cellular-provider-sensor) | Name of your cellular provider. |
| `sensor.ssid` | None | The human-readable name of the Wi-Fi network the device is currently connected to. When off Wi-Fi, this sensor will report `Not Connected`. |
| `sensor.steps` | None | The number of steps taken by the user. |
| `sensor.storage` | [See Below](#storage-sensor) | The amount of total and available storage on your iOS device. |

Attributes such as `Cellular Technology` can be accessed with a template such as:

```
{{ states.sensor.connection_type.attributes['Cellular Technology'] }}
```

![android](/assets/android.svg) Android Sensor List

Each ![android](/assets/android.svg) sensor below can be enabled by navigating to the `App Configuration` page then selecting `Manage Sensors`. By default most are disabled with the exception of the [battery sensors](#battery-sensors) and any that were given permission during onboarding. Once enabled the sensor will begin to send data to your Home Assistant server, if you chose to disable it later on the sensor will stop updating. All sensors update during a periodic 15 minute interval and they will also update if other certain conditions are met. Read about each sensor below to understand how often to expect updates. If you do not see a sensor listed below then your device does not support it.

| Sensor | Attributes | Description |
| --------- | --------- | ----------- |
| `sensor.activity` | `confidence` | The current activity type as computed by Google. Requires activity recognition permissions on supported devices. |
| `sensor.audio` | [See Below](#audio-sensor) | The state of the sensor will reflect the ringer mode of the device. |
| `sensor.battery_level` | None | The current battery level of the device. |
| `sensor.battery_state` | `is_charging`, `charger_type` | The state of the sensor reflects the current state of the battery ([See Below](#battery-sensors)). The `is_charging` attribute will be either `true` or `false`. The `charger_type` attribute will show either `ac`, `usb`, `wireless` or `unknown`. |
| `sensor.bluetooth_connection` | [See Below](#bluetooth-sensor) | The state of the sensor will reflect the total number of connected bluetooth devices. |
| `sensor.do_not_disturb` | None | The state of do not disturb on the device. |
| `sensor.geocoded_location` | [See Below](#geocoded-location-sensor) | Calculated address based on GPS data. |
| `sensor.last_reboot` | [See Below](#last-reboot-sensor) | The timestamp of the device's last reboot. |
| `sensor.light` | None | The current level of illuminance the device detects. |
| `sensor.phone_state` | None | The only tracked states are `idle`, `ringing` or `offhook`, no other information is accessed. |
| `sensor.pressure` | None | The pressure reading from the device. |
| `sensor.proximity` | None | The current proximity reading from the device, certain devices will only show boolean value of `near` or `far`. |
| `sensor.next_alarm` | [See Below](#next-alarm-sensor) | Date of the next scheduled alarm. |
| `sensor.sim_1` | [See Below](#cellular-provider-sensor) | Name of your cellular provider. |
| `sensor.sim_2` | [See Below](#cellular-provider-sensor) | Name of your cellular provider. |
| `sensor.steps` | None | The number of steps taken from the user since the last device reboot. Requires activity recognition permissions on supported devies. |
| `sensor.storage` | [See Below](#storage-sensor) | The amount of total and available internal & external storage on your Android device. |
| `sensor.wifi_connection` | `bssid`, `ip_address`, `link_speed`, `is_hidden`, `is_wifi_on`, `frequency`, `signal_level` | The state of the sensor will show the name of the connected network or `<not connected>`. |


## Activity Sensor
![iOS](/assets/apple.svg) `sensor.activity` provides the current motion activity as calculated by iOS along with the confidence of the calculations. Activities known by iOS and given by `sensor.activity` are:
*   `Stationary`
*   `Walking`
*   `Running`
*   `Automotive`
*   `Cycling`

If iOS is unable to calculate an activity from motion data, `Unknown` will be given.

It is possible for multiple activities to be returned, such as `Cycling` and `Stationary` (if you are cycling but at a stop light), the state of the sensor is simply the first of these return by iOS (not necessarily the most likely). A complete list of calculated activities is given by the `types` attribute. See [this post](https://nshipster.com/cmmotionactivity/#traveling-without-moving) by [@Mattt](https://twitter.com/mattt) over at [nshipster](https://nshipster.com/) for a description of how different scenarios yield multiple activities.

The `confidence` attribute corresponds how accurate iOS believes the report of the current activity is. Possible values are:
*   `Low`
*   `Medium`
*   `High`

![android](/assets/android.svg) This sensor is only available on the full flavor of the Android app that is found in the Google Play Store, it is not available for the minimal flavor. For android the user will have a different set of states to go by:
*   `in_vehicle`
*   `on_bicycle`
*   `on_foot`
*   `running`
*   `still`
*   `tilting`
*   `walking`
*   `unknown`

The attribute for the state will reflect the `confidence` rating from the [Activity Recognition API](https://developers.google.com/location-context/activity-recognition).


## Audio Sensor
![android](/assets/android.svg) This sensor uses [AudioManager](https://developer.android.com/reference/kotlin/android/media/AudioManager?hl=en) so the state will represent the ringer mode on the device, possible values are `normal`, `vibriate` or `silent`. The sensor will update any time the ringer mode on the device has changed. There are also additional attributes that trigger updates as mentioned below:

| Attribute | Description |
| --------- | --------- |
| `audio_mode` | The current audio mode of the device can be either: `normal`, `ringing` (identical to [phone sensor](#phone-state-sensor)), `in_call`, `in_communication` or `unknown` |
| `is_headphones` | Boolean value if headsets or headphones are plugged in, will update if device detects them. |
| `is_mic_muted` | Boolean value if the microphone is currently muted, Android 6.0+ will update as this value changes. |
| `is_music_active` | Boolean value if the device is actively playing music. |
| `is_speakerphone_on` | Boolean value if the device speakerphone is enabled, Android 6.0+ will update as this value changes. |
| `volume_level_*` | The current device volume level for the given volume attributes: `alarm`, `call`, `music`, `ring` |


## Battery Sensors
![iOS](/assets/apple.svg) The Battery State sensor (`sensor.battery_state`) provides information on the current status of the devices battery. The three possible values are `Charging`, `Not Charging`, or `Full` when the device is 100 % charged. The Battery Level sensor (`sensor.battery_level`) reports the current battery level of the device from 0–100 %. The charge level is reflected in the sensor icon. Additionally there is a "Low Power Mode" attribute that reports `true` or `false` depending on whether your iOS device is in [Low Power Mode](https://support.apple.com/en-us/HT205234) or not.

![android](/assets/android.svg) The Battery State sensor (`sensor.battery_state`) provides information on the current status of the devices battery. The five possible states are `full`, `charging`, `discharging`, `not_charging` or `unknown`. The attribute `is_charging` can be used to determine if the device is currently charging, the attribute `charger_type` can report the type of charger being used. Possible values are `ac`, `usb`, `wireless` and `unknown`. A `battery_health` attribute will show either `good`, `cold`, `dead`, `fail`, `overheated`, `over-voltage` or `unknown`. The sensor icon reflects the charging status, and type of charging being used. The battery state sensor will be updated when the device has a charger connected or disconnected. The battery level sensor will be updated any time any of the other sensors get an update as well as when the device reports low battery and when it has recovered from the low battery alert. Both of these sensors make use of [BatteryManager](https://developer.android.com/reference/android/os/BatteryManager?hl=en).


## Bluetooth Sensor
![android](/assets/android.svg) This sensors state will be the total number of connected bluetooth devices. The sensor will update as soon as the bluetooth state of the device changes. This sensor makes use of Android's [Bluetooth](https://developer.android.com/reference/android/bluetooth/package-summary?hl=en) package.

| Attribute | Description |
| --------- | --------- |
| `Connected Paired Devices` | The list of paired devices that are currently connected. |
| `Connected Not Paired Devices` | The list of devices that are connected but not paired. |
| `Is BT On` | Whether or not bluetooth is enabled on the device. |
| `Paired Devices` | The list of devices that are paired. |


## Cellular Provider Sensor
The cellular provider sensor displays information about the user’s cellular service provider, such as its unique identifier and whether it allows VoIP calls on its network. `sensor.sim_1` corresponds to the physical SIM card installed and `sensor.sim_2` corresponds to the eSIM (this is only shown if the eSIM is enabled).

![android](/assets/android.svg) Android users will see these sensors update anytime the network has changed, which makes use of [SubscriptionManager](https://developer.android.com/reference/android/telephony/SubscriptionManager?hl=en).

| Attribute | Description |
| --------- | --------- |
| `Carrier Name` | The name of the user’s home cellular service provider. |
| `Current Radio Technology` | ![iOS](/assets/apple.svg) only. |
| `ISO Country Code` | The ISO country code for the user’s cellular service provider. |
| `Mobile Country Code` | The mobile country code (MCC) for the user’s cellular service provider. |
| `Mobile Network Code` | The mobile network code for the user’s cellular service provider. |
| `Carrier ID` |  |
| `Allows VoIP` | Indicates if the carrier allows making VoIP calls on its network. ![iOS](/assets/apple.svg) |
| `Is Opportunistic` | An opportunistic subscription connects to a network that is limited in functionality and / or coverage. ![android](/assets/android.svg) |
| `Data Roaming` | Is data roaming enabled for the device. ![android](/assets/android.svg) |


## Connection Type Sensor
![iOS](/assets/apple.svg) The following connection types are known by the companion app:
*   `Wi-Fi`
*   `Cellular`
*   `No Connection`

A more specific description of the data connection can be found in the `Cellular Technology` attribute of the sensor (which only appears when on cellular). Possible values for this attribute are:

*   `4G`
*   `3G`
*   `2G`
*   `Cellular`
*   `No Connection`

If the connection type is not recognized, either `Unknown` or `Unknown Technology` will be returned.

![android](/assets/android.svg) Android users will have a `wifi_connection` sensor where the state will reflect the currently connected network name or `<not connected>`. This sensor will update when WiFi is turned on/off and when the device connects to a network. The sensor will also have attributes about the connection itself, see the table above for the different attributes. This sensor makes use of [WifiManager](https://developer.android.com/reference/android/net/wifi/WifiManager?hl=en).


## Do Not Disturb Sensor
![android](/assets/android.svg) This sensor will represent the state of Do Not Disturb (DND) on the device. The functionality of DND depends on the version of Android. Possible state values are `off`, `priority_only`, `total_silence`, `alarms_only`, `unavailable` or `unknown`. Not all states will show up on all versions of Android, for example a Pixel 4 XL will only show `off` or `priority_only`. If you never used DND you may see `unavailable` until you change the setting on your device. This sensor will update as soon as the state of DND changes. This sensor uses a [Global](https://developer.android.com/reference/kotlin/android/provider/Settings.Global?hl=en) variable that is not officially documented but has been available since Android 5.0.


## Geocoded Location Sensor
The [geocoded](https://.wikipedia.org/wiki/Geocoding) location sensor provides a user-friendly description of a users current location coordinates, often containing the name of the place, its address, and other relevant information. This sensor reports many detailed attributes allowing you to create useful [template sensors](https://www.home-assistant.io/components/template/).

Geocoding is handled directly by iOS's [MapKit](https://developer.apple.com/documentation/mapkit) and [Core Location](https://developer.apple.com/documentation/corelocation/converting_between_coordinates_and_user-friendly_place_names) services. In Android geocoding is handled by the internal [Geocoder](https://developer.android.com/reference/android/location/Geocoder).

| Attribute | Description |
| --------- | --------- |
| `Location` | The latitude and longitude coordinates of the placemark. |
| `Name` | The name of the placemark. ![iOS](/assets/apple.svg) iOS only, for Android check the state of the sensor. |
| `Country` | The name of the country associated with the placemark. |
| `ISOCountryCode` | The abbreviated country name. |
| `TimeZone` | The time zone associated with the placemark. ![iOS](/assets/apple.svg) iOS only |
| `AdministrativeArea` | The state or province associated with the placemark. |
| `SubAdministrativeArea` | Additional administrative area information for the placemark. |
| `PostalCode` | The postal code associated with the placemark. |
| `Locality` | The city associated with the placemark. |
| `SubLocality` | Additional city-level information for the placemark. |
| `Thoroughfare` | The street address associated with the placemark. |
| `SubThoroughfare` | Additional street-level information for the placemark. |
| `AreasOfInterest` | The relevant areas of interest associated with the placemark. ![iOS](/assets/apple.svg) iOS only |
| `Ocean` | The name of the ocean associated with the placemark. ![iOS](/assets/apple.svg) iOS only |
| `InlandWater` | The name of the inland water body associated with the placemark. ![iOS](/assets/apple.svg) iOS only |


## Last Reboot Sensor
![android](/assets/android.svg) This sensors state will be the date and time of the last reboot from the device in UTC format. The sensor will update during the normal sensor update interval. The state will be `unavailable` if the timestamp cannot be determined. This sensor uses the [SystemClock](https://developer.android.com/reference/android/os/SystemClock?hl=en) and current [System](https://developer.android.com/reference/java/lang/System?hl=en) time to calculate the timestamp.

| Attribute | Description |
| --------- | --------- |
| `Local Time` | The date and time of the last reboot in local time. |
| `Time in Milliseconds` | The time date and time of the last reboot in milliseconds. |


## Last Update Trigger Sensor
![iOS](/assets/apple.svg) This sensor displays exactly what caused the last update of location and sensor data from the device to Home Assistant.

| State | Description |
| --------- | --------- |
| Manual | A manual update is triggered when the user pulls to refresh. |
| Launch | Sensors are updated upon initial app launch. |
| Periodic | Updates periodically according to your settings in App Configuration -> Sensors. |
| Significant Location Change | Triggers when there has been a significant change in the device’s location, such as 500 meters or more. See [location](location.md) for additional details. |
| Geographic Region Entered | Triggered when entering any user-specified Home Assistant [zone](https://www.home-assistant.io/components/zone/) (also known as geofencing). |
| Geographic Region Exited | Triggered when exiting any user-specified Home Assistant [zone](https://www.home-assistant.io/components/zone/) (also known as geofencing). |
| Push Notification | [Requesting location updates](../notifications/location.md) via push notification.  |
| Background Fetch | When the app refreshes sensor information in the background. |
| Siri | Location updates triggered via the [Siri Shortcuts](../integrations/siri-shortcuts.md) "Send Location" shortcut. |
| iBeacon Region Entered | Triggered when an iBeacon is seen that corresponds to a known zone. |
| Registration | Triggered once when the app is first connected to your Home Assistant instance. |


## Light Sensor
![android](/assets/android.svg) This sensor will reflect the current level of illuminance the device detects. The sensor updates during the normal sensor update interval or with the other sensor updates and makes use of [Environment Sensors](https://developer.android.com/guide/topics/sensors/sensors_environment).


## Next Alarm Sensor
![android](/assets/android.svg) This sensors state will be the date and time of the next alarm in UTC format. The sensor will update as soon as the next alarm is scheduled. The state will be `unavailable` when there is no next alarm. This sensor makes use of [AlarmManager](https://developer.android.com/reference/android/app/AlarmManager?hl=en) to get the next scheduled alarm which can be set by any app at any time.

| Attribute | Description |
| --------- | --------- |
| `Local Time` | The date and time of the next alarm in local time. |
| `Package` | The package that scheduled the next alarm. |
| `Time in Milliseconds` | The time date and time of the next alarm in milliseconds. |


## Pedometer Sensors
![iOS](/assets/apple.svg) The pedometer sensors provide step-counting data from the devices built-in motion processor. They keep a tally of your daily on-foot activity, and reset at midnight. These sensors require motion permissions to be enabled.

| Sensor | Description |
| --------- | --------- |
| `sensor.steps` | The number of steps taken by the user. |
| `sensor.distance` | The estimated distance (in meters) traveled by the user. |
| `sensor.average_active_pace` | The average pace of the user, measured in seconds per meter. |
| `sensor.floors_ascended` | The approximate number of floors ascended by walking. |
| `sensor.floors_descended` | The approximate number of floors descended by walking. |

![android](/assets/android.svg) Android users will only have a `sensor.steps` entity which will represent the total number of steps taken since the last device reboot. A recommended approach to getting your daily step count is to use the [Utility Meter integration](https://www.home-assistant.io/integrations/utility_meter) with `cycle: daily`. This sensor will update during the normal sensor update interval and makes use of the [Motion Sensor](https://developer.android.com/guide/topics/sensors/sensors_motion?hl=en).


## Phone State Sensor
![android](/assets/android.svg) This sensor will only show up if a user explicitly grants the `Phone` permission for the app in your devices `App Info` screen. The only data tracked for this sensor are the following states: `idle`, `ringing`, `offhook`. This sensor will update anytime a phone state change is detected and makes use of [TelephonyManager](https://developer.android.com/reference/android/telephony/TelephonyManager?hl=en).


## Pressure Sensor
![android](/assets/android.svg) This sensor will show the current pressure reading from the device. This sensor will update during the normal sensor update interval and makes use of [Environment Sensors](https://developer.android.com/guide/topics/sensors/sensors_environment).


## Proximity Sensor
![android](/assets/android.svg) This sensor will show the current proximity reading from the device. This sensor will update during the normal sensor update interval. Not all devices report an actual reading so those devices will show either `near` or `far` depending if the sensors maximum range is `5`. This sensor makes use of [Position Sensors](https://developer.android.com/guide/topics/sensors/sensors_position?hl=en).


## Storage Sensor
![iOS](/assets/apple.svg) This sensor displays information on the device storage. The file sizes reported are in Base-10.

| Attribute | Description |
| --------- | --------- |
| `Available` | The amount of available storage remaining on your device. |
| `Available (Important)` | The volume’s available capacity in bytes for storing important resources. |
| `Available (Opportunistic)` | The volume’s available capacity in bytes for storing nonessential resources. |
| `Total` | The total storage capacity of your device. |

![android](/assets/android.svg) For Android the behavior is slightly different due to the differences in the 2 operating systems. The state will be the same as iOS where we show the percentage of free space, the attributes will not be identical. This sensor will update during the normal sensor update interval, calculations are done with the help of [StatFs](https://developer.android.com/reference/android/os/StatFs?hl=en).

| Attribute | Description |
| --------- | --------- |
| `Free internal storage` | The amount of free internal storage space remaining on your device. |
| `Total internal storage` | The total internal storage capacity of your device. |
| `Free external storage` | The amount of free external storage remaining on your SD card, for devices without a SD card it will reflect `No SD Card`. |
| `Total external storage` | The total external storage of your SD card, for devices without a SD card it will reflect `No SD Card`. |
