---
title: "Settings backup"
id: 'settings-backup'
---

## Back up and restore Android settings <span class='beta'>BETA</span>

![Android](/assets/android.svg) You can save selected Companion app settings to a file and restore them after reinstalling the app or moving to another Android phone. This feature is available in the [full and minimal Android apps](android-flavors.md). It is not available on iOS, Wear OS, Android Automotive, or Meta Quest.

Settings backups contain preferences for the Companion app on your phone. To back up your Home Assistant server, use [Home Assistant backups](https://www.home-assistant.io/common-tasks/general/#backups).

### What you can back up

Choose any of these categories when exporting or restoring:

- **Android Auto favorites**: Your favorite entities and their order in [Android Auto](../android-auto/android-auto.md). An entity represents something you can control or read in Home Assistant, such as a light or sensor.
- **Sensors on or off**: Which [sensors](sensors.md#android-sensors) are enabled or disabled for each server.
- **Sensor settings**: Supported options, such as location accuracy, app filters, and zone selections. These settings are shared by all servers connected to the app.
- **Persistent connection**: When the app keeps a connection open to each server.
- **Sensor update frequency**: How often the app updates sensors. This setting is shared by all connected servers.

Backups do not include login credentials, server addresses, device registrations, sensor readings, or the Bluetooth beacon transmitter's device identity. Android permissions, battery optimization exemptions, app locks, notification channels, home Wi-Fi detection settings, widgets, and Wear OS settings are also excluded.

The backup is an unencrypted JSON file. It can contain personal information, such as server names, entity IDs, app selections, Bluetooth addresses, and location preferences. Store it somewhere you trust.

In the backup file, the `androidAutoFavorites` field stores your Android Auto favorites and their order.

### Export settings

1. Open **Settings** > **Companion app** > **Settings backup**.
2. Under **Choose what to back up**, select the categories to include.
3. Select **Export settings**.
4. In Android's file picker, choose where to save the file and confirm. The default filename is `home-assistant-companion-settings.json`.

<img alt="Settings backup screen with the five export categories selected" src="/assets/android-settings-backup-home.png" width="360" />

### Restore settings

1. On the destination phone, [connect the Companion app to your Home Assistant servers](../getting_started/index.mdx) before restoring server-specific settings. Restoring a backup does not sign you in or add servers.
2. Open **Settings** > **Companion app** > **Settings backup**.
3. Select **Restore from file** and choose your backup.
4. Under **Choose what to restore**, select the categories to restore. Only categories included in the file are shown.
5. Under **Where to restore**, choose the matching signed-in server for each server included in the backup.
   - Each destination can be selected only once.
   - If multiple servers are listed, turn off **Restore settings from** for any server you want to skip.
   - When restoring server-specific settings, choose at least one destination. A backup with a single server requires a destination for that server.
6. Select **Continue** and review the changes under **Ready to restore**, including any settings listed under **Not restored**.
7. Select **Restore selected settings** to apply the changes. To adjust your choices first, select **Change selection**.
8. If you restored **Sensor update frequency**, restart the app to apply it.

<img alt="Restore screen showing explicit destination choices for Home and Cabin servers" src="/assets/android-settings-backup-servers.png" width="360" />

<img alt="Restore confirmation showing the selected categories and their effects before applying changes" src="/assets/android-settings-backup-confirmation.png" width="360" />

### How restoring affects existing settings

- Categories you do not select and individual settings absent from the backup keep their current values.
- Restoring **Android Auto favorites** replaces favorites for the destination servers you select. An empty favorites list clears favorites for those servers. Favorites for other servers are retained.
- Skipped servers keep their server-specific settings. **Sensor settings** and **Sensor update frequency** still apply to all connected servers when selected.
- Favorite and zone entity IDs are kept as saved. Choose the same Home Assistant servers used when creating the backup; the app does not check whether those entities still exist.
- A zone selection is skipped if any of its servers has no destination.
- Restoring the same backup again applies the saved values without adding duplicate favorites.

### If some settings cannot be restored

The confirmation screen lists unavailable sensors, unsupported or invalid options, and sensors that need Android permissions. These entries are skipped.

For a sensor that needs permission, open **Settings** > **Companion app** > **Manage sensors**, enable the sensor, and grant the requested permission. Then restore the backup again if needed.

If the app rejects a file, check that it is a Companion settings backup in UTF-8 JSON format, is no larger than 1 MiB, and uses a format version supported by your app. A Home Assistant server backup cannot be restored from this screen.
