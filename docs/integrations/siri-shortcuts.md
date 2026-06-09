---
title: "Apple App Intents"
id: siri-shortcuts
---

![iOS](/assets/iOS.svg)<br />
With the Home Assistant Companion App, you can take advantage of Apple's App Intents and the Shortcuts app to carry out Home Assistant tasks with a tap or by using voice commands with Siri.

:::note
This page was previously titled "Siri Shortcuts".
:::

## Getting Started - Example Shortcut

As an example, if you wanted to create a shortcut to turn on a light (`light.porch` in this example):

1. Open the Shortcuts app (included by default with iOS, can be re-installed from the [App Store](https://apps.apple.com/app/id915249334) if you deleted it)
2. Tap the Plus icon at the top right to create a new shortcut.
3. Tap Add Action, search for "Home Assistant" and select "Perform action".
4. Tap "Server" and select the Home Assistant server you wish to perform the action on.
5. Tap "Action" and scroll through (or search) the list of available actions to find `light.turn_on`.
6. Tap "Action data" and enter the data in JSON format, for example `{"entity_id": "light.porch"}`.
7. Tap next and enter or record a name/phrase to use with "Hey, Siri" to trigger the shortcut.

The final shortcut should look similar to this:

<img className="center_image" alt="Example of a completed Siri Shortcut as described above" src="/assets/siri-shortcut-example.jpg" />

## Shortcut Flow

Actions can pass data to subsequent actions in the Shortcut flow. This data can come from other apps, or from other actions provided by Home Assistant, such as "Render template" to get the state of an entity in Home Assistant. For example, instead of typing the action data manually in the example above, you could build it with a "Dictionary" action placed before the Home Assistant action. By default, empty fields will try to use data on your device's clipboard if no other flow or payload data is provided.

## Actions

<span class='beta'>BETA</span>

The actions below are built with Apple's App Intents framework. Some actions require iOS 16.4 or later, and "Perform action" and "Get camera snapshot" require iOS 17 or later.

:::note
These actions replace the legacy SiriKit actions (such as "Call Service" and "Fire Event"). The legacy actions have been deprecated and still appear in the Shortcuts app prefixed with "(Deprecated)" — please migrate your shortcuts to the actions described below.
:::

### Perform action

Perform any action set up in Home Assistant (see the [Actions Page in Developer Tools](https://www.home-assistant.io/docs/tools/dev-tools/)) on the selected server. Choose the action and, optionally, provide the action data as JSON. As used in the [example above](#getting-started---example-shortcut).

:::tip
The action data must be valid JSON.
:::

### Get camera snapshot

Get a single still frame from a camera entity. The snapshot is returned as a PNG file that you can save or use in subsequent actions.

### Render template

Render a [template](https://www.home-assistant.io/docs/configuration/templating/) which can then be used in subsequent actions. Only users with the admin role can perform this action.

### Update location

Send a location update to Home Assistant. Will attempt to use the provided location, otherwise will use the current location.

### Update sensors

Send a sensor update to Home Assistant for all sensors.

### Assist prompt

Send a text prompt to [Assist](https://www.home-assistant.io/voice_control/) and get the response back to use in subsequent actions. You can choose which Assist pipeline to use.

## Launching Shortcuts

Shortcuts are deeply integrated into the OS. After creating one, you have numerous ways to launch them.

* **Siri / Voice** - You can launch any of your created Shortcuts using Siri from an iPhone, iPad, HomePod, or Apple Watch. If your shortcut is named "Bedtime" the command would be "Hey Siri, Bedtime."
* **Widget** - Shortcuts has a widget on the Today View which can be accessed by swiping right from the Home or Lock screen. At the bottom of the widgets screen, press "Edit" and then the green plus button to add the widget to your Today View.
* **Shortcuts app** - On the "My Shortcuts" tab, simply tap on the shortcut you want to launch. There is a search bar at the top to quickly filter your list of Shortcuts if needed.
* **Apple Watch (watchOS 7)** - With iOS 14 and watchOS7 you can launch Shortcuts from either the Shortcuts Apple Watch app, or via complications on the Siri watch face.
* **Spotlight Search** - When on your iOS device Home screen, swipe down from the center of your Home screen to bring up Spotlight search. From here you can type the name of a Shortcut and run it with one tap.
* **Add to Home Screen** - When editing any Shortcut, press the (...) button in the top right to see options, and press the "Add to Home Screen" button. You can customize the name and provide a custom icon if you wish.
* **Push Notification** - Shortcuts can be launched [via push notifications](#executing-a-shortcut-via-home-assistant-notifications).
* **Back Tap (iOS 14)** - Under iOS Settings > Accessibility > Touch > Back Tap, you can launch any Shortcut via double tapping or triple tapping the back of your iPhone.

## Executing a Shortcut via Home Assistant Notifications

You can trigger a Shortcut from Home Assistant using a notification like so:

```yaml
- action: notify.mobile_app_<your_device_id_here>
  data:
    message: "Trigger a Shortcut!"
    data:
      shortcut:
        name: "Shortcut Name"
        # you can provide any number of keys and values
        # all values must be strings (e.g. not numbers, arrays, dictionaries, etc.)
        key_for_shortcut: "value provided to shortcut"
        another_key: "another value"
```

When you tap on the notification to launch Home Assistant, it will redirect you to the Shortcuts app to perform the given Shortcut. You can customize this behavior with the following keys in `shortcut` above:

| Key | Values | Notes |
| --- | ------ | ----- |
| `ignore_result` | Any String, e.g. `"ignore"` | When set, does not re-open the Home Assistant app when completed. Also prevents the below event from firing. |

:::note
If the Shortcut doesn't require any input, it may appear as though the Shortcuts app wasn't launched at all. Check for the event being performed to see the results.
:::

Once you complete the Shortcut, it'll return you to Home Assistant and fire an event. The event fired is `ios.shortcut_run` with the result of the Shortcut with the following keys:

| Key | Values | Description |
| -- | -- | -- |
| `status` | `success`, `failure`, `cancelled` | The status of the execution |
| `result` | Varies | The result provided by the Shortcut itself |
| `error` | Dictionary, keys `error-Code` and `errorMessage` | Error description from the Shortcuts app if failure|
| `input` | Varies | `shortcut` value in action |
| `name` | Varies | `shortcut.name` value in action |

## Personal Automation

With Shortcuts Personal Automation, you can get the best of both worlds - by using iOS triggers to execute Home Assistant actions. A few examples of some useful iOS + Home Assistant combinations for inspiration:

* Trigger your Home Assistant "morning routine" automation after stopping or snoozing the Wake-Up alarm on your iPhone.
* When starting a workout on your Apple Watch, use Home Assistant to play your workout playlist. When finishing a workout on your Apple Watch, use Home Assistant to turn on your fan to cool down.
* Get perfect car presence in Home Assistant by toggling an `input_boolean` in Home Assistant when you connect or disconnect from CarPlay, or connect to your cars Bluetooth system.
* You can ensure that any Home Assistant automations using the iOS app's "Battery State" sensor run immediately by creating a Shortcuts personal automation with the "Charger" trigger (iOS 17) along with the "Update location" Home Assistant app action. An example use of this is triggering your bedtime routine automation immediately after your phone is plugged in at night time, rather than waiting for the next sensors background update.
* Place an NFC sticker on the lid of your pills bottle. Each time you take your medicine, scan the NFC sticker with your iPhone. Home Assistant can keep a log of the exact times you take your medicine, increment a [counter](https://www.home-assistant.io/integrations/counter/) which will help you know when to refill your prescription, and more.

To create a Personal Automation in the Shortcuts app, go to the "Automations" tab, press the "+" button in the top right corner, and then tap the "Create Personal Automation" button. If you don't have any existing Automations in the shortcut app, just tap the "Create Personal Automation" button. There are 21 triggers available on iOS 17. See Apple's [Shortcuts user guide](https://support.apple.com/guide/shortcuts/apdfbdbd7123/) for more information on creating Personal Automations.

In iOS 17 all personal automation trigger types can run automatically without any interaction, except for the "Before I Commute" trigger.
