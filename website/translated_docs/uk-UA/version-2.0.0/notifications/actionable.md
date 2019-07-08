---
title: Дієві повідомлення
id: версія-2.0.0-дієвий
original_id: дієвий
---

Сповіщення можуть бути згруповані за категоріями, це дозволяє для різних типів сповіщень з Home Assistant розміщуватися у відповідних стеках на екрані блокування і навіть звичайний підсумковий текст, який буде використовуватися в стеку повідомлень. Категорії також дозволяють створювати дієві сповіщення, до яких можна підключити до чотирьох кнопок під розширеним сповіщенням iOS. Ці кнопки пов'язані з вибіром автоматизації, дозволяючи виконувати потужні завдання, без перебільшення, натисканням кнопки!

Деякі корисні приклади діючих сповіщень:

* Повідомлення надсилається, коли виявлено рух у вашому домі, коли ви перебуваєте далеко або спите. Кнопка дії "Звукова сигналізація" відображається поруч із сповіщенням про те, що при натисканні на неї пролунає ваша сигналізація.
* Хтось дзвонить у дверний дзвінок. Ви отримаєте сповіщення [live camera stream](dynamic-content.md) з зображенням звідвідувача, а також кнопку дії для блокування або розблокування передніх дверей.
* Отримаєте сповіщення, коли ваші двері гаража відкриваються за допомогою кнопок дій, щоб відкрити або закрити гараж.

![Сповіщення дозволяють користувачу відправити команду до Home Assistant.](assets/ios/actions.png)

## Огляд роботи ефективних сповіщень

Надсилання сповіщення заздалегідь:

1. Визначте категорію сповіщень у конфігурації Home Assistant, яка містить 1-4 дії.
2. При запуску програми iOS додаток запитує категорії повідомлень від Home Assistant (також можна вручну в налаштуваннях сповіщень).

При надсиланні сповіщення:

1. Надішліть сповіщення з набором `data.push.category` для попередньо визначеного ідентифікатора категорії сповіщення.
2. Швидке повідомлення, доставлене на пристрій.
3. Користувач відкриває сповіщення.
4. Дія натиснута.
5. Ідентифікатор дії, надісланий назад у Home Assistant як властивість `actionName` події `ios.notification_action_fired`, разом з іншими метаданими, такими як ім'я пристрою та категорії.

![Як пристрій iOS і Home Assistant працює разом, щоб дозволити активні сповіщення.](assets/NotificationActionFlow.png)

## Визначення

* **Category** - категорія являє собою тип сповіщення, яке може отримати програма. Думайте про неї як про унікальну групу дій.
* **Actions**. Дії складаються з назви кнопки та інформації, яку iOS потрібно передаті в додаток після вибору дії. Для окремих дій, які підтримує ваша програма, ви створюєте окремі об'єкти дії.

## Категорія параметри

| Ім’я             | Стандартний      | Опис                                                                                                          |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------------- |
| `назва:`         | **обов'язковий** | Дружнє ім'я для цієї категорії.                                                                               |
| `ідентифікатор:` | **обов'язковий** | Унікальний ідентифікатор категорії. Має бути в нижньому регістрі й не мати спеціальних символів або пробілів. |
| `дії:`           | **обов'язковий** | Перелік дій. Дивись нижче.                                                                                    |

## Параметри дій

| Ім’я                      | Стандартний      | Опис                                                                                                                                                                                                         |
| ------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ідентифікатор:`          | **обов'язковий** | Унікальний ідентифікатор для цієї дії. Має бути в верхньому регістрі та не мати спеціальних символів або пробілів. Тільки повиннен бути унікальним для категорії, не єдиним глобально.                       |
| `назва:`                  | **обов'язковий** | Текст для відображення на кнопці. Повинен бути коротким.                                                                                                                                                     |
| `activationMode:`         | optional         | Режим запуску додатку під час виконання дії. Якщо встановити цей параметр на `foreground`, програма буде відкрита після вибору. Значення за замовчуванням - `background`.                                    |
| `authenticationRequired:` | optional         | Якщо `true`, користувач повинен розблокувати пристрій перед виконанням дії.                                                                                                                                  |
| `destructive:`            | optional         | Коли `true`, відповідна кнопка відображається червоним кольором тексту, що вказує дія destructive.                                                                                                           |
| `behavior:`               | optional         | При `textInput` система надає користувачеві можливість ввести текстовий відповідь, який буде включено до сповіщення. Введений текст буде надіслано до Home Assistant. Значення за замовчуванням - `default`. |
| `textInputButtonTitle:`   | optional*        | The button label. *Обов'язково*, якщо `behavior` є `textInput`.                                                                                                                                              |
| `textInputPlaceholder:`   | optional         | Текст заповнювача, який буде показано у полі введення тексту. Використовується, лише якщо `behavior` є `textInput`                                                                                           |

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

Замість визначення категорій за допомогою YAML в `configuration.yaml`, їх можна створити безпосередньо в додатку Companion App. Це можна зробити на сторінці сповіщень в Меню Конфігурації додатку (доступ до нього з меню бічної панелі).

Доступні дві змінні для викорістання `Hidden preview placeholder` та `Category summary`. `%u`надасть загальну кількість сповіщень, надісланих під тим самим thread ID (див. [this document](basic.md#thread-id-grouping-notifications) для більш докладної інформації). `%@` will give the text specified with `summary:` in the `push:` section of the notification payload.

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