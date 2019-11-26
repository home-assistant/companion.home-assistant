---
title: Динамічний вміст
id: version-1.0.0-dynamic-content
original_id: dynamic-content
---

Завдяки новій функції розширення вмісту, яка міститься в iOS 10, динамічний вміст тепер може відображатися як частина сповіщення без видкриття додатку.

# Мапа

Покаже мапу з червоним наконечником на вказаних координатах. Мапа буде с середені заданих координат.

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

## Показ другоЇ позначки

Можна використовувати такі властивості під `action_data`, щоб відобразити другу позначку. Якщо використовується, перша позначка буде червона, а друга - зелена.

- **second_latitude**: Широта другої позначки. **Має бути рядок!**
- **second_longitude**: Довгота другої позначки. **Має бути рядок!**
- **shows_line_between_points**: Булеве значення, яке вказує, чи слід малювати лінію між першою і другою позначками.

## Додаткова конфігурація

Можна також передати такі властивості під `action_data`, щоб змінити карту різними засобами. Очікується, що всі булеві значення, якщо не зазначено інше:

- **shows_compass**: Булево, що вказує, чи відображає карта компас.
- **shows_points_of_interest**: Булево, що вказує, чи відображає карта інформацію про точку інтересу.
- **shows_scale**: Булево, що вказує, чи відображається на карті інформацію про масштаб.
- **shows_traffic**: Булево значення, що вказує, чи відображає на карті інформацію про дорожній рух.
- **shows_user_location**: Булево значення, яке вказує, чи повинна карта спробувати відобразити місцезнаходження користувача.

![Приклад карти динамічного змісту.](assets/ios/map.png)

# Поточне відео з камери

Мініатюра сповіщення буде нерухомим зображенням з камери. Вміст повідомлення - це потік MJPEG в реальному часі (якщо камера підтримує його).

Для керування мініатюр можна використовувати параметри вкладень `content-type` та `hide-thumbnail`.

Можна переглянути приклад [тут](https://www.youtube.com/watch?v=LmYwpxPKW0g).

Примітка: Ця функціональність доступна лише з iOS 11.

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

# Поєднуючи із дійсними сповіщеннями

Як ви можете бачити, клавіша `категорія` використовується, щоб повідомити пристрій про те, яке розширення вмісту слід використовувати. Ви можете використовувати ті ж ідентифікатори категорій у власних [діях](actionable.md), щоб додати дії до розширення вмісту.

Наприклад, ця конфігурація додає дії до повідомлення про вміст камери.

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

# Вирішення негараздів

Якщо у вас виникли проблеми з отриманням цих спеціальних сповіщень, спробуйте перезавантажити телефон. Часто розширення не вдається зареєструвати належним чином до перезапуску.