---
title: "Siri Shortcuts"
id: siri-shortcuts
---

![iOS](/assets/apple.svg)

With iOS 13 or later and the Home Assistant Companion App, you can take advantage of the power of Siri Shortcuts to carry out Home Assistant tasks with a tap or by using voice commands.

## Getting Started - Example Shortcut

As an example, if you wanted to start you want to create a shortcut to turn on a light (`light.porch` in this example):

1. Open the Shortcuts app (included by default with iOS, can be re-installed from the [App Store](https://apps.apple.com/us/app/shortcuts/id915249334) if you deleted it)
2. Tap "Add Item" and search for "Dictionary"
3. Add a "Text" item and add `entity_id` as the key and `light.porch` as the text
4. Tap the large plus to add another action, search for "Home Assistant" and select "Call Service".
5. Tap "Service" which is highlighted in "Call Service with data"
6. Scroll through the list of available services and find `light.turn_on`.
7. As long as the Dictionary action is above the Home Assistant action there is no need to enter anymore details. If you prefer not to use the Dictionary action, you can select "Show More" and enter the service data in JSON format in the "Service Data" field
8. Tap next and enter or record a name/phrase to use with "Hey, Siri" to trigger the shortcut.

The final shortcut should look similar to this:

<img className="center_image" alt="Example of a completed Siri Shortcut as described above" src="/assets/siri-shortcut-example.jpg" />

## Shortcut Flow

In the previous example we will used the Dictionary action to define our service data, this is an example of one action provide data to a subsequent action in the Shortcut flow. These data can come from other apps or other actions provided by Home Assistant, such as Render Text to get the state of an entity in Home Assistant. By default empty fields will try to use data on your device's clipboard if no other flow or payload data is provided.

## Actions

### Call Service

You can call any service set up in Home Assistant (see the [Services Page in Developer Tools](https://www.home-assistant.io/docs/tools/dev-tools/)). As used in the [example above](#example).

### Fire Event

Fires an event on to the [Home Assistant Event Bus](https://www.home-assistant.io/docs/configuration/events/)

:::tip
Must be valid JSON.
:::

### Get Camera Image

Get a single still frame from a camera entity and place it on the clipboard or use in subsequent actions.

### Render Template

Render a [template](https://www.home-assistant.io/docs/configuration/templating/) which can then be used in subsequent actions.

### Send Location

Send a location to Home Assistant. Will attempt to use clipboard contents as location, otherwise will use current location.

## Using Shortcuts via Notifications

You can send a special push notification to your device, that when tapped, will open the Shortcut of your choosing and run it. Here's an example payload:

```yaml
---
data:
  shortcut:
    name: XCU
    input: text1
    text: soup1
```

The `input` key will be passed into the shortcut as well and accepts a dictionary.


## Launching Shortcuts

Shortcuts are deeply integrated into the OS. After creating one, you have numerous ways to launch them.

* **Siri / Voice** - You can launch any of your created Shortcuts using Siri from an iPhone, iPad, HomePod, or Apple Watch. If your shortcut is named "Bedtime" the command would be "Hey Siri, Bedtime."
* **Widget** - Shortcuts has a widget on the Today View which can be accessed by swiping right from the Home or Lock screen. At the bottom of the widgets screen, press "Edit" and then the green plus button to add the widget to your Today View.
* **Shortcuts app** - On the "My Shortcuts" tab, simply tap on the shortcut you want to launch. There is a search bar at the top to quickly filter your list of Shortcuts if needed.
* **Apple Watch (watchOS 7)** - With iOS 14 and watchOS7 you can launch Shortcuts from either the Shortcuts Apple Watch app, or via complications on the Siri watch face.
* **Spotlight Search** - When on your iOS device Home screen, swipe down from the center of your Home screen to bring up Spotlight search. From here you can type the name of a Shortcut and run it with one tap.
* **Add to Home Screen** - When editing any Shortcut, press the (...) button in the top right to see options, and press the "Add to Home Screen" button. You can customize the name and provide a custom icon if you wish.
* **Push Notification** - Shortcuts can be launched via [push notifications](/docs/notifications/notifications-basic#including-links). Set the URL to `shortcuts://run-shortcut?name=Your Shortcut`
* **Back Tap (iOS 14)** - Under iOS Settings > Accessibility > Touch > Back Tap, you can launch any Shortcut via double tapping or triple tapping the back of your iPhone.

## Personal Automation

With Shortcuts Personal Automation, you can get the best of both worlds - by using iOS triggers to execute Home Assistant actions. A few examples of some useful iOS + Home Assistant combinations for inspiration:

* Trigger your Home Assistant "morning routine" automation after stopping or snoozing the Wake-Up alarm on your iPhone.
* When starting a workout on your Apple Watch, use Home Assistant to play your workout playlist. When finishing a workout on your Apple Watch, use Home Assistant to turn on your fan to cool down.
* Get perfect car presence in Home Assistant by toggling an `input_boolean` in Home Assistant when you connect or disconnect from CarPlay, or connect to your cars Bluetooth system.
* You can ensure that any Home Assistant automations using the iOS app's "Battery State" sensor run immediately by creating a Shortcuts personal automation with the "Charger" trigger (iOS 14) along with the "Send Location" Home Assistant app action. An example use of this is triggering your bedtime routine automation immediately after your phone is plugged in at night time, rather than waiting for the next sensors background update.
* Place an NFC sticker on the lid of your pills bottle. Each time you take your medicine, scan the NFC sticker with your iPhone. Home Assistant can keep a log of the exact times you take your medicine, increment a [counter](https://www.home-assistant.io/integrations/counter/) which will help you know when to refill your prescription, and more.

To create a Personal Automation in the Shortcuts app, go to the "Automations" tab, press the "+" button in the top right corner, and then tap the "Create Personal Automation" button. If you don't have any existing Automations in the shortcut app, just tap the "Create Personal Automation" button. There are 20 triggers available on iOS 14. See Apple's [Shortcuts user guide](https://support.apple.com/guide/shortcuts/create-a-new-personal-automation-apdfbdbd7123/3.5/ios/13.5) for more information on creating Personal Automations.

In iOS 14 the following personal automation trigger types can run automatically without any interaction: Time of Day, Alarm, Sleep, CarPlay, Apple Watch Workout, NFC, Open App, Close App, Airplane Mode, Do Not Disturb, Low Power Mode, Battery Level, Charger. Make sure to turn off the "Ask Before Running" toggle. 

The remaining seven triggers: Arrive, Leave, Before I Commute, Email, Message, Wi-Fi, and Bluetooth require manual interaction in the form of tapping a notification in order to execute the shortcut.
