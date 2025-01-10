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
This allows you to update the frontend page location via a deeplink.

For example: if you had a dashboard at `/webcams` you can use `homeassistant://navigate/webcams` to launch the app there. Similarly, you can navigate to a subview named `example` under your `/webcams` dashboard using `homeassistant://navigate/webcams/example`.

#### Define server
![iOS](/assets/iOS.svg) <span class='beta'>BETA</span><br />
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
