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
- **shows_points_of_interest**: Булевое значение, указывающее, отображает ли карта информацию о точке интереса.
- **shows_scale**: Булевое значение, указывающее, показывает ли карта информацию о масштабе.
- **shows_traffic**:: Булевое значение, указывающее, отображает ли карта информацию о трафике.
- **shows_user_location**: Булевое значение, указывающее, должна ли карта отображать местоположение пользователя.

![An example of the map dynamic content.](assets/ios/map.png)

# Потоки с камеры

Изображение уведомления будет статической картинкой с камеры. Содержание уведомления - это поток MJPEG камеры в реальном времени (при условии, что камера поддерживает его).

Вы можете использовать параметры вложения `content-type` и `hide-thumbnail` с камерой для управления эскизом.

Вы можете просмотреть пример [здесь](https://www.youtube.com/watch?v=LmYwpxPKW0g).

Примечание: Эта функциональность доступна только начиная с iOS 11.

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