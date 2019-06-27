---
title: Действительные уведомления
id: version-2.0.0-actionable
original_id: активный
---

Notifications can be grouped by category, this allows for different types of notifications from Home Assistant be placed in a appropriate stacks on the lock screen and even custom summary text to be used on the notification stack. Categories also you to create actionable notifications to which you can attach up to four buttons underneath an expanded iOS notification. These buttons are associated with automations of your choice, allowing you to perform powerful tasks with literally the press of a button!

Some useful examples of actionable notifications:

* A notification is sent whenever motion is detected in your home while you're away or asleep. A "Sound Alarm" action button is displayed alongside the notification, that when tapped, will sound your burglar alarm.
* Someone rings your front doorbell. You receive a notification with a [live camera stream](dynamic-content.md) of the visitor outside along with action buttons to lock or unlock your front door.
* Receive a notification whenever your garage door opens with action buttons to open or close the garage.

![Действительные уведомления позволяют пользователю отправлять команду обратно в Home Assistant.](assets/ios/actions.png)

## Обзор того, как работают активные уведомления

До отправки уведомления:

1. Определите категорию уведомлений в конфигурации Home Assistant, которая содержит 1-4 действия.
2. При запуске iOS приложение запрашивает категории уведомлений от Home Assistant (также можно сделать вручную в настройках уведомлений).

При отправке уведомления:

1. Отправить уведомление с `data.push.category` установленное для заранее определенного идентификатора категории уведомлений.
2. Push notification delivered to device.
3. Пользователь открывает уведомление.
4. Action tapped.
5. Идентификатор действия, отправленного назад в HA как `actionName` свойство события `ios.notification_action_fired`, наряду с другими метаданными, такими как устройство и название категории.

![Как iOS устройство и Home Assistant работают вместе, чтобы включить активные уведомления.](assets/NotificationActionFlow.png)

## Описание

* **Category** - A category represents a type of notification that the app might receive. Считайте это как уникальную группу действий.
* **Actions** - An action consists of a button title and the information that iOS needs to notify the app when the action is selected. Вы создаете отдельные объекты действий для выполнения определенных действий, которые поддерживает ваше приложение.

## Параметры категории

| Name          | Default      | Description                                                                                                             |
| ------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `name:`       | **required** | A friendly name for this category.                                                                                      |
| `identifier:` | **required** | A unique identifier for the category. Должно быть в нижнем регистре и не должно быть специальных символов или пробелов. |
| `actions:`    | **required** | A list of actions. See below.                                                                                           |

## Параметры действий

| Name                      | Default      | Description                                                                                                                                                                                                       |
| ------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `identifier:`             | **required** | A unique identifier for this action. Должно быть в верхнем регистре и не должно быть специальных символов или пробелов. Только должно быть уникальным для категории, а не уникальным глобально.                   |
| `title:`                  | **required** | The text to display on the button. Оставьте его коротким.                                                                                                                                                         |
| `activationMode:`         | optional     | The mode in which to run the app when the action is performed. Установки `foreground` сделают приложение открытым после выбора. Значение по умолчанию: `background`.                                              |
| `authenticationRequired:` | optional     | If `true`, the user must unlock the device before the action is performed.                                                                                                                                        |
| `destructive:`            | optional     | When `true`, the corresponding button is displayed with a red text color to indicate the action is destructive.                                                                                                   |
| `behavior:`               | optional     | When `textInput` the system provides a way for the user to enter a text response to be included with the notification. Введенный текст будет отправлен обратно к Home Assistant. Значение по умолчанию `default`. |
| `textInputButtonTitle:`   | optional*    | The button label. *Обязательно*, если поведение ``` <code>textInput`.                                                                                                                                          |
| `textInputPlaceholder:`   | optional     | The placeholder text to show in the text input field. Only used if `behavior` is `textInput`                                                                                                                      |

Вот полностью встроенная конфигурация примера:

```yaml
ios:
  push:
    categories:
      - name: Alarm
        identifier: 'alarm'
        actions:
          - identifier: 'SOUND_ALARM'
            title: 'Sound Alarm'
            activationMode: 'background'
            authenticationRequired: true
            destructive: true
            behavior: 'default'
          - identifier: 'SILENCE_ALARM'
            title: 'Silence Alarm'
            activationMode: 'background'
            authenticationRequired: true
            destructive: false
            behavior: 'textInput'
            textInputButtonTitle: 'Silencio!'
            textInputPlaceholder: 'Placeholder'
```

Rather than defining categories using YAML within `configuration.yaml`, you can create them directly within the Companion App. This can be done from the Notifications page of the App Configuration Menu (accessed from the sidebar menu).

Two variables are available for use in the `Hidden preview placeholder` and `Category summary`. `%u` will give the total number of notifications which have been sent under the same thread ID (see [this document](basic.md#thread-id-grouping-notifications) for more details). `%@` will give the text specified with `summary:` in the `push:` section of the notification payload.

## Создание автоматизации для уведомлений

Пример автоматизации для отправки уведомления с категорией в загрузочном файле:

```yaml
automation:
  - alias: Notify Mobile app
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: "Something happened at home!"
        data:
          push:
            category: "alarm" # Needs to match the top level identifier you used in the ios configuration
          action_data: # Anything passed in action_data will get echoed back to Home Assistant.
            entity_id: light.test
            my_custom_data: foo_bar
```

Когда действие выбрано в событии `ios.notification_action_fired` будет передано в Home Assistant event bus. Ниже приведен пример payload.

```json
{
  "sourceDeviceName": "Robbie's iPhone 7 Plus",
  "sourceDeviceID": "robbies_iphone_7_plus",
  "actionName": "SOUND_ALARM",
  "sourceDevicePushId": "ab9f02fe-6ac6-47b8-adeb-5dd87b489156",
  "textInput": "",
  "actionData": {}
}
```

Пример автоматизации для данной payload:

```yaml
automation:

  - alias: Sound the alarm
    trigger:
      platform: event
      event_type: ios.notification_action_fired
      event_data:
        actionName: SOUND_ALARM
    action:
      ...
```

Примечания:

* `textInput` будет существовать только в том случае, если `behavior` установлено на `textInput`.
* `actionData` это словарь с параметрами, переданными в `action_data` `push` словарь в оригинальном уведомлении.
* When adding or updating push categories in `configuration.yaml` be sure to update push settings within the Home Assistant iOS app. This can be found within the Notifications page of the App Configuration menu (accessed from the sidebar menu). You may have to exit the Notifications page and reopen it before new categories are shown. If they are still not listed, restart the Home Assistant Companion App.

## Совместимость с различными устройствами

* For devices that support "Force Touch" / "3D Touch" (most Apple devices from the last 4-5 years) - a firm press on the notification will expand it, showing the action buttons underneath. Supported devices include the iPhone 6S, iPhone 6S Plus, iPhone 7, iPhone 7 Plus, iPhone 8, iPhone 8 Plus, iPhone X, iPhone XS, iPhone XS Max as well as some iPad and Apple Watch models.

* For devices that do not support "Force Touch" (such as the iPhone 6 and below, iPhone SE, iPhone XR and some iPad models), you instead perform a left to right swipe on the notification, then tap on the 'View' button. This will expand the notification and show the relevant action buttons underneath.