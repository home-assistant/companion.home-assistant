---
title: "Introduction"
---

The mobile_app notify platform accepts the standard `title`, `message` and `target` parameters. The mobile_app notify platform supports targets as services. As long as you granted notifications permissions during setup, you will find all your devices listed as targets for the notify service with names prefixed `notify.mobile_app_` followed by the Device ID of you device. This can be checked in the App Configuration menu of the sidebar and defaults to the name specified in the General>About within the iOS settings app (with spaces and non alphanumeric characters replaced by underscores).


![A push notification showing all of the basic options `title` and `message` as well as `subtitle` and actions.](assets/ios/example.png)

## Enhancing basic notifications

### Notification Sounds
By default no notification sound is sent in the payload. See the [Sounds documentation](sounds.md) for details of the available sounds and how to add custom sounds. The default notification sounds (Tri-tone) can be played by adding it to the data payload:

```yaml
automation:
  - alias: Make some noise
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        title: "Ding-dong"
        data:
          push:
            sounds: default
```

### Badge
You can set the icon badge in the payload. The below example will make the badge icon say 5:

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

### Subtitle
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

### Replacing notifications
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

### Sending notifications to multiple devices
To send notifications to multiple devices, create a [notification group](https://www.home-assistant.io/components/notify.group/):
```yaml
notify:
  - name: ALL_DEVICES
    platform: group
    services:
      - service: mobile_app_iphone_one
      - service: mobile_app_iphone_two
      - service: mobile_app_ipad_one
```
Now, you can send notifications to everyone in the group using:
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
            push:
              badge: 5
```
