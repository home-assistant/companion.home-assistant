---
title: "Siri Shortcuts"
id: siri-shortcuts
---

![iOS](/assets/apple.svg)

With iOS 12 or later and the Home Assistant Companion App, you can take advantage of the power of Siri Shortcuts to carry out Home Assistant tasks with a tap or by using voice commands.

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
