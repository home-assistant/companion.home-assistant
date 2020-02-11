---
title: "Siri Shortcuts"
id: siri-shortcuts
---

With iOS 12 or later, you can take advantage of the power of Siri Shortcuts to carry out Home Assistant tasks with a tap or by using voice commands.

# Actions

## Call Service
You can call any service that shows up in the "Services" page <img src="https://www.home-assistant.io/images/screenshots/developer-tool-services-icon.png" width="24" height="24" /> of Home Assistant.

As an example, if you wanted to start your bedtime routine automation you would do the following:

1. In the Home Assistant mobile app, navigate to App Configuration -> Siri Shortcuts
2. Select `automation.trigger` from the list of Services.
3. Type "Bedtime" in the Shortcut name field at the top of the screen.
4. Select your `automation.bedtime_routine` from the entity_id picker.
5. Press the "Add to Siri" button.
6. Record a brief easy to remember voice phrase such as "it's bedtime" and press the "Done" button at the top.

It's that easy! Now when you say "Hey Siri, it's bedtime" Siri will trigger your bedtime routine automation without you even having to lift a finger.


## Fire Event

> Must be valid JSON. If no payload is provided, clipboard contents will be used.

## Get Camera Snapshot
Get a single still frame from the entity ID found on the clipboard and place it on the clipboard.

## Render Template
Render text found on the clipboard.

## Send Location
Send a location to Home Assistant. Will attempt to use clipboard contents as location, otherwise will use current location.

# Using Shortcuts

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
