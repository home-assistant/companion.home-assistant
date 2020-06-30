---
title: "Siri Shortcuts"
id: siri-shortcuts
---

![iOS](/assets/apple.svg)

With iOS 13 or later and the Home Assistant Companion App, you can take advantage of the power of Siri Shortcuts to carry out Home Assistant tasks with a tap or by using voice commands.

## Getting Started

In order to set up Siri Shortcuts, you will need to install the [Shortcuts App from the App Store](https://apps.apple.com/us/app/shortcuts/id915249334).

## Example

As an example, if you wanted to start you want to create a shortcut to turn on a light (`light.porch` in this example):

1. Open the Shortcuts app
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
