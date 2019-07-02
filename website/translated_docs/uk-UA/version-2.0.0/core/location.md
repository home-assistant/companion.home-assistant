---
title: Місцерозташування
id: version-2.0.0-location
original_id: місцерозташування
---

## Огляд

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

Once you have installed and opened the Home Assistant Companion App for the first time, a new `device_tracker.` entity will be created. By default the entity will have a name of the form `device_tracker.<device_ID>` where `<device_ID>` is the name you have device name you have set in iOS (see: Settings>General>About). You can check the entity name within Home Assistant by visiting the Integration section of the Configuration page from the sidebar (swipe right if you're using the Companion App) then clicking or tapping on the Mobile App integration for your device and scrolling through the list of entities. You can edit the entity's `name` attribute as you desire if needed.

The following is a basic example to switch a light on when you enter your *home* zone after dark.

```yaml
automation:
  - alias: 'Turn door light on when getting home'
    trigger:
      platform: state
      entity_id: device_tracker.<device_ID>
      to: 'home'
    condition:
      condition: sun
      after: sunset
    action:
      - service: light.turn_on
        data:
          entity_id: light.frontdoor
```

## Відстеження місця розташування за межами зони Home Assistant

The Home Assistant Companion App receives *significant location updates* from iOS. При отриманні оновлення він надсилається до Home Assistant. Приблизно оновлюється щоразу, коли ваш пристрій переходить на нову стільникову вежу, пройшов значний час (як правило, кілька годин) або змінюється стан з'єднання, і система помічає, що ваше місце розташування нещодавно змінилося.

Apple опріділює [defines](https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/LocationAwarenessPG/CoreLocation/CoreLocation.html#//apple_ref/doc/uid/TP40009497-CH2-SW9) значні оновлення місцезнаходження значних змін як:

> Служба визначення місцезнаходження із значними змінами надає оновлення лише тоді, коли відбулося значна зміна розташування пристрою, наприклад 500 метрів або більше.

Вони також говорять у [Energy Efficiency Guide](https://developer.apple.com/library/content/documentation/Performance/Conceptual/EnergyGuide-iOS/LocationBestPractices.html#//apple_ref/doc/uid/TP40015243-CH24-SW4):

> Оновлення місцеположень із значними змінами розбуджують систему та вашу програму раз на 15 хвилин, принаймні, навіть якщо не відбулися зміни місцезнаходження.

Нарешті, я думаю, що ця відповідь на [переповнення стеків](http://stackoverflow.com/a/13331625/486182) говорить найкраще:

> Значне зміна розташування є найменш точним з усіх типів моніторингу місцезнаходження. Він оновлюється лише тоді, коли відбувається перехід або зміна стільникової вежі. Це може означати різний рівень точності та оновлення в залежності від того, де знаходиться користувач. Міська зона, більше оновлень з великою кількістю веж. За межами міста, міждержавних, менше веж і змін.

У чому реальна історія щодо значних змін оновлення місцезнаходження? Хто знає, тому що Apple зберігає її приватною.

## Відстеження місцезнаходження в зонах Home Assistant

При запуску Home Assistant для iOS встановлює геозони для всіх зон у вашій конфігурації Home Assistant. Повідомлення про вхід і вихід надсилаються до головного помічника.

### Конфігурація

Додайте `track_ios: false` до своїх налаштувань зони, щоб вимкнути відстеження розташування зон для всіх підключених додатків iOS.

### iBeacons

The app has basic support for using iBeacons to trigger enter/exit updates. Щоб налаштувати їх, додайте відомості про iBeacon до своєї зони так:

```yaml
zone.home:
  beacon:
    uuid: B9407F30-F5F8-466E-AFF9-25556B57FE6D
    major: 60042
    minor: 43814
```

Restart Home Assistant and then the iOS app. It will then begin using iBeacons *instead of your location* for enter triggers around your zones. Щоб додати iBeacon до `zone.home`, додайте вищезгадане під `customize`.