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

CarPlay uses the servers your iPhone is signed in to. If the car shows **No servers available. Add a server in the app.**, open the Home Assistant app on your iPhone and sign in to your server. Then select **Already added** on the car display.

## Quick access is empty

The **Quick access** tab starts out empty on purpose, because you choose what goes in it. Add items from the car display, or from your iPhone. See [Configuration](configuration.md).

If the car shows **No Quick Access items** and there is no **Add item** button, the **Show Add and Edit buttons** setting is turned off. See [The add and edit buttons are missing](#the-add-and-edit-buttons-are-missing).

If your items are listed in the Home Assistant app under **Settings** > **Companion app** > **CarPlay** but the car shows none, force close the app and open it again. See [The lists are empty or out of date](#the-lists-are-empty-or-out-of-date).

## An entity is missing

Work through these in order:

1. Check that the entity's type is supported. Home Assistant only offers some types in CarPlay. See [What you can control](carplay.md#what-you-can-control).
2. In Home Assistant, check that the entity is not hidden, and that its category is not set to configuration or diagnostic. See [What you can control](carplay.md#what-you-can-control).
3. Check that you are looking at the right server. The **Areas** and **Control** tabs only show the server selected under **Settings** > **Main server** in the car.
4. If the lists look out of date, force close the app. See [The lists are empty or out of date](#the-lists-are-empty-or-out-of-date).

## The lists are empty or out of date

CarPlay uses data your iPhone has already downloaded from your server. If that data did not load properly, closing the app and letting it start again usually fixes it.

1. On the car display, select **Settings** > **Troubleshooting**.
2. Select **Force close app**.
3. Open Home Assistant again from the CarPlay home screen.

:::info
**Force close app** closes the Home Assistant app right away so it starts fresh the next time you open it. Nothing is deleted, and your configuration is kept.
:::

## An action fails or nothing happens

If CarPlay shows an alert such as **Not connected to Home Assistant** or **Home Assistant didn't respond in time** after you select an entity, your iPhone could not reach your server, or your server took longer than 10 seconds to answer. Check that your iPhone has a connection and can open Home Assistant. The original action may still run once the connection comes back, so check the entity's current state before you try again. See [If an action fails](controls.md#if-an-action-fails).

## Assist responses are not audible

Some vehicles do not play spoken Assist responses when CarPlay streams the audio. If [Assist](assist.md) clearly works, showing **Processing...** and **Responding...**, but you hear nothing, change how the audio is played.

### From the car display

1. On the car display, select **Settings** > **Troubleshooting** > **Assist audio**.
2. Select **Download and play**. A check mark shows the current choice.

### From your iPhone

1. In the Home Assistant app on your iPhone, go to **Settings** > **Companion app** > **CarPlay**.
2. Select **Troubleshooting**.
3. Change **TTS Playback** from **Stream** to **Download and play**.

:::note
Use **Download and play** only if **Stream** does not play audio reliably in your vehicle. **Stream** starts playing sooner, so it is the better choice when it works.

The app already switches to **Download and play** on its own if streaming does not start within 5 seconds, and it always uses it for servers that need a client certificate or a security exception. So change this setting when the response seems to play but you still cannot hear it.
:::

You can also reach this advice from the car while an Assist session is open: select the question mark button to open **Audio Playback Help**.

## Assist shows an error

If the Assist screen shows **Error**, see [If Assist shows an error](assist.md#if-assist-shows-an-error).

## Assist is not offered when adding an item

- Check that your iPhone and your Assist pipeline meet the [Assist requirements](assist.md#requirements).
- The car uses the pipelines your iPhone has already downloaded. If a new pipeline is missing, add it from your iPhone instead.

## Some tabs are missing from the car

CarPlay shows only as many tabs as your vehicle supports. Reorder your tabs so the ones you use most come first. See [Tabs](configuration.md#tabs).

## The add and edit buttons are missing

The **Show Add and Edit buttons** setting is turned off. To turn it back on, see [Add and edit buttons](configuration.md#add-and-edit-buttons).

## Starting over

If your setup is in a state you cannot untangle, you can delete it and build it again. See [Resetting your configuration](configuration.md#resetting-your-configuration).

## Still stuck

See [more help](../troubleshooting/more-help.md) for how to report a problem, or check the [iOS issue tracker](https://github.com/home-assistant/iOS/issues).
