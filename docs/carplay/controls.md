---
title: "Controlling your home"
id: "controls"
---

![iOS](/assets/iOS.svg)

This page explains what happens when you select something on the CarPlay screen.

## Browsing your home

Two tabs let you find any supported entity without setting anything up in advance:

- **Areas**: select an area, such as **Garage**, then select an entity inside it. Areas with no entities at all are not listed.
- **Control**: select a device type, such as **Light**, then select an entity. Covers are listed first, so garage doors and gates are quick to reach.

Inside each list, garage doors and gates come first, entities that are unavailable or in an unknown state come last, and everything else is sorted by name.

Under each entity's name, the list shows its current state, such as **Open** or **Off**, followed by its area. Scenes, scripts, and automations show only their area, because they have no state to show. Climate entities show their mode and target temperature, such as **Heat · 21.5°**.

The icon and its color change with the state, matching what you see in the Home Assistant dashboard. A light that is on shows its current color.

If a list does not fit on one screen, use the arrow buttons at the top of the screen to page through it.

## Selecting an entity

What happens depends on the type of entity:

- **Lights, switches, covers, fans, humidifiers, valves, and input booleans** are toggled. A light that is on turns off; a closed garage door opens.
- **Scenes and scripts** are activated.
- **Automations** are triggered.
- **Buttons and input buttons** are pressed.
- **Locks** are unlocked if they are locked, and locked if they are unlocked. A lock that is jammed, open, or unavailable is left as it is.
- **Climate and vacuum entities** open their own control screen instead of running anything. They show an arrow next to their name. See [Climate entities](#climate-entities) and [Vacuum entities](#vacuum-entities).

While the request is being sent, the row shows **Executing...**, then goes back to showing the entity's state. Selecting the row again while the request is still in progress does nothing, so a double tap does not run the action twice.

### If an action fails

If Home Assistant does not respond within 10 seconds, or the action fails, CarPlay shows an alert. Select **OK** to close it. The message tells you what went wrong:

- **Not connected to Home Assistant**: your iPhone cannot reach your server. Check that your phone has a connection. See [networking](../troubleshooting/networking.md).
- **Home Assistant didn't respond in time**: your server is reachable but did not answer within 10 seconds.
- **Home Assistant couldn't run that action**: your server returned an error, or the entity or server no longer exists.

## Confirmations

Some things are worth double-checking before they run.

- **Locks** always ask before locking or unlocking, and you cannot turn this off. This prevents an accidental tap from unlocking your front door. CarPlay asks, for example, **Are you sure you want to perform unlock action on Front door?**, and you select **Confirm** or **Cancel**.
- **Everything else** asks only if you turned on **Require confirmation** for that item. CarPlay then asks **Are you sure you want to run "Garage door"?** before running it. You can set this when adding an item from the car, when editing it from the car, or at any time from your iPhone. See [Configuration](configuration.md).

:::note
Confirmation applies to items in **Quick access** and custom tabs. Selecting an entity from the **Areas** or **Control** tab runs it straight away, except for locks, which always confirm.

Climate and vacuum entities open a control screen instead of running an action, so they have no confirmation setting.
:::

## Climate entities

Selecting a climate entity, such as a thermostat or a heat pump, opens a control screen with the same options as the entity's dialog in Home Assistant. Only the options your device actually supports are shown.

- **Temperature**: the target temperature, with controls to raise and lower it. The current temperature is shown underneath.
- **Heat to** and **Cool to**: for devices with a target range instead of a single temperature.
- **Modes**: change the operating **Mode**, such as **Heat**, **Cool**, or **Off**. Depending on the device, you may also see **Fan mode**, **Swing mode**, **Horizontal swing**, and **Preset**. Select one to see the list of options, with a check mark next to the current one.
- **Humidity**: the target humidity, with controls to raise and lower it in steps of 5%. The current humidity is shown underneath.

Your changes show on the screen straight away. If you select the raise or lower controls several times in a row, the app waits until you stop and then sends only the final value to Home Assistant. The screen then follows the state your device reports.

:::info
On iOS 26 and later, the raise and lower controls are drawn as tiles labeled **Decrease** and **Increase**. On earlier versions they appear as list rows, such as **Increase temperature** and **Decrease temperature**.
:::

## Vacuum entities

Selecting a vacuum opens a control screen. As with climate entities, only the options your vacuum supports are shown.

The first row shows the vacuum's current state. If your vacuum reports its battery level, it is shown there too, such as **Battery: 80%**.

- **Start** or **Pause**: start cleaning, or pause a run in progress. **Pause** is shown only while the vacuum is cleaning.
- **Stop**: stop the current run.
- **Return to dock**: send the vacuum back to its base.
- **Locate**: ask the vacuum to make itself known, usually by playing a sound, so you can find it.
- **Clean areas**: pick which areas to clean.
- **Fan speed**: change the suction level. The current speed is shown on the row.

### Cleaning specific areas

1. On the vacuum's control screen, select **Clean areas**.
2. Select each area you want cleaned. The order you select them in is the order they are cleaned, and each area shows its position, such as **Cleaning order: 2**. To remove an area, select it again.
3. Select **Start cleaning**. The button shows how many areas you selected, such as **Start cleaning (2)**, and only appears once you select at least one area.

The job is sent to the vacuum and CarPlay goes back to the control screen.

:::note
If you see **No areas mapped**, your vacuum's segments have not been matched to Home Assistant areas yet. This is set up in Home Assistant, not in the app.
:::

## When something does not appear

The app deliberately hides some entities from CarPlay:

- Entities marked as hidden in Home Assistant.
- Entities categorized as configuration or diagnostic.
- Entities whose domain is not supported. See [What you can control](carplay.md#what-you-can-control).

Because of this, an area or a device type can appear in the list but have nothing to show when you open it.

If an entity you expect is missing for another reason, see [Troubleshooting](troubleshooting.md).
