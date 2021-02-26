---
title: Troubleshooting
id: 'faqs'
---

Below is a list of common issues and troubleshooting advice to address them. For more support please [look at the more help page](more-help.md)

## App crashes on set up

If you are running Home Assistant 0.110 and the app crashes after clicking "continue" during set up, you need to add values for `internal_url` and `external_url`. This can be done through the user interface (Configuration>General). If you do not see this section, you may need to turn on "Advanced Mode" from your profile page first. If these fields are disabled it is likely you have have your configuration stored in `configuration.yaml`, in this case add the entries under `homeassistant:` i.e.:

```yaml
homeassistant:
  ...
  external_url: URL
  internal_url: URL
```

Replacing `URL` with the address you use to access your Home Assistant instance. The values of `internal_url` and `external_url` can be the same and should be the same as you have for `url:` in the `http:` of `configuration.yaml`.

When you have saved these changes, restart Home Assisant and, after Home Assistant has finished restarting, reopen the the app. 

## I don't see a `notify.mobile_app` service for my device in my `dev-services` panel
Once you have [set up](/getting_started/index.md) the Companion app you will need to restart Home Assistant for the `notify.mobile_app` service call to register. On iOS the `notify.mobile_app_<Device_ID>` service will be created provided you granted notification permissions during setup, on Android the service call will appear after the restart. If you can't see this, [force quit on iOS](https://support.apple.com/HT201330) or force stop on Android. Then relaunch the Companion app and finally restart your Home Assistant instance. The service should now be listed in the `Developer Tools > Services` panel.

![iOS](/assets/iOS.svg) If you don't see the service call on iOS, check the notification settings within the app (swipe right to bring up the sidebar, the tap "App Configuration", then "Notifications"). If the "Push ID" box is empty, tap the Reset button below it.

![Android](/assets/android.svg) If you still don't see the service call on Android follow the steps to [start fresh](#starting-fresh-with-the-android-app).

## I have a `notify.mobile_app_<Device_ID>` service but don't receive notifications
Firstly, check your message payload is valid. Look at the examples in the [notification docs](../notifications/basic.md) or try sending the simple example below on the `Developer Tools > Services` page to your `notify.mobile_app_<Device_ID>` service.
```JSON
{"message": "Hello World"}
```

If this notification is delivered the problem is most likely with your payload.

If the above doesn't work, try the following:

1.  _Check your message limits:_ To allow us to provide a free notification service, each app target is limited to 150 notifications per day. [Location updates](../notifications/notification-commands#request-location-updates) and other special notifications do not count towards this limit. ![iOS](/assets/iOS.svg) In iOS you can check your remaining notifications within the Companion app by swiping right to open the sidebar and tapping "App Configuration" then "Notifications" and scroll to the bottom of the page. The limit resets everyday at midnight UTC.

2.  _Reset your push ID token:_ ![iOS](/assets/iOS.svg) If you have checked you still have notifications remaining, you can reset your notification at the top of the "Notifications" page within the "App Configuration" page. After doing this you may need to [force quit](https://support.apple.com/HT201330) the iOS Companion app and then reopen the app and finally restart your Home Assistant instance.

3.  _Check your iOS settings:_ ![iOS](/assets/iOS.svg) In the iOS Settings application, navigate to Notifications, then select Home Assistant, and ensure that "Allow Notifications" is toggled on.

4. _Start fresh with the Android app:_ ![Android](/assets/android.svg) If you still can't recieve notifications in the Android app then try to [start fresh](#starting-fresh-with-the-android-app).

## I receive an SSL error and/or I am unable to connect to my Home Assistant Instance when away from Home
This often happens when you have the [Home Assistant Cloud](https://www.home-assistant.io/cloud/) enabled but have do not have [Remote UI](https://www.nabucasa.com/config/remote/) turned on. To address this either enable the [Remote UI](https://www.nabucasa.com/config/remote/) or swipe right to open the sidebar and the tap "App Configuration" then under "Settings" tap "Connection". Make sure the switch next to "Connect Via Cloud" is off and enter the remote address of your Home Assistant Instance in the "External URL" field. This address must be for an encrypted connection, for instructions on setting up an encrypted remote connection to your Home Assistant instances, please see the [Home Assistant docs](https://www.home-assistant.io/docs/configuration/remote/) or [this guidde to setting up Let's Encrypt with Duck DNS](https://www.home-assistant.io/docs/ecosystem/certificates/lets_encrypt/).

If you do not have [Home Assistant Cloud](https://www.home-assistant.io/cloud/) set up at all, the problem is likely that the remote connection is not secured. The Companion App requires an encrypted connection for remote connections. Please see the [Home Assistant docs](https://www.home-assistant.io/docs/configuration/remote/) or [this guide to setting up Let's Encrypt with Duck DNS](https://www.home-assistant.io/docs/ecosystem/certificates/lets_encrypt/) for instructions on setting up a secured connection.

## Something in Home Assistant doesn't work the same way it does on my desktop
This is probably not an issue with the Companion App but more likely with Home Assistant or the particular component that isn't behaving as expected. To test the cause please try the following steps.

1.  Firstly, swipe down in the iOS Companion app to refresh your view. In the Android app force stop the application and relaunch it.
2.  If the problem still persists, open your Home Assistant instance in the Safari/Chrome browser (you may have to sign in). If the problem is present in Safari/Chrome, please raise an issue on either the [Home Assistant Frontend GitHub](https://github.com/home-assistant/frontend/issues) or if it is with a custom component, with the developer of that component. In your issue report, state that the problem exists when viewing on a mobile browser and not necessarily the Companion App.
3.  If the problem does not occur in Safari, please raise an issue on the [iOS Companion App GitHub](https://github.com/home-assistant/iOS/issues) or the [Android Companion App GitHub](https://github.com/home-assistant/android/issues). Please state you followed these steps and the problem only occurs in the Companion app.

## The status bar (top bar with cell/Wi-Fi strength) does not match my theme
If you are using iOS app prior to version 2020.2 or the Android app, to change the color of the status bar to match your Home Assistant theme, please use the [`frontend.set_theme`](https://www.home-assistant.io/components/frontend/#theme-automation) service instead of the dropdown menu in the Home Assistant profile page. Using the service will generate an event allowing the Companion App to detect the theme change and apply the correct color to the status bar. See the [theming](../integrations/theming.md) documentation for details of which keys are used. Note that colors must be specified as hex values (e.g. `#0099ff`) in your theme and specifying element colors through variable names is not supported.

## I am running the Companion App on multiple devices, the `sensor` names are too similar and confusing, what can I do?
Starting in Home Assistant Core 0.106, the default sensor names will be registered with your device name as set in the iOS settings app or the Android App Configuration page. For now, you will need to rename each sensor from within the Integrations section of Home Assistant's Configuration page by following these steps.

1.  Open the Home Assistant "Configuration" page from the sidebar (if using the app, swipe right to access this)
2.  Click or tap on "Integrations"
3.  Find the "Mobile App: _Device Name_" integration corresponding the device you wish to rename the sensors of and open it
4.  For each sensor you wish to rename, click or tap on the sensor name and then the cog symbol.
5.  Under "Entity ID" change the entity id as required. Do **not** change `sensor.` or `device_tracker.` part of the ID
6.  Repeat Steps 4 and 5 for each sensor you wish to rename


## Opening or resuming the Companion App generates authentication errors in my Home Assistant notifications
This is normally due to having a camera entity present on a Lovelace picture entities or picture elements card. A workaround for this is to remove the the camera entity in the short term while this is resolved. You may be able to use [live stream view](https://github.com/home-assistant/core/issues/23055) to address this. This is a known bug with Home Assistant which you can track and help address [here](https://github.com/home-assistant/core/issues/23055).

## `kCLError` when pulling down to manually refresh the app/update Location

To fix this change the location permission for the Home Assistant App to "Always" in iOS Settings>Privacy>Location Services.

## Starting fresh with the Android app
![Android](/assets/android.svg) At times you may need to start fresh with the Android app as a new feature may not be working properly or something odd happens.

1.  Check that Home Assistant Core, the [Android app](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android) and [Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview) are up to date.
2.  Clear Storage or App data in Android app.
3.  In Home Assistant navigate to Configuration > Integration. Remove the mobile app entry for the device in question. If you see more than 1 remove them all.
4.  Restart Home Assistant.
5.  Log back into the Android app. If you have more than 1 device, make sure to rename the device during onboarding.


## Location is not updating in Android app
![Android](/assets/android.svg) If you find that location updates are not coming in here are a few things to check.

1.  Ensure the app has location permissions granted, all the time.
2.  Ensure that location (GPS) is enabled on your device.
3.  Turn off battery optimizations for the app.
4.  Ensure that all 3 of the Location toggles are enabled in App Configuration > Manage Sensors in the Android app.
5.  Turn on unrestricted data for the Android app. (Samsung users will need to disable data saver for Home Assistant as well.)
6.  Check that background access setting under App Configuration shows the app has proper access.

If you are still seeing location issues then you may find it helpful to use the [crash logs](#android-crash-logs) to determine whats going on as we report the entire location decision making process there. First you will need to follow the steps at the link above to get logcat proper permission to view the verbosity, this is important as normal logcat will not output the debug level that we require for this.

Once you have setup logcat you will want to perform a search on a `tag` for `LocBroadcastReceiver` then you will want to watch the logs for about 10-15 minutes to get several reports to see how it is working.  Below is an example of what you can expect to see to ensure that location updates are coming to the phone.  The app still has a decision making process to ensure we get a valid location to actually send back.

```
2021-02-03 09:03:00.900 7306-7306/? D/LocBroadcastReceiver: Received location update.
2021-02-03 09:03:00.903 7306-7306/? D/LocBroadcastReceiver: Last Location: 
    Coords:(37.4220656, -122.0840897)
    Accuracy: 4.663
    Bearing: 86.759346
2021-02-03 09:03:00.903 7306-7306/? D/LocBroadcastReceiver: Begin evaluating if location update should be skipped
2021-02-03 09:03:00.903 7306-7306/? D/LocBroadcastReceiver: Received location that is 74 milliseconds old, 1612371780829 compared to 1612371780903 with source fused
2021-02-03 09:03:00.903 7306-7306/? D/LocBroadcastReceiver: Duplicate location received, not sending to HA
2021-02-03 09:06:34.241 7306-7306/? D/LocBroadcastReceiver: Received location update.
2021-02-03 09:06:34.245 7306-7306/? D/LocBroadcastReceiver: Last Location: 
    Coords:(37.4220656, -122.0840897)
    Accuracy: 13.279
    Bearing: 0.0
2021-02-03 09:06:34.245 7306-7306/? D/LocBroadcastReceiver: Begin evaluating if location update should be skipped
2021-02-03 09:06:34.245 7306-7306/? D/LocBroadcastReceiver: Received location that is 1126 milliseconds old, 1612371993119 compared to 1612371994245 with source fused
2021-02-03 09:06:34.309 7306-7430/? D/LocBroadcastReceiver: Location update sent successfully
```

This is the expected logs for successful location results.  If you do not see logs like this then make sure to follow the steps up above as more than likely the app does not have proper access to run in the background without any interference.  If the android system kills the app then you will not see these updates.


## Using a self-signed certificate leads to a blank page in Android
![Android](/assets/android.svg) If you are using a self-signed certificate on Android then you may get stuck at a blank screen after entering and/or selecting your Home Assistant instance. In order to correct this issue you will need to make sure the URL is valid and that you import the certificate into Android's Trusted Certificates. Steps to perform this can be found [here](https://support.google.com/nexus/answer/2844832?hl=en). These steps were written for devices on Android 9+ but are very close for older supported devices.

## Android widget is not working
![Android](/assets/android.svg) If you find that a widget is no longer working then these steps may help you resolve the issue.

1.  Check that data saver is disabled on the device, the widget will not work when it is enabled.
2.  Check that background data for the Home Assistant app is enabled.
3.  Remove and recreate the widget.

## Notify service call is too similar or not showing up in Android
If you have more than 1 device of the same model and you did not rename your device in App Configuration after logging in then you may have a conflict.

1.  Navigate to App Configuration in the sidebar.
2.  Change the Device Name under Device Registration.
3.  Restart Home Assistant to register the new notify service call. (i.e. `notify.mobile_app_<device_name>`)

## Sensors are missing or not updating
![iOS](/assets/iOS.svg) When the app is not in the foreground, sensor updates are tied to location updates so you need to make sure that location permissions are enabled for the device and app in order for sensor updates to be sent to the phone. Once you enable location for the app the sensors will show up and continue to update as long as the location is enabled on the device and app.

![Android](/assets/android.svg) On Android, sensors will show up as and when they have an update. Some will show up immediately upon enabling and others will show up once permissions have been granted and the state was retrieved. If you do not see a sensor then you may need to wait for the sensor to get a state update so it can send it to your Home Assistant server.

## Text to speech notifications are not working
![Android](/assets/android.svg) Check that [Google Text to Speech](https://play.google.com/store/apps/details?id=com.google.android.tts) is updated. Check that it is also set as the default Text to Speech engine, this may be required for certain manufacturers.

## Seeing toast messages for Configured Entity not found
![Android](/assets/android.svg) This error is meant to show up when the app is unable to update a widget on your home screen for either an invalid/missing entity or the call to your Home Assistant instance failed. There are cases where widgets could be lost from the home screen and the app attempts to update those and fails. As the app does not get notified when a widget is lost (as opposed to removed by dragging off the screen) you will need to delete the widget from the App Configuration page.

1.  Navigate to App Configuration in the sidebar.
2.  Select Manage Widgets.
3.  Find any widget that no longer exists on your home screen.
4.  Delete the widget to remove it from the list and to stop the toast messages.

## Android Crash Logs
![Android](/assets/android.svg) The Android app makes use of Google's ADB [Logcat](https://developer.android.com/studio/command-line/logcat) feature to log errors. From time to time you may wish to inspect the logs or a developer may ask for crash logs in order to fix your issue. There are multiple ways to get the logs off the device. Unfortunately you will need to use a computer with a USB cable as you either need to setup Android Studio or you need to grant special ADB permissions.

The easiest way to get the logs would be to use [Logcat Reader](https://play.google.com/store/apps/details?id=com.dp.logcatapp) from the Google Play Store, you can also use [Android Studio](https://developer.android.com/studio). Either method requires you to grant special permissions, you will need to follow the instructions provided by the method to ensure you get the proper level of verbose logging. Some devices may require a USB driver in order to be recognized, every device is different and you may need to refer to the manufacturer if it doesn't work out of the box.

Once you have your method setup you will want to search by `homeassistant` in order to find the logs.

Here is an example of a crash log:

```
2020-12-09 14:44:24.224 18523-18571/io.homeassistant.companion.android E/SensorReceiver: Issue registering sensor: charger_type
    io.homeassistant.companion.android.common.data.integration.IntegrationException
        at io.homeassistant.companion.android.common.data.integration.impl.IntegrationRepositoryImpl.registerSensor(IntegrationRepositoryImpl.kt:449)
        at io.homeassistant.companion.android.sensors.SensorReceiver.updateSensors(SensorReceiver.kt:142)
        at io.homeassistant.companion.android.sensors.SensorReceiver$onReceive$1.invokeSuspend(SensorReceiver.kt:106)
        at kotlin.coroutines.jvm.internal.BaseContinuationImpl.resumeWith(ContinuationImpl.kt:33)
        at kotlinx.coroutines.DispatchedTask.run(DispatchedTask.kt:56)
        at kotlinx.coroutines.scheduling.CoroutineScheduler.runSafely(CoroutineScheduler.kt:571)
        at kotlinx.coroutines.scheduling.CoroutineScheduler$Worker.executeTask(CoroutineScheduler.kt:738)
        at kotlinx.coroutines.scheduling.CoroutineScheduler$Worker.runWorker(CoroutineScheduler.kt:678)
        at kotlinx.coroutines.scheduling.CoroutineScheduler$Worker.run(CoroutineScheduler.kt:665)
```
