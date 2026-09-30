---
title: "Controlling your home"
id: "controls"
---

![iOS](/assets/iOS.svg)

This page explains what happens when you select something on the CarPlay screen.

## Browsing your home

Two tabs let you find any supported entity without setting anything up in advance:

- **Areas**: select an area, such as **Garage**, then select an entity inside it. Areas with no compatible entities are not listed.
- **Control**: select a device type, such as **Light**, then select an entity. Covers are listed first, so garage doors and gates are quick to reach.

Every list shows the entity's current state under its name, such as **Open** or **Off**, and the icon changes with the state. Lists that do not fit on one screen have **Previous** and **Next** rows to page through them.

## Selecting an entity

What happens depends on the type of entity:

- **Lights, switches, covers, fans, humidifiers, valves, and input booleans** are toggled. A light that is on turns off; a closed garage door opens.
- **Scenes and scripts** are activated.
- **Automations** are triggered.
- **Buttons and input buttons** are pressed.
- **Locks** are locked or unlocked, depending on their current state.
- **Climate and vacuum entities** open their own control screen instead of running anything. See [Climate entities](#climate-entities-beta) and [Vacuum entities](#vacuum-entities-beta).

While the request is being sent, the row shows **Executing...**, then goes back to showing the entity's state.

## Confirmations

Some things are worth double-checking before they run.

- **Locks** always ask before locking or unlocking, and you cannot turn this off. This prevents an accidental tap from unlocking your front door.
- **Everything else** asks only if you turned on **Require confirmation** for that item. You can set this when adding an item from the car, or at any time from your iPhone. See [Configuration](configuration.md).

:::note
Confirmation applies to items in **Quick access** and custom tabs. Selecting an entity from the **Areas** or **Control** tab runs it straight away, except for locks, which always confirm.
:::

## Climate entities <span class="beta">BETA</span>

Selecting a climate entity, such as a thermostat or a heat pump, opens a control screen with the same options the Home Assistant dashboard offers. Only the options your device actually supports are shown.

- **Temperature**: the target temperature, with **Increase** and **Decrease** controls. The current temperature is shown underneath.
- **Heat to** and **Cool to**: for devices with a target range instead of a single temperature.
- **Modes**: change the operating **Mode**, such as **Heat**, **Cool**, or **Off**. Depending on the device, you may also see **Fan mode**, **Swing mode**, **Horizontal swing**, and **Preset**.
- **Humidity**: the target humidity, with **Increase** and **Decrease** controls.

The screen updates as the device reports its new state, so you can see the change take effect.

:::info
On iOS 26 and later, the **Increase** and **Decrease** controls are drawn as large tiles that are easier to hit while driving. On earlier versions they appear as list rows.
:::

## Vacuum entities <span class="beta">BETA</span>

Selecting a vacuum opens a control screen. As with climate entities, only the options your vacuum supports are shown.

- **Start** or **Pause**: start cleaning, or pause a run in progress.
- **Stop**: stop the current run.
- **Return to dock**: send the vacuum back to its base.
- **Locate**: make the vacuum play a sound so you can find it.
- **Clean areas**: pick which areas to clean.
- **Fan speed**: change the suction level.

The battery level is shown at the top of the screen.

### Cleaning specific areas

1. On the vacuum's control screen, select **Clean areas**.
2. Select each area you want cleaned. The order you select them in is the order they are cleaned, and each area shows its position in the queue.
3. Select **Start cleaning** to send the job.

:::note
If you see **No areas mapped**, your vacuum's segments have not been matched to Home Assistant areas yet. This is set up in Home Assistant, not in the app.
:::

## When something does not appear

Home Assistant deliberately hides some entities from CarPlay:

- Entities marked as hidden in Home Assistant.
- Entities categorized as configuration or diagnostic.
- Entities whose domain is not supported. See [What you can control](carplay.md#what-you-can-control).

If an entity you expect is missing for another reason, see [Troubleshooting](troubleshooting.md).
