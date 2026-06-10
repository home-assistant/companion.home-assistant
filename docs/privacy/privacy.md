---
title: "Privacy and data control"
id: 'privacy'
---

The companion app is built around a simple idea: your data belongs to you, and it stays with the Home Assistant instance you choose to connect to. The app talks directly to your own Home Assistant instances, and the information it collects about your home is sent to those instances and nowhere else. A few features rely on outside services to work at all: push notifications, optional crash reporting, and a small number of sensors. Each of those is described below, so you can see exactly what leaves your device.

This page explains what that means in practice, what information can leave your device and how to turn it off, and how the per-server **Remotely control app & device** setting decides how much control each of your Home Assistant instances has over the app and your device.

## You are in control of your data

The sensor values, location, and other information the app collects are sent to _your_ Home Assistant instance, the same instance you log in to. If you connect the app to more than one instance, you decide on a per-instance basis what each one receives:

- Location: you can send your exact location, only the name of the zone you are in, or nothing at all. See [Location](../core/location.md) for the per-instance options on both.
- Sensors: you choose which sensors are enabled and, per instance, whether sensor data is sent at all. See [Sensors](../core/sensors.md).

Because every connected instance is configured separately, turning something off for one instance never changes what another instance receives.

### No advertising or usage tracking

The app does not show advertising, does not track what you do for marketing, and does not include third-party usage analytics. The only optional report it can send is the [crash report](#crash-reporting) described below, and only in the `full` flavor of the Android app. The `minimal` flavor sends no reports of any kind.

### Defaults when you connect an instance

When you connect the app to a new Home Assistant instance, it starts with sensible defaults that you can change afterward:

- **Remotely control app & device** is enabled, so the instance can manage sensors and send app and device commands from the start. See [Letting an instance control your app and device](#letting-an-instance-control-your-app-and-device) below to change this.
- ![Android](/assets/android.svg) Only a small set of sensors is enabled to begin with: battery information (battery level, battery state, and charger type), together with any sensors you granted permission to during onboarding. Most other sensors start disabled until you turn them on. See [Sensors](../core/sensors.md) for the full list and how to manage them.

## Encryption in transit

The data the app sends to your instance is protected by the connection it uses. When you connect over HTTPS, everything between your device and Home Assistant is encrypted by the connection itself, which is why an HTTPS address is recommended. See [Connection security level](../getting_started/connection_security_level) for how the app handles unencrypted addresses.

Over an unencrypted HTTP connection, the two platforms differ in how they protect the data the app sends, such as sensor and location updates:

- ![iOS](/assets/iOS.svg) The iOS app also encrypts these payloads on its own, using a secret it shares with your instance when the app is first registered. The data therefore stays encrypted even when the underlying connection is plain HTTP.
- ![Android](/assets/android.svg) The Android app does not encrypt these payloads on its own and relies on the connection. Over a plain HTTP connection, the sensor and location data it sends is transmitted in clear text and could be read by anyone able to observe the network.

This payload encryption is not a replacement for HTTPS: your login and other traffic are only protected when the connection itself is encrypted. On either platform, use an HTTPS address whenever you can, and if you must use an HTTP address, restrict it to your home network with the **Most secure** connection security level.

:::note
If you reach your instance remotely through Home Assistant Cloud, your connection is encrypted and relayed by Nabu Casa's servers. That service is covered by the [Home Assistant Cloud privacy policy](https://www.nabucasa.com/privacy/).
:::

## Crash reporting and diagnostics

Two separate things can produce a crash report: the app itself and the store you installed it from. They are independent, and you control each one separately.

### Crash reports sent by the app ![Android](/assets/android.svg) {#crash-reporting}

This crash reporting is specific to the Android app. To help find and fix bugs, the `full` flavor of the Android app can send a report to [Sentry](https://sentry.io), the crash-reporting service the project uses, when the app crashes. This is the version distributed through the Play Store. The `minimal` flavor contains no crash reporting at all. For the difference between the two, see [Android flavors](../core/android-flavors.md).

Crash reporting is _enabled by default_ in the `full` flavor, and you can turn it off at any time under **Settings** > **Companion app** in the **Crash reporting** setting.

A crash report is limited to technical information about the app and the device. It includes:

- The app version and build.
- The device model, manufacturer, and Android version.
- The technical details of the crash itself, such as the stack trace.
- A short trail of recent app and system events leading up to the crash, to help reproduce it.
- An anonymous identifier generated by Sentry.

A crash report does _not_ include any personal or home information. It contains:

- No Home Assistant instance address or connection details.
- No access tokens, passwords, or other credentials.
- No content from your dashboards, entities, or notifications.
- No screenshots or capture of what was on screen.
- No email address or account name.

Connection problems are also never reported: errors such as a lost connection, a failed TLS handshake, or an unreachable host are ignored on purpose, since they describe your network rather than a bug in the app.

:::note
This is separate from the **Show and share logs** option used for troubleshooting, which you trigger yourself. Those device logs may contain sensitive details such as your Home Assistant instance address, so review them before sharing.
:::

### Crash and usage data collected by the app stores

Separately from the app, the store you installed it from can collect its own crash and basic usage information. This is controlled by an operating-system setting rather than by the app, it is handled by Google or Apple under their own privacy policies, and it applies to apps in general, not only to Home Assistant.

- ![Android](/assets/android.svg) If you installed from the Google Play Store and have turned on the device setting to share usage and diagnostics data, Google Play receives crash and _application not responding_ reports along with basic stability and usage statistics. Developers see only aggregated reports in the Play Console. You can change this in your device settings under **Google** > **Usage & diagnostics** (the exact location varies by device). The `minimal` flavor installed from F-Droid or GitHub is not distributed through Google Play and is not covered by this collection.
- ![iOS](/assets/iOS.svg) If you have turned on **Share With App Developers** under **Settings** > **Privacy & Security** > **Analytics & Improvements**, Apple shares aggregated crash and app-usage analytics with the developers through App Store Connect. Only data from users who opted in is included, and it is aggregated to avoid identifying individuals.

## Notifications

Push notifications are the one feature that routes message content outside your Home Assistant instance. To deliver them, the app uses Google's Firebase Cloud Messaging, so notification content passes through Google's servers, where it is not encrypted and could be processed by Google.

How you can avoid sending this data to Google depends on your platform:

- ![iOS](/assets/iOS.svg) You can opt out of Firebase in the app's privacy settings. Notifications will then stop working.
- ![Android](/assets/android.svg) The `full` flavor has no in-app Firebase opt-out. However, if you enable [Local Push](../notifications/local.md), notifications are delivered directly from your instance over a WebSocket connection, and Firebase is used only as a fallback when that connection is unavailable. To avoid Google entirely, use the `minimal` flavor (from F-Droid or GitHub), which always uses Local Push instead of Firebase.

For the full explanation and the rate limits, see [Privacy, rate limiting and security](../notifications/details.md).

## Sensors that use external services

Most sensors read information from your own device and send it only to your instance. A few need an outside service to do their job, and they only run if you choose to enable them:

- ![Android](/assets/android.svg) The public IP sensor (`sensor.public_ip`) asks a third-party service (ipify) to report your device's public IP address.
- The geocoded location sensor turns your coordinates into a readable address. On ![Android](/assets/android.svg) Android this uses the device's built-in geocoder, and on ![iOS](/assets/iOS.svg) iOS it uses Apple's Maps services.

See [Sensors](../core/sensors.md) for the full list and the details of each one.

## Letting an instance control your app and device ![Android](/assets/android.svg) {#letting-an-instance-control-your-app-and-device}

This setting is specific to the Android app. Each Home Assistant instance you connect to has a per-instance setting named **Remotely control app & device**, described in the app as _Allow this server to enable and manage sensors and send notification commands_. It decides whether that instance is allowed to reach back into the app and your device, rather than only receiving the data the app sends.

You can find it on Android under **Settings** > **Companion app** > **Server & devices**, by opening the settings for the instance you want to configure. It is _enabled by default_.

### When the setting is enabled (the default)

The instance is trusted, and it can:

- Enable and disable the app's sensors. If you enable or disable one of the app's sensor entities from within Home Assistant, the app applies that change on its next sync.
- Send notification commands that act on the app or device. These are [notification commands](../notifications/commands.md) that do more than show a message, such as toggling Do Not Disturb, changing the ringer mode or volume, controlling Bluetooth, turning the flashlight on, adjusting screen brightness, switching high-accuracy location mode, launching an app, or requesting a location update.

:::note
A sensor that needs a runtime permission, such as location or health data, can never be turned on by the instance alone. It always requires an action on the phone. Instead of enabling such a sensor, the app keeps it disabled and posts a notification asking you to grant the permission. Tapping that notification opens the sensor's settings page so you can allow it there. This prevents an instance from enabling a sensitive sensor without your consent.
:::

### When the setting is disabled

The instance is no longer trusted to change the app or the device. Two things follow:

- Your on-device choices win for sensors. Which sensors are enabled is then controlled only from within the app on your device. If you try to enable or disable a sensor for that instance from Home Assistant, the app overrides it back to match your on-device setting at the next sync. For example, if a sensor is enabled in the app and you disable it from the instance, the app re-registers the sensor and it becomes enabled again the next time the device syncs.
- App and device commands are ignored. Notification commands that would control the app or the device are rejected. Ordinary notifications, including text-to-speech and clearing notifications, keep working as usual.

Disable this setting for any instance you do not want to be able to change settings on your device, while still allowing the app to send it sensor and location data within the limits you set above.

## Removing your data and disconnecting

Because the app only sends data to your own instance, you can stop it and remove what was collected at any time:

- To stop sending data from a device, open that instance's settings in the app and turn off the location and sensor options described above, or remove the instance from the app entirely.
- To delete the data already stored, remove the app's device from Home Assistant. In Home Assistant, go to [**Settings** > **Devices & services**](https://my.home-assistant.io/redirect/integrations/), open the [Mobile App integration](https://www.home-assistant.io/integrations/mobile_app/) , and delete the device for that phone. This also revokes the access token the app was using.
- Uninstalling the app removes its data from your device.
