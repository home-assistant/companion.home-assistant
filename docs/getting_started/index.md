---
title: Getting Started
id: getting-started
---

## Installation & System Requirements

The Home Assistant Companion App can be downloaded from the [iOS App Store](https://apps.apple.com/app/home-assistant/id1099568401) or [Play Store](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android). The iOS App requires iOS 10 or greater, this means the oldest devices supported are the iPhone 5, 4<sup>th</sup> generation iPad and the 6<sup>th</sup> generation iPod touch. The Android app has 2 separate flavors `full` or `minimal`. Both flavors require Android 5.0 or greater. The `full` flavor is the one offered via the Play Store and requires Google Play Services in order to function properly. More details on the differences between the 2 flavors can be found [here](../core/android-flavors.md).

You need to be running Home Assistant 0.104.0 or newer. The mobile apps requires the following integrations to be enabled in your Home Assistant instance, `configuration.yaml`:

- `default_config:`

If for some reason you have disabled `default_config:` make sure your `configuration.yaml` at least contains:

- `mobile_app:`
- `discovery:`

For some features the following integrations also need to be enabled:

- `cloud:` is used for securely connecting to your Home Assistant via Nabu Casa subscription via Remote UI and cloud webhooks
- `ios:` is used if you want advanced notifications like actionable notifications and categories ![iOS](/assets/iOS.svg)

## Setting Up

Providing your Home Assistant instance is correctly set up for [remote access](https://www.home-assistant.io/docs/configuration/remote/) you should be able set up the Companion App from any location. However, if you're connected to the same network as your Home Assistant it will automatically be detected during set up.

When you open the app for the first time you'll be guided through the process of connecting to your Home Assistant instance and granting the required permissions to integrate your phone with Home Assistant. One of the permissions requested is for location access, if this permission is denied then you will not get a `device_tracker` or any `sensor` entity created for the device.

![First onboarding screen](/assets/Onboarding_start.jpg)

After tapping "continue" on the first screen, the app will start checking your network for Home Assistant instances. If an instance is found, simply tap the instance and follow the prompts to connect and log in to your Home Assistant. If you are not connected to the same local network as your Home Assistant instance, tap "Enter Address Manually" and enter the address you use to remotely connect to your Home Assistant instance (using the [Home Assistant Cloud](https://www.nabucasa.com/config/remote/) Remote UI is recommended but not required).

Once you have connected and logged into your Home Assistant instance, you will be asked to grant permission for the app to work with your iOS device beyond basic browsing of your Home Assistant instance. You are not required to grant these permissions in order to use the app however they provide a much greater degree of integration between your device and Home Assistant. The permissions that are requested are:

- **Location:** Allows your device to provide location to Home Assistant, a `device_tracker` entity will be created which can be used in automations and conditions within Home Assistant. As mentioned above, due to changes in iOS 13, this permission is requested before logging into Home Assistant. For Android this permission is requested as part of the onboarding process when you first log in. If this permission is denied then `device_tracker` and `sensor` entities will not be created.
- **Motion & Pedometer:** ![iOS](/assets/iOS.svg) Allows Home Assistant to access pedometer data from your iOS device, this creates sensors for number of steps taken today, floors ascended and descended, distance walked today, and current activity. It does not provide any access to data held within the Health app or any other data beyond basic motion data from the device's motion chip.
- **Notifications:** Allows notifications to be sent to your device by Home Assistant. Along with normal notifications, Home Assistant can send Critical Notifications; these are intended for high-priority messages and will always play a sound even if the device is in silent mode ![iOS](/assets/iOS.svg). You will be asked to give permission for both notification types. Check for the ![Android](/assets/android.svg) Android logo to see what is currently supported on Android devices. You may need to restart Home Assistant once after logging in for the notification service call to register.

![Home assistant setting up the app](/assets/Onboarding_connecting.gif)

Once you have granted or denied permissions, the app will create the required connections to your Home Assistant instance and then take you to your Home Assistant home screen. Depending on the app version, you may see a "What's New" screen in between the end of setup and be taken to your home screen.

If you have difficulties completing setting up the app, please see the [troubleshooting guide](../troubleshooting/setup.md).

:::info
Remember to login using your credentials and not to use [Trusted Networks](https://www.home-assistant.io/docs/authentication/providers/#trusted-networks), if you have that enabled otherwise the app will only work on the trusted network.
:::

## Adding Additional Servers

![iOS](/assets/iOS.svg) or ![Android](/assets/android.svg)

:::note
Requires Home Assistant 2021.10 or newer.
:::

Once you have set up your first server, you can add additional Home Assistant instances via [Settings](https://my.home-assistant.io/redirect/config/) > Companion App and the "Add Server" option. Servers on the same local network as your device will be discovered and listed automatically or you can manually enter the address in the same way as setting up the first server.

## TLS Client Authentication

![Android](/assets/android.svg)

If your Home Assistant requires TLS Client Authentication (because it is behind a reverse proxy configured to perform TLS Client Authentication), the app will ask for a certificate. If no matching certificate is installed or supplied, you might see an error or a blank screen depending on your setup.

Please refer to your device and Android version documentation to install the certificate. Make sure to install the certificate as a "VPN & app user certificate". An example for Pixel phones is available here: [Add & remove certificates](https://support.google.com/pixelphone/answer/2844832?hl=en).

Wear OS does not support authentication with installed certificates. The app cannot transfer the certificate to the Wear OS app automatically, therefore you are asked to provide a certificate during the Wear OS app onboarding.
