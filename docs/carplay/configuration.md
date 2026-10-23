---
title: "Configuration"
id: "configuration"
---

![iOS](/assets/iOS.svg)

You decide what Home Assistant shows in CarPlay. There are two places to do it:

- **In the car**: use the **Settings** tab on the car display. Most settings can be changed here, so you do not have to reach for your phone.
- **On your iPhone**: in the Home Assistant app, open **Settings** > **Companion app** > **CarPlay**. You find **CarPlay** under the **Apple Watch & CarPlay** heading. This is where the full set of options lives, including renaming items, choosing custom icons, and creating Assist prompts.

Both places write to the same configuration. If your phone is connected to the car while you change something on the phone, the car display updates right away.

## Configuring from the car display

Select the **Settings** tab on the car display.

The **Settings** tab contains:

- **Main server**: pick which Home Assistant server CarPlay shows. Only relevant if you have more than one server.
- **Layout**: choose how the **Quick access** tab, your folders, and your custom tabs are drawn, either **List** or **Grid**. **Grid** requires iOS 26 or later. On older versions, they are drawn as a list even if **Grid** is selected.
- **Tabs**: choose which tabs appear on the car display.
- **Show Add and Edit buttons**: show or hide the **Add item** and **Edit** buttons in **Quick access** and in your folders. Turn this off for a cleaner list once you are happy with your setup.
- **Assist Settings**: on-device speech options for [Assist](assist.md).
- **Troubleshooting**: options to try when something is not working. See [Troubleshooting](troubleshooting.md).

Changes to **Main server**, **Layout**, and **Tabs** are applied when you go back to the **Settings** list.

### Choosing which tabs appear

1. On the car display, select **Settings** > **Tabs**.
2. Select a tab name to turn it on or off. A check mark means the tab is shown.

The list also includes your folders, so you can show a **Quick access** folder as its own tab from the car. See [Folders and custom tabs](#folders-and-custom-tabs).

Tabs you turn on are added at the end, just before **Settings**.

:::note
The **Settings** tab cannot be turned off from the car, so you never lose access to these options while driving. To remove it, use your iPhone.
:::

:::warning
Turning off a custom tab you created on your iPhone also deletes the items in it. To keep the items, use a **Quick access** folder as the tab instead.
:::

To change the order of the tabs, or to create a new tab, use your iPhone.

### Adding an item to Quick access from the car

1. On the car display, open the **Quick access** tab.
2. Select **Add item**.
3. If you have more than one server, select the server the entity belongs to.
4. Choose what you want to add:
   - **Areas**: browse your entities by room, such as **Garage**.
   - **Control**: browse your entities by device type, such as **Cover** or **Light**.
   - **Assist**: add an Assist pipeline so you can start a voice request from **Quick access**. Requires iOS 26.4 or later. See [Assist](assist.md).
5. Select what you want to add:
   - For **Areas** or **Control**, select the entity, then choose whether running it should ask first:
     - **Require confirmation**: CarPlay asks you to confirm before it runs. A good choice for a garage door or a gate.
     - **Add without confirmation**: one tap runs it.
   - For **Assist**, select the pipeline. There is nothing to confirm, so the item is added straight away.

The item appears in **Quick access** immediately.

:::note
You are not asked about confirmation for locks, climate entities, or vacuums. Locks always confirm, and climate entities and vacuums open a control screen rather than running an action. See [Controlling your home](controls.md).

Some item types cannot be created from the car, because they need typing. If you select **Folder** or **Assist prompt**, CarPlay tells you to create it in the Home Assistant app on your iPhone instead.
:::

### Editing or removing an item from the car

1. On the car display, open the **Quick access** tab.
2. Select **Edit**.
3. Select the item you want to change, then choose one of:
   - **Delete**: remove the item from the list.
   - **Require confirmation**: start asking for confirmation before running it.
   - **Don't require confirmation**: stop asking for confirmation.

Folders, Assist items, locks, climate entities, and vacuums can only be deleted from the car. Deleting a folder that is also shown as a tab removes that tab too.

For anything else, such as renaming an item or giving it a different icon, use your iPhone.

:::info
If you do not see the **Add item** and **Edit** buttons, the **Show Add and Edit buttons** setting is turned off. Turn it back on under **Settings** on the car display, or on your iPhone.
:::

## Configuring from your iPhone

1. On your iPhone, open the Home Assistant app.
2. Go to **Settings** > **Companion app** > **CarPlay**.

Changes on your iPhone are saved as you make them.

### Tabs

Under the **Tabs** heading, select the row that lists your current tabs to manage the car display's tabs.

- **Active** lists the tabs that appear in the car, in the order they appear. Drag a tab by its handle to move it. Swipe a tab to the left to remove it.
- **Inactive** lists tabs that are available but not shown. Select the plus button next to a tab to add it back.
- Select **Add Tab** to create your own tab. See [Folders and custom tabs](#folders-and-custom-tabs).

:::note
CarPlay limits how many tabs are displayed in the car, and the limit depends on the vehicle. Extra tabs are not shown, so keep the ones you use most at the top of the **Active** list.
:::

### Quick access

The **Quick access** section is where you build your shortcut list.

- **Layout**: choose **List** or **Grid**. The choice also applies to your folders and custom tabs. **Grid** fits more items on screen at once, and requires iOS 26 or later. On older versions the option is shown as unavailable. Until you choose, **Grid** is used while the list is empty, and **List** once it has items.
- Select **Add item** to add something to the list. You can add:
  - **Entity**: a light, lock, cover, script, scene, or any other supported entity. See [What you can control](carplay.md#what-you-can-control). You can select several entities at once. They are all added with the default settings, and you can customize them afterwards.
  - **Assist**: starts a voice request with a chosen Assist pipeline. Requires iOS 26.4 or later. See [Assist](assist.md).
  - **Assist prompt**: sends a request you write in advance, such as `Is the garage door open?`. Requires iOS 26.4 or later. See [Assist](assist.md).
  - **Add Folder**: groups items together. See [Folders and custom tabs](#folders-and-custom-tabs).
- To reorder items, select **Edit** next to the section heading, then drag an item by its handle. Select **Done** when you are finished.
- Swipe an item to the left to delete it.
- Select an item to customize it.

#### Customizing an item

Select an item in the **Quick access** list to change:

- **Display text**: the name shown in the car. Leave it empty to use the name from Home Assistant.
- **Icon**: select the icon next to the name to pick a different one.
- **Icon color**: choose **Default** to use the same color as the Home Assistant dashboard, which changes with the entity's state. Choose **Custom**, then pick a **Color**, to always use the same color.
- **Require confirmation**: ask before running the item. This has no effect on locks, which always confirm, or on climate entities and vacuums, which open a control screen.

Select **Save** to keep your changes.

An Assist item only has **Display text** and **Icon color**. Its icon is always the microphone and cannot be changed, and it has no **Require confirmation** option because starting a voice request has nothing to confirm. To use a different pipeline, delete the item and add it again. Selecting an Assist prompt opens the prompt editor instead. See [Assist prompts](assist.md#assist-prompts).

#### Other ways to add an entity

You can also add an entity to **Quick access** without opening the CarPlay settings:

- In the Home Assistant app, open an entity's dialog and use its **Add to** option, then select **CarPlay**.
- In the Shortcuts app, use the **Add entity to** action.

### Add and edit buttons

Turn off **Show Add and Edit buttons** to hide the **Add item** and **Edit** buttons from the car display. The setting only changes what the car shows; you can still add and edit items on your iPhone.

### Assist settings

Select **Assist Settings** to open the Assist options shared by the app and the car, such as on-device speech recognition. See [Assist](assist.md).

### Troubleshooting

Select **Troubleshooting** to open the CarPlay troubleshooting options, including the audio playback setting for spoken Assist responses. See [Troubleshooting](troubleshooting.md).

### Resetting your configuration

Select **Reset configuration**, then select **Yes** to delete your CarPlay setup and start over.

:::warning
This deletes your tabs, your **Quick access** items, your folders, and your layout choices. It cannot be undone. Your Assist settings and the **TTS Playback** setting are kept.
:::

## Folders and custom tabs {#folders-and-custom-tabs}

A folder is a group of items. Folders keep long lists manageable, and they are the building block for your own tabs.

### Creating a folder

1. In the Home Assistant app on your iPhone, go to **Settings** > **Companion app** > **CarPlay**.
2. Select **Add item** > **Add Folder**.
3. Enter a **Folder Name**, then select **Add Folder**.
4. Select the new folder to add items to it. To change the folder's icon, select the gear button on the folder screen.

In the car, a folder appears in **Quick access** with an arrow. Select it to see what is inside. You can also add items to a folder from the car, the same way you add them to **Quick access**.

:::note
Folders cannot contain other folders.
:::

### Creating your own tab

1. In the Home Assistant app on your iPhone, go to **Settings** > **Companion app** > **CarPlay**, then select the row under **Tabs**.
2. Select **Add Tab**.
3. Enter a **Tab Name**, such as `Garage`, then select **Add Tab**.
4. Select the new tab in the **Active** list to add items to it.

A custom tab holds its own items, separate from **Quick access**. You can also turn an existing **Quick access** folder into a tab: it appears in the **Inactive** list under **Tabs**, ready to be added. A folder shown as a tab uses the folder's name and icon.

:::warning
Removing a custom tab you created with **Add Tab** also deletes the items in it, whether you remove it on your iPhone or turn it off in the car. A **Quick access** folder shown as a tab is different: removing the tab only hides it, and the folder stays in **Quick access**.
:::

## Using more than one server

If your iPhone is connected to several Home Assistant servers, the **Areas** and **Control** tabs show one server at a time. That server is your **Main server**.

To switch servers from the car, select **Settings** > **Main server**, then select the server you want. A check mark shows the current one.

:::info
The **Quick access** tab is not limited to the main server. Each item remembers which server it belongs to, so a shortcut keeps working even when another server is selected as the main one. When your list has items from more than one server, each item shows its server name.
:::
