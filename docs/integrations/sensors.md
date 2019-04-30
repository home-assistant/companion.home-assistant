---
title: "Sensors"
---

Along with providing [location services](location/index.md), the companion app also adds several additional sensors to Home Assistant. **It is important to know that these sensors are only updated when a location is pushed to Home Assistant or the web view is refreshed**. The sensors provided by the companion app are:

| Sensor | Attributes | Description |
| --------- | --------- | ----------- |
| `sensor.device_ID_activity` | `confidence`, `types` | The current activity type as computed by iOS. Requires motion permissions to be enabled. |
| `sensor.device_ID_bssid` | None |  The MAC address of the wireless access point your phone is connected to. When off Wi-Fi, this sensor will report `Not Connected`. |
| `sensor.device_ID_battery_level` | `state` | The current battery level of the device. Current battery state is available from the `State` attribute of this sensor. |
| `sensor.device_ID_battery_state` | `level` | The current charging state (either `Charging`, `Not Charging`, or `Full`) of the device. Current battery level is available from the `Level` attribute of this sensor. |
| `sensor.device_ID_cellular_provider_0000000100000001` | See Below |  |
| `sensor.device_ID_cellular_provider_0000000100000002` | See Below |  |
| `sensor.device_ID_connection_type` | `cell_tech_type` | The current data connection being used by the phone. |
| `sensor.device_ID_distance` | None | The estimated distance (in meters) traveled by the user. |
| `sensor.device_ID_floors_ascended` | None | The approximate number of floors ascended by walking. |
| `sensor.device_ID_floors_descended` | None | The approximate number of floors descended by walking. |
| `sensor.device_ID_geocoded_location` | See Below |  |
| `sensor.device_ID_last_update_trigger` | None | The cause of the last update of location and sensor data from the device to Home Assistant |
| `sensor.device_ID_ssid` | None | The human-readable name of the Wi-Fi network the device is currently connected to. When off Wi-Fi, this sensor will report `Not Connected`. |
| `sensor.device_ID_steps` | None | The number of steps taken by the user. |
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

## Battery Sensors
The Battery State sensor (`sensor.device_ID_battery_state`) provides information on the current status of the devices battery. The three possible values are `Charging`, `Not Charging`, or `Full` when the device is 100% charged.

The Battery Level sensor (`sensor.device_ID_battery_level`) reports the current battery level of the device from 0-100%.

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
The pedometer sensors provide step-counting data from the devices built-in motion processor. Requires motion permissions to be enabled.

| Sensor | Description | 
| --------- | --------- | 
| `sensor.device_ID_steps` | The number of steps taken by the user. |
| `sensor.device_ID_distance` | The estimated distance (in meters) traveled by the user. |
| `sensor.device_ID_floors_ascended` | The approximate number of floors ascended by walking. |
| `sensor.device_ID_floors_descended` | The approximate number of floors descended by walking. |

> Note: These pedometer sensors get reset upon each update and do not keep a running tally of the full day activity.

## Cellular Provider Sensor
The cellular provider sensor displays information about the user’s cellular service provider, such as its unique identifier and whether it allows VoIP calls on its network.

| Attribute | Description | 
| --------- | --------- | 
| `Carrier Name` | The name of the user’s home cellular service provider. |
| `Current Radio Technology` |  |
| `ISO Country Code` | The ISO country code for the user’s cellular service provider. |
| `Mobile Country Code` | The mobile country code (MCC) for the user’s cellular service provider. |
| `Mobile Network Code` | The mobile network code for the user’s cellular service provider. |
| `Carrier ID` |  |
| `Allows VoIP` | Indicates if the carrier allows making VoIP calls on its network. |
