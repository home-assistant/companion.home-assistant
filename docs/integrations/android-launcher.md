---
title: "Android Home App Mode"
id: 'android-launcher'
---

![Android](/assets/android.svg)

The Home Assistant Companion app can be set as your device's default home app (launcher). This turns your Android device into a dedicated Home Assistant control panel, perfect for wall-mounted tablets or kiosks.

## What is home app mode?

A home app (also called a "launcher") is the app that appears when you press the home button. By setting Home Assistant as your home app, your device boots directly into Home Assistant, making it ideal for dedicated smart home control.

## Use cases

- **Wall-mounted tablets**: Create a dedicated control panel for your home
- **Kitchen displays**: Quick access to timers, shopping lists, and home controls
- **Bedside tablets**: Control lights, alarms, and media from your nightstand
- **Kiosk mode**: Set up a device for guests or family members with limited access
- **Digital signage**: Display dashboards, cameras, or information screens

## What to expect

When Home Assistant is your default home app:

- **No app drawer**: You won't see the usual list of installed apps when pressing the home button
- **No direct app launching**: You can't start other apps the traditional way
- **Home button**: Returns to Home Assistant (or refreshes if already open)
- **Back button**: When the navigation stack is empty, pressing back will refresh the app instead of doing nothing
- **Boot**: The device opens Home Assistant automatically after restarting

## How to enable home app mode

1. Open the Home Assistant app
2. Go to [**Settings**](https://my.home-assistant.io/redirect/config/) > **Companion App**
3. Scroll down to **Device home screen**
4. Enable **Use as Home app (launcher)**

    <img alt="Screenshot showing allow as home app" src="/assets/android/allow_as_home_app.png" width='400'/>

5. Click on **Change home app**, it is going to open the system screen that allow you to pick a home app

    <img alt="Screenshot showing choose a home app system screen" src="/assets/android/select_home_app.png" width='400'/>

## How to disable home app mode

If you want to switch back to your regular home app:

1. Open the Home Assistant app
2. Go to [**Settings**](https://my.home-assistant.io/redirect/config/) > **Companion App**
3. Scroll down to **Device home screen**
4. Click on **Change home app**, it is going to open the system screen that allow you to pick another home app than Home Assistant

    <img alt="Screenshot showing choose a home app system screen" src="/assets/android/select_home_app.png" width='400'/>

## Useful features/settings for kiosk setups

For the best kiosk or wall tablet experience, consider these additional settings:

### Local push

Enable [local push](/docs/notifications/notification-local) to always be connected through the websocket and not being limited by the number of notification/commands you can send to the device.

### Keep screen on

Go to [**Settings**](https://my.home-assistant.io/redirect/config/) > **Companion App** > **Other Settings** and enable **Keep screen on** to prevent the screen from turning off.

### Kiosk mode dashboard

Create a streamlined experience by setting up a dedicated dashboard:

1. **Create a dashboard** in Home Assistant with only the controls needed for that location
2. **Set it as default** for the device user in [**Settings**](https://my.home-assistant.io/redirect/config/) > **Dashboards** > select your dashboard > **Set as default on this device**

:::tip
Create a dedicated Home Assistant user for each kiosk device. This allows you to set different default dashboards per device.
:::

## Troubleshooting

### I can't access other apps

Since there's no app drawer, you need to access apps through Android settings:

1. Swipe down from the top of the screen to open the notification shade
2. Tap the **settings gear** icon
3. Go to **Apps** and select the app you want to open
4. Tap **Open** to launch it

### I want to launch apps from my dashboard

You can use [notification commands](/docs/notifications/notification-commands) to launch apps directly from your Home Assistant dashboard. This is useful for creating buttons that open specific apps like a camera viewer or music player.
