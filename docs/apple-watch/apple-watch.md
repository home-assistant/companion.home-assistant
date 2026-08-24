---
title: "Overview"
id: "apple-watch"
---

![iOS](/assets/iOS.svg)

The Home Assistant Apple Watch app lets you control your home from your wrist. You can turn lights on and off, adjust a thermostat, run scripts and scenes, browse the rooms in your home, talk to Assist, and show live sensor values on your watch face.

The Apple Watch app is part of the iOS Companion app. There is no separate download and no separate login: your servers, entities, and settings come from the Home Assistant app on your paired iPhone.

:::info
This page describes the rebuilt Apple Watch app <span class="beta">BETA</span> introduced in iOS app version 2026.8. If you are on an earlier version, some screens and options described here look different or are missing.
:::

## Requirements

Before you start, make sure you have:

- An iPhone running iOS 16.4 or later with the Home Assistant Companion app installed and connected to at least one Home Assistant server.
- An Apple Watch paired to that iPhone, running watchOS 9 or later. That means an Apple Watch Series 4 or newer, any Apple Watch SE, or any Apple Watch Ultra. You can identify your model on the [Apple Watch model support page](https://support.apple.com/HT204507).
- watchOS 10 or later if you want to use [complications](./complications.md) on your watch face. Complications are built with WidgetKit, which older versions of watchOS do not support.

:::note
An Apple Watch is not required to use Home Assistant, and nothing on this page affects the iPhone app.
:::

## What you can do

From the Home Assistant app on your Apple Watch, you can:

- **Run and control your entities.** Tap a light, switch, lock, cover, fan, valve, script, scene, or automation to run it. Lights, covers, fans, locks, climate entities, and vacuums also have their own control screen with sliders, buttons, and mode pickers. See [Home screen](./home.md).
- **Browse your home by area.** Open a room and see the entities in it, without adding each one by hand. See [Browsing areas](./home.md#browsing-areas).
- **Talk to Assist.** Start a voice or text conversation with your Home Assistant voice assistant. See [Using Assist](./home.md#using-assist).
- **Show information on your watch face.** Put an entity's state, a gauge, or a rendered template on your watch face as a complication. See [Complications](./complications.md).
- **Work without your iPhone nearby.** The watch keeps a local copy of your entities and talks to your Home Assistant server directly over Wi-Fi or a cellular connection. See [Watch settings and troubleshooting](./settings.md).

## Installing the watch app

The watch app installs together with the iPhone app.

1. Install the [Home Assistant Companion app](https://apps.apple.com/app/home-assistant/id1099568401) on your iPhone and connect it to your Home Assistant server.

2. On your iPhone, open the Apple **Watch** app.

3. Under **Available apps**, find **Home Assistant** and select **Install**. If automatic app installation is enabled, it may already be installed.

4. On your Apple Watch, open the Home Assistant app. The first launch syncs your servers and entities from your iPhone, so keep your iPhone nearby and unlocked.

## Where to configure things

Some settings live on your iPhone and some live on the watch itself.

**On your iPhone**, go to **Settings** > **Apple Watch & CarPlay**. You will find two entries:

- **Configuration**: what appears on the watch home screen — items, folders, layout, areas, and the Assist button. See [Home screen](./home.md).
- **Complications**: the complications you can add to your watch face. See [Complications](./complications.md).

**On your Apple Watch**, scroll to the bottom of the home screen and select the gear icon. From there you can review your servers, change the Assist pipeline and layout, check why a complication is not updating, and clear locally stored data. See [Watch settings and troubleshooting](./settings.md).

You can also add, remove, reorder, and edit items directly on the watch. See [Editing on the watch](./home.md#editing-on-the-watch).

## How the watch gets its data

Understanding this helps a lot when something looks out of date.

- **Your configuration and your entity list** are sent from your iPhone to the watch over the Apple Watch connection. This happens when you save changes, and when you open the watch app. Your iPhone needs to be nearby for a sync.
- **Live values** — the current state of a light, the reading of a sensor, the value in a complication — are fetched by the watch itself, directly from your Home Assistant server.
- **Actions you run** are also sent by the watch itself, directly to your Home Assistant server. They do not travel through your iPhone.

Because of this, the watch needs a URL it can reach for almost everything except syncing: your Home Assistant Cloud URL, another remote URL, or an internal URL on the same Wi-Fi network.

:::info
If your Home Assistant server is only reachable through an internal URL, the watch asks for permission before using it while connected through your iPhone. Until you allow it, that server's data does not sync and its complications do not update. See [Server URLs on the watch](./settings.md#server-urls).
:::

## Migrating from earlier versions

If you used the Apple Watch app before version 2026.8, note the following:

- Your existing home screen items, folders, and layout are kept.
- **iOS Actions are no longer available on the Apple Watch.** Actions were replaced by items you build from entities, scripts, and scenes. If you previously used iOS Actions on your watch, add the underlying script or scene as an item instead. See [Adding items](./home.md#adding-items).
- Complications you created with the older watchOS templates keep working and are shown under **Legacy complications**. They are drawn with the modern styles, so they may look different from before. See [Legacy complications](./complications.md#legacy-complications).
