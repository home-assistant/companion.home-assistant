---
title: "Dynamic attachments"
id: "dynamic-content"
---

![iOS](/assets/iOS.svg) Specific<br />
Dynamic content such as maps and camera streams can be displayed as part of a notification without needing to open an app.

## Map
Will show a centered map with a red pin at the given coordinates.

```yaml
action: notify.mobile_app_<your_device_id_here>
data:
  message: Something happened at home!
  data:
    action_data:
      latitude: "40.785091"
      longitude: "-73.968285"
```

### iOS Prior to 2021.5

Before ![iOS](/assets/iOS.svg) version 2021.5, you need to include a `category` like so:

```yaml
action: notify.mobile_app_<your_device_id_here>
data:
  message: Something happened at home!
  data:
    action_data:
      latitude: "40.785091"
      longitude: "-73.968285"
    # compatibility with iOS versions prior to 2021.5
    push:
      category: map
```

Be aware, that to send a map you must send a push `category` which has to be called `map`, `map1`, `map2`, `map3` or `map4`  otherwise you won't get the map delivered.

### Zoom level

In order to change the default zoom level of the map, the following properties under `action_data` can be used. If not set, a default value of `0.1` degrees will be used.

| Name | Type | Description |
| ------------ | ------------- | ------------- |  
| `latitude_delta:` | string | The amount of north-to-south distance (in degrees) to display. |
| `longitude_delta:` | string | The amount of east-to-west distance (in degrees) to display. |

### Showing a second pin

You can use the following properties under `action_data` to display a second pin. If used, the first pin will be red and the second pin green.

| Name | Type | Description |
| ------------ | ------------- | ------------- |  
| `second_latitude:` | string | The latitude of the second pin. |
| `second_longitude:` | string | The longitude of the second pin. |
| `shows_line_between_points:` | boolean | Displays a line connecting the first and second pin. |

### Extra configuration

You can also pass the following option properties under `action_data` to modify the map in various ways. All options listed here accept boolean (`true` / `false`) values.

| Name | Type | Description |
| ------------ | ------------- | ------------- |
| `shows_compass:` | boolean | Displays a compass control on the map. |
| `shows_points_of_interest:` | boolean | Displays point-of-interest (POI) information on the map. |
| `shows_scale:` | boolean | Shows scale information on the map. |
| `shows_traffic:` | boolean | Displays traffic information on the map. |
| `shows_user_location:` | boolean | Attempts to display user's location on the map. |

![An example of the map dynamic content.](/assets/ios/map.png)

## Camera Stream

The preview thumbnail of the notification will display a still image from the camera. When expanded, the notification content displays a real time MJPEG stream if the camera supports it.

You can use the attachment parameters `content-type` and `hide-thumbnail` with camera to control the thumbnail.

```yaml
action: notify.mobile_app_<your_device_id_here>
data:
  message: Motion Detected in the Living Room
  data:
    entity_id: camera.living_room_camera
```

### iOS Prior to 2021.5

Before ![iOS](/assets/iOS.svg) version 2021.5, you need to include a `category` like so:

```yaml
action: notify.mobile_app_<your_device_id_here>
data:
  message: Motion Detected in the Living Room
  data:
    entity_id: camera.living_room_camera
    # compatibility with iOS versions prior to 2021.5
    push:
      category: camera
```

Be aware, that to send a camera image you must send a push category which has to be called `camera`, `camera1`, `camera2`, `camera3` or `camera4` otherwise you won't get the camera image delivered.

## Combining with actionable notifications on iOS versions prior to 2021.5

On versions prior to 2021.5, the `category` key is used to tell the device what kind of content extension to use. You can use the same category identifiers in your own custom [actions](actionable.md) to add actions to the content extension.

For example this configuration adds actions to a camera content message.

```yaml
ios:
  push:
    categories:
      - name: Camera With Actions
        identifier: 'camera'
        actions:
          - identifier: 'OPEN_COVER'
            title: 'Open Cover'
            activationMode: 'background'
            authenticationRequired: true
            destructive: no
          - identifier: 'CLOSE_COVER'
            title: 'Close Cover'
            activationMode: 'background'
            authenticationRequired: true
            destructive: true
```

## Troubleshooting

If you are having problems with receiving these special notifications, try restarting your phone first. The extensions sometimes fail to register properly until a restart.
