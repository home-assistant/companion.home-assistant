---
title: "Android WebView"
id: 'android-webview'
---


![Android](/assets/android.svg)

## Autoplay Video
The ![Android](/assets/android.svg) Android app has the ability to autoplay videos when you load the more info panel. Some devices may already do this by default but others may require this setting by enabling it in [Settings](https://my.home-assistant.io/redirect/config/) > Companion App. Enabling this setting may increase data usage unexpectedly, proceed with caution.

## Keep screen On
The ![Android](/assets/android.svg) Android app has the ability to keep screen on while webview activity is active by enabling corresponding setting in [Settings](https://my.home-assistant.io/redirect/config/) > Companion App. This lets your device’s screen stay on indefinitely and ignore the Android built-in Sleep settings.

This feature may also be controlled by Notification command, [see details](https://companion.home-assistant.io/docs/notifications/notification-commands#screen-on).

## Links

The ![Android](/assets/android.svg) Android app has the ability to intercept certain types of links to allow the user to directly launch another app found on the device (or take the user to install the app if not found). Users can also use the [Intent Scheme](https://developer.chrome.com/docs/multidevice/android/intents/#syntax) to perform any action that is supported by the app.

Examples using Lovelace entity card [weblink](https://www.home-assistant.io/dashboards/entities/#weblink):

This example will launch Twitter if it is installed on the device, otherwise it will open the Google Play store app or website.
```yaml
- type: weblink
  name: Twitter
  url: "app://com.twitter.android"
```

This example will launch the barcode scanning app ready to scan via the Intent scheme, if the app is not installed the user will be directed to installing it.
```yaml
- type: weblink
  name: Scan
  url: "intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;end"
```

## Pinch To Zoom
The ![Android](/assets/android.svg) Android app has the ability to enable Pinch-To-Zoom to allow multi-touch zoom by enabling corresponding setting in [Settings](https://my.home-assistant.io/redirect/config/) > Companion App. 

## Remote Debugging
The ![Android](/assets/android.svg) Android app has the ability to enable [chrome remote debugging](https://developer.chrome.com/docs/devtools/remote-debugging/) to allow for easier troubleshooting of front end issues. You can enable this setting in [Settings](https://my.home-assistant.io/redirect/config/) > Companion App.

## Swipe Gestures

The ![Android](/assets/android.svg) Android app has the ability to launch the [quick bar](https://www.home-assistant.io/docs/tools/quick-bar/) by detecting a 3 finger swipe down gesture. Initially the entity filter will be shown, you can switch to the command palette by typing `>` at the start of the input. The quick bar can only be launched when inside the webview after you have logged in.

:::caution
The swipe gestures were broken from Home Assistant core 2022.7.0 till Home Assistant Core 2022.9.0. Please update to Home Assistant core 2022.10.0 or later
:::
