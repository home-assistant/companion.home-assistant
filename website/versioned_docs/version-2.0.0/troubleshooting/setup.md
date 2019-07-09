---
title: Troubleshooting
id: version-2.0.0-setup
original_id: setup
---

Below is a list of common issues and troubleshooting advice to address them. For more support please [look at the more help page](more-help.md)

#### I don't see a `notify.mobile_app` service for my device in my `dev-services` panel
Once you have [set up](../getting_started/index.md) the Companion App, a `notify.mobile_app_<Device_ID>` service will be created providing you granted notification permissions during setup. If you can't see this [force quit](https://support.apple.com/HT201330) the Companion App and then reopen the app and finally restart your Home Assistant instance. The service should now be listed in the `dev-services` panel. If not, check the notification settings within the app (swipe right to bring up the sidebar, the tap "App Configuration", then "Notifications"). If the "Push ID" box is empty, tap the Reset button below it.

#### I have a `notify.mobile_app_<Device_ID>` service but don't receive notifications
Firstly, check your message payload is valid. Look at the examples in the [notification docs](../notifications/basic.md) or try sending the simple example below for the `dev-services` page to your `notify.mobile_app_<Device_ID>` service.
```JSON
{"message": "Hello World"}
```

If this notification is delivered the problem is most likely with your payload.

If the above doesn't work, try the following to points:

1.  _Check your message limits:_ To allow us to provide a free notification service, each app target is limited to 150 notifications per day. [Location updates](../notifications/location.md) and other special notifications do not count towards this limit. You can check your remaining notifications within the Companion App by swiping right to open the sidebar and tapping "App Configuration" then "Notifications" and scroll to the bottom of the page. The limit resets everyday at midnight UTC.

2.  _Reset your push ID token:_ If you have checked you still have notifications remaining, you can reset your notification at the top of the "Notifications" page within the "App Configuration" page. After doing this you may need to [force quit](https://support.apple.com/HT201330) the Companion App and then reopen the app and finally restart your Home Assistant instance.

#### I receive an SSL error and/or I am unable to connect to my Home Assistant Instance when away from Home
This often happens when you have the [Home Assistant Cloud](https://www.home-assistant.io/cloud/) enabled but have do not have [Remote UI](https://www.nabucasa.com/config/remote/) turned on. To address this either enable the [Remote UI](https://www.nabucasa.com/config/remote/) or swipe right to open the sidebar and the tap "App Configuration" then under "Settings" tap "Connection". Make sure the switch next to "Connect Via Cloud" is off and enter the remote address of your Home Assistant Instance in the "External URL" field. This address must be for an encrypted connection, for instructions on setting up an encrypted remote connection to your Home Assistant instances, please see the [Home Assistant docs](https://www.home-assistant.io/docs/configuration/remote/) or [this guidde to setting up Let's Encrypt with Duck DNS](https://www.home-assistant.io/docs/ecosystem/certificates/lets_encrypt/).

If you do not have [Home Assistant Cloud](https://www.home-assistant.io/cloud/) set up at all, the problem is likely that the remote connection is not secured. The Companion App requires an encrypted connection for remote connections. Please see the [Home Assistant docs](https://www.home-assistant.io/docs/configuration/remote/) or [this guidde to setting up Let's Encrypt with Duck DNS](https://www.home-assistant.io/docs/ecosystem/certificates/lets_encrypt/) for instructions on setting up a secured connection.

#### Something in Home Assistant doesn't work the same way it does on my desktop
This is probably not an issue with the Companion App but more likely with Home Assistant or the particular component that isn't behaving as expected. To test the cause please try the following steps.

1.  Firstly, swipe down in the companion app to refresh your view.
2.  If the problem still persists, open your Home Assistant Instance in the Safari browser (you may have to sign in). If the problem is present in Safari, please raise an issue on either the [Home Assistant Frontend GitHub](https://github.com/home-assistant/home-assistant-polymer/issues) or if it is with a custom component, with the developer of that component. In your issue report, state that the problem exists when viewing on a mobile browser and not necessarily the Companion App.
3.  If the problem does not occur in Safari, please raise an issue on the [iOS Companion App GitHub](https://github.com/home-assistant/home-assistant-iOS/issues). Please state you followed these steps and the problem only occurs in the Companion App.

#### The iOS status bar (top bar with cell/Wi-Fi strength) does not match my theme
To change the colour of the iOS status bar to match your Home Assistant theme, please use the [`frontend.set_theme`](https://www.home-assistant.io/components/frontend/#theme-automation) instead of the dropdown menu in the Home Assistant profile page. Using the service will generate an event allowing the Companion App to detect the theme change and apply the correct colour to the status bar. See the [theming](../integrations/theming.md) documentation for details of which keys are used.

#### I am running the Companion App on multiple devices, the `sensor` names are too similar and confusing, what can I do?
In an imminent update to the app, default sensor names will be changed to include your device name as set in the iOS settings app. For now, you can change the name of each sensor from within the Integrations section of Home Assistant's Configuration page by following these steps.

1.  Open the Home Assistant "Configuration" page from the sidebar (if using the app, swipe right to access this)
2.  Click or tap on "Integrations"
3.  Find the "Mobile App <Device Name>" integration corresponding the device you wish to rename the sensors of and open it
4.  For each sensor you wish to rename, click or tap on the sensor name and then the cog symbol.
5.  Under "Entity ID" change the entity id as required. Do **not** change `sensor.` or `device_tracker.` part of the ID
6.  Repeat Steps 4 and 5 for each sensor you wish to rename


#### Opening or resuming the Companion App generates authentication errors in my Home Assistant notifications
This is normally due to having a camera entity present on a Lovelace picture entities or picture elements card. A workaround for this is to remove the the camera entity in the short term while this is resolved. You may be able to use [live stream view](https://github.com/home-assistant/home-assistant/issues/23055) to address this. This is a known bug with Home Assistant which you can track and help address [here](https://github.com/home-assistant/home-assistant/issues/23055).
