---
title: Вступ
id: версія-1.0.0-базова
original_id: базовий
---

Платформа iOS notify приймає стандартні `title`, `message` and `target` параметри. Платформа iOS notify підтримує цілі як послуги. Припускаючи, що ви не встановили `name` під час налаштування платформи, ви повинні знайти всі ваші зареєстровані та включені до оповіщення пристрої iOS, доступні як цілі сповіщення, як служби з іменами, які мають префікс "notify.ios_", а потім назву пристрою ви ввели під час налаштування.

Примітки:

* `title` відображається лише в Apple Watch і пристроях з iOS 10 або вище.

* `target` можна використовувати для конкретного пристрою, використовуючи його PushID, знайдений у `ios.conf`. Переважним способом надання цільової мети є спеціальна служба оповіщення.

![A push notification showing all of the basic options <code>title</code> and <code>message</code> as well as <code>subtitle</code> and actions.](assets/ios/example.png)

### Підвищення основних сповіщень

#### Позначка

Ви можете встановити значок позначки в корисному навантаженні:

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

#### Субтитра

Починаючи з iOS 10, субтитра підтримується на додаток до назви:

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

#### Thread-id (групування сповіщень)

Починаючи з iOS 12, групування повідомлень підтримується. Усі сповіщення з однаковим thread-id будуть згруповані в центрі сповіщень. Безthread-id всі сповіщення з програми будуть розміщені в одній групі.

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

### Sending notifications to multiple phones

To send notifications to multiple phones, create a [notification group](https://www.home-assistant.io/components/notify.group/):

```yaml
notify:

  - name: NOTIFIER_NAME
    platform: group
    services:
      - service: ios_iphone_one
      - service: ios_iphone_two
```

Now, you can send notifications to everyone in the group using:

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