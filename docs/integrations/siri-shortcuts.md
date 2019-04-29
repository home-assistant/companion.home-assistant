---
title: "Siri Shortcuts"
---



# Actions

## Call Service
You can call any service that shows up in the "Services" page <img src="https://www.home-assistant.io/images/screenshots/developer-tool-services-icon.png" width="32" height="32"> of Home Assistant. 

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
