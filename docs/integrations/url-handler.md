---
title: "URL Handler"
id: 'url-handler'
---

![iOS](/assets/iOS.svg)<br />
Home Assistant for iOS supports opening from other apps via URL.

Query parameters are passed as a dictionary in the call.

## Navigate
This allows you to update the frontend page location via a deeplink. This requires version 2021.3 or later.

For example: if you had a dashboard at `/lovelace/webcams` you can use `homeassistant://navigate/lovelace/webcams` to launch the app there.

## Call service
Example: `homeassistant://call_service/device_tracker.see?entity_id=device_tracker.entity`

## Fire event
You can create an [event trigger](https://www.home-assistant.io/docs/automation/trigger/#event-trigger) and fire the event.

Example: `homeassistant://fire_event/custom_event?entity_id=MY_CUSTOM_EVENT`

## Send one shot location
Example: `homeassistant://send_location/`
