---
title: "Dynamic attachments"
id: "dynamic-content"
---

![iOS](/assets/iOS.svg) iOS Specific

Dynamic content such as maps and camera streams can be displayed as part of a notification without needing to open an app.

## Map
Will show a centered map with a red pin at the given coordinates.

```yaml
service: notify.mobile_app_<your_device_id_here>
data:
  message: Something happened at home!
  data:
    push:
      category: map
    action_data:
      latitude: "40.785091"
      longitude: "-73.968285"
```
Be aware, that to send a map you must send a push `category` which has to be called `map`, `map1`, `map2`, `map3` or `map4`  otherwise you won't get the map delivered.

You may also use a device_tracker for the latitude and longitude coordinates like so: `"{{states.device_tracker.<your_device_id_here>.attributes.latitude}}"` but make sure to use `data_template` in that case.

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
service: notify.mobile_app_<your_device_id_here>
data:
  message: Motion Detected in the Living Room
  data:
    attachment:
      content-type: jpeg
    push:
      category: camera
    entity_id: camera.living_room_camera
```

Be aware, that to send a camera image you must send a push category which has to be called `camera`, `camera1`, `camera2`, `camera3` or `camera4` otherwise you won't get the camera image delivered.

You can view an example [here](https://www.youtube.com/watch?v=LmYwpxPKW0g).

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/LmYwpxPKW0g" frameborder="0" allowfullscreen></iframe>
</div>

## Combining with actionable notifications

As you can see the `category` key is used to tell the device what kind of content extension to use. You can use the same category identifiers in your own custom [actions](actionable.md) to add actions to the content extension.

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
