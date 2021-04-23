---
title: "Introduction"
id: "notifications-basic"
---

The `mobile_app` notify platform accepts the standard `title`, `message` and `target` parameters used by the notify platform. The mobile\_app notify platform supports targets as services. As long as you granted notifications permissions during setup, you will find all your devices listed as targets for the notify service with names prefixed `notify.mobile_app_` followed by the Device ID of you device. This can be checked in the App Configuration menu of the sidebar and defaults to the name specified in the General>About within the iOS/macOS settings app or under About>Phone in Android settings (with spaces and non alphanumeric characters replaced by underscores). A requirement of the notify platform is that you must specify at least `message:` in your payload. A minimum working example of a notification is:

```yaml
automation:
  - alias: 'Send Notification'
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "Notification text"
```

The mobile_app platform provides many enhancements to the simple notification generated above. The image below, for example, shows an [iOS actionable notification](actionable.md) allowing you to trigger different automations from each button.
![A push notification showing all of the basic options `title` and `message` as well as `subtitle` and actions.](/assets/ios/example.png)

## Sending notifications to multiple devices

To send notifications to multiple devices, create a [notification group](https://www.home-assistant.io/components/notify.group/):
```yaml
notify:
  - name: ALL_DEVICES
    platform: group
    services:
      - service: mobile_app_iphone_one
      - service: mobile_app_iphone_two
      - service: mobile_app_ipad_one
      - service: mobile_app_pixel_4_xl
```
Now, you can send notifications to everyone in the group using:
```yaml
  automation:
    - alias: "Notify Mobile app group"
      trigger:
        ...
      action:
        - service: notify.ALL_DEVICES
          data:
            message: "Something happened at home!"
```

## General Options

### Attachments

You can attach media and other content to notifications. See [Attachments](/docs/notifications/notification-attachments).

### Opening a URL

When tapping on a notification, you can choose to open a URL, which can fall into one of the following buckets:

- A relative URL to your Home Assistant instance, like `/lovelace/test`.
- An full URL like `https://example.com`
- For a particular action in Actionable Notifications, see [its documentation](/docs/notifications/actionable-notifications).
- ![Android](/assets/android.svg) An application using `app://<package name>` where `<package name>` is replaced with the actual package you wish to open.
- ![Android](/assets/android.svg) The More Info panel of an entity using `entityId:<entity_ID>` where `<entity_id>` is replaced with the entity ID you wish to view. Ex: `entityId:sun.sun`.

For relative URLs, you can open a lovelace view in the format `/lovelace/test` where `test` is replaced by your defined [`path`](https://www.home-assistant.io/lovelace/views/#path) in the defined view or a lovelace dashboard in the format `/lovelace-dashboard/view` where `/lovelace-dashboard/` is replaced by your defined [`dashboard`](https://www.home-assistant.io/lovelace/dashboards-and-views/#dashboards) URL and `view` is replaced by the defined [`path`](https://www.home-assistant.io/lovelace/views/#path) within that dashboard.



```yaml
automation:
  - alias: "Notify of Motion click action"
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          title: "Motion Detected in Backyard"
          message: "Someone might be in the backyard."
          data:
            # iOS URL
            url: "https://google.com"
            # Android URL
            clickAction: "https://google.com"
```

```yaml
automation:
  - alias: "Send Notification with a link"
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          title: "Motion Detected in Backyard"
          message: "Someone might be in the backyard."
          data:
            # iOS URL
            url: "/lovelace/cameras"
            # Android URL
            clickAction: "/lovelace/cameras"
```

### Grouping

Combine notifications together visually.

```yaml
automation:
  - alias: "Notify Mobile app grouping"
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          title: "Smart Home Alerts"
          message: "Something happened at home!"
          data:
            group: "example-notification-group"
```

### Replacing
Replace an existing notification by using a tag for the notification. All subsequent notifications will take the place of a notification with the same tag.

```yaml
automation:
  - alias: "Notify of Motion iOS replacement"
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          title: "Motion Detected in Backyard"
          message: "Someone might be in the backyard."
          data:
            tag: "backyard-motion-detected"
```

### Clearing

:::note ![iOS](/assets/iOS.svg) Version Requirement
Clearing a notification on iOS requires app version 2021.5 (<span class="beta">BETA</span>) or later.
:::

You can clear an existing notification which has a tag by sending `clear_notification` as follows:

```yaml
automation:
  - alias: "Notify of Motion clear notification"
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "clear_notification"
          data:
            tag: "backyard-motion-detected"
```

### Subtitle / Subject

Subtitles and subjects are secondary headings you can use in your notifications beyond the title property.

![iOS](/assets/iOS.svg) ![macOS](/assets/macOS.svg)<br />
A `subtitle` displays in addition to title and message.

![Android](/assets/android.svg)<br />
A `subject` may take the place of longer content (more than 6 lines), depending on your device.

```yaml
automation:
  - alias: "Notify Mobile app subtitle"
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          title: "Smart Home Alerts"
          message: "Something happened at home!"
          data:
            # iOS example
            subtitle: "Subtitle goes here"
            # Android example
            subject: "Subject for long text"
```

## Android Specific

### Notification Color

In Android you can set the `color` of the notification, you can use either the color name or the hex code.

```yaml
automation:
  - alias: "Notify of Motion color"
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          title: "Motion Detected in Backyard"
          message: "Someone might be in the backyard."
          data:
            color: "#2DF56D" # or "red"
```

### Sticky Notification

You can set whether to dismiss the notification upon selecting it or not. Setting `sticky` to `'true'` will keep the notification from being dismissed when the user selects it. Setting it to `'false'` (default) will dismiss the notification upon selecting it.

```yaml
automation:
  - alias: "Notify of Motion sticky"
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          title: "Motion Detected in Backyard"
          message: "Someone might be in the backyard."
          data:
            sticky: "true" # or "false"
```

### Notification Channels

Notification channels allows users to separate their notifications easily (i.e. alarm vs laundry) so they can customize aspects like what type of sound is made and a lot of other device specific features. Devices running Android 8.0+ are able to create and manage notification channels on the fly using automations. Once a channel is created you can navigate to your notification settings and you will find the newly created channel, from there you can customize the behavior based on what your device allows.

#### Creating a channel

In order to create a notification you will need to specify the `channel` you wish to use. By default all notifications use `General` if `channel` is not defined.

In the example below a new channel will be created with the name `Motion`:

```yaml
automation:
  - alias: "Notify of Motion channel"
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          title: "Motion Detected in Backyard"
          message: "Someone might be in the backyard."
          data:
            channel: "Motion" # Name of the channel you wish to create or utilize
```

Default values for a channel if not provided will be as follows:
- Importance: Default which means Default notification importance: shows everywhere, makes noise, but does not visually intrude.
- Vibration Pattern: Vibration disabled
- LED Color: LED disabled

#### Removing a channel

If you wish to remove a channel you will need to send `message: remove_channel` with the `channel` you wish to remove. 
Removing a channel doesn't reset the settings to the default values, it just removes it from the notification channels list. If you send a notification to a removed channel, it will restore it. The only way to really remove a channel is by clearing the app data which will remove everything.

Depending on when you installed the app you may want to send `remove_channel` to `channel: default` to clean up the old default channel:

```yaml
automation:
  - alias: Removing Motion channel
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "remove_channel"
          data:
            channel: "Motion" # Name of the channel you wish to remove
```

#### Specific channel properties

:::info
If your device is on Android 8.0+ the following properties will become the default for the `channel` the first time they are set: 
- [`vibrationPattern`](#notification-vibration-pattern)
- [`ledColor`](#notification-led-color)
- [`importance`](#notification-channel-importance)

These options will be ignored once they are set for a particular channel, only lowering of the `importance` will work (if the user has not already modified this).

Devices running Android 5.0-7.1.2 do not have channels and do not need to worry about this note.
:::

### Notification Channel Importance

When you are setting the `channel` for your notification you also have the option to set the `importance` for the `channel` per notification. Possible values for this property are `high`, `low`, `max`, `min` and `default`. To learn more about what each value does see the [FCM docs](https://developer.android.com/training/notify-user/channels#importance). For devices before Android 8.0 this property can be used like `priority` with the same options described up above.

See [Specific channel properties](#specific-channel-properties) for important behavior of this property.

```yaml
automation:
  - alias: "Notify of Motion channel importance"
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "Motion Detected"
          data:
            channel: "Motion" # For devices on Android 8.0+ only
            importance: high
```

### Notification Vibration Pattern 

You can set the vibration pattern for the `channel` by setting the `vibrationPattern` property. Possible values are a list of numbers. eg. "100, 1000, 100, 1000, 100" etc.. The pattern specification is "off time, on time, off time, on time, off time" etc.

See [Specific channel properties](#specific-channel-properties) for important behavior of this property.

```yaml
automation:
  - alias: "Notify of Motion vibration"
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "Motion Detected"
          data:
            vibrationPattern: "100, 1000, 100, 1000, 100" # The pattern you wish to set for vibrations
            channel: "Motion" # For devices on Android 8.0+ only
```

### Notification LED Color

Some Android devices have a multi-color notification LED.  By setting the `ledColor` property you can control what color the LED will flash. Possible values are the same as for property [color](#notification-color) eg '#2DF56D' # or 'red'.

See [Specific channel properties](#specific-channel-properties) for important behavior of this property.

```yaml
automation:
  - alias: "Notify of Motion LED color"
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: Motion detected
          data:
            ledColor: "red" # Set the LED to red
            channel: "Motion" # For devices on Android 8.0+ only
```

### Persistent Notification

Persistent notifications are notifications that cannot be dimissed by swiping away. These are useful if you have something important like an alarm being triggered. In order to use this property you must set the `tag` property as well. The `persistent` property only takes boolean (`true/false`) values, with `false` being the default. The persistent notification will still be dismissed once selected, to avoid this use `sticky: true` so the notification stays.

In the example below we will create a notification and then later on we will remove it.

```yaml
automation:
  - alias: "Notify of Motion persistent"
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "Motion detected"
          data:
            persistent: true # Set to true to create a persistent notification
            tag: "persistent" # Tag is required for the persistent notification
```

To remove the persistent notification we send `clear_notification` to the `tag` that we defined.

```yaml
automation:
  - alias: "Notify of Motion persistent remove"
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "clear_notification"
          data:
            tag: "persistent" # The tag for the persistent notification you wish to clear
```

### Notification Timeout

You can set how long a notification will be shown on a users device before being removed/dismissed automatically. You may use the `timeout` property along with the value in seconds to achieve this.

```yaml
automation:
  - alias: "Notify of Motion timeout"
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "Motion Detected"
          data:
            timeout: 600 # How many seconds the notification should be received by the device
```

### Notification Message HTML Formatting

You can add some custom HTML tags to the `message` of your notification.

```yaml
automation:
  - alias: "Notify of Motion HTML"
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: >
            This is a <b><span style="color: red">HTML</span></b> <i>text</i><br><br>This is a text after a new line
          title: "Cool HTML formatting"
```

### Notification Icon

You can set the icon for a notification by providing the `icon_url`. The URL provided must be either publicly accessible or can be a relative path (i.e. `/local/icon/icon.png`), more details can be found in [attachments](attachments.md). It is important to note that if you set the `image` then Android will not show the icon for the notification, the `image` will be shown in its place. So the `message` will be shown with the `image` and with the image as the icon.

```yaml
automation:
  - alias: "Notify of Motion icon"
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "Motion Detected"
          data:
            icon_url: "https://github.com/home-assistant/home-assistant-assets/blob/master/logo-round-192x192.png?raw=true"
```

### Text To Speech Notifications

Instead of posting a notification on the device you can instead get your device to speak the notification. This notification works different than the others. You will set `message: TTS` and the actual text to speak would be in the `title`. Current support is limited to the current Text To Speech locale set on the device. If there is an error processing the message you will see a toast message appear on the device. Check to make sure that the [Google Text To Speech](https://play.google.com/store/apps/details?id=com.google.android.tts) engine is up to date and set as the default, in case you run into any issues.

```yaml
automation:
  - alias: Notify of Motion TTS
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "TTS"
          title: "Motion has been detected"
```

By default Text To Speech notifications use the music stream so they will bypass the ringer mode on the device as long as the device's volume is not set to 0. You have the option of using `channel: alarm_stream` to have your notification spoken regardless of music volume.

```yaml
automation:
  - alias: "Notify of Motion TTS alarm"
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: TTS
          title: "Motion has been detected"
          data:
            channel: "alarm_stream"
```

If you find that your alarm stream volume is too low you can use `channel: alarm_stream_max` which will temporarily set the alarm stream volume to the max level, play the notification and then revert back to the original volume level.

```yaml
automation:
  - alias: "Notify Alarm Triggered"
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "TTS"
          title: "Alarm has been triggered"
          data:
            channel: "alarm_stream_max"
```

You may not want the TTS notification to be spoken in certain situations (e.g. if the Ringer mode is not `normal` or DND is enabled). This can be done by adding a condition in your automation that checks the state of [other sensors](https://companion.home-assistant.io/docs/core/sensors). Few examples are presented below:

```yaml
automation:
  - alias: "Notify of Motion with conditions"
    trigger:
      ...
    condition:
      - condition: state
        entity_id: sensor.<your_device_id_here>_ringer_mode # Only speak if the Ringer is normal (not vibrate or silent)
        state: normal
      - condition: state
        entity_id: sensor.<your_device_id_here>_do_not_disturb_sensor # Only speak if DND is not enabled
        state: 'off'
      - condition: state
        entity_id: sensor.<your_device_id_here>_audio_mode # Only speak if the phone is idle (not ringing or in a call)
        state: normal
      - condition: state
        entity_id: sensor.<your_device_id_here>_is_music_active # Only speak if the phone is not playing music
        state: 'off'
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: TTS
          title: Motion has been detected
```

### Chronometer Notifications

You can create notifications with a count up/down timer (chronometer) by passing the `chronometer` and `when` options. This feature requires at least Android 7.0.

Do note that the notification will not disappear when the timer reaches 0. Instead, it will continue decrementing into negative values.
You may want to utilize [notification timeouts](#notification-timeout) or [replace the notification](#replacing-notifications) when the timer hits zero.

- chronometer - true to enable chronometer mode
- when - the timestamp to count up or down to (seconds since 01/01/1970)

```yaml
automation:
  - alias: Notify of Next Alarm Time
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          title: "Next Alarm"
          message: >-
            Next Alarm At {{ states('sensor.<your_device_id_here>_next_alarm') }}
          data:
            chronometer: true
            when: "1609459200"
```

## iOS/macOS Specific

### Sounds
By default the default notification sound (Tri-tone on iOS) will be played upon receiving a notification. See the [Sounds documentation](sounds.md) for details of the available sounds and how to add custom sounds. The default notification sounds (Tri-tone) can be disabled by setting `sound` to `none` in the data payload:

```yaml
automation:
  - alias: Make some noise
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          message: "Ding-dong"
          data:
            push:
              sound: none
```

### Badge
You can set the app icon badge in the payload. The below example will make the app icon badge say 5:

```yaml
automation:
  - alias: "Notify Mobile app update badge"
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          title: "Smart Home Alerts"
          message: "Something happened at home!"
          data:
            push:
              badge: 5
```

By setting the message to `delete_alert` you can silently update the app badge icon in the background without sending a notification to your phone.

### Presentation Options

By default, if the app is open (in the foreground) when a notification arrives, it will display the same as when the app is not active (in the background), with a visual alert showing notification contents, a badge update (if one was sent in the notification) and the sound of your choice. You can control how a notification is displayed when the app is in the foreground by setting the `presentation_options` string array. Allowed values are `alert`, `badge` and `sound`.

```yaml
automation:
  - alias: "Notify Mobile app presentation"
    trigger:
      ...
    action:
      - service: notify.ALL_DEVICES
        data:
          message: "Something happened at home!"
          data:
            presentation_options:
              - alert
              - badge
```

