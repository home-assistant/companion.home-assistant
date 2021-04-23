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

## Building actionable notifications

:::caution iOS Version
Versions of the iOS app prior to 2021.5 (<span class="beta">BETA</span>) require setting up categories in advance of using them. See [iOS Before 2021.5](#ios-before-20215).
:::

You can include an `actions` array in your service call. On iOS you are limited to 4 actions, while Android is limited to 3.

```yaml
service: notify.mobile_app_<your_device_id_here>
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
| `behavior` | `textInput` to prompt for text to return with the event. This also occurs when setting the action to `REPLY`. |
| `textInputButtonTitle` | Title to use for text input for actions that prompt. | |
| `textInputPlaceholder` | Placeholder to use for text input for actions that prompt. | |

### `uri` values

To navigate to a frontend page, use the format `/lovelace/test` where `test` is replaced by your defined [`path`](https://www.home-assistant.io/lovelace/views/#path) in the defined view. If you plan to use a lovelace dashboard the format would be `/lovelace-dashboard/view` where `/lovelace-dashboard/` is replaced by your defined [`dashboard`](https://www.home-assistant.io/lovelace/dashboards-and-views/#dashboards) URL and `view` is replaced by the defined [`path`](https://www.home-assistant.io/lovelace/views/#path) within that dashboard. For example:

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

## Building automations for notification actions

Here is an example automation to send a notification with a category in the payload:

```yaml
automation:
  - alias: Notify Mobile app
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          title: "Check this out!"
          message: "Something happened at home!"
          data:
            action_data: # iOS-only, returns the value back in event
              entity_id: light.test
              my_custom_data: foo_bar
            actions:
              - action: "ALARM"
                title: "Sound Alarm"
                destructive: true # iOS-only
              - action: "SILENCE"
                title: "Silence Alarm"
```

The previous automation will fire an event with the following data:

```javascript
{
    "event_type": "mobile_app_notification_action",
    "data": {
        "action": "SILENCE",
        // will be present on:
        // - Android and iOS, when `REPLY` is used as the action identifier
        // - iOS when `behavior` is set to `textInput`
        "reply_text": "Reply from user",
        // iOS-only, will be included if sent in the notification
        "action_data": {
          "entity_id": "light.test",
          "my_custom_data": "foo_bar"
        }
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

Here's an example automation for the given payload:

```yaml
automation:
  - alias: "Sound the alarm iOS"
    trigger:
      - platform: event
        event_type: mobile_app_notification_action
        event_data:
          action: "SOUND_ALARM"
    action:
      ...
```

## Migrating from iOS 2021.4 and earlier

Starting in iOS version 2021.5, actions are specified inline with notifications. To migrate, do the following:

1. Add the `actions` array to each notification. For example:

```yaml
# original
action:
  - service: notify.mobile_app_<your_device_id_here>
    data:
      message: "Something happened at home!"
      data:
        push:
          category: "ALARM"
        url:
          _: "/lovelace/cameras" # if the notification itself is tapped
          SOUND_ALARM: "/lovelace/alarm" # if the 'SOUND_ALARM' action is tapped
# replacement
action:
  - service: notify.mobile_app_<your_device_id_here>
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
          actionName: "SOUND_ALARM"
    action:
      ...
# replacement
automation:
  - alias: "Sound the alarm iOS"
    trigger:
      - platform: event
        event_type: mobile_app_notification_action
        event_data:
          action: "SOUND_ALARM"
    action:
      ...
```

## iOS before 2021.5

In advance of sending a notification:

1.  Define a notification category in your Home Assistant configuration which contain 1-4 actions.
2.  At launch iOS app requests notification categories from Home Assistant (can also be done manually in notification settings).

When sending a notification:

1.  Send a notification with `data.push.category` set to a pre-defined notification category identifier.
2.  Push notification delivered to device.
3.  User opens notification.
3.  Action tapped.
4.  Identifier of action sent back to HA as the `actionName` property of the event `ios.notification_action_fired`, along with other metadata such as the device and category name.

<img alt="How the iOS device and Home Assistant work together to enable actionable notifications." class="invertDark" src="/assets/NotificationActionFlow.png" />

### Definitions
-   **Category** - A category represents a type of notification that the app might receive. Think of it as a unique group of actions.
-   **Actions** - An action consists of a button title and the information that iOS needs to notify the app when the action is selected. You create separate action objects for distinct action your app supports.

### Category parameters
| Name | Default | Description |
| ------------ | ------------- | -------------  |
| `name:` | **required** | A friendly name for this category. |
| `identifier:` | **required** | A unique identifier for the category. Must be lowercase and have no special characters or spaces (underscores are ok). |
| `actions:` | **required** | A list of actions. See below. |

### Actions parameters

| Name | Default | Description |
| ------------ | ------------- | ------------- |
| `identifier:` | **required** | A unique identifier for this action. Can be entirely either upper or lower case (but should not mix the two) and have no special characters or spaces (underscores are ok). Only needs to be unique to the category, not unique globally. |
| `title:` | **required** | The text to display on the button. Keep it short. |
| `activationMode:` | optional | The mode in which to run the app when the action is performed. Setting this to `foreground` will make the app open after selecting. Default value is `background`. |
| `authenticationRequired:` | optional | If `true`, the user must unlock the device before the action is performed. |
| `destructive:` | optional | When `true`, the corresponding button is displayed with a red text color to indicate the action is destructive. |
| `behavior:` | optional | When `textInput` the system provides a way for the user to enter a text response to be included with the notification. The entered text will be sent back to Home Assistant. Default value is `default`. |
| `textInputButtonTitle:` | optional* | The button label. *Required* if `behavior` is `textInput`. |
| `textInputPlaceholder:` | optional | The placeholder text to show in the text input field. Only used if `behavior` is `textInput` |

Here's a fully built example configuration:

```yaml
ios:
  push:
    categories:
      - name: Alarm
        identifier: 'alarm'
        actions:
          - identifier: 'SOUND_ALARM'
            title: 'Sound Alarm'
            activationMode: 'background'
            authenticationRequired: true
            destructive: true
            behavior: 'default'
          - identifier: 'SILENCE_ALARM'
            title: 'Silence Alarm'
            activationMode: 'background'
            authenticationRequired: true
            destructive: false
            behavior: 'textInput'
            textInputButtonTitle: 'Silencio!'
            textInputPlaceholder: 'Placeholder'
```

Rather than defining categories using YAML within `configuration.yaml`, you can create them directly within the Companion App. This can be done from the Notifications page of the App Configuration Menu (accessed from the sidebar menu).

Two variables are available for use in the `Hidden preview placeholder` and `Category summary`. `%u` will give the total number of notifications which have been sent under the same thread ID (see [this document](basic.md#grouping) for more details). `%@` will give the text specified with `summary:` in the `push:` section of the notification payload.

### Building automations for notification actions

Here is an example automation to send a notification with a category in the payload:

```yaml
automation:
  - alias: Notify Mobile app
    trigger:
      ...
    action:
      - service: notify.mobile_app_<your_device_id_here>
        data:
          title: "Check this out!"
          message: "Something happened at home!"
          data:
            push:
              category: "alarm" # Needs to match the top level identifier you used in the ios configuration
            action_data: # Anything passed in action_data will get echoed back to Home Assistant.
              entity_id: light.test
              my_custom_data: foo_bar
```

If you want to navigate to a Lovelace page or launch an app for a notification, you can use the `url` key.

To navigate to a dashboard when tapping a notification:
```yaml
action:
  - service: notify.mobile_app_<your_device_id_here>
    data:
      message: "Something happened at home!"
      data:
        url: /lovelace/cameras
```

To navigate to a specific dashboard when tapping a notification action:
```yaml
action:
  - service: notify.mobile_app_<your_device_id_here>
    data:
      message: "Something happened at home!"
      data:
        push:
          category: "ALARM"
        url:
          _: "/lovelace/cameras" # if the notification itself is tapped
          SOUND_ALARM: "/lovelace/alarm" # if the 'SOUND_ALARM' action is tapped
```

You can also use application-launching URLs. For example, launch an external website using `https://example.com` or make a phone call using `tel:2125551212`.

When an action is selected an event named `ios.notification_action_fired` will be emitted on the Home Assistant event bus. Below is an example payload:

```json
{
  "sourceDeviceName": "Robbie's iPhone 7 Plus",
  "sourceDeviceID": "robbies_iphone_7_plus",
  "actionName": "SOUND_ALARM",
  "textInput": "",
  "action_data": {}
}
```

Here's an example automation for the given payload:

```yaml
automation:
  - alias: "Sound the alarm iOS"
    trigger:
      - platform: event
        event_type: ios.notification_action_fired
        event_data:
          actionName: "SOUND_ALARM"
    action:
      ...
```

## Compatibility with different devices

![iOS](/assets/iOS.svg)Specific

### iOS 13 and later

* All devices support notification expanding by performing a right to left swipe and pressing 'View' in the lock screen or pressing and holding, but on 3D Touch-enabled devices you may still need to apply some force to do it. If you're not in the lock screen, you can also pull the notification down to expand it.

### Prior to iOS 13

*   For devices that support 3D Touch - a firm press on the notification will expand it, showing the action buttons underneath. Supported devices include the iPhone 6S, iPhone 6S Plus, iPhone 7, iPhone 7 Plus, iPhone 8, iPhone 8 Plus, iPhone X, iPhone XS and iPhone XS Max. If not in lock screen, you can also pull the notification down to expand it.

*   For devices that do not support "3D Touch" (such as the iPhone 6 and below, iPhone SE, iPhone XR and iPads), you perform a left to right swipe on the notification, then tap on the 'View' button. This will expand the notification and show the relevant action buttons underneath. If not in lock screen, you need to pull the notification down to expand it.
