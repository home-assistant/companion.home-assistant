---
title: Действительные уведомления
id: version-1.0.0-actionable
original_id: actionable
---

Действительные уведомления позволяют вам прикреплять от 1-4 пользовательских кнопок к уведомлению. Когда одно из действий выбрано Home Assistant будет уведомлен о том, какие действия были выбраны. Это позволяет строить комплексные автоматизации.

Примеры активных уведомлений:

* Уведомление отправляется при обнаружении движения в вашем доме, пока вы не уходите или засыпаете. Вы можете добавить действие в звуковой будильник. При нажатии Home Assistant уведомляется, что действие `sound_alarm` было выбрано. Вы можете добавить автоматизацию для тревожного сигнала, когда это событие будет показано.
* Кто-то звонит в дверь. Вы можете отправить действие для открытия или закрытия дверей. При нажатии уведомление отправляется к Home Assistant, в которым можно добавить автоматизацию.
* Отправьте уведомление, когда открывается гараж, чтобы открыть или закрыть гараж.

![Действительные уведомления позволяют пользователю отправлять команду обратно в Home Assistant.](assets/ios/actions.png)

## Обзор того, как работают активные уведомления

До отправки уведомления:

1. Определите категорию уведомлений в конфигурации Home Assistant, которая содержит 1-4 действия.
2. При запуске iOS приложение запрашивает категории уведомлений от Home Assistant (также можно сделать вручную в настройках уведомлений).

При отправке уведомления:

1. Отправить уведомление с `data.push.category` установленное для заранее определенного идентификатора категории уведомлений.
2. Push-уведомление доставлено на устройство
3. Пользователь открывает уведомление.
4. Нажатие действия
5. Идентификатор действия, отправленного назад в HA как `actionName` свойство события `ios.notification_action_fired`, наряду с другими метаданными, такими как устройство и название категории.

![Как iOS устройство и Home Assistant работают вместе, чтобы включить активные уведомления.](assets/NotificationActionFlow.png)

## Описание

* Категория - Категория представляет тип уведомления, которое может получить приложение. Считайте это как уникальную группу действий.
* Действия - Действия состоят из заголовка кнопки и информации, которую iOS должна передать приложению, когда выбрано действие. Вы создаете отдельные объекты действий для выполнения определенных действий, которые поддерживает ваше приложение.

## Параметры категории

* **name** (*Required*): удобочитаемое имя для этой категории.
* **identifier** (*Required*): Уникальный идентификатор для категории. Должно быть в нижнем регистре и не должно быть специальных символов или пробелов.
* **actions** (*Required*): Список действий.

## Параметры действий

* **identifier** (*Required*): Уникальный идентификатор для этого действия. Должно быть в верхнем регистре и не должно быть специальных символов или пробелов. Только должно быть уникальным для категории, а не уникальным глобально.
* **title** (*Required*): Текст для отображения на кнопке. Оставьте его коротким.
* **activationMode** (*Optional*): Режим, в котором запускать приложение, когда действие выполняется. Установки `foreground` сделают приложение открытым после выбора. Значение по умолчанию: `background`.
* **authenticationRequired** (*Optional*): Если `true`, пользователь должен разблокировать устройство перед выполнением действия.
* **destructive** (*Optional*): Когда значение этого свойства является правдивое значением, система отображает соответствующую кнопку по-разному, чтобы указать, что действие destructive (цвет текста красный).
* **behavior** (*Optional*): Когда `textInput` система обеспечивает пользователю способ ввести текстовый ответ, который будет включен в уведомление. Введенный текст будет отправлен обратно к Home Assistant. Значение по умолчанию `default`.
* **textInputButtonTitle** (*Optional*): Название кнопки. *Обязательно*, если поведение ``` <code>textInput`.
* **textInputPlaceholder** (*Optional*): Текст плейсхолдера для отображения в текстовом поле ввода. Используется только если `behavior` является `textInput` и устройство работает на iOS 10.

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

## Создание автоматизации для уведомлений

Пример автоматизации для отправки уведомления с категорией в загрузочном файле:

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

Notes:

* `textInput` будет существовать только в том случае, если `behavior` установлено на `textInput`.
* `actionData` это словарь с параметрами, переданными в `action_data` `push` словарь в оригинальном уведомлении.
* При добавлении или обновлении push категорий убедитесь, что обновление настроек push в приложении Home Assistant iOS. Это можно найти в приложении в настройках **Настройки** (gear icon) > **Настройка уведомлений**.

## Совместимость с различными устройствами

* Для устройств, поддерживающих "Force Touch" / "3D Touch" - долгое нажатие на уведомление вызовет действия, которые появились. Такие устройства, как iPhone 6S, iPhone 6S Plus, iPhone 7, iPhone 7 Plus, iPhone 8, iPhone 8 Plus, iPhone X, iPhone XS, iPhone XS Max, а также некоторые модели iPad и Apple Watch.

* Для устройства, не поддерживающего эту функцию - влево направо, свайп на уведомлении + нажмите кнопку 'Просмотр', вызовет соответствующие действия. Такие устройства, как iPhone 6 и ниже, iPhone SE, iPhone XR как некоторые модели iPad.