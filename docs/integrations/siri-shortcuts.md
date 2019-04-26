---
title: "Siri Shortcuts"
---



# Actions

## Call Service

## Fire Event

## Get Camera Snapshot

## Render Template

## Send Location

# Using Shortcuts

You can send a special push notification to your device, that when tapped, will open the Shortcut of your choosing and run it. Here's an example payload:

```yaml
---
data:
  push:
    shortcut:
      name: XCU
      input: text1
      text: soup1
```

The `input` key will be passed into the shortcut as well and accepts a dictionary.
