---
title: "Android Media Controls"
id: 'android-media-controls'
---

![Android](/assets/android.svg) <span class='beta'>BETA</span>

The Android app can show your Home Assistant `media_player` entities as native media controls in the notification shade — the same interface used by apps like Spotify or YouTube Music. This lets you control playback (play, pause, skip track, seek) directly from the notification shade without opening the app.

## Supported actions

The media control supports the following actions, depending on what the `media_player` entity supports:

- **Play/pause** — start or pause playback
- **Next/previous track** — skip to the next or previous track
- **Seek** — scrub to a specific position in the current track
- **Progress bar** — shows playback progress, even for entities that don't support seeking
- **Album art** — displays the current media's artwork

## Setup

1. In the Home Assistant app, go to **Settings** > **Companion App** > **Media controls**.
2. If you have multiple servers, select a server.
3. Select a `media_player` entity from the list.
4. Tap **Save**.
5. Start playing media on the selected entity. A media control will appear in the notification shade.

## Removing the media control

To remove the media control, go to **Settings** > **Companion App** > **Media controls** and tap **Clear**. This stops the background service and removes the notification.

## Notes and limitations

- Only one `media_player` entity can be configured at a time.
- The media control appears in the notification shade only when the entity has an active playback state (playing, paused, or buffering).
- After a device reboot, the media control restarts when the app is next opened.
- This feature is available on both `full` and `minimal` [app flavors](../core/android-flavors.md).
- Media session notifications do not require notification permissions on Android 13 and later.
