---
title: Дії
id: версія-2.0.0-дії
original_id: дії
---

Дії - це загальна система, яка дозволяє легко інтегрувати систему автоматизації Home Assistant в кілька областей iOS.

# Створення дій

Дії створюються з розділу Дії на сторінці конфігурації програми в додатку App. Кожна дія має шість обов'язкових полів:

* `Name`: назва дії, вона буде повернеться в [Home Assistant event](https://www.home-assistant.io/docs/configuration/events/) запущеною додатком.
* `Text`: текст пояснення, що відображається на телефоні, та годинник. Найкраще тримати це відносно коротким, оскільки на кожній кнопці дії є обмежений простір.
* `Text Color`: колір тексту, визначений вище
* `Background Color`: колір кнопки, створеної для дії.
* `Icon`: піктограму для відображення ліворуч від тексту на кнопці дії 
* `Icon Color`: колір піктограми на кнопці дії.

Для трьох кольорових полів колір вибирається шляхом натискання на колірне коло вибору у кожному полі.

# Вікористання дій

Після натискання кнопки дії на шину подій Home Assistant запущено подію `ios.action_fired`. Дані про події складаються з словника атрибутів, відформатованих у JSON.

| Атрибути     | Значення                                                                                                                                                                                                                          |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `контекст`   | Впідпрядкований словник, що стосується користувача, який ініціював подію та ідентифікатор події                                                                                                                                   |
| `дані`       | Впідпрядкований словник містить ключову інформацію про дію та її походження                                                                                                                                                       |
| `event_type` | Завжди `ios.action_fired`                                                                                                                                                                                                         |
| `походження` | Завжди `REMOTE`                                                                                                                                                                                                                   |
| `time_fired` | Дані та час, коли дія була запущена, відформатована як [ISO timestamp](https://en.wikipedia.org/wiki/ISO_8601) , напр. опівночі на Різдво в Лапландії ( Східноєвропейський час, UTC+2), має бути `2019-12-25T00:00.000000+02:00`. |

Атрибути, що містяться в `data`, це:

| Атрибути                  | Значення                                                                                                                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `actionID`                | Унікальний ідентифікатор дії.                                                                                                                                                                          |
| `actionName`              | Ім'я дії, вказане в полі `Name` під час створення дії.                                                                                                                                                 |
| `sourceDeviceID`          | Ідентифікатор пристрою, встановлений на сторінці "Конфігурація програми" додатка.                                                                                                                      |
| `sourceDeviceName`        | Ім'я iPhone або iPad, з якого було запущено дію. Це Ім'я пристрою, встановлене в iOS у розділі Параметри App> Загальні> Про програму.                                                                  |
| `sourceDevicePermanentID` | Унікальний ідентифікатор iPhone або iPad, через який дія була ініційована                                                                                                                              |
| `triggerSource`           | З якої частини iOS дію запущено. Або: `widget` для екрану "Сьогодні", `appShortcut` для швидких дій, доступ до яких здійснюється за допомогою 3D-touch, або `watch`, якщо він запущений з Apple Watch. |

Атрибути, що містяться в `context`, це:

| Атрибути    | Значення                                                                                                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`        | Унікальний одноразовий ідентифікатор події.                                                                                                                                     |
| `parent_id` | Завжди `null`.                                                                                                                                                                  |
| `user_id`   | Home Assistan[user ID](https://www.home-assistant.io/docs/authentication/#user-accounts), який використовувався для авторизації супутньої програми за допомогою Home Assistant. |

Actions can be used to trigger automations within Home Assistant. An example `configuration.yaml` entry might be:

```yaml
automation:
  - alias: "Action Turn Lights Off"
    initial_state: true
    trigger:
      - platform: event
        event_type: ios.action_fired
        event_data:
          actionName: 'Bed Time'
    action:
      service: light.turn_off
      entity_id: group.all_lights
```

Note that attributes located in the `data` and `context` are accessed through `event_data` and `event_context` respectively within the automation.

You can use the Events page within Home Assistant's developer tools to show all information contained with the event for a particular event by subscribing to `ios.action_fired` and triggering the action from you device.

# Home Screen Quick Actions

[Home Screen Quick Actions](https://support.apple.com/guide/iphone/keep-apps-handy-iph414564dba/ios#iph1ffcbd691) provides a convenient shortcut to your actions and is accessed by 3D Touching the Home Assistant companion app icon on your home screen.

# Today View Widget

The [Today View Widget](https://support.apple.com/en-gb/HT207122) is another route through which actions can be fired. To add the Home Assistant widget to your Today View:

1. Swipe right while on the Home screen or Lock screen.
2. Scroll to the very bottom and tap the Edit button.
3. Find the "Home Assistant - Actions" widget in the "More Widgets" list and then tap the green + button to add it.
4. Rearrange as you'd like and then tap Done.