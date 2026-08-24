---
title: "Watch settings and troubleshooting"
id: "settings"
---

![iOS](/assets/iOS.svg)

The Home Assistant app on your Apple Watch has its own settings screen. It shows which servers the watch knows about, lets you change the Assist pipeline and the home screen layout, and gives you the diagnostics you need when something is not updating.

:::info
This page describes the rebuilt Apple Watch app <span class="beta">BETA</span> introduced in iOS app version 2026.8.
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

The watch fetches live entity states and complication values directly from your Home Assistant server, and sends the actions you run there too. It never routes them through your iPhone, so it needs a URL it can reach.

For each server you can set **Always use**:

- **Auto**: the watch follows your network, using your internal URL when it recognizes the Wi-Fi network and your remote URL otherwise. This is the default.
- A specific URL, if you always want the watch to use that one.

#### Internal URLs and your iPhone's connection

When your Apple Watch has no Wi-Fi or cellular connection of its own, it borrows your iPhone's internet connection. In that situation the watch cannot see which Wi-Fi network you are on, so it cannot tell whether you are somewhere you trust.

To protect you on public networks, the watch does not use your internal URL by default in that case. Your configuration and entity list still arrive from your iPhone, so your items keep appearing. What stops working is anything that needs the server directly: the watch cannot read live states, cannot run actions on that server, and its complications keep showing their last known value.

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
- Select **Send to iPhone** to copy it to your iPhone. Then, on your iPhone, go to **Settings** > **Debugging** > **Export Log Files** to share it — for example when attaching it to a GitHub issue.
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

- **Verbose item execution**: shows a live log of every step while an item runs — the resolved action, the URL used, the token stage, and the request itself. This is the fastest way to find out why an action fails.
- **Complication reload alerts**: posts a notification when complications start and finish reloading, saying whether each one succeeded or why it failed.
- **Show iPhone unreachable icon**: shows an iPhone icon with a slash in the home header while your paired iPhone is unreachable. Actions run from the watch itself, so this only helps when debugging the iPhone link.

## Common problems

**The home screen says "Waiting for iPhone…" and never finishes.**
Your iPhone is out of range, locked in a way that blocks the connection, or the link is stuck. Bring the devices together and select the reload button. If it persists, restart both devices.

**Items appear but show no state.**
The watch cannot reach your Home Assistant server. Check **Settings** > **Servers** for a server marked **Needs attention**, and see [Server URLs](#server-urls).

**An action fails with "The action couldn't be run".**
The watch could not reach your Home Assistant server. Actions always go straight from the watch to your server, so having your iPhone nearby does not help here. Check **Settings** > **Servers** and see [Server URLs](#server-urls). Turning on **Verbose item execution** under [Developer options](#developer-options) shows exactly which step failed.

**Complications never update.**
See [How complications update](./complications.md#how-complications-update) and check the diagnostics under **Troubleshooting** > **Complications**.

**Something is still wrong.**
Collect the logs as described in [Logs](#logs) and open an issue at [home-assistant/iOS](https://github.com/home-assistant/iOS/issues). For general help, see [More help](../troubleshooting/more-help.md).
