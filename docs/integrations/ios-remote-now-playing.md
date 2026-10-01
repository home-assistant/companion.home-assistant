---
title: "Remote Now Playing"
id: 'ios-remote-now-playing'
---

![iOS](/assets/iOS.svg)Remote Now Playing lets you follow a Home Assistant media player from your iPhone's built-in Now Playing controls. The media keeps playing on the original device. Your iPhone shows what that player is playing on the Lock Screen and in Control Center, and sends your taps back to it.

Remote Now Playing is an iPhone feature. It is not available on Android, iPad, Mac, or CarPlay.

:::info Requirements
- An iPhone running iOS 27 or later.
- A companion app version that includes Remote Now Playing <span class="beta">BETA</span>. This feature has not reached a stable release, so it is only in beta versions of the app.
- A `media_player` entity in Home Assistant.
- A working connection between the companion app and Home Assistant.
:::

<img alt="iPhone Lock Screen showing a followed Home Assistant speaker in Now Playing, with album artwork, the track 'I Got You' by Jack Johnson, a progress bar at 0:11, previous, pause, and next buttons, and a volume slider" src="/assets/ios/remote-now-playing-lock-screen.jpeg" width="300" />

---

## Following a media player

You pick the player from the entity itself, not from the companion app settings.

1. In Home Assistant, open the media player you want to follow.
2. In the more info dialog, select the three dots menu.
3. Select **Add to...**.
4. Under **App actions**, select **Follow in Now Playing**.
5. Lock your iPhone, or open Control Center. The player now appears in Now Playing.

You can follow one media player at a time. If you follow a second player, it replaces the first one.

:::note
Following a player does not start or change playback. It only asks your iPhone to show and control what that player is already doing.
:::

## What appears in Now Playing

What you see depends on what the media player reports to Home Assistant. When the information is available, Now Playing can show the name of the Home Assistant media player, the title, the artist, the album, the artwork, and the playback progress.

The buttons you get also depend on the player. Home Assistant only offers the controls that the selected media player says it supports, so a player that cannot skip tracks shows no next or previous button. Depending on the player, you may see play, pause, stop, next, previous, seeking, and volume.

Muting is not available from Now Playing, even for a player that supports it elsewhere in Home Assistant.

## Controlling the player

When you use a control in Now Playing, your iPhone sends that command to the Home Assistant media player. The audio or video stays on the original device, and your iPhone does not start playing anything itself.

## Stopping

To stop following a player, use the same menu you used to start:

1. In Home Assistant, open the media player you are following.
2. In the more info dialog, select the three dots menu.
3. Select **Add to...**.
4. Under **App actions**, select **Stop following in Now Playing**.

<img alt="The Add to... menu for a followed media player, showing 'Stop following in Now Playing' under App actions with the description 'Currently shown in iPhone system media controls'" src="/assets/ios/remote-now-playing-stop-following.png" width="300" />

You can also stop from the companion app. Go to **Settings** > **Companion app**, and under **Stay informed**, select **Remote Now Playing**. This screen shows the player you are following and lets you select **Stop following**.

Stopping following removes the player from your iPhone's Now Playing controls. It does not pause or stop the media, which keeps playing on the original device.

## Staying up to date

Home Assistant sends Now Playing updates to your iPhone, so the title, artwork, and progress can keep up to date even when the companion app is not open.

This depends on your iPhone and Home Assistant being able to reach each other. If the connection drops, Now Playing may show older information, or a control you select may not reach the player, until the connection returns.

## Troubleshooting

**Follow in Now Playing does not appear**

- Check that you are using an iPhone running iOS 27 or later. The option does not appear on iPad, Mac, or Android.
- Check that the entity is a media player. The option is not offered for other kinds of entities.

**Now Playing stopped updating**

- Check that your iPhone and Home Assistant can still reach each other.
- Check that the media player is still available in Home Assistant.
- Stop following the player, then follow it again.

**A control is missing**

Home Assistant only offers the controls that the media player reports it supports. If a button you expect is missing, check what that player supports in Home Assistant. Muting is never offered from Now Playing.
