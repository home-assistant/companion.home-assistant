---
title: Обработчик URL
id: версия-1.0.0-url-обработчика
original_id: url-обработчик
---

Домашний помощник для iOS поддерживает открытие из других приложений по URL.

Параметры запроса передаются в качестве словаря в вызове.

## Служба звонков

Пример: `homeassistant://call_service/device_tracker.see?entity_id=device_tracker.entity`

## Пожарное событие

Вы можете создать [триггер события](/docs/automation/trigger/#event-trigger) и запустить событие.

Пример: `homeassistant://fire_event/custom_event?entity_id=MY_CUSTOM_EVENT`

## Отправить местоположение

Пример: `homeassistant://send_location/`