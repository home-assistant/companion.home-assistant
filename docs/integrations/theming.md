---
title: Theming
id: 'theming'
---

## Colors used

![Android](/assets/android.svg) &nbsp; Android<br /><br />
Colors should be specified in hex format (e.g. `#0099ff`) and defining element colors through variable names is not supported.
- `primary-background-color` for the navigation bar background color ![Android](/assets/android.svg)
- `app-header-background-color` for the status bar background color ![Android](/assets/android.svg)

![iOS](/assets/iOS.svg)<br /><br />
The iOS app accepts colors specified in hex, rgb, hsl, rgba, hsla formats or using a valid [HTML color name](https://www.w3schools.com/colors/colors_names.asp); although formats with alpha values are recognized, using alpha values less than 100 % (or 1) will currently lead to a color mismatch.
- `primary-background-color` for the background color of the web view ![iOS](/assets/iOS.svg)
- `app-header-background-color` for the status bar background color ![iOS](/assets/iOS.svg)
- `primary-color` for the pull-to-refresh control/spinner ![iOS](/assets/iOS.svg)

## Setting the app theme

![iOS](/assets/iOS.svg) The app automatically matches the selected theme in Home Assistant and updates in real time when the theme is changed.

![Android](/assets/android.svg) To change the theme of the app you must use a [service call](https://www.home-assistant.io/docs/scripts/service-calls/) to `frontend.set_theme` in Home Assistant. This will fire an event which the app can detect.
