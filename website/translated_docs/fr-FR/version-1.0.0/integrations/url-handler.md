---
title: URL Handler
id: version-1.0.0-url-handler
original_id: url-handler
---

Home Assistant pour iOS supporte l'ouverture d'autres applications via une URL.

Les paramètres de requête sont passés dans l’envoie sous forme de dictionnaire.

## Call service

Exemple: `homeassistant://call_service/device_tracker.see?entity_id=device_tracker.entity`

## Fire event

You can create an [event trigger](/docs/automation/trigger/#event-trigger) and fire the event.

Exemple: `homeassistant://fire_event/custom_event?entity_id=MY_CUSTOM_EVENT`

## Send one shot location

Exemple: `homeassistant://send_location/`