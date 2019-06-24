---
title: Welcome
id: version-2.0.0-index
original_id: index
---

## Installation & System Requirements

The Home Assistant Companion App can be downloaded from the [App Store](https://apps.apple.com/app/home-assistant-companion/id1099568401). The App requires iOS 10 or greater, this means the oldest devices supported are the iPhone 5, 4<sup>th</sup> generation iPad and the 6<sup>th</sup> generation iPod touch.

To  provide the required integrations, the Home Assistant Companion App requires that your Home Assistant instance is running 0.95.0 or greater.

## Setting Up

Providing your Home Assistant instances is correctly set up for [remote access](https://www.home-assistant.io/docs/configuration/remote/) you should be able set up the Companion App from any location. However, if you're connected to the same network as your Home Assistant it will be automatically detected during set up.

When you open the app for the first time you'll be guided through the process of connecting to your Home Assistant instance and granting the required permissions to integrate your phone with Home Assistant.

![First onboarding screen](assets/Onboarding_start.jpg)

After tapping "continue" on the first screen, the app will start checking your network for Home Assistant instances. If an instance is found, simply tap the instance and follow to prompts to connect and log in to your Home Assistant. If you are not connected to the same local network as your Home Assistant instance, tap "Enter Address Manually" and enter the address you use to remotely connect to your Home Assistant instance (using the [Home Assistant Cloud](https://www.nabucasa.com/config/remote/) Remote UI is recommended but not required).

One you have connected and logged into your Home Assistant instance, you will be asked to grant permission for the app to work with your iOS device beyond basic browsing of you Home Assistant instance. You are not required to grant these permissions in order to use the app however they provide a much greater degree of integration between iOS and Home Assistant. The permissions that are requested are:
*   **Location:** Allows your iOS device to provide location to Home Assistant, a `device_tracker` entity will be created which can be used in automations and conditions within Home Assistant.
*   **Motion & Pedometer:** Allows Home Assistant to access pedometer data from your iOS device, this creates sensors for number of steps taken today, floors ascended and descended, distance walked today, and current activity. It does not provide any access to data held within the Health app or any other data beyond basic motion data from the device's motion chip.
*   **Notifications:** Allows notifications to be sent to your iOS device by Home Assistant. Along with normal notifications, Home Assistant can send Critical Notifications; these are intended for high-priority messages and will always play a sound even if the device is in silent mode. You will be asked to give permission for both notification types.

![Home assistant setting up the app](assets/Onboarding_connecting.gif)

Once you have granted or denied permissions, the app will create the required connections to your Home Assistant instance and then take you to your Home Assistant home screen. Depending on the app version, you may see a "What's New" screen in between the end of setup and be taken to your home screen.

If you have difficulties completing setting up the app, please see the [troubleshooting guide](../troubleshooting/setup.md).
