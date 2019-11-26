---
title: Местоположение
id: версия-2.0.0-местоположение
original_id: местоположение
---

## Описание

Обновления местоположения отправляются с вашего устройства на домашний помощник в ряде ситуаций:

* Когда вы войдете или выйдете из [зоны](https://www.home-assistant.io/components/zone/), определено в Home Assistant.
* Когда iBeacon обнаружен или потерян (см. [ниже](#ibeacons)).
* Когда приложение открыто и оно не было открыто в фоновом режиме.
* Через автоматизированную фоновую выборку.
* Когда запрашивается обновление через [специальное уведомление](notifications/location.md)
* Когда открывается ссылка [URL Handler](integrations/url-handler.md).
* Когда приложение вызывается через [X-Callback-URL](integrations/x-callback-url.md).
* Когда ваши устройства обнаруживают [*значительное изменение местоположения*](#location-tracking-when-outside-a-home-assistant-zone).
* Вручную, когда приложение обновляется (перейдите вниз, когда в верхней части страницы) или из меню ярлыков, открывшегося из 3D, коснувшись значка приложения.

Вы можете проверить причину последнего обновления местоположения, проверив значение датчика `.last_update_trigger`

В зависимости от настройки, данные о местоположении отправляются непосредственно с вашего телефона в Home Assistant или через Облачный сервис Home Assistant. Это будет зависеть от URL, указанных в разделе Соединение, меню Настройки приложения. Данные о местоположении не отправляются через другие серверы или организации. Конечно, если вы решите не предоставить разрешение на размещение приложения Home Assistant Companion или если вы впоследствии удалите разрешения на местоположение (через настройки iOS>Приватность>Местоположение Сервисы), никаких данных о местоположении не будет отправлено с вашего устройства на домашний помощник. **Проверьте это значение true для обновлений уведомлений**

## Начало работы

Once you have installed and opened the Home Assistant Companion App for the first time, a new `device_tracker.` entity will be created. By default the entity will have a name of the form `device_tracker.<device_ID>` where `<device_ID>` is the name you have device name you have set in iOS (see: Settings>General>About). You can check the entity name within Home Assistant by visiting the Integration section of the Configuration page from the sidebar (swipe right if you're using the Companion App) then clicking or tapping on the Mobile App integration for your device and scrolling through the list of entities. You can edit the entity's `name` attribute as you desire if needed.

Следующий пример — это базовый пример, который переключает свет при приближении к вашему *дому* с наступлением темноты.

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

## Отслеживание местоположения за пределами зоны Home Assistant

Home Assistant для iOS получает *существенные обновления местоположения* из iOS. Когда обновление будет получено, оно отправляется к Home Assistant. Примерно, обновление приходит каждый раз, когда ваше устройствопереключается на новую сотовую башню, или прошло значительное количество времени (обычно пару часов) или изменение состояния соединения, и система замечает, что ваше местоположение недавно изменилось.

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

Версия. приложения имеет основную поддержку для использования iBeacons для запуска обновлений enter/exit. Чтобы настроить их, добавьте ваши данные iBeacon в зону таким образом:

```yaml
zone.home:
  beacon:
    uuid: B9407F30-F5F8-466E-AFF9-25556B57FE6D
    major: 60042
    minor: 43814
```

Перезапустите Home Assistant, а затем приложение iOS. После перезапуска начнется использования iBeacons *вместо вашего местоположения* для триггеров входа и выхода вокруг ваших зон. Чтобы добавить iBeacon в `zone.home` добавьте выше в соответствии с вашим `customize`.