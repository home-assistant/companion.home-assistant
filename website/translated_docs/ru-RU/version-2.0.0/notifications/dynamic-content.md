---
title: Динамические вложения
id: version-2.0.0-dynamic-content
original_id: динамический контент
---

Dynamic content such as maps and camera streams can be displayed as part of a notification without needing to open an app.

## Карта

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

You may also use a device_tracker for the latitude and longitude coordinates like so: `"{{states.device_tracker.<your_device_id_here>.attributes.latitude}}"` but make sure to use `data_template` in that case.

### Отображение второй точки

Вы можете использовать следующие свойства в `action_data` для отображения второй точки. If used, the first pin will be red and the second pin green.

| Name                         | Type    | Description                                          |
| ---------------------------- | ------- | ---------------------------------------------------- |
| `second_latitude:`           | string  | The latitude of the second pin.                      |
| `second_longitude:`          | string  | The longitude of the second pin.                     |
| `shows_line_between_points:` | boolean | Displays a line connecting the first and second pin. |

### Дополнительная конфигурация

You can also pass the following option properties under `action_data` to modify the map in various ways. All options listed here accept boolean (`true` / `false`) values.

| Name                        | Type    | Description                                              |
| --------------------------- | ------- | -------------------------------------------------------- |
| `shows_compass:`            | boolean | Displays a compass control on the map.                   |
| `shows_points_of_interest:` | boolean | Displays point-of-interest (POI) information on the map. |
| `shows_scale:`              | boolean | Shows scale information on the map.                      |
| `shows_traffic:`            | boolean | Displays traffic information on the map.                 |
| `shows_user_location:`      | boolean | Attempts to display user's location on the map.          |

![Пример динамического содержания карты.](assets/ios/map.png)

## Потоки с камеры

The preview thumbnail of the notification will display a still image from the camera. When expanded, the notification content displays a real time MJPEG stream if the camera supports it.

Вы можете использовать параметры вложения `content-type` и `hide-thumbnail` с камерой для управления эскизом.

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

Вы можете просмотреть пример [здесь](https://www.youtube.com/watch?v=LmYwpxPKW0g).

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/LmYwpxPKW0g" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>
</div>

## Сочетание с активными уведомлениями

Как вы можете увидеть `category` ключ используется для указания устройства, какое расширение контента используется. Вы можете использовать те же идентификаторы категории в своих собственных действиях [actions](actionable.md) для добавления действий в расширение содержимого.

Например, эта конфигурация добавляет действия к сообщению о содержимом камеры.

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

## Устранение проблем

If you are having problems with receiving these special notifications, try restarting your phone first. The extensions sometimes fail to register properly until a restart.