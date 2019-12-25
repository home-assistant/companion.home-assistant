---
title: URL Handler
id: version-1.0.0-url-handler
original_id: url-handler
---

Home Assistant for iOS supports opening from other apps via URL.

Query parameters are passed as a dictionary in the call.

## Call service
Example: `homeassistant://call_service/device_tracker.see?entity_id=device_tracker.entity`

## Fire event
You can create an [event trigger](/docs/automation/trigger/#event-trigger) and fire the event.

Example: `homeassistant://fire_event/custom_event?entity_id=MY_CUSTOM_EVENT`

## Send one shot location
Example: `homeassistant://send_location/`
