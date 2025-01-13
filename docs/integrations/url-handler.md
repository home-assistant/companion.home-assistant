---
title: "URL Handler"
id: 'url-handler'
---

Home Assistant supports opening from other apps via URL.

## Platform Compatibility

Platform support of different types of deeplinks will vary, consult the table below to see which deeplink types are available for your platform.

<table className="core-table">
  <thead>
    <tr>
      <th><strong>Deep Link Type</strong></th>
      <th><img alt="Android" src="/assets/android.svg" /> Full & Minimal</th>
      <th><img alt="iOS" src="/assets/iOS.svg" /> & <img alt="macOS" src="/assets/macOS.svg" /></th>
      </tr>
  </thead>
    <tbody>
      <tr>
        <td>Navigate</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Call Service</td>
        <td></td>
        <td>✅</td>
      </tr>
        <tr>
        <td>Fire Event</td>
        <td></td>
        <td>✅</td>
      </tr>
        <tr>
        <td>Send Location</td>
        <td></td>
        <td>✅</td>
      </tr>
    </tbody>
</table>

## Navigate
This allows you to update the frontend page location via a deeplink. To build a deeplink, follow these steps:

1. Navigate to the link you'd like to deeplink to in the web app, e.g. `http://homeassistant.local:8123/dashboard-mobile/my-subview`
2. Copy the path portion of the URL, in this example that would be `/dashboard-mobile/my-subview`
3. Craft your URL by starting with `homeassistant://navigate` and adding the path, e.g. `homeassistant://navigate/dashboard-mobile/my-subview`

:::info
![iOS](/assets/iOS.svg) **Specifying which server to navigate to is currently only supported in iOS**<br />
By default the App will ask which server you want to navigate to in case you have multiple servers.
To define which server you want to navigate to, use the query param `?server=` like the example below:<br /><br />
`homeassistant://navigate/webcams?server=My%20home` when your server name is `My Home`, or use `?server=default` if you want to navigate to the first server available.
:::

## Call service
Example: `homeassistant://call_service/device_tracker.see?entity_id=device_tracker.entity`

Query parameters are passed as a dictionary in the call.

:::info
If multiple servers are connected to an app, `call_service` links will be handled using the first server in the list.
:::

## Fire event
You can create an [event trigger](https://www.home-assistant.io/docs/automation/trigger/#event-trigger) and fire the event.

Example: `homeassistant://fire_event/custom_event?entity_id=MY_CUSTOM_EVENT`

Query parameters are passed as a dictionary in the call.

:::info
If multiple servers are connected to an app, `fire_event` links will be handled using the first server in the list.
:::

## Send one shot location
Example: `homeassistant://send_location/`
