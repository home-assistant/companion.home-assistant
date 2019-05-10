---
title: "Sensors"
---

Along with providing [location services](location/index.md), the companion app also adds several additional sensors to Home Assistant. **It is important to know that these sensors are only updated when a location is pushed to Home Assistant or the web view is refreshed**. The sensors provided by the companion app are:

| Sensor | Attributes | Description |
| --------- | --------- | ----------- |
| `sensor.activity` | `confidence`, `types` | The current activity type as computed by iOS. Requires motion permissions to be enabled. |
| `sensor.average_active_pace` | None | The averaged pace calculated by iOS from pedometer data. Units: meters per second, m/s |
| `sensor.battery_level` | `Battery State` | The current battery level of the device. Current battery state is available from the `Battery State` attribute of this sensor. |
| `sensor.battery_state` | `Battery Level` | The current charging state (either `Charging`, `Not Charging`, or `Full`) of the device. Current battery level is available from the `Level` attribute of this sensor. |
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

Attributes such as `Cellular Technology` can be accessed with a template such as:

```
{{ states.sensor.connection_type.attributes['Cellular Technology'] }}
```

## Actvity Sensor
`sensor.activity` provides the current motion activity as calculated by iOS along with the confidence of the calculations. Activities known by iOS and given by `sensor.activity` are:
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

## Battery Sensors
The Battery State sensor (`sensor.battery_state`) provides information on the current status of the devices battery. The three possible values are `Charging`, `Not Charging`, or `Full` when the device is 100% charged.

The Battery Level sensor (`sensor.battery_level`) reports the current battery level of the device from 0-100%. The charge level is reflected in the sensor icon.

## Connection Type Sensor
The following connection types are known by the companion app:
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


## Last Update Trigger Sensor
This sensor displays exactly what caused the last update of location and sensor data from the device to Home Assistant.

| State | Description |
| --------- | --------- |
| Manual | A manual update is triggered when the user pulls to refresh. |
| Initial | Sensors are updated upon initial app launch. |
| Significant Location Update | Triggers when there has been a significant change in the device’s location, such as 500 meters or more. See [location](location/index.md) for additional details. |
| Geographic Region Entered | Triggered when entering any user-specified Home Assistant [zone](https://www.home-assistant.io/components/zone/) (also known as geofencing). |
| Geographic Region Exited | Triggered when exiting any user-specified Home Assistant [zone](https://www.home-assistant.io/components/zone/) (also known as geofencing). |
| Push Notification | [Requesting location updates](notifications/location.md) via push notification.  |
| Background Fetch | When the app refreshes sensor information in the background. |
| Siri | Location updates triggered via the [Siri Shortcuts](siri-shortcuts.md) "Send Location" shortcut. |
| iBeacon Region Entered | Triggered when an iBeacon is seen that corresponds to a known zone. |


## Geocoded Location Sensor
The [geocoded](https://.wikipedia.org/wiki/Geocoding) location sensor provides a user-friendly description of a users current location coordinates, often containing the name of the place, its address, and other relevant information. This sensor reports many detailed attributes allowing you to create useful [template sensors](https://www.home-assistant.io/components/template/).

Geocoding is handled directly by iOS's [MapKit](https://developer.apple.com/documentation/mapkit) and [Core Location](https://developer.apple.com/documentation/corelocation/converting_between_coordinates_and_user-friendly_place_names) services.

| Attribute | Description |
| --------- | --------- |
| `Location` | The latitude and longitude coordinates of the placemark. |
| `Name` | The name of the placemark. |
| `Country` | The name of the country associated with the placemark. |
| `ISOCountryCode` | The abbreviated country name. |
| `TimeZone` | The time zone associated with the placemark. |
| `AdministrativeArea` | The state or province associated with the placemark. |
| `SubAdministrativeArea` | Additional administrative area information for the placemark. |
| `PostalCode` | The postal code associated with the placemark. |
| `Locality` | The city associated with the placemark. |
| `SubLocality` | Additional city-level information for the placemark. |
| `Thoroughfare` | The street address associated with the placemark. |
| `SubThoroughfare` | Additional street-level information for the placemark. |
| `AreasOfInterest` | The relevant areas of interest associated with the placemark. |
| `Ocean` | The name of the ocean associated with the placemark. |
| `InlandWater` | The name of the inland water body associated with the placemark. |

## Pedometer Sensors
The pedometer sensors provide step-counting data from the devices built-in motion processor. They keep a tally of your daily on-foot activity, and reset at midnight. These sensors require motion permissions to be enabled.

| Sensor | Description |
| --------- | --------- |
| `sensor.steps` | The number of steps taken by the user. |
| `sensor.distance` | The estimated distance (in meters) traveled by the user. |
| `sensor.average_active_pace` | The average pace of the user, measured in seconds per meter. |
| `sensor.floors_ascended` | The approximate number of floors ascended by walking. |
| `sensor.floors_descended` | The approximate number of floors descended by walking. |


## Cellular Provider Sensor
The cellular provider sensor displays information about the user’s cellular service provider, such as its unique identifier and whether it allows VoIP calls on its network. `sensor.sim_1` corresponds to the physical SIM card installed and `sensor.sim_2` corresponds to the eSIM (this is only shown if the eSIM is enabled).

| Attribute | Description |
| --------- | --------- |
| `Carrier Name` | The name of the user’s home cellular service provider. |
| `Current Radio Technology` |  |
| `ISO Country Code` | The ISO country code for the user’s cellular service provider. |
| `Mobile Country Code` | The mobile country code (MCC) for the user’s cellular service provider. |
| `Mobile Network Code` | The mobile network code for the user’s cellular service provider. |
| `Carrier ID` |  |
| `Allows VoIP` | Indicates if the carrier allows making VoIP calls on its network. |
