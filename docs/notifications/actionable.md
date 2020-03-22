---
title: "Actionable Notifications"
id: "actionable-notifications"
---

Actionable notifications are a unique type of notification as they allow the user to add buttons to the notification which can then send an [event](https://www.home-assistant.io/docs/configuration/events/) to Home Assistant once clicked. This event can then be used in an automation allowing you to perform a wide variety of actions. These notifications can be sent to either iOS or Android but they do have some differences. iOS allows you to attach up to four actions while Android only allows you to attach up to three actions per notification.

Some useful examples of actionable notifications:

-   A notification is sent whenever motion is detected in your home while you're away or asleep. A "Sound Alarm" action button is displayed alongside the notification, that when tapped, will sound your burglar alarm.
-   Someone rings your front doorbell. You receive a notification with a [live camera stream](dynamic-content.md) of the visitor outside along with action buttons to lock or unlock your front door.
-   Receive a notification whenever your garage door opens with action buttons to open or close the garage.

![Actionable notifications allow the user to send a command back to Home Assistant.](/assets/ios/actions.png)

If you are using iOS please continue to read below, if you are using Android start from the ![Android](/assets/android.svg) example [here](#building-automations-for-notification-actions).

On iOS notifications can be grouped by category, this allows for different types of notifications from Home Assistant to be placed in a appropriate stacks on the lock screen and even custom summary text to be used on the notification stack. These categories also allow you to create actionable notifications.

## Overview of how actionable notifications work on iOS

In advance of sending a notification:

1.  Define a notification category in your Home Assistant configuration which contain 1-4 actions.
2.  At launch iOS app requests notification categories from Home Assistant (can also be done manually in notification settings).

When sending a notification:

1.  Send a notification with `data.push.category` set to a pre-defined notification category identifier.
2.  Push notification delivered to device.
3.  User opens notification.
3.  Action tapped.
4.  Identifier of action sent back to HA as the `actionName` property of the event `ios.notification_action_fired`, along with other metadata such as the device and category name.

![How the iOS device and Home Assistant work together to enable actionable notifications.](/assets/NotificationActionFlow.png)

## Definitions
-   **Category** - A category represents a type of notification that the app might receive. Think of it as a unique group of actions.
-   **Actions** - An action consists of a button title and the information that iOS needs to notify the app when the action is selected. You create separate action objects for distinct action your app supports.

## Category parameters
| Name | Default | Description |
| ------------ | ------------- | -------------  |
| `name:` | **required** | A friendly name for this category. |
| `identifier:` | **required** | A unique identifier for the category. Must be lowercase and have no special characters or spaces. |
| `actions:` | **required** | A list of actions. See below. |

## Actions parameters

| Name | Default | Description |
| ------------ | ------------- | ------------- |
| `identifier:` | **required** | A unique identifier for this action. Must be uppercase and have no special characters or spaces. Only needs to be unique to the category, not unique globally. |
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

Two variables are available for use in the `Hidden preview placeholder` and `Category summary`. `%u` will give the total number of notifications which have been sent under the same thread ID (see [this document](basic.md#thread-id-grouping-notifications) for more details). `%@` will give the text specified with `summary:` in the `push:` section of the notification payload.

## Building automations for notification actions

Here is an example automation to send a notification with a category in the payload:

![iOS](/assets/apple.svg) iOS Example

```yaml
automation:
  - alias: Notify Mobile app
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
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

![android](/assets/android.svg) For Android you create the action directly in the automation action. The below example will give you 2 actions in your notification. The first action will send back an event with the action `alarm` and the second action will open the URL or load a lovelace view. To load a lovelace view use `/lovelace/view` replacing `view` with the defined `path` for the view you wish to open.

```yaml
automation:
  - alias: Notify Mobile app
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: "Something happened at home!"
        data:
          actions:
            - action: "alarm" # The key you are sending for the event
              title: "Title" # The button title
            - action: "URI" # Must be set to URI if you plan to use a URI
              title: "Open Url"
              uri: "https://google.com" # URL to open when action is selected, can also be a lovelace view
```

When an action is selected an event named `ios.notification_action_fired` for iOS and `mobile_app_notification_action` for Android will be emitted on the Home Assistant event bus. Below is an example payload.

![iOS](/assets/apple.svg) iOS event example

```json
{
  "sourceDeviceName": "Robbie's iPhone 7 Plus",
  "sourceDeviceID": "robbies_iphone_7_plus",
  "actionName": "SOUND_ALARM",
  "sourceDevicePushId": "ab9f02fe-6ac6-47b8-adeb-5dd87b489156",
  "textInput": "",
  "actionData": {}
}
```

![android](/assets/android.svg) Android event example

```json
{
    "event_type": "mobile_app_notification_action",
    "data": {
        "action": "KEY_ONE",
        "action_2_title": "Action 2",
        "action_3_title": "Action 3",
        "action_1_title": "Action 1",
        "action_1_key": "KEY_ONE",
        "action_2_key": "KEY_TWO",
        "action_3_key": "KEY_THREE"
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

![iOS](/assets/apple.svg) iOS Example

```yaml
automation:
  - alias: Sound the alarm
    trigger:
      platform: event
      event_type: ios.notification_action_fired
      event_data:
        actionName: SOUND_ALARM
    action:
      ...
```

![android](/assets/android.svg) Android Example

```yaml
automation:
  - alias: Sound the alarm
    trigger:
      platform: event
      event_type: mobile_app_notification_action
      event_data:
        action: alarm
    action:
      ...
```

Notes ![iOS](/assets/apple.svg):

*   `textInput` will only exist if `behavior` was set to `textInput`.
*   `actionData` is a dictionary with parameters passed in the `action_data` dictionary of the `push` dictionary in the original notification.
*   When adding or updating push categories in `configuration.yaml` be sure to update push settings within the Home Assistant iOS app. This can be found within the Notifications page of the App Configuration menu (accessed from the sidebar menu). You may have to exit the Notifications page and reopen it before new categories are shown. If they are still not listed, restart the Home Assistant Companion App.

## Compatibility with different devices

![iOS](/assets/apple.svg) iOS Specific

*   For devices that support "Force Touch" / "3D Touch" - a firm press on the notification will expand it, showing the action buttons underneath. Supported devices include the iPhone 6S, iPhone 6S Plus, iPhone 7, iPhone 7 Plus, iPhone 8, iPhone 8 Plus, iPhone X, iPhone XS, iPhone XS Max and Apple Watch models.

*   For devices that do not support "Force Touch" (such as the iPhone 6 and below, iPhone SE, iPhone XR, iPhone 11 and later, and some iPad models):

       **Prior to iOS 13:** You perform a left to right swipe on the notification, then tap on the 'View' button. This will expand the notification and show the relevant action buttons underneath.
  
       **iOS 13 and later:** You press and hold the notification. This will expand the notification and show the relevant action buttons underneath.
