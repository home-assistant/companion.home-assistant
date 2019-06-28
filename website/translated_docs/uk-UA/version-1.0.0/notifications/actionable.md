---
title: Дієві повідомлення
id: версія-1.0.0-дієвий
original_id: дієвий
---

Функціональні сповіщення дозволяють додавати до сповіщення 1-4 кнопки користувача. При виборі однієї з дій Home Assistant буде повідомлено, яка дія була обрана. Це дозволяє будувати складні автоматизації.

Приклади дійсних сповіщень:

* Повідомлення надсилається, коли виявляється рух у вашій оселі під час перебування або під час відпочінку. Ви можете додати дію до звукової сигналізації. Якщо натиснути, Home Assistant отримує сповіщення про те, що було вибрано дію `sound_alarm`. Ви можете додати автоматизацію, щоб пролунала охоронна сигналізація, коли сталася подія.
* Хтось дзвонить у дзвінок вхідних дверей. Ви можете надіслати дію для блокування або розблокування дверей. Після натискання, сповіщення відправляється до Home Assistant, в якому можна створювати автоматику.
* Надсилайте сповіщення, коли ваші двері гаража відчиняються з діями, щоб відчінити і зачинити гараж.

![Сповіщення дозволяють користувачу відправити команду до Home Assistant.](assets/ios/actions.png)

## Огляд роботи ефективних сповіщень

Надсилання сповіщення заздалегідь:

1. Визначте категорію сповіщень у конфігурації Home Assistant, яка містить 1-4 дії.
2. При запуску програми iOS додаток запитує категорії повідомлень від Home Assistant (також можна вручну в налаштуваннях сповіщень).

При надсиланні сповіщення:

1. Надішліть сповіщення з набором `data.push.category` для попередньо визначеного ідентифікатора категорії сповіщення.
2. Повідомлення Push доставлено на пристрій
3. Користувач відкриває сповіщення.
4. Дія натиснута
5. Ідентифікатор дії, надісланий назад у Home Assistant як властивість `actionName` події `ios.notification_action_fired`, разом з іншими метаданими, такими як ім'я пристрою та категорії.

![Як пристрій iOS і Home Assistant працює разом, щоб дозволити активні сповіщення.](assets/NotificationActionFlow.png)

## Визначення

* Category - A category represents a type of notification that the app might receive. Think of it as a unique group of actions.
* Actions - An action consists of a button title and the information that iOS needs to notify the app when the action is selected. You create separate action objects for distinct action your app supports.

## Category parameters

* **name** (*Required*): A friendly name for this category.
* **identifier** (*Required*): A unique identifier for the category. Must be lowercase and have no special characters or spaces.
* **actions** (*Required*): A list of actions.

## Actions parameters

* **identifier** (*Required*): A unique identifier for this action. Must be uppercase and have no special characters or spaces. Only needs to be unique to the category, not unique globally.
* **title** (*Required*): The text to display on the button. Keep it short.
* **activationMode** (*Optional*): The mode in which to run the app when the action is performed. Setting this to `foreground` will make the app open after selecting. Default value is `background`.
* **authenticationRequired** (*Optional*): If `true`, the user must unlock the device before the action is performed.
* **destructive** (*Optional*): When the value of this property is a truthy value, the system displays the corresponding button differently to indicate that the action is destructive (text color is red).
* **behavior** (*Optional*): When `textInput` the system provides a way for the user to enter a text response to be included with the notification. The entered text will be sent back to Home Assistant. Default value is `default`.
* **textInputButtonTitle** (*Optional*): The button label. *Required* if `behavior` is `textInput`.
* **textInputPlaceholder** (*Optional*): The placeholder text to show in the text input field. Only used if `behavior` is `textInput` and the device runs iOS 10.

Here's a fully built example configuration:

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

## Building automations for notification actions

Here is an example automation to send a notification with a category in the payload:

```yaml
automation:
  - alias: Notify iOS app
    trigger:
      ...
    action:
      service: notify.ios_robbies_iphone_7_plus
      data:
        message: "Something happened at home!"
        data:
          push:
            badge: 5
            sound: <SOUND FILE HERE>
            category: "alarm" # Needs to match the top level identifier you used in the ios configuration
          action_data: # Anything passed in action_data will get echoed back to Home Assistant.
            entity_id: light.test
            my_custom_data: foo_bar
```

When an action is selected an event named `ios.notification_action_fired` will be emitted on the Home Assistant event bus. Below is an example payload.

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

Here's an example automation for the given payload:

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

* `textInput` will only exist if `behavior` was set to `textInput`.
* `actionData` is a dictionary with parameters passed in the `action_data` dictionary of the `push` dictionary in the original notification.
* When adding or updating push categories be sure to update push settings within the Home Assistant iOS app. This can be found within the app at **Settings** (gear icon) > **Notification Settings**.

## Compatibility with different devices

* For devices that support "Force Touch" / "3D Touch" - a long press on the notification will cause the actions to appear. Devices such as iPhone 6S, iPhone 6S Plus, iPhone 7, iPhone 7 Plus, iPhone 8, iPhone 8 Plus, iPhone X, iPhone XS, iPhone XS Max as well as some iPad and Apple Watch models.

* For device that do not support this feature - a left to right swipe on the notification + tap on 'View' button, will cause the relevant actions to appear. Devices such as iPhone 6 and below, iPhone SE, iPhone XR as some iPad models.