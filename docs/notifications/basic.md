---
title: "Introduction"
id: "notifications-basic"
---

The `mobile_app` notify platform accepts the standard `title`, `message` and `target` parameters used by the notify platform. The mobile\_app notify platform supports targets as services. As long as you granted notifications permissions during setup, you will find all your devices listed as targets for the notify service with names prefixed `notify.mobile_app_` followed by the Device ID of you device. This can be checked in the App Configuration menu of the sidebar and defaults to the name specified in the General>About within the iOS settings app or under About>Phone in Android settings (with spaces and non alphanumeric characters replaced by underscores). A requirement of the notify platform is that you must specify at least `message:` in your payload. A minimum working example of a notification is:

```yaml
automation:
  - alias: 'Send Notification'
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: 'Notification text'
```

The mobile_app platform provides many enhancements to the simple notification generated above. The image below, for example, shows an [iOS actionable notification](actionable.md) allowing you to trigger different automations from each button.
![A push notification showing all of the basic options `title` and `message` as well as `subtitle` and actions.](/assets/ios/example.png)

## Enhancing basic notifications

### Notification Sounds
![iOS](/assets/apple.svg)
By default the default iOS notification sound (Tri-tone) will be played upon receiving a notification. See the [Sounds documentation](sounds.md) for details of the available sounds and how to add custom sounds. The default notification sounds (Tri-tone) can be disabled by setting `sound` to `none` in the data payload:

```yaml
automation:
  - alias: Make some noise
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: "Ding-dong"
        data:
          push:
            sound: none
```

### Badge
![iOS](/assets/apple.svg)
You can set the app icon badge in the payload. The below example will make the app icon badge say 5:

```yaml
automation:
  - alias: Notify Mobile app
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        title: "Smart Home Alerts"
        message: "Something happened at home!"
        data:
          push:
            badge: 5
```

By setting the message to `delete_alert` you can silently update the app badge icon in the background without sending a notification to your phone.

### Subtitle
![iOS](/assets/apple.svg)
A subtitle is supported in addition to the title:

```yaml
automation:
  - alias: Notify Mobile app
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        title: "Smart Home Alerts"
        message: "Something happened at home!"
        data:
          subtitle: "Subtitle goes here"
```

### Thread-id (grouping notifications)
![iOS](/assets/apple.svg)
Grouping of notifications is supported on iOS 12 and above. All notifications with the same thread-id will be grouped together in the notification center. Without a thread-id, all notifications from the app will be placed in a single group.

```yaml
automation:
  - alias: Notify Mobile app
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        title: "Smart Home Alerts"
        message: "Something happened at home!"
        data:
          push:
            thread-id: "example-notification-group"
```

![android](/assets/android.svg)
For Android we will need to use the `group` property in order to group the notifications together and declutter the notification pull-down.

```yaml
automation:
  - alias: Notify of Motion
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: Motion detected
        data:
          group: Motion # name of the group you wish to use
```

### Replacing notifications
![iOS](/assets/apple.svg)
Existing notifications can be replaced using `apns-collapse-id`. This will continue to send you notifications but replace an existing one with that same `apns-collapse-id`. When sending consecutive messages with the same `apns-collapse-id` to the same device, only the most recent will be shown. This is especially useful for motion and door sensor notifications.

```yaml
automation:
  - alias: Notify of Motion
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        title: "Motion Detected in Backyard"
        message: "Someone might be in the backyard."
        data:
          apns_headers:
            'apns-collapse-id': 'backyard-motion-detected'
```

![android](/assets/android.svg)
For Android users you can easily replace the notification using the `tag` service data.

```yaml
automation:
  - alias: Notify of Motion
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        title: "Motion Detected in Backyard"
        message: "Someone might be in the backyard."
        data:
          tag: tag
```

![android](/assets/android.svg)
You can also remove a notification by sending `clear_notification` to the same `tag`

```yaml
automation:
  - alias: Notify of Motion
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: clear_notification
        data:
          tag: tag
```

### Sending notifications to multiple devices
![iOS](/assets/apple.svg) ![android](/assets/android.svg)
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
Now, you can send notifications to everyone in the group using.  If you plan to group Android and iOS devices only `message` and `title` will work:
```yaml
  automation:
    - alias: Notify Mobile app
      trigger:
        ...
      action:
        service: notify.ALL_DEVICES
        data:
          message: "Something happened at home!"
```

### Controlling how a notification is displayed when in the foreground
![iOS](/assets/apple.svg)
By default, if the app is open (in the foreground) when a notification arrives, it will display the same as when the app is not active (in the background), with a visual alert showing notification contents, a badge update (if one was sent in the notification) and the sound of your choice. You can control how a notification is displayed when the app is in the foreground by setting the `presentation_options` string array. Allowed values are `alert`, `badge` and `sound`.

```yaml
automation:
  - alias: Notify Mobile app
    trigger:
      ...
    action:
      service: notify.ALL_DEVICES
      data:
        message: "Something happened at home!"
        data:
          presentation_options:
            - alert
            - badge
```

### Notification color

![android](/assets/android.svg)
In Android you can set the `color` of the notification, you can use either the color name or the hex code.

```yaml
automation:
  - alias: Notify of Motion
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        title: "Motion Detected in Backyard"
        message: "Someone might be in the backyard."
        data:
          color: '#2DF56D' # or 'red'
```

### Sticky notification

![android](/assets/android.svg)
You can set whether to dismiss the notification upon selecting it or not. Setting `sticky` to `'true'` will keep the notification from being dismissed when the user selects it. Setting it to `'false'` (default) will dismiss the notification upon selecting it.

```yaml
automation:
  - alias: Notify of Motion
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        title: "Motion Detected in Backyard"
        message: "Someone might be in the backyard."
        data:
          sticky: 'true' # or 'false'
```

### Notification click action

![android](/assets/android.svg)
When a notification is selected the user can either be navigated to a specific lovelace view or you can have a webpage open to any URL. If you plan to use a lovelace view the format would be `/lovelace/test` where `test` is replaced by your defined [`path`](https://www.home-assistant.io/lovelace/views/#path) in the defined view. The default behavior is to just open the Home Assistant app.

```yaml
automation:
  - alias: Notify of Motion
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        title: "Motion Detected in Backyard"
        message: "Someone might be in the backyard."
        data:
          clickAction: 'https://google.com' # action when clicking main notification
```

### Notification Channels

![android](/assets/android.svg)
Notification channels allows users to separate their notifications easily (i.e. alarm vs laundry) so they can customize aspects like what type of sound is made and a lot of other device specific features. Devices running Android 8.0+ are able to create and manage notification channels on the fly using automations. Once a channel is created you can navigate to your notification settings and you will find the newly created channel, from there you can customize the behavior based on what your device allows.

:::info
If your device is on Android 8.0+ then some of the notification features may not work unless you specify a `channel`. The following properties will become the default for the `channel` if not provided: [`vibrationPattern`](#notification-vibration-pattern), [`ledColor`](#notification-led-color) and [`importance`](#notification-channel-importance).

Devices running Android 5.0-7.1.2 do not have channels and do not need to worry about this note.
:::

In order to create a notification you will need to specify the `channel` you wish to use. By default all notifications use `General` if `channel` is not defined.

In the example below a new channel will be created with the name `Motion`:

```yaml
automation:
  - alias: Notify of Motion
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        title: "Motion Detected in Backyard"
        message: "Someone might be in the backyard."
        data:
          channel: Motion # name of the channel you wish to create or utilize
```

If you wish to remove a channel you will need to send `remove_channel` with the `channel` you wish to remove. Depending on when you installed the app you may want to send `remove_channel` to `channel: Default Channel` to clean up the old default channel:

```yaml
automation:
  - alias: Notify of Motion
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: remove_channel
        data:
          channel: Motion # name of the channel you wish to remove
```

### Notification Channel Importance

![android](/assets/android.svg)
When you are setting the `channel` for your notification you also have the option to set the `importance` for the `channel` per notification. Possible values for this property are `high`, `low`, `max`, `min` and `default`. To learn more about what each value does see the [FCM docs](https://developer.android.com/training/notify-user/channels#importance). The `channel` property is required for this feature to work.

```yaml
  - alias: Notify of Motion
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: Motion Detected
        data:
          channel: Motion
          importance: high
```

### Persistent Notification

![android](/assets/android.svg)
Persistent notifications are notifications that cannot be dimissed. These are useful if you have something important like an alarm being triggered. In order to use this property you must set the `tag` property as well. The `persistent` property only takes boolean (`true/false`) values, with `false` being the default.

In the example below we will create a notification and then later on we will remove it.

```yaml
  - alias: Notify of Motion
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: Motion detected
        data:
          persistent: true # Set to true to create a persistent notification
          tag: persistent # Tag is required for the persistent notification
```

To remove the persistent notification we send `clear_notification` to the `tag` that we defined.

```yaml
  - alias: Notify of Motion
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: clear_notification
        data:
          tag: persistent # The tag for the persistent notification you wish to clear
```

### Notification Subject

![android](/assets/android.svg)
If your notification is going to have a lot of text (more than 6 lines) you can opt to show smaller text by setting the `subject`.

```yaml
  - alias: Notify of Motion
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        title: "Long text"
        data:
          subject: "Subject for long text"
```

### Notification LED Color

![android](/assets/android.svg)
Some Android devices have a multi-color notification LED.  By setting the `ledColor` property you can control what color the LED will flash. Possible values are the same as for property [color](#notification-color) eg '#2DF56D' # or 'red'.

```yaml
  - alias: Notify of Motion
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: Motion detected
        data:
          ledColor: "red" # Set the LED to red
```

### Notification Vibration Pattern

![android](/assets/android.svg)
You can set the vibration pattern per notification by setting the `vibrationPattern` property. Possible values are a list of numbers. eg. "100, 1000, 100, 1000, 100" etc.. The pattern specification is "off time, on time, off time, on time, off time" etc.

```yaml
  - alias: Notify of Motion
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: clear_notification
        data:
          vibrationPattern: "100, 1000, 100, 1000, 100" # The pattern you wish to set for vibrations
```

### Notification Timeout

![android](/assets/android.svg)
You can set how long a notification will be shown on a users device before being removed/dismissed automatically. You may use the `timeout` property along with the value in seconds to achieve this.

```yaml
  - alias: Notify of Motion
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: Motion Detected
        data:
          timeout: 600 # How many seconds the notification should be received by the device
```

### Notification Message HTML Formatting

![android](/assets/android.svg)
You can add some custom HTML tags to the `message` of your notification.

```yaml
  - alias: Notify of Motion
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: 'This is a <b><span style="color: red">HTML</span></b> <i>text</i><br><br>This is a text after a new line'
        title: "Cool HTML formatting"
```

### Notification Icon

![android](/assets/android.svg)
You can set the icon for a notification by providing the `icon_url`. The URL must be publicly accessible much like the `image` property. It is important to note that if you set the `image` then Android will not show the icon for the notification.

```yaml
  - alias: Notify of Motion
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: Motion Detected
        data:
          icon_url: "https://github.com/home-assistant/home-assistant-assets/blob/master/logo-round-192x192.png?raw=true" # Publicly accessible URL
```