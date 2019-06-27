---
title: События приложения
id: version-2.0.0-app-events
original_id: app-events
---
## Описание

To help with running automations, such as clearing app icon badges, or other tasks you may wish to trigger based on app usage, the Home Assistant Companion App fires three different events onto the Home Assistant [event bus](https://www.home-assistant.io/docs/configuration/events/) when you open or close the app.

| Event                    | Cause                                                                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `ios.finished_launching` | The app opens when not already running in the background. This will also cause `ios.became_active` to be fired.                     |
| `ios.entered_background` | The app is closed but left running in background (by either pressing the home button or swiping up on model without a home button). |
| `ios.became_active`      | The app is opened whether or not it was already in the background.                                                                  |

You can use the Events page within Home Assistant's developer tools to show all information contained with the event for a particular event by subscribing to the event you are interested in and carrying out the appropriate action with on your device.