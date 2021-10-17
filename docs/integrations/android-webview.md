---
title: "Android WebView"
id: 'android-webview'
---


![Android](/assets/android.svg)

## Links

The ![Android](/assets/android.svg) Android app has the ability to intercept certain types of links to allow the user to directly launch another app found on the device (or take the user to install the app if not found). Users can also use the [Intent Scheme](https://developer.chrome.com/docs/multidevice/android/intents/#syntax) to perform any action that is supported by the app.

Examples using Lovelace entity card [weblink](https://www.home-assistant.io/lovelace/entities/#weblink):

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

## Swipe Gestures

The ![Android](/assets/android.svg) Android app has the ability to launch the [quick bar](https://www.home-assistant.io/docs/tools/quick-bar/) by detecting a 3 finger swipe down gesture. Initially the entity view will be shown to users and additional gestures will flip between the 2 quick bar views. The quick bar can be closed by simply pressing the back button. The quick bar can only be launched when inside the webview after you have logged in.

## Keep screen On
The ![Android](/assets/android.svg) Android app has the ability to keep screen on while webview activity is active by enabling corresponding setting in App Configuration. This lets your device’s screen stay on indefinitely and ignore the Android built-in Sleep settings.
&nbsp;<span class="beta">BETA</span> This feature may also be controlled by Notification command, [see details](https://companion.home-assistant.io/docs/notifications/notification-commands#screen-on).

## Autoplay Video
The ![Android](/assets/android.svg) &nbsp;<span class="beta">BETA</span> Android app has the ability to autoplay videos when you load the more info panel. Some devices may already do this by default but others may require this setting by enabling it in App Configuration. Enabling this setting may increase data usage unexpectedly, proceed with caution.
