---
title: Звуки
id: версия-1.0.0-звуки
original_id: звуки
---

Добавление пользовательского звука в уведомление позволяет легко идентифицировать уведомление, не глядя даже на ваше устройство. Home Assistant для iOS поставляется с некоторыми звуковыми оповещениями, которые были установлены, но вы также можете загрузить свои собственные.

Вот пример уведомления, которое использует один из предустановленных звуков.

```yaml
- alias: Notify iOS app
  trigger:
    ...
  action:
    service: notify.ios_<your_device_id_here>
    data:
      message: “Something happened at home!”
      data:
        push:
          sound: "US-EN-Morgan-Freeman-Roommate-Is-Arriving.wav"
```

Примечания:

* Вы должны использовать полное имя файла в payload (включая расширение).

## Пользовательские звуки push-уведомлений

Приложение позволяет использовать собственные пользовательские звуки в push-уведомлениях. Звуки должны быть отформатированы как 32битные float 48000Hz wav файлы. Вы установливаете имя файла звука в загрузочном файле уведомления. Чтобы добавить звуки:

1. Подключите устройство к компьютеру или Mac, запустив последнюю версию iTunes.
2. Перейти к устройству в iTunes.
3. Выберите "Поделиться файлами" в левом меню.
4. Выберите Home Assistant.
5. Перетащите правильно форматированные звуки (32 бита с потоками 48000Гц).
6. Нажмите Синхронизировать в правой части.
7. После завершения синхронизации отключите устройство от компьютера.
8. На вашем устройстве iOS откройте приложение Home Assistant.
9. Перейти в Настройки -> Настройки уведомлений.
10. Выберите "импортировать звуки из iTunes".

Предположим, что вы правильно отформатировали звуки, которые они теперь будут доступны для использования в push-уведомлениях.

Примечания:

* **Обратите внимание, что из-за ошибки в iOS 10, возможно, вам нужно перезапустить все устройство, прежде чем звуки уведомлений могут быть воспроизведены. Это должно быть исправлено Apple в ближайшее время.**
* Загрузка файла с таким же именем, как и существующий, перезапишет оригинал.
* Вы можете посмотреть, какие звуки установлены на каждом устройстве, проверяя файл `ios.conf` в вашем каталоге конфигурации. Они перечислены в массиве `push Sounds`.

### Предустановленные звуки уведомлений

    US-EN-Alexa-Back-Door-Opened.wav
    US-EN-Alexa-Back-Door-Unlocked.wav
    US-EN-Alexa-Basement-Door-Opened.wav
    US-EN-Alexa-Basement-Door-Unlocked.wav
    US-EN-Alexa-Boyfriend-Is-Arriving.wav
    US-EN-Alexa-Daughter-Is-Arriving.wav
    US-EN-Alexa-Front-Door-Opened.wav
    US-EN-Alexa-Front-Door-Unlocked.wav
    US-EN-Alexa-Garage-Door-Opened.wav
    US-EN-Alexa-Girlfriend-Is-Arriving.wav
    US-EN-Alexa-Good-Morning.wav
    US-EN-Alexa-Good-Night.wav
    US-EN-Alexa-Husband-Is-Arriving.wav
    US-EN-Alexa-Mail-Has-Arrived.wav
    US-EN-Alexa-Motion-At-Back-Door.wav
    US-EN-Alexa-Motion-At-Front-Door.wav
    US-EN-Alexa-Motion-Detected-Generic.wav
    US-EN-Alexa-Motion-In-Back-Yard.wav
    US-EN-Alexa-Motion-In-Basement.wav
    US-EN-Alexa-Motion-In-Front-Yard.wav
    US-EN-Alexa-Motion-In-Garage.wav
    US-EN-Alexa-Patio-Door-Opened.wav
    US-EN-Alexa-Patio-Door-Unlocked.wav
    US-EN-Alexa-Smoke-Detected-Generic.wav
    US-EN-Alexa-Smoke-Detected-In-Basement.wav
    US-EN-Alexa-Smoke-Detected-In-Garage.wav
    US-EN-Alexa-Smoke-Detected-In-Kitchen.wav
    US-EN-Alexa-Son-Is-Arriving.wav
    US-EN-Alexa-Water-Detected-Generic.wav
    US-EN-Alexa-Water-Detected-In-Basement.wav
    US-EN-Alexa-Water-Detected-In-Garage.wav
    US-EN-Alexa-Water-Detected-In-Kitchen.wav
    US-EN-Alexa-Welcome-Home.wav
    US-EN-Alexa-Wife-Is-Arriving.wav
    US-EN-Daisy-Back-Door-Motion.wav
    US-EN-Daisy-Back-Door-Open.wav
    US-EN-Daisy-Front-Door-Motion.wav
    US-EN-Daisy-Front-Door-Open.wav
    US-EN-Daisy-Front-Window-Open.wav
    US-EN-Daisy-Garage-Door-Open.wav
    US-EN-Daisy-Guest-Bath-Leak.wav
    US-EN-Daisy-Kitchen-Sink-Leak.wav
    US-EN-Daisy-Kitchen-Window-Open.wav
    US-EN-Daisy-Laundry-Room-Leak.wav
    US-EN-Daisy-Master-Bath-Leak.wav
    US-EN-Daisy-Master-Bedroom-Window-Open.wav
    US-EN-Daisy-Office-Window-Open.wav
    US-EN-Daisy-Refrigerator-Leak.wav
    US-EN-Daisy-Water-Heater-Leak.wav
    US-EN-Morgan-Freeman-Back-Door-Closed.wav
    US-EN-Morgan-Freeman-Back-Door-Locked.wav
    US-EN-Morgan-Freeman-Back-Door-Opened.wav
    US-EN-Morgan-Freeman-Back-Door-Unlocked.wav
    US-EN-Morgan-Freeman-Basement-Door-Closed.wav
    US-EN-Morgan-Freeman-Basement-Door-Locked.wav
    US-EN-Morgan-Freeman-Basement-Door-Opened.wav
    US-EN-Morgan-Freeman-Basement-Door-Unlocked.wav
    US-EN-Morgan-Freeman-Boss-Is-Arriving.wav
    US-EN-Morgan-Freeman-Boyfriend-Is-Arriving.wav
    US-EN-Morgan-Freeman-Cleaning-Supplies-Closet-Opened.wav
    US-EN-Morgan-Freeman-Coworker-Is-Arriving.wav
    US-EN-Morgan-Freeman-Daughter-Is-Arriving.wav
    US-EN-Morgan-Freeman-Friend-Is-Arriving.wav
    US-EN-Morgan-Freeman-Front-Door-Closed.wav
    US-EN-Morgan-Freeman-Front-Door-Locked.wav
    US-EN-Morgan-Freeman-Front-Door-Opened.wav
    US-EN-Morgan-Freeman-Front-Door-Unlocked.wav
    US-EN-Morgan-Freeman-Garage-Door-Closed.wav
    US-EN-Morgan-Freeman-Garage-Door-Opened.wav
    US-EN-Morgan-Freeman-Girlfriend-Is-Arriving.wav
    US-EN-Morgan-Freeman-Good-Morning.wav
    US-EN-Morgan-Freeman-Good-Night.wav
    US-EN-Morgan-Freeman-Liquor-Cabinet-Opened.wav
    US-EN-Morgan-Freeman-Motion-Detected.wav
    US-EN-Morgan-Freeman-Motion-In-Basement.wav
    US-EN-Morgan-Freeman-Motion-In-Bedroom.wav
    US-EN-Morgan-Freeman-Motion-In-Game-Room.wav
    US-EN-Morgan-Freeman-Motion-In-Garage.wav
    US-EN-Morgan-Freeman-Motion-In-Kitchen.wav
    US-EN-Morgan-Freeman-Motion-In-Living-Room.wav
    US-EN-Morgan-Freeman-Motion-In-Theater.wav
    US-EN-Morgan-Freeman-Motion-In-Wine-Cellar.wav
    US-EN-Morgan-Freeman-Patio-Door-Closed.wav
    US-EN-Morgan-Freeman-Patio-Door-Locked.wav
    US-EN-Morgan-Freeman-Patio-Door-Opened.wav
    US-EN-Morgan-Freeman-Patio-Door-Unlocked.wav
    US-EN-Morgan-Freeman-Roommate-Is-Arriving.wav
    US-EN-Morgan-Freeman-Searching-For-Car-Keys.wav
    US-EN-Morgan-Freeman-Setting-The-Mood.wav
    US-EN-Morgan-Freeman-Smartthings-Detected-A-Flood.wav
    US-EN-Morgan-Freeman-Smartthings-Detected-Carbon-Monoxide.wav
    US-EN-Morgan-Freeman-Smartthings-Detected-Smoke.wav
    US-EN-Morgan-Freeman-Smoke-Detected-In-Basement.wav
    US-EN-Morgan-Freeman-Smoke-Detected-In-Garage.wav
    US-EN-Morgan-Freeman-Smoke-Detected-In-Kitchen.wav
    US-EN-Morgan-Freeman-Someone-Is-Arriving.wav
    US-EN-Morgan-Freeman-Son-Is-Arriving.wav
    US-EN-Morgan-Freeman-Starting-Movie-Mode.wav
    US-EN-Morgan-Freeman-Starting-Party-Mode.wav
    US-EN-Morgan-Freeman-Starting-Romance-Mode.wav
    US-EN-Morgan-Freeman-Turning-Off-All-The-Lights.wav
    US-EN-Morgan-Freeman-Turning-Off-The-Air-Conditioner.wav
    US-EN-Morgan-Freeman-Turning-Off-The-Bar-Lights.wav
    US-EN-Morgan-Freeman-Turning-Off-The-Chandelier.wav
    US-EN-Morgan-Freeman-Turning-Off-The-Family-Room-Lights.wav
    US-EN-Morgan-Freeman-Turning-Off-The-Hallway-Lights.wav
    US-EN-Morgan-Freeman-Turning-Off-The-Kitchen-Light.wav
    US-EN-Morgan-Freeman-Turning-Off-The-Light.wav
    US-EN-Morgan-Freeman-Turning-Off-The-Lights.wav
    US-EN-Morgan-Freeman-Turning-Off-The-Mood-Lights.wav
    US-EN-Morgan-Freeman-Turning-Off-The-TV.wav
    US-EN-Morgan-Freeman-Turning-On-The-Air-Conditioner.wav
    US-EN-Morgan-Freeman-Turning-On-The-Bar-Lights.wav
    US-EN-Morgan-Freeman-Turning-On-The-Chandelier.wav
    US-EN-Morgan-Freeman-Turning-On-The-Family-Room-Lights.wav
    US-EN-Morgan-Freeman-Turning-On-The-Hallway-Lights.wav
    US-EN-Morgan-Freeman-Turning-On-The-Kitchen-Light.wav
    US-EN-Morgan-Freeman-Turning-On-The-Light.wav
    US-EN-Morgan-Freeman-Turning-On-The-Lights.wav
    US-EN-Morgan-Freeman-Turning-On-The-Mood-Lights.wav
    US-EN-Morgan-Freeman-Turning-On-The-TV.wav
    US-EN-Morgan-Freeman-Vacate-The-Premises.wav
    US-EN-Morgan-Freeman-Water-Detected-In-Basement.wav
    US-EN-Morgan-Freeman-Water-Detected-In-Garage.wav
    US-EN-Morgan-Freeman-Water-Detected-In-Kitchen.wav
    US-EN-Morgan-Freeman-Welcome-Home.wav
    US-EN-Morgan-Freeman-Wife-Is-Arriving.wav