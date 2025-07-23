---
title: "Android WebView"
id: 'android-webview'
---


![Android](/assets/android.svg)

## Autoplay Video
The ![Android](/assets/android.svg) Android app has the ability to autoplay videos when you load the more info panel. Some devices may already do this by default but others may require this setting by enabling it in [Settings](https://my.home-assistant.io/redirect/config/) > Companion App. Enabling this setting may increase data usage unexpectedly, proceed with caution.

## Always show first view on app start
The ![Android](/assets/android.svg) Android app has the ability to always open the first view of the users selected default dashboard on opening the app. The first view is the first tab on the Home Assistant header bar.

![First View](/assets/ha_first_view.png)

This is quite useful, if your first view contains all your important information about your smart home. If you then close the app on a different *not so important view* and sometime later open the app again, you will immediately see your important smart home information on the first view again.

:::caution
If you are in the Home Assistant configuration or the companion app configuration, then the first view of the dashboard is not shown when you open the app!
:::

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

## Screen orientation
The ![Android](/assets/android.svg) Android app has the ability to fix the webview landscape / portrait / system orientation by enabling corresponding setting in [Settings](https://my.home-assistant.io/redirect/config/) > Companion App.

## Pinch To Zoom
The ![Android](/assets/android.svg) Android app has the ability to enable Pinch-To-Zoom to allow multi-touch zoom by enabling corresponding setting in [Settings](https://my.home-assistant.io/redirect/config/) > Companion App. 

## Remote Debugging
The ![Android](/assets/android.svg) Android app has the ability to enable [Chrome remote debugging](https://developer.chrome.com/docs/devtools/remote-debugging/) to allow for easier troubleshooting of front end issues. You can enable this setting in [Settings](https://my.home-assistant.io/redirect/config/) > Companion App > Troubleshooting.
