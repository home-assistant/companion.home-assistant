---
title: "iOS Kiosk mode"
id: 'ios-kiosk-mode'
---

![iOS](/assets/iOS.svg)

:::info
Kiosk mode is currently a <span class="beta">BETA</span> feature, available in beta builds of the iOS Companion app starting with version 2026.4.0. Behavior and settings may change before the feature reaches a stable release.
:::

Kiosk mode turns an iPhone or iPad into a dedicated Home Assistant display. It is designed for wall-mounted tablets, kitchen displays, bedside panels, and any setup where the device is meant to stay on and display a Home Assistant dashboard.

When kiosk mode is on, the app hides system UI for a more immersive look, prevents the screen from auto-locking, lets the kiosk control display brightness, and shows a screensaver after a period of inactivity. An optional camera-based wake feature can turn the screen back on as you approach. The companion app's own settings are reached through a secret exit gesture so they aren't easy to open by accident, and Face ID, Touch ID, or your device passcode can be required for extra protection.

:::info
Kiosk mode is iOS-only. Android users can achieve a similar setup with the [Home App (launcher)](android-home-app-launcher.md) feature.
:::

## Requirements

- An iPhone or iPad running iOS or iPadOS 15.0 or later.
- A beta build of the Home Assistant Companion app, version 2026.4.0 or later, available through TestFlight.
- Face ID, Touch ID, or a device passcode set up on the device, if you want to require authentication to change kiosk settings.
- For camera-based wake (optional), a device with a front-facing camera and the camera permission granted to Home Assistant.

<!-- TODO: Add screenshot of the kiosk settings overview screen -->

## Enabling kiosk mode

1. Open the Home Assistant app.
2. Go to **Settings** > **Kiosk Mode**.

   <!-- TODO: Add screenshot showing the Settings menu with Kiosk Mode highlighted -->

3. Turn on **Enable Kiosk Mode**.

   <!-- TODO: Add screenshot showing the Enable Kiosk Mode toggle -->

For best results, navigate to the dashboard you want the device to display before enabling kiosk mode. That dashboard remains visible when the screen wakes from the screensaver.

## What happens when kiosk mode is on

- The iOS status bar (clock, battery, signal) is hidden by default for a cleaner look.
- The device does not auto-lock, so the screen stays on.
- The kiosk can control display brightness.
- After a period of inactivity, the screensaver activates. Touching the screen wakes it.
- A secret exit gesture appears on the screen as a hidden corner tap target, providing a quick way to open kiosk settings without going through the Settings menu. If device authentication is enabled, Face ID, Touch ID, or your device passcode is required to open the settings.

## Security and exit options

The **Security & Display** section controls how kiosk settings are protected and how you get back to them.

### Device authentication

Turn on **Device Authentication** to require Face ID, Touch ID, or your device passcode before kiosk settings can be changed. With this setting on, even if someone discovers the secret exit gesture, they cannot exit kiosk mode or alter any settings without your biometrics or passcode.

### Secret exit gesture

The secret exit gesture is a quick way to open kiosk settings without using the Settings menu. By default, you tap the bottom-right corner three times in a row to bring up the settings.

You can configure:

- **Secret Exit Gesture**: Turn the gesture on or off.
- **Exit Gesture Corner**: Choose which screen corner to tap. Options are **Top Left**, **Top Right**, **Bottom Left**, and **Bottom Right**.
- **Taps Required**: Set how many taps in a row are needed to trigger the gesture.

A higher tap count makes accidental triggers less likely but takes a little longer to perform.

You can still reach kiosk settings through **Settings** > **Kiosk Mode** in the companion app's sidebar even when the secret gesture is off. The gesture is mostly useful when the device is mounted out of easy reach and you want a single-tap way back to the settings.

### Hide status bar

Turn off **Hide Status Bar** if you would rather see the iOS status bar (time, battery, Wi-Fi indicator) at the top of the screen during kiosk mode. It is hidden by default.

:::note
On iPad, when the app is running in Split View or Slide Over, iOS does not allow apps to hide the status bar. Run Home Assistant full-screen for the most immersive kiosk experience.
:::

### Prevent auto-lock

**Prevent Auto-Lock** stops iOS from turning the screen off after the system idle timeout. This is on by default and is what keeps the screen on all the time.

If you turn this off, your device will follow its normal Auto-Lock setting from iOS **Settings** > **Display & Brightness** > **Auto-Lock**.

## Brightness

The **Brightness** section lets the kiosk control how bright the display is.

- **Brightness Control**: Turn on to let kiosk mode set the brightness. Turn off to leave brightness control to iOS.
- **Manual Brightness**: When brightness control is on, choose the brightness level from 0 to 100 percent.

This is useful for wall tablets in a dark room, where the default iOS auto-brightness can make the display too bright at night.

## Screensaver

After a period of inactivity, the screensaver replaces the dashboard with a lower-power display. Touching the screen wakes it back up to the dashboard.

### Modes

In the **Screensaver** section, choose a **Mode**:

- **Clock**: Shows a full-screen clock. The look of the clock can be customized in the **Clock Display** section.
- **Dim**: Keeps the dashboard visible at a low brightness. Useful when you want to glance at the dashboard without fully waking the screen.
- **Blank**: Shows a black screen. The most power-efficient option, and the best choice for OLED displays.

### Timeout

**Timeout** sets how long the device must be untouched before the screensaver activates. The available values range from 30 seconds to 30 minutes.

### Dim level

When **Mode** is set to **Dim**, **Dim Level** controls how bright the display stays. Lower values save more power and are easier on the eyes at night.

### Pixel shift (OLED)

**Pixel Shift (OLED)** slightly moves the screensaver content over time to help prevent burn-in on OLED displays. Leave this on for OLED iPhones and iPads. There is no harm in leaving it on for LCD devices.

### Clock display options

When **Mode** is set to **Clock**, the **Clock Display** section lets you adjust the clock:

- **Clock Style**: Choose **Digital**, **Analog**, **Large**, or **Minimal**.
- **Show Seconds**: Display seconds on the digital clock styles.
- **Show Date**: Show the current date below the time.
- **24-Hour Format**: Switch between 12-hour and 24-hour time.

<!-- TODO: Add screenshots of the four clock styles side by side -->

## Camera detection

The **Camera Detection** section uses the device's front camera to wake the screen when someone approaches. This is useful for wall-mounted tablets where you want the dashboard to appear automatically as you walk up.

When **Motion Detection** is on, the kiosk uses the front camera at a low frame rate to look for movement in the camera's field of view. When motion is detected, the screen wakes from the screensaver.

### Enabling camera detection

1. In kiosk settings, scroll to the **Camera Detection** section.
2. Turn on **Motion Detection**.
3. The first time you turn it on, iOS asks for camera permission. Select **Allow**.
4. To make detected motion wake the screen automatically, also turn on **Wake on Motion**.

If you previously denied camera access, the app shows a **Camera Access Required** prompt with an **Open Settings** button that takes you to iOS Settings, where you can enable camera access for Home Assistant.

### Sensitivity

**Sensitivity** controls how much movement is needed to register as motion:

- **Low**: Requires a larger movement, such as walking past the device. Less likely to trigger from small changes like a curtain moving.
- **Medium**: A balanced default that works for most rooms.
- **High**: Triggers on small movements. Best for spaces where you want the screen to wake even when someone is just shifting in their seat nearby.

If the screen is waking too often, try a lower sensitivity. If approaches aren't detected, try a higher one.

### Privacy

- All camera frames are processed on the device. Nothing is sent to Home Assistant or to any other service.
- The camera is only active while kiosk mode is on and motion detection is enabled.
- Frames are analyzed at a low resolution and a low frame rate to keep power use down. They are not stored, recorded, or displayed anywhere in the app.

:::info
Motion detection runs entirely on the device. No video, image, or motion data leaves your device.
:::

## Disabling kiosk mode

1. Open kiosk settings using either method:
   - **Settings** > **Kiosk Mode** in the companion app's sidebar.
   - The secret exit gesture, if enabled. By default, tap the bottom-right corner three times.
2. If device authentication is on, authenticate with Face ID, Touch ID, or your device passcode.
3. Turn off **Enable Kiosk Mode**.

## Troubleshooting

### I can't get back to kiosk settings

- Open the companion app's sidebar and go to **Settings** > **Kiosk Mode**. This works whether or not the secret gesture is enabled.
- If you are using the secret gesture, tap the correct corner the required number of times in quick succession. By default, this is three taps in the bottom-right corner. The corner and tap count are configurable in kiosk settings.
- If device authentication is on, you must authenticate after opening kiosk settings. If Face ID or Touch ID isn't working, you can fall back to your device passcode.

### The status bar isn't hiding

- iOS does not allow apps to hide the status bar when running in Split View or Slide Over. Make sure Home Assistant is running full-screen.
- Make sure **Hide Status Bar** is on in the **Security & Display** section.

### The screen still turns off

- Make sure **Prevent Auto-Lock** is on. With this setting on, kiosk mode overrides the system Auto-Lock setting while kiosk mode is active.
- If the device is plugged in but still sleeping, check for any device management profiles or Screen Time limits that might be forcing the screen off.

### Camera detection isn't working

- Confirm camera permission is granted to Home Assistant in iOS **Settings** > **Home Assistant** > **Camera**.
- Try increasing **Sensitivity** to **High**.
- Make sure **Wake on Motion** is on if you want detected motion to wake the screen.
- The front camera must be unobstructed. Cases or stands that block the front camera prevent detection.

### Camera detection is too sensitive

- Lower **Sensitivity** to **Medium** or **Low**.
- If the camera is pointed at a window with moving curtains or a TV, point it somewhere with a steadier background.
