---
title: "How the app handles your data"
id: 'data-handling'
---

The companion app is built around a simple idea: your data belongs to you, and it stays with the Home Assistant instance you choose to connect to. The app talks directly to your own Home Assistant instances, and the information it collects about your device is sent to those instances and nowhere else. A few features rely on outside services to work properly: push notifications, optional crash reporting, and a small number of sensors. Each of those is described below, so you can see exactly what leaves your device.

This page explains what that means in practice, what information can leave your device, and how to turn it off.

## You are in control of your data

The sensor values, location, and other information the app collects are sent to _your_ Home Assistant instance, the same instance you log in to. If you connect the app to more than one instance, you decide on a per-instance basis what each one receives:

- Location: you can send your exact location, only the name of the zone you are in, or nothing at all. See [Location](../core/location.md) for the per-instance options on Android and iOS.
- Sensors: how much control you have depends on the platform. ![Android](/assets/android.svg) On Android, you can enable or disable each sensor individually, and choose which sensors a given Home Assistant instance receives. ![iOS](/assets/iOS.svg) On iOS, you choose whether an instance receives all enabled sensors or none. See [Sensors](../core/sensors.md).

Because each connected Home Assistant instance is configured separately, turning something off in one Home Assistant instance never affects what another instance receives.

### No advertising or usage tracking

The app does not show advertising, does not track what you do for marketing, and does not include third-party usage analytics. The only optional report it can send is the [crash report](#crash-reporting) described below, and only in the `full` flavor of the Android app. The `minimal` flavor sends no reports of any kind. On ![iOS](/assets/iOS.svg) iOS, any sharing of crash and usage analytics follows the choice you made in your device's diagnostics settings. See [Crash reporting and diagnostics](#crash-reporting-and-diagnostics) for details.

### Default settings for a new Home Assistant instance

When you connect the app to a new Home Assistant instance, it starts with sensible defaults that you can change afterward:

- A small set of sensors is enabled to begin with, such as battery information, together with any sensors you granted permission to during onboarding. Most other sensors start disabled until you turn them on. See [Sensors](../core/sensors.md) for the full list and how to manage them.
- ![Android](/assets/android.svg) **Remotely control app & device** is enabled, so the instance can manage sensors and send notification commands that control the app from the start. See [Letting a Home Assistant instance control your app and device](#letting-an-instance-control-your-app-and-device) below to change this.

## Encryption in transit

If you connect over HTTPS, everything between your device and Home Assistant is encrypted by the connection itself, which is why an HTTPS address is recommended. See [Connection security level](../getting_started/connection-security-level) for how the app handles unencrypted addresses.

If you connect over HTTP (an unencrypted connection), the two platforms differ in how they protect the data the app sends, such as sensor and location updates:

- ![Android](/assets/android.svg) The Android app does not encrypt these payloads and relies on the connection. Over a plain HTTP connection, the sensor and location data it sends are transmitted in clear text and could be read by anyone able to observe the network.
- ![iOS](/assets/iOS.svg) The iOS app encrypts these payloads (such as sensor and location data) using a secret it shares with your instance when the app is first registered. The data stays encrypted even when the underlying connection is plain HTTP. This payload encryption is not a replacement for HTTPS, though: your login and other traffic are only protected when the connection itself is encrypted.

On either platform, use an HTTPS address whenever you can, and if you must use an HTTP address, restrict it to your home network with the **Most secure** connection security level.

:::note
If you access your Home Assistant instance remotely via Home Assistant Cloud, your connection is encrypted and relayed through Nabu Casa's servers. That service is covered by the [Home Assistant Cloud privacy policy](https://www.nabucasa.com/privacy/).
:::

## Notifications

Push notifications are the only feature that routes message content outside your Home Assistant instance. To deliver them, the app uses Google's Firebase Cloud Messaging. The notification content is not encrypted and transits through Google's servers before reaching your device, meaning Google can theoretically access the data.

How you can avoid sending notification data to Google, depends on your platform:

- ![Android](/assets/android.svg) The `full` flavor has no in-app Firebase opt-out. However, if you enable [Local Push](../notifications/local.md), notifications are delivered directly from your instance over a WebSocket connection, and Firebase is used only as a fallback when that connection is unavailable. To avoid Google entirely, use the `minimal` flavor (from F-Droid or GitHub), which always uses Local Push instead of Firebase.
- ![iOS](/assets/iOS.svg) You can opt out of Firebase in the app's privacy settings. Notifications will then stop working.

For the full explanation and the rate limits, see [Privacy, rate limiting and security](../notifications/details.md).

## Sensors that use external services

Most sensors read information from your own device and send it only to your instance. A few need an outside service to do their job, and they only run if you choose to enable them:

- The geocoded location sensor turns your coordinates into a readable address. On ![Android](/assets/android.svg) Android this uses the device's built-in geocoder, and on ![iOS](/assets/iOS.svg) iOS it uses Apple's Core Location services.
- ![Android](/assets/android.svg) The public IP sensor (`sensor.public_ip`) asks a third-party service (ipify) to report your device's public IP address.

See [Sensors](../core/sensors.md) for the full list and the details of each one.

## Crash reporting and diagnostics

How crash data is reported depends on the platform:

- ![Android](/assets/android.svg) On Android, two independent systems can report a crash: the crash and usage data collected by the app store, and the app's own crash reporting. You control each one separately.
- ![iOS](/assets/iOS.svg) On iOS, only the app store collection applies.

Both are described below.

### Crash and usage data collected by the app stores

Separately from the app, the store you installed it from can collect its own crash and basic usage information. This is controlled by an operating system setting rather than by the app. It is handled by Google or Apple under their own privacy policies, and it applies to apps in general, not only to Home Assistant.

- ![Android](/assets/android.svg) If you installed from the Google Play Store and have turned on the device setting to share usage and diagnostics data, Google Play receives crash and _application not responding_ reports along with basic stability and usage statistics. Developers see only aggregated reports in the Play Console. You can change this in your device settings under **Google** > **Usage & diagnostics** (the exact location varies by device). The `minimal` flavor installed from F-Droid or GitHub is not distributed through Google Play and is not covered by this collection.
- ![iOS](/assets/iOS.svg) If you have turned on **Share With App Developers** in the **Settings** app under **Privacy & Security** > **Analytics & Improvements**, Apple shares aggregated crash and app-usage analytics with the developers through App Store Connect. Only data from users who opted in is included, and it is aggregated to avoid identifying individuals.

### Crash reports sent by the app ![Android](/assets/android.svg) {#crash-reporting}

This crash reporting is specific to the Android app. To help find and fix bugs, the `full` flavor of the Android app can send a report to [Sentry](https://sentry.io), when the app crashes. Reports are accessible only to the Home Assistant app developers and are handled under [Sentry's privacy policy](https://sentry.io/privacy/). This is the version distributed through the Play Store; the `minimal` flavor contains no crash reporting at all. For the difference between the two, see [Android flavors](../core/android-flavors.md).

Crash reporting is _enabled by default_ in the `full` flavor, and you can turn it off at any time under **Settings** > **Companion app** in the **Crash reporting** setting.

A crash report is limited to technical information about the app and the device. It includes:

- The app version and build.
- The device model, manufacturer, and Android version.
- The technical details of the crash itself, such as the stack trace.
- A short trail of recent app and system events leading up to the crash, to help reproduce it.
- An anonymous identifier generated by Sentry.

A crash report does not include any personal or home information. It never includes:

- Your Home Assistant instance address or connection details.
- Access tokens, passwords, or other credentials.
- Content from your dashboards, entities, or notifications.
- Screenshots or a capture of what was on screen.
- Your email address or account name.

Connection problems are also never reported: errors such as a lost connection, a failed TLS handshake, or an unreachable host are ignored on purpose, since they describe your network rather than a bug in the app.

:::note
This is separate from the **Show and share logs** option used for troubleshooting, which you can use yourself. Those device logs may contain sensitive details such as your Home Assistant instance address, so review them before sharing.
:::

## Letting a Home Assistant instance control your app and device ![Android](/assets/android.svg) {#letting-an-instance-control-your-app-and-device}

This setting is specific to the Android app. Each Home Assistant instance you connect to has a per-instance setting named **Remotely control app & device**, described in the app as _Allow this server to enable and manage sensors and send notification commands_. This setting determines whether that Home Assistant instance can reach back into the app and your device, both managing which sensors are enabled and sending notification commands that control the device, rather than only receiving the data the app sends to it.

You can find it on Android under **Settings** > **Companion app** > **Server & devices**, by opening the settings for the Home Assistant instance you want to configure. It is _enabled by default_.

### When the remote control setting is enabled (the default)

The Home Assistant instance is trusted, and it can:

- Enable and disable the app's sensors. If you enable or disable one of the app's sensor entities from within Home Assistant, the app applies that change on its next sync.
- Send notification commands that act on the app or device. These are [notification commands](../notifications/commands.md) that do more than show a message, such as toggling Do Not Disturb, changing the ringer mode or volume, controlling Bluetooth, turning the flashlight on, adjusting screen brightness, switching high-accuracy location mode, launching an app, or requesting a location update.

:::tip
A sensor that needs additional permissions, such as location or health data, can never be turned on by the Home Assistant instance alone. It always requires an action on the Android device. Instead of enabling such a sensor, the app keeps it disabled and shows a notification asking you to grant the permission. Tapping that notification opens the sensor's settings page so you can allow it there. This prevents a Home Assistant instance from enabling a sensitive sensor without your consent.
:::

### When the remote control setting is disabled

The Home Assistant instance is no longer trusted to change the app or your Android device. Two things follow:

- Your choices in the app take priority for sensors. Which sensors are enabled is then controlled only from within the companion app on your Android device. If you try to enable or disable a sensor for that instance from Home Assistant, the app changes it back to match your in-app setting at the next sync. For example, if a sensor is enabled in the app and you disable it from the instance, the app re-registers the sensor, and it becomes enabled again the next time your companion app syncs.
- Notification commands that control the app or Android device are ignored. They are rejected, while ordinary notifications, including text-to-speech and clearing notifications, keep working as usual.

Disable this setting for any Home Assistant instance you do not want to be able to change settings on your Android device, while still allowing the app to send it sensor and location data as you've configured.

## Removing your data and disconnecting

Because the app only sends data to your own Home Assistant instance, you can stop it and remove what was collected at any time:

- To stop sending data from a device, open that Home Assistant instance's settings in the app and turn off the location and sensor options described above, or remove it from the app entirely.
- To delete the data already stored, remove the app's device from Home Assistant. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/), open the [Mobile App integration](https://www.home-assistant.io/integrations/mobile_app/), and delete the device for that Android/iOS device. This also revokes the access token the app was using.
- Uninstalling the app removes its data from your device.
