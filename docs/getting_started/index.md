---
title: Getting Started
id: getting-started
---

## Installation & System Requirements

The Home Assistant Companion App can be downloaded from the [iOS App Store](https://apps.apple.com/app/home-assistant-companion/id1099568401) or [Play Store](https://play.google.com/store/apps/details?id=io.homeassistant.companion.android). The iOS App requires iOS 10 or greater, this means the oldest devices supported are the iPhone 5, 4<sup>th</sup> generation iPad and the 6<sup>th</sup> generation iPod touch.  The Android app has 2 separate flavors `full` or `minimal`. Both flavors require Android 5.0 or greater. The `full` flavor is the one offered via the Play Store and requires Google Play Services in order to function properly. More details on the differences between the 2 flavors can be found [here](../core/android-flavors.md).

You need to be running Home Assistant 0.104.0 or newer. The mobile apps requires the following integrations to be enabled in your Home Assistant instance:
-   `default_config:`

If for some reason you have disabled `default_config:` make sure your `configuration.yaml` contains at least:
-   `mobile_app:`
-   `discovery:`

For some features the following integrations also need to be enabled:
-   `cloud:` is used for securely connecting to your Home Assistant via Nabu Casa subscription via Remote UI and cloud webhooks
-   `ios:` is used if you want advanced notifications like actionable notifications and categories <img class='OSlogo' src='/assets/apple.svg' alt='Apple logo' />

## Setting Up

Providing your Home Assistant instances is correctly set up for [remote access](https://www.home-assistant.io/docs/configuration/remote/) you should be able set up the Companion App from any location. However, if you're connected to the same network as your Home Assistant it will be automatically detected during set up.

When you open the app for the first time you'll be guided through the process of connecting to your Home Assistant instance and granting the required permissions to integrate your phone with Home Assistant. One of the permissions requested is for location access, if this permission is denied then you will not get a `device_tracker` or any `sensor` entity created for the device.

![First onboarding screen](/assets/Onboarding_start.jpg)

After tapping "continue" on the first screen, the app will start checking your network for Home Assistant instances. If an instance is found, simply tap the instance and follow to prompts to connect and log in to your Home Assistant. If you are not connected to the same local network as your Home Assistant instance, tap "Enter Address Manually" and enter the address you use to remotely connect to your Home Assistant instance (using the [Home Assistant Cloud](https://www.nabucasa.com/config/remote/) Remote UI is recommended but not required).

One you have connected and logged into your Home Assistant instance, you will be asked to grant permission for the app to work with your iOS device beyond basic browsing of you Home Assistant instance. You are not required to grant these permissions in order to use the app however they provide a much greater degree of integration between your device and Home Assistant. The permissions that are requested are:
*   **Location:** Allows your device to provide location to Home Assistant, a `device_tracker` entity will be created which can be used in automations and conditions within Home Assistant. As mentioned above, due to changes in iOS 13, this permission is requested before logging into Home Assistant.  For Android this permission is requested as part of the onboarding process when you first log in. If this permission is denied then `device_tracker` and `sensor` entities will not be created.
*   **Motion & Pedometer:** <img class='OSlogo' src='/assets/apple.svg' alt='Apple logo' /> Allows Home Assistant to access pedometer data from your iOS device, this creates sensors for number of steps taken today, floors ascended and descended, distance walked today, and current activity. It does not provide any access to data held within the Health app or any other data beyond basic motion data from the device's motion chip.
*   **Notifications:** Allows notifications to be sent to your device by Home Assistant. Along with normal notifications, Home Assistant can send Critical Notifications; these are intended for high-priority messages and will always play a sound even if the device is in silent mode <img class='OSlogo' src='/assets/apple.svg' alt='Apple logo' />. You will be asked to give permission for both notification types.  Check for the <img class='OSlogo' src='/assets/android.svg' alt='Android logo' /> Android logo to see what is currently supported on Android devices.  You may need to restart Home Assistant once after logging in for the notification service call to register.

![Home assistant setting up the app](/assets/Onboarding_connecting.gif)

Once you have granted or denied permissions, the app will create the required connections to your Home Assistant instance and then take you to your Home Assistant home screen. Depending on the app version, you may see a "What's New" screen in between the end of setup and be taken to your home screen.

If you have difficulties completing setting up the app, please see the [troubleshooting guide](../troubleshooting/setup.md).
