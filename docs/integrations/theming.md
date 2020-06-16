---
title: Theming
id: 'theming'
---

The process needed to get the app to match the Home Assistant theme is different depending on the app version used.

## Android app and iOS apps after version 2020.2

The app will automatically match the selected theme in Home Assistant and will update in real time when the theme is changed.

## iOS app version 2020.1 and older

![iOS](/assets/apple.svg) The app attempts to match the theme that the frontend is currently using. Theme keys that the app will use are:

- `primary-background-color` for the background color of the web view ![iOS](/assets/apple.svg)
- `app-header-background-color` for the status bar background color ![iOS](/assets/apple.svg)
- `primary-color` for the status bar background color ![android](/assets/android.svg); for the pull-to-refresh control/spinner ![iOS](/assets/apple.svg)

Colors should be specified in hex format (e.g. `#0099ff`) and defining element colors through variable names is not supported.

![android](/assets/android.svg) Only system themes, not user themes, are supported.
