---
title: Дієві повідомлення
id: version-2.0.0-actionable
original_id: дієвий
---

Notifications can be grouped by category, this allows for different types of notifications from Home Assistant be placed in a appropriate stacks on the lock screen and even custom summary text to be used on the notification stack. Categories also you to create actionable notifications to which you can attach up to four buttons underneath an expanded iOS notification. These buttons are associated with automations of your choice, allowing you to perform powerful tasks with literally the press of a button!

Some useful examples of actionable notifications:

* A notification is sent whenever motion is detected in your home while you're away or asleep. A "Sound Alarm" action button is displayed alongside the notification, that when tapped, will sound your burglar alarm.
* Someone rings your front doorbell. You receive a notification with a [live camera stream](dynamic-content.md) of the visitor outside along with action buttons to lock or unlock your front door.
* Receive a notification whenever your garage door opens with action buttons to open or close the garage.

![Сповіщення дозволяють користувачу відправити команду до Home Assistant.](assets/ios/actions.png)

## Огляд роботи ефективних сповіщень

Надсилання сповіщення заздалегідь:

1. Визначте категорію сповіщень у конфігурації Home Assistant, яка містить 1-4 дії.
2. При запуску програми iOS додаток запитує категорії повідомлень від Home Assistant (також можна вручну в налаштуваннях сповіщень).

При надсиланні сповіщення:

1. Надішліть сповіщення з набором `data.push.category` для попередньо визначеного ідентифікатора категорії сповіщення.
2. Push notification delivered to device.
3. Користувач відкриває сповіщення.
4. Action tapped.
5. Ідентифікатор дії, надісланий назад у Home Assistant як властивість `actionName` події `ios.notification_action_fired`, разом з іншими метаданими, такими як ім'я пристрою та категорії.

![Як пристрій iOS і Home Assistant працює разом, щоб дозволити активні сповіщення.](assets/NotificationActionFlow.png)

## Визначення

* **Category** - A category represents a type of notification that the app might receive. Думайте про неї як про унікальну групу дій.
* **Actions** - An action consists of a button title and the information that iOS needs to notify the app when the action is selected. Для окремих дій, які підтримує ваша програма, ви створюєте окремі об'єкти дії.

## Категорія параметри

| Name          | Default      | Description                                                                                                     |
| ------------- | ------------ | --------------------------------------------------------------------------------------------------------------- |
| `name:`       | **required** | A friendly name for this category.                                                                              |
| `identifier:` | **required** | A unique identifier for the category. Має бути в нижньому регістрі й не мати спеціальних символів або пробілів. |
| `actions:`    | **required** | A list of actions. See below.                                                                                   |

## Параметри дій

| Name                      | Default      | Description                                                                                                                                                                                                    |
| ------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `identifier:`             | **required** | A unique identifier for this action. Має бути в верхньому регістрі та не мати спеціальних символів або пробілів. Тільки повиннен бути унікальним для категорії, не єдиним глобально.                           |
| `title:`                  | **required** | The text to display on the button. Повинен бути коротким.                                                                                                                                                      |
| `activationMode:`         | optional     | The mode in which to run the app when the action is performed. Якщо встановити цей параметр на `foreground`, програма буде відкрита після вибору. Значення за замовчуванням - `background`.                    |
| `authenticationRequired:` | optional     | If `true`, the user must unlock the device before the action is performed.                                                                                                                                     |
| `destructive:`            | optional     | When `true`, the corresponding button is displayed with a red text color to indicate the action is destructive.                                                                                                |
| `behavior:`               | optional     | When `textInput` the system provides a way for the user to enter a text response to be included with the notification. Введений текст буде надіслано до Home Assistant. Значення за замовчуванням - `default`. |
| `textInputButtonTitle:`   | optional*    | The button label. *Обов'язково*, якщо `behavior` є `textInput`.                                                                                                                                                |
| `textInputPlaceholder:`   | optional     | The placeholder text to show in the text input field. Only used if `behavior` is `textInput`                                                                                                                   |

Ось приклад повної побудованої конфігурації:

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

## Побудова автоматизації для дієвіх сповіщень

Ось приклад автоматизації для надсилання повідомлення з категорією в корисному навантаженні:

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

При виборі дії на шину подій Home Assistant буде випускатися подія з ім'ям `ios.notification predm_fired`. Нижче наведено приклад корисного навантаження.

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

Ось приклад автоматизації для даного корисного навантаження:

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

Примітки:

* `textInput` буде існувати лише тоді, коли для `behavior` встановлено значення `textInput`.
* `actionData` - це словник з параметрами, переданими в словнику `action_data` словника `push` у вихідному сповіщенні.
* When adding or updating push categories in `configuration.yaml` be sure to update push settings within the Home Assistant iOS app. This can be found within the Notifications page of the App Configuration menu (accessed from the sidebar menu). You may have to exit the Notifications page and reopen it before new categories are shown. If they are still not listed, restart the Home Assistant Companion App.

## Сумісність з різними пристроями

* For devices that support "Force Touch" / "3D Touch" (most Apple devices from the last 4-5 years) - a firm press on the notification will expand it, showing the action buttons underneath. Supported devices include the iPhone 6S, iPhone 6S Plus, iPhone 7, iPhone 7 Plus, iPhone 8, iPhone 8 Plus, iPhone X, iPhone XS, iPhone XS Max as well as some iPad and Apple Watch models.

* For devices that do not support "Force Touch" (such as the iPhone 6 and below, iPhone SE, iPhone XR and some iPad models), you instead perform a left to right swipe on the notification, then tap on the 'View' button. This will expand the notification and show the relevant action buttons underneath.