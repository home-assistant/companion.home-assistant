---
title: "Watch settings and troubleshooting"
id: "settings"
---

![iOS](/assets/iOS.svg)

The Home Assistant app on your Apple Watch has its own settings screen. It shows which servers the watch knows about, lets you change the Assist pipeline and the home screen layout, lets you choose what the watch reports to Home Assistant, and gives you the diagnostics you need when something is not updating.

:::info
This page describes the rebuilt Apple Watch app introduced in iOS app version 2026.8.
:::

## Opening the settings

1. On your Apple Watch, open the Home Assistant app.
2. Scroll to the bottom of the home screen.
3. Select the gear icon.

## Servers

The **Servers** section lists the Home Assistant servers synced from your iPhone. Servers themselves are still managed on your iPhone: you cannot add or remove one from the watch.

Select a server to see:

- Its internal, remote, and Home Assistant Cloud URLs.
- Its Home Assistant version.
- Which URL the watch should use, under **Always use**.
- Whether a client certificate is available on this watch, if your server uses mutual TLS. Certificates are imported on your iPhone; select **Refresh** here to pull the certificate onto the watch, and you can remove it from the watch alone without affecting your iPhone.

A server marked **Needs attention** is one the watch currently cannot reach. Select it to see why and what you can do.

The settings screen also shows the Wi-Fi network your watch is currently on, when it has one. This is hidden when the watch is on a cellular connection or borrowing your iPhone's connection.

### Server URLs

The watch requests live entity states and complication values from your Home Assistant server, and sends the actions you run there too.

- **When your iPhone is nearby and reachable**, the watch hands these requests to your iPhone. Your iPhone sends them using the URL it is using itself, so at home they go to your internal URL even when the watch picked your remote URL.
- **When your iPhone is not reachable**, the watch sends the requests itself, using the URL it picked. This is when the watch needs a URL it can reach on its own.

For each server you can set **Always use**:

- **Auto**: the watch follows your network, using your internal URL when it recognizes the Wi-Fi network and your remote URL otherwise. This is the default.
- A specific URL, if you always want the watch to use that one.

#### Internal URLs and your iPhone's connection

When your Apple Watch has no Wi-Fi or cellular connection of its own, it borrows your iPhone's internet connection. In that situation the watch cannot see which Wi-Fi network you are on, so it cannot tell whether you are somewhere you trust.

To protect you on public networks, the watch does not use your internal URL by default in that case. If your server also has a remote URL or Home Assistant Cloud, this does not affect you: the watch uses that URL instead.

If your server _only_ has an internal URL, the watch has no URL it may use, and the server is marked **Needs attention**. Your configuration and entity list still arrive from your iPhone, so your items keep appearing. What stops working is anything that needs the server: the watch cannot read live states, cannot run actions on that server, and its complications keep showing their last known value.

If you want to allow it anyway:

1. On your Apple Watch, go to **Settings** > **Servers** and select the server marked **Needs attention**.
2. Read the explanation under **Internal URL & Security**.
3. Select **Use** followed by your URL to allow it, or **Not Now** to leave it off.

:::warning
Allowing your internal URL over your iPhone's connection means the watch may try to reach that address on any network your iPhone is connected to, including public wireless networks. Consider setting up [Home Assistant Cloud](https://support.nabucasa.com/) or another remote URL instead.
:::

## Assist

Select **Assist** to change which Assist pipeline the header button uses, without reaching for your iPhone.

- Choose the **Server** and the **Pipeline**.
- Turn **Show Assist** off to hide the button.
- If no pipelines are listed, keep your iPhone nearby and select **Reload**.

See [Using Assist](./home.md#using-assist) for more.

## Sensors

Your Apple Watch can report its own sensors to Home Assistant. When you turn one on, the watch registers with the [Mobile App integration](https://www.home-assistant.io/integrations/mobile_app/) as its own device, separate from your iPhone. The device is named after your iPhone, for example `My iPhone Apple Watch`, and you find it in Home Assistant under **Settings** > **Devices & services** > **Mobile App**.

The watch can report:

- **Battery Level**: the battery charge of the watch, in percent.
- **Battery State**: whether the watch is `Charging`, `Not Charging`, or `Full`.

To turn them on:

1. On your Apple Watch, go to **Settings** > **Sensors**.
2. If you have more than one server, select the server that should receive the sensors. Each server has its own choices.
3. Turn on the sensors you want to report.

Nothing is sent until you turn a sensor on. The watch sends the values on its own schedule, in the background. The **Status** section shows when the watch last sent its sensors, and the last error, if there was one.

:::note
Before iOS app version 2026.9.1, the watch battery was reported as `Watch Battery Level` and `Watch Battery State` sensors on your _iPhone's_ device. Those sensors no longer update, and the app disables them. Use the sensors on the watch's own device instead, and update any automations or dashboards that used the old ones.
:::

## Location

Your Apple Watch can also report its location to Home Assistant, as the device tracker of its own device. This is separate from the location your iPhone reports.

1. On your Apple Watch, go to **Settings** > **Location**.
2. If you have more than one server, select the server. Each server receives the location you choose for it.
3. Choose what to send:
   - **Exact**: the watch's precise location.
   - **Zone only**: only the name of the [zone](https://www.home-assistant.io/integrations/zone/) the watch is in, such as `home`.
   - **Never**: nothing is sent. This is the default.
4. When the watch asks for permission to use your location, allow it.

The watch reports its location when you open the app, and in the background from time to time when watchOS lets the app refresh.

If the watch shows that Home Assistant cannot access its location, open the **Settings** app on your Apple Watch, go to **Privacy & Security** > **Location Services**, and allow location access for Home Assistant.

## Layout

Choose whether your items appear as a **List** or a **Grid**. The grid only shows icons.

## Troubleshooting

Select **Troubleshooting** for the diagnostics screens.

### Complications

Shows each complication you configured and the result of its last refresh:

- **Updated**: the value came from your server.
- **Showing cached value**: the refresh did not succeed, so the previous value is still on the face.
- **Failed**: the refresh failed.
- **Not yet updated**: the complication has not refreshed since it was created.

Select **Refresh All** to refresh everything now, or select a single complication to see when it last tried, why it failed, and to select **Retry**.

### Logs

**Logs** lists the events recorded on this watch — syncs, database updates, and app lifecycle events. This is the first place to look when the watch is not behaving.

You can:

- Select **Share** to share the log from the watch.
- Select **Send to iPhone** to copy it to your iPhone. Then, on your iPhone, go to **Settings** > **Debugging** > **Export log files** to share it — for example when attaching it to a GitHub issue.
- Select **Clear** to empty the list.

### Connection issues

The connection between your iPhone and your Apple Watch can get stuck. When that happens, syncs stop working even though both devices are right next to each other.

Restarting both devices almost always fixes it.

## Resetting the watch app

Two options on the main settings screen let you start over without touching your iPhone or your servers.

- **Restart App** closes the Home Assistant app immediately. You need to open it again yourself. This is enough for most temporary glitches.
- **Delete Local Data** removes the offline database and cached files stored on the watch. Your iPhone and your Home Assistant servers are not affected. After deleting, select the reload button on the home screen to sync again.

:::warning
**Delete Local Data** cannot be undone. Everything the watch had stored offline is removed until the next sync with your iPhone.
:::

## Developer options

**Troubleshooting** > **Developer** holds options meant for debugging. The app warns you when you open the screen. Only use them when a developer asks you to, or when you are gathering information for a bug report.

- **Verbose item execution**: shows a live log of every step while an item runs — the resolved action, the URL used, the token stage, the request itself, and whether it was sent by the watch or through your iPhone. This is the fastest way to find out why an action fails.
- **Complication reload alerts**: posts a notification when complications start and finish reloading, saying whether each one succeeded or why it failed.
- **Show iPhone unreachable icon**: shows an iPhone icon with a slash in the home header while your paired iPhone is unreachable. Actions still run when your iPhone is unreachable, because the watch then sends them itself, so this only helps when debugging the iPhone link.

## Common problems

**The home screen says "Waiting for iPhone…" and never finishes.**
Your iPhone is out of range, locked in a way that blocks the connection, or the link is stuck. Bring the devices together and select the reload button. If it persists, restart both devices.

**Items appear but show no state.**
The watch cannot reach your Home Assistant server. Check **Settings** > **Servers** for a server marked **Needs attention**, and see [Server URLs](#server-urls).

**An action fails with "The action couldn't be run".**
Neither the watch nor your iPhone could reach your Home Assistant server. When your iPhone is nearby, the watch sends the action through it; otherwise, the watch needs a URL it can reach on its own. Check **Settings** > **Servers** and see [Server URLs](#server-urls). Turning on **Verbose item execution** under [Developer options](#developer-options) shows exactly which step failed.

**Complications never update.**
See [How complications update](./complications.md#how-complications-update) and check the diagnostics under **Troubleshooting** > **Complications**.

**Something is still wrong.**
Collect the logs as described in [Logs](#logs) and open an issue at [home-assistant/iOS](https://github.com/home-assistant/iOS/issues). For general help, see [More help](../troubleshooting/more-help.md).
