---
title: "URL Handler"
id: 'url-handler'
---

Home Assistant supports opening from other apps via URL.

Query parameters are passed as a dictionary in the call.

:::info
![iOS](/assets/iOS.svg) and ![Android](/assets/android.svg) <span class='beta'>BETA</span><br />
If multiple servers are connected to an app, you will be prompted to select a server when handling a `navigate` link, `call_service`, or `fire_event`  links will be handled using the first server in the list.

![Android](/assets/android.svg)<br />
If multiple servers are connected to an Android app, `navigate` links will be handled using the most recently used server in the list.
:::

## Navigate
This allows you to update the frontend page location via a deeplink.

For example: if you had a dashboard at `/lovelace/webcams` you can use `homeassistant://navigate/lovelace/webcams` to launch the app there.

## Call service
![iOS](/assets/iOS.svg)<br />
Example: `homeassistant://call_service/device_tracker.see?entity_id=device_tracker.entity`

## Fire event
![iOS](/assets/iOS.svg)<br />
You can create an [event trigger](https://www.home-assistant.io/docs/automation/trigger/#event-trigger) and fire the event.

Example: `homeassistant://fire_event/custom_event?entity_id=MY_CUSTOM_EVENT`

## Send one shot location
![iOS](/assets/iOS.svg)<br />
Example: `homeassistant://send_location/`
