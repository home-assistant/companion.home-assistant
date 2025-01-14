---
title: "URL Handler"
id: 'url-handler'
---

Home Assistant supports opening from other apps via URL.

Query parameters are passed as a dictionary in the call.

:::info
If multiple servers are connected to an app, you will be prompted to select a server when handling a `navigate` link. `call_service` and `fire_event`  links will be handled using the first server in the list.
:::

## Navigate
This allows you to update the frontend page location via a deeplink. To build a deeplink, follow these steps:

1. Navigate to the link you'd like to deeplink to in the web app, e.g. `http://homeassistant.local:8123/dashboard-mobile/my-subview`
2. Copy the path portion of the URL, in this example that would be `/dashboard-mobile/my-subview`
3. Craft your URL by starting with `homeassistant://navigate` and adding the path, e.g. `homeassistant://navigate/dashboard-mobile/my-subview`

### Specify server to navigate to
![iOS](/assets/iOS.svg), ![Android](/assets/android.svg) <span class='beta'>BETA</span><br />
By default the App will ask which server you want to navigate to in case you have multiple servers.
To define which server you want to navigate to, use the query param `?server=` like the example below:<br /><br />
`homeassistant://navigate/webcams?server=My%20home` when your server name is `My Home`, or use `?server=default` if you want to navigate to the first server available.

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
