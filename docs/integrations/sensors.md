---
title: "Sensors"
---

Along with providing [location services](location/index.md), the companion app also adds several additional sensors to Home Assistant. **It is important to know that these sensors are only updated when a location is pushed to Home Assistant or the web view is refreshed**. The sensors provided by the companion app are:

| Sensor | Attributes | Description |
| --------- | --------- | ----------- |
| `sensor.device_ID_activity` | `confidence`, `types` | The current activity type as computed by iOS. Requires motion permissions to be enabled. |
| `sensor.device_ID_bssid` | None |  The MAC address of the wireless access point your phone is connected to. When off Wi-Fi, this sensor will continue to report the last access point you were connected to. |
| `sensor.device_ID_battery` | `level`, `state` | The current charging state (either `Charging` or `Not Charging`) of the device. Current battery level is available from the `Level` attribute of this sensor. |
| `sensor.device_ID_connection_type` | `cell_tech_type` | The current data connection being used by the phone. |
| `sensor.device_ID_last_update_trigger` | None | The cause of the last update of location and sensor data from the device to Home Assistant |
| `sensor.device_ID_ssid` | None | The human-readable name of the Wi-Fi network the device is currently connected to. When of Wi-Fi, this sensor will continue to give the SSID of the last Wi-Fi network the device was connected to. |
`device_ID` corresponds to the Device ID specified in App Configuration within the app.

## Actvity Sensor
`sensor.device_ID_activity` provides the current motion activity as calculated by iOS along with the confidence of the calculations. Activities known by iOS and given by `sensor.device_ID_activity` are:
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

## Battery Sensor
The primary state of `sensor.device_ID_battery` gives whether or not the device is currently charging. The possible values are `Charging` or `Not_Charging`. The current battery level of the device can be accessed through the `Level` attribute. If you wish to create a sensor specifically for the battery level, this can be done with a [`template_sensor`](https://www.home-assistant.io/components/template/). For example, by adding the following to your `configuration.yaml`:

```yaml
sensor:
  - platform: template
    sensors:
      iPhone_battery_level:
        unit_of_measurement: '%'
        value_template: "{{ states.sensor.device_ID_battery.attributes.Level }}"
```

## Connection Type Sensor
The following connection types are known by the companion app:
*   `Wi-Fi`
*   `Cellular`
*   `No Connection`

A more specific description of the data connection can be found in the `cell_tech_type` attribute of the sensor. Possible values for this attribute are:

*   `Wi-Fi`
*   `4G`
*   `3G`
*   `2G`
*   `Cellular`
*   `No Connection`

If the connection type is not recognized, either `Unknown` or `Unknown Technology` will be returned.
