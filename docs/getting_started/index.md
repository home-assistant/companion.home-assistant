---
title: Welcome
id: index
---

Documentation for the Home Assistant Mobile Apps on iOS and Android

## Home Assistant Requirements

You need to be running Home Assistant 0.95.0 or newer. The companion apps require the following integrations to be enabled in your Home Assistant instance:
-   `default_config:`

If for some reason you have disabled `default_config:` make sure your `configuration.yaml` contains at least:
-   `mobile_app:`
-   `zeroconf:`

For some features the following integrations also need to be enabled:
-   `cloud:` is used for securely connecting to your Home Assistant via Nabu Casa subscription via Remote UI and cloud webhooks
-   `ios:` is used if you want advanced notifications like actionable notifications and categories

## Remote Access Requirements

Your Home Assistant instance needs to be correctly set up for remote access and needs to be able to access the web itself. Assuming you're already correctly set up for [remote access](https://www.home-assistant.io/docs/configuration/remote/) you should be able set up the Companion App from any location. If you're not we recommend checking out our [networking guide](https://companion.home-assistant.io/en/next/getting_started/networking) and following the advice there.
If you cannot set up remote access to your Home Assistant, we recommend you subscribe to Nabu Casa Cloud to have config-free remote access. If you do not have remote access or only have Nabu Casa Cloud, you need to do setup of the mobile apps from within your home network, where the apps will automatically detect your instance during setup.

## Setting Up

When you open the app for the first time you'll be guided through the process of connecting to your Home Assistant instance and granting the required permissions to integrate your phone with Home Assistant. This process is called "_onboarding_"

![First onboarding screen](assets/Onboarding_start.jpg)

After tapping "continue" on the first screen, the app will start checking your network for Home Assistant instances. If an instance is found, simply tap the instance and follow to prompts to connect and log in to your Home Assistant. If you are not connected to the same local network as your Home Assistant instance, tap "Enter Address Manually" and enter the address you use to remotely connect to your Home Assistant instance (using the [Home Assistant Cloud](https://www.nabucasa.com/config/remote/) Remote UI URL is not supported right now).

One you have connected and logged into your Home Assistant instance, you will be asked to grant permission for the app to work with your mobile device beyond basic browsing of you Home Assistant instance. You are not required to grant these permissions in order to use the app however they provide a much greater degree of integration between your mobile device and Home Assistant. The permissions that are requested are:
*   **Location:** Allows your device to provide location data to Home Assistant, a `device_tracker` entity will be created which can be used in automations and conditions within Home Assistant.
*   **Motion & Pedometer:** _iOS only:_ Allows Home Assistant to access pedometer data from your device, this creates sensors for number of steps taken today, floors ascended and descended, distance walked today, and current activity. It does not provide any access to data held within the Health app or any other data beyond basic motion data from the device's motion chip.
*   **Notifications:** Allows notifications to be sent to your device by Home Assistant. _iOS only:_ Along with normal notifications, Home Assistant can send Critical Notifications; these are intended for high-priority messages and will always play a sound even if the device is in silent mode. You will be asked to give permission for both notification types.

![Home assistant setting up the app](assets/Onboarding_connecting.gif)

Once you have granted, the app will create the required connections to your Home Assistant instance and then take you to your Home Assistant home screen. Depending on the app version, you may see a "What's New" screen in between the end of setup and be taken to your home screen.

If you have difficulties completing setting up the app, please see the [troubleshooting guide](../troubleshooting/setup.md).
