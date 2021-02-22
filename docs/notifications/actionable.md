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

<img alt="How the iOS device and Home Assistant work together to enable actionable notifications." class="invertDark" src="/assets/NotificationActionFlow.png" />

## Definitions
-   **Category** - A category represents a type of notification that the app might receive. Think of it as a unique group of actions.
-   **Actions** - An action consists of a button title and the information that iOS needs to notify the app when the action is selected. You create separate action objects for distinct action your app supports.

## Category parameters
| Name | Default | Description |
| ------------ | ------------- | -------------  |
| `name:` | **required** | A friendly name for this category. |
| `identifier:` | **required** | A unique identifier for the category. Must be lowercase and have no special characters or spaces (underscores are ok). |
| `actions:` | **required** | A list of actions. See below. |

## Actions parameters

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

Two variables are available for use in the `Hidden preview placeholder` and `Category summary`. `%u` will give the total number of notifications which have been sent under the same thread ID (see [this document](basic.md#thread-id-grouping-notifications) for more details). `%@` will give the text specified with `summary:` in the `push:` section of the notification payload.

## Building automations for notification actions

Here is an example automation to send a notification with a category in the payload:

### ![iOS](/assets/iOS.svg) Example

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

If you want to navigate to a Lovelace page or launch an app for a notification, you can use the `url` key.

To navigate to a dashboard when tapping a notification:
```yaml
action:
  service: notify.mobile_app_<your_device_id_here>
  data:
    message: "Something happened at home!"
    data:
      url: /lovelace/cameras
```

To navigate to a specific dashboard when tapping a notification action:
```yaml
action:
  service: notify.mobile_app_<your_device_id_here>
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

### ![Android](/assets/android.svg) Example

For Android you create the action directly in the automation action. The below example will give you 3 actions in your notification. The first action will send back an event with the action `alarm` and the second action will open the URL or load a lovelace view/dashboard. If you plan to use a lovelace view the format would be `/lovelace/test` where `test` is replaced by your defined [`path`](https://www.home-assistant.io/lovelace/views/#path) in the defined view. If you plan to use a lovelace dashboard the format would be `/lovelace-dashboard/view` where `/lovelace-dashboard/` is replaced by your defined [`dashboard`](https://www.home-assistant.io/lovelace/dashboards-and-views/#dashboards) URL and `view` is replaced by the defined [`path`](https://www.home-assistant.io/lovelace/views/#path) within that dashboard. 


If you want to open an application you need to set the action to `URI`.  To pick the application to open prefix `app://` to the the package name.  If the device does not have the application installed then the Home Assistant application will open to the default page.

```yaml
automation:
  - alias: Notify Mobile app android actions
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
              uri: "https://google.com" # URL to open when action is selected, can also be a lovelace view/dashboard
            - action: "URI" # Must be set to URI if you plan to open an application
              title: "Open Twitter"
              uri: "app://com.twitter.android" # Name of package for application you would like to open
```

![Android](/assets/android.svg)
If you want to add a Reply button to your actionable notification you need to set the action to `REPLY`. Once a user hits reply they will be presented with a text field to enter any text and after sending you will receive the reply back in the event examples found [below](#event-examples) under `reply_text` event data.

```yaml
automation:
  - alias: Notify Mobile app android action reply
    trigger:
      ...
    action:
      service: notify.mobile_app_<your_device_id_here>
      data:
        message: "Something happened at home!"
        data:
          actions:
            - action: "REPLY" # This must be set to REPLY in order for the reply feature to be present
              title: "Title" # The button title
```

When an action is selected an event named `ios.notification_action_fired` for iOS and `mobile_app_notification_action` for Android will be emitted on the Home Assistant event bus. Below is an example payload.

### Event examples

![iOS](/assets/iOS.svg) Event example

```json
{
  "sourceDeviceName": "Robbie's iPhone 7 Plus",
  "sourceDeviceID": "robbies_iphone_7_plus",
  "actionName": "SOUND_ALARM",
  "sourceDevicePushId": "ab9f02fe-6ac6-47b8-adeb-5dd87b489156",
  "textInput": "",
  "action_data": {}
}
```

![Android](/assets/android.svg) &nbsp; Android event example

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
        "action_3_key": "KEY_THREE",
        "reply_text": "Reply from user",
        "device_id": "123456"
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

![iOS](/assets/iOS.svg)Example

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

![Android](/assets/android.svg) &nbsp; Android Example

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

![iOS](/assets/iOS.svg) Notes:

*   `textInput` will only exist if `behavior` was set to `textInput`.
*   `action_data` is a dictionary with parameters passed in the `action_data` dictionary of the `push` dictionary in the original notification.
*   When adding or updating push categories in `configuration.yaml` be sure to update push settings within the Home Assistant iOS app. This can be found within the Notifications page of the App Configuration menu (accessed from the sidebar menu). You may have to exit the Notifications page and reopen it before new categories are shown. If they are still not listed, restart the Home Assistant Companion App.

## Compatibility with different devices

![iOS](/assets/iOS.svg)Specific

### iOS 13 and later

* All devices support notification expanding by performing a right to left swipe and pressing 'View' in the lock screen or pressing and holding, but on 3D Touch-enabled devices you may still need to apply some force to do it. If you're not in the lock screen, you can also pull the notification down to expand it.

### Prior to iOS 13

*   For devices that support 3D Touch - a firm press on the notification will expand it, showing the action buttons underneath. Supported devices include the iPhone 6S, iPhone 6S Plus, iPhone 7, iPhone 7 Plus, iPhone 8, iPhone 8 Plus, iPhone X, iPhone XS and iPhone XS Max. If not in lock screen, you can also pull the notification down to expand it.

*   For devices that do not support "3D Touch" (such as the iPhone 6 and below, iPhone SE, iPhone XR and iPads), you perform a left to right swipe on the notification, then tap on the 'View' button. This will expand the notification and show the relevant action buttons underneath. If not in lock screen, you need to pull the notification down to expand it.
