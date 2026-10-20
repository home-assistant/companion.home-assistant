---
title: "Gestures"
id: 'gestures'
---

![Android](/assets/android.svg), ![iOS](/assets/iOS.svg)<br />
You can set up gestures for quick actions whenever you are using the main Home Assistant UI.

To view and change your gestures, go to [Settings](https://my.home-assistant.io/redirect/config/) > Companion app > Gestures. For each gesture, you can select from multiple actions or disable the gesture (by setting the action to "None").

:::info
For Android devices: if your device has gestures that work in any app, such as for screenshots, they may override Home Assistant gestures.
:::

## One-finger edge swipes on iOS

![iOS](/assets/iOS.svg)You can configure one-finger swipes that start at the left or right edge of the Home Assistant page and move inward.

Go to [**Settings**](https://my.home-assistant.io/redirect/config/) > **Companion app** > **Gestures**. Under **Swipe right**, select **Using one finger** to change the action for an inward swipe from the left edge. Under **Swipe left**, select **Using one finger** to change the action for an inward swipe from the right edge. You can choose any of the [available actions](#available-actions), including **None** to disable the gesture.

By default, the left-edge swipe is set to **Show sidebar**, and the right-edge swipe is set to **None**. The selected action runs when you release the swipe.

## One-finger edge swipes on Android <span class='beta'>BETA</span>

![Android](/assets/android.svg)You can configure one-finger swipes that start at the left or right edge of the Home Assistant page and move inward. Both gestures are disabled by default, with their actions set to **None**.

To enable one, go to [**Settings**](https://my.home-assistant.io/redirect/config/) > **Companion app** > **Gestures**. Under **Swipe right** or **Swipe left**, select **Using one finger from the edge**, then choose one of the [available actions](#available-actions). For example, assign **Show sidebar** under **Swipe right** to open the Home Assistant sidebar with an inward swipe from the left edge. The selected action runs when you release the swipe.

Swipes that start away from the edges and vertical swipes do not trigger these one-finger gestures. Your existing two-finger and three-finger gestures keep working as configured.

Android's system Back gesture takes priority. If Android handles an edge swipe as Back, the app action does not run. These gestures do not override system navigation.

## Available actions

 - **None**: Disable the gesture.

### Home Assistant

 - **Quick search**: Search for anything using the [Quick search dialog](https://www.home-assistant.io/docs/tools/quick-search/).
 - **Search entities**: Search for entities using the [Quick search dialog](https://www.home-assistant.io/docs/tools/quick-search/) with an entities filter.
 - **Search devices**: Search for devices using the [Quick search dialog](https://www.home-assistant.io/docs/tools/quick-search/) with a device filter.
 - **Search commands**: Search for commands using the [Quick search dialog](https://www.home-assistant.io/docs/tools/quick-search/) command palette.
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
 - **Open page in browser**: Open the current page in your device's browser app. (Requires <span class='beta'>BETA</span>)

### Servers

 - **Servers list**: Show a list of all servers added to the app, to quickly switch between servers.
 - **Next server**: If you have multiple servers, active the next server in the list.
 - **Previous server**: If you have multiple servers, active the previous server in the list.

### App

 - **Open app settings**: Open the companion app settings (Settings > Companion app).
 - **Open app troubleshooting/Open debug**: Open the companion app's troubleshooting/debugging options (Settings > Companion app > Troubleshooting/Debugging).
