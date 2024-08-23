---
title: "Actions"
id: "actions"
---

![Apple](/assets/apple.svg) Specific

Actions is a generic system that allows you to easily integrate the Home Assistant automations system into multiple areas of iOS, [Apple Watch](/apple-watch/apple-watch.md), and CarPlay.

## Creating Actions

You can create actions either from within the app itself or in your Home Assistant `configuration.yaml`

### Creating Actions in the App

Actions are created from the Actions section of Companion App in [Configuration](https://my.home-assistant.io/redirect/config/) page within the companion App for iOS. Each action has required fields depending on your device:

- `Name`: the name of the action, this will be returned in the [Home Assistant event](https://www.home-assistant.io/docs/configuration/events/) fired by the app.
- `Server`: if you have multiple Home Assistant servers connected, select the server the action should be sent to.
- `Text`: the descriptive text shown on the phone and watch. It is best to keep this relatively short as there is limited space on each action's button.
- `Text Color`*: the color of the text defined above.
- `Background Color`*: the color of the button created for the action. **(Requires `use_custom_colors`)**
- `Icon`: an icon to display to the left of the text on the action's button.
- `Icon Color`: the color of the icon on the action's button.
- `Show in CarPlay`: boolean to display or hide action in CarPlay.
- `Show in Watch`: boolean to display or hide action in Apple Watch.
- `Use custom colors`**: boolean to enable custom colors in widgets and Apple watch, initially it is offered a tile-card UI, enabling this allows you to change background and text color. (Available from iOS App v2024.7.1)

\* Requires `use_custom_colors` **true**

** Available from iOS App v2024.7.1  

For the three color fields, the color is selected by tapping the color-picker circle in each field.

### Creating Actions in Home Assistant

You can define actions in your Home Assistant `configuration.yaml`. This requires at least Home Assistant 0.115 and version 2020.6. The following is an example entry.

```yaml
ios:
  actions:
    - name: Fred
      background_color: "#000000" # Requires `use_custom_colors`
      label:
        text: "Hello, World"
        color: "#ff0000" # Requires `use_custom_colors`
      icon:
        icon: earth
        color: "#ffffff"
      show_in_carplay: false
      show_in_watch: true
      use_custom_colors: true
```

Colors should be in hex format and icons should be from the [mdi](https://materialdesignicons.com/) set.

After saving these changes you will need to restart Home Assistant and then, in the Companion App, go to the Actions section of the Companion App section of [Configuration](https://my.home-assistant.io/redirect/config/). It should sync automatically, but you can also pull-to-refresh to sync.

When multiple servers are connected to the app there is no need to specify the `server` value in `configuration.yaml`, the app will automatically detect the origin of the action when imported.

## Using Actions

After having filled in all action data (text, name, etc.), tap the **Create automation** button.

*Alternatively:*

When an action button is pressed a `ios.action_fired` event is fired on Home Assistant's event bus. The event data consists of a JSON-formatted dictionary of attributes relating to the action.

| Attribute    | Value                                                                                                                                                                                                                             |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `context`    | Child dictionary relating the user that triggered the event and the ID of the event                                                                                                                                               |
| `data`       | Child dictionary containing key information about the action and its origin                                                                                                                                                       |
| `event_type` | Always `ios.action_fired`                                                                                                                                                                                                         |
| `origin`     | Always `REMOTE`                                                                                                                                                                                                                   |
| `time_fired` | Data and time the action was fired, formatted as an [ISO timestamp](https://en.wikipedia.org/wiki/ISO_8601) , e.g. midnight on Christmas day in Lapland (Eastern European Time, UTC+2), would be `2019-12-25T00:00.000000+02:00`. |

The attributes contained within `data` are:

| Attribute | Value |
| ------ | ------ |
| `actionID` | A unique identifier for the action. |
| `actionName` | The name of the action as given in the `Name` field when creating the action in iOS or `action` field when using Android. |
| `sourceDeviceID` | The device ID set in the Companion App section of [Configuration](https://my.home-assistant.io/redirect/config/) on your device. |
| `sourceDeviceName` | The name of the device from which the action was triggered. This is the Device Name set in iOS under Settings App>General>About or for Android it is set in Settings > About Phone. |
| `sourceDevicePermanentID` | A unique identifier of the device through which the action was triggered |
| `triggerSource` | What part of iOS the action with fired from. Either: `widget` for the Today screen, `appShortcut` for quick actions accessed through 3D touch or `watch` if fired from an Apple Watch. When triggering from Apple's CarPlay the source will be `carPlay`. |

The attributes contained within `context` are:

| Attribute   | Value                                                                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`        | A unique one-time ID for the event.                                                                                                                     |
| `parent_id` | Always `null`.                                                                                                                                          |
| `user_id`   | The Home Assistant [user ID](https://www.home-assistant.io/docs/authentication/#user-accounts) used to authorise the companion app with Home Assistant. |

Actions can be used to trigger automations within Home Assistant. An example `configuration.yaml` entry might be:

Example

```yaml
automation:
  - alias: "Action Turn Lights Off"
    initial_state: true
    trigger:
      - platform: event
        event_type: ios.action_fired
        event_data:
          actionName: "Bed Time"
    action:
      - action: light.turn_off
        entity_id: group.all_lights
```

Note that attributes located in the `data` and `context` are accessed through `event_data` and `event_context` respectively within the automation.

You can use the Events page within Home Assistant's developer tools to show all information contained with the event for a particular event by subscribing to `ios.action_fired` and triggering the action from you device.

## Apple Watch

The [Apple Watch App](/apple-watch/apple-watch.md) provides access to actions you have created. Once you have created an action within the Actions page, open the Home Assistant watch and the action list should sync. Actions triggered on Apple Watch carry a [slightly different payload](/apple-watch/actions.md).

## Home Screen Quick Actions

[Home Screen Quick Actions](https://support.apple.com/guide/iphone/keep-apps-handy-iph414564dba/ios#iph1ffcbd691) provides a convenient shortcut to your actions. To access it, press and hold the Home Assistant companion app icon on your home screen.

## Today View Widget

**(Deprecated in 2024.7, use home-screen widgets instead)**

The [Today View Widget](https://support.apple.com/en-gb/HT207122) is another route through which actions can be fired. To add the Home Assistant widget to your Today View:

1.  Swipe right while on the Home screen or Lock screen.
2.  Scroll to the very bottom and tap the Edit button.
3.  Find the "Home Assistant - Actions" widget in the "More Widgets" list and then tap the green + button to add it.
4.  Rearrange as you'd like and then tap Done.
