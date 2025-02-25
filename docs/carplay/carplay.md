---
title: "Overview"
id: "carplay"
---

![iOS](/assets/iOS.svg)

Home Assistant offers a CarPlay experience. This will allow you to interact with various entities safely while driving your vehicle.

### Setup

In order to use this integration you will need an iPhone as well as a vehicle with a head unit that supports CarPlay. Once you are signed in with your iPhone, you should be all set to use the Home Assistant icon on the CarPlay home screen.

By default you won't see any relevant information in CarPlay, you need to open ***Companion App Settings → CarPlay***, and create your configuration. You can choose what tabs to display.

### Tabs

CarPlay has 4 tabs:

- **Quick Access:** In your CarPlay configuration, you can decide what entities to display on the **Quick access** tab.

- **Areas:** Brings easy access to your entities from the area in your home.
- **Control:** Let's you access entities grouped by their domain.
- **Servers:** Allows you to switch between servers.

![CarPlay](/assets/ios/CarPlay.png)

### Supported Actionable Domains

- `button`
- `cover`
- `input_boolean`
- `input_button`
- `light`
- `lock`
- `scene`
- `script`
- `switch`
