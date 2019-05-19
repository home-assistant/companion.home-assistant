---
title: Динамический контент
id: версия-1.0.0-динамический-контент
original_id: динамический контент
---

С новой функцией расширения контента, найденной в iOS 10, динамическое содержимое теперь может быть отображено в качестве части уведомления без открытия приложения.

# Карта

Отображает карту с красной точкой подсказкой по заданным координатам. Карта будет в центре указаных координат.

```yaml
service: notify.ios_<your_device_id_here>
data:
  message: Something happened at home!
  data:
    push:
      category: map
    action_data:
      latitude: "40.785091"
      longitude: "-73.968285"
```

## Отображение второй точки

Вы можете использовать следующие свойства в `action_data` для отображения второй точки. Если используется, первая точка будет красной и вторая зелёной.

- **second_latitude**: Широта второй точки. **Должен быть строкой!**
- **second_latitude**: Широта второй точки. **Должен быть строкой!**
- **shows_line_between_points**: булевое значение, указывающее, должна ли линия быть нарисована между первой и второй точкой.

## Дополнительная конфигурация

Вы также можете передать следующие свойства в разделе `action_data` для изменения карты различными способами. Предполагается, что логические значения будут быть булевыми, если не указано иное:

- **shows_compass**: булевое значение указывающее, отображается ли на карте компас.
- **shows_points_of_interest**: A Boolean indicating whether the map displays point-of-interest information.
- **shows_scale**: A Boolean indicating whether the map shows scale information.
- **shows_traffic**: A Boolean value indicating whether the map displays traffic information.
- **shows_user_location**: A Boolean value indicating whether the map should try to display the user’s location.

![An example of the map dynamic content.](assets/ios/map.png)

# Camera Stream

The notification thumbnail will be a still image from the camera. The notification content is a real time MJPEG stream of a camera (assuming the camera supports it).

You can use the attachment parameters `content-type` and `hide-thumbnail` with camera to control the thumbnail.

You can view an example [here](https://www.youtube.com/watch?v=LmYwpxPKW0g).

Note: This functionality is only available from iOS 11 onwards.

```yaml
service: notify.ios_<your_device_id_here>
data:
  message: Motion detected in the Living Room
  data:
    attachment:
      content-type: jpeg
    push:
      category: camera
    entity_id: camera.demo_camera
```

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/LmYwpxPKW0g" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>
</div>

# Combining with actionable notifications

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

# Troubleshooting

If you are having problems with receiving these special notifications try restarting your phone first. The extensions somewhat often fail to register properly until a restart.