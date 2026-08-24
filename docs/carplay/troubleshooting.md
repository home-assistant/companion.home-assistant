---
title: "Troubleshooting"
id: "troubleshooting"
---

![iOS](/assets/iOS.svg)

This page covers the most common CarPlay problems and what to do about them.

## Home Assistant does not appear in CarPlay

- Make sure the Home Assistant app is installed on the iPhone you connect to the car.
- Make sure your iPhone runs iOS 16.4 or later.
- On some vehicles the CarPlay home screen has more than one page. Check the other pages.
- If your vehicle lets you rearrange CarPlay icons, Home Assistant may have been hidden. On your iPhone, go to iOS **Settings** > **General** > **CarPlay**, select your vehicle, and check that Home Assistant is included.

## The car says no servers are available

CarPlay uses the servers your iPhone is signed in to. If the car shows **No servers available. Add a server in the app.**, open the Home Assistant app on your iPhone and sign in to your server, then try again.

## Quick access is empty

The **Quick access** tab starts out empty on purpose, because you choose what goes in it. Add items from the car display, or from your iPhone. See [Configuration](configuration.md).

If you previously had items and they are gone, your iPhone may not have loaded its data. Force close the app and open it again. See [The lists are empty or out of date](#the-lists-are-empty-or-out-of-date).

## An entity is missing

Work through these in order:

1. Check that the entity's type is supported. Home Assistant only offers some types in CarPlay. See [What you can control](carplay.md#what-you-can-control).
2. In Home Assistant, check that the entity is not marked as hidden. Hidden entities are never shown in CarPlay.
3. In Home Assistant, check that the entity's category is not set to configuration or diagnostic. Those are never shown either.
4. Check that you are looking at the right server. The **Areas** and **Control** tabs only show the server selected under **Settings** > **Main server** in the car.
5. If the lists look out of date, force close the app. See [The lists are empty or out of date](#the-lists-are-empty-or-out-of-date).

## The lists are empty or out of date

CarPlay uses data your iPhone has already downloaded from your server. If that data did not load properly, closing the app and letting it start again usually fixes it.

1. On the car display, select **Settings** > **Troubleshooting**.
2. Select **Force close app**.
3. Open Home Assistant again from the CarPlay home screen.

:::info
**Force close app** closes the Home Assistant app right away so it starts fresh the next time you open it. Nothing is deleted, and your configuration is kept.
:::

## Assist responses are not audible

Some vehicles do not play spoken Assist responses when CarPlay streams the audio. If [Assist](assist.md) clearly works, showing **Processing...** and **Responding...**, but you hear nothing, change how the audio is played.

### From the car display

1. On the car display, select **Settings** > **Troubleshooting** > **Assist audio**.
2. Change **TTS Playback** from **Stream** to **Download and play**.

### From your iPhone

1. On your iPhone, go to **Settings** > **Apple Watch & CarPlay** > **CarPlay**.
2. Select **Troubleshooting**.
3. Change **TTS Playback** from **Stream** to **Download and play**.

:::note
Use **Download and play** only if **Stream** does not play audio reliably in your vehicle. **Stream** starts playing sooner, so it is the better choice when it works.
:::

You can also reach this advice from the car while an Assist session is open: select the question mark button to open **Audio Playback Help**.

## Assist is not offered when adding an item

- Assist and Assist prompts need iOS 26.4 or later. On older versions they are shown as **Assist (iOS 26.4+)** and **Assist prompt (iOS 26.4+)** and cannot be selected.
- Your Assist pipeline needs both speech-to-text and text-to-speech configured. Pipelines missing either one are not listed.

## Some tabs are missing from the car

CarPlay limits how many tabs a vehicle displays, and the limit depends on the vehicle. Tabs beyond that limit are not shown.

Reorder your tabs so the ones you use most come first: on your iPhone, go to **Settings** > **Apple Watch & CarPlay** > **CarPlay** > **Tabs**, then drag the tabs in the **Active** list.

## The Add item and Edit rows are gone <span class="beta">BETA</span>

The **Show Add and Edit buttons** setting is turned off. Turn it back on under **Settings** on the car display, or on your iPhone under **Settings** > **Apple Watch & CarPlay** > **CarPlay**.

## Starting over

If your setup is in a state you cannot untangle, you can delete it and build it again.

1. On your iPhone, go to **Settings** > **Apple Watch & CarPlay** > **CarPlay**.
2. Select **Reset configuration**.
3. Confirm.

:::warning
This deletes your tabs, your **Quick access** items, and your folders. It cannot be undone.
:::

## Still stuck

See [more help](../troubleshooting/more-help.md) for how to report a problem, or check the [iOS issue tracker](https://github.com/home-assistant/iOS/issues).
