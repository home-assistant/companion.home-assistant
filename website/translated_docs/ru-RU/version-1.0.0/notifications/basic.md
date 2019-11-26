---
title: Введение
id: версия 1.0.0-базовая
original_id: базовый
---

Платформа уведомления iOS принимает стандартную `заголовок`, `сообщение` и `цель` параметры. iOS уведомляет платформу, поддерживающую цели как услуги. Если вы не установили `имя` при настройке платформы, то вы должны найти все зарегистрированные и включенные уведомления устройства iOS, доступные как уведомляющие цели как службы с названиями, которые предустановленные "notify.ios_", а затем имя устройства, которое вы ввели при установке.

Примечания:

* `заголовок` отображается только на Apple Watch и устройствах с iOS 10 или выше.

* `цель` может быть использована для конкретного устройства с помощью PushID, найденного в `ios.conf`. Предпочтительный способ обеспечения цели - это через использование целевого сервиса уведомления.

![push-уведомление, показывающее все основные параметры <code>заголовка</code> и <code>сообщения</code> а также <code>подзаголовка</code> и действия.](assets/ios/example.png)

### Расширение основных уведомлений

#### Значок

Вы можете установить значок иконки в загрузочном файле:

```yaml
automation:
  - alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.ios_<your_device_id_here>
      data:
        title: "Smart Home Alerts"
        message: "Something happened at home!"
        data:
          push:
            badge: 5
```

#### Подзаголовок

Начиная с iOS 10, подзаголовок поддерживается в дополнение к заголовку:

```yaml
automation
  - alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.ios_<your_device_id_here>
      data:
        title: "Smart Home Alerts"
        message: "Something happened at home!"
        data:
          subtitle: "Subtitle goes here"
```

#### Идентификатор потока (групповое уведомление)

Начиная с iOS 12, поддерживается группировка уведомлений. Все уведомления с таким же идентификатором потока будут сгруппированы вместе в центре уведомлений. Без идентификатора потока все уведомления из приложения будут помещены в одну группу.

```yaml
automation:
  - alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.ios_<your_device_id_here>
      data:
        title: "Smart Home Alerts"
        message: "Something happened at home!"
        data:
          push:
            thread-id: "example-notification-group"
```

### Отправка уведомлений на несколько телефонов

Чтобы отправить уведомления на несколько телефонов, создайте группу уведомлений [](https://www.home-assistant.io/components/notify.group/):

```yaml
notify:

  - name: NOTIFIER_NAME
    platform: group
    services:
      - service: ios_iphone_one
      - service: ios_iphone_two
```

Теперь вы можете отправлять уведомления всем в группе, используя:

```yaml
  automation:
    - alias: Notify iOS app
      trigger:
        ...
      action:
        service: notify.NOTIFIER_NAME
        data:
          message: "Something happened at home!"
          data:
            push:
              badge: 5
```