---
title: "Home screen"
id: "home"
---

![iOS](/assets/iOS.svg)

The home screen is what you see when you open the Home Assistant app on your Apple Watch. It shows the items you chose, the areas of your home, and a button to start Assist.

:::info
This page describes the rebuilt Apple Watch app <span class="beta">BETA</span> introduced in iOS app version 2026.8.
:::

## What the home screen shows

From top to bottom:

- A header with a **reload** button on the left, the sync status in the middle, and the **Assist** button on the right. If you turned Assist off, the right button becomes an **add** button instead.
- Your **items**: the entities, scripts, scenes, automations, folders, and complications you added.
- Your **areas**, so you can browse rooms without adding each entity by hand. You can hide this.
- A footer with the app version, an **edit** button, and a **settings** button. See [Watch settings and troubleshooting](./settings.md).

## Adding items

You can build your home screen from your iPhone or from the watch itself. The iPhone offers every item type; the watch offers the most common ones.

### From your iPhone

1. On your iPhone, open the Home Assistant app and go to **Settings** > **Apple Watch & CarPlay** > **Configuration**.

2. Under **Items**, select **Add item**.

3. Choose what to add:

   - **Entity**: any light, switch, lock, cover, fan, valve, humidifier, climate entity, vacuum, sensor, binary sensor, script, scene, automation, button, or input helper.
   - **Area**: an entry that opens one room's entities.
   - **Folder**: a group you can put other items into.
   - **Assist**: starts a conversation with a specific Assist pipeline.
   - **Assist prompt**: sends a fixed sentence to Assist, such as `Good night`.
   - **Complication**: shows one of your rectangular complications inline in the list. See [Complications](./complications.md).

4. Select **Save**.

5. On your Apple Watch, select the reload button in the header to pull in the change. Keep your iPhone nearby.

### On the watch

1. On your Apple Watch, select **Add**. You will find it as a row at the bottom of your item list, or as the button in the top-right corner of the header when the Assist button is hidden.

2. Choose **Entity**, **Area**, **Complication**, or **Folder**.

3. If you have more than one server, choose the server.

4. Pick what you want to add. You can search, and you can filter entities by domain or by area.

5. Optionally change the name and icon, then confirm.

Changes you make on the watch are applied immediately, and are sent to your iPhone the next time it is reachable.

:::note
If you edit your configuration on both devices while they are apart, the watch asks which version to keep the next time they sync. Choose **Keep Watch Changes** or **Use iPhone**.
:::

## Customizing an item

Select an existing item to change how it looks and what it does.

- **Name**: the text shown under or next to the icon.
- **Icon**: any icon from the [Material Design Icons](https://pictogrammers.com/library/mdi/) set. Leave it unset to use the entity's own icon.
- **Icon color**, and optionally a custom **background color** and **text color**.
- **Ask before running**: shows a confirmation before the action runs. Useful for anything you do not want to trigger by accident.
- **On tap**: what happens when you tap the item.

The **On tap** options are:

- **Default**: runs the entity's usual action. A light toggles, a script runs, a scene activates.
- **More info dialog**: opens the entity's details, showing its state, when it last changed, and its attributes.
- **Navigate**: opens a path in the Home Assistant app on your iPhone.
- **Run script**: runs a script you choose instead of the entity's own action.
- **Assist**: starts an Assist conversation, optionally listening right away.
- **Nothing**: does nothing when tapped. Useful for items you only want to read.

:::note
Locks always ask for confirmation before opening, so **Ask before running** has no additional effect on them.
:::

## Editing on the watch

You do not need your iPhone to rearrange your watch home screen.

1. Scroll to the bottom of the home screen and select the pencil icon.

2. Each item now shows up and down arrows. Use them to move the item, or swipe an item to delete it.

3. Select an item to change its name or icon.

4. Select **Done** — the checkmark in the header or at the bottom of the list — when you are finished.

Reordering is saved when you select **Done**. The area rows and the **Add** row are hidden while you edit.

## Folders

Folders group items together, so a long list becomes a few tidy rows.

- Create a folder from your iPhone under **Settings** > **Apple Watch & CarPlay** > **Configuration** > **Add item** > **Folder**, or on the watch through **Add** > **Folder**. On the watch, folders can only be created at the top level.
- Give the folder a name, an icon, and a color.
- Add items into it the same way you add them to the home screen.

Folders do not nest: a folder cannot contain another folder.

## Browsing areas

The home screen lists the areas of your home below your items, so you can reach an entity you never added.

Selecting an area shows its entities in two groups:

- **Controls**: everything you can act on, ordered by how commonly it is used — lights, switches, locks, covers, climate entities, fans, and vacuums first.
- **Sensors**: read-only entities. Selecting one opens its details.

Entities are also grouped by device, so a device with several entities gets its own section. Select a device's section header to see all of that device's entities.

Areas with nothing the watch can show are left out, and entities hidden in Home Assistant do not appear.

To hide the area rows, go to **Settings** > **Apple Watch & CarPlay** > **Configuration** on your iPhone and turn on **Hide areas in home**.

## Controlling entities

Most items run their action as soon as you tap them. Some entities open a control screen instead, with the same options the Home Assistant web interface offers.

- **Lights**: power, brightness, color, and color temperature.
- **Covers**: open, stop, close, and position.
- **Fans**: power and speed.
- **Locks**: lock, unlock, and open. Locks never toggle on a single tap, and opening always asks for confirmation.
- **Climate**: target temperature, target humidity, and the HVAC, fan, swing, and preset modes.
- **Vacuums**: start, pause, stop, return to dock, fan speed, and cleaning a specific area.

In the area lists, these entities use a split row: tapping the left part runs the entity's main action, and tapping the right part opens the control screen.

Sensors and binary sensors are read-only. Tapping one opens a details screen with its state, when it last changed and last updated, and its attributes.

:::note
The list above is only about control screens. Everything else the watch supports — switches, valves, scripts, scenes, automations, buttons, and input helpers — still runs on a single tap, it just has no extra screen. Entity types the watch does not support at all cannot be added, and if you reach one the app tells you so.
:::

## Choosing a layout

The home screen can show your items as a list or as a grid.

1. On your iPhone, go to **Settings** > **Apple Watch & CarPlay** > **Configuration**.
2. Under **Layout**, choose **List** or **Grid**.

The grid layout only shows icons, so give your items recognizable icons if you use it. You can also change the layout from the watch's own settings screen.

## Using Assist

[Assist](https://www.home-assistant.io/voice_control/) is Home Assistant's voice assistant. On the watch you can talk to it or type to it.

To show the Assist button in the header:

1. On your iPhone, go to **Settings** > **Apple Watch & CarPlay** > **Configuration**.
2. Turn on **Show Assist**.
3. Choose the server and the pipeline the button should use.

To run a different pipeline, or to send a fixed sentence, add an **Assist** or **Assist prompt** item to your home screen instead of using the header button.

You can also change the pipeline the header button uses directly on the watch, under **Settings** > **Assist**. If no pipelines are listed yet, keep your iPhone nearby and select **Reload**.

## When something does not appear

- **A change you made on your iPhone is missing.** Select the reload button in the watch header with your iPhone nearby.
- **An item shows no state.** The watch needs to reach your Home Assistant server for live values. See [Server URLs on the watch](./settings.md#server-urls).
- **An action fails.** The watch tells you why, and offers an execution log when verbose logging is on. See [Watch settings and troubleshooting](./settings.md).
