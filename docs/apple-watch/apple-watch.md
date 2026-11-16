---
title: "Overview"
id: "apple-watch"
---

![iOS](/assets/iOS.svg)The Apple Watch app works only with the Home Assistant app on an iPhone. It is not available with the ![Android](/assets/android.svg) Android app or the ![macOS](/assets/macOS.svg) macOS app. For watches paired with an Android phone, see [Wear OS](../wear-os/wear-os.md).

The Home Assistant Apple Watch app lets you control your home from your wrist. You can turn lights on and off, adjust a thermostat, run scripts and scenes, browse the rooms in your home, talk to Assist, and show sensor values on your watch face.

The Apple Watch app is part of the iOS Companion app. There is no separate download and no separate login: your servers, entities, and settings come from the Home Assistant app on your paired iPhone.

## Requirements

Before you start, make sure you have:

- An iPhone running iOS 16.4 or later with the Home Assistant Companion app installed and connected to at least one Home Assistant server.
- An Apple Watch paired to that iPhone, running watchOS 9 or later. That means an Apple Watch Series 4 or newer, any Apple Watch SE, or any Apple Watch Ultra. You can identify your model on the [Apple Watch model support page](https://support.apple.com/HT204507).
- watchOS 10 or later if you want to use [complications](./complications.md) on your watch face. The app's complications are not available on watchOS 9.

## What you can do

From the Home Assistant app on your Apple Watch, you can:

- **Run and control your entities.** Tap an automation, cover, fan, light, lock, scene, script, switch, or valve to run it. Climate entities, covers, fans, lights, locks, and vacuums also have their own control screen with sliders, buttons, and mode pickers. See [Home screen](./home.md).
- **Browse your home by area.** Open a room and see the entities in it, without adding each one by hand. See [Browsing areas](./home.md#browsing-areas).
- **Talk to Assist.** Start a voice or text conversation with your Home Assistant voice assistant, from the app, a complication, Control Center, or the Action button on Apple Watch Ultra. See [Using Assist](./home.md#using-assist).
- **Show information on your watch face.** Put an entity's state, a gauge, or a rendered template on your watch face as a complication. See [Complications](./complications.md).
- **Report your watch to Home Assistant.** The watch can appear in Home Assistant as its own device, with its battery level, battery state, and location. See [Sensors](./settings.md#sensors) and [Location](./settings.md#location).
- **Work without your iPhone nearby.** The watch keeps a local copy of your entities and can talk to your Home Assistant server directly over Wi-Fi or a cellular connection. See [Watch settings and troubleshooting](./settings.md).

## Installing the watch app

The watch app installs together with the iPhone app.

1. Install the [Home Assistant Companion app](https://apps.apple.com/app/home-assistant/id1099568401) on your iPhone and connect it to your Home Assistant server.

2. On your iPhone, open the Apple **Watch** app.

3. Under **Available apps**, find **Home Assistant** and select **Install**. If automatic app installation is enabled, it may already be installed.

4. On your Apple Watch, open the Home Assistant app. The first launch syncs your servers and entities from your iPhone, so keep your iPhone nearby and unlocked.

## Where to configure things

Some settings live on your iPhone and some live on the watch itself.

**On your iPhone**, open the Home Assistant app and go to **Settings** > **Companion app**. In the **Apple Watch & CarPlay** section, you will find two entries:

- **Configuration**: what appears on the watch home screen — items, folders, layout, areas, and the Assist button. See [Home screen](./home.md).
- **Complications**: the complications you can add to your watch face. See [Complications](./complications.md).

These two entries only appear when an Apple Watch is paired with your iPhone.

**On your Apple Watch**, scroll to the bottom of the home screen and select the gear icon. From there you can review your servers, change the Assist pipeline and layout, choose which sensors and location the watch reports, check why a complication is not updating, and clear locally stored data. See [Watch settings and troubleshooting](./settings.md).

You can also add, remove, reorder, and edit items directly on the watch. See [Editing on the watch](./home.md#editing-on-the-watch).

## How the watch gets its data

Understanding this helps a lot when something looks out of date.

- **Your configuration and your entity list** are sent from your iPhone to the watch over the Apple Watch connection. This happens when you save changes, and when you open the watch app. Your iPhone needs to be nearby for a sync.
- **Entity states** — whether a light is on, the reading of a sensor, the value in a complication — are requested by the watch from your Home Assistant server. Unlike the iPhone app, the watch cannot keep a live connection to your server, because watchOS restricts the kind of connection (a WebSocket) that Home Assistant uses to push changes as they happen. Instead, the watch asks for the current states every few seconds while a screen is open, and stops when you leave it. A change can therefore take a few seconds to appear on the watch.
- **Actions you run** are also requested by the watch.
- **Assist conversations** always go through your iPhone, so your iPhone needs to be reachable to use Assist on the watch.

When your iPhone is nearby and reachable, the watch hands its requests to your iPhone, which sends them to your server using the same URL the iPhone itself is using. At home, that is usually your internal URL. When your iPhone is not reachable, the watch sends the requests itself over Wi-Fi or a cellular connection.

Because of this, the watch needs a URL it can reach for everything it does on its own: your Home Assistant Cloud URL, another remote URL, or an internal URL on the same Wi-Fi network.

If your Home Assistant server only has an internal URL, see [Internal URLs](./settings.md#internal-urls).
