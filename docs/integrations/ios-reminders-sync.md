---
title: "Apple Reminders Sync"
id: 'ios-reminders-sync'
---

![iOS](/assets/iOS.svg)

:::info
Reminders Sync is a <span class="beta">LABS</span> feature in the iOS Companion app. Behavior and settings may change as the feature evolves.
:::

Reminders Sync keeps a list in Apple's Reminders app and a to-do list in Home Assistant in agreement with each other. Add `Buy milk` to your shopping list in **Reminders**, and it appears in Home Assistant. Check it off in Home Assistant, and it is checked off in **Reminders** too.

This is useful when you want to use Siri and the Reminders app you already have on your iPhone, while Home Assistant automations can still read and change the same list.

:::info
Reminders Sync is iOS-only. It is not available in the Mac version of the Companion app, because the Mac app can't access Reminders.
:::

## Terminology

If you are new to Home Assistant, two terms are useful before you start:

- A **to-do list** in Home Assistant is a list of tasks, such as a shopping list. Each list is an entity whose name starts with `todo.`, for example `todo.shopping_list`. See [To-do list](https://www.home-assistant.io/integrations/todo/) in the Home Assistant documentation.
- A **list sync** links one list in Apple Reminders with one to-do list in Home Assistant. You choose which lists to sync, and you can add several list syncs.

## Prerequisites

- An iPhone or iPad with the Home Assistant Companion app from the [App Store](https://apps.apple.com/app/home-assistant/id1099568401).
- At least one to-do list in Home Assistant. If you do not have one, add the [Local to-do](https://www.home-assistant.io/integrations/local_todo/) integration, or use the [Shopping list](https://www.home-assistant.io/integrations/shopping_list/) integration.
- *Full* access to Reminders for the Companion app, so it can tell which side of a sync changed. The app asks for this the first time you open the Reminders Sync settings.

## Adding a list sync

1. Open the Home Assistant app.
2. Go to **Settings** > **Companion app** > **Reminders Sync**.
3. If the app asks for access to your reminders, allow it:

   - On iOS and iPadOS 17 or later, select **Allow Full Access**.
   - On iOS and iPadOS 16, select **OK**.

   If you selected **Don't Allow** by mistake, the screen shows **Reminders access needed**. Select **Open Settings** and turn on **Reminders** for Home Assistant.

4. Select **Add**.

5. In **New List Sync**, choose:

   - **Server**: the Home Assistant server to sync with. This only appears if you have more than one server set up in the app.
   - **Apple Reminders list**: the list from your Reminders app, such as `Groceries`.
   - **Home Assistant to-do list**: the to-do list in Home Assistant, such as `Shopping list`.
   - **Sync direction**: **Two-way** by default. See [Sync directions](#sync-directions).

   If your to-do list is missing, or the screen shows **No to-do lists**, select the circular arrow button at the top of the screen. This updates the server information, so a list you just created in Home Assistant appears.

6. Select **Save**.

The list sync appears under **Synced lists**, and the first sync starts shortly after.

:::note
Each list sync connects exactly one Reminders list to one Home Assistant to-do list. To sync several lists, add a list sync for each one. If you pick a combination that already exists, the app shows **These lists are already being synced**, and **Save** stays disabled.
:::

### The first sync

On the first sync, the app links items that already exist in both lists under the same title, so you do not end up with duplicates. Everything else is copied to the other side according to the sync direction.

If two matched items have different notes or due dates, one version is kept: the Home Assistant version for **Two-way** and **Home Assistant → Reminders** list syncs, and the Reminders version for **Reminders → Home Assistant** list syncs. The **Conflicts** setting is not used here.

Completed items that are not linked are left alone. They are treated as history, not as work to copy. Completing an item still syncs normally once the item is linked.

The same matching also runs on later syncs. If you add an item with the same title in both apps before they sync, the app links the two instead of creating duplicates.

## What gets synced

For every linked item, the app keeps these four things in agreement:

- The title, such as `Buy milk`.
- The reminder's notes (Apple Reminders) / description (Home Assistant).
- The due date, with or without a time of day.
- Whether the item is completed.

Anything else is not synced. Reminders features such as priority, tags, subtasks, URLs, images, and repeating reminders have no equivalent in a Home Assistant to-do list, so the app leaves them untouched on the Reminders side.

Alerts and start dates are not synced either, but they follow the due date. When the app changes a reminder's due date, it moves the reminder's alerts and start date by the same amount. If you remove the due date in Home Assistant, the app also removes the reminder's start date and all alerts, including location-based alerts.

:::info
Not every Home Assistant to-do list supports every field. For example, some integrations cannot store a description or a due time. When the synced to-do list does not support a field, that field stops syncing and keeps whatever value it has in Reminders, instead of being erased. If a list supports dates but not times, a reminder due at `18:00` syncs as due that day, with no time. If you then change the date in Home Assistant, the reminder moves to the new date and keeps its `18:00` time.
:::

## Sync directions

You pick a direction for each list sync when you create it.

### Two-way

Changes in either list are applied to the other, including deletions. If you delete an item in Reminders, it is deleted in Home Assistant, and the other way around.

If the same item changed in both apps since the last sync, the **Conflicts** setting decides which version is kept. See [Conflicts](#conflicts).

### Reminders → Home Assistant

Apple Reminders is the source of truth. Its items and changes overwrite the Home Assistant list.

- Items you add in Reminders are created in Home Assistant.
- Items that exist only in Home Assistant are left alone, and are never copied to Reminders.
- If you edit a linked item in Home Assistant, the change is undone on the next sync, because Reminders wins.
- If you delete a linked item in Home Assistant, the app recreates it from Reminders, unless the reminder is already completed. Completed items are treated as history and are not brought back.

### Home Assistant → Reminders

Home Assistant is the source of truth. Its items and changes overwrite the Apple Reminders list.

- Items added in Home Assistant are created in Reminders.
- Items that exist only in Reminders are left alone, and are never copied to Home Assistant.
- If you edit a linked reminder, the change is undone on the next sync, because Home Assistant wins.
- If you delete a linked reminder, the app recreates it from Home Assistant, unless the Home Assistant item is already completed. Completed items are treated as history and are not brought back.

## Conflicts

A conflict happens only with two-way list syncs, when the same linked item changed in both apps since the last sync. Because both changes cannot be kept, one side has to win.

To choose which change is kept, go to **Settings** > **Companion app** > **Reminders Sync** and, under **Conflicts**, set **Keep changes from** to either **Home Assistant** or **Apple Reminders**. The setting applies to all of your two-way list syncs.

The default is **Home Assistant**.

## When syncing happens

- **Changes in Apple Reminders** sync within a few seconds while the app is open. Otherwise, they sync the next time you open the app or a background sync runs.
- **Changes in Home Assistant** sync when you open the app, when you select **Sync now**, on the **Check Home Assistant every** schedule while the app is open, or when a background sync runs.

To sync at any time, go to **Settings** > **Companion app** > **Reminders Sync** and select **Sync now**.

### While the app is open

Home Assistant cannot notify the app when its lists change, so the app checks periodically. Under **While the app is open**, set **Check Home Assistant every** to **Off**, or every 1, 5, 15, or 30 minutes, or every hour. **Off** is the default.

### While the app is closed

Under **While the app is closed**, set **Ask iOS to sync every** to how often the app should ask iOS to wake it up briefly to sync: **Off**, every 15 or 30 minutes, or every 1, 2, 6, 12, or 24 hours. **Off** is the default.

:::note
iOS decides if and when a background sync actually runs, based on battery level, Low Power Mode, and how often you use the app. A short interval does not force iOS to run more often. Background syncs only run when **Background App Refresh** is turned on for Home Assistant in iOS **Settings** > **General** > **Background App Refresh**.
:::

## Sync history

To see what the app changed, go to **Settings** > **Companion app** > **Reminders Sync** and select **Sync history**.

Each entry shows the list sync, when the sync ran, whether it succeeded, any error, and a line describing each change, such as `Created reminder "Buy milk"` or `Updated Home Assistant item "Buy milk"`. Syncs that changed nothing are only recorded if they failed.

The app keeps the 200 most recent entries and discards older ones.

To delete the history, select **Clear**, then confirm with **Clear History**. This does not affect your lists or your list syncs.

:::note
History entries stay after you remove a list sync, and keep showing the list names they had at the time of the sync.
:::

## Removing a list sync

1. Go to **Settings** > **Companion app** > **Reminders Sync**.
2. Under **Synced lists**, swipe left on the list sync.
3. Select **Delete**.

Both lists keep their items. Only the connection between them is removed, so changes stop flowing in either direction.

:::note
If you add the same list sync again later, the next sync links items with matching titles again, the same way a first sync does.
:::

## Troubleshooting

If a list sync shows **Not synced yet**, or the last sync time stops updating:

- Make sure Reminders access is still granted. In the iOS **Settings** app, find **Home Assistant** (under **Apps** on iOS 18 and later), then:
  - On iOS and iPadOS 17 or later, select **Reminders** and check that **Full Access** is selected.
  - On iOS and iPadOS 16, check that the **Reminders** toggle is on.
- Open the app and select **Sync now**, then check **Sync history** for an error. A deleted Reminders list, or a server that was removed from the app, stops syncing without recording an error, so also check the items below.
- Confirm the Reminders list still exists. If you deleted it in the Reminders app, syncing stops for that list sync. Remove the list sync and add it again with a list that exists.
- Confirm the Home Assistant to-do list still exists, and that the app can reach that server. Syncing uses the same connection as the rest of the app, so see [Companion app networking](../troubleshooting/networking.md) if the app cannot connect.
- Renaming a list does not break syncing. The list sync keeps showing the old name until you remove it and add it again.

If items appear twice in a list:

- Check whether the titles match exactly. The app only links items whose titles are identical, and the comparison is case-sensitive, so `Buy milk` and `buy milk` are treated as different items. Spaces before and after the title are ignored, so those alone do not cause duplicates. Delete the extra copy in either app, and it is removed from both on the next sync of a two-way list sync.

If a change you made keeps getting undone:

- Check the sync direction. With a one-way list sync, editing the target side is always overwritten by the source side. You cannot change the direction of an existing list sync, so to edit both sides, remove the list sync and add it again with **Two-way**.
- For two-way list syncs, check the **Conflicts** setting. If you edit the same item in both apps, the side you did not pick loses its change.

If nothing syncs while your phone is locked or the app is closed, this is expected. To let iOS sync in the background, set **Ask iOS to sync every** and make sure **Background App Refresh** is turned on. See [While the app is closed](#while-the-app-is-closed).

For more help, see [Getting more help](../troubleshooting/more-help.md).
