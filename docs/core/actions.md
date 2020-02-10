---
title: "Actions"
---

Actions is a generic system that allows you to easily integrate the Home Assistant automations system into multiple areas of iOS/Android and [Apple Watch](../integrations/watch/index.md).

# Creating Actions
Actions are created from the Actions section of the App Configuration page within the companion App for iOS.  For Android the actions are created in the notification service call. Each action has required fields depending on your device:
*   `Name`: the name of the action, this will be returned in the [Home Assistant event](https://www.home-assistant.io/docs/configuration/events/) fired by the app. ![iOS](assets/apple.svg) ![android](assets/android.svg) 
*   `Text`: the descriptive text shown on the phone and watch. It is best to keep this relatively short as there is limited space on each action's button. ![iOS](assets/apple.svg) ![android](assets/android.svg) 
*   `Text Color`: the color of the text defined above ![iOS](assets/apple.svg)
*   `Background Color`: the color of the button created for the action. ![iOS](assets/apple.svg)
*   `Icon`: an icon to display to the left of the text on the action's button  ![iOS](assets/apple.svg)
*   `Icon Color`: the color of the icon on the action's button. ![iOS](assets/apple.svg)

For the three color fields, the color is selected by tapping the color-picker circle in each field.

# Using Actions
When an action button is pressed a `ios.action_fired` or `mobile_app_notification_action` event is fired on Home Assistant's event bus. The event data consists of a JSON-formatted dictionary of attributes relating to the action.

| Attribute | Value |
| ------ | ------ |
| `context` | Child dictionary relating the user that triggered the event and the ID of the event |
| `data` | Child dictionary containing key information about the action and its origin |
| `event_type` | Always `ios.action_fired` or `mobile_app_notification_action` |
| `origin` | Always `REMOTE` |
| `time_fired` | Data and time the action was fired, formatted as an [ISO timestamp](https://en.wikipedia.org/wiki/ISO_8601) , e.g. midnight on Christmas day in Lapland (Eastern European Time, UTC+2), would be `2019-12-25T00:00.000000+02:00`. |

The attributes contained within `data` are:

| Attribute | Value |
| ------ | ------ |
| `actionID` | A unique identifier for the action. |
| `actionName` | The name of the action as given in the `Name` field when creating the action in iOS or `action` field when using Android. |
| `sourceDeviceID` | The device ID set in the App Configuration page of the companion app. |
| `sourceDeviceName` | The name of the device from which the action was triggered. This is the Device Name set in iOS under Settings App>General>About or for Android it is set in Settings > About Phone. |
| `sourceDevicePermanentID` | A unique identifier of the device through which the action was triggered |
| `triggerSource` | What part of iOS the action with fired from. Either: `widget` for the Today screen, `appShortcut` for quick actions accessed through 3D touch or `watch` if fired from an Apple Watch. |

The attributes contained within `context` are:

| Attribute | Value |
| ------ | ------ |
| `id` | A unique one-time ID for the event. |
| `parent_id` | Always `null`. |
| `user_id` | The Home Assistant [user ID](https://www.home-assistant.io/docs/authentication/#user-accounts) used to authorise the companion app with Home Assistant. |

Actions can be used to trigger automations within Home Assistant. An example `configuration.yaml` entry might be:

![iOS](assets/apple.svg)

```yaml
automation:
  - alias: "Action Turn Lights Off"
    initial_state: true
    trigger:
      - platform: event
        event_type: ios.action_fired
        event_data:
          actionName: 'Bed Time'
    action:
      service: light.turn_off
      entity_id: group.all_lights
```

![android](assets/android.svg)

```yaml
automation:
  - alias: "Action Turn Lights Off"
    initial_state: true
    trigger:
      - platform: event
        event_type: mobile_app_notification_action
        event_data:
          action: 'Bed Time'
    action:
      service: light.turn_off
      entity_id: group.all_lights
```

Note that attributes located in the `data` and `context` are accessed through `event_data` and `event_context` respectively within the automation.

You can use the Events page within Home Assistant's developer tools to show all information contained with the event for a particular event by subscribing to `ios.action_fired` or `mobile_app_notification_action` and triggering the action from you device.

# Apple Watch
The [Apple Watch App](integrations/watch/index.md) provides access to actions you have created. Once you have created an action within the Actions page, you can load it into the watch app by tapping "Send now" on the Apple Watch page within App Configuration.


# Home Screen Quick Actions
![iOS](assets/apple.svg) [Home Screen Quick Actions](https://support.apple.com/guide/iphone/keep-apps-handy-iph414564dba/ios#iph1ffcbd691) provides a convenient shortcut to your actions and is accessed by 3D Touching the Home Assistant companion app icon on your home screen.

# Today View Widget
![iOS](assets/apple.svg) The [Today View Widget](https://support.apple.com/en-gb/HT207122) is another route through which actions can be fired. To add the Home Assistant widget to your Today View:

1.  Swipe right while on the Home screen or Lock screen.
2.  Scroll to the very bottom and tap the Edit button.
3.  Find the "Home Assistant - Actions" widget in the "More Widgets" list and then tap the green + button to add it.
4.  Rearrange as you'd like and then tap Done.

# Android Widget
![android](assets/android.svg) The Android app allows the user to create widgets on the home screen so the user can call any Home Assistant service call.  You can add the widget like you normally would for any app depending on your devices launcher.

1. Long press on any open space in the home screen
2. Scroll down to Home Assistant in the widget list
3. Drag the widget to an open space on the home screen
4. Select the service call you wish to perform
5. Fill in the required service data for the selected service call
6. Supply a name and icon the widget
7. Save the widget
