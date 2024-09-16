---
title: Troubleshooting
id: 'faqs'
---

Below is a list of common issues and troubleshooting advice to address them. For more support please [look at the more help page](more-help.md)

## App crashes on set up

If you are running Home Assistant 0.110 and the app crashes after clicking "continue" during set up, you need to add values for `internal_url` and `external_url`. This can be done through the user interface via your [General Settings](https://my.home-assistant.io/redirect/general/). If you do not see this section, you may need to turn on "Advanced Mode" from your profile page first. If these fields are disabled it is likely you have have your configuration stored in `configuration.yaml`, in this case add the entries under `homeassistant:` i.e.:

```yaml
homeassistant:
  ...
  external_url: URL
  internal_url: URL
```

Replacing `URL` with the address you use to access your Home Assistant instance. The values of `internal_url` and `external_url` can be the same and should be the same as you have for `url:` in the `http:` of `configuration.yaml`.

When you have saved these changes, restart Home Assisant and, after Home Assistant has finished restarting, reopen the the app. 

## I don't see a `notify.mobile_app` action for my device in my `dev-services` panel
Once you have [set up](/getting_started/index.mdx) the Companion app you will need to restart Home Assistant for the `notify.mobile_app` action to register. On iOS the `notify.mobile_app_<Device_ID>` action will be created provided you granted notification permissions during setup, on Android the action will appear after the restart. If you can't see this, [force quit on iOS](https://support.apple.com/HT201330) or force stop on Android. Then relaunch the Companion app and finally restart your Home Assistant instance. The action should now be listed in the `Developer Tools > Actions` panel.

![iOS](/assets/iOS.svg) If you don't see the action on iOS, check the notification settings within the app (swipe right to bring up the sidebar, then tap "[Settings](https://my.home-assistant.io/redirect/config/)", and then tap "Companion App", then "Notifications"). If the "Push ID" box is empty, tap the Reset button below it.

![Android](/assets/android.svg) If you still don't see the action on Android follow the steps to [start fresh](#starting-fresh-with-the-android-app).

## I have a `notify.mobile_app_<Device_ID>` action but don't receive notifications
Firstly, check your message payload is valid. Look at the examples in the [notification docs](../notifications/basic.md) or try sending the simple example below on the `Developer Tools > Services` page to your `notify.mobile_app_<Device_ID>` service.
```JSON
{"message": "Hello World"}
```

If this notification is delivered the problem is most likely with your payload.

If the above doesn't work, try the following:

1.  _Check your message limits:_ To allow us to provide a free notification service, each app target is limited to 500 notifications per day. [Location updates](../notifications/notification-commands#request-location-updates) and other special notifications do not count towards this limit. ![iOS](/assets/iOS.svg) In iOS you can check your remaining notifications within the Companion app by swiping right to open the sidebar and tapping "[Settings](https://my.home-assistant.io/redirect/config/)", and then tap "Companion App" then "Notifications" and scroll to the bottom of the page. The limit resets everyday at midnight UTC.

2.  _Reset your push ID token:_ ![iOS](/assets/iOS.svg) If you have checked you still have notifications remaining, you can reset your notification at the top of the "Notifications" page within the "Companion App" page of [Settings](https://my.home-assistant.io/redirect/config/). After doing this you may need to [force quit](https://support.apple.com/HT201330) the iOS Companion app and then reopen the app and finally restart your Home Assistant instance.

3.  _Check your system settings:_
    - ![iOS](/assets/iOS.svg) In the iOS Settings application, navigate to Notifications, then select Home Assistant, and ensure that "Allow Notifications" is toggled on.
    - ![Android](/assets/android.svg) In the Android Settings application, navigate to Apps, then select Home Assistant, then select Notifications, and ensure that "All Home Assistant notifications" is toggled on. If you're only receiving some notifications, check if the [notification channel](../notifications/notifications-basic#notification-channels) you're using is toggled on.

4. _Start fresh with the Android app:_ ![Android](/assets/android.svg) If you still can't recieve notifications in the Android app then try to [start fresh](#starting-fresh-with-the-android-app).

## I receive an SSL error and/or I am unable to connect to my Home Assistant Instance when away from Home
This often happens when you have the [Home Assistant Cloud](https://www.home-assistant.io/cloud/) enabled but have do not have [Remote UI](https://www.nabucasa.com/config/remote/) turned on. To address this either enable the [Remote UI](https://www.nabucasa.com/config/remote/) or swipe right to open the sidebar and the tap "Settings", and then tap "Companion App" then under "Settings" tap "Connection". Make sure the switch next to "Connect Via Cloud" is off and enter the remote address of your Home Assistant Instance in the "External URL" field. This address must be for an encrypted connection, for instructions on setting up an encrypted remote connection to your Home Assistant instances, please see the [Home Assistant docs](https://www.home-assistant.io/docs/configuration/remote/) or [this guide to setting up Let's Encrypt with Duck DNS](https://www.home-assistant.io/docs/ecosystem/certificates/lets_encrypt/).

If you do not have [Home Assistant Cloud](https://www.home-assistant.io/cloud/) set up at all, the problem is likely that the remote connection is not secured. The Companion App requires an encrypted connection for remote connections. Please see the [Home Assistant docs](https://www.home-assistant.io/docs/configuration/remote/) or [this guide to setting up Let's Encrypt with Duck DNS](https://www.home-assistant.io/docs/ecosystem/certificates/lets_encrypt/) for instructions on setting up a secured connection.

## Something in Home Assistant doesn't work the same way it does on my desktop
This is probably not an issue with the Companion App but more likely with Home Assistant or the particular component that isn't behaving as expected. To test the cause please try the following steps.

1.  Firstly, swipe down in the iOS Companion app to refresh your view. In the Android app force stop the application and relaunch it.
2.  If the problem still persists, open your Home Assistant instance in the Safari/Chrome browser (you may have to sign in). If the problem is present in Safari/Chrome, please raise an issue on either the [Home Assistant Frontend GitHub](https://github.com/home-assistant/frontend/issues) or if it is with a custom component, with the developer of that component. In your issue report, state that the problem exists when viewing on a mobile browser and not necessarily the Companion App.
3.  If the problem does not occur in Safari, please raise an issue on the [iOS Companion App GitHub](https://github.com/home-assistant/iOS/issues) or the [Android Companion App GitHub](https://github.com/home-assistant/android/issues). Please state you followed these steps and the problem only occurs in the Companion app.

## The status bar (top bar with cell/Wi-Fi strength) does not match my theme
If you are using iOS app prior to version 2020.2 or the Android app, to change the color of the status bar to match your Home Assistant theme, please use the [`frontend.set_theme`](https://www.home-assistant.io/components/frontend/#theme-automation) action instead of the dropdown menu in the Home Assistant profile page. Using the action will generate an event allowing the Companion App to detect the theme change and apply the correct color to the status bar. See the [theming](../integrations/theming.md) documentation for details of which keys are used. Note that colors must be specified as hex values (e.g. `#0099ff`) in your theme and specifying element colors through variable names is not supported.

## I am running the Companion App on multiple devices, the `sensor` names are too similar and confusing, what can I do?
Starting in Home Assistant Core 0.106, the default sensor names will be registered with your device name as set in the iOS settings app or the Android Companion App Configuration page. For now, you will need to rename each sensor from within the [Integrations Dashboard](https://my.home-assistant.io/redirect/integrations/) of Home Assistant's Configuration page by following these steps.

1.  Go to the [Integrations Dashboard](https://my.home-assistant.io/redirect/integrations/) with Configuration.
2.  Find the "Mobile App: _Device Name_" integration corresponding the device you wish to rename the sensors of and open it
3.  For each sensor you wish to rename, click or tap on the sensor name and then the cog symbol.
4.  Under "Entity ID" change the entity id as required. Do **not** change `sensor.` or `device_tracker.` part of the ID
5.  Repeat Steps 4 and 5 for each sensor you wish to rename

## `kCLError` when pulling down to manually refresh the app/update Location

To fix this change the location permission for the Home Assistant App to "Always" in iOS Settings>Privacy>Location Services.

## Starting fresh with the Android app
![Android](/assets/android.svg) At times you may need to start fresh with the Android app as a new feature may not be working properly or something odd happens. Make sure to follow each step precisely without skipping anything.

:::info
Not all but some issues can be solved by simply logging out of the app and logging back in. If you have [trusted networks](https://www.home-assistant.io/docs/authentication/providers/#trusted-networks) setup in your server make sure to login to the app entering your credentials so the app can continue to work when not on the trusted network. If after you attempt to log out and log back and the issue still persists then please continue with the below steps.
:::

1.  Check that Home Assistant Core, the [Android app](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android) and [Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview) are up to date.
2.  Clear Storage or App data in Android app. Do not assume it is safe to uninstall and reinstall as that triggers auto-backup which we are trying to avoid here.
3.  In Home Assistant navigate to the [Integrations Dashboard](https://my.home-assistant.io/redirect/integrations/). Remove the mobile app entry for the device in question. If you see more than 1 remove them all.
4.  Restart Home Assistant.
5.  Log back into the Android app. If you have more than 1 device, make sure to rename the device during onboarding. Remember to login using your credentials instead of Trusted Networks.


## Device Tracker is not updating in Android app
![Android](/assets/android.svg) If you find that the device tracker is not updating as you would expect follow the below steps to ensure optimal settings.

1.  Make sure your device and server meet the prerequisites for location tracking:
    - Enable [remote access](https://www.home-assistant.io/docs/configuration/remote/) for your server.
    - In [Settings](https://my.home-assistant.io/redirect/config/) > Companion app > Manage sensors, enable the following **Location sensors**: Background location, Location zone and Single accurate Location.
      - If you use multiple servers, make sure the correct servers have each sensor enabled.
    - If you did not install the app from the Play Store, verify that you are using the [`full` flavor](../core/android-flavors.md).
2.  Ensure the app has location permissions granted, all the time. (On Android 12 and newer, allow Precise location when prompted)
3.  Ensure that location (GPS) is enabled on your device.
4.  Allow background access and turn off 'battery optimizations' for the app.
    - You can check background access in [Settings](https://my.home-assistant.io/redirect/config/) > Companion app. The setting should show a check mark ✔️.
    - Some manufacturers may add additional battery saving features (ex: Power Saving), make sure to disable all of those as well. You can usually access these from the system settings app.
5.  Turn on unrestricted data for the app.
    - Samsung devices: you will need to disable data saver for Home Assistant as well.

:::info
The steps above will check that the `device_tracker` entity and server are configured properly. If you are using the `person` entity and still experience an issue after following the above steps then double check the [`person` entity settings](https://my.home-assistant.io/redirect/people) for that particular user and remove any `device_tracker` that stays at home (example: a logged in tablet). 
:::

Sometimes the above steps will still not result in location updates reaching your server. The app can receive a lot of location updates and may skip some of them. To determine why, review the app location history logs.

Go to [Settings](https://my.home-assistant.io/redirect/config/) > Companion app > Troubleshooting > Location tracking and enable location history. The app will now keep a log of all location updates received in the last 48 hours.

 - Each update will show the source (for example, "Background location") and result (for example, "Sent"). The app verifies that a location is valid before sending it, and an update may be skipped due to time, accuracy, duplicates, or other reasons.
 - The app should receive updates multiple times an hour. If you do not see updates after enabling the history, make sure to follow the previously mentioned steps. No location history is usually caused by limited background access for the Home Assistant app, or the Android system killing the app.
 - If multiple updates are skipped due to accuracy then check the GPS coordinates to ensure they were correct, and consider increasing the [sensor setting for accuracy](../core/location.md#location-sensor-settings). For example, if you see a valid location getting skipped with accuracy around `350` then set the minimum accuracy setting to `400` as a buffer. Larger values may also lead to inconsistent results so go by valid reports in the logs.

<details>
<summary>Manual review steps</summary>

You can also manually review the location history by using the [crash logs](#android-crash-logs) to determine whats going on. These logs contain more details, but are only kept while the app is open. The entire location decision making process is printed to the logs to help you understand whats happening. When you look at the logs pay attention to the lines that contain `LocBroadcastReceiver` to follow the decisions. Keep in mind you want roughly 10 minutes of logs so you may need to keep the app open to generate longer logs while the issue is happening. 

Below is an example of what you can expect to see to ensure that location updates are coming to the phone. The app will verify that a location is valid before sending it back. These are the logs you can expect to see when a duplicate location is received. The app will not send the same location update to the server if it has not changed for 15 minutes since the last update was sent.

```
2021-02-03 09:03:00.900 7306-7306/? D/LocBroadcastReceiver: Received location update.
2021-02-03 09:03:00.903 7306-7306/? D/LocBroadcastReceiver: Last Location: 
    Coords:(37.4220656, -122.0840897)
    Accuracy: 4.663
    Bearing: 86.759346
2021-02-03 09:03:00.903 7306-7306/? D/LocBroadcastReceiver: Begin evaluating if location update should be skipped
2021-02-03 09:03:00.903 7306-7306/? D/LocBroadcastReceiver: Received location that is 74 milliseconds old, 1612371780829 compared to 1612371780903 with source fused
2021-02-03 09:03:00.903 7306-7306/? D/LocBroadcastReceiver: Duplicate location received, not sending to HA
```

Below you will find the expected log for successful location results. If you do not see lines like these, make sure to follow the previously mentioned steps.

```
2021-02-03 09:06:34.241 7306-7306/? D/LocBroadcastReceiver: Received location update.
2021-02-03 09:06:34.245 7306-7306/? D/LocBroadcastReceiver: Last Location: 
    Coords:(37.4220656, -122.0840897)
    Accuracy: 13.279
    Bearing: 0.0
2021-02-03 09:06:34.245 7306-7306/? D/LocBroadcastReceiver: Begin evaluating if location update should be skipped
2021-02-03 09:06:34.245 7306-7306/? D/LocBroadcastReceiver: Received location that is 1126 milliseconds old, 1612371993119 compared to 1612371994245 with source fused
2021-02-03 09:06:34.309 7306-7430/? D/LocBroadcastReceiver: Location update sent successfully
```

The logs will indicate whether a report was skipped due to time, accuracy, duplicates or something else.
</details>

If you still do not receive location updates after following the above steps and believe this is incorrect, submit a GitHub [issue](https://github.com/home-assistant/android/issues/new?assignees=&labels=bug&template=Bug_report.md&title=). If possible attach at least 10 minutes of logs from this troubleshooting step to make it easier for others to help (this may be requested).

## Using a self-signed certificate leads to a blank page in Android
![Android](/assets/android.svg) If you are using a self-signed certificate on Android then you may get stuck at a blank screen after entering and/or selecting your Home Assistant instance. In order to correct this issue you will need to make sure the URL is valid and that you import the certificate into Android's Trusted Certificates. Steps to perform this can be found [here](https://support.google.com/nexus/answer/2844832?hl=en). These steps were written for devices on Android 9+ but are very close for older supported devices.

## Android widget is not working
![Android](/assets/android.svg) If you find that a widget is no longer working then these steps may help you resolve the issue.

1.  Check that data saver is disabled on the device, the widget will not work when it is enabled.
2.  Check that background data for the Home Assistant app is enabled.
3.  Remove and recreate the widget.

## Notify action is too similar or not showing up in Android
If you have more than 1 device of the same model and you did not rename your device in Companion App Configuration after logging in then you may have a conflict.

1.  Navigate to [Settings](https://my.home-assistant.io/redirect/config/) in the sidebar.
2.  Tap "Companion App"
3.  Change the Device Name under Device Registration.
4.  Restart Home Assistant to register the new notify action. (i.e. `notify.mobile_app_<device_name>`)

## Sensors are missing or not updating
![iOS](/assets/iOS.svg) When the app is not in the foreground, sensor updates are tied to location updates, so you need to make sure that location permissions are set to "Allow Always" in iOS settings.

The app will also try to send updates in the background however the frequency of these is determined by iOS and is heavily throttled to protect battery life. iOS uses an internal metric, which is not visible to app developers, to prioritize background activities for apps. Apps which you use more will be allowed to do more in the background more frequently, this means that the more you use the Companion App, iOS will learn that the app is important to you and allow more frequent updates via background fetch.

If you want to ensure that the sensors are updated when your device starts charging or the battery level goes below or above a certain limit, the most reliable way is to use an Automation in iOS's [Shortcuts](/integrations/siri-shortcuts.md) app. Set the "When" part to the desired condition and in the "Do" part select the "Update Sensors" action for Home Assistant. You will most likely want to turn off "Ask Before Running" to avoid being prompted before the update is sent. Due to limitations in iOS, you will however always see a notification from the Shortcuts app when these updates are sent.

![Android](/assets/android.svg) On Android, sensors will show up as and when they have an update. Some will show up immediately upon enabling and others will show up once permissions have been granted and the state was retrieved. If you do not see a sensor then you may need to wait for the sensor to get a state update so it can send it to your Home Assistant server.

## Text to speech notifications are not working
![Android](/assets/android.svg) Check that [Speech Recognition & Synthesis](https://play.google.com/store/apps/details?id=com.google.android.tts) is updated. Check that it is also set as the default Text to Speech engine, this may be required for certain manufacturers.

## Android Crash Logs
![Android](/assets/android.svg) The Android app makes use of Google's ADB [Logcat](https://developer.android.com/studio/command-line/logcat) feature to log errors. From time to time you may wish to inspect the logs or a developer may ask for crash logs in order to fix your issue. There is an option under [Settings](https://my.home-assistant.io/redirect/config/) Companion App > Troubleshooting > Show and Share Logs. This feature makes it a lot of easier to refresh, share and view the logs. The logs can then be used when you want to create an [issue](https://github.com/home-assistant/android/issues/new?assignees=&labels=bug&template=Bug_report.md&title=) or when a developer asks for them to troubleshoot an issue. It is important to note that the device logs may or may not contain sensitive information like your Home Assistant URL so make sure to remove sensitive information before sharing.

## Android app battery drain
![Android](/assets/android.svg) The android app offers many features, some of which may drain more battery than others. The default settings on the app strive to keep the app as battery friendly as possible. There may come a time when you enable a feature which may lead to more battery drain than desired. This section will list all the things to check on the application before you decide to [start fresh](#starting-fresh-with-the-android-app). For the below options you will need to go to Companion App Settings to check and disable them one by one.

1.  If on the full version check that high accuracy mode is not left enabled all the time.
2.  If on the full version check that Single Accurate Location sensor does not have "Include in sensor updates" option enabled.
3.  Check that Persistent Connection is set to "Never".
4.  If the Bluetooth Transmitter sensor is enabled check that the transmitter is not left on all the time, only enable it when you wish to use it.
5.  Check that Sensor Update Frequency is set to "Normal".
6.  Check that none of the Notification Sensors have the allow list disabled in their respective settings. You always want to define an allow list to prevent heavy battery usage.
