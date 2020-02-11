---
title: Theming
id: 'theming'
---

The app attempts to match the theme that the frontend is currently using. Theme keys that the app will use are:

- `primary-background-color` for the background color of the web view ![iOS](/assets/apple.svg)
- `primary-color` for the status bar background color ![iOS](/assets/apple.svg) ![android](/assets/android.svg)
- `text-primary-color` for the pull to refresh tint color ![iOS](/assets/apple.svg)

Themes should update in real time. Only system themes, not user themes, are supported. Colors should be specified in hex format (e.g. `#0099ff`) and defining element colors through variable names is not supported.
