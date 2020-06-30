---
title: Theming
id: 'theming'
---

## Colors used

- `primary-background-color` for the background color of the web view ![iOS](/assets/apple.svg)
- `app-header-background-color` for the status bar background color ![iOS](/assets/apple.svg)
- `primary-color` for the status bar background color ![android](/assets/android.svg); for the pull-to-refresh control/spinner ![iOS](/assets/apple.svg)

![iOS](/assets/android.svg)Colors should be specified in hex format (e.g. `#0099ff`) and defining element colors through variable names is not supported.

![iOS](/assets/apple.svg)As of version 2020.3, the iOS app will accept colors specified as hex, rgb, hsl, rgba, hsla formats or by a valid [HTML color name](https://www.w3schools.com/colors/colors_names.asp), although formats with alpha values are recognized, using alhpa values less than 100 % (or 1) will currently lead to a color mismatch. Earlier versions of the app require colors to be specified in hex

## Setting the app theme

The process needed to get the app to match the Home Assistant theme is different depending on the app version used.

### iOS apps after version 2020.2

The app will automatically match the selected theme in Home Assistant and will update in real time when the theme is changed.

### iOS app version 2020.1 or older and Android app

To change the theme of the app you must use a [service call](https://www.home-assistant.io/docs/scripts/service-calls/) to `frontend.set_theme` in Home Assistant to change them. This will fire an event which the app can detect.
