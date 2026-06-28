---
title: "iOS Kiosk mode"
id: 'ios-kiosk-mode'
---

![iOS](/assets/iOS.svg)

:::info
Kiosk mode is a <span class="beta">LABS</span> feature in the iOS Companion app. Behavior and settings may still change as the feature evolves. Push notification commands are currently available in TestFlight only.
:::

Kiosk mode turns an iPhone or iPad into a dedicated Home Assistant display. It is designed for wall-mounted tablets, kitchen displays, bedside panels, and any setup where the device should stay on and show a single dashboard.

When kiosk mode is on, the app opens a chosen server and dashboard, can hide the Home Assistant sidebar and dashboard controls as well as the iOS status bar, keeps the screen awake, can reload the dashboard on a schedule, and shows a screensaver after a period of inactivity. A small, configurable button provides discreet access back to the kiosk settings, optionally protected by Face ID, Touch ID, or your device passcode.

:::info
Kiosk mode is iOS-only. Android users can achieve a similar setup with the [Home App (launcher)](android-home-app-launcher.md) feature.
:::

<p>
  <img alt="Kiosk mode settings showing the Enabled and Authentication toggles and the Display section" src="/assets/ios/kiosk-mode-settings.png" width="500" />
</p>

## Requirements

- An iPhone or iPad running 2026.7.0+ version of iOS or iPadOS.
- The Home Assistant Companion app with the Kiosk mode Labs feature.
- To hide the sidebar and top bar controls, a version of Home Assistant whose frontend supports kiosk mode.
- Face ID, Touch ID, or a device passcode set up on the device, if you want to require authentication to open the kiosk settings.

## Enabling kiosk mode

1. Open the Home Assistant app.
2. Go to **Settings** > **Kiosk mode**.
3. Turn on **Enabled**.

## Display

The **Display** section controls what is shown when the app opens in kiosk mode.

- **Server**: The Home Assistant server to display.
- **Dashboard**: The dashboard to open. Choose **Default** to open the server's default dashboard (the one Home Assistant would normally open for you).

The chosen server and dashboard are the ones shown whenever the app opens in kiosk mode.

## Authentication

Turn on **Authentication** to require Face ID, Touch ID, or your device passcode before the kiosk settings can be opened. With this on, the settings are covered by a lock screen until you authenticate, so others cannot change the configuration or leave kiosk mode.

## Customization

The **Customization** section controls how the kiosk behaves while it is running.

- **Keep screen on**: Prevents the device from auto-locking, so the screen stays on. When off, the device follows its normal Auto-Lock setting from iOS **Settings** > **Display & Brightness** > **Auto-Lock**.
- **Hide sidebar and top bar controls**: Hides the Home Assistant sidebar and the dashboard's edit, add, and search controls for a cleaner, read-only display. This relies on the Home Assistant frontend, so it requires 2025.2.0+ version of Home Assistant.
- **Hide status bar**: Hides the iOS status bar (time, battery, Wi-Fi indicator) at the top of the screen.
- **Auto reload**: Reloads the dashboard automatically on a schedule. Choose **Never** or an interval from 1 minute to 1 hour.
- **Screensaver**: Opens the screensaver settings (see [Screensaver](#screensaver) below).

:::note
On iPad, when the app is running in Split View or Slide Over, iOS does not allow apps to hide the status bar. Run Home Assistant full-screen for the most immersive kiosk experience.
:::

## Configuration access

Because kiosk mode hides the usual navigation, a small button is shown on top of the dashboard to get back to the kiosk settings.

- **Kiosk settings entry position**: Choose which corner the button appears in — **Top leading**, **Top trailing**, **Bottom leading**, or **Bottom trailing**.

Tapping the button opens the kiosk settings directly. If **Authentication** is on, you must authenticate with Face ID, Touch ID, or your device passcode first. You can also always reach the settings from **Settings** > **Kiosk mode**.

## Screensaver

After a period of inactivity, the screensaver replaces the dashboard with a lower-power display. Touching the screen wakes it back up to the dashboard.

In the **Screensaver** screen:

- **Enabled**: Turn the screensaver on or off.
- **Mode**: Choose what the screensaver shows:
  - **Clock**: A full-screen clock.
  - **Dim**: Keeps the dashboard visible but dimmed.
  - **Blank**: A black screen. The most power-efficient option, and the best choice for OLED displays.
- **Time to start**: How long the device must be untouched before the screensaver activates, from 30 seconds to 1 hour. Choose **Push notification controlled** to disable the inactivity timer entirely and only show or hide the screensaver through [remote commands](#remote-commands).
- **Dim level**: When **Mode** is set to **Dim**, controls how bright the screen stays.

When **Mode** is set to **Clock**, you can also adjust:

- **Clock style**: **Large**, **Medium**, or **Small**.
- **Show date**: Show the current date below the time.
- **Show seconds**: Show seconds on the clock.

Use the **Preview** button to see the screensaver full-screen with your current settings. Tap anywhere to return to the settings.

## Remote commands

While kiosk mode is running, you can control it from Home Assistant by sending a notification whose `message` is a kiosk command. This is useful for automations — for example, showing the screensaver at night, or bringing a camera up on a wall panel when motion is detected.

:::important
Kiosk commands are only handled while the Companion app is open and in the foreground — the normal state for a wall-mounted kiosk. They are ignored while the app is in the background or closed.
:::

The available commands are:

| `message` | Action |
| --------- | ------ |
| `kiosk_show_screensaver` | Show the screensaver immediately. |
| `kiosk_hide_screensaver` | Hide the screensaver and reset the inactivity timer. |
| `kiosk_show_camera` | Show a full-screen camera stream. Requires an `entity_id` pointing to a `camera.` entity. |
| `kiosk_hide_camera` | Hide the camera stream. |

```yaml
automation:
  - alias: Show the front door camera on the kiosk
    trigger:
      ...
    action:
      - action: notify.mobile_app_<your_device_id_here>
        data:
          message: "kiosk_show_camera"
          data:
            entity_id: "camera.front_door"
```

These commands are only acted on when **Accept kiosk remote commands** is enabled in the kiosk settings (on by default). Turn it off on any device that should ignore remote kiosk commands. See [Notification Commands](../notifications/commands.md) for the full list of supported commands.

## Disabling kiosk mode

1. Open the kiosk settings using either method:
   - Tap the configuration-access button in the corner you chose.
   - Go to **Settings** > **Kiosk mode**.
2. If **Authentication** is on, authenticate with Face ID, Touch ID, or your device passcode.
3. Turn off **Enabled**.

## Troubleshooting

### The sidebar or dashboard controls aren't hiding

- **Hide sidebar and top bar controls** depends on the Home Assistant frontend. Make sure your Home Assistant is 2025.2.0+ to support kiosk mode.

### The status bar isn't hiding

- iOS does not allow apps to hide the status bar when running in Split View or Slide Over. Make sure Home Assistant is running full-screen.
- Make sure **Hide status bar** is on in the **Customization** section.

### The screen still turns off

- Make sure **Keep screen on** is on. While it is on, kiosk mode overrides the system Auto-Lock setting.
- If the device is plugged in but still sleeping, check for any device management profiles or Screen Time limits that might be forcing the screen off.

### I can't find the way back to the settings

- The configuration-access button is shown in the corner selected by **Kiosk settings entry position**. If the screensaver is showing, tap once to wake the screen first, then tap the button.
- You can always open the settings from **Settings** > **Kiosk mode**.
