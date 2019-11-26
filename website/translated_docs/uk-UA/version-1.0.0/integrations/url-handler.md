---
title: URL обробник
id: version-1.0.0-url-handler
original_id: url-handler
---

Home Assistant для iOS підтримує відкриття з інших програм через URL.

Параметри запиту передаються як словник у виклику.

## Виклик сервісу

Приклад: `homeassistant://call_service/device_tracker.see?entity_id=device_tracker.entity`

## Запуск події

Ви можете створити [тригер подій](/docs/automation/trigger/#event-trigger) і запустити подію.

Приклад: `homeassistant://fire_event/custom_event?entity_id=MY_CUSTOM_EVENT`

## Надішліть одне місцезнаходження

Приклад: `homeassistant://send_location/`