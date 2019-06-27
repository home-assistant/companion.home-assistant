---
title: Местоположение
id: version-2.0.0-location
original_id: местоположение
---

## Описание

Location updates are sent from your device to Home Assistant in a number of situations:

* When you enter or exit a [zone](https://www.home-assistant.io/components/zone/) defined in Home Assistant.
* When an iBeacon is detected or lost (see [below](#ibeacons)).
* When the app is opened and it was not already open in the background.
* Via an automated background fetch.
* When an update is requested via [special notification](notifications/location.md)
* When a [URL Handler](integrations/url-handler.md) link is opened.
* When the app is called via a [X-Callback-URL](integrations/x-callback-url.md).
* When your devices detects a [*significant location change*](#location-tracking-when-outside-a-home-assistant-zone).
* Manually when the app is refreshed (swipe down when at the top of a page) or from the shortcut menu opened from 3D touching the app icon.

You can check the cause of the most recent location update by checking the value of `sensor.last_update_trigger`

Depending on your set up, location data is sent directly from your phone to your Home Assistant instances or via the Home Assistant Cloud Service. This will depend on the URLs specified in the Connection section of the App Configuration menu. Location data is not sent via any other servers or organisations. Of course, if you decide not grant the Home Assistant Companion App location permission or if you subsequently remove the location permissions (via iOS Settings>Privacy>Location Services), no location data will be sent from your device to Home Assistant. **Check this is true for notification updates**

## Getting started

Once you have installed and opened the Home Assistant Companion App for the first time, a new `device_tracker` entity will be created. To check the entity ID your device has been assigned, open `known_devices.yaml` in your `config` directory and scroll to the bottom. The entry you are looking for will have 32-character UUID (universally unique identifier) as both the top-level ID and the `name`. You will probably wish to change the value of `name:` to something a little more relevant. Also, if you wish the device to be tracked by Home Assistant (which if you're reading this you presumably do) make sure the entry has `track: true` set. Once you have found the UUID you can use the device tracker as [described in the Home Assistant docs](https://www.home-assistant.io/components/device_tracker/). In a future version, the UUID will be replaced by a more user-friendly ID.

The following is a basic example to switch a light on when you enter your *home* zone after dark.

```yaml
automation:
  - alias: 'Turn door light on when getting home'
    trigger:
      platform: state
      entity_id: device_tracker.<UUID_here>
      to: 'home'
    condition:
      condition: sun
      after: sunset
    action:
      - service: light.turn_on
        data:
          entity_id: light.frontdoor
```

## Отслеживание местоположения за пределами зоны Home Assistant

The Home Assistant Companion App receives *significant location updates* from iOS. Когда обновление будет получено, оно отправляется к Home Assistant. Примерно, обновление приходит каждый раз, когда ваше устройствопереключается на новую сотовую башню, или прошло значительное количество времени (обычно пару часов) или изменение состояния соединения, и система замечает, что ваше местоположение недавно изменилось.

Apple [определяет](https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/LocationAwarenessPG/CoreLocation/CoreLocation.html#//apple_ref/doc/uid/TP40009497-CH2-SW9) значительные изменения местоположения как:

> Служба определения местоположения значительно изменяет данные, только когда произошла значительная перемена в местоположении устройства, например, 500 метров или более.

Также упоминается [Energy Efficiency Guide](https://developer.apple.com/library/content/documentation/Performance/Conceptual/EnergyGuide-iOS/LocationBestPractices.html#//apple_ref/doc/uid/TP40015243-CH24-SW4):

> Значительные изменения местоположения пробуждают систему и ваше приложение раз в 15 минут, даже если не произошло никаких изменений в местоположении.

Наконец, я думаю, что это ответ от [Переполнения стека](http://stackoverflow.com/a/13331625/486182) говорит об этом лучше:

> Значительное изменение местоположения является наименьшей точностью всех типов мониторинга местоположения. Он получает обновления только при переходе или изменении сотовой башни. Это может означать различный уровень точности и обновлений, основанный на том, где пользователь находится. В городском районе, больше обновлений с многими сотами. Вне города, меньшее количество сот и изменений.

Какова реальная история о обновлениях местоположения с существенными изменениями? Кто может знать, потому что Apple сохраняет его в тайне.

## Отслеживание местоположения в пределах зоны Home Assistant

При запуске, Home Assistant для iOS устанавливает геозаборы для всех зон в конфигурации Home Assistant. Вход и выход уведомления посылаются в Home Assistant.

### Настройки

Добавьте `track_ios: false` в настройки зоны, чтобы отключить отслеживание местоположения зоны для всех подключенных приложений iOS.

### iBeacons

The app has basic support for using iBeacons to trigger enter/exit updates. Чтобы настроить их, добавьте ваши данные iBeacon в зону таким образом:

```yaml
zone.home:
  beacon:
    uuid: B9407F30-F5F8-466E-AFF9-25556B57FE6D
    major: 60042
    minor: 43814
```

Restart Home Assistant and then the iOS app. It will then begin using iBeacons *instead of your location* for enter triggers around your zones. Чтобы добавить iBeacon в `zone.home` добавьте выше в соответствии с вашим `customize`.