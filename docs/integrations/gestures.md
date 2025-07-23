---
title: "Gestures"
id: 'gestures'
---

![Android](/assets/android.svg) <span class='beta'>BETA</span>, ![iOS](/assets/iOS.svg)<br />
You can set up gestures for quick actions whenever you are using the main Home Assistant UI.

To view and change your gestures, go to [Settings](https://my.home-assistant.io/redirect/config/) > Companion app > Gestures. For each gesture, you can select from multiple actions or disable the gesture (by setting the action to "None").

:::info
For Android devices: if your device has gestures that work in any app, such as for screenshots, they may override Home Assistant gestures.
:::

## Available actions

 - **None**: Disable the gesture.

### Home Assistant

 - **Search entities**: Search for entities using the [Quick bar](https://www.home-assistant.io/docs/tools/quick-bar/) with an entities filter.
 - **Search devices**: Search for devices using the [Quick bar](https://www.home-assistant.io/docs/tools/quick-bar/) with a device filter.
 - **Search commands**: Search for commands using the [Quick bar](https://www.home-assistant.io/docs/tools/quick-bar/) command palette.
 - **Show sidebar**: Open the sidebar from any screen.
 - **Open Assist**: Open the [Assist](https://www.home-assistant.io/voice_control/) dialog.

### Navigation

 - **Go to previous page**: Go to the previous page, if available.
   - iOS only. On Android, you can use Android's back button or gesture.
 - **Go to next page**: Go to the next page, if available.
 - **Go to default dashboard**: Go to the default dashboard which has been set for your user.
   - Android only.
 - **Reload page**: Force the current page to reload.
   - Android only. On iOS, keep scrolling down when at the top of the page to force the current page to reload.

### Servers

 - **Servers list**: Show a list of all servers added to the app, to quickly switch between servers.
 - **Next server**: If you have multiple servers, active the next server in the list.
 - **Previous server**: If you have multiple servers, active the previous server in the list.

### App

 - **Open app settings**: Open the companion app settings (Settings > Companion app).
 - **Open app troubleshooting/Open debug**: Open the companion app's troubleshooting/debugging options (Settings > Companion app > Troubleshooting/Debugging).
