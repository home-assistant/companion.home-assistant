---
title: "iOS Reminders sync"
id: 'ios-reminders-sync'
---

![iOS](/assets/iOS.svg)

:::info
Reminders Sync is a <span class="beta">LABS</span> feature in the iOS Companion app, available starting with version 2026.8.0. Behavior and settings may change as the feature evolves.
:::

Reminders Sync keeps a list in Apple's Reminders app and a to-do list in Home Assistant in agreement with each other. Add "Buy milk" to your shopping list in Reminders, and it appears in Home Assistant. Check it off in Home Assistant, and it is checked off in Reminders too.

This is useful when you want to use Siri and the Reminders app you already have on your iPhone, while Home Assistant automations can still read and change the same list.

:::info
Reminders Sync is iOS-only. It is not available in the Mac version of the Companion app, because the Mac app cannot access Reminders.
:::

## Concepts

If you are new to Home Assistant, two terms are useful before you start:

- A **to-do list** in Home Assistant is a list of tasks, such as a shopping list. Each list is an entity whose name starts with `todo.`, for example `todo.shopping_list`. See [To-do list](https://www.home-assistant.io/integrations/todo/) in the Home Assistant documentation.
- A **pairing** is one Apple Reminders list connected to one Home Assistant to-do list. You choose which lists to pair, and you can create several pairings.

## Requirements

- An iPhone or iPad with the Home Assistant Companion app, version 2026.8.0 or later, from the [App Store](https://apps.apple.com/app/home-assistant/id1099568401).
- At least one to-do list in Home Assistant. If you do not have one, add the [Local to-do](https://www.home-assistant.io/integrations/local_todo/) integration, or use the [Shopping list](https://www.home-assistant.io/integrations/shopping_list/) integration.
- Full access to Reminders, granted to the Companion app. The app asks for this the first time you open the Reminders Sync settings.

:::note
The app needs *full* access to Reminders, not write-only access. Reading your reminders is what lets the app tell which side of a pairing changed.
:::

## Setting up a pairing

1. Open the Home Assistant app.
2. Go to **Companion app settings** > **Reminders Sync**.

   You find it under the **Share from this device** section.

3. If the app asks for access to your reminders, select **Allow Full Access**.

   If you selected **Don't Allow** by mistake, the screen shows **Reminders access needed**. Select **Open Settings** and turn on **Reminders** for Home Assistant.

4. Select **Add**.

5. In **New List Sync**, choose:

   - **Server**: the Home Assistant server to sync with. This only appears if you have more than one server set up in the app.
   - **Apple Reminders list**: the list from your Reminders app, such as `Groceries`.
   - **Home Assistant to-do list**: the to-do list in Home Assistant, such as `Shopping list`.
   - **Sync direction**: see [Sync directions](#sync-directions).

6. Select **Save**.

The pairing appears under **Synced lists**, and the first sync starts shortly after.

:::note
Each pairing connects exactly one Reminders list to one Home Assistant to-do list. To sync several lists, add a pairing for each one. If you pick a combination that already exists, the app shows **These lists are already being synced** and **Save** stays disabled.
:::

### The first sync

On the first sync, the app links items that already exist in both lists under the same title, so you do not end up with duplicates. Everything else is copied to the other side according to the sync direction.

Completed items that are not linked are left alone. They are treated as history, not as work to copy. Completing an item still syncs normally once the item is linked.

## What gets synced

For every linked item, the app keeps these four things in agreement:

- The title, such as `Buy milk`.
- The notes, which Home Assistant calls the description.
- The due date, with or without a time of day.
- Whether the item is completed.

Anything else is not synced. Reminders features such as priority, tags, subtasks, URLs, images, location alerts, and repeating reminders have no equivalent in a Home Assistant to-do list, so the app leaves them untouched on the Reminders side.

:::info
Not every Home Assistant to-do list supports every field. For example, some integrations cannot store a description or a due time. When the paired to-do list does not support a field, that field stops syncing and keeps whatever value it has in Reminders, instead of being erased. If a list supports dates but not times, a reminder due at `18:00` syncs as due that day, with no time.
:::

## Sync directions

You pick a direction for each pairing when you create it.

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
- If you edit or delete a linked reminder, the app restores it from Home Assistant on the next sync, unless the Home Assistant item is already completed. Completed items are treated as history and are not brought back.

## Conflicts

A conflict happens only with two-way pairings, when the same linked item changed in both apps since the last sync. Because both changes cannot be kept, one side has to win.

To choose the winner, go to **Companion app settings** > **Reminders Sync** and, under **Conflicts**, set **Keep changes from** to either **Home Assistant** or **Apple Reminders**. The setting applies to all of your two-way pairings.

The default is **Home Assistant**, since a Home Assistant list is usually shared with the rest of your household, while the reminder is on one phone.

:::note
When only one side changed, no conflict exists and this setting is not used. The change is simply applied to the other side.
:::

## When syncing happens

The app syncs by itself in these situations:

- When you open the app, or bring it back to the foreground.
- When something changes in the Reminders app while the Home Assistant app is running. Reminders tells the app about its own changes, so these sync within a few seconds.
- On the schedules described below.

You can also sync at any time: go to **Companion app settings** > **Reminders Sync** and select **Sync now**.

:::warning
Nothing syncs while the app is closed or in the background, unless a background refresh runs. Changes made in Apple Reminders or Home Assistant wait until the app runs again.

If you need a change to reach Home Assistant right away, open the app.
:::

### While the app is open

Home Assistant cannot notify the app when its lists change, so the app has to ask. Under **While the app is open**, set **Check Home Assistant every** to how often you want the app to re-check the Home Assistant side: **Off**, or every 1, 5, 15, or 30 minutes, or every hour.

**Off** is the default. Even with the schedule off, the Home Assistant side is still fetched when you open the app and when you select **Sync now**.

Changes made in Apple Reminders do not depend on this setting. They sync right away while the app is open.

### While the app is closed

Under **While the app is closed**, set **Ask iOS to sync every** to how often the app should ask iOS to wake it up briefly to sync: **Off**, every 15 or 30 minutes, or every 1, 2, 6, 12, or 24 hours.

**Off** is the default.

:::warning
This is a request, not a guarantee. iOS decides if and when a background refresh actually runs, based on battery level, Low Power Mode, and how often you use the app. A short interval does not force iOS to run more often.
:::

## Sync history

To see what the app changed, go to **Companion app settings** > **Reminders Sync** and select **Sync history**.

Each entry shows the pairing, when the sync ran, whether it succeeded, and one line per change, such as `Created reminder "Buy milk"` or `Updated Home Assistant item "Buy milk"`. Syncs that changed nothing are not recorded, so the history stays a log of real changes.

The app keeps the 200 most recent entries and discards older ones.

Select **Clear** to delete the history. This does not affect your lists or your pairings.

:::note
History entries stay after you remove a pairing, and keep showing the list names they had at the time of the sync.
:::

## Removing a pairing

1. Go to **Companion app settings** > **Reminders Sync**.
2. Under **Synced lists**, swipe left on the pairing.
3. Select **Delete**.

Both lists keep their items. Only the connection between them is removed, so changes stop flowing in either direction.

:::note
If you add the same pairing again later, the next sync links items with matching titles again, the same way a first sync does.
:::

## Troubleshooting

If a pairing shows **Not synced yet**, or the last sync time stops updating:

- Make sure Reminders access is still granted. Go to iOS **Settings** > **Apps** > **Home Assistant** > **Reminders** and check that **Full Access** is selected.
- Open the app and select **Sync now**, then check **Sync history** for an error.
- Confirm the Reminders list still exists. If you deleted it in the Reminders app, syncing stops for that pairing. Remove the pairing and add it again with a list that exists.
- Confirm the Home Assistant to-do list still exists, and that the app can reach that server. Syncing uses the same connection as the rest of the app, so see [Companion app networking](../troubleshooting/networking.md) if the app cannot connect.

:::note
Renaming a list does not break syncing. The pairing keeps working, but it still shows the name the list had when you created it. Remove the pairing and add it again if you want the new name shown.
:::

If items appear twice in a list:

- Check whether the titles match exactly. The first sync only links items whose titles are identical, and the comparison is case-sensitive, so `Buy milk` and `buy milk` are treated as different items. Spaces before and after the title are ignored, so those alone do not cause duplicates. Delete the extra copy in either app, and it is removed from both on the next sync of a two-way pairing.

If a change you made keeps getting undone:

- Check the sync direction. With a one-way pairing, editing the target side is always overwritten by the source side. Change the pairing to **Two-way** if you want to edit both sides.
- For two-way pairings, check the **Conflicts** setting. If you edit the same item in both apps, the side you did not pick loses its change.

If nothing syncs while your phone is locked or the app is closed, this is expected. See [When syncing happens](#when-syncing-happens).

For more help, see [Getting more help](../troubleshooting/more-help.md).
