---
title: "Actionable Notifications"
id: "actionable-notifications"
---

Actionable notifications are a unique type of notification as they allow the user to add buttons to the notification which can then send an [event](https://www.home-assistant.io/docs/configuration/events/) to Home Assistant once clicked. This event can then be used in an automation allowing you to perform a wide variety of actions. These notifications can be sent to either iOS or Android.

Some useful examples of actionable notifications:

-   A notification is sent whenever motion is detected in your home while you're away or asleep. A "Sound Alarm" action button is displayed alongside the notification, that when tapped, will sound your burglar alarm.
-   Someone rings your front doorbell. You receive a notification with a [live camera stream](dynamic-content.md) of the visitor outside along with action buttons to lock or unlock your front door.
-   Receive a notification whenever your garage door opens with action buttons to open or close the garage.

![Actionable notifications allow the user to send a command back to Home Assistant.](/assets/ios/actions.png)

![iOS](/assets/iOS.svg) If you have multiple servers connected to an iOS or mac app, the notification actions will be fired on the server that sent the notification.


:::caution Version Compatibility
Category-based notifications on iOS and macOS are deprecated. See the [migration guide](#migrating-from-categories) for more info on converting existing notifications.
:::

:::info Apple Watch
Actions on watchOS require the Watch App to be installed. You can install it the system Watch app.
:::

## Building actionable notifications

You can include an `actions` array in your action.

![Android](/assets/android.svg) Android allows 3 notification actions.  
![iOS](/assets/iOS.svg) allows around 10 notification actions. Any more and the system UI for notification actions begins having scrolling issues.

```yaml
action: notify.mobile_app_<your_device_id_here>
data:
  message: "Something happened at home!"
  data:
    actions:
      - action: "ALARM" # The key you are sending for the event
        title: "Sound Alarm" # The button title
      - action: "URI" # Must be set to URI if you plan to use a URI
        title: "Open Url"
        uri: "https://google.com" # URL to open when action is selected, can also be a lovelace view/dashboard      
```

Each action may consist of the following keys:

| Key | Meaning | Notes |
| --- | --- | --- |
| `action` | **Required**. The identifier passed back in events | When set to `REPLY`, you will be prompted for text to send with the event. |
| `title` | **Required**. The title of the button shown in the notification | |
| `uri` | **Optional**. The URL to open when tapped | ![Android](/assets/android.svg) Android requires setting the `action` to `URI` to use this key. See [notes below](#uri-values). |
| `behavior` | **Optional**. Set to `textInput` to prompt for text to return with the event. This also occurs when setting the action to `REPLY`. | Using this key allows you to use the `action` key to differentiate actions. |

### ![Android](/assets/android.svg) Android specific options

All of the following keys are optional.

| Key | Meaning | Notes |
| --- | --- | --- |
| _None_ | There are no Android-specific keys at this time. | |

### ![iOS](/assets/iOS.svg) specific options

All of the following keys are optional.

| Key | Meaning | Notes |
| --- | --- | --- |
| `activationMode` | Set to `foreground` to launch the app when tapped. Defaults to `background` which just fires the event. | This is automatically set to `foreground` when providing a `uri`. |
| `authenticationRequired` | `true` to require entering a passcode to use the action. | |
| `destructive` | `true` to color the action's title red, indicating a destructive action. | |
| `textInputButtonTitle` | Title to use for text input for actions that prompt. | |
| `textInputPlaceholder` | Placeholder to use for text input for actions that prompt. | |
| `icon` | The icon to use for the notification. | Requires version 2021.10. See notes below. |

#### Icon Values

:::note Version Compatibility
This requires iOS app version 2021.10 or later on iOS 15 or later, or a future version of the macOS app on macOS 12 or later.
:::

Icons for notification actions are only allowed from the [SF Symbols library](https://developer.apple.com/sf-symbols/), which is different than other icons in Home Assistant which come from [Material Design Icons library](https://materialdesignicons.com/). This is due to limitations placed on these actions from Apple.

You must prefix the icon name in the catalogue with `sfsymbols:` (similar to prefixing with `mdi:` elsewhere), since we hope to expand this to support MDI in the future. For example:

```yaml
action:
  - action: notify.mobile_app_<your_device_id_here>
    data:
      message: "Something happened at home!"
      data:
        actions:
          - action: "ALARM"
            title: "Sound Alarm"
            icon: "sfsymbols:bell"
          - action: "SILENCE"
            title: "Silence Alarm"
            icon: "sfsymbols:bell.slash"
```

### `uri` values

To navigate to a frontend page, use the format `/lovelace/test` where `test` is replaced by your defined [`path`](https://www.home-assistant.io/dashboards/views/#path) in the defined view. If you plan to use a dashboard the format would be `/lovelace-dashboard/view` where `/lovelace-dashboard/` is replaced by your defined [`dashboard`](https://www.home-assistant.io/dashboards/dashboards) URL and `view` is replaced by the defined [`path`](https://www.home-assistant.io/dashboards/views/#path) within that dashboard. For example:

```yaml
- action: "URI"
  title: "Open Cameras"
  uri: "/lovelace/cameras"
```

#### ![Android](/assets/android.svg) Android specific

If you want to open an application you need to set the action to `URI`. The format will be `app://<package>` where `<package>` is replaced by the package you wish to open (ex: `app://com.twitter.android`). If the device does not have the application installed then the Home Assistant application will open to the default page.

```yaml
- action: "URI"
  title: "Open Twitter"
  # Name of package for application you would like to open
  uri: "app://com.twitter.android"
```

With action set to `URI` you can also trigger the More Info panel for any entity. The format will be `entityId:<entity_ID>` where `<entity_id>` is replaced with the entity ID you wish to view. Ex: `entityId:sun.sun`

```yaml
- action: "URI"
  title: "View the sun"
  uri: "entityId:sun.sun"
```


You can also open the notification history when using the format `settings://notification_history`

```yaml
- action: "URI"
  title: "Notification History"
  uri: "settings://notification_history"
```

![Android](/assets/android.svg)

You can also use an [intent scheme URI](https://developer.chrome.com/docs/multidevice/android/intents/#syntax) to start an action in an installed application.

```yaml
- action: "URI"
  title: "Intent Scheme"
  uri: "intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;end"
```

![Android](/assets/android.svg)

You can send a specific [deep link](https://developer.android.com/training/app-links#deep-links) to an app by using `deep-link://<deep_link>` where `<deep_link>` is the actual deep link you wish to send.

```yaml
- action: "URI"
  title: "Deep Link"
  uri: "deep-link://example://link/to/content"
```

You can also use this for application-launching URLs. For example, to make a telephone call:
```yaml
- action: "URI"
  title: "Deep Link"
  uri: "deep-link://tel:2125551212"
```

#### ![iOS](/assets/iOS.svg) specific

You can also use application-launching URLs. For example, to make a telephone call:

```yaml
- action: "CALL"
  title: "Call Pizza Hut"
  uri: "tel:2125551212"
```

Or to launch a page in your default browser:

```yaml
- action: "OPEN"
  title: "Open Safari"
  uri: "https://example.com"
```

## Building notification action scripts

There are some important things to keep in mind when building actionable notifications:

1. Your script or automation could be run multiple times
2. The actions for your notification are shared across all notifications

To avoid issues, you can create unique actions for each time your script is run. By combining context and variables, this can be fairly straightforward:

```yaml
# inside a automation actions or script sequence
- alias: "Set up variables for the actions"
  variables:
    # Including an id in the action allows us to identify this script run
    # and not accidentally trigger for other notification actions
    action_open: "{{ 'OPEN_' ~ context.id }}"
    action_close: "{{ 'CLOSE_' ~ context.id }}"
- alias: "Ask to close or open the blinds"
  action: notify.mobile_app_<your_device>
  data:
    message: "The blinds are half-open. Do you want to adjust this?"
    data:
      actions:
        - action: "{{ action_open }}"
          title: Open
        - action: "{{ action_close }}"
          title: Close
- alias: "Wait for a response"
  wait_for_trigger:
    - platform: event
      event_type: mobile_app_notification_action
      event_data:
        # waiting for the specific action avoids accidentally continuing
        # for another script/automation's notification action
        action: "{{ action_open }}"
    - platform: event
      event_type: mobile_app_notification_action
      event_data:
        action: "{{ action_close }}"
- alias: "Perform the action"
  choose:
    - conditions: "{{ wait.trigger.event.data.action == action_open }}"
      sequence:
        - action: cover.open_cover
          target:
            entity_id: cover.some_cover
    - conditions: "{{ wait.trigger.event.data.action == action_close }}"
      sequence:
        - action: cover.close_cover
          target:
            entity_id: cover.some_cover
```

The above sends a notification, waits for a response, and then performs whichever action is being requested. 

When the notification action is performed, the `mobile_app_notification_action` event fires with the following data:

```javascript
{
    "event_type": "mobile_app_notification_action",
    "data": {
        "action": "OPEN_<context_id_here>",
        // will be present:
        // - when `REPLY` is used as the action identifier
        // - when `behavior` is set to `textInput`
        "reply_text": "Reply from user",
        // iOS-only, will be included if sent in the notification
        "action_data": {
          "entity_id": "light.test",
          "my_custom_data": "foo_bar"
        },
        // Android users can also expect to see all data fields sent with the notification in this response such as the "tag"
        "tag": "TEST"
    },
    "origin": "REMOTE",
    "time_fired": "2020-02-02T04:45:05.550251+00:00",
    "context": {
        "id": "abc123",
        "parent_id": null,
        "user_id": "123abc"
    }
}
```

## Further Considerations

### Blocking Behaviour
The above example will wait, until the notification action is performed. This might lead to unexpected behaviour, depending on the [automation mode](https://www.home-assistant.io/docs/automation/modes/) of the script. For "single" mode, this will lead to a situation, where the script is not executed again if the previous notification action has not yet been performed. For "queue" and "parallel" this will happen if a certain number of notifications have not yet been performed. For "restart" mode it means, that as soon as the script is triggered again notification actions of the older instances of the script will not fire the coresponding action. Depending on the use case, there are several options:

-   You can use a [time out](https://www.home-assistant.io/docs/scripts/#wait-timeout) to allow new executions of the script. However, this will lead to dangling notifications on your mobile phone. 
-   It is possible to [clear notifications](https://companion.home-assistant.io/docs/notifications/notifications-basic#clearing) which can be combined with timeouts and parallel execution mode to achieve good results. 
-   In Android you can listen to the [notification cleared event](https://companion.home-assistant.io/docs/notifications/notification-cleared) that is fired when the notification is closed, and handle it accordingly. This can be achieved by adding the following lines
  ```
        - platform: event
          event_type: mobile_app_notification_cleared
          event_data:
            action_1_key: '{{ action_open }}'
  ```
  and 
  ```
      - conditions: "{{ wait.trigger.event.event_type == 'mobile_app_notification_cleared' }}"
        sequence:
            - action: persistent_notification.create
              data:
                title: App notification result
                message: The notification was closed
  ```
  Keep in mind that the event will not be fired when the Home Assistant app crashes or is closed, so a timeout should still be considered.

### Catch All Triggers
You can also create automations that trigger for any notification action. For example, if you wanted to include a `SILENCE` action on a variety of notifications, but only handle it in one place:

```yaml
automation:
  - alias: "Silence the alarm"
    trigger:
      - platform: event
        event_type: mobile_app_notification_action
        event_data:
          action: "SILENCE"
    action:
      ...
```

## Migrating from Categories

Starting in iOS version 2021.5, actions are specified inline with notifications. To migrate, do the following:

1. Add the `actions` array to each notification. For example:

```yaml
# original
action:
  - action: notify.mobile_app_<your_device_id_here>
    data:
      message: "Something happened at home!"
      data:
        push:
          category: "ALARM"
        url:
          _: "/lovelace/cameras" # if the notification itself is tapped
          ALARM: "/lovelace/alarm" # if the 'ALARM' action is tapped
# replacement
action:
  - action: notify.mobile_app_<your_device_id_here>
    data:
      message: "Something happened at home!"
      data:
        url: "/lovelace/cameras" # launched if no action is chosen
        actions:
          # for compatibility, the YAML definition of actions can be used
          # for example, you may use `identifier` instead of `action`
          - action: "ALARM"
            title: "Sound Alarm"
            destructive: true
            uri: "/lovelace/alarm"
          - action: "SILENCE"
            title: "Silence Alarm"
```

2. Convert your event triggers to the new values

```yaml
# original
automation:
  - alias: "Sound the alarm iOS"
    trigger:
      - platform: event
        event_type: ios.notification_action_fired
        event_data:
          actionName: "ALARM"
    action:
      ...
# replacement
automation:
  - alias: "Sound the alarm iOS"
    trigger:
      - platform: event
        event_type: mobile_app_notification_action
        event_data:
          action: "ALARM"
    action:
      ...
```

The above is the minimum necessary to migrate. You can also rewrite your automations to use `wait_for_trigger` like previous examples, though this is more work and not strictly necessary.

## Compatibility with different devices

![iOS](/assets/iOS.svg)Specific

### iOS 13 and later

* All devices support notification expanding by performing a right to left swipe and pressing 'View' in the lock screen or pressing and holding, but on 3D Touch-enabled devices you may still need to apply some force to do it. If you're not in the lock screen, you can also pull the notification down to expand it.

### Prior to iOS 13

*   For devices that support 3D Touch - a firm press on the notification will expand it, showing the action buttons underneath. Supported devices include the iPhone 6S, iPhone 6S Plus, iPhone 7, iPhone 7 Plus, iPhone 8, iPhone 8 Plus, iPhone X, iPhone XS and iPhone XS Max. If not in lock screen, you can also pull the notification down to expand it.

*   For devices that do not support "3D Touch" (such as the iPhone 6 and below, iPhone SE, iPhone XR and iPads), you perform a left to right swipe on the notification, then tap on the 'View' button. This will expand the notification and show the relevant action buttons underneath. If not in lock screen, you need to pull the notification down to expand it.
