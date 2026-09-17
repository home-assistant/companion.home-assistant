---
title: "Overview"
id: "carplay"
---

![iOS](/assets/iOS.svg)

Apple CarPlay shows apps from your iPhone on your vehicle's built-in display. The Home Assistant app supports CarPlay, so you can check and control your home from the car screen without picking up your phone.

With Home Assistant in CarPlay you can:

- Open the doors, turn on the lights, run a scene, or lock up from a shortcut list you build yourself.
- Browse your home by area, or by the type of device you want to control.
- Talk to [Assist](assist.md), the Home Assistant voice assistant, and hear the answer through your car speakers.
- Change what the CarPlay screens show, directly from the car display.

![CarPlay](/assets/ios/CarPlay.png)

## Requirements

- An iPhone running iOS 16.4 or later, with the Home Assistant app installed and connected to at least one Home Assistant server.
- A vehicle or aftermarket head unit that supports CarPlay.

Some features need a newer version of iOS. Those requirements are listed where the feature is described.

:::info
CarPlay does not have its own connection to Home Assistant. Your iPhone does the work and sends the screens to the car, so your phone must be able to reach your server, either on your home network or from outside your home. If you cannot reach your home while away, see [networking](../troubleshooting/networking.md).
:::

## Setting up CarPlay for the first time

1. Connect your iPhone to your vehicle, either with a cable or wirelessly, depending on what your vehicle supports.

2. On the CarPlay home screen, select the **Home Assistant** icon.

3. The first time you open it, the **Quick access** tab is empty, because you decide what goes there.

   To fill it, either add items directly from the car display, or set it up on your iPhone. See [Configuration](configuration.md).

:::note
If the app cannot find a server, CarPlay shows an alert instead of your entities. Open the Home Assistant app on your iPhone, make sure you are signed in to a server, and try again. See [Troubleshooting](troubleshooting.md).
:::

## The CarPlay tabs

CarPlay shows Home Assistant as a set of tabs along the top or side of the car display, depending on your vehicle. You choose which tabs appear and in which order.

- **Quick access**: your own shortcut list. You decide which entities, [Assist](assist.md) pipelines, and Assist prompts appear here, so the things you use while driving are one tap away. This is the tab most people rely on.
- **Areas**: your home grouped by area, such as **Garage** or **Kitchen**. Select an area to see the entities in it. Areas without any compatible entities are not shown.
- **Control**: your home grouped by the type of device, such as **Cover**, **Light**, or **Lock**. Covers are listed first, so garage doors are quick to reach.
- **Settings**: change your CarPlay setup from the car, pick which server to show, and open the troubleshooting options. See [Configuration](configuration.md).

To begin with, **Quick access**, **Areas**, and **Settings** are shown. **Control** is available but turned off, so add it if you want it. See [Configuration](configuration.md).

### Custom tabs <span class="beta">BETA</span>

Besides the built-in tabs, you can create your own tabs and fill them with the entities you choose. A custom tab is useful when **Quick access** gets long. For example, you could have a **Garage** tab and a **Lights** tab. See [Folders and custom tabs](configuration.md#folders-and-custom-tabs).

:::note
CarPlay limits how many tabs a vehicle displays, and the limit depends on the vehicle. If you add more tabs than your vehicle can show, the extra tabs are not displayed.
:::

## What you can control

Home Assistant only shows entities in CarPlay that make sense to use while driving. Entities marked as hidden in Home Assistant, and entities categorized as configuration or diagnostic, are never shown.

:::info
An _entity_ is a single thing Home Assistant knows about, such as one light, one lock, or one garage door. A _domain_ is the type of that thing, such as `light` or `lock`. To learn more, see [entities](https://www.home-assistant.io/docs/configuration/entities_domains/) in the Home Assistant documentation.
:::

These domains are available in CarPlay:

- `automation`
- `button`
- `cover`
- `fan`
- `humidifier`
- `input_boolean`
- `input_button`
- `light`
- `lock`
- `scene`
- `script`
- `switch`
- `valve`

The following domains are also available, and open their own control screen instead of running an action when you select them:

- `climate` <span class="beta">BETA</span>
- `vacuum` <span class="beta">BETA</span>

For what happens when you select an entity, and for the climate and vacuum control screens, see [Controlling your home](controls.md).

## Next steps

- [Configuration](configuration.md): choose your tabs, build your **Quick access** list, and change your setup from the car display.
- [Controlling your home](controls.md): what happens when you select an entity, confirmations, and the climate and vacuum control screens.
- [Assist](assist.md): use the Home Assistant voice assistant while driving.
- [Troubleshooting](troubleshooting.md): fix missing entities, silent voice responses, and other problems.
